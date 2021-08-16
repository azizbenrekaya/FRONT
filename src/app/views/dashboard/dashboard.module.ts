import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule  } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CarouselModule } from 'ngx-bootstrap/carousel';



@NgModule({
  imports: [
    FormsModule,ReactiveFormsModule,CommonModule ,CarouselModule,
    DashboardRoutingModule,TabsModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    // BrowserAnimationsModule,
    BsDatepickerModule.forRoot()
  ],
  declarations: [ DashboardComponent ]
})
export class DashboardModule { }
