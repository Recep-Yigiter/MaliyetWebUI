import { Component } from '@angular/core';

@Component({
  selector: 'app-satis-fiyati',
  templateUrl: './satis-fiyati.component.html',
  styleUrls: ['./satis-fiyati.component.scss']
})
export class SatisFiyatiComponent {
  menu = [
    {
      label: 'Satış Fiyatları',
      expanded: false,
      icon: '',
      href: '',
      submenu: [
        {
          label: 'Buton Satış ',
          icon: 'fa fa-inbox',
          submenu: [
          {
            label: 'TAM BOY BUTON (SAT. PAS. BUTON)',
            icon: 'fa fa-inbox',
            submenu: [],
            href: '',
            expanded: false,
          },
          {
            label: 'SAT. PAS. DOT GÖST.KAT BUTONU',
            icon: 'fa fa-inbox',
            submenu: [],
            href: '',
            expanded: false,
          },
          {
            label: 'Opsiyonlar',
            icon: 'fa fa-inbox',
            submenu: [],
            href: '',
            expanded: false,
          },
        ],
          href: '',
          expanded: false,
        },
        
      ],
    },

  ];


  toggleNode(node: any) {
    node.expanded = !node.expanded;
  }
}
