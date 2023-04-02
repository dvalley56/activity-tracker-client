import { Component } from '@angular/core';
import { SocketIOService } from './service/socket.io.service';
import { IDataModel } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  tempOutOfRange: any;
  humidityOutOfRange: any;
  fall: boolean = false;
  data: IDataModel[] = [];

  constructor(private socketService: SocketIOService) {
    // Listen for temperatureOutOfRange event
    this.socketService.listen('data')
    .subscribe((data: IDataModel) => {
      this.data.push(data);
    });

    // Listen for temperatureOutOfRange event
    this.socketService.listen('tempOutOfRange').subscribe((data) => {
      this.tempOutOfRange = data;
    });

    // Listen for humidityOutOfRange event
    this.socketService.listen('humidityOutOfRange').subscribe((data) => {
      this.humidityOutOfRange = data;
    });

    // Listen for fall event
    this.socketService.listen('fall').subscribe(() => {
      this.fall = true;
    });
  }
}
