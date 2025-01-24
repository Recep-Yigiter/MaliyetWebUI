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
import { SuspansiyonDesignComponent } from './core/design/design.component';
import { SuspansiyonFormComponent } from './core/components/urun-form';
import { CreateSuspansiyonComponent } from './create-suspansiyon/create-suspansiyon.component';
import { UpdateSuspansiyonComponent } from './update-suspansiyon/update-suspansiyon.component';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [
    SuspansiyonComponent,
    SuspansiyonDesignComponent,
    SuspansiyonFormComponent,
    CreateSuspansiyonComponent,
    UpdateSuspansiyonComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular,
    DividerModule,
    DialogModule,
    DropdownModule,
    TableModule,
    AccordionModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      // { path: 'create', component: CreateButonMaliyetComponent },
       { path: 'list', component: SuspansiyonComponent },
    
    
    ])
  ]
})
export class SuspansiyonModule { }
