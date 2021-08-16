import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StationComponent } from './station.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Station'
    },
    children: [
    {
        path: 'modals',
        component: StationComponent,
        data: {
          title: 'Stations'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StationRoutingModule { }
