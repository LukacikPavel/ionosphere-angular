import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import * as echarts from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';

import { AppComponent } from './app.component';
import { PolarHeatmapComponent } from './polar-heatmap/polar-heatmap.component';

@NgModule({
  declarations: [
    AppComponent,
    PolarHeatmapComponent
  ],
  imports: [
    BrowserModule,
    NgxEchartsModule.forRoot({ echarts })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
