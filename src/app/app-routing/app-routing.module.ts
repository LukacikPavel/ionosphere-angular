import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { PolarHeatmapComponent } from '../polar-heatmap/polar-heatmap.component';
import { ScatterComponent } from '../scatter/scatter.component';

const routes: Routes = [
  { path: 'heatmap', component: PolarHeatmapComponent },
  { path: 'scatter', component: ScatterComponent}
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AppRoutingModule { }
