import { Component } from '@angular/core';
import { DOVIZ } from 'src/assets/DATA/doviz';
import { GENELGIDERLER } from 'src/assets/DATA/genel-giderler';
import { ISCILIK } from 'src/assets/DATA/iscilik';
import { KASNAKLAR } from 'src/assets/DATA/kasnaklar';
import { DATA_PERSONELLER } from 'src/assets/DATA/personeller';

@Component({
  selector: 'app-kasnak-maliyet',
  templateUrl: './kasnak-maliyet.component.html',
  styleUrls: ['./kasnak-maliyet.component.scss']
})
export class KasnakMaliyetComponent {


kabinler:any=KASNAKLAR;
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
  // this.kabinler=KABINLER
  // this.selectedUrunRow=this.kabinler[0]
  // if (this.selectedUrunRow) {
  //   this.bilesenler=this.kabinler[0].urunBilesenler
  //   this.onRowClickUrun(this.selectedUrunRow)
  // }


 }






frm:any={
  kasnakCapi: { id: 1, ad: 'Hepsi' },
  kanalSayisi: { id: 1, ad: 'Hepsi' },
  halatCapi: { id: 1, ad: 'Hepsi' },
  kasnakTuru: { id: 1, ad: 'Hepsi' },
}









selectedKasnakCapi:any;
kasnakCapi=[
  { id: 1, ad: 'Hepsi' },
  { id: 2, ad: '240' },
  { id: 3, ad: '320' },
  { id: 4, ad: '400' },
]
onKasnakCapiChange(item: any): void {
  this.selectedKasnakCapi=item;
};


selectedKanalSayisi:any;
kanalSayisi=[
  { id: 1, ad: 'Hepsi' },
  { id: 2, ad: '4-5-6' },
  { id: 3, ad: '7-8' },
  { id: 4, ad: '9-10' },
  { id: 5, ad: '4' },
  { id: 6, ad: '5' },
  { id: 7, ad: '6' },
  { id: 8, ad: '7' },
  { id: 9, ad: '8' },
  { id: 10, ad: '9' },

]
onKanalSayisiChange(item: any): void {
  this.selectedKanalSayisi=item;
};



selectedHalatCapi:any;
halatCapi=[
  { id: 1, ad: 'Hepsi' },
  { id: 2, ad: 'Cam' },
  { id: 2, ad: 'Mekanik' },
]
onHalatCapiChange(item: any): void {
  this.selectedHalatCapi=item;
};






selectedKasnakTuru:any;
kasnakTuru = [
  { id: 1, ad: 'Hepsi' },
  { id: 2, ad: 'Kabin Kasnağı' },
  { id: 3, ad: 'Ağırlık Kasnağı' },
];

onKasnakTuruChange(kapasite: any): void {
  this.selectedKasnakTuru=kapasite;
};









uygula(){
  this.birimMaliyet=null;
  const filteredProducts = KASNAKLAR.filter(item => {
  const matchesButonTipi = this.selectedKasnakCapi? item.kasnakCapi === this.selectedKasnakCapi.ad || this.selectedKasnakCapi.id==1: true;
  const matchesDurakSayisi = this.selectedKanalSayisi? item.kanalSayisi === this.selectedKanalSayisi.ad|| this.selectedKanalSayisi.id==1 : true;
  const matchesButonCesidi = this.selectedHalatCapi? item.halatCapi === this.selectedHalatCapi.ad || this.selectedHalatCapi.id==1 : true;
  const matchesKasnakTuru = this.selectedKasnakTuru? item.kasnakTuru === this.selectedKasnakTuru.ad || this.selectedKasnakTuru.id==1 : true;
  return matchesButonTipi && matchesDurakSayisi && matchesButonCesidi && matchesKasnakTuru
                  
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
onRowClickBilesen(event){

}


yenile(){
  this.bilesenler.forEach(element => {
    element.total=element.miktar * element.dovizFiyat
  });
  this.birimMaliyet=this.bilesenler.reduce((total, row) => total + row.total, 0);
}














onRowClickUrunler(event){}      



  visible: boolean;
  urunleriGoster() {
    this.birimMaliyet=null;
    const filteredProducts = KASNAKLAR.filter(item => {
    const matchesButonTipi = this.selectedKasnakCapi? item.kasnakCapi === this.selectedKasnakCapi.ad || this.selectedKasnakCapi.id==1: true;
    const matchesDurakSayisi = this.selectedKanalSayisi? item.kanalSayisi === this.selectedKanalSayisi.ad|| this.selectedKanalSayisi.id==1 : true;
    const matchesButonCesidi = this.selectedHalatCapi? item.halatCapi === this.selectedHalatCapi.ad || this.selectedHalatCapi.id==1 : true;
    const matchesKasnakTuru = this.selectedKasnakTuru? item.kasnakTuru === this.selectedKasnakTuru.ad || this.selectedKasnakTuru.id==1 : true;
    return matchesButonTipi && matchesDurakSayisi && matchesButonCesidi && matchesKasnakTuru
                    
  });
    this.kabinler=filteredProducts;
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
  }






























}
