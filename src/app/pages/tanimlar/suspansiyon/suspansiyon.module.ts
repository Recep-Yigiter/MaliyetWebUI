import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuspansiyonComponent } from './suspansiyon.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { SuspansiyonDesignComponent } from './design/design.component';
import { SuspansiyonFormComponent } from './components/urun-form';

@NgModule({
  declarations: [
    SuspansiyonComponent,
    SuspansiyonDesignComponent,
    SuspansiyonFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular,
    DividerModule,
    DialogModule,
    DropdownModule,
    TableModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      // { path: 'create', component: CreateButonMaliyetComponent },
       { path: 'list', component: SuspansiyonComponent },
    
    
    ])
  ]
})
export class SuspansiyonModule { }
