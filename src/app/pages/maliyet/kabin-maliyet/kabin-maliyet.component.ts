import { Component, OnInit } from '@angular/core';
import { DATA_PERSONELLER } from 'src/assets/DATA/personeller';
import { DOVIZ } from 'src/assets/DATA/doviz';
import { KABINLER } from 'src/assets/DATA/kabinler';
import { ISCILIK } from 'src/assets/DATA/iscilik';
import { GENELGIDERLER } from 'src/assets/DATA/genel-giderler';

@Component({
  selector: 'app-kabin-maliyet',
  templateUrl: './kabin-maliyet.component.html',
  styleUrls: ['./kabin-maliyet.component.scss'],
})
export class KabinMaliyetComponent implements OnInit{





kabinler:any=KABINLER;
bilesenler:any =[];
iscilikGiderler:any=ISCILIK
genelGiderler:any=GENELGIDERLER
birimMaliyet:any;
selectedBilesenRow:any;
selectedUrunRow:any;
selectedURUN:any;
personeller=DATA_PERSONELLER
selectedPersonelRows:any;


ngOnInit() {
   this.selectedUrunRow=this.kabinler[0]
   if (this.selectedUrunRow) {
     this.bilesenler=this.kabinler[0].urunBilesenler
   }
 }






frm:any={
  tur: { id: 1, ad: 'Hepsi' },
  model: { id: 1, ad: 'Hepsi' },
  zeminKaplama: { id: 1, ad: 'Hepsi' },
  kabinKaplama: { id: 1, ad: 'Hepsi' },
  aksesuarKaplama: { id: 1, ad: 'Hepsi' },
  kapasite:{ id: 1, deger: 'Hepsi' }
}









selectedTur:any;
turler=[
  { id: 1, ad: 'Hepsi' },
  { id: 2, ad: 'Normal Kabin' },
]
onTurChange(item: any): void {
  this.selectedTur=item;
};


selectedModel:any;
modeller=[
  { id: 1, ad: 'Hepsi' },
  { id: 2, ad: 'ESB' },
]
onModelChange(item: any): void {
  this.selectedModel=item;
};



selectedZeminKaplama:any;
zeminKaplamalar=[
  { id: 1, ad: 'Hepsi' },
  { id: 2, ad: 'PVC' },
]
onZeminKaplamaChange(item: any): void {
  this.selectedZeminKaplama=item;
};


selectedKabinKaplama:any;
kabinKaplamalar=[
  { id: 1, ad: 'Hepsi' },
  { id: 2, ad: 'ESB' },
]
onKabinKaplamaChange(item: any): void {
  this.selectedKabinKaplama=item;
};


selectedAksesuarKaplama:any;
aksesuarKaplamalar=[
  { id: 1, ad: 'Hepsi' },
  { id: 2, ad: 'ESB' },
]
onAksesuarKaplamaChange(item: any): void {
  this.selectedAksesuarKaplama=item;
};


selectedKapasite:any;
kapasiteler = [
  { id: 1, deger: 'Hepsi' },
  { id: 2, deger: '320' },
  { id: 3, deger: '400' },
  { id: 4, deger: '480' },
  { id: 5, deger: '630' },
  { id: 6, deger: '800' },
  { id: 7, deger: '1000' },
  { id: 8, deger: '1250' },
  { id: 9, deger: '1600' },
];
onKapasiteChange(kapasite: any): void {
  this.selectedKapasite=kapasite;
};


uygula(){
  this.birimMaliyet=null;
  const filteredProducts = KABINLER.filter(item => {
  const matchesTur = this.selectedTur? item.tur === this.selectedTur.ad || this.selectedTur.id==1: true;
  const matchesModel = this.selectedModel? item.model === this.selectedModel.ad|| this.selectedModel.id==1 : true;
  const matchesZeminKaplama = this.selectedZeminKaplama? item.zeminKaplama === this.selectedZeminKaplama.ad || this.selectedZeminKaplama.id==1 : true;
  const matchesKabinKaplama = this.selectedKabinKaplama? item.kabinKaplama === this.selectedKabinKaplama.ad || this.selectedKabinKaplama.id==1 : true;
  const matchesAksesuarKaplama = this.selectedAksesuarKaplama? item.aksesuarKaplama === this.selectedAksesuarKaplama.ad || this.selectedAksesuarKaplama.id==1: true;
  const matchesKapasite = this.selectedKapasite? item.kapasite === this.selectedKapasite.deger || this.selectedKapasite.id==1 : true;
  return matchesTur 
      && matchesModel
      && matchesZeminKaplama
      && matchesKabinKaplama
      && matchesAksesuarKaplama
      && matchesKapasite;
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

  this.bilesenler.forEach(element => {
    element.total=element.miktar * element.dovizFiyat
  });
  this.birimMaliyet=this.bilesenler.reduce((total, row) => total + row.total, 0);
}
onRowClickBilesen(event){}      
onRowClickUrunler(event){}      


yenile(){
  this.bilesenler.forEach(element => {
    element.total=element.miktar * element.dovizFiyat
  });
  this.birimMaliyet=this.bilesenler.reduce((total, row) => total + row.total, 0);
}

  visible: boolean;
  urunleriGoster() {
    const filteredProducts = KABINLER.filter(item => {
    const matchesTur = this.selectedTur? item.tur === this.selectedTur.ad || this.selectedTur.id==1: true;
    const matchesModel = this.selectedModel? item.model === this.selectedModel.ad|| this.selectedModel.id==1 : true;
    const matchesZeminKaplama = this.selectedZeminKaplama? item.zeminKaplama === this.selectedZeminKaplama.ad || this.selectedZeminKaplama.id==1 : true;
    const matchesKabinKaplama = this.selectedKabinKaplama? item.kabinKaplama === this.selectedKabinKaplama.ad || this.selectedKabinKaplama.id==1 : true;
    const matchesAksesuarKaplama = this.selectedAksesuarKaplama? item.aksesuarKaplama === this.selectedAksesuarKaplama.ad || this.selectedAksesuarKaplama.id==1: true;
    const matchesKapasite = this.selectedKapasite? item.kapasite === this.selectedKapasite.deger || this.selectedKapasite.id==1 : true;
   return matchesTur 
       && matchesModel
       && matchesZeminKaplama
       && matchesKabinKaplama
       && matchesAksesuarKaplama
       && matchesKapasite;
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


