import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app ',
  templateUrl: './genel.component.html',
  styleUrls: ['./genel.component.scss']
})
export class GenelComponent implements OnInit {
  
  menu = [
    {
      label: '',
      expanded: false,
      icon: '',
      href: '',
      submenu: [
        {
          label: 'Kabin',
          tabItem:'kabin',
          icon: 'fa fa-inbox',
          submenu: [],
          href: '/genel/kabin',
          expanded: false,

        },
        {
          label: 'Kapı',
          tabItem:'kapi-grup',
          icon: 'fa fa-inbox',
          submenu: [],
          href: '/genel/kapi-grup',
          expanded: false,

        },
        {
          label: 'Süspansiyon',
          tabItem:'suspansiyon',
          icon: 'fa fa-inbox',
          submenu: [],
          href: '/genel/suspansiyon',
          expanded: false,
        },
        {
          label: 'Makine Saşesi',
          tabItem:'makine-sasesi',
          icon: 'fa fa-inbox',
          submenu: [],
          href: '/genel/makine-sasesi',
          expanded: false,
        },
        {
          label: 'Ağırlık Saşesi',
          tabItem:'agirlik-sasesi',
          icon: 'fa fa-inbox',
          submenu: [],
          href: '/genel/agirlik-sasesi',
          expanded: false,
        },

        // {
        //   label: 'Buton',
        //   tabItem:'buton',
        //   icon: 'fa fa-inbox',
        //   submenu: [],
        //   href: '/genel/buton',
        //   expanded: false,
          
        // },
        // {
        //   label: 'Kapı',
        //   tabItem:'kapı',
        //   icon: 'fa fa-inbox',
        //   submenu: [],
        //   href: '/genel/kapi',
        //   expanded: false,
        // },
        // {
        //   label: 'Kasnak',
        //   tabItem:'kasnak',
        //   icon: 'fa fa-inbox',
        //   submenu: [],
        //   href: '/genel/kasnak ',
        //   expanded: false,
        // },
        

        
       
      
        
        
        
      ],
    },
  

  ];

    

  constructor(private router:Router) {}
  ngOnInit(): void {

    // const local = JSON.parse(localStorage.getItem('genel'));
 
    // this.selectedTab=local.tabItem;
  }

  toggleNode(node: any) {
    node.expanded = !node.expanded;
  }


  selectedTab: string = 'kabin';

  selectTab(tab: any) {
    var local= localStorage.setItem('genel',JSON.stringify(tab))
    this.selectedTab = tab.tabItem; 
    this.router.navigate([`${tab.href}`])
  }
}
