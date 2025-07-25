import { Component } from '@angular/core';
import { KabinService } from 'src/app/core/services/repository/kabin.service';
import { DOVIZ } from 'src/assets/DATA/doviz';

@Component({
  selector: 'app-genel',
  templateUrl: './genel.component.html',
  styleUrls: ['./genel.component.scss']
})
export class GenelComponent {




  constructor(private KabinService: KabinService) {


  }



  genelModeller: any;
  kabinler: any;


  birlesmisVeri: any
  gruplanmisVeri: any = {};
  objectKeys: any;



  excelSatirSayisi:any=[];
  excelHucreSayisi:any=[];

  async ngOnInit() {


    for (let i = 1; i < 100; i++) {
      this.excelSatirSayisi.push(i)
    }
    this.excelSatirSayisi


    for (let i = 1; i < 1090; i++) {
      this.excelHucreSayisi.push(i)
    }
    this.excelHucreSayisi



    this.kabinler = (await this.KabinService.GetAll()).items


    this.kabinler .forEach(data => {
      let total = 0;
      data.urunBilesenler.forEach((urunBilesen: any) => {
        if (urunBilesen.stok.dovizCinsi == 'TL') {
          var doviz: any = DOVIZ.filter(c => c.dovizCinsi == urunBilesen.stok.dovizCinsi)[0]
          urunBilesen.stok.dovizFiyat = urunBilesen.stok.birimFiyat * doviz.deger;
        }
        else if (urunBilesen.stok.dovizCinsi == 'EURO') {
          var doviz: any = DOVIZ.filter(c => c.dovizCinsi == urunBilesen.stok.dovizCinsi)[0]
          urunBilesen.stok.dovizFiyat = urunBilesen.stok.birimFiyat * doviz.deger;
        }
        else if (urunBilesen.stok.dovizCinsi == 'USD') {
          var doviz: any = DOVIZ.filter(c => c.dovizCinsi == urunBilesen.stok.dovizCinsi)[0]
          urunBilesen.stok.dovizFiyat = urunBilesen.stok.birimFiyat * doviz.deger;
        }
        total+=urunBilesen.miktar * urunBilesen.stok.dovizFiyat;
        data.malzemeGider = total;
      })
      data.fabrika = "Kabin";

    });



   
    this.genelModeller = [
      { model: 'KOLYOZ-S', fabrika: 'Kabin', },
      { model: 'LAGOS', fabrika: 'Kabin',},
      { model: 'ORFOZ', fabrika: 'Kabin',},
      { model: 'BELUGA', fabrika: 'Kabin', },
      { model: 'LİTRİNOS', fabrika: 'Kabin', },
      { model: 'BARACUDA', fabrika: 'Kabin', },
      { model: 'ÇAMUKA', fabrika: 'Kabin', },
      { model: 'JAVA', fabrika: 'Kabin', },
      { model: 'OPAH', fabrika: 'Kabin', },
      { model: 'HAMSİ', fabrika: 'Kabin', },
      { model: 'SUDAK', fabrika: 'Kabin', },
      { model: 'RİNA', fabrika: 'Kabin', },
      { model: 'İSPENDEK', fabrika: 'Kabin', },
      { model: 'MORİNA FR', fabrika: 'Kabin', },
      { model: 'EMPEROR', fabrika: 'Kabin', },
      { model: 'TUVAL FR', fabrika: 'Kabin', },
      { model: 'SCARLET', fabrika: 'Kabin', },
      { model: 'KLİNA', fabrika: 'Kabin', },
      { model: 'MELANURYA', fabrika: 'Kabin', },
      { model: 'FRONTOZA', fabrika: 'Kabin', },
      { model: 'LEVKİT', fabrika: 'Kabin', },
      { model: 'SİNARİT', fabrika: 'Kabin', },
      { model: 'SARPA', fabrika: 'Kabin', },
      { model: 'ÇİKLİT', fabrika: 'Kabin', },
      { model: 'BARRELEYE', fabrika: 'Kabin', },
      { model: 'CAMGÖZ', fabrika: 'Kabin', },
      { model: 'STRANGOLOS', fabrika: 'Kabin', },
      { model: 'ZARGANA', fabrika: 'Kabin', },
      { model: 'KARMOZ', fabrika: 'Kabin', },
      { model: 'MOBİDİK', fabrika: 'Kabin', },
      { model: 'KOLYOZ', fabrika: 'Kabin', },
    ]
    // this.genelGiderKatsayi = [
    //   {
    //     ad: "ESB",
    //     fabrika: "Kabin",
    //     tur: "320 KG",
    //     tutar: 74476
    //   },
    //   {
    //     ad: "ESB",
    //     fabrika: "Kabin",
    //     tur: "480 KG",
    //     tutar: 36450
    //   },
    // ]

    this.birlesmisVeri = this.birlestir();
    this.gruplanmisVeri = this.gruplamaYap();
    this.objectKeys = Object.keys(this.gruplanmisVeri)

    //  console.log(this.genelModeller);
    //  console.log(this.kabinler);
    //  console.log(this.birlesmisVeri);
    //  console.log(this.gruplanmisVeri);

  }



  birlestir() {

    return this.genelModeller.map(genel => {
      
      const kabinler = this.kabinler
        .filter(kabin => kabin.model === genel.model && kabin.fabrika === genel.fabrika)
        .reduce((acc, kabin) => {
          // katsayi.tutar = gider.tutar ;
          // acc[katsayi.tur] =gider.tutar*katsayi.deger/100;
          acc[kabin.kapasite] = kabin;
          return acc;
        }, {});

      return {
        ...genel,
        kabinler
      };
    });
  }
  gruplamaYap() {
    const gruplanmisVeri = this.birlesmisVeri.reduce((acc, genel) => {
      if (!acc[genel.fabrika]) {
        acc[genel.fabrika] = [];
      }
      acc[genel.fabrika].push(genel);

      return acc;
    }, {});

    return gruplanmisVeri;

  }






  yeni() { }
  sil() { }
  guncelle() { }
}
