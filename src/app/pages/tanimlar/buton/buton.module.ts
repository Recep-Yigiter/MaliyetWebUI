import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButonComponent } from './buton.component';
import { ButonDesignComponent } from './design/design.component';
import { ButonFormComponent } from './components/urun-form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ButonComponent,
    ButonDesignComponent,
    ButonFormComponent
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
               { path: 'list', component: ButonComponent },
        
        
            ])
  ]
})
export class ButonModule { }