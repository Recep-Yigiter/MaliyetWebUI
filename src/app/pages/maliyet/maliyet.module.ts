import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaliyetComponent } from './maliyet.component';
import { RouterModule } from '@angular/router';
import { ButonMaliyetComponent } from './buton-maliyet/buton-maliyet.component';
import { SuspansiyonMaliyetComponent } from './suspansiyon-maliyet/suspansiyon-maliyet.component';
import { KabinMaliyetComponent } from './kabin-maliyet/kabin-maliyet.component';



@NgModule({
  declarations: [
    MaliyetComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(
      [
        {
          path: "",
          children: [
             { path: 'kabin-maliyet', component: KabinMaliyetComponent, loadChildren: () => import("../maliyet/kabin-maliyet/kabin-maliyet.module").then(m => m.KabinMaliyetModule) },
             { path: 'buton-maliyet', component: ButonMaliyetComponent, loadChildren: () => import("../maliyet/buton-maliyet/buton-maliyet.module").then(m => m.ButonMaliyetModule) },
             { path: 'suspansiyon-maliyet', component: SuspansiyonMaliyetComponent, loadChildren: () => import("../maliyet/suspansiyon-maliyet/suspansiyon-maliyet.module").then(m => m.SuspansiyonMaliyetModule) },

          ]
        },
        
      ]),
  ]
})
export class MaliyetModule { }
