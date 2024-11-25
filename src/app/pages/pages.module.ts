import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { SatisFiyatiComponent } from './satis-fiyati/satis-fiyati.component';
import { MaliyetComponent } from './maliyet/maliyet.component';
import { TanimlarComponent } from './tanimlar/tanimlar.component';



@NgModule({
  declarations: [
    PagesComponent,
    SatisFiyatiComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: TanimlarComponent,
        
        children: [
          {
            path: 'tanimlar',
            loadChildren: () =>
              import(
                '../pages/tanimlar/tanimlar.module'
              ).then((m) => m.TanimlarModule),
           
          },
        ],
      },
      {
        path: '',
        component: SatisFiyatiComponent,
        
        children: [
          {
            path: 'satis-fiyati',
            loadChildren: () =>
              import(
                '../pages/satis-fiyati/satis-fiyati.module'
              ).then((m) => m.SatisFiyatiModule),
           
          },
        ],
      },
      {
        path: '',
        component: MaliyetComponent,
        
        children: [
          {
            path: 'maliyet',
            loadChildren: () =>
              import(
                '../pages/maliyet/maliyet.module'
              ).then((m) => m.MaliyetModule),
           
          },
        ],
      },

    ]),
  ]
})
export class PagesModule { }
