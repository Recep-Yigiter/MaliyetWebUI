import { Component } from '@angular/core';

import { ButonService } from 'src/app/core/services/repository/buton.service';
import { DOVIZ } from 'src/assets/DATA/doviz';

@Component({
  selector: 'app-buton-maliyet',
  templateUrl: './buton-maliyet.component.html',
  styleUrls: ['./buton-maliyet.component.scss'],
})
export class ButonMaliyetComponent {


constructor(private ButonService:ButonService) {

  
}


urunler:any;
bilesenler:any =[];
selectedBilesenRow:any;
selectedUrunRow:any;
selectedPersonelRows:any;

iscilikGiderler:any=[]
genelGiderler:any=[]
selectedURUN:any;

async ngOnInit() {
  // this.urunler=await this.ButonService.GetAll();
  
 }






frm:any={
  gunlukUretimSayisi:5,
  tahminiCalisanSayisi:10,
  ortalamaPersonelMaasi:0,
  butonTipi: { id: 1, ad: 'Hepsi' },
  durakSayisi:{ id: 2, ad: '2' },
  butonCesidi: { id: 1, ad: 'Hepsi' },
  boyOzellik: { id: 1, ad: 'Hepsi' },
}









selectedButonTipi:any;
butonTipi=[
  { id: 1, ad: 'Hepsi' },
  { id: 2, ad: 'Kabin Butonu' },
  { id: 3, ad: 'Kat Butonu' },
]
onButonTipiChange(item: any): void {
  this.selectedButonTipi=item;
};


selectedDurakSayisi:any;
durakSayisi=[
  { id: 1, ad: 'Hepsi' },
  { id: 2, ad: '2' },
  { id: 3, ad: '3' },
  { id: 4, ad: '4' },
  { id: 5, ad: '5' },
  { id: 6, ad: '6' },
  { id: 7, ad: '7' },
  { id: 8, ad: '8' },
  { id: 9, ad: '9' },
  { id: 10, ad: '10' },
  { id: 11, ad: '11' },
  { id: 12, ad: '12' },
  { id: 13, ad: '13' },
  { id: 14, ad: '14' },
]
onDurakSayisiChange(item: any): void {
  this.selectedDurakSayisi=item;
};



selectedButonCesidi:any;
butonCesidi=[
  { id: 1, ad: 'Hepsi' },
  { id: 2, ad: 'Cam' },
  { id: 3, ad: 'Mekanik' },
]
onButonCesidiChange(item: any): void {
  this.selectedButonCesidi=item;
};





selectedBoyOzellik:any;
boyOzellik=[
  { id: 1, ad: 'Hepsi' },
  { id: 2, ad: 'Tam Boy' },
  { id: 3, ad: 'Yarım Boy' },
]
onBoyOzellikChange(item: any): void {
  this.selectedBoyOzellik=item;
};






onRowClickBilesen(event){}








  visible: boolean;
 async urunleriGoster() {
    const filteredProducts = (await this.ButonService.GetAll()).filter(item => {
      const matchesButonTipi = this.selectedButonTipi? item.butonTipi === this.selectedButonTipi.ad || this.selectedButonTipi.id==1: true;
      // const matchesDurakSayisi = this.selectedDurakSayisi? item.durakSayisi === this.selectedDurakSayisi.ad|| this.selectedDurakSayisi.id==1 : true;
      const matchesButonCesidi = this.selectedButonCesidi? item.butonCesidi === this.selectedButonCesidi.ad || this.selectedButonCesidi.id==1 : true;
      const matchesBoyOzellik = this.selectedBoyOzellik? item.boyOzellik === this.selectedBoyOzellik.ad || this.selectedBoyOzellik.id==1 : true;
      return matchesButonTipi && matchesButonCesidi && matchesBoyOzellik
                      
    });
      this.urunler=filteredProducts;
      this.selectedUrunRow=filteredProducts[0];
  this.visible = true;

  }

 onRowClickUrunler(event){}  
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
    this.malzemeToplam = total + ((Number(this.frm.durakSayisi.ad)-2)*45.31);
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
