import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { AutoComplete, AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { DATA_PERSONELLER } from 'src/assets/personeller';
import { DATA_STOKLAR, DOVIZ } from 'src/assets/stoklar';
import { DATA_URUNLER, STOKLAR, SUSPANSIYON_VARYANTLAR, URUNLER } from 'src/assets/urunler';
import { MaliyetFilterService } from '../kabin-maliyet/core/filter.service';

@Component({
  selector: 'app-suspansiyon-maliyet',
  templateUrl: './suspansiyon-maliyet.component.html',
  styleUrls: ['./suspansiyon-maliyet.component.scss'],
})
export class SuspansiyonMaliyetComponent {
  // selectedRows: any[];
  // selectedPersonelRows: any[];
  // filteredUrunler: any[] | undefined;
  // selectedUrunler: any;
  // takviyeAdet = 12;
  // takviyeKg = 2;
  // plakaKg = 10;
  // agirlikSacOrani = 105.5;
  // muhafazaOrani = 235;
  // suspansiyonSacOrani = 86.2;
  // milKg = 5;
  // civata150Adet = 10;
  // kosebent1 = 17.5;
  // kosebent2 = 20;
  // civata50Adet = 6;
  // dikmeKg = 25;
  // kasnakPlaka = 20;
  // dublexDikme = 40;
  // bayrakKg = 10;
  // flexi = 2;
  // mekanikKitlemeKg = 8;
  // kasnakAdet = 1;
  // birimMaliyet:any=0;
  // selectedKarkasTipi: any;
  // selectedAskiTipi: any;
  // selectedKapasite: number = 0;
  // selectedKaskasSekli: number = 0;
  // askiTipListesi: any[] = [];
  // kapasiteListesi: any[] = [];
  // kaskasSekliListesi: any[] = [];
  // urunler: any[] = DATA_URUNLER;
  // personeller:any[]=DATA_PERSONELLER;
  // rowData:any = DATA_STOKLAR;

  // constructor() {}

  // frm: any = {
  //   ad: 'KABİN SÜSPANSİYONU 2/1',
  //   karkasTipleri: '',
  //   kapasite: '',
  //   askiTipi: '',
  //   karkasSekli: '',
  //   rayArasi: '',
  //   kosebent: '',
  //   sacAgirligi: 0,
  //   toplamAgirlik: 0,
  //   aciklama: '',
  // };
  // @ViewChild(AutoComplete) autoComplete: AutoComplete;
  // karkasTipleri = [
  //   { id: 1, ad: 'Kabin Karkası' },
  //   { id: 2, ad: 'Ağırlık Karkası' },
  // ];
  // askiTipleri = {
  //   1: [
  //     { id: 1, ad: '2/1' },
  //     { id: 2, ad: '1/1' },
  //   ],
  //   2: [
  //     { id: 3, ad: '2/1' },
  //     { id: 4, ad: '1/1' },
  //   ],
  // };
  // kapasiteler = {
  //   1: [
  //     { id: 1, ad: '0-1250Kg' },
  //     { id: 2, ad: '< 1250Kg' },
  //   ],
  //   2: [{ id: 3, ad: '0-1600Kg' }],
  //   3: [{ id: 4, ad: '1100Kg' }],
  //   4: [{ id: 5, ad: 'NULL' }],
  // };
  // karkasSekli = {
  //   3: [
  //     { id: 1, ad: 'Tek Sıra Ağırlık' },
  //     { id: 2, ad: 'Çift Sıra Ağırlık ' },
  //     { id: 3, ad: 'Tek Dublex Ağırlık ' },
  //     { id: 4, ad: 'Çift Sıra Dublex ' },
  //   ],
  //   4: [
  //     { id: 5, ad: 'Tek Sıra Ağırlık' },
  //     { id: 6, ad: 'Çift Sıra Ağırlık ' },
  //     { id: 7, ad: 'Tek Dublex Ağırlık ' },
  //     { id: 8, ad: 'Çift Sıra Dublex ' },
  //   ],
  // };
  // onFocus() {
  //   this.autoComplete.show();
  //   this.filterUrunler({ query: '' });
  // };
  // filterUrunler(event: any) {
  //   let filtered: any[] = [];
  //   let query = event.query;
  //   for (let i = 0; i < (this.urunler.filter(c=>c.grup==this.selectedKarkasTipi.ad).filter(x=>x.ad.toLowerCase().includes(this.selectedAskiTipi.ad.toLowerCase())) as any[]).length; i++) {
  //     let country = (this.urunler.filter(c=>c.grup==this.selectedKarkasTipi.ad).filter(x=>x.ad.toLowerCase().includes(this.selectedAskiTipi.ad.toLowerCase())) as any[])[i];
  //     if (country.ad.toLowerCase().indexOf(query.toLowerCase()) == 0) {
  //       filtered.push(country);
  //     }
  //   }
  //   this.filteredUrunler = filtered;
    
    
  // };
  // ngModelChange() {
    
  //   this.selectedRows =this.selectedUrunler?.urunSatirlar;
  //   let updates = this.selectedUrunler?.urunSatirlar;

  //   this.rowData.forEach((item: any) => {
  //     const update = updates.find((update) => update.id === item.id);
      
  //     if (update) {
  //       item.miktar = update.miktar;
  //       if (item.dovizCinsi=='TL') {
  //        var test:any= DOVIZ.filter(c=>c.dovizCinsi==item.dovizCinsi)[0]
  //        item.dovizFiyat= item.birimFiyat*test.deger;
  //       }
  //      else if (item.dovizCinsi=='EURO') {
  //        var test:any= DOVIZ.filter(c=>c.dovizCinsi==item.dovizCinsi)[0]
  //        item.dovizFiyat= item.birimFiyat*test.deger;
  //       }
  //      else if (item.dovizCinsi=='USD') {
  //        var test:any= DOVIZ.filter(c=>c.dovizCinsi==item.dovizCinsi)[0]
  //        item.dovizFiyat= item.birimFiyat*test.deger;
  //       }
  //     }
  //     else{
  //       item.miktar=0;
  //       item.dovizFiyat= 0;
  //     }


  //   });
  //   this.selectedRows.forEach((item: any) => {
  //     const update = updates.find((update) => update.id === item.id);
      
  //     if (update) {
  //       item.miktar = update.miktar;
  //       if (item.dovizCinsi=='TL') {
  //        var test:any= DOVIZ.filter(c=>c.dovizCinsi==item.dovizCinsi)[0]
  //        item.dovizFiyat= item.birimFiyat*test.deger;
  //       }
  //      else if (item.dovizCinsi=='EURO') {
  //        var test:any= DOVIZ.filter(c=>c.dovizCinsi==item.dovizCinsi)[0]
  //        item.dovizFiyat= item.birimFiyat*test.deger;
  //       }
  //      else if (item.dovizCinsi=='USD') {
  //        var test:any= DOVIZ.filter(c=>c.dovizCinsi==item.dovizCinsi)[0]
  //        item.dovizFiyat= item.birimFiyat*test.deger;
  //       }
  //     }
  //     else{
  //       item.miktar=0;
  //       item.dovizFiyat= 0;
  //     }


  //   });
  //   this.hesapla()

  // };
  // onKarkasTipiChange(karkas: any): void {
  //   this.selectedUrunler=null;
  //   this.selectedRows=null;
  //   this.selectedKarkasTipi = karkas;
  //   this.askiTipListesi = this.askiTipleri[karkas.id] || [];
  //   if (this.selectedKapasite == 1) {
  //     this.frm.rayArasi = 1570;
  //     this.frm.kosebent = 20;
  //   } else if (this.selectedKapasite == 2) {
  //     this.frm.rayArasi = 3170;
  //     this.frm.kosebent = 20;
  //   } else if (this.selectedKapasite == 3) {
  //     this.frm.rayArasi = 1570;
  //     this.frm.kosebent = 17.5;
  //   } else if (this.selectedKapasite == 4) {
  //     this.frm.rayArasi = 1100;
  //   }
  // };
  // onAskiTipiChange(askiTipi): void {
  //   this.selectedUrunler=null;
  //   this.selectedRows=null;
  //   this.selectedAskiTipi = askiTipi;
  //   this.kapasiteListesi = this.kapasiteler[askiTipi.id] || [];
  //   this.kaskasSekliListesi = this.karkasSekli[askiTipi.id] || [];
  // };
  // onKapasiteChange(id): void {
  //   this.selectedKapasite = id;
  //   this.kapasiteListesi = this.kapasiteler[this.selectedAskiTipi.id] || [];

  //   if (id == 1) {
  //     this.frm.rayArasi = 1570;
  //     this.frm.kosebent = 20;
  //   } else if (id == 2) {
  //     this.frm.rayArasi = 3170;
  //     this.frm.kosebent = 20;
  //   } else if (id == 3) {
  //     this.frm.rayArasi = 1570;
  //     this.frm.kosebent = 17.5;
  //   } else if (id == 4) {
  //     this.frm.rayArasi = 1100;
  //   }
  // };
  // onKaskasSekliChange(id): void {
    
  //   this.selectedKaskasSekli = id;
  // };
  // hesapla() {
  //   if (this.selectedKarkasTipi.id == 1) {
  //     this.kabinKarkasHesabi();
  //   }
  //   if (this.selectedKarkasTipi.id == 2) {
  //     this.agirlikKarkasHesabi();
  //   }
  // };
  // kabinKarkasHesabi() {
  //   if (this.selectedKapasite == 1) {
  //     var toplamIslem =
  //       this.takviyeAdet +
  //       this.takviyeKg +
  //       this.plakaKg +
  //       this.bayrakKg +
  //       this.flexi;

  //     this.frm.sacAgirligi =
  //       ((this.frm.rayArasi - 100) / this.suspansiyonSacOrani) * 4 +
  //       this.frm.rayArasi / this.muhafazaOrani +
  //       ((this.frm.rayArasi + 100) / this.suspansiyonSacOrani) * 2 +
  //       toplamIslem;

  //     this.frm.toplamAgirlik = this.frm.sacAgirligi + this.frm.kosebent * 4;
  //   } else if (this.selectedKapasite == 2) {
  //     var toplamIslem =
  //       this.takviyeAdet +
  //       this.takviyeKg +
  //       this.plakaKg +
  //       this.bayrakKg +
  //       this.flexi;

  //     this.frm.sacAgirligi =
  //       ((this.frm.rayArasi - 100) / this.suspansiyonSacOrani) * 4 +
  //       this.frm.rayArasi / this.muhafazaOrani +
  //       ((this.frm.rayArasi + 300) / this.suspansiyonSacOrani) * 3 +
  //       toplamIslem;
  //     this.frm.toplamAgirlik = this.frm.sacAgirligi + this.frm.kosebent * 4;
  //   } else {
  //     this.frm.sacAgirligi =
  //       ((this.frm.rayArasi - 100) / this.suspansiyonSacOrani) * 4 +
  //       (this.takviyeAdet * this.takviyeKg) / 2 +
  //       this.plakaKg +
  //       this.bayrakKg +
  //       this.flexi;
  //     this.frm.toplamAgirlik = this.frm.sacAgirligi + this.frm.kosebent * 4;
  //   }
  //    this.updateRowDataMiktar(this.frm.toplamAgirlik);

  
  //    this.selectedRows.forEach(element => {
  //     element.total=element.miktar * element.dovizFiyat
  //   });
  //   this.birimMaliyet=this.selectedRows.reduce((total, row) => total + row.total, 0);

  // };
  // agirlikKarkasHesabi() {

  //   this.frm.rayArasi = 1100;
  //   if (this.selectedKaskasSekli == 1) {
  //     this.frm.sacAgirligi =
  //       ((this.frm.rayArasi - 50) / this.agirlikSacOrani) * 2 +
  //       2 * this.dikmeKg +
  //       this.kasnakPlaka * 2 * this.kasnakAdet;
  //   } else if (this.selectedKaskasSekli == 2) {
  //     this.frm.sacAgirligi =
  //       ((this.frm.rayArasi - 50) / this.agirlikSacOrani) * 2 +
  //       4 * this.dikmeKg +
  //       this.kasnakPlaka * 2 * this.kasnakAdet;
  //   } else if (this.selectedKaskasSekli == 3) {
  //     this.frm.sacAgirligi =
  //       ((this.frm.rayArasi - 50) / this.agirlikSacOrani) * 2 +
  //       2 * this.dublexDikme * 2 * this.kasnakAdet;
  //   } else if (this.selectedKaskasSekli == 4) {
  //     this.frm.sacAgirligi =
  //       ((this.frm.rayArasi - 50) / this.agirlikSacOrani) * 2 +
  //       4 * this.dublexDikme * 2 * this.kasnakAdet;
  //   } else if (this.selectedKaskasSekli == 5) {
    
  //     this.frm.sacAgirligi =
  //       ((this.frm.rayArasi - 50) / this.agirlikSacOrani) * 2 +
  //       2 * this.dikmeKg;
  //   } else if (this.selectedKaskasSekli == 6) {
  //     this.frm.sacAgirligi =
  //       ((this.frm.rayArasi - 50) / this.agirlikSacOrani) * 2 +
  //       4 * this.dikmeKg;
  //   } else if (this.selectedKaskasSekli == 7) {
  //     this.frm.sacAgirligi =
  //       ((this.frm.rayArasi - 50) / this.agirlikSacOrani) * 2 +
  //       2 * this.dublexDikme;
  //   } else if (this.selectedKaskasSekli == 8) {
  //     this.frm.sacAgirligi =
  //       ((this.frm.rayArasi - 50) / this.agirlikSacOrani) * 2 +
  //       4 * this.dublexDikme;
  //   }
  //   this.updateRowDataMiktar(this.frm.sacAgirligi);

    
  //   this.selectedRows.forEach(element => {
  //     element.total=element.miktar * element.dovizFiyat
  //   });

  //   this.birimMaliyet=this.selectedRows.reduce((total, row) => total + row.total, 0);
  // };
  // updateRowDataMiktar(miktar) {
    
  //   let updates = [{ id: 1, miktar: miktar }];
  //   this.rowData.forEach((item: any) => {
      
  //   const update = updates.find((update) => update.id === item.id);
  //     if (update) {
  //       item.miktar = update.miktar;
  //     }
  //   });
  //   this.selectedRows.forEach((item: any) => {
      
  //   const update = updates.find((update) => update.id === item.id);
  //     if (update) {
  //       item.miktar = update.miktar;
  //     }
  //   });







  // };
  // iscilikHesabi(){
  //   var calc={
  //     etkiYuzdesi:10,
  //     personeller:[
  //       { id: 1, ad: 'Recep YİĞİTER', maas: 30000,  },
  //       { id: 2, ad: 'Personel 1', maas: 37000,  },
  //     ]
  //   }
  // };



  rowData:any =STOKLAR;
  selectedRows:any;
  personeller=DATA_PERSONELLER
  selectedPersonelRows:any;
  urunler:any=URUNLER
  suspansiyonVaryantlar:any=SUSPANSIYON_VARYANTLAR;
  selectedUrunGrubu:any;
  selectedModel:any;
  selectedKapasite:any;
  filteredModel:any;
  selectedKarkasTipi: any;
  selectedAskiTipi: any;
  selectedKaskasSekli: any;
  birimMaliyet:any;
  constructor(private MaliyetFilterService:MaliyetFilterService) {}

  frm: any = {
    karkasTipi:{id: 1, ad: 'Kabin Karkası'},
    kapasite:  { id: 3, deger: '<1250' },
    askiTipi:null,
    karkasSekli:null,
    rayArasi:3170,
    kosebent:20,
    aciklama:null,
  };
  urunGruplari = [
    { id: 1, ad: 'Kabin' },
    { id: 2, ad: 'Süspansiyon' },
    { id: 3, ad: 'Buton' },
  ];
  kabinModeller = [
    { id: 1, model: 'ESB KABIN' },
    { id: 2, model: 'AYNA PASLANMAZ' },
  ];
  kapasiteler = [
    
    { id: 1, deger: '0-1250' },
    { id: 2, deger: '<1250' },
  ];
  karkasTipleri = [
    { id: 1, ad: 'Kabin Karkası' },
    { id: 2, ad: 'Ağırlık Karkası' },
  ];
  askiTipleri = [
    { id: 1, ad: '2/1' },
    { id: 2, ad: '1/1' },
  ];
  karkasSekli = [
      { id: 1, ad: 'Tek Sıra Ağırlık' },
      { id: 2, ad: 'Çift Sıra Ağırlık' },
      { id: 3, ad: 'Tek Dublex Ağırlık' },
      { id: 4, ad: 'Çift Sıra Dublex' },
  ];


  onUrunGrubuChange(urunGrubu: any): void {
     this.selectedUrunGrubu=urunGrubu;
  };
  onKapasiteChange(kapasite: any): void {
    this.selectedKapasite=kapasite;
  };
  onKarkasTipiChange(karkas: any): void {
    this.selectedKarkasTipi = karkas;
  };
  onAskiTipiChange(askiTipi): void {
    this.selectedAskiTipi = askiTipi;
  };
  onKaskasSekliChange(id): void { 
    this.selectedKaskasSekli = id;
  };

  getUrun(){
    this.selectedRows=[]
    var suspansiyonVaryant= this.filteredSuspansiyonVaryantlar(this.suspansiyonVaryantlar,this.frm)[0]
            var urun=  this.urunler.filter(c=>c.id==suspansiyonVaryant?.urunId)

            if (urun.length>0) {
              let updates = urun[0].urunBilesenler;
              this.rowData.forEach((item: any) => {   
              const update = updates.find((update) => update.id === item.id);
                if (update) {item.miktar = update.miktar;}
              });
              this.selectedRows.forEach((item: any) => {   
              const update = updates.find((update) => update.id === item.id);
                  if (update) {item.miktar = update.miktar;}
                  else{item.miktar=null}
              });
                this.selectedRows=urun[0].urunBilesenler;


            }
    this.updateTable(this.rowData)

  }

  ngModelChange() {};

  @ViewChild(AutoComplete) autoComplete: AutoComplete;


  maliyetHesabi(){
  this.updateTable(this.selectedRows)


  this.selectedRows.forEach(element => {
    element.total=element.miktar * element.dovizFiyat
  });
  this.birimMaliyet=this.selectedRows.reduce((total, row) => total + row.total, 0);
  }


  updateTable(datas){
  datas.forEach((item: any) => {
    const update = datas.find((update) => update.id === item.id);
    
    if (update) {
      item.miktar = update.miktar;
      if (item.dovizCinsi=='TL') {
       var test:any= DOVIZ.filter(c=>c.dovizCinsi==item.dovizCinsi)[0]
    
       item.dovizFiyat= item.birimFiyat*test.deger;
      }
     else if (item.dovizCinsi=='EURO') {
       var test:any= DOVIZ.filter(c=>c.dovizCinsi==item.dovizCinsi)[0]
       item.dovizFiyat= item.birimFiyat*test.deger;
      
      }
     else if (item.dovizCinsi=='USD') {
       var test:any= DOVIZ.filter(c=>c.dovizCinsi==item.dovizCinsi)[0]
       item.dovizFiyat= item.birimFiyat*test.deger;
   
      }
    }
    else{
      item.miktar=0;
      item.dovizFiyat= 0;
    }


  });
  }
  filteredSuspansiyonVaryantlar(varyants:any,frm:any) {
  return varyants.filter(item => {
    
    return (
      item.karkasTipi.toLowerCase().includes(frm.karkasTipi.ad.toLowerCase()) &&
      item.kapasite == frm.kapasite.deger &&
      item.askiTipi.toLowerCase().includes(frm.askiTipi.ad.toLowerCase()) &&
      item.rayArasi == frm.rayArasi &&
      item.kosebent == frm.kosebent
    );
  });
 
  }
































}


