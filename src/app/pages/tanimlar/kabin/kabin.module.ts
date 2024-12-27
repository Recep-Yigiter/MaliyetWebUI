import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KabinComponent } from './kabin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { DividerModule } from 'primeng/divider';
import { RouterModule } from '@angular/router';
import { KabinDesignComponent } from './design/design.component';
import { KabinFormComponent } from './components/urun-form';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [
    KabinComponent,
    KabinDesignComponent,
    KabinFormComponent
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
           { path: 'list', component: KabinComponent },
    
    
        ])
  ]
})
export class KabinModule { }
