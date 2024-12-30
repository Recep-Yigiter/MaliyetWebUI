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
import { MakineSasesiFormComponent } from './components/urun-form';
import { MakineSasesiDesignComponent } from './design/design.component';


@NgModule({
  declarations: [
    MakineSasesiComponent,
    MakineSasesiFormComponent,
    MakineSasesiDesignComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular,
    DividerModule,
    DialogModule,
    DropdownModule,
    TableModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      // { path: 'create', component: CreateButonMaliyetComponent },
       { path: 'list', component: MakineSasesiComponent },
    
    
    ])
  ]
})
export class MakineSasesiModule { }
