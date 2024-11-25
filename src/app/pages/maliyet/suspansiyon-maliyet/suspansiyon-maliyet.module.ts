import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuspansiyonMaliyetComponent } from './suspansiyon-maliyet.component';
import { SuspansiyonDesignComponent } from './core/design/design.component';
import { SuspansiyonMaliyetFormInputSelectComponent } from './core/components/suspansiyon-maliyet-form-input-select';
import { SuspansiyonMaliyetFormLabelComponent } from './core/components/suspansiyon-maliyet-form-label';
import { SuspansiyonMaliyetFormDropDownComponent } from './core/components/suspansiyon-maliyet-form-dropdown';
import { SuspansiyonMaliyetFormDateComponent } from './core/components/suspansiyon-maliyet-form-date';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SuspansiyonMaliyetComponent,
    SuspansiyonDesignComponent,
    
    SuspansiyonMaliyetFormInputSelectComponent,
    SuspansiyonMaliyetFormLabelComponent,
    SuspansiyonMaliyetFormDropDownComponent,
    SuspansiyonMaliyetFormDateComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      // { path: 'create', component: CreateButonMaliyetComponent },
      // { path: 'list', component: ListButonMaliyetComponent },


    ])
  ]
})
export class SuspansiyonMaliyetModule { }
