import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { AutoComplete, AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { DATA_PERSONELLER } from 'src/assets/personeller';
import { DATA_STOKLAR, DOVIZ } from 'src/assets/stoklar';
import { DATA_URUNLER, STOKLAR, SUSPANSIYON_VARYANTLAR, URUNLER } from 'src/assets/urunler';
import { MaliyetFilterService } from '../kabin-maliyet/core/filter.service';
import { ISCILIK } from 'src/assets/DATA/iscilik';
import { GENELGIDERLER } from 'src/assets/DATA/genel-giderler';
import { SUSPANSIYONLAR } from 'src/assets/DATA/suspansiyonlar';

@Component({
  selector: 'app-suspansiyon-maliyet',
  templateUrl: './suspansiyon-maliyet.component.html',
  styleUrls: ['./suspansiyon-maliyet.component.scss'],
})
export class SuspansiyonMaliyetComponent {



kabinler:any=SUSPANSIYONLAR;
bilesenler:any =[];
birimMaliyet:any;
selectedBilesenRow:any;
selectedUrunRow:any;
personeller=DATA_PERSONELLER
selectedPersonelRows:any;

iscilikGiderler:any=[]
genelGiderler:any=GENELGIDERLER
selectedURUN:any;


ngOnInit() {



 }



frm: any = {
  karkasTipi:{ id: 1, ad: 'Hepsi' },
  askiTipi:{ id: 1, ad: 'Hepsi' },
  karkasSekli:{ id: 1, ad: 'Hepsi' },
  kapasite:{ id: 1, ad: 'Hepsi' },
  rayArasi:0
};

selectedKarkasTipi:any
  karkasTipi = [
    { id: 1, ad: 'Hepsi' },
    { id: 2, ad: 'Kabin Karkası' },
    { id: 3, ad: 'Ağırlık Karkası' },

  ];
  onKarkasTipiChange(karkas: any): void {
    this.selectedKarkasTipi = karkas;
  };


  selectedAskiTipi:any
  askiTipi=[
    { id: 1, ad: 'Hepsi' },
    { id: 2, ad: '2/1' },
    { id: 3, ad: '1/1' },
  ]
  onAskiTipiChange(askiTipi): void {
    this.selectedAskiTipi = askiTipi;
  };


  selectedKarkasSekli:any
  karkasSekli =  [
    { id: 1, ad: 'Hepsi' },
    { id: 2, ad: 'Tek Sıra Ağırlık' },
    { id: 3, ad: 'Çift Sıra Ağırlık' },
    { id: 4, ad: 'Tek Sıra Dublex Ağırlık' },
    { id: 5, ad: 'Çift Sıra Dublex Ağırlık ' },
    ]

  onKarkasSekliChange(id): void {
    this.selectedKarkasSekli = id;
  };



  selectedKapasite:any
  kapasite=  [
    { id: 1, ad: 'Hepsi' },
    { id: 2, ad: '800' },
    { id: 3, ad: '1100' },

    ]

  onKapasiteChange(id): void {
    this.selectedKapasite = id;
  };






uygula(){
  this.birimMaliyet=null;
  const filteredProducts = SUSPANSIYONLAR.filter(item => {
  const matchesButonTipi = this.selectedKarkasTipi? item.karkasTipi === this.selectedKarkasTipi.ad || this.selectedKarkasTipi.id==1: true;
  const matchesDurakSayisi = this.selectedAskiTipi? item.askiTipi === this.selectedAskiTipi.ad|| this.selectedAskiTipi.id==1 : true;
  const matchesButonCesidi = this.selectedKapasite? item.kapasite === this.selectedKapasite.ad || this.selectedKapasite.id==1 : true;
  const matchesBoyOzellik = this.selectedKarkasSekli? item.karkasSekli === this.selectedKarkasSekli.ad || this.selectedKarkasSekli.id==1 : true;
  return matchesButonTipi && matchesDurakSayisi && matchesButonCesidi && matchesBoyOzellik           
  });
    this.kabinler=filteredProducts;
    this.selectedUrunRow=filteredProducts[0];
  this.bilesenler=this.selectedUrunRow?.urunBilesenler;
  if (this.selectedUrunRow) {
    this.onRowClickUrun(this.selectedUrunRow)
  }

}

onRowClickUrun(event){
  this.bilesenler=event?.urunBilesenler

  this.bilesenler?.forEach((item: any) => {

    if (item.dovizCinsi=='TL') {
      var doviz:any= DOVIZ.filter(c=>c.dovizCinsi==item.dovizCinsi)[0]
   
      item.dovizFiyat= item.birimFiyat*doviz.deger;
     }
    else if (item.dovizCinsi=='EURO') {
      var doviz:any= DOVIZ.filter(c=>c.dovizCinsi==item.dovizCinsi)[0]
      item.dovizFiyat= item.birimFiyat*doviz.deger;
     
     }
    else if (item.dovizCinsi=='USD') {
      var doviz:any= DOVIZ.filter(c=>c.dovizCinsi==item.dovizCinsi)[0]
      item.dovizFiyat= item.birimFiyat*doviz.deger;
  
     }

  });

  //toplamMaliyet
  this.bilesenler.forEach(element => {
    element.total=element.miktar * element.dovizFiyat
  });
  this.birimMaliyet=this.bilesenler.reduce((total, row) => total + row.total, 0);


}
onRowClickBilesen(event){}


yenile(){
  this.bilesenler.forEach(element => {
    element.total=element.miktar * element.dovizFiyat
  });
  this.birimMaliyet=this.bilesenler.reduce((total, row) => total + row.total, 0);
}





  visible: boolean;
  urunleriGoster() {
    const filteredProducts = SUSPANSIYONLAR.filter(item => {
      const matchesButonTipi = this.selectedKarkasTipi? item.karkasTipi === this.selectedKarkasTipi.ad || this.selectedKarkasTipi.id==1: true;
      const matchesDurakSayisi = this.selectedAskiTipi? item.askiTipi === this.selectedAskiTipi.ad|| this.selectedAskiTipi.id==1 : true;
      const matchesButonCesidi = this.selectedKapasite? item.kapasite === this.selectedKapasite.ad || this.selectedKapasite.id==1 : true;
      const matchesBoyOzellik = this.selectedKarkasSekli? item.karkasSekli === this.selectedKarkasSekli.ad || this.selectedKarkasSekli.id==1 : true;
      return matchesButonTipi && matchesDurakSayisi && matchesButonCesidi && matchesBoyOzellik
                   
    });
      this.kabinler=filteredProducts;
      this.selectedUrunRow=filteredProducts[0];
  this.visible = true;

  }


  malzemeToplam: number;
  Hesapla(event){
    this.bilesenler=this.selectedURUN?.urunBilesenler;

    this.bilesenler?.forEach((item: any) => {
      if (item.dovizCinsi=='TL') {
        var doviz:any= DOVIZ.filter(c=>c.dovizCinsi==item.dovizCinsi)[0]
        item.dovizFiyat= item.birimFiyat*doviz.deger;
       }
      else if (item.dovizCinsi=='EURO') {
        var doviz:any= DOVIZ.filter(c=>c.dovizCinsi==item.dovizCinsi)[0]
        item.dovizFiyat= item.birimFiyat*doviz.deger;
       }
      else if (item.dovizCinsi=='USD') {
        var doviz:any= DOVIZ.filter(c=>c.dovizCinsi==item.dovizCinsi)[0]
        item.dovizFiyat= item.birimFiyat*doviz.deger;
       }
    });
    let total = 0;
    for (let item of this.bilesenler) {
        total += item.miktar*item.dovizFiyat;
    }
    this.malzemeToplam = total;
    this.visible = false;

    console.log(this.malzemeToplam);
  }



  onRowClickUrunler(event){}      


















}


