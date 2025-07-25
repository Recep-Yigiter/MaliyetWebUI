import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './Auth/login/login.component';
import { authGuard } from './Auth/core/guards/auth.guard';
import { noAuthGuard } from './Auth/core/guards/no-auth.guard';
import { AdministrationComponent } from './Auth/administration/administration.component';
import { roleGuard } from './Auth/core/guards/role.guard';

const routes: Routes = [
  {
    path: "", component: PagesComponent, canActivate: [authGuard],
    children: [{ path: '', loadChildren: () => import("../app/pages/pages.module").then(m => m.PagesModule), canActivate: [authGuard], }]
  },
  {
    path: "login", component: LoginComponent, canActivate: [noAuthGuard],
  },

  {
    path: "administration",component: PagesComponent ,
    children: [
      { path: '', component: AdministrationComponent, loadChildren: () => import("../app/Auth/administration/administration.module").then(m => m.AdministrationModule), canActivate: [authGuard,roleGuard] },
      // { path: '', loadChildren: () => import("../user/user.module").then(m => m.UserModule), canActivate: [authGuard] },
    ],canActivate: [authGuard,roleGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
