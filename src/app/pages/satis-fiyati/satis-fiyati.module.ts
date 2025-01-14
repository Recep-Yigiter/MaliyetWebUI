import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SatisFiyatiComponent } from './satis-fiyati.component';
import { AgGridAngular } from 'ag-grid-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { KabinComponent } from './kabin/kabin.component';
import { KapiComponent } from './kapi/kapi.component';



@NgModule({
  declarations: [
    SatisFiyatiComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    RouterModule.forChild(
      [
        {
          path: "",
          children: [
             { path: 'kabin', component: KabinComponent, loadChildren: () => import("../satis-fiyati/kabin/kabin.module").then(m => m.KabinModule) },
             { path: 'kapi', component: KapiComponent, loadChildren: () => import("../satis-fiyati/kapi/kapi.module").then(m => m.KapiModule) },

          ]
        },
        
      ]),
  ]
})
export class SatisFiyatiModule { }
