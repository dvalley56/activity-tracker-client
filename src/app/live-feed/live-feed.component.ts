import { Component } from '@angular/core';
import { IDataModel } from '../models';
import { SocketIOService } from '../service/socket.io.service';

@Component({
  selector: 'app-live-feed',
  templateUrl: './live-feed.component.html',
  styleUrls: ['./live-feed.component.scss']
})
export class LiveFeedComponent {
  tempOutOfRange: any;
  humidityOutOfRange: any;
  fall: boolean = false;
  data: IDataModel[] = [];
  private resetTimer: any;

  isOnline = false;

  constructor(private socketService: SocketIOService) {
    // Listen for temperatureOutOfRange event
    this.socketService.listen('data')
    .subscribe((data: IDataModel) => {
      this.socketService.isOnline.next(true);
      this.data.push(data);

      if(this.resetTimer) clearInterval(this.resetTimer);

      this.resetTimer = setInterval(() => {
        this.socketService.isOnline.next(false);
      }, 3000);

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

    this.socketService.isOnline
    .subscribe((isOnline) => {
      this.isOnline = isOnline;
    });
  }
}
