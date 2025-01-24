import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuspansiyonMaliyetComponent } from './suspansiyon-maliyet.component';
import { SuspansiyonDesignComponent } from './core/design/design.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { RouterModule } from '@angular/router';
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
import { AccordionModule } from 'primeng/accordion';
import { SuspansiyonMaliyetFormComponent } from './core/components/suspansiyon-maliyet-form';
@NgModule({
  declarations: [
    SuspansiyonMaliyetComponent,
    SuspansiyonDesignComponent,
    SuspansiyonMaliyetFormComponent,
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
    AccordionModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      // { path: 'create', component: CreateButonMaliyetComponent },
      // { path: 'list', component: ListButonMaliyetComponent },


    ])
  ]
})
export class SuspansiyonMaliyetModule { }
