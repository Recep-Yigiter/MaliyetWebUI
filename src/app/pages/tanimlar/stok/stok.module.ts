import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StokComponent } from './stok.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { RouterModule } from '@angular/router';
import { StokTanimlarDesignComponent } from './core/design/design.component';
import { StokFormComponent } from './core/components/stok-form';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { CreateStokComponent } from './create-stok/create-stok.component';
import { UpdateStokComponent } from './update-stok/update-stok.component';


@NgModule({
  declarations: [
    StokComponent,
    StokTanimlarDesignComponent,
    StokFormComponent,
    CreateStokComponent,
    UpdateStokComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular,
    DividerModule,
    DialogModule,
    DropdownModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      // { path: 'create', component: CreateButonMaliyetComponent },
       { path: 'list', component: StokComponent },


    ])
  ]
})
export class StokModule { }
