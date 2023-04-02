import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Chart } from 'chart.js';
import { IDataModel } from 'src/app/models';
import 'chartjs-adapter-date-fns';

@Component({
  selector: 'app-temperature-chart',
  template: ` 
    <p class="mat-headline-3" align="center" style="margin-top: 128px;">
      Temperature Chart
    </p>
    <canvas id="temperatureChart" height="300"></canvas> 
  `,
})
export class TemperatureChartComponent implements OnInit {
  @Input() temperatureData: IDataModel[] = [];

  chart!: any;
  ctx: string = 'temperatureChart';

  ngOnInit() {
    this.renderChart();

    setInterval(() => {
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

  renderChart(ctx: string = 'temperatureChart') {
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
}
