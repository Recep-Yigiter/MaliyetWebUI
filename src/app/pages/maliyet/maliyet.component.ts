import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  /**
   *
   */
  constructor(private router:Router) {
    
  }

  toggleNode(node: any) {
    node.expanded = !node.expanded;
  }


  selectedTab: string = 'kabin';  // Varsayılan olarak "kabin" sekmesi seçili

  selectTab(tab: string) {
    console.log(tab);
    this.selectedTab = tab;  // Tıklanan sekmeyi seç
    this.router.navigate([`maliyet/${tab}-maliyet`])
  }
}
