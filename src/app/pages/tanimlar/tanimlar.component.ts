import { Component } from '@angular/core';

@Component({
  selector: 'app-tanimlar',
  templateUrl: './tanimlar.component.html',
  styleUrls: ['./tanimlar.component.scss']
})
export class TanimlarComponent {
  menu = [
    {
      label: 'Kartlar',
      expanded: false,
      icon: '',
      href: '',
      submenu: [
        {
          label: 'Stok ',
          icon: 'fa fa-inbox',
          submenu: [  ],
          href: '/tanimlar/stok',
          expanded: false,
        },
        {
          label: 'Personel ',
          icon: 'fa fa-inbox',
          submenu: [  ],
          href: '/tanimlar/personel',
          expanded: false,
        },
        {
          label: 'Urunler ',
          icon: 'fa fa-inbox',
          submenu: [  ],
          href: '/tanimlar/urun',
          expanded: false,
        },
        {
          label: 'Kabinler ',
          icon: 'fa fa-inbox',
          submenu: [  ],
          href: '/tanimlar/kabin',
          expanded: false,
        },
        
        {
          label: 'Butonlar ',
          icon: 'fa fa-inbox',
          submenu: [  ],
          href: '/tanimlar/buton',
          expanded: false,
        },
        {
          label: 'Kapılar ',
          icon: 'fa fa-inbox',
          submenu: [  ],
          href: '/tanimlar/kapi',
          expanded: false,
        },
        {
          label: 'Kasnaklar ',
          icon: 'fa fa-inbox',
          submenu: [  ],
          href: '/tanimlar/kasnak',
          expanded: false,
        },
        {
          label: 'Makine Şasesi ',
          icon: 'fa fa-inbox',
          submenu: [  ],
          href: '/tanimlar/makine-sasesi',
          expanded: false,
        },
        {
          label: 'Süspansiyonlar ',
          icon: 'fa fa-inbox',
          submenu: [  ],
          href: '/tanimlar/suspansiyon',
          expanded: false,
        },
        
      ],
    },
  

  ];


  toggleNode(node: any) {
    node.expanded = !node.expanded;
  }
}
