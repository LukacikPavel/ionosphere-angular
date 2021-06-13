import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import * as echarts from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PolarHeatmapComponent } from './polar-heatmap/polar-heatmap.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { MatNativeDateModule } from '@angular/material/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ScatterComponent } from './scatter/scatter.component';


@NgModule({
  declarations: [
    AppComponent,
    PolarHeatmapComponent,
    ScatterComponent
  ],
  imports: [
    NgxEchartsModule.forRoot({ echarts }),
    BrowserModule, 
    BrowserAnimationsModule,  
    HttpClientModule, 
    FormsModule,   
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatNativeDateModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
