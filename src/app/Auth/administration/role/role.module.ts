import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { RoleFormComponent } from './core/components/urun-form';
import { RoleDesignComponent } from './core/design/design.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';
import { CreateRoleComponent } from './create-role/create-role.component';
import { UpdateRoleComponent } from './update-role/update-role.component';


@NgModule({
  declarations: [
    RoleComponent,
        RoleDesignComponent,
    RoleFormComponent,
    CreateRoleComponent,
    UpdateRoleComponent,
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
          { path: 'list', component: RoleComponent },
    
    
        ])
  ]
})
export class RoleModule { }
