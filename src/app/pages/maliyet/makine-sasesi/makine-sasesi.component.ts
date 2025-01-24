import { Component, OnInit } from '@angular/core';
import { GenelGiderService } from 'src/app/core/services/repository/genel-gider.service';
import { KasnakService } from 'src/app/core/services/repository/kasnak.service';
import { MakineSasesiService } from 'src/app/core/services/repository/makine-sasesi.service';
import { SuspansiyonService } from 'src/app/core/services/repository/suspansiyon.service';
import { DOVIZ } from 'src/assets/DATA/doviz';

@Component({
  selector: 'app-makine-sasesi',
  templateUrl: './makine-sasesi.component.html',
  styleUrls: ['./makine-sasesi.component.scss']
})
export class MakineSasesiComponent implements OnInit{




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

constructor(private MakineSasesiService:MakineSasesiService,private GenelGiderService:GenelGiderService) {
 
  
}

async ngOnInit() {
  
this.genelGiderler= ((await this.GenelGiderService.GetAll()).items).filter(c=>c.tur=='Kabin'&& c.fabrika=="Kabin Fabrikası");
this.genelGiderler.forEach(element => {
  element.miktar=1;
  element.dovizCinsi="TL";
  element.birim="ADET";
  element.tutar=element.tutar/28
});


}





frm: any = {
  kar:15,
  vadeFarki:4.5,
  gunlukUretimSayisi:5,
  tahminiCalisanSayisi:10,
  ortalamaPersonelMaasi:0,
  saseTipi: { id: 1, ad: 'Hepsi' },
  kapasite: { id: 1, ad:'Hepsi' },
};


saseTipi:any=[
  { id: 1, ad: 'Hepsi' },
  { id: 2, ad: 'Ağırlık Arkada Duvardan Şase' },
  { id: 3, ad: 'MRL Duvardan' },
  { id: 4, ad: "MRL Ray'a bağlı" },
  { id: 5, ad: "MR Dişlili" },
  { id: 6, ad: "MR Dişlisiz" },
]
kapasite:any=[
  { id: 1, ad:'Hepsi' },
  { id: 2,ad:"320" },
  { id: 3,ad:"450" },
  { id: 4,ad:"630" },
  { id: 5,ad:"800" },
  { id: 6,ad:"1000" },
  { id: 7,ad:"1600" },
  { id: 8,ad:"2000" },
  { id: 9,ad:"3000" },

]
selectedSaseTipi:any
onSaseTipiChange(item: any): void {
  this.selectedSaseTipi=item;
};

selectedKapasite:any;
onKapasiteChange(item: any): void {
  this.selectedKapasite=item;
};



 onRowClickUrunler(event){}      


  visible: boolean;
  async urunleriGoster() {
    this.birimMaliyet=null;
    const filteredProducts = ((await this.MakineSasesiService.GetAll()).items).filter(item => {
    const matchesButonTipi = this.selectedSaseTipi? item.saseTipi === this.selectedSaseTipi.ad || this.selectedSaseTipi.id==1: true;
    const matchesDurakSayisi = this.selectedKapasite? item.kapasite === this.selectedKapasite.ad|| this.selectedKapasite.id==1 : true;
   
    return matchesButonTipi && matchesDurakSayisi 
                      
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

  this.toplamMaliyet=this.iscilikToplam+this.malzemeToplam+(this.genelGiderToplam/this.frm.personelSayisi);

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
  this.genelGiderler.forEach(element => {
    total += (element.tutar*element.etkiOrani/100);
  });
  this.genelGiderToplam=total
}

fiyatHesap(){
  this.pesinFiyat=this.toplamMaliyet + this.toplamMaliyet*this.frm.kar/100;
  this.vade1Fiyat=this.pesinFiyat + this.pesinFiyat*this.frm.vadeFarki/100;
  this.vade2Fiyat=this.vade1Fiyat + this.vade1Fiyat*this.frm.vadeFarki/100;
  this.vade3Fiyat=this.vade2Fiyat + this.vade2Fiyat*this.frm.vadeFarki/100;

  console.log(this.pesinFiyat);
}



personelEkleDialog(item){
this.iscilikGiderler=item
}


}