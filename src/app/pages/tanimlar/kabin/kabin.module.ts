import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KabinComponent } from './kabin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { DividerModule } from 'primeng/divider';
import { RouterModule } from '@angular/router';
import { KabinDesignComponent } from './core/design/design.component';
import { KabinFormComponent } from './core/components/urun-form';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';
import { CreateKabinComponent } from './create-kabin/create-kabin.component';
import { UpdateKabinComponent } from './update-kabin/update-kabin.component';



@NgModule({
  declarations: [
    KabinComponent,
    KabinDesignComponent,
    KabinFormComponent,
    CreateKabinComponent,
    UpdateKabinComponent
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
           { path: 'list', component: KabinComponent },
    
    
        ])
  ]
})
export class KabinModule { }
