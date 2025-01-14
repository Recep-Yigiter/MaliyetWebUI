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
          label: 'Urunler',
          tabItem:'urun',
          icon: 'fa fa-inbox',
          submenu: [  ],
          href: '/tanimlar/urun',
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
    this.selectedTab=  localStorage.getItem('tanimlar');
    this.router.navigate([`tanimlar/${this.selectedTab}`])
  }

  toggleNode(node: any) {
    node.expanded = !node.expanded;
  }


  selectedTab: string = 'kabin';  // Varsayılan olarak "kabin" sekmesi seçili

  selectTab(tab: any) {
    localStorage.setItem('tanimlar',tab.tabItem)
    this.selectedTab = tab.tabItem;  // Tıklanan sekmeyi seç;
    this.router.navigate([`tanimlar/${tab.tabItem}`])
  }
}
