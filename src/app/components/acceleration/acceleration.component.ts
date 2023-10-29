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
  selector: 'app-acceleration-chart',
  template: `
     <div class="my-8">
    <h1 class="!mb-2">
      Acceleration Chart
    </h1>
    <p class="mat-body">
      Acceleration in X, Y and Z axis
    </p>
    <div class="rounded-lg shadow-md p-4 h-96 bg-slate-50">
      <canvas id="accelerationChartLive" height="300"></canvas>
    </div>
  </div>
  `,
})
export class AccelerationChartComponent implements OnInit, OnDestroy {
  @Input() accelerationData: IDataModel[] = [];

  chart!: any;
  ctx: string = 'accelerationChartLive';
  resetTimer: any;

  ngOnInit() {
    this.renderChart();

    this.resetTimer = setInterval(() => {
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

  renderChart(ctx: string = 'accelerationChartLive') {
    if(this.chart) this.chart.destroy();
    
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

  ngOnDestroy(): void {
    this.chart.destroy();
    clearInterval(this.resetTimer);
  }
}
