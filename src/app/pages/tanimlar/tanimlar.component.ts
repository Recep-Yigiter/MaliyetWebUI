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
        
      ],
    },
  

  ];


  toggleNode(node: any) {
    node.expanded = !node.expanded;
  }
}
