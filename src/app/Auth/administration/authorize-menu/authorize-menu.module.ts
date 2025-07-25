import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizeMenuComponent } from './authorize-menu.component';
import { AuthorizeMenuFormComponent } from './core/components/urun-form';
import { AuthorizeMenuDesignComponent } from './core/design/design.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { RouterModule } from '@angular/router';
import { RolAtamaModelComponent } from './rol-atama-model/rol-atama-model.component';
import { MatListModule } from '@angular/material/list';



@NgModule({
  declarations: [
    AuthorizeMenuComponent,
    AuthorizeMenuFormComponent,
    AuthorizeMenuDesignComponent,
    RolAtamaModelComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular,
    DividerModule,
    DialogModule,
    DropdownModule,
    MatListModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      // { path: 'create', component: CreateButonMaliyetComponent },
      { path: 'list', component: AuthorizeMenuComponent },


    ])
  ]
})
export class AuthorizeMenuModule { }
