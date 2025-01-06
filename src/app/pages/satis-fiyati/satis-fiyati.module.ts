import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SatisFiyatiComponent } from './satis-fiyati.component';
import { AgGridAngular } from 'ag-grid-angular';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SatisFiyatiComponent
  ],
  imports: [
    CommonModule,
    AgGridAngular,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
       RouterModule.forChild([
         // { path: 'create', component: CreateButonMaliyetComponent },
         // { path: 'list', component: ListButonMaliyetComponent },
   
   
       ])
  ]
})
export class SatisFiyatiModule { }
