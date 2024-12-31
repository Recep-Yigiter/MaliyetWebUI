import { Component } from '@angular/core';

@Component({
  selector: 'app-maliyet',
  templateUrl: './maliyet.component.html',
  styleUrls: ['./maliyet.component.scss']
})
export class MaliyetComponent {
  
  menu = [
    {
      label: '',
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
          label: 'Buton',
          icon: 'fa fa-inbox',
          submenu: [],
          href: '/maliyet/buton-maliyet',
          expanded: false,
        },
        {
          label: 'Kapı',
          icon: 'fa fa-inbox',
          submenu: [],
          href: '/maliyet/kapi-maliyet',
          expanded: false,
        },
        {
          label: 'Kasnak',
          icon: 'fa fa-inbox',
          submenu: [],
          href: '/maliyet/kasnak-maliyet',
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
          label: 'Makine Saşesi',
          icon: 'fa fa-inbox',
          submenu: [],
          href: '/maliyet/makine-sasesi-maliyet',
          expanded: false,
        },
        
       
      
        
        
        
      ],
    },
  

  ];


  toggleNode(node: any) {
    node.expanded = !node.expanded;
  }
}
