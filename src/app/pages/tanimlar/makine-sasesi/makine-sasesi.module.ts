import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MakineSasesiComponent } from './makine-sasesi.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { MakineSasesiFormComponent } from './core/components/urun-form';
import { MakineSasesiDesignComponent } from './core/design/design.component';
import { CreateMakineSasesiComponent } from './create-makine-sasesi/create-makine-sasesi.component';
import { UpdateMakineSasesiComponent } from './update-makine-sasesi/update-makine-sasesi.component';
import { AccordionModule } from 'primeng/accordion';


@NgModule({
  declarations: [
    MakineSasesiComponent,
    MakineSasesiFormComponent,
    MakineSasesiDesignComponent,
    CreateMakineSasesiComponent,
    UpdateMakineSasesiComponent
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
       { path: 'list', component: MakineSasesiComponent },
    
    
    ])
  ]
})
export class MakineSasesiModule { }
