import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KapiGrupComponent } from './kapi-grup.component';
import { KapiGrupFormComponent } from './core/components/urun-form';
import { KapiGrupDesignComponent } from './core/design/design.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';
import { RouterModule } from '@angular/router';
import { CreateKapiGrupComponent } from './create-kapi-grup/create-kapi-grup.component';
import { UpdateKapiGrupComponent } from './update-kapi-grup/update-kapi-grup.component';



@NgModule({
  declarations: [
    KapiGrupComponent,
    KapiGrupFormComponent,
    KapiGrupDesignComponent,
    CreateKapiGrupComponent,
    UpdateKapiGrupComponent
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
       { path: 'list', component: KapiGrupComponent },
    
    
    ])
  ]
})
export class KapiGrupModule { }
