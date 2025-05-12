import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KapiGrupComponent } from './kapi-grup.component';
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
import { CreateKapiGrupComponent } from './create-kapi-grup/create-kapi-grup.component';
import { UpdateKapiGrupComponent } from './update-kapi-grup/update-kapi-grup.component';
import { KasaKapiGrupIscilikModalComponent } from './core/settings/iscilik/kasa-kapi-grup-iscilik';
import { MekanizmaKapiGrupIscilikModalComponent } from './core/settings/iscilik/mekanizma-kapi-grup-iscilik';
import { PanelKapiGrupIscilikModalComponent } from './core/settings/iscilik/panel-kapi-grup-iscilik';
import { KapiGrupGenelGiderModalComponent } from './core/settings/kapi-grup-genel-gider';


@NgModule({
  declarations: [
    KapiGrupComponent,
    GenelDesignComponent,
    GenelFormComponent,
    CreateKapiGrupComponent,
    UpdateKapiGrupComponent,
    KasaKapiGrupIscilikModalComponent,
    MekanizmaKapiGrupIscilikModalComponent,
    PanelKapiGrupIscilikModalComponent,

    KapiGrupGenelGiderModalComponent,
    
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
export class KapiGrupModule { }
