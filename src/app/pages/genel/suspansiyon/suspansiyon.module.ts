import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuspansiyonComponent } from './suspansiyon.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';
import { RouterModule } from '@angular/router';
import { GenelDesignComponent } from './core/design/design.component';
import { GenelFormComponent } from './core/components/urun-form';
import { CreateSuspansiyonComponent } from './create-suspansiyon/create-suspansiyon.component';
import { UpdateSuspansiyonComponent } from './update-suspansiyon/update-suspansiyon.component';
import { SuspansiyonIscilikModalComponent } from './core/settings/suspansiyon-iscilik';
import { SuspansiyonGenelGiderModalComponent } from './core/settings/suspansiyon-genel-gider';



@NgModule({
  declarations: [
    SuspansiyonComponent,
    GenelDesignComponent,
    GenelFormComponent,
    CreateSuspansiyonComponent,
    UpdateSuspansiyonComponent,
    SuspansiyonIscilikModalComponent,
    SuspansiyonGenelGiderModalComponent
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
      // { path: 'list', component: GenelComponent },


    ])
  ]
})
export class SuspansiyonModule { }
