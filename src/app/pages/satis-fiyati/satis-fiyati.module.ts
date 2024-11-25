import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SatisFiyatiComponent } from './satis-fiyati.component';
import { AgGridAngular } from 'ag-grid-angular';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AgGridAngular,
    RouterModule.forChild([

      // { path: 'buton-satis-list', component: ButonSatisFiyatiComponent },


    ])
  ]
})
export class SatisFiyatiModule { }
