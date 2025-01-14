import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KabinComponent } from './kabin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { KabinFiyatFormComponent } from './core/components/kabin-maliyet-form';
import { KabinDesignComponent } from './core/design/design.component';


@NgModule({
  declarations: [
    KabinComponent,
    KabinFiyatFormComponent,
    KabinDesignComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular,
    DividerModule,
    DialogModule,
    DropdownModule,
    TableModule,
    CardModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      // { path: 'create', component: CreateButonMaliyetComponent },
       { path: 'list', component: KabinComponent },
        
        
    ])
  ]
})
export class KabinModule { }
