import { Component } from '@angular/core';

@Component({
  selector: 'app-maliyet',
  templateUrl: './maliyet.component.html',
  styleUrls: ['./maliyet.component.scss']
})
export class MaliyetComponent {
  menu = [
    {
      label: 'Hesap',
      expanded: false,
      icon: '',
      href: '',
      submenu: [
        {
          label: 'Kabin',
          icon: 'fa fa-inbox',
          submenu: [],
          href: '/maliyet/kabin-maliyet',
          expanded: false,
        },
        {
          label: 'Agırlık Saşesi',
          icon: 'fa fa-inbox',
          submenu: [],
          href: '/maliyet/agirlik-sasesi-maliyet',
          expanded: false,
        },
        {
          label: 'Makine Saşesi',
          icon: 'fa fa-inbox',
          submenu: [],
          href: '/maliyet/makine-sasesi-maliyet',
          expanded: false,
        },
        
        {
          label: 'Kapı',
          icon: 'fa fa-inbox',
          submenu: [],
          href: '',
          expanded: false,
        },
        {
          label: 'Süspansiyon',
          icon: 'fa fa-inbox',
          submenu: [],
          href: '/maliyet/suspansiyon-maliyet',
          expanded: false,
        },
        {
          label: 'Buton',
          icon: 'fa fa-inbox',
          submenu: [],
          href: '/maliyet/buton-maliyet',
          expanded: false,
        },
        {
          label: 'Kasnak',
          icon: 'fa fa-inbox',
          submenu: [],
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
