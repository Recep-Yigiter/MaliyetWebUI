import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButonMaliyetComponent } from './buton-maliyet.component';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { ButonDesignComponent } from './core/design/design.component';
import { ButonMaliyetFormComponent } from './core/components/buton-maliyet-form';
import { TableModule } from 'primeng/table';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import { ListboxModule } from 'primeng/listbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogModule } from 'primeng/dialog';
import { ButonGenelGiderlerTableComponent } from './core/tables/genel-giderler-table';
import { ButonIscilikGiderlerTableComponent } from './core/tables/iscilik-giderler-table';
import { ButonMalzemeGiderlerTableComponent } from './core/tables/malzeme-giderler-table';
import { ButonMaliyetTableComponent } from './core/tables/maliyet-table';
import { ButonFiyatTableComponent } from './core/tables/fiyat-table';
import { AccordionModule } from 'primeng/accordion';
@NgModule({
  declarations: [
    ButonMaliyetComponent,


    ButonDesignComponent,
    ButonMaliyetFormComponent,
        ButonGenelGiderlerTableComponent,
        ButonIscilikGiderlerTableComponent,
        ButonMalzemeGiderlerTableComponent,
        ButonMaliyetTableComponent,
        ButonFiyatTableComponent
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
    ListboxModule,
    RadioButtonModule,
    DialogModule,
    AccordionModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      // { path: 'create', component: CreateButonMaliyetComponent },
      // { path: 'list', component: ListButonMaliyetComponent },


    ])
  ]
})
export class ButonMaliyetModule { }
