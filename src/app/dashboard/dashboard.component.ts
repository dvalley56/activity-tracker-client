import { Component } from '@angular/core';
import { SocketIOService } from '../service/socket.io.service';
import { IDataModel, IStatsModel } from '../models';
import { DataService } from '../service/data.service';
import { Chart, ChartDataset } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  data: IDataModel[] = [];
  stats: IStatsModel | null = null;

  myForm: FormGroup = new FormGroup({
    activityStatus: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
  });

  accelerationChart!: any;
  ctxAcceleration: string = 'accelerationChart';

  tempratureChart!: any;
  ctxTemprature: string = 'temperatureChart';

  humidityChart!: any;
  ctxHumidity: string = 'humidityChart';

  constructor(private dataService: DataService) {
    this.dataService.getData(null, null, null)
      .subscribe((data: IDataModel[]) => {
        this.data = data;

        this.renderAccelerationChart();
        this.renderTempratureChart();
        this.renderHumidityChart();
      });
      this.getStats();
  }

  ngOnInit() {
  }

  getStats() {
    this.dataService.getStats()
      .subscribe((data) => {
        this.stats = data;
        
        console.log(this.stats);
      });
  }

  renderAccelerationChart(ctxAcceleration: string = 'accelerationChart') {
    this.accelerationChart = new Chart(ctxAcceleration, {
      type: 'line',
      data: {
        datasets: [
          {
            data: this.data.map((data) => ({
              x: new Date(data.timestamp),
              y: data.acceleration_x,
            })),
            label: 'X Axis',
          },
          {
            data: this.data.map((data) => ({
              x: new Date(data.timestamp),
              y: data.acceleration_y,
            })),
            label: 'Y Axis',
          },
          {
            data: this.data.map((data) => ({
              x: new Date(data.timestamp),
              y: data.acceleration_z,
            })),
            label: 'Z Axis',
          },
        ],
      },
      options: {
        interaction: {
          mode: 'index',
          intersect: false,
        },

        scales: {
          x: {
            type: 'timeseries',
            time: {
              unit: 'minute'
            },
            ticks: {
              source: 'data',
            }
          },
        },
        maintainAspectRatio: false,
      },
    });
  }

  renderTempratureChart(ctxTemprature: string = 'temperatureChart') {
    this.tempratureChart = new Chart(ctxTemprature, {
      type: 'line',
      data: {
        datasets: [
          {
            data: this.data.map((data) => ({
              x: new Date(data.timestamp),
              y: data.temperature,
            })),
            label: 'Temperature',
          },
        ],
      },
      options: {
        interaction: {
          mode: 'index',
          intersect: false,
        },

        scales: {
          x: {
            type: 'timeseries',
            time: {
              unit: 'minute'
            },
            ticks: {
              source: 'data',
            }
          },
        },
        maintainAspectRatio: false,
      },
    });
  }

  renderHumidityChart(ctxHumidity: string = 'humidityChart') {
    this.humidityChart = new Chart(ctxHumidity, {
      type: 'line',
      data: {
        datasets: [
          {
            data: this.data.map((data) => ({
              x: new Date(data.timestamp),
              y: data.humidity,
            })),
            label: 'Humidity',
          },
        ],
      },
      options: {
        interaction: {
          mode: 'index',
          intersect: false,
        },

        scales: {
          x: {
            type: 'timeseries',
            time: {
              unit: 'minute'
            },
            ticks: {
              source: 'data',
            }
          },
        },
        maintainAspectRatio: false,
      },
    });
  }

  getData() {
    let activityStatus = this.myForm.get('activityStatus')?.value || null;
    let startDate = this.myForm.get('startDate')?.value ? new Date(this.myForm.get('startDate')?.value).toISOString() : null;
    let endDate = this.myForm.get('endDate')?.value ? new Date(this.myForm.get('endDate')?.value).toISOString() : null;
    
    this.dataService.getData(activityStatus, startDate, endDate)
      .subscribe((data: IDataModel[]) => {
        this.data = data;

        // update data in the charts
        this.accelerationChart.data.datasets[0].data = this.data.map((data) => ({
          x: new Date(data.timestamp),
          y: data.acceleration_x,
        }));

        this.accelerationChart.data.datasets[1].data = this.data.map((data) => ({
          x: new Date(data.timestamp),
          y: data.acceleration_y,
        }));

        this.accelerationChart.data.datasets[2].data = this.data.map((data) => ({
          x: new Date(data.timestamp),
          y: data.acceleration_z,
        }));

        this.accelerationChart.update();

        this.tempratureChart.data.datasets[0].data = this.data.map((data) => ({
          x: new Date(data.timestamp),
          y: data.temperature,
        }));

        this.tempratureChart.update();

        this.humidityChart.data.datasets[0].data = this.data.map((data) => ({
          x: new Date(data.timestamp),
          y: data.humidity,
        }));

        this.humidityChart.update();
      });
  }
}
