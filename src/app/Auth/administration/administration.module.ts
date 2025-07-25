import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ButtonModule } from 'primeng/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { authGuard } from '../core/guards/auth.guard';
import { AdministrationComponent } from './administration.component';
import { RoleComponent } from './role/role.component';
import { UserComponent } from './user/user.component';
import { AuthorizeMenuComponent } from './authorize-menu/authorize-menu.component';

@NgModule({
  declarations: [
    AdministrationComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    FormsModule,
    AgGridAngular,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    ButtonModule,
    MatCheckboxModule,
    TableModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      {
        path: '',
        children: [
          { path: 'role', component: RoleComponent, loadChildren: () => import('../administration/role/role.module').then((m) => m.RoleModule), },
        ],
      },
      {
        path: '',
        children: [
          { path: 'user', component: UserComponent, loadChildren: () => import('../administration/user/user.module').then((m) => m.UserModule), },
        ],
      },
      {
        path: '',
        children: [
          { path: 'authorize-menu', component: AuthorizeMenuComponent, loadChildren: () => import('../administration/authorize-menu/authorize-menu.module').then((m) => m.AuthorizeMenuModule), },
        ],
      },
    ])
  ]
})
export class AdministrationModule { }
