import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { SatisFiyatiComponent } from './satis-fiyati/satis-fiyati.component';
import { MaliyetComponent } from './maliyet/maliyet.component';
import { TanimlarComponent } from './tanimlar/tanimlar.component';
import { TanimlarModule } from '../pages/tanimlar/tanimlar.module';
import { GenelComponent } from './genel/genel.component';



@NgModule({
  declarations: [
    PagesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
     
      {
        path: '',
       
        
        children: [
          {path: 'maliyet',component: MaliyetComponent,loadChildren: () =>import(  '../pages/maliyet/maliyet.module').then((m) => m.MaliyetModule), },
        ],
      },
      {
        path: '',
        children: [
          {path: 'tanimlar',component: TanimlarComponent,loadChildren: () =>import(  '../pages/tanimlar/tanimlar.module').then((m) => m.TanimlarModule),},
        ],
      },
      {
        path: '',
        children: [{path: 'satis-fiyati',component: SatisFiyatiComponent,loadChildren: () =>import('../pages/satis-fiyati/satis-fiyati.module').then((m) => m.SatisFiyatiModule),},],
      },
      {
        path: '',
        children: [{path: 'genel',component: GenelComponent,loadChildren: () =>import('../pages/genel/genel.module').then((m) => m.GenelModule),},],
      },
      

    ]),
  ]
})
export class PagesModule { }
