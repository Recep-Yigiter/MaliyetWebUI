import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';
import { UserDesignComponent } from './core/design/design.component';
import { UserFormComponent } from './core/components/urun-form';
import { UserRolesComponent } from './core/user-roles/user-roles.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { RolAtaModalComponent } from './rol-ata-modal/rol-ata-modal.component';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    UserComponent,
    UserDesignComponent,
    UserFormComponent,
    UserRolesComponent,
    CreateUserComponent,
    UpdateUserComponent,
    RolAtaModalComponent,
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
    MatListModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      { path: 'list', component: UserComponent },


    ])
  ]
})
export class UserModule { }
