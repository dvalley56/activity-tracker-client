import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Chart, ChartDataset } from 'chart.js';
import { IDataModel } from 'src/app/models';
import 'chartjs-adapter-date-fns';

@Component({
  selector: 'app-acceleration-chart',
  template: `
    <p class="mat-headline-3" align="center">
      Acceleration Chart
    </p>
    <canvas id="accelerationChart" height="300"></canvas> 
  `,
})
export class AccelerationChartComponent implements OnInit {
  @Input() accelerationData: IDataModel[] = [];

  chart!: any;
  ctx: string = 'accelerationChart';

  ngOnInit() {
    this.renderChart();

    setInterval(() => {
        if (this.chart) {
            this.chart.data.datasets[0].data = this.accelerationData.map((data) => ({
              x: data.timestamp,
              y: data.acceleration_x,
            }));
            this.chart.data.datasets[1].data = this.accelerationData.map((data) => ({
              x: data.timestamp,
              y: data.acceleration_y,
            }));
            this.chart.data.datasets[2].data = this.accelerationData.map((data) => ({
              x: data.timestamp,
              y: data.acceleration_z,
            }));
            this.chart.data.labels = this.accelerationData.map((data) => data.timestamp);

            this.chart.update();
          }
    }, 1000);
  }

  renderChart(ctx: string = 'accelerationChart') {
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            data: [],
            label: 'X Axis',
          },
          {
            data: [],
            label: 'Y Axis',
          },
          {
            data: [],
            label: 'Z Axis',
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
        maintainAspectRatio: false,
      },
    });
  }
}
