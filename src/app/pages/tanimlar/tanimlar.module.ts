import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TanimlarComponent } from './tanimlar.component';
import { RouterModule } from '@angular/router';
import { StokComponent } from './stok/stok.component';
import { PersonelComponent } from './personel/personel.component';
import { UrunComponent } from './urun/urun.component';
import { KabinComponent } from './kabin/kabin.component';
import { ButonComponent } from './buton/buton.component';
import { KapiComponent } from './kapi/kapi.component';
import { KasnakComponent } from './kasnak/kasnak.component';
import { MakineSasesiComponent } from '../tanimlar/makine-sasesi/makine-sasesi.component';
import { SuspansiyonComponent } from './suspansiyon/suspansiyon.component';
import { GenelGiderComponent } from './genel-gider/genel-gider.component';
import { AgirlikSasesiComponent } from './agirlik-sasesi/agirlik-sasesi.component';
import { KapiGrupComponent } from './kapi-grup/kapi-grup.component';



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
             { path: 'urun', component: UrunComponent, loadChildren: () => import("../tanimlar/urun/urun.module").then(m => m.UrunModule) },
             { path: 'kabin', component: KabinComponent, loadChildren: () => import("../tanimlar/kabin/kabin.module").then(m => m.KabinModule) },
             { path: 'buton', component: ButonComponent, loadChildren: () => import("../tanimlar/buton/buton.module").then(m => m.ButonModule) },
             { path: 'kapi', component: KapiComponent, loadChildren: () => import("../tanimlar/kapi/kapi.module").then(m => m.KapiModule) },
             { path: 'kapi-grup', component: KapiGrupComponent, loadChildren: () => import("../tanimlar/kapi-grup/kapi-grup.module").then(m => m.KapiGrupModule) },
             { path: 'kasnak', component: KasnakComponent, loadChildren: () => import("../tanimlar/kasnak/kasnak.module").then(m => m.KasnakModule) },
             { path: 'makine-sasesi', component: MakineSasesiComponent, loadChildren: () => import("../tanimlar/makine-sasesi/makine-sasesi.module").then(m => m.MakineSasesiModule) },
             { path: 'agirlik-sasesi', component: AgirlikSasesiComponent, loadChildren: () => import("../tanimlar/agirlik-sasesi/agirlik-sasesi.module").then(m => m.AgirlikSasesiModule) },
             { path: 'suspansiyon', component: SuspansiyonComponent, loadChildren: () => import("../tanimlar/suspansiyon/suspansiyon.module").then(m => m.SuspansiyonModule) },
             { path: 'genel-gider', component: GenelGiderComponent, loadChildren: () => import("../tanimlar/genel-gider/genel-gider.module").then(m => m.GenelGiderModule) },

          ]
        },
        
      ]),
  ]
})
export class TanimlarModule { }
