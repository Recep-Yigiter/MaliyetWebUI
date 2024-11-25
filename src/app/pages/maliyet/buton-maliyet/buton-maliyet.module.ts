import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButonMaliyetComponent } from './buton-maliyet.component';
import { RouterModule } from '@angular/router';
import { ButonMaliyetFormInputSelectComponent } from './core/components/buton-maliyet-form-input-select';
import { ButonMaliyetFormLabelComponent } from './core/components/buton-maliyet-form-label';
import { ButonMaliyetFormDropDownComponent } from './core/components/buton-maliyet-form-dropdown';
import { ButonMaliyetFormDateComponent } from './core/components/buton-maliyet-form-date';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { DesignComponent } from './core/design/design.component';



@NgModule({
  declarations: [
    ButonMaliyetComponent,

    ButonMaliyetFormInputSelectComponent,
    ButonMaliyetFormLabelComponent,
    ButonMaliyetFormDropDownComponent,
    ButonMaliyetFormDateComponent,
    DesignComponent
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
export class ButonMaliyetModule { }
