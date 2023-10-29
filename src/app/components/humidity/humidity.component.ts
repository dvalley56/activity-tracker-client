import {
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Chart } from 'chart.js';
import { IDataModel } from 'src/app/models';
import 'chartjs-adapter-date-fns';

@Component({
  selector: 'app-humidity-chart',
  template: ` 
      <div class="my-8">
    <h1 class="!mb-2">
      Humidity Chart
    </h1>
    <p class="mat-body">
      Humidity in %
    </p>
    <div class="rounded-lg shadow-md p-4 h-96 bg-slate-50">

      <canvas id="humidityChartLive" height="300"></canvas>
    </div>
  </div>

  `,
})
export class HumidityChartComponent implements OnInit, OnDestroy {
  @Input() humidityData: IDataModel[] = [];

  chart!: any;
  ctx: string = 'humidityChartLive';
  resetTimer: any;

  ngOnInit() {
    this.renderChart();

    this.resetTimer = setInterval(() => {
        if (this.chart) {
            this.chart.data.datasets[0].data = this.humidityData.map((data) => ({
              x: data.timestamp,
              y: data.humidity,
            }));
            this.chart.data.labels = this.humidityData.map((data) => data.timestamp);

            this.chart.update();
          }
    }, 1000);
  }

  renderChart(ctx: string = 'humidityChartLive') {
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            data: [],
            label: 'Humidity',
          },
        ],
      },
      options: {
        interaction: {
          intersect: false,
          mode: 'index',
        },
        scales: {
          x: {
            type: 'time',
            time: {
              tooltipFormat: 'h:mm:ss a',
              unit: 'second',
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  ngOnDestroy(): void {
    this.chart.destroy();
    clearInterval(this.resetTimer);
  }
}
