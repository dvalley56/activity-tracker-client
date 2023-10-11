import { Component } from '@angular/core';
import { SocketIOService } from '../service/socket.io.service';
import { IDataModel } from '../models';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  data: IDataModel[] = [];

  constructor(private dataService: DataService) {
    this.dataService.getData(null, null)
      .subscribe((data: IDataModel[]) => {
        this.data = data;
      });
  }
}
