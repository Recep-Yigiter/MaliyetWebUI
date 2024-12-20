import { Component } from '@angular/core';
import { DOVIZ } from 'src/assets/DATA/doviz';
import { GENELGIDERLER } from 'src/assets/DATA/genel-giderler';
import { ISCILIK } from 'src/assets/DATA/iscilik';
import { KAPILAR } from 'src/assets/DATA/kapi';
import { KASNAKLAR } from 'src/assets/DATA/kasnaklar';
import { DATA_PERSONELLER } from 'src/assets/DATA/personeller';

@Component({
  selector: 'app-kapi-maliyet',
  templateUrl: './kapi-maliyet.component.html',
  styleUrls: ['./kapi-maliyet.component.scss']
})
export class KapiMaliyetComponent {
kabinler:any=KAPILAR;
bilesenler:any =[];
birimMaliyet:any;
selectedBilesenRow:any;
selectedUrunRow:any;
personeller=DATA_PERSONELLER
selectedPersonelRows:any;


iscilikGiderler:any=ISCILIK
genelGiderler:any=GENELGIDERLER
selectedURUN:any;




ngOnInit() {

  const products = [
    {
      id:1,
      kapiId:"a",
      ad:"90'lık TLS Kasa",
      birim:"Adet",
      tur:"Kasa",
      yon:"Sağ",
      kapiyuksekligi:"210",
      kapiGenisligi:"90",
      kapiTipi:"en81-20",
      kaplama:"Satine",
      urunBilesenler:[
        { id: 1, ad: 'KASA', miktar:2, birim: 'KG', birimFiyat: 28,dovizCinsi:"TL", },
       
      ]
    },
    {
      id:2,
      kapiId:"a",
      ad:"90'lık TLS Panel",
      birim:"Adet",
      tur:"Panel",
      yon:"Sağ",
      kapiyuksekligi:"210",
      kapiGenisligi:"90",
      kapiTipi:"en81-20",
      kaplama:"Satine",
      urunBilesenler:[
        { id: 1, ad: 'KASA', miktar:2, birim: 'KG', birimFiyat: 28,dovizCinsi:"TL", },
    
      ]
    },
]

const groupBy = (array, prop) => {
    return array.reduce((acc, obj) => {    
      
        let key = obj[prop]                
        if (!acc[key]){                    
            acc[key] = []      
        }
        acc[key].push(obj)                 
        return acc
    }, [])
}

let groupedProducts = groupBy(products, 'kapiId')







  // this.kabinler=KABINLER
  this.selectedUrunRow=this.kabinler[0]
  if (this.selectedUrunRow) {
    this.bilesenler=this.kabinler[0].urunBilesenler
    this.onRowClickUrun(this.selectedUrunRow)
  }


 }






frm:any={
  yon: { id: 1, ad: 'Hepsi' },
  kapiYuksekligi: { id: 1, ad: 'Hepsi' },
  kapiGenisligi: { id: 1, ad: 'Hepsi' },
  kapiTipi: { id: 1, ad: 'Hepsi' },
  kaplama:{ id: 1, ad: 'Hepsi' }
}





selectedYon:any;
yon=[
  { id: 1, ad: 'Hepsi' },
  { id: 2, ad: 'Sağ' },
  { id: 3, ad: 'Sol' },
  { id: 4, ad: 'Merkezi' },
]
onYonChange(item: any): void {
  this.selectedYon=item;
};


selectedKapiYukseklik:any;
kapiYuksekligi=[
  { id: 1, ad: 'Hepsi' },
  { id: 2, ad: '200' },
  { id: 3, ad: '210' },
]
onKapiYuksekligiChange(item: any): void {
  this.selectedKapiYukseklik=item;
};


selectedKapiGenisligi:any;
kapiGenisligi=[
  { id: 1, ad: 'Hepsi' },
  { id: 2, ad: '70' },
  { id: 3, ad: '80' },
  { id: 4, ad: '90' },
]
onKapiGenisligiChange(item: any): void {
  this.selectedKapiGenisligi=item;
};


selectedKapiTipi:any;
kapiTipi = [
  { id: 1, ad: 'Hepsi' },
  { id: 2, ad: 'Otomatik' },
  { id: 3, ad: 'İç Güvenlik' },
  { id: 4, ad: 'Yarı Otomatik' },
  { id: 5, ad: 'Dairesel' },
];
onKapiTipiChange(kapasite: any): void {
  this.selectedKapiTipi=kapasite;
};


selectedKaplama:any;
kaplama = [
  { id: 1, ad: 'Hepsi' },
  { id: 2, ad: 'Satine' },
  { id: 3, ad: 'Decoplate' },
];

onKaplamaChange(kapasite: any): void {
  this.selectedKaplama=kapasite;
};
   
     
   
uygula(){
   
  this.birimMaliyet=null;
  const filteredProducts = KAPILAR.filter(item => {
  const matchesButonTipi = this.selectedYon? item.yon === this.selectedYon.ad || this.selectedYon.id==1: true;
  const matchesDurakSayisi = this.selectedKapiYukseklik? item.kapiYuksekligi === this.selectedKapiYukseklik.ad|| this.selectedKapiYukseklik.id==1 : true;
  const matchesButonCesidi = this.selectedKapiGenisligi? item.kapiGenisligi === this.selectedKapiGenisligi.ad || this.selectedKapiGenisligi.id==1 : true;
  const matchesKasnakTuru = this.selectedKapiTipi? item.kapiTipi === this.selectedKapiTipi.ad || this.selectedKapiTipi.id==1 : true;
  const matchesKaplama= this.selectedKaplama? item.kaplama === this.selectedKaplama.ad || this.selectedKaplama.id==1 : true;
  return matchesButonTipi && matchesDurakSayisi && matchesButonCesidi && matchesKasnakTuru && matchesKaplama          
   
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



onRowClickUrunler(event){}      



  visible: boolean;
  urunleriGoster() {
    const filteredProducts = KAPILAR.filter(item => {
      const matchesButonTipi = this.selectedYon? item.yon === this.selectedYon.ad || this.selectedYon.id==1: true;
      const matchesDurakSayisi = this.selectedKapiYukseklik? item.kapiYuksekligi === this.selectedKapiYukseklik.ad|| this.selectedKapiYukseklik.id==1 : true;
      const matchesButonCesidi = this.selectedKapiGenisligi? item.kapiGenisligi === this.selectedKapiGenisligi.ad || this.selectedKapiGenisligi.id==1 : true;
      const matchesKasnakTuru = this.selectedKapiTipi? item.kapiTipi === this.selectedKapiTipi.ad || this.selectedKapiTipi.id==1 : true;
      const matchesKaplama= this.selectedKaplama? item.kaplama === this.selectedKaplama.ad || this.selectedKaplama.id==1 : true;
      return matchesButonTipi && matchesDurakSayisi && matchesButonCesidi && matchesKasnakTuru && matchesKaplama          
       
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

