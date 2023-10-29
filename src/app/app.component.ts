import { Component } from '@angular/core';
import { SocketIOService } from './service/socket.io.service';
import { IDataModel } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  isOnline = false;
  
  constructor(private socketService: SocketIOService) {
    this.socketService.isOnline
    .subscribe((isOnline) => {
      this.isOnline = isOnline;
    });
  }
}
