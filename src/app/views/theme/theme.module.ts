// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ColorsComponent } from './colors.component';
import { TypographyComponent } from './typography.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// Theme Routing
import { ThemeRoutingModule } from './theme-routing.module';
import {  MatStepperModule} from '@angular/material/stepper';

@NgModule({
  imports: [
    CommonModule,FormsModule ,ReactiveFormsModule,
    ThemeRoutingModule,MatStepperModule
  ],
  declarations: [
    ColorsComponent,
    TypographyComponent
  ]
})
export class ThemeModule { }
