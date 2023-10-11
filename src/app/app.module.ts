import { NgChartsModule } from 'ng2-charts';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccelerationChartComponent } from './components/acceleration/acceleration.component';
import { TemperatureChartComponent } from './components/temprature/temprature.component';
import { HumidityChartComponent } from './components/humidity/humidity.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AppRoutingModule } from './app.router-module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LiveFeedComponent } from './live-feed/live-feed.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AccelerationChartComponent,
    TemperatureChartComponent,
    HumidityChartComponent,
    DashboardComponent,
    LiveFeedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgChartsModule,
    MatSnackBarModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
