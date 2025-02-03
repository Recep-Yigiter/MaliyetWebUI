import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
          label: 'Stok',
          tabItem:'stok',
          icon: 'fa fa-inbox',
          submenu: [  ],
          href: '/tanimlar/stok',
          expanded: false,
        },
        {
          label: 'Personel',
          tabItem:'personel',
          icon: 'fa fa-inbox',
          submenu: [  ],
          href: '/tanimlar/personel',
          expanded: false,
        },
        {
          label: 'Genel Giderler',
          tabItem:'genel-gider',
          icon: 'fa fa-inbox',
          submenu: [  ],
          href: '/tanimlar/genel-gider',
          expanded: false,
        },
        
        {
          label: 'Kabinler',
          tabItem:'kabin',
          icon: 'fa fa-inbox',
          submenu: [  ],
          href: '/tanimlar/kabin',
          expanded: false,
        },
        
        {
          label: 'Butonlar',
          tabItem:'buton',
          icon: 'fa fa-inbox',
          submenu: [  ],
          href: '/tanimlar/buton',
          expanded: false,
        },
        {
          label: 'Kapılar',
          tabItem:'kapi',
          icon: 'fa fa-inbox',
          submenu: [  ],
          href: '/tanimlar/kapi',
          expanded: false,
        },
        {
          label: 'Kasnaklar',
          tabItem:'kasnak',
          icon: 'fa fa-inbox',
          submenu: [  ],
          href: '/tanimlar/kasnak',
          expanded: false,
        },
        {
          label: 'Makine Şasesi',
          tabItem:'makine-sasesi',
          icon: 'fa fa-inbox',
          submenu: [  ],
          href: '/tanimlar/makine-sasesi',
          expanded: false,
        },
        {
          label: 'Süspansiyonlar',
          tabItem:'suspansiyon',
          icon: 'fa fa-inbox',
          submenu: [  ],
          href: '/tanimlar/suspansiyon',
          expanded: false,
        },
        
      ],
    },
  

  ];



  constructor(private router:Router) {
    
  }
  ngOnInit(): void {
     const local = JSON.parse(localStorage.getItem('tanimlar'));
     this.selectedTab=local.tabItem;

    // this.router.navigate([`tanimlar/${this.selectedTab}`])
  }

  toggleNode(node: any) {
    node.expanded = !node.expanded;
  }


  selectedTab: string = 'stok';  // Varsayılan olarak "kabin" sekmesi seçili

  selectTab(tab: any) {
    
    var local= localStorage.setItem('tanimlar',JSON.stringify(tab))
    this.selectedTab = tab.tabItem; 
    this.router.navigate([`tanimlar/${tab.tabItem}`])
  }
}
