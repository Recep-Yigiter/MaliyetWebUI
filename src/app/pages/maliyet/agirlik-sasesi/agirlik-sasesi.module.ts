import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgirlikSasesiComponent } from './agirlik-sasesi.component';
import { AgirlikSasesiMaliyetFormComponent } from './core/components/agirlik-sasesi-maliyet-form';
import { AgirlikSasesiDesignComponent } from './core/design/design.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { TableModule } from 'primeng/table';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import { ListboxModule } from 'primeng/listbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AgirlikSasesiComponent,
    AgirlikSasesiMaliyetFormComponent,
    AgirlikSasesiDesignComponent
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
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      // { path: 'create', component: CreateButonMaliyetComponent },
      // { path: 'list', component: ListButonMaliyetComponent },


    ])
  ]
})
export class AgirlikSasesiModule { }
