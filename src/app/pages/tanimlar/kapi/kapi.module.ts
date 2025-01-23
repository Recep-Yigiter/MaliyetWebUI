import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KapiComponent } from './kapi.component';
import { KapiDesignComponent } from './core/design/design.component';
import { KapiFormComponent } from './core/components/urun-form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { CreateKapiComponent } from './create-kapi/create-kapi.component';
import { UpdateKapiComponent } from './update-kapi/update-kapi.component';
import { CreateKapiGrupComponent } from './create-kapi-grup/create-kapi-grup.component';
import { AccordionModule } from 'primeng/accordion';
import { UpdateKapiGrupComponent } from './update-kapi-grup/update-kapi-grup.component';



@NgModule({
  declarations: [
    KapiComponent,
    KapiDesignComponent,
    KapiFormComponent,
    CreateKapiComponent,
    UpdateKapiComponent,
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
                   { path: 'list', component: KapiComponent },
            
            
                ])
  ]
})
export class KapiModule { }
