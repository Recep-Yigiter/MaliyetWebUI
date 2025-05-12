import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MakineSasesiComponent } from './makine-sasesi.component';
import { GenelDesignComponent } from './core/design/design.component';
import { GenelFormComponent } from './core/components/urun-form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { CreateMakineSasesiComponent } from './create-makine-sasesi/create-makine-sasesi.component';
import { UpdateMakineSasesiComponent } from './update-makine-sasesi/update-makine-sasesi.component';
import { MakineSasesiIscilikModalComponent } from './core/settings/makine-sasesi-iscilik';
import { MakineSasesiGenelGiderModalComponent } from './core/settings/makine-sasesi-genel-gider';



@NgModule({
  declarations: [
    MakineSasesiComponent,
    GenelDesignComponent,
    GenelFormComponent,
    CreateMakineSasesiComponent,
    UpdateMakineSasesiComponent,
    MakineSasesiIscilikModalComponent,
    MakineSasesiGenelGiderModalComponent
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
export class MakineSasesiModule { }
