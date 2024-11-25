import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StokComponent } from './stok.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    StokComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      // { path: 'create', component: CreateButonMaliyetComponent },
       { path: 'list', component: StokComponent },


    ])
  ]
})
export class StokModule { }
