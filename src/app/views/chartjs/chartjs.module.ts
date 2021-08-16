import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ChartJSComponent } from './chartjs.component';
import { ChartJSRoutingModule } from './chartjs-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    ChartJSRoutingModule,ReactiveFormsModule,
    ChartsModule,CommonModule,FormsModule
  ],
  declarations: [ ChartJSComponent ]
})
export class ChartJSModule { }
