import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButonComponent } from './buton.component';
import { ButonDesignComponent } from './core/design/design.component';
import { ButonFormComponent } from './core/components/urun-form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { CreateButonComponent } from './create-buton/create-buton.component';
import { AccordionModule } from 'primeng/accordion';
import { UpdateButonComponent } from './update-buton/update-buton.component';



@NgModule({
  declarations: [
    ButonComponent,
    ButonDesignComponent,
    ButonFormComponent,
    CreateButonComponent,
    UpdateButonComponent
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
               { path: 'list', component: ButonComponent },
        
        
            ])
  ]
})
export class ButonModule { }
