import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaliyetComponent } from './maliyet.component';
import { RouterModule } from '@angular/router';
import { ButonMaliyetComponent } from './buton-maliyet/buton-maliyet.component';
import { SuspansiyonMaliyetComponent } from './suspansiyon-maliyet/suspansiyon-maliyet.component';
import { KabinMaliyetComponent } from './kabin-maliyet/kabin-maliyet.component';
import { AgirlikSasesiComponent } from './agirlik-sasesi/agirlik-sasesi.component';
import { MakineSasesiComponent } from './makine-sasesi/makine-sasesi.component';
import { KasnakMaliyetComponent } from './kasnak-maliyet/kasnak-maliyet.component';
import { KapiMaliyetComponent } from './kapi-maliyet/kapi-maliyet.component';
import { TableModule } from 'primeng/table';
import { GenelComponent } from './genel/genel.component';



@NgModule({
  declarations: [
    MaliyetComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    RouterModule.forChild(
      [
        {
          path: "",
          children: [
             { path: 'agirlik-sasesi-maliyet', component: AgirlikSasesiComponent, loadChildren: () => import("../maliyet/agirlik-sasesi/agirlik-sasesi.module").then(m => m.AgirlikSasesiModule) },
             { path: 'makine-sasesi-maliyet', component: MakineSasesiComponent, loadChildren: () => import("../maliyet/makine-sasesi/makine-sasesi.module").then(m => m.MakineSasesiModule) },
             { path: 'agirlik-sasesi-maliyet', component: AgirlikSasesiComponent, loadChildren: () => import("../maliyet/agirlik-sasesi/agirlik-sasesi.module").then(m => m.AgirlikSasesiModule) },
             { path: 'kabin-maliyet', component: KabinMaliyetComponent, loadChildren: () => import("../maliyet/kabin-maliyet/kabin-maliyet.module").then(m => m.KabinMaliyetModule) },
             { path: 'buton-maliyet', component: ButonMaliyetComponent, loadChildren: () => import("../maliyet/buton-maliyet/buton-maliyet.module").then(m => m.ButonMaliyetModule) },
             { path: 'suspansiyon-maliyet', component: SuspansiyonMaliyetComponent, loadChildren: () => import("../maliyet/suspansiyon-maliyet/suspansiyon-maliyet.module").then(m => m.SuspansiyonMaliyetModule) },
             { path: 'kasnak-maliyet', component: KasnakMaliyetComponent, loadChildren: () => import("../maliyet/kasnak-maliyet/kasnak-maliyet.module").then(m => m.KasnakMaliyetModule) },
             { path: 'kapi-maliyet', component: KapiMaliyetComponent, loadChildren: () => import("../maliyet/kapi-maliyet/kapi-maliyet.module").then(m => m.KapiMaliyetModule) },
             { path: 'genel', component: GenelComponent, loadChildren: () => import("../maliyet/genel/genel.module").then(m => m.GenelModule) },

          ]
        },
        
      ]),
  ]
})
export class MaliyetModule { }
