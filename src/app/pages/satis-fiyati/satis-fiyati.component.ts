import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-satis-fiyati',
  templateUrl: './satis-fiyati.component.html',
  styleUrls: ['./satis-fiyati.component.scss']
})
export class SatisFiyatiComponent {

  menu = [
    {
      label: 'Kartlar',
      expanded: false,
      icon: '',
      href: '',
      submenu: [
       
        {
          label: 'Kabinler',
          tabItem:'kabin',
          icon: 'fa fa-inbox',
          submenu: [  ],
          href: '/satis-fiyati/kabin',
          expanded: false,
        },
        
        // {
        //   label: 'Butonlar',
        //   tabItem:'buton',
        //   icon: 'fa fa-inbox',
        //   submenu: [  ],
        //   href: '/satis-fiyati/buton',
        //   expanded: false,
        // },
        {
          label: 'Kapılar',
          tabItem:'kapi',
          icon: 'fa fa-inbox',
          submenu: [  ],
          href: '/satis-fiyati/kapi',
          expanded: false,
        },
        // {
        //   label: 'Kasnaklar',
        //   tabItem:'kasnak',
        //   icon: 'fa fa-inbox',
        //   submenu: [  ],
        //   href: '/satis-fiyati/kasnak',
        //   expanded: false,
        // },
        // {
        //   label: 'Makine Şasesi',
        //   tabItem:'makineSasesi',
        //   icon: 'fa fa-inbox',
        //   submenu: [  ],
        //   href: '/satis-fiyati/makine-sasesi',
        //   expanded: false,
        // },
        // {
        //   label: 'Süspansiyonlar',
        //   tabItem:'suspansiyon',
        //   icon: 'fa fa-inbox',
        //   submenu: [  ],
        //   href: '/satis-fiyati/suspansiyon',
        //   expanded: false,
        // },
        
      ],
    },
  

  ];



  constructor(private router:Router) {
    
  }
  ngOnInit(): void {
    this.selectedTab=  localStorage.getItem('satis-fiyati');
    this.router.navigate([`satis-fiyati/${this.selectedTab}`])
  }

  toggleNode(node: any) {
    node.expanded = !node.expanded;
  }


  selectedTab: string = 'kabin';  // Varsayılan olarak "kabin" sekmesi seçili

  selectTab(tab: any) {
    console.log(tab);
    localStorage.setItem('satis-fiyati',tab.tabItem)
    this.selectedTab = tab.tabItem;  // Tıklanan sekmeyi seç;
    this.router.navigate([`satis-fiyati/${tab.tabItem}`])
  }
}
