import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenelGiderComponent } from './genel-gider.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';
import { RouterModule } from '@angular/router';
import { GenelGiderDesignComponent } from './core/design/design.component';
import { GenelGiderFormComponent } from './core/components/urun-form';
import { CreateGenelGiderComponent } from './create-genel-gider/create-genel-gider.component';
import { UpdateGenelGiderComponent } from './update-genel-gider/update-genel-gider.component';
import { UpdateGenelGiderKatsayiComponent } from './update-genel-gider-katsayi/update-genel-gider-katsayi.component';



@NgModule({
  declarations: [
    GenelGiderComponent,
    GenelGiderDesignComponent,
    GenelGiderFormComponent,
    CreateGenelGiderComponent,
    UpdateGenelGiderComponent,
    UpdateGenelGiderKatsayiComponent
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
           { path: 'list', component: GenelGiderComponent },
        
        
        ])
  ]
})
export class GenelGiderModule { }
