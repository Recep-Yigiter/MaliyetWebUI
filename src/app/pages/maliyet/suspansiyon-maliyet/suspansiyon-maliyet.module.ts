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
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { SuspansiyonGenelGiderlerTableComponent } from './core/tables/genel-giderler-table';
import { SuspansiyonIscilikGiderlerTableComponent } from './core/tables/iscilik-giderler-table';
import { SuspansiyonMalzemeGiderlerTableComponent } from './core/tables/malzeme-giderler-table';
import { SuspansiyonMaliyetTableComponent } from './core/tables/maliyet-table';
import { SuspansiyonFiyatTableComponent } from './core/tables/fiyat-table';
@NgModule({
  declarations: [
    SuspansiyonMaliyetComponent,
    SuspansiyonDesignComponent,
    SuspansiyonMaliyetFormInputSelectComponent,
    SuspansiyonMaliyetFormLabelComponent,
    SuspansiyonMaliyetFormDropDownComponent,
    SuspansiyonMaliyetFormDateComponent,
    MaliyetFormComponent,
    SuspansiyonGenelGiderlerTableComponent,
    SuspansiyonIscilikGiderlerTableComponent,
    SuspansiyonMalzemeGiderlerTableComponent,
    SuspansiyonMaliyetTableComponent,
    SuspansiyonFiyatTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular,
    AgGridModule,
    TableModule,
    AutoCompleteModule,
    DropdownModule,
    DividerModule,
    DialogModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      // { path: 'create', component: CreateButonMaliyetComponent },
      // { path: 'list', component: ListButonMaliyetComponent },


    ])
  ]
})
export class SuspansiyonMaliyetModule { }
