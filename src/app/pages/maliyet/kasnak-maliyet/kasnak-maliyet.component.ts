import { Component, OnInit } from '@angular/core';
import { GenelGiderKatsayiService } from 'src/app/core/services/repository/genel-gider-katsayi.service';
import { GenelGiderService } from 'src/app/core/services/repository/genel-gider.service';
import { KasnakService } from 'src/app/core/services/repository/kasnak.service';
import { DOVIZ } from 'src/assets/DATA/doviz';


@Component({
  selector: 'app-kasnak-maliyet',
  templateUrl: './kasnak-maliyet.component.html',
  styleUrls: ['./kasnak-maliyet.component.scss']
})
export class KasnakMaliyetComponent implements OnInit{




urunler:any=[];
bilesenler:any =[];
iscilikGiderler:any=[]
genelGiderler:any=[]
birimMaliyet:any;
selectedBilesenRow:any;
selectedUrunRow:any;
selectedURUN:any;
personeller=[]
selectedPersonelRows:any;
birlesmisVeri:any
gruplanmisVeri:any={};
objectKeys:any;
genelGiderKatsayi:any;
constructor(private KasnakService:KasnakService,private GenelGiderService:GenelGiderService,private GenelGiderKatsayiService:GenelGiderKatsayiService) {
 
  
}

async ngOnInit() {
  
  this.genelGiderler= ((await this.GenelGiderService.GetAll()).items);
  this.genelGiderKatsayi=(await this.GenelGiderKatsayiService.GetAll()).items
  this.birlesmisVeri = this.birlestir();
  this.gruplanmisVeri = this.gruplamaYap();
  this.objectKeys=Object.keys(this.gruplanmisVeri)
  
  

}

birlestir() {

  return this.genelGiderler.map(gider => {
    const katsayilar = this.genelGiderKatsayi
      .filter(katsayi => katsayi.ad === gider.ad && katsayi.fabrika === gider.fabrika)
      .reduce((acc, katsayi) => {
        acc[katsayi.tur] =gider.tutar*katsayi.deger/100;
        return acc;
      }, {});

    return {
      ...gider,
      katsayilar
    };
  });
}
gruplamaYap() {
  const gruplanmisVeri = this.birlesmisVeri.reduce((acc, gider) => {
    if (!acc[gider.fabrika]) {
      acc[gider.fabrika] = [];
    }
    acc[gider.fabrika].push(gider);

    return acc;
  }, {});

  return gruplanmisVeri;

}
frm:any={
  kar:15,
  vadeFarki:4.5,
  gunlukUretimSayisi:5,
  tahminiCalisanSayisi:10,
  ortalamaPersonelMaasi:0,
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



 onRowClickUrunler(event){}      


  visible: boolean;
  async urunleriGoster() {
    this.birimMaliyet=null;
    const filteredProducts = ((await this.KasnakService.GetAll()).items).filter(item => {
    const matchesKasnakTipi = this.selectedKasnakCapi? item.kasnakCapi === this.selectedKasnakCapi.ad || this.selectedKasnakCapi.id==1: true;
    const matchesKanalSayisi = this.selectedKanalSayisi? item.kanalSayisi === this.selectedKanalSayisi.ad|| this.selectedKanalSayisi.id==1 : true;
    const matchesKasnakCesidi = this.selectedHalatCapi? item.halatCapi === this.selectedHalatCapi.ad || this.selectedHalatCapi.id==1 : true;
    const matchesKasnakTuru = this.selectedKasnakTuru? item.kasnakTuru === this.selectedKasnakTuru.ad || this.selectedKasnakTuru.id==1 : true;
    return matchesKasnakTipi && matchesKanalSayisi && matchesKasnakCesidi && matchesKasnakTuru
                      
    });
      this.urunler=filteredProducts;
      this.selectedUrunRow=filteredProducts[0];
  this.visible = true;

  }

    


  genelGiderToplam:any;
  toplamMaliyet:any;




  urunSec(event){
    this.bilesenler=this.selectedURUN?.urunBilesenler;
    this.iscilikGiderler=this.selectedURUN?.iscilikGiderler;
    let totalMaas = 0;
    this.iscilikGiderler.forEach(element => {
      totalMaas += element.personel.maas;
    });
  
    if (this.iscilikGiderler.length!=0) {
      this.frm.ortalamaPersonelMaasi=totalMaas/this.iscilikGiderler.length;
      this.frm.personelSayisi=this.iscilikGiderler.length;
    }
    else{
      this.frm.ortalamaPersonelMaasi=0;
      this.frm.personelSayisi=0;
    }

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

  this.malzemeGiderHesap();
  this.iscilikGiderHesap();
  this.genelGiderHesap();

  this.toplamMaliyet=this.iscilikToplam+this.malzemeToplam+(this.genelGiderToplam/this.frm.gunlukUretimSayisi);

  this.fiyatHesap();

    

  }


  iscilikToplam:any;
  IscilikDeleteFunc(event) {
    this.iscilikGiderler = event;
  }



  iscilikVisible:any;










malzemeGiderHesap(){
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
}

iscilikGiderHesap(){
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
      this.iscilikToplam=0;
    }
    
}

genelGiderHesap(){

  var total=0
  // this.genelGiderler.forEach(element => {
  //   total += (element.tutar*element.etkiOrani/100);
  // });
  // this.genelGiderToplam=total

  this.gruplanmisVeri['Kabin Fabrikası'].forEach(element => {
    total += element['katsayilar'].kasnak/28
  });

  this.genelGiderToplam=total;
}

fiyatHesap(){
  this.pesinFiyat=this.toplamMaliyet + this.toplamMaliyet*this.frm.kar/100;
  this.vade1Fiyat=this.pesinFiyat + this.pesinFiyat*this.frm.vadeFarki/100;
  this.vade2Fiyat=this.vade1Fiyat + this.vade1Fiyat*this.frm.vadeFarki/100;
  this.vade3Fiyat=this.vade2Fiyat + this.vade2Fiyat*this.frm.vadeFarki/100;

}



personelEkleDialog(item){
this.iscilikGiderler=item
}


}


