import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuspansiyonMaliyetComponent } from './suspansiyon-maliyet.component';
import { SuspansiyonDesignComponent } from './core/design/design.component';
import { SuspansiyonMaliyetFormInputSelectComponent } from './core/components/suspansiyon-maliyet-form-input-select';
import { SuspansiyonMaliyetFormLabelComponent } from './core/components/suspansiyon-maliyet-form-label';
import { SuspansiyonMaliyetFormDropDownComponent } from './core/components/suspansiyon-maliyet-form-dropdown';
import { SuspansiyonMaliyetFormDateComponent } from './core/components/suspansiyon-maliyet-form-date';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { RouterModule } from '@angular/router';
import { MaliyetFormComponent } from './core/components/maliyet-form';
import { TableModule } from 'primeng/table';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
@NgModule({
  declarations: [
    SuspansiyonMaliyetComponent,
    SuspansiyonDesignComponent,
    
    SuspansiyonMaliyetFormInputSelectComponent,
    SuspansiyonMaliyetFormLabelComponent,
    SuspansiyonMaliyetFormDropDownComponent,
    SuspansiyonMaliyetFormDateComponent,
    MaliyetFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular,
    AgGridModule,
    TableModule,
    AutoCompleteModule,
    DropdownModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      // { path: 'create', component: CreateButonMaliyetComponent },
      // { path: 'list', component: ListButonMaliyetComponent },


    ])
  ]
})
export class SuspansiyonMaliyetModule { }
