import { NgChartsModule } from 'ng2-charts';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccelerationChartComponent } from './components/acceleration/acceleration.component';
import { TemperatureChartComponent } from './components/temprature/temprature.component';
import { HumidityChartComponent } from './components/humidity/humidity.component';

@NgModule({
  declarations: [
    AppComponent,
    AccelerationChartComponent,
    TemperatureChartComponent,
    HumidityChartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
