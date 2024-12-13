import { Component, OnInit, ViewChild } from '@angular/core';
import { AutoComplete } from 'primeng/autocomplete';
// import { BUTON_VARYANTLAR, DOVIZ, KABIN_VARYANTLAR, STOKLAR, SUSPANSIYON_VARYANTLAR, URUNLER } from 'src/assets/urunler';
import { MaliyetFilterService } from './core/filter.service';
import { STOKLAR } from 'src/assets/DATA/stoklar';
import { DATA_PERSONELLER } from 'src/assets/DATA/personeller';
import { URUNLER } from 'src/assets/DATA/urunler';
import { DOVIZ } from 'src/assets/DATA/doviz';
import { KABIN_VARYANTLAR } from 'src/assets/DATA/filter-varyantlar';

@Component({
  selector: 'app-kabin-maliyet',
  templateUrl: './kabin-maliyet.component.html',
  styleUrls: ['./kabin-maliyet.component.scss'],
})
export class KabinMaliyetComponent implements OnInit{

  rowData:any =STOKLAR;
  selectedRows:any;
  personeller=DATA_PERSONELLER
  selectedPersonelRows:any;
  urunler:any=URUNLER
  kabinVaryantlar:any=KABIN_VARYANTLAR;
  selectedUrunGrubu:any;
  selectedModel:any;
  selectedKapasite:any;
  filteredModel:any;
  selectedKarkasTipi: any;
  selectedAskiTipi: any;
  selectedKaskasSekli: any;
  selectedDurakSayisi: any;
  selectedButonKonumu: any;
  selectedButonCesidi: any;
  birimMaliyet:any;
  constructor(private MaliyetFilterService:MaliyetFilterService) {}

  frm: any = {
    urunGrubu:{id: 1, ad: 'Kabin' },
    model:null,
    ad:null,
    karkasTipi:{id: 1, ad: 'Kabin Karkası'},
    kapasite:null,
    askiTipi:null,
    karkasSekli:null,
    rayArasi:null,
    kosebent:null,
    aciklama:null,
    durakSayisi:null,
    butonKonumu:{ id: 1, ad: 'Kabin Butonu' },
    butonCesidi:{ id: 1, ad: 'Mekanik' },
    birim:'ADET',
  };

  kabinModeller = [
    { id: 1, model: 'ESB KABIN' },
  ];
  kapasiteler = [
    { id: 1, deger: '320' },
    { id: 2, deger: '400' },
    { id: 3, deger: '480' },
    { id: 4, deger: '630' },
    { id: 5, deger: '800' },
    { id: 6, deger: '1000' },
    { id: 7, deger: '1250' },
    { id: 8, deger: '1600' },
  ];
  ngOnInit() {




   
    
  }

 

  onKapasiteChange(kapasite: any): void {
    this.selectedKapasite=kapasite;
  };
  
  

