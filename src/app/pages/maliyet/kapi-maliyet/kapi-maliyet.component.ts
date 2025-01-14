import { Component } from '@angular/core';
import { KapiService } from 'src/app/core/services/repository/kapi.service';
import { DOVIZ } from 'src/assets/DATA/doviz';


@Component({
  selector: 'app-kapi-maliyet',
  templateUrl: './kapi-maliyet.component.html',
  styleUrls: ['./kapi-maliyet.component.scss']
})
export class KapiMaliyetComponent {
kabinler:any=[];
bilesenler:any =[];
birimMaliyet:any;
selectedBilesenRow:any;
selectedUrunRow:any;
personeller=[]
selectedPersonelRows:any;


iscilikGiderler:any=[]
genelGiderler:any=[]
selectedURUN:any;


constructor(private KapiService:KapiService) {}


async ngOnInit() {
 this.selectedKapiGrup="Kasa";

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
  kasaToplam=0
  panelToplam=0
  mekanizmaToplam=0;

  deneme:any;
  fiyatList:any[];
 async Hesapla(event){

   var kapilar=  (await this.KapiService.GetAll())
    const filters = {
      ad: [this.selectedURUN.ad],
      kaplama: ["ESB"],
    }
    const filtred = kapilar.filter(
      obj => Object.entries(filters).every(([k, p]) => (
        p.length === 0 || p.includes(obj[k])
      ))
    );


    this.bilesenler=this.selectedURUN?.kapiGruplari[0].urunBilesenler;
    this.iscilikGiderler=this.selectedURUN?.iscilikGiderler;


    var kasa=  this.selectedURUN?.kapiGruplari.filter(c=>c.tur=="Kasa")[0]
    var panel=  this.selectedURUN?.kapiGruplari.filter(c=>c.tur=="Panel")[0]
    var mekanizma=  this.selectedURUN?.kapiGruplari.filter(c=>c.tur=="Mekanizma")[0]

    

    if (kasa) {
      kasa.urunBilesenler?.forEach((item: any) => {
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
      for (let item of kasa.urunBilesenler) {
        this.kasaToplam += item.miktar*item.stok.dovizFiyat;
       }


    }
    
     if (panel) {
      panel.urunBilesenler?.forEach((item: any) => {
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
      for (let item of panel.urunBilesenler) {
        this.panelToplam += item.miktar*item.stok.dovizFiyat;
       }
     }
    
     if (mekanizma) {
      mekanizma.urunBilesenler?.forEach((item: any) => {
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
      for (let item of mekanizma?.urunBilesenler) {
        this.mekanizmaToplam += item.miktar*item.stok.dovizFiyat;
       }
     }
  

  
      this.malzemeToplam=this.kasaToplam+this.panelToplam+this.mekanizmaToplam
   
    this.visible = false;
    if (this.selectedURUN) {
      this.radioSelect=false;
    }

    this.iscilikHesapla();


var pesin={vade:'Peşin',toplamMaliyet:0,kasaFiyat:0,panelFiyat:0,mekanizmaFiyat:0};
var vade1={vade:'60 Gün',toplamMaliyet:0,kasaFiyat:0,panelFiyat:0,mekanizmaFiyat:0};
var vade2={vade:'90 Gün',toplamMaliyet:0,kasaFiyat:0,panelFiyat:0,mekanizmaFiyat:0};
var vade3={vade:'120 Gün',toplamMaliyet:0,kasaFiyat:0,panelFiyat:0,mekanizmaFiyat:0};

if (this.selectedURUN.kaplama=='ESB') {
  pesin.kasaFiyat=(this.toplamMaliyet+600 )*33/100; 
  pesin.panelFiyat=(this.toplamMaliyet+600 )*33/100; 
  pesin.mekanizmaFiyat=(this.toplamMaliyet+600 )*34/100;
  pesin.toplamMaliyet=pesin.mekanizmaFiyat+(2*pesin.kasaFiyat);


  vade1.toplamMaliyet=(pesin.toplamMaliyet ) + pesin.toplamMaliyet*4.5/100; 
  vade1.kasaFiyat=vade1.toplamMaliyet *33/100; 
  vade1.panelFiyat=vade1.toplamMaliyet *33/100; 
  vade1.mekanizmaFiyat=vade1.toplamMaliyet *34/100;


  vade2.toplamMaliyet=(vade1.toplamMaliyet ) + vade1.toplamMaliyet*4.5/100; 
  vade2.kasaFiyat=vade2.toplamMaliyet *33/100; 
  vade2.panelFiyat=vade2.toplamMaliyet *33/100; 
  vade2.mekanizmaFiyat=vade2.toplamMaliyet *34/100;



  vade3.toplamMaliyet=(vade2.toplamMaliyet ) + vade2.toplamMaliyet*4.5/100; 
  vade3.kasaFiyat=vade3.toplamMaliyet *33/100; 
  vade3.panelFiyat=vade3.toplamMaliyet *33/100; 
  vade3.mekanizmaFiyat=vade3.toplamMaliyet *34/100;

}
else{

 var esbKapi=filtred[0]

console.log(esbKapi);
  esbKapi.toplamMaliyet=esbKapi.malzemeMaliyet+this.iscilikToplam

  pesin.kasaFiyat=(this.toplamMaliyet+600 )*33/100; 
  pesin.panelFiyat=(this.toplamMaliyet+600 )*33/100; 
  pesin.mekanizmaFiyat=(esbKapi.toplamMaliyet+600 )*34/100;
  pesin.toplamMaliyet=pesin.mekanizmaFiyat+(2*pesin.kasaFiyat);






}






// 4.5

this.fiyatList=[
  pesin,
  vade1,
  vade2,
  vade3,
]



  }


  iscilikToplam:any;
  iscilikHesapla(){
    let total = 0;
    this.selectedURUN?.iscilikGiderler.forEach(element => {
      total += element.personel.maas;
    });
    this.frm.ortalamaPersonelMaasi=total/this.selectedURUN?.iscilikGiderler.length;
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

