import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { StationRoutingModule } from './station-routing.module';
import { StationComponent } from './station.component';
import { CommonModule } from "@angular/common";



@NgModule({
  declarations: [
    StationComponent
  ],
  imports: [
    FormsModule,ReactiveFormsModule,CommonModule,
    StationRoutingModule
  ]
})
export class StationModule { }
