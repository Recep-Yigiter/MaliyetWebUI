import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenelComponent } from './genel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';
import { RouterModule } from '@angular/router';
import { GenelFormComponent } from './core/components/urun-form';
import { GenelDesignComponent } from './core/design/design.component';
import { KabinMaliyetTablosuComponent } from './kabin-maliyet-tablosu/kabin-maliyet-tablosu.component';



@NgModule({
  declarations: [
    GenelComponent,
    GenelFormComponent,
    GenelDesignComponent,
    KabinMaliyetTablosuComponent
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
      { path: 'list', component: GenelComponent },


    ])
  ]
})
export class GenelModule { }
