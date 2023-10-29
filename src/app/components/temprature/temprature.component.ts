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
  selector: 'app-temperature-chart',
  template: ` 
   <div class="my-8">
    <h1 class="!mb-2">
      Temperature Chart
    </h1>
    <p class="mat-body">
      Temperature in &#8451;
    </p>
    <div class="rounded-lg shadow-md p-4 h-96 bg-slate-50">
      <canvas id="temperatureChartLive" height="300"></canvas>
    </div>
  </div>
  `,
})
export class TemperatureChartComponent implements OnInit, OnDestroy {
  @Input() temperatureData: IDataModel[] = [];

  chart!: any;
  ctx: string = 'temperatureChartLive';
  resetTimer: any;

  ngOnInit() {
    this.renderChart();

    this.resetTimer = setInterval(() => {
        if (this.chart) {
            this.chart.data.datasets[0].data = this.temperatureData.map((data) => ({
              x: data.timestamp,
              y: data.temperature,
            }));
            this.chart.data.labels = this.temperatureData.map((data) => data.timestamp);

            this.chart.update();
          }
    }, 1000);
  }

  renderChart(ctx: string = 'temperatureChartLive') {
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            data: [],
            label: 'Temperature',
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
