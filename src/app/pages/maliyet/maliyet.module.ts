import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaliyetComponent } from './maliyet.component';
import { RouterModule } from '@angular/router';
import { ButonMaliyetComponent } from './buton-maliyet/buton-maliyet.component';



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
             { path: 'buton-maliyet', component: ButonMaliyetComponent, loadChildren: () => import("../maliyet/buton-maliyet/buton-maliyet.module").then(m => m.ButonMaliyetModule) },

          ]
        },
        
      ]),
  ]
})
export class MaliyetModule { }
