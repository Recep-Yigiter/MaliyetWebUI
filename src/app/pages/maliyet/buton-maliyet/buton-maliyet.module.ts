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
@NgModule({
  declarations: [
    ButonMaliyetComponent,


    ButonDesignComponent,
    ButonMaliyetFormComponent
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
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      // { path: 'create', component: CreateButonMaliyetComponent },
      // { path: 'list', component: ListButonMaliyetComponent },


    ])
  ]
})
export class ButonMaliyetModule { }
