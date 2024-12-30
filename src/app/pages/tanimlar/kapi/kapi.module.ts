import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KapiComponent } from './kapi.component';
import { KapiDesignComponent } from './design/design.component';
import { KapiFormComponent } from './components/urun-form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    KapiComponent,
    KapiDesignComponent,
    KapiFormComponent
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
                   { path: 'list', component: KapiComponent },
            
            
                ])
  ]
})
export class KapiModule { }
