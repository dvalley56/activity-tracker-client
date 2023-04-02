import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Chart } from 'chart.js';
import { IDataModel } from 'src/app/models';
import 'chartjs-adapter-date-fns';

@Component({
  selector: 'app-humidity-chart',
  template: ` 
    <p class="mat-headline-3" align="center" style="margin-top: 128px;">
      Humidity Chart
    </p>
    <canvas id="humidityChart" height="300"></canvas> 
  `,
})
export class HumidityChartComponent implements OnInit {
  @Input() humidityData: IDataModel[] = [];

  chart!: any;
  ctx: string = 'humidityChart';

  ngOnInit() {
    this.renderChart();

    setInterval(() => {
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

  renderChart(ctx: string = 'humidityChart') {
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
}
