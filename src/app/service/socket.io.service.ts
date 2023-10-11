import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
// @ts-ignore
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketIOService {
  private url = `${environment.apiUrl}`; // Update with your server URL
  private socket;

  constructor(private _snackBar: MatSnackBar) {
    this.socket = io(this.url, { 
      extraHeaders: {
        'x-device-type': 'Angular' // Set the device type to Angular
      }
    });

    this.socket.on('connect', () => {
        console.warn('Connected to server');

        // listen to event tempOutOfRange, humidityOutOfRange, fall
        this.socket.on('tempOutOfRange', (data: string) => {
          this._snackBar.open(data, 'Okay', {
            duration: 10000,
          });
        });

        this.socket.on('humidityOutOfRange', (data: string) => {
          this._snackBar.open(data, 'Okay', {
            duration: 10000,
            });
        });

        this.socket.on('fall', (data: string) => {
          this._snackBar.open(data, 'Okay', {
            duration: 10000,
            });
        });
    });
  }

  // Listen for events emitted by the NodeMCU device
  listen(eventName: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data);
      });
    });
  }

  // Emit an event to the server
  emit(eventName: string, data: any): void {
    this.socket.emit(eventName, data);
  }
}
