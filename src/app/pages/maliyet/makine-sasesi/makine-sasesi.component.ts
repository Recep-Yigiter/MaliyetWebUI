import { Component } from '@angular/core';
import { MakineSasesiService } from 'src/app/core/services/repository/makine-sasesi.service';
import { DOVIZ } from 'src/assets/DATA/doviz';


@Component({
  selector: 'app-makine-sasesi',
  templateUrl: './makine-sasesi.component.html',
  styleUrls: ['./makine-sasesi.component.scss']
})
export class MakineSasesiComponent {






  
  mesaiSaati=9;
  
  
  
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
  
  constructor(private MakineSasesiService:MakineSasesiService) {
   
    
  }
  
  ngOnInit() {
  
   }
  
  
  
  
  
  frm: any = {
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
  
  
  
  onRowClickUrun(event){
    this.bilesenler=event?.urunBilesenler
    this.bilesenler?.forEach((item: any) => {
      if (item.stok.dovizCinsi=='TL') {
        var doviz:any= DOVIZ.filter(c=>c.dovizCinsi==item.stok.dovizCinsi)[0]
     
        item.stok.dovizFiyat= item.stok.birimFiyat*doviz.deger;
       }
      else if (item.stok.dovizCinsi=='EURO') {
        var doviz:any= DOVIZ.filter(c=>c.dovizCinsi==item.stok.dovizCinsi)[0]
        item.stok.dovizFiyat= item.birimFiyat*doviz.deger;
       
       }
      else if (item.stok.dovizCinsi=='USD') {
        var doviz:any= DOVIZ.filter(c=>c.dovizCinsi==item.stok.dovizCinsi)[0]
        item.stok.dovizFiyat= item.stok.birimFiyat*doviz.deger;
    
       }
    });
  
    this.bilesenler.forEach(element => {
      element.total=element.miktar * element.stok.dovizFiyat
    });
    this.birimMaliyet=this.bilesenler.reduce((total, row) => total + row.total, 0);
  }
  onRowClickBilesen(event){}      
  onRowClickUrunler(event){}      
  
  
  yenile(){
    this.bilesenler.forEach(element => {
      element.total=element.miktar * element.stok.dovizFiyat
    });
    this.birimMaliyet=this.bilesenler.reduce((total, row) => total + row.total, 0);
  }
  
  visible: boolean;
   async urunleriGoster() {
    this.birimMaliyet=null;
    const filteredProducts = (await this.MakineSasesiService.GetAll()).filter(item => {
    const matchesButonTipi = this.selectedSaseTipi? item.saseTipi === this.selectedSaseTipi.ad || this.selectedSaseTipi.id==1: true;
    const matchesDurakSayisi = this.selectedKapasite? item.kapasite === this.selectedKapasite.ad|| this.selectedKapasite.id==1 : true;
   
    return matchesButonTipi && matchesDurakSayisi 
                 
  });
    this.kabinler=filteredProducts;
  this.visible = true;
    }
  
      
    malzemeToplam: number;
    Hesapla(event){
      this.bilesenler=this.selectedURUN?.urunBilesenler;
      this.iscilikGiderler=this.selectedURUN?.iscilikGiderler
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
      this.visible = false;
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
 






}
