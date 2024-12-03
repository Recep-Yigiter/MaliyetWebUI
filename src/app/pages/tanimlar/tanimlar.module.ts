import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TanimlarComponent } from './tanimlar.component';
import { RouterModule } from '@angular/router';
import { StokComponent } from './stok/stok.component';
import { PersonelComponent } from './personel/personel.component';



@NgModule({
  declarations: [
    TanimlarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(
      [
        {
          path: "",
          children: [
             { path: 'stok', component: StokComponent, loadChildren: () => import("../tanimlar/stok/stok.module").then(m => m.StokModule) },
             { path: 'personel', component: PersonelComponent, loadChildren: () => import("../tanimlar/personel/personel.module").then(m => m.PersonelModule) },

          ]
        },
        
      ]),
  ]
})
export class TanimlarModule { }
