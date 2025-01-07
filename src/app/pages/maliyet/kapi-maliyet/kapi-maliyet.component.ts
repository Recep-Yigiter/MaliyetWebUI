import { Component } from '@angular/core';
import { KapiService } from 'src/app/core/services/repository/kapi.service';
import { DOVIZ } from 'src/assets/DATA/doviz';
import { GENELGIDERLER } from 'src/assets/DATA/genel-giderler';
import { ISCILIK } from 'src/assets/DATA/iscilik';
import { KAPI, KAPILAR } from 'src/assets/DATA/kapi';
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


iscilikGiderler:any=[]
genelGiderler:any=GENELGIDERLER
selectedURUN:any;


constructor(private KapiService:KapiService) {}

deneme:any=[]
ngOnInit() {
  this.selectedKapiGrup="Kasa";
  //this.deneme=KAPI[0].kapiGruplari.filter(c=>c.tur==this.selectedKapiGrup)[0].urunBilesenler
  //this.iscilikGiderler=KAPI[0].iscilikGiderler;
}






frm:any={  
  gunlukUretimSayisi:5,
  tahminiCalisanSayisi:10,
  ortalamaPersonelMaasi:0,
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
  })
  this.birimMaliyet=this.bilesenler.reduce((total, row) => total + row.total, 0);

}



onRowClickUrunler(event){}      

   

visible: boolean;
 async urunleriGoster() {
      const filteredProducts = (await this.KapiService.GetAll()).filter(item => {
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
  kasaMalzemeToplam:any;
  panelMalzemeToplam:any;
  mekanizmaMalzemeToplam:any;
  Hesapla(event){
    this.bilesenler=this.selectedURUN?.kapiGruplari[0].urunBilesenler;
    this.iscilikGiderler=this.selectedURUN?.iscilikGiderler;


  var test1=  this.selectedURUN?.kapiGruplari.filter(c=>c.tur=="Kasa")[0]
  var test2=  this.selectedURUN?.kapiGruplari.filter(c=>c.tur=="Panel")[0]
  var test3=  this.selectedURUN?.kapiGruplari.filter(c=>c.tur=="Mekanizma")[0]

    
    let kasaToplam=0
    let panelToplam=0
    let mekanizmaToplam=0
    if (test1) {
     test1.urunBilesenler?.forEach((item: any) => {
        if (item.stok.dovizCinsi=='TL') {
          var doviz:any= DOVIZ.filter(c=>c.dovizCinsi==item.stok.dovizCinsi)[0]
          item.stok.dovizFiyat= item.stok.birimFiyat*doviz.deger;
        }
        else if (item.stok.dovizCinsi=='EURO') {
          var doviz:any= DOVIZ.filter(c=>c.dovizCinsi==item.stok.dovizCinsi)[0]
          item.stok.dovizFiyat= item.stok.birimFiyat*doviz.deger;
        }
        else if (item.stok.dovizCinsi=='USD') {
          var doviz:any= DOVIZ.filter(c=>c.dovizCinsi==item.stok.dovizCinsi)[0]
          item.stok.dovizFiyat= item.stok.birimFiyat*doviz.deger;
        }
      });
      for (let item of test1.urunBilesenler) {
        kasaToplam += item.miktar*item.stok.dovizFiyat;
       }
    }
    
     if (test2) {
      test2.urunBilesenler?.forEach((item: any) => {
        if (item.stok.dovizCinsi=='TL') {
          var doviz:any= DOVIZ.filter(c=>c.dovizCinsi==item.stok.dovizCinsi)[0]
          item.stok.dovizFiyat= item.stok.birimFiyat*doviz.deger;
        }
        else if (item.stok.dovizCinsi=='EURO') {
          var doviz:any= DOVIZ.filter(c=>c.dovizCinsi==item.stok.dovizCinsi)[0]
          item.stok.dovizFiyat= item.stok.birimFiyat*doviz.deger;
        }
        else if (item.stok.dovizCinsi=='USD') {
          var doviz:any= DOVIZ.filter(c=>c.dovizCinsi==item.stok.dovizCinsi)[0]
          item.stok.dovizFiyat= item.stok.birimFiyat*doviz.deger;
        }
      });
      for (let item of test2.urunBilesenler) {
        panelToplam += item.miktar*item.stok.dovizFiyat;
       }
     }
    
     if (test3) {
      test3.urunBilesenler?.forEach((item: any) => {
        if (item.stok.dovizCinsi=='TL') {
          var doviz:any= DOVIZ.filter(c=>c.dovizCinsi==item.stok.dovizCinsi)[0]
          item.stok.dovizFiyat= item.stok.birimFiyat*doviz.deger;
        }
        else if (item.stok.dovizCinsi=='EURO') {
          var doviz:any= DOVIZ.filter(c=>c.dovizCinsi==item.stok.dovizCinsi)[0]
          item.stok.dovizFiyat= item.stok.birimFiyat*doviz.deger;
        }
        else if (item.stok.dovizCinsi=='USD') {
          var doviz:any= DOVIZ.filter(c=>c.dovizCinsi==item.stok.dovizCinsi)[0]
          item.stok.dovizFiyat= item.stok.birimFiyat*doviz.deger;
        }
      });
      for (let item of test3?.urunBilesenler) {
        mekanizmaToplam += item.miktar*item.stok.dovizFiyat;
       }
     }
  
     this.kasaMalzemeToplam=kasaToplam
     this.panelMalzemeToplam=panelToplam
     this.mekanizmaMalzemeToplam=mekanizmaToplam
  
      
   
    this.visible = false;
    
    if (this.selectedURUN) {
      this.radioSelect=false;
    }


    this.iscilikHesapla()
  }


  iscilikToplam:any;
  iscilikHesapla(){
    let total = 0;
    this.selectedURUN?.iscilikGiderler.forEach(element => {
       total += element.personel.maas;
    });

    this.frm.ortalamaPersonelMaasi=total/this.selectedURUN?.iscilikGiderler.length
    this.iscilikToplam=(this.frm.ortalamaPersonelMaasi*this.frm.tahminiCalisanSayisi/28)/this.frm.gunlukUretimSayisi;
    this.toplamMaliyet=this.iscilikToplam+this.malzemeToplam;


  }


  genelGiderToplam:any;
  toplamMaliyet:any;
 

   

  selectedKapiGrup: any;
  radioSelect:boolean=true;
  menu = [
    {
      submenu: [
        {
          id:1,
          label: 'Kasa',
        },
        {
          id:2,
          label: 'Panel',
        },
        { id:3,
          label: 'Mekanizma',
        },
      ],
    },
  
  
  ];
  
  
  toggleNode() {
      this.bilesenler=this.selectedURUN?.kapiGruplari.filter(c=>c.tur==this.selectedKapiGrup)[0]?.urunBilesenler
      this.iscilikGiderler=this.selectedURUN?.iscilikGiderler;

  }

























}

