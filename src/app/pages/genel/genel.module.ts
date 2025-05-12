import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenelComponent } from './genel.component';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { KabinComponent } from './kabin/kabin.component';
import { SuspansiyonComponent } from './suspansiyon/suspansiyon.component';
import { MakineSasesiComponent } from './makine-sasesi/makine-sasesi.component';
import { AgirlikSasesiComponent } from './agirlik-sasesi/agirlik-sasesi.component';
import { KapiGrupComponent } from './kapi-grup/kapi-grup.component';



@NgModule({
  declarations: [
    GenelComponent
  ],
  imports: [
    CommonModule,
    TableModule,
        RouterModule.forChild(
          [
            {
              path: "",
              children: [
                 { path: 'kabin', component: KabinComponent, loadChildren: () => import("../genel/kabin/kabin.module").then(m => m.KabinModule) },
                 { path: 'suspansiyon', component: SuspansiyonComponent, loadChildren: () => import("../genel/suspansiyon/suspansiyon.module").then(m => m.SuspansiyonModule) },
                 { path: 'makine-sasesi', component: MakineSasesiComponent, loadChildren: () => import("../genel/makine-sasesi/makine-sasesi.module").then(m => m.MakineSasesiModule) },
                 { path: 'agirlik-sasesi', component: AgirlikSasesiComponent, loadChildren: () => import("../genel/agirlik-sasesi/agirlik-sasesi.module").then(m => m.AgirlikSasesiModule) },
                 { path: 'kapi-grup', component: KapiGrupComponent, loadChildren: () => import("../genel/kapi-grup/kapi-grup.module").then(m => m.KapiGrupModule) },
    
              ]
            },
            
          ]),
  ]
})
export class GenelModule { }
