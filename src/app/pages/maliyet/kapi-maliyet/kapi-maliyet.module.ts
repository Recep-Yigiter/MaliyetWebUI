import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KapiMaliyetComponent } from './kapi-maliyet.component';
import { KapiDesignComponent } from './core/design/design.component';
import { KapiMaliyetFormComponent } from './core/components/kasnak-maliyet-form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { TableModule } from 'primeng/table';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import { ListboxModule } from 'primeng/listbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import {MatRadioModule} from '@angular/material/radio';
import { KapiGenelGiderlerTableComponent } from './core/tables/genel-giderler-table';
import { KapiIscilikGiderlerTableComponent } from './core/tables/iscilik-giderler-table';
import { KapiMalzemeGiderlerTableComponent } from './core/tables/malzeme-giderler-table';
import { KapiMaliyetTableComponent } from './core/tables/maliyet-table';
import { KapiFiyatTableComponent } from './core/tables/fiyat-table';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [
    KapiMaliyetComponent,
    KapiDesignComponent,
    KapiMaliyetFormComponent,
    KapiGenelGiderlerTableComponent,
    KapiIscilikGiderlerTableComponent,
    KapiMalzemeGiderlerTableComponent,
    KapiMaliyetTableComponent,
    KapiFiyatTableComponent
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
    MatRadioModule,
    AccordionModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      // { path: 'create', component: CreateButonMaliyetComponent },
      // { path: 'list', component: ListButonMaliyetComponent },
    ])
  ]
})
export class KapiMaliyetModule { }
