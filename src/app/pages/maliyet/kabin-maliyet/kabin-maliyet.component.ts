import { Component, OnInit, ViewChild } from '@angular/core';
import { AutoComplete } from 'primeng/autocomplete';
// import { BUTON_VARYANTLAR, DOVIZ, KABIN_VARYANTLAR, STOKLAR, SUSPANSIYON_VARYANTLAR, URUNLER } from 'src/assets/urunler';
import { MaliyetFilterService } from './core/filter.service';
import { STOKLAR } from 'src/assets/DATA/stoklar';
import { DATA_PERSONELLER } from 'src/assets/DATA/personeller';
import { URUNLER } from 'src/assets/DATA/urunler';
import { DOVIZ } from 'src/assets/DATA/doviz';
import { KABIN_VARYANTLAR } from 'src/assets/DATA/filter-varyantlar';
import { KABINLER } from 'src/assets/DATA/kabinler';

@Component({
  selector: 'app-kabin-maliyet',
  templateUrl: './kabin-maliyet.component.html',
  styleUrls: ['./kabin-maliyet.component.scss'],
})
export class KabinMaliyetComponent implements OnInit{

//   // rowData:any =STOKLAR;
//   rowData:any =[];
//   selectedRows:any;
//   personeller=DATA_PERSONELLER
//   selectedPersonelRows:any;
//   urunler:any=URUNLER
//   kabinVaryantlar:any=KABIN_VARYANTLAR;
//   selectedUrunGrubu:any;
//   // selectedModel:any;
//   // selectedKapasite:any;
//   filteredModel:any;
//   selectedKarkasTipi: any;
//   selectedAskiTipi: any;
//   selectedKaskasSekli: any;
//   selectedDurakSayisi: any;
//   selectedButonKonumu: any;
//   selectedButonCesidi: any;
//   birimMaliyet:any;
//   constructor(private MaliyetFilterService:MaliyetFilterService) {}

//   // frm: any = {
//   //   urunGrubu:{id: 1, ad: 'Kabin' },
//   //   model:null,
//   //   ad:null,
//   //   karkasTipi:{id: 1, ad: 'Kabin Karkası'},
//   //   kapasite:null,
//   //   askiTipi:null,
//   //   karkasSekli:null,
//   //   rayArasi:null,
//   //   kosebent:null,
//   //   aciklama:null,
//   //   durakSayisi:null,
//   //   butonKonumu:{ id: 1, ad: 'Kabin Butonu' },
//   //   butonCesidi:{ id: 1, ad: 'Mekanik' },
//   //   birim:'ADET',
//   // };

//   kabinModeller = [
//     { id: 1, model: 'ESB KABIN' },
//   ];

 
 


  
  

//   getUrun(){
//      this.selectedRows=[]
//      var kabinVaryant= this.filteredKabinVaryantlar(this.kabinVaryantlar,this.frm)[0]
//      var urun=  this.urunler.filter(c=>c.id==kabinVaryant?.urunId);
//        if (urun.length!=0) {
//            let updates = urun[0].urunBilesenler;
//            this.rowData.forEach((item: any) => {   
//            const update = updates.find((update) => update.id === item.id);
//        if (update) {item.miktar = update.miktar;}
//        else{item.miktar=null}
//      });

//       this.selectedRows=urun[0].urunBilesenler;

//      }

//     this.updateTable(this.rowData);


// }
// filteredKabinVaryantlar(varyants:any,frm:any) {
//   return varyants.filter(kabin => {
//     return (
//       kabin.model.toLowerCase().includes(frm.model?.model.toLowerCase()) &&
//       kabin.kapasite == frm.kapasite.deger
//     );
//   });
 
// }
// ngModelChange() {};

// @ViewChild(AutoComplete) autoComplete: AutoComplete;
// onFocus() {
//   this.autoComplete.show();
//   this.filterModeller({ query: '' });
// };
// filterModeller(event: any) {
 
//   let filtered: any[] = [];
//   let query = event.query;

//   for (let i = 0; i < (this.kabinModeller as any[]).length; i++) {
//     let country = (this.kabinModeller  as any[])[i];
//     if (country.model.toLowerCase().indexOf(query.toLowerCase()) == 0) {
//       filtered.push(country);
//     }
//   }
//   this.filteredModel = filtered;


// };

// maliyetHesabi(){

//   this.updateTable(this.selectedRows)


// this.selectedRows.forEach(element => {
//   element.total=element.miktar * element.dovizFiyat
// });
// this.birimMaliyet=this.selectedRows.reduce((total, row) => total + row.total, 0);
// }


// updateTable(datas){
//   datas.forEach((item: any) => {
//     const update = datas.find((update) => update.id === item.id);
    
//     if (update) {
//       item.miktar = update.miktar;
//       if (item.dovizCinsi=='TL') {
//        var test:any= DOVIZ.filter(c=>c.dovizCinsi==item.dovizCinsi)[0]
    
//        item.dovizFiyat= item.birimFiyat*test.deger;
//       }
//      else if (item.dovizCinsi=='EURO') {
//        var test:any= DOVIZ.filter(c=>c.dovizCinsi==item.dovizCinsi)[0]
//        item.dovizFiyat= item.birimFiyat*test.deger;
      
//       }
//      else if (item.dovizCinsi=='USD') {
//        var test:any= DOVIZ.filter(c=>c.dovizCinsi==item.dovizCinsi)[0]
//        item.dovizFiyat= item.birimFiyat*test.deger;
   
//       }
//     }
//     else{
//       item.miktar=0;
//       item.dovizFiyat= 0;
//     }


//   });
// }




kabinler:any=KABINLER;
bilesenler:any =[];
birimMaliyet:any;
selectedBilesenRow:any;
selectedUrunRow:any;
personeller=DATA_PERSONELLER
selectedPersonelRows:any;


ngOnInit() {
  // this.kabinler=KABINLER
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
  return matchesTur && matchesModel
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

  //toplamMaliyet
  this.bilesenler.forEach(element => {
    element.total=element.miktar * element.dovizFiyat
  });
  this.birimMaliyet=this.bilesenler.reduce((total, row) => total + row.total, 0);


}
onRowClickBilesen(event){

}


yenile(){
  this.bilesenler.forEach(element => {
    element.total=element.miktar * element.dovizFiyat
  });
  this.birimMaliyet=this.bilesenler.reduce((total, row) => total + row.total, 0);
}










































}


