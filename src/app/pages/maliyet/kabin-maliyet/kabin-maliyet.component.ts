import { Component, OnInit } from '@angular/core';
import { DOVIZ } from 'src/assets/DATA/doviz';
import { KabinService } from 'src/app/core/services/repository/kabin.service';
import { HttpClient } from '@angular/common/http';
import { PersonelService } from 'src/app/core/services/repository/personel.service';

@Component({
  selector: 'app-kabin-maliyet',
  templateUrl: './kabin-maliyet.component.html',
  styleUrls: ['./kabin-maliyet.component.scss'],
})
export class KabinMaliyetComponent implements OnInit{




kabinler:any=[];
bilesenler:any =[];
iscilikGiderler:any=[]
genelGiderler:any=[]
birimMaliyet:any;
selectedBilesenRow:any;
selectedUrunRow:any;
selectedURUN:any;
personeller=[]
selectedPersonelRows:any;

constructor(private KabinService:KabinService,private http:HttpClient,private PersonelService:PersonelService) {
 
  
}

async ngOnInit() {}



 
frm:any={
  kar:15,
  vadeFarki:4.5,
  gunlukUretimSayisi:5,
  personelSayisi:10,
  ortalamaPersonelMaasi:0,
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





onRowClickUrunler(event){}      


  visible: boolean;
 async urunleriGoster() {
  this.selectedURUN=[]
   const filteredProducts =  ((await this.KabinService.GetAll()).items).filter(item => {
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

    


  genelGiderToplam:any;
  toplamMaliyet:any;




  urunSec(event){
    this.bilesenler=this.selectedURUN?.urunBilesenler;
    this.iscilikGiderler=this.selectedURUN?.iscilikGiderler;
    let totalMaas = 0;
    this.selectedURUN?.iscilikGiderler.forEach(element => {
      totalMaas += element.personel.maas;
    });
  
    if (this.selectedURUN?.iscilikGiderler.length!=0) {
      this.frm.ortalamaPersonelMaasi=totalMaas/this.selectedURUN?.iscilikGiderler.length;
      this.frm.personelSayisi=this.selectedURUN?.iscilikGiderler.length;
    }
    else{
      this.frm.ortalamaPersonelMaasi=0;
      this.frm.personelSayisi=0;
    }
   
    this.Hesapla()
    this.visible = false;

    if (this.selectedURUN) {
      this.hesaplaButtonDisabled=false;
    }

  }




  malzemeToplam: number;
  hesaplaButtonDisabled=true;
  pesinFiyat:any;
  vade1Fiyat:any;
  vade2Fiyat:any;
  vade3Fiyat:any;

  Hesapla(){
console.log(this.selectedURUN);
    this.bilesenler?.forEach((item: any) => {
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
  let total = 0;
  for (let item of this.bilesenler) {
      total += item.miktar*item.stok.dovizFiyat;
  }
  this.malzemeToplam = total;




  if (this.selectedURUN?.iscilikGiderler.length!=0) {
    this.iscilikToplam=(this.frm.ortalamaPersonelMaasi*this.frm.personelSayisi/28)/this.frm.gunlukUretimSayisi;
    this.toplamMaliyet=this.iscilikToplam+this.malzemeToplam;
  }
  else{
    this.frm.ortalamaPersonelMaasi=0;
    this.frm.personelSayisi=0;

  }

    this.iscilikToplam=(this.frm.ortalamaPersonelMaasi*this.frm.personelSayisi/28)/this.frm.gunlukUretimSayisi;
    this.toplamMaliyet=this.iscilikToplam+this.malzemeToplam;

    this.pesinFiyat=this.toplamMaliyet + this.toplamMaliyet*this.frm.kar/100;
    this.vade1Fiyat=this.pesinFiyat + this.pesinFiyat*this.frm.vadeFarki/100;
    this.vade2Fiyat=this.vade1Fiyat + this.vade1Fiyat*this.frm.vadeFarki/100;
    this.vade3Fiyat=this.vade2Fiyat + this.vade2Fiyat*this.frm.vadeFarki/100;

  }


  iscilikToplam:any;

 

  ChildFunc(event) {
    this.iscilikGiderler = event;
    var totalMaas=0
    this.iscilikGiderler.forEach(element => {
      totalMaas += element.personel.maas;
    });
    
    if (this.iscilikGiderler.length!=0) {
      this.frm.ortalamaPersonelMaasi=totalMaas/this.iscilikGiderler.length;
      this.frm.personelSayisi=this.iscilikGiderler.length;
      this.iscilikToplam=(this.frm.ortalamaPersonelMaasi*this.frm.personelSayisi/28)/this.frm.gunlukUretimSayisi;
    }
    else{
      this.frm.ortalamaPersonelMaasi=0;
      this.frm.personelSayisi=0;
      this.iscilikToplam=0
    }
    this.toplamMaliyet=this.iscilikToplam+this.malzemeToplam;
console.log(this.malzemeToplam);
    this.pesinFiyat=this.toplamMaliyet + this.toplamMaliyet*this.frm.kar/100;
    this.vade1Fiyat=this.pesinFiyat + this.pesinFiyat*this.frm.vadeFarki/100;
    this.vade2Fiyat=this.vade1Fiyat + this.vade1Fiyat*this.frm.vadeFarki/100;
    this.vade3Fiyat=this.vade2Fiyat + this.vade2Fiyat*this.frm.vadeFarki/100;
  }



  iscilikVisible:any;
  selectedPersonelEkle:any;
  newCustomer:any;
  personelEkle(){
    this.selectedPersonelEkle.forEach(element => {
      var test={
        id: "bb4913c6-3205-480d-9122-7b24d160c4db",
        isDeleted: false,
        olusturmaTarihi: "2002-12-12T00:00:00",
        personel:element
      }
      this.iscilikGiderler = [...this.iscilikGiderler, test];
      this.newCustomer = element;
    });
    this.iscilikVisible=false;


    var totalMaas=0
    this.iscilikGiderler.forEach(element => {
      totalMaas += element.personel.maas;
    });

    if (this.iscilikGiderler.length!=0) {
      this.frm.ortalamaPersonelMaasi=totalMaas/this.iscilikGiderler.length;
      this.frm.personelSayisi=this.iscilikGiderler.length;
      this.iscilikToplam=(this.frm.ortalamaPersonelMaasi*this.frm.personelSayisi/28)/this.frm.gunlukUretimSayisi;
    }
    else{
      this.frm.ortalamaPersonelMaasi=0;
      this.frm.personelSayisi=0;
      this.iscilikToplam=0
    }

    this.toplamMaliyet=this.iscilikToplam+this.malzemeToplam;

    this.pesinFiyat=this.toplamMaliyet + this.toplamMaliyet*this.frm.kar/100;
    this.vade1Fiyat=this.pesinFiyat + this.pesinFiyat*this.frm.vadeFarki/100;
    this.vade2Fiyat=this.vade1Fiyat + this.vade1Fiyat*this.frm.vadeFarki/100;
    this.vade3Fiyat=this.vade2Fiyat + this.vade2Fiyat*this.frm.vadeFarki/100;
  }
async personelEkleDialog(event){
this.selectedPersonelEkle=[]
 this.personeller= event;
 this.iscilikVisible=true;
}


}


