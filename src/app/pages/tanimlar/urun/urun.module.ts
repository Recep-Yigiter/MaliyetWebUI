import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UrunComponent } from './urun.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { DividerModule } from 'primeng/divider';
import { RouterModule } from '@angular/router';
import { UrunTanimlarDesignComponent } from './design/design.component';
import { UrunFormComponent } from './components/urun-form';



@NgModule({
  declarations: [
    UrunComponent,
    UrunTanimlarDesignComponent,
    UrunFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular,
    DividerModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      // { path: 'create', component: CreateButonMaliyetComponent },
       { path: 'list', component: UrunComponent },


    ])
  ]
})
export class UrunModule { }