  getUrun(){
     this.selectedRows=[]
     var kabinVaryant= this.filteredKabinVaryantlar(this.kabinVaryantlar,this.frm)[0]
     var urun=  this.urunler.filter(c=>c.id==kabinVaryant?.urunId);
       if (urun.length!=0) {
           let updates = urun[0].urunBilesenler;
           this.rowData.forEach((item: any) => {   
           const update = updates.find((update) => update.id === item.id);
       if (update) {item.miktar = update.miktar;}
       else{item.miktar=null}
     });

      this.selectedRows=urun[0].urunBilesenler;

     }

    this.updateTable(this.rowData);


}
filteredKabinVaryantlar(varyants:any,frm:any) {
  return varyants.filter(kabin => {
    return (
      kabin.model.toLowerCase().includes(frm.model?.model.toLowerCase()) &&
      kabin.kapasite == frm.kapasite.deger
    );
  });
 
}
ngModelChange() {};

@ViewChild(AutoComplete) autoComplete: AutoComplete;
onFocus() {
  this.autoComplete.show();
  this.filterModeller({ query: '' });
};
filterModeller(event: any) {
 
  let filtered: any[] = [];
  let query = event.query;

  for (let i = 0; i < (this.kabinModeller as any[]).length; i++) {
    let country = (this.kabinModeller  as any[])[i];
    if (country.model.toLowerCase().indexOf(query.toLowerCase()) == 0) {
      filtered.push(country);
    }
  }
  this.filteredModel = filtered;


};

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








selectedurunRow:any;
dataKabinMaliyet:any=[
  {
    id: 1546,
    ad:"320 KG ESB KABİN",
    urunGrubu: 'kabin',
    miktar: 1,
    birim: 'ADET',
    dovizCinsi:"TL",
    urunBilesenler:[
      { id: 1, ad: 'SAC', miktar: 237.5, birim: 'KG', birimFiyat: 28,dovizCinsi:"TL", },
      { id: 2, ad: 'Boya', miktar:38, birim: 'M^2', birimFiyat: 2.5,dovizCinsi:"EURO", },
      { id: 3, ad: '4lü led aydınlatma', miktar: 1, birim: 'takım', birimFiyat: 40,dovizCinsi:"USD", },
      { id: 4, ad: 'fan + muhafaza', miktar: 1, birim: 'takım', birimFiyat: 330.68,dovizCinsi:"TL", },
      { id: 5, ad: 'acil aydınlatma', miktar: 4, birim: 'adet', birimFiyat: 60,dovizCinsi:"TL", },
      { id: 6, ad: 'ayna', miktar: 2, birim: 'M^2', birimFiyat: 600,dovizCinsi:"TL", },
      { id: 7, ad: 'korkuluk', miktar:36.06, birim: 'KG', birimFiyat: 30,dovizCinsi:"TL", },
      { id: 8, ad: 'tutamak', miktar: 1.9, birim: 'M', birimFiyat: 5.30,dovizCinsi:"USD", },
      { id: 9, ad: 'etek sacı', miktar: 1, birim: 'adet', birimFiyat: 300,dovizCinsi:"TL", },
      { id: 10, ad: 'alüminyum ön eşik', miktar: 0.62, birim: 'KG', birimFiyat: 133,dovizCinsi:"TL", },
      { id: 11, ad: 'tavan menteşe+kilit', miktar: 2, birim: 'takım', birimFiyat: 250,dovizCinsi:"TL", },
      { id: 12, ad: 'pvc kaplama', miktar:1, birim: 'KG', birimFiyat: 0,dovizCinsi:"TL", },
      { id: 13, ad: 'taban suntası 18 mm', miktar: 1, birim: 'KG', birimFiyat: 730,dovizCinsi:"TL", },
      { id: 14, ad: 'muhtelif gider', miktar: 1, birim: 'takım', birimFiyat: 2000,dovizCinsi:"TL", },
      { id: 23, ad: 'TUTAMAK BAĞLAMA APARATI VE TAPASI', miktar: 1, birim: 'ADET', birimFiyat: 50 ,dovizCinsi:"USD",},
      { id: 24, ad: 'M8*30 C.S.P.R',miktar: 36,birim: 'adet',birimFiyat: 3.5,dovizCinsi:"TL",},
      { id: 25, ad: 'M6*30 C.S.P.R',miktar: 24,birim: 'adet',birimFiyat: 3,dovizCinsi:"TL",},
      { id: 26, ad: '25*25*1.5 MM PROFİL(KORKULUK İÇİN)',miktar: 5.8, birim: 'M',  birimFiyat: 34.31,dovizCinsi:"TL",},
    ]
  },
  {
    id: 2,
    ad:"400 KG ESB KABİN",
    urunGrubu: 'kabin',
    miktar: 1,
    birim: 'ADET',
    dovizCinsi:"TL",
    urunBilesenler:[
      { id: 1, ad: 'SAC', miktar: 237.5, birim: 'KG', birimFiyat: 28,dovizCinsi:"TL", },
      { id: 2, ad: 'Boya', miktar:38, birim: 'M^2', birimFiyat: 2.5,dovizCinsi:"EURO", },
      { id: 3, ad: '4lü led aydınlatma', miktar: 1, birim: 'takım', birimFiyat: 40,dovizCinsi:"USD", },
      { id: 4, ad: 'fan + muhafaza', miktar: 1, birim: 'takım', birimFiyat: 330.68,dovizCinsi:"TL", },
      { id: 5, ad: 'acil aydınlatma', miktar: 4, birim: 'adet', birimFiyat: 60,dovizCinsi:"TL", },
      { id: 6, ad: 'ayna', miktar: 2, birim: 'M^2', birimFiyat: 600,dovizCinsi:"TL", },
      { id: 7, ad: 'korkuluk', miktar:36.68, birim: 'KG', birimFiyat: 30,dovizCinsi:"TL", },
      { id: 8, ad: 'tutamak', miktar: 2.17, birim: 'M', birimFiyat: 5.30,dovizCinsi:"USD", },
      { id: 9, ad: 'etek sacı', miktar: 1, birim: 'adet', birimFiyat: 300,dovizCinsi:"TL", },
      { id: 10, ad: 'alüminyum ön eşik', miktar: 0.62, birim: 'KG', birimFiyat: 133,dovizCinsi:"TL", },
      { id: 11, ad: 'tavan menteşe+kilit', miktar: 2, birim: 'takım', birimFiyat: 250,dovizCinsi:"TL", },
      { id: 12, ad: 'pvc kaplama', miktar:1.18, birim: 'KG', birimFiyat: 0,dovizCinsi:"TL", },
      { id: 13, ad: 'taban suntası 18 mm', miktar: 1, birim: 'KG', birimFiyat: 730,dovizCinsi:"TL", },
      { id: 14, ad: 'muhtelif gider', miktar: 1, birim: 'takım', birimFiyat: 2000,dovizCinsi:"TL", },
      { id: 23, ad: 'TUTAMAK BAĞLAMA APARATI VE TAPASI', miktar: 1, birim: 'ADET', birimFiyat: 50 ,dovizCinsi:"USD",},
      { id: 24, ad: 'M8*30 C.S.P.R',miktar: 36,birim: 'adet',birimFiyat: 3.5,dovizCinsi:"TL",},
      { id: 25, ad: 'M6*30 C.S.P.R',miktar: 24,birim: 'adet',birimFiyat: 3,dovizCinsi:"TL",},
      { id: 26, ad: '25*25*1.5 MM PROFİL(KORKULUK İÇİN)',miktar: 6.4, birim: 'M',  birimFiyat: 34.31,dovizCinsi:"TL",},
    ]
  },
  {
    id: 3,
    ad:"480 KG ESB KABİN",
    urunGrubu: 'kabin',
    miktar: 1,
    birim: 'ADET',
    dovizCinsi:"TL",
    urunBilesenler:[
        { id: 1, ad: 'SAC', miktar: 275, birim: 'KG', birimFiyat: 28,dovizCinsi:"TL", },
        { id: 2, ad: 'Boya', miktar:43.75, birim: 'M^2', birimFiyat: 2.5,dovizCinsi:"EURO", },
        { id: 3, ad: '4lü led aydınlatma', miktar: 1, birim: 'takım', birimFiyat: 40,dovizCinsi:"USD", },
        { id: 4, ad: 'fan + muhafaza', miktar: 1, birim: 'takım', birimFiyat: 330.68,dovizCinsi:"TL", },
        { id: 5, ad: 'acil aydınlatma', miktar: 4, birim: 'adet', birimFiyat: 60,dovizCinsi:"TL", },
        { id: 6, ad: 'ayna', miktar: 2, birim: 'M^2', birimFiyat: 600,dovizCinsi:"TL", },
        { id: 7, ad: 'korkuluk', miktar:36.89, birim: 'KG', birimFiyat: 30,dovizCinsi:"TL", },
        { id: 8, ad: 'tutamak', miktar:2.42, birim: 'M', birimFiyat: 5.30,dovizCinsi:"USD", },
        { id: 9, ad: 'etek sacı', miktar: 1, birim: 'adet', birimFiyat: 300,dovizCinsi:"TL", },
        { id: 10, ad: 'alüminyum ön eşik', miktar: 0.68, birim: 'KG', birimFiyat: 133,dovizCinsi:"TL", },
        { id: 11, ad: 'tavan menteşe+kilit', miktar: 2, birim: 'takım', birimFiyat: 250,dovizCinsi:"TL", },
        { id: 12, ad: 'pvc kaplama', miktar:1.45, birim: 'KG', birimFiyat: 0,dovizCinsi:"TL", },
        { id: 13, ad: 'taban suntası 18 mm', miktar: 1, birim: 'KG', birimFiyat: 730,dovizCinsi:"TL", },
        { id: 14, ad: 'muhtelif gider', miktar: 1, birim: 'takım', birimFiyat: 2000,dovizCinsi:"TL", },
        { id: 23, ad: 'TUTAMAK BAĞLAMA APARATI VE TAPASI', miktar: 1, birim: 'ADET', birimFiyat: 50 ,dovizCinsi:"USD",},
        { id: 24, ad: 'M8*30 C.S.P.R',miktar: 36,birim: 'adet',birimFiyat: 3.5,dovizCinsi:"TL",},
        { id: 25, ad: 'M6*30 C.S.P.R',miktar: 24,birim: 'adet',birimFiyat: 3,dovizCinsi:"TL",},
        { id: 26, ad: '25*25*1.5 MM PROFİL(KORKULUK İÇİN)',miktar: 6.66, birim: 'M',  birimFiyat: 34.31,dovizCinsi:"TL",},
    ]
  },
  {
    id: 4,
    ad:"630 KG ESB KABİN",
    urunGrubu: 'kabin',
    miktar: 1,
    birim: 'ADET',
    dovizCinsi:"TL",
    urunBilesenler:[
        { id: 1, ad: 'SAC', miktar: 312.5, birim: 'KG', birimFiyat: 28,dovizCinsi:"TL", },
        { id: 2, ad: 'Boya', miktar:50, birim: 'M^2', birimFiyat: 2.5,dovizCinsi:"EURO", },
        { id: 3, ad: '4lü led aydınlatma', miktar: 1, birim: 'takım', birimFiyat: 40,dovizCinsi:"USD", },
        { id: 4, ad: 'fan + muhafaza', miktar: 1, birim: 'takım', birimFiyat: 330.68,dovizCinsi:"TL", },
        { id: 5, ad: 'acil aydınlatma', miktar: 4, birim: 'adet', birimFiyat: 60,dovizCinsi:"TL", },
        { id: 6, ad: 'ayna', miktar: 2, birim: 'M^2', birimFiyat: 600,dovizCinsi:"TL", },
        { id: 7, ad: 'korkuluk', miktar:38.14, birim: 'KG', birimFiyat: 30,dovizCinsi:"TL", },
        { id: 8, ad: 'tutamak', miktar:2.61, birim: 'M', birimFiyat: 5.30,dovizCinsi:"USD", },
        { id: 9, ad: 'etek sacı', miktar: 1, birim: 'adet', birimFiyat: 300,dovizCinsi:"TL", },
        { id: 10, ad: 'alüminyum ön eşik', miktar: 0.75, birim: 'KG', birimFiyat: 133,dovizCinsi:"TL", },
        { id: 11, ad: 'tavan menteşe+kilit', miktar: 2, birim: 'takım', birimFiyat: 250,dovizCinsi:"TL", },
        { id: 12, ad: 'pvc kaplama', miktar:1.67, birim: 'KG', birimFiyat: 0,dovizCinsi:"TL", },
        { id: 13, ad: 'taban suntası 18 mm', miktar: 1, birim: 'KG', birimFiyat: 730,dovizCinsi:"TL", },
        { id: 14, ad: 'muhtelif gider', miktar: 1, birim: 'takım', birimFiyat: 2000,dovizCinsi:"TL", },
        { id: 23, ad: 'TUTAMAK BAĞLAMA APARATI VE TAPASI', miktar: 1, birim: 'ADET', birimFiyat: 50 ,dovizCinsi:"USD",},
        { id: 24, ad: 'M8*30 C.S.P.R',miktar: 36,birim: 'adet',birimFiyat: 3.5,dovizCinsi:"TL",},
        { id: 25, ad: 'M6*30 C.S.P.R',miktar: 24,birim: 'adet',birimFiyat: 3,dovizCinsi:"TL",},
        { id: 26, ad: '25*25*1.5 MM PROFİL(KORKULUK İÇİN)',miktar: 7.8, birim: 'M',  birimFiyat: 34.31,dovizCinsi:"TL",},
    ]
  },
  {
    id: 5,
    ad:"800 KG ESB KABİN",
    urunGrubu: 'kabin',
    miktar: 1,
    birim: 'ADET',
    dovizCinsi:"TL",
    urunBilesenler:[
      { id: 1, ad: 'SAC', miktar: 350, birim: 'KG', birimFiyat: 28,dovizCinsi:"TL", },
      { id: 2, ad: 'Boya', miktar:56.25, birim: 'M^2', birimFiyat: 2.5,dovizCinsi:"EURO", },
      { id: 3, ad: '4lü led aydınlatma', miktar: 1, birim: 'takım', birimFiyat: 40,dovizCinsi:"USD", },
      { id: 4, ad: 'fan + muhafaza', miktar: 1, birim: 'takım', birimFiyat: 330.68,dovizCinsi:"TL", },
      { id: 5, ad: 'acil aydınlatma', miktar: 4, birim: 'adet', birimFiyat: 60,dovizCinsi:"TL", },
      { id: 6, ad: 'ayna', miktar: 3.5, birim: 'M^2', birimFiyat: 600,dovizCinsi:"TL", },
      { id: 7, ad: 'korkuluk', miktar:36.76, birim: 'KG', birimFiyat: 30,dovizCinsi:"TL", },
      { id: 8, ad: 'tutamak', miktar: 2.83, birim: 'M', birimFiyat: 5.30,dovizCinsi:"USD", },
      { id: 9, ad: 'etek sacı', miktar: 1, birim: 'adet', birimFiyat: 300,dovizCinsi:"TL", },
      { id: 10, ad: 'alüminyum ön eşik', miktar: 0.75, birim: 'KG', birimFiyat: 133,dovizCinsi:"TL", },
      { id: 11, ad: 'tavan menteşe+kilit', miktar: 2, birim: 'takım', birimFiyat: 250,dovizCinsi:"TL", },
      { id: 12, ad: 'pvc kaplama', miktar:2, birim: 'KG', birimFiyat: 0,dovizCinsi:"TL", },
      { id: 13, ad: 'taban suntası 18 mm', miktar: 1, birim: 'KG', birimFiyat: 730,dovizCinsi:"TL", },
      { id: 14, ad: 'muhtelif gider', miktar: 1, birim: 'takım', birimFiyat: 2000,dovizCinsi:"TL", },
      { id: 23, ad: 'TUTAMAK BAĞLAMA APARATI VE TAPASI', miktar: 1, birim: 'ADET', birimFiyat: 50 ,dovizCinsi:"USD",},
      { id: 24, ad: 'M8*30 C.S.P.R',miktar: 36,birim: 'adet',birimFiyat: 3.5,dovizCinsi:"TL",},
      { id: 25, ad: 'M6*30 C.S.P.R',miktar: 24,birim: 'adet',birimFiyat: 3,dovizCinsi:"TL",},
      { id: 26, ad: '25*25*1.5 MM PROFİL(KORKULUK İÇİN)',miktar: 8.4, birim: 'M',  birimFiyat: 34.31,dovizCinsi:"TL",},
    ]
  },
  {
    id: 6,
    ad:"1000 KG ESB KABİN",
    urunGrubu: 'kabin',
    miktar: 1,
    birim: 'ADET',
    dovizCinsi:"TL",
    urunBilesenler:[
        { id: 1, ad: 'SAC', miktar: 437.5, birim: 'KG', birimFiyat: 28,dovizCinsi:"TL", },
        { id: 2, ad: 'Boya', miktar:62.5, birim: 'M^2', birimFiyat: 2.5,dovizCinsi:"EURO", },
        { id: 3, ad: '4lü led aydınlatma', miktar: 1, birim: 'takım', birimFiyat: 40,dovizCinsi:"USD", },
        { id: 4, ad: 'fan + muhafaza', miktar: 1, birim: 'takım', birimFiyat: 330.68,dovizCinsi:"TL", },
        { id: 5, ad: 'acil aydınlatma', miktar: 4, birim: 'adet', birimFiyat: 60,dovizCinsi:"TL", },
        { id: 6, ad: 'ayna', miktar: 3.5, birim: 'M^2', birimFiyat: 600,dovizCinsi:"TL", },
        { id: 7, ad: 'korkuluk', miktar:39.59, birim: 'KG', birimFiyat: 30,dovizCinsi:"TL", },
        { id: 8, ad: 'tutamak', miktar:3.2, birim: 'M', birimFiyat: 5.30,dovizCinsi:"USD", },
        { id: 65, ad: 'etek sacı (1000 KG Kabin için)',miktar:1, birim: 'adet', birimFiyat: 400,dovizCinsi:"TL", },
        { id: 10, ad: 'alüminyum ön eşik', miktar: 0.81, birim: 'KG', birimFiyat: 133,dovizCinsi:"TL", },
        { id: 11, ad: 'tavan menteşe+kilit', miktar: 2, birim: 'takım', birimFiyat: 250,dovizCinsi:"TL", },
        { id: 12, ad: 'pvc kaplama', miktar:2.24, birim: 'KG', birimFiyat: 0,dovizCinsi:"TL", },
        { id: 13, ad: 'taban suntası 18 mm', miktar: 1, birim: 'KG', birimFiyat: 730,dovizCinsi:"TL", },
        { id: 14, ad: 'muhtelif gider', miktar: 1, birim: 'takım', birimFiyat: 2000,dovizCinsi:"TL", },
        { id: 23, ad: 'TUTAMAK BAĞLAMA APARATI VE TAPASI', miktar: 1, birim: 'ADET', birimFiyat: 50 ,dovizCinsi:"USD",},
        { id: 24, ad: 'M8*30 C.S.P.R',miktar: 36,birim: 'adet',birimFiyat: 3.5,dovizCinsi:"TL",},
        { id: 25, ad: 'M6*30 C.S.P.R',miktar: 24,birim: 'adet',birimFiyat: 3,dovizCinsi:"TL",},
        { id: 26, ad: '25*25*1.5 MM PROFİL(KORKULUK İÇİN)',miktar:9.2, birim: 'M',  birimFiyat: 34.31,dovizCinsi:"TL",},
    ]
  },
  {
    id: 7,
    ad:"1250 KG ESB KABİN",
    urunGrubu: 'kabin',
    miktar: 1,
    birim: 'ADET',
    dovizCinsi:"TL",
    urunBilesenler:[
      { id: 1, ad: 'SAC', miktar: 475, birim: 'KG', birimFiyat: 28,dovizCinsi:"TL", },
      { id: 2, ad: 'Boya', miktar:68.75, birim: 'M^2', birimFiyat: 2.5,dovizCinsi:"EURO", },
      { id: 15, ad: '6lı led aydınlatma', miktar: 1, birim: 'takım', birimFiyat: 54,dovizCinsi:"USD", },
      { id: 4, ad: 'fan + muhafaza', miktar: 1, birim: 'takım', birimFiyat: 330.68,dovizCinsi:"TL", },
      { id: 5, ad: 'acil aydınlatma', miktar: 4, birim: 'adet', birimFiyat: 60,dovizCinsi:"TL", },
      { id: 6, ad: 'ayna', miktar: 3.5, birim: 'M^2', birimFiyat: 600,dovizCinsi:"TL", },
      { id: 7, ad: 'korkuluk', miktar:41.67, birim: 'KG', birimFiyat: 30,dovizCinsi:"TL", },
      { id: 8, ad: 'tutamak', miktar:4.2, birim: 'M', birimFiyat: 5.30,dovizCinsi:"USD", },
      { id: 63, ad: 'etek sacı (1250 KG Kabin için)', miktar: 1, birim: 'adet', birimFiyat: 450,dovizCinsi:"TL", },
      { id: 10, ad: 'alüminyum ön eşik', miktar: 0.88, birim: 'KG', birimFiyat: 133,dovizCinsi:"TL", },
      { id: 11, ad: 'tavan menteşe+kilit', miktar: 2, birim: 'takım', birimFiyat: 250,dovizCinsi:"TL", },
      { id: 12, ad: 'pvc kaplama', miktar:2.94, birim: 'KG', birimFiyat: 0,dovizCinsi:"TL", },
      { id: 13, ad: 'taban suntası 18 mm', miktar: 1, birim: 'KG', birimFiyat: 730,dovizCinsi:"TL", },
      { id: 14, ad: 'muhtelif gider', miktar: 1, birim: 'takım', birimFiyat: 2000,dovizCinsi:"TL", },
      { id: 23, ad: 'TUTAMAK BAĞLAMA APARATI VE TAPASI', miktar: 1, birim: 'ADET', birimFiyat: 50 ,dovizCinsi:"USD",},
      { id: 24, ad: 'M8*30 C.S.P.R',miktar: 36,birim: 'adet',birimFiyat: 3.5,dovizCinsi:"TL",},
      { id: 25, ad: 'M6*30 C.S.P.R',miktar: 24,birim: 'adet',birimFiyat: 3,dovizCinsi:"TL",},
      { id: 26, ad: '25*25*1.5 MM PROFİL(KORKULUK İÇİN)',miktar: 11.2, birim: 'M',  birimFiyat: 34.31,dovizCinsi:"TL",},
    ]
  },
  {
    id: 8,
    ad:"1600 KG ESB KABİN",
    urunGrubu: 'kabin',
    miktar: 1,
    birim: 'ADET',
    dovizCinsi:"TL",
    urunBilesenler:[
      { id: 1, ad: 'SAC', miktar: 512.5, birim: 'KG', birimFiyat: 28,dovizCinsi:"TL", },
      { id: 2, ad: 'Boya', miktar:75, birim: 'M^2', birimFiyat: 2.5,dovizCinsi:"EURO", },
      { id: 15, ad: '6lı led aydınlatma', miktar: 1, birim: 'takım', birimFiyat: 54,dovizCinsi:"USD", },
      { id: 4, ad: 'fan + muhafaza', miktar: 1, birim: 'takım', birimFiyat: 330.68,dovizCinsi:"TL", },
      { id: 5, ad: 'acil aydınlatma', miktar: 4, birim: 'adet', birimFiyat: 60,dovizCinsi:"TL", },
      { id: 6, ad: 'ayna', miktar: 3.5, birim: 'M^2', birimFiyat: 600,dovizCinsi:"TL", },
      { id: 7, ad: 'korkuluk', miktar:42.92, birim: 'KG', birimFiyat: 30,dovizCinsi:"TL", },
      { id: 8, ad: 'tutamak', miktar:4.8, birim: 'M', birimFiyat: 5.30,dovizCinsi:"USD", },
      { id: 66, ad: 'etek sacı (1600 KG Kabin için)',miktar:1, birim: 'adet', birimFiyat: 500,dovizCinsi:"TL", },
      { id: 10, ad: 'alüminyum ön eşik', miktar: 0.81, birim: 'KG', birimFiyat: 133,dovizCinsi:"TL", },
      { id: 11, ad: 'tavan menteşe+kilit', miktar: 2, birim: 'takım', birimFiyat: 250,dovizCinsi:"TL", },
      { id: 12, ad: 'pvc kaplama', miktar:3.36, birim: 'KG', birimFiyat: 0,dovizCinsi:"TL", },
      { id: 13, ad: 'taban suntası 18 mm', miktar: 1, birim: 'KG', birimFiyat: 730,dovizCinsi:"TL", },
      { id: 14, ad: 'muhtelif gider', miktar: 1, birim: 'takım', birimFiyat: 2000,dovizCinsi:"TL", },
      { id: 23, ad: 'TUTAMAK BAĞLAMA APARATI VE TAPASI', miktar: 1, birim: 'ADET', birimFiyat: 50 ,dovizCinsi:"USD",},
      { id: 24, ad: 'M8*30 C.S.P.R',miktar: 36,birim: 'adet',birimFiyat: 3.5,dovizCinsi:"TL",},
      { id: 25, ad: 'M6*30 C.S.P.R',miktar: 24,birim: 'adet',birimFiyat: 3,dovizCinsi:"TL",},
      { id: 26, ad: '25*25*1.5 MM PROFİL(KORKULUK İÇİN)',miktar:12.4, birim: 'M',  birimFiyat: 34.31,dovizCinsi:"TL",},
    ]
  },
]


deneme(){

  console.log(  this.rowData);
}




















}


