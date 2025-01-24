import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MakineSasesiComponent } from './makine-sasesi.component';
import { MakineSasesiMaliyetFormComponent } from './core/components/makine-sasesi-maliyet-form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import { ListboxModule } from 'primeng/listbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';

import { MakineSasesiDesignComponent } from './core/design/design.component';
import { MakineSasesiGenelGiderlerTableComponent } from './core/tables/genel-giderler-table';
import { MakineSasesiIscilikGiderlerTableComponent } from './core/tables/iscilik-giderler-table';
import { MakineSasesiMalzemeGiderlerTableComponent } from './core/tables/malzeme-giderler-table';
import { MakineSasesiMaliyetTableComponent } from './core/tables/maliyet-table';
import { MakineSasesiFiyatTableComponent } from './core/tables/fiyat-table';
import { AccordionModule } from 'primeng/accordion';



@NgModule({
  declarations: [
    MakineSasesiComponent,
    MakineSasesiMaliyetFormComponent,
    MakineSasesiDesignComponent,
        MakineSasesiGenelGiderlerTableComponent,
        MakineSasesiIscilikGiderlerTableComponent,
        MakineSasesiMalzemeGiderlerTableComponent,
        MakineSasesiMaliyetTableComponent,
        MakineSasesiFiyatTableComponent
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
export class MakineSasesiModule { }
