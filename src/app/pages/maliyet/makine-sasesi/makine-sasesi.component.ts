import { Component } from '@angular/core';
import { GENELGIDERLER } from 'src/assets/DATA/genel-giderler';
import { ISCILIK } from 'src/assets/DATA/iscilik';
import { MAKINE_SASESI } from 'src/assets/DATA/makine-sasesi';
import { DATA_PERSONELLER } from 'src/assets/personeller';
import { DOVIZ, MAKINE_SASESI_VARYANTLAR, STOKLAR, URUNLER } from 'src/assets/urunler';

@Component({
  selector: 'app-makine-sasesi',
  templateUrl: './makine-sasesi.component.html',
  styleUrls: ['./makine-sasesi.component.scss']
})
export class MakineSasesiComponent {
  rowData:any =STOKLAR;
  selectedRows:any;
  personeller=DATA_PERSONELLER
  selectedPersonelRows:any;
  urunler:any=URUNLER;
  filterParametreler:any=MAKINE_SASESI_VARYANTLAR;
  selectedSaseTipi:any;
  selectedKapasite:any;
  birimMaliyet:any;
  frm: any = {
    saseTipi:{ id: 1, ad: 'Agırlık Arkada Duvardan Şase' },
  };

  
  saseTipi:any=[
    { id: 1, ad: 'Ağırlık Arkada Duvardan Şase' },
    { id: 2, ad: 'MRL Duvardan' },
    { id: 3, ad: "MRL Ray'a bağlı" },
    { id: 4, ad: "MR Dişlili" },
    { id: 5, ad: "MR Dişlisiz" },
  ]
  kapasite:any=[
    { id: 1,ad:"320" },
    { id: 2,ad:"450" },
    { id: 3,ad:"630" },
    { id: 4,ad:"800" },
    { id: 5,ad:"1000" },
    { id: 6,ad:"1600" },
    { id: 7,ad:"2000" },
    { id: 8,ad:"3000" },

  ]
  onSaseTipiChange(item: any): void {
    this.selectedSaseTipi=item;
 };
  onKapasiteChange(item: any): void {
    this.selectedKapasite=item;
 };




 getUrun(){
  this.selectedRows=[]
  var suspansiyonVaryant= this.filteredVaryantlar(this.filterParametreler,this.frm)[0]
          var urun=  this.urunler.filter(c=>c.id==suspansiyonVaryant?.urunId)

   if (urun.length>0) {
     let updates = urun[0].urunBilesenler;
     this.rowData.forEach((item: any) => {   
     const update = updates.find((update) => update.id === item.id);
       if (update) {item.miktar = update.miktar;}
     });
     this.selectedRows.forEach((item: any) => {   
     const update = updates.find((update) => update.id === item.id);
         if (update) {item.miktar = update.miktar;}
         else{item.miktar=null}
     });
       this.selectedRows=urun[0].urunBilesenler;


   }
  this.updateTable(this.rowData)

}

updateTable(datas){
datas.forEach((item: any) => {
  const update = datas.find((update) => update.id === item.id);
  
  if (update) {
    item.miktar = update.miktar;
    if (item.dovizCinsi=='TL') {
     var test:any= DOVIZ.filter(c=>c.dovizCinsi==item.dovizCinsi)[0]
  
     item.dovizFiyat= item.birimFiyat*test.deger;
    }
   else if (item.dovizCinsi=='EURO') {
     var test:any= DOVIZ.filter(c=>c.dovizCinsi==item.dovizCinsi)[0]
     item.dovizFiyat= item.birimFiyat*test.deger;
    
    }
   else if (item.dovizCinsi=='USD') {
     var test:any= DOVIZ.filter(c=>c.dovizCinsi==item.dovizCinsi)[0]
     item.dovizFiyat= item.birimFiyat*test.deger;
 
    }
  }
  else{
    item.miktar=0;
    item.dovizFiyat= 0;
  }


});
}
maliyetHesabi(){

this.updateTable(this.selectedRows)
 this.selectedRows.forEach(element => {
   element.total=element.miktar * element.dovizFiyat
 });
 this.birimMaliyet=this.selectedRows.reduce((total, row) => total + row.total, 0)
console.log(this.selectedRows);
}

filteredVaryantlar(varyants:any,frm:any) {
  return varyants.filter(item => {
    
    return (
      item.saseTipi.toLowerCase().includes(frm.saseTipi.ad.toLowerCase()) &&
      item.kapasite == frm.kapasite.deger 
    );
  });
 
}









kabinler:any=MAKINE_SASESI;
iscilikGiderler:any=ISCILIK
genelGiderler:any=GENELGIDERLER
selectedURUN:any;
bilesenler:any =[];
selectedBilesenRow:any;
selectedUrunRow:any;
onRowClickUrunler(event){}      


  visible: boolean;
  urunleriGoster() {
    this.birimMaliyet=null;
    const filteredProducts = MAKINE_SASESI.filter(item => {
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
