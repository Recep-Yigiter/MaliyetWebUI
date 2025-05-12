import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KabinComponent } from './kabin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';
import { RouterModule } from '@angular/router';
import { GenelComponent } from '../genel.component';
import { GenelDesignComponent } from './core/design/design.component';
import { GenelFormComponent } from './core/components/urun-form';
import { CreateKabinComponent } from './create-kabin/create-kabin.component';
import { UpdateKabinComponent } from './update-kabin/update-kabin.component';
import { KabinIscilikModalComponent } from './core/settings/kabin-iscilik';
import { KabinGenelGiderModalComponent } from './core/settings/kabin-genel-gider';


@NgModule({
  declarations: [
    KabinComponent,
    GenelDesignComponent,
    GenelFormComponent,
    CreateKabinComponent,
    UpdateKabinComponent,
    KabinIscilikModalComponent,
    KabinGenelGiderModalComponent
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
export class KabinModule { }
