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



@NgModule({
  declarations: [
    KabinMaliyetComponent,
    KabinMaliyetFormComponent,
    KabinDesignComponent
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
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      // { path: 'create', component: CreateButonMaliyetComponent },
      // { path: 'list', component: ListButonMaliyetComponent },


    ])
  ]
})
export class KabinMaliyetModule { }
