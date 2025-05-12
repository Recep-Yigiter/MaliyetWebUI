import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { AgirlikSasesiComponent } from './agirlik-sasesi.component';
import { GenelDesignComponent } from './core/design/design.component';
import { GenelFormComponent } from './core/components/urun-form';
import { CreateAgirlikSasesiComponent } from './create-agirlik-sasesi/create-agirlik-sasesi.component';
import { UpdateAgirlikSasesiComponent } from './update-agirlik-sasesi/update-agirlik-sasesi.component';
import { AgirlikSasesiIscilikModalComponent } from './core/settings/agirlik-sasesi-iscilik';
import { AgirlikSasesiGenelGiderModalComponent } from './core/settings/agirlik-sasesi-genel-gider';




@NgModule({
  declarations: [
    AgirlikSasesiComponent,
    GenelDesignComponent,
    GenelFormComponent,
    CreateAgirlikSasesiComponent,
    UpdateAgirlikSasesiComponent,
    AgirlikSasesiIscilikModalComponent,
    AgirlikSasesiGenelGiderModalComponent
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


    ])
  ]
})
export class AgirlikSasesiModule { }
