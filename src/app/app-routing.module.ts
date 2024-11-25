import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
  {
    path: "", component: PagesComponent,
    children: [{ path: '', loadChildren: () => import("../app/pages/pages.module").then(m => m.PagesModule),}]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
