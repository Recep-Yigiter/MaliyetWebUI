import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AutoComplete } from 'primeng/autocomplete';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { ButonService } from 'src/app/core/services/repository/buton.service';
import { StokService } from 'src/app/core/services/repository/stok.service';
import { BUTONLAR } from 'src/assets/DATA/buton';
import { GENELGIDERLER } from 'src/assets/DATA/genel-giderler';
import { ISCILIK } from 'src/assets/DATA/iscilik';
import { DATA_PERSONELLER } from 'src/assets/personeller';
import { BUTON_VARYANTLAR, DOVIZ, STOKLAR, URUNLER } from 'src/assets/urunler';
import { defaultColDef } from 'src/default-col-def';

@Component({
  selector: 'app-buton-maliyet',
  templateUrl: './buton-maliyet.component.html',
  styleUrls: ['./buton-maliyet.component.scss'],
})
export class ButonMaliyetComponent {

//   @ViewChild(AutoComplete) autoComplete: AutoComplete;
//   rowData:any =STOKLAR;
//   urunler:any=URUNLER;
//   filterParametreler:any=BUTON_VARYANTLAR;
//   personeller=DATA_PERSONELLER
//   selectedRows:any;
//   selectedPersonelRows:any;
//   selectedDurakSayisi:any;
//    selectedButonTipi:any;
//  selectedButonCesidi:any;
//   birimMaliyet:any;
//   filteredUrunler: any[] | undefined;
//   selectedUrunler:any
//   constructor() {}


//   frm: any = {
//     durakSayisi:{ id: 1, deger: 2 },
//     butonTipi:{ id: 1, ad: 'Kabin Butonu' },
//     butonCesidi:{ id: 1, ad: 'Mekanik' },
//   };
//   butonTipi=[
//     { id: 1, ad: 'Kabin Butonu' },
//     { id: 2, ad: 'Kat Butonu' },
//   ]
//    butonCesidi=[
//      { id: 1, ad: 'Mekanik' },
//      { id: 2, ad: 'Cam' },
//      { id: 3, ad: 'Standart' },
//    ]
//   durakSayisi = [
//       { id: 1, deger: 2 },
//       { id: 2, deger: 3 },
//       { id: 3, deger: 4 },
//       { id: 4, deger: 5 },
//       { id: 4, deger: 6 },
//       { id: 4, deger: 7 },
//       { id: 4, deger: 8 },
//       { id: 4, deger: 9 },
//       { id: 4, deger: 10 },
//       { id: 4, deger: 11 },
//       { id: 4, deger: 12},
//       { id: 4, deger: 13},
//       { id: 4, deger: 14},
//       { id: 4, deger: 15},
//       { id: 4, deger: 16 },
//       { id: 4, deger: 17 },
//       { id: 4, deger: 18},
//       { id: 4, deger: 19 },
//       { id: 4, deger: 20},
//   ];
//   onDurakSayisiChange(durakSayisi): void { 
//     this.selectedDurakSayisi = durakSayisi;
//   };
//   onButonTipiChange(butonTipi): void { 
//     this.selectedButonTipi = butonTipi;
//   };
//   onButonCesidiChange(butonCesidi): void { 
//     this.selectedButonCesidi = butonCesidi;
//   };







//   getUrun(){
//     this.selectedRows=[]
//     var param= this.filteredButonVaryantlar(this.filterParametreler,this.frm)[0]
//     var urun=  this.urunler.filter(c=>c.id==param?.urunId)

//     if (urun.length>0) {
//       let updates = urun[0].urunBilesenler;
//       this.rowData.forEach((item: any) => {   
//       const update = updates.find((update) => update.id === item.id);
//         if (update) {item.miktar = update.miktar;}
//       });
//       this.selectedRows.forEach((item: any) => {   
//       const update = updates.find((update) => update.id === item.id);
//           if (update) {item.miktar = update.miktar;}
//           else{item.miktar=null}
//       });
//         this.selectedRows=urun[0].urunBilesenler;

//       this.selectedRows=urun[0].urunBilesenler
//     }
//     if (this.frm.butonTipi.id==2) {
//       var urun=  this.selectedUrunler
   
//     let updates = urun.urunBilesenler;
//     this.rowData.forEach((item: any) => {   
//     const update = updates.find((update) => update.id === item.id);
//       if (update) {item.miktar = update.miktar;}
//     });
//     this.selectedRows.forEach((item: any) => {   
//     const update = updates.find((update) => update.id === item.id);
//         if (update) {item.miktar = update.miktar;}
//         else{item.miktar=null}
//     });
//   this.selectedRows=urun.urunBilesenler;

//     }


//    this.updateTable(this.rowData)

//   }
//   filteredButonVaryantlar(parametreler:any,frm:any) {
//   if (frm.butonTipi.id==1) {
//       return parametreler.filter(item => {
  
  
//         return (
//           item.butonTipi.toLowerCase().includes(frm.butonTipi.ad.toLowerCase()) &&
//           item.butonCesidi.toLowerCase().includes(frm.butonCesidi?.ad.toLowerCase()) &&
//           item.durakSayisi == 2
//         );
//       });
  
  
// }

// else{
//   return parametreler.filter(item => {


//     return (
//       item.butonTipi.toLowerCase().includes(frm.butonTipi.ad.toLowerCase()) &&
//       item.butonCesidi.toLowerCase().includes(frm.butonCesidi?.ad.toLowerCase()) 
     
//     );
//   });
// }
 
 
//   }
//   updateTable(datas){
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
//   }
//   maliyetHesabi(){

//   this.updateTable(this.selectedRows)
//    this.selectedRows.forEach(element => {
//      element.total=element.miktar * element.dovizFiyat
//    });
//    if (this.frm.butonTipi.id==1) {
//     this.birimMaliyet=this.selectedRows.reduce((total, row) => total + row.total, 0)+( 45.31*(this.frm.durakSayisi.deger-1));
//    }
//    else{
//     this.birimMaliyet=this.selectedRows.reduce((total, row) => total + row.total, 0)
//     console.log(this.birimMaliyet);
//    }


//   }

//   onFocus() {
//     this.autoComplete.show();
//     this.filterUrunler({ query: '' });
//   };
//   filterUrunler(event: any) {
//     let filtered: any[] = [];
//     let query = event.query;
//     for (let i = 0; i < (this.urunler.filter(c=>c.urunGrubu==this.frm.butonTipi.ad)).length; i++) {
//       let country = (this.urunler.filter(c=>c.urunGrubu==this.frm.butonTipi.ad))[i];
//       if (country.ad.toLowerCase().indexOf(query.toLowerCase()) == 0) {
//         filtered.push(country);
//       }
//     }
//     this.filteredUrunler = filtered;
    
    
//   };
//   ngModelChange() {
//     this.selectedRows=[]
//     var urun=  this.selectedUrunler
   
//     let updates = urun.urunBilesenler;
//     this.rowData.forEach((item: any) => {   
//     const update = updates.find((update) => update.id === item.id);
//       if (update) {item.miktar = update.miktar;}
//     });
//     this.selectedRows.forEach((item: any) => {   
//     const update = updates.find((update) => update.id === item.id);
//         if (update) {item.miktar = update.miktar;}
//         else{item.miktar=null}
//     });
//   this.selectedRows=urun.urunBilesenler;



//    this.updateTable(this.rowData)
//   };



constructor(private ButonService:ButonService) {

  
}


urunler:any;
bilesenler:any =[];
selectedBilesenRow:any;
selectedUrunRow:any;
personeller=DATA_PERSONELLER
selectedPersonelRows:any;

iscilikGiderler:any=ISCILIK
genelGiderler:any=GENELGIDERLER
selectedURUN:any;

async ngOnInit() {
  // this.urunler=await this.ButonService.GetAll();
  
 }






frm:any={
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


  malzemeToplam: number;
  Hesapla(event){
    this.bilesenler=this.selectedURUN?.urunBilesenler;

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
  }



  onRowClickUrunler(event){}      






}
