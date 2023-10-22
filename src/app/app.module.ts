import { NgChartsModule } from 'ng2-charts';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccelerationChartComponent } from './components/acceleration/acceleration.component';
import { TemperatureChartComponent } from './components/temprature/temprature.component';
import { HumidityChartComponent } from './components/humidity/humidity.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppRoutingModule } from './app.router-module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LiveFeedComponent } from './live-feed/live-feed.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {
  NgxMatDatetimePickerModule, 
  NgxMatNativeDateModule, 
  NgxMatTimepickerModule 
} from '@angular-material-components/datetime-picker';
import { MatInputModule } from '@angular/material/input';



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
    HttpClientModule,
    MatSelectModule,
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatInputModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
