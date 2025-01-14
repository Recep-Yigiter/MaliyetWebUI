import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MaliyetFilterService {

  constructor() { }

  
 filteredKabinVaryantlar(varyants:any,frm:any) {
     return varyants.filter(kabin => {
       return (
         kabin.urunGrubu.toLowerCase().includes(frm.urunGrubu.ad.toLowerCase()) &&
         kabin.model.toLowerCase().includes(frm.model.model.toLowerCase()) &&
         kabin.kapasite == frm.kapasite.deger
       );
     });
    
  }

  
  filteredSuspansiyonVaryantlar(varyants:any,frm:any) {
    return varyants.filter(item => {
      return (
        item.urunGrubu.toLowerCase().includes(frm.urunGrubu.ad.toLowerCase()) &&
        item.karkasTipi.toLowerCase().includes(frm.karkasTipi.ad.toLowerCase()) &&
        item.kapasite == frm.kapasite.deger &&
        item.askiTipi.toLowerCase().includes(frm.askiTipi.ad.toLowerCase()) &&
        item.rayArasi == frm.rayArasi &&
        item.kosebent == frm.kosebent
      );
    });
   
 }

  filteredButonVaryantlar(varyants:any,frm:any) {
    return varyants.filter(item => {


      return (
        item.urunGrubu.toLowerCase().includes(frm.urunGrubu.ad.toLowerCase()) &&
        item.butonKonumu.toLowerCase().includes(frm.butonKonumu.ad.toLowerCase()) &&
        item.butonCesidi.toLowerCase().includes(frm.butonCesidi?.ad.toLowerCase()) &&
        item.durakSayisi == frm.durakSayisi.deger
      );
    });
   
 }




}
