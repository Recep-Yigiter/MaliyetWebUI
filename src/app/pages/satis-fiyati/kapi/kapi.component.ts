import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kapi',
  templateUrl: './kapi.component.html',
  styleUrls: ['./kapi.component.scss']
})
export class KapiComponent implements OnInit{


  data:any[]=[];
  grouped:any[];

  pesin=0;
  ikiAyVadeFarki=0;
  ucAyVadeFarki=0;
  dortAyVadeFarki=0;

  ngOnInit(): void {

   this.grouped = this.data.reduce((groups, user) => {
     const k = user.ad;

     console.log(user);

     if (!groups[k]) {
       groups[k] = [];
     }
     groups[k].push(user);
     return groups;
   }, {});



  // this.data.forEach(element => {

  //   if (element.vade=='Peşin') {
  //     this.pesin=element.maliyet+element.pesinFiyatFarki;
  //       element.maliyet=this.pesin;
  //     if (element.model=='ESB') {
  //       element.kasaMaliyet=this.pesin*33/100
  //       element.panelMaliyet=this.pesin*33/100
  //       element.mekanizmaMaliyet=this.pesin*34/100
  //     }
  //     else{
  //       element.kasaMaliyet=0
  //       element.panelMaliyet=0
  //       element.mekanizmaMaliyet=0
  //     }
  //   }
  //   if (element.vade=='60 Gün') {
  //     this.ikiAyVadeFarki=this.pesin +((this.pesin)*element.vadeFarkiOrani/100)
  //     element.maliyet=this.ikiAyVadeFarki;
  //   }
  //   if (element.vade=='90 Gün') {
  //     this.ucAyVadeFarki=this.ikiAyVadeFarki+(this.ikiAyVadeFarki*element.vadeFarkiOrani/100)
  //     element.maliyet=this.ikiAyVadeFarki;
  //   }
  //   if (element.vade=='120 Gün') {
  //     element.maliyet=this.ucAyVadeFarki +(this.ucAyVadeFarki*element.vadeFarkiOrani/100)
  //   }
    
  // });
  

        

  }

}
