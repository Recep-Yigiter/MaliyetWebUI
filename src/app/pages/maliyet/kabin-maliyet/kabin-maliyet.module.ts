import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KabinMaliyetComponent } from './kabin-maliyet.component';
import { KabinMaliyetFormComponent } from './core/components/kabin-maliyet-form';
import { KabinDesignComponent } from './core/design/design.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { TableModule } from 'primeng/table';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import { RouterModule } from '@angular/router';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { KabinGenelGiderlerTableComponent } from './core/tables/genel-giderler-table';
import { KabinIscilikGiderlerTableComponent } from './core/tables/iscilik-giderler-table';
import { KabinMalzemeGiderlerTableComponent } from './core/tables/malzeme-giderler-table';
import { KabinMaliyetTableComponent } from './core/tables/maliyet-table';
import { KabinFiyatTableComponent } from './core/tables/fiyat-table';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
@NgModule({
  declarations: [
    KabinMaliyetComponent,
    KabinMaliyetFormComponent,
    KabinDesignComponent,
    KabinGenelGiderlerTableComponent,
    KabinIscilikGiderlerTableComponent,
    KabinMalzemeGiderlerTableComponent,
    KabinMaliyetTableComponent,
    KabinFiyatTableComponent
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
    TabViewModule,
    DialogModule,
    ButtonModule,
    AccordionModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      // { path: 'create', component: CreateButonMaliyetComponent },
      // { path: 'list', component: ListButonMaliyetComponent },


    ])
  ]
})
export class KabinMaliyetModule { }
