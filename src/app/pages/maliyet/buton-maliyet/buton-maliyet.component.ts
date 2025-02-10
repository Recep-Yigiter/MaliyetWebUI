import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ButonService } from 'src/app/core/services/repository/buton.service';
import { GenelGiderKatsayiService } from 'src/app/core/services/repository/genel-gider-katsayi.service';
import { GenelGiderService } from 'src/app/core/services/repository/genel-gider.service';
import { DOVIZ } from 'src/assets/DATA/doviz';
import { ButonlarModalComponents } from 'src/shared/dialogs/filter-open-dialogs/butonlar-modal';
import { NoResultModalComponents } from 'src/shared/dialogs/informations/no-result-dialog';

@Component({
  selector: 'app-buton-maliyet',
  templateUrl: './buton-maliyet.component.html',
  styleUrls: ['./buton-maliyet.component.scss'],
})
export class ButonMaliyetComponent implements OnInit {




  urunler: any = [];
  bilesenler: any = [];
  iscilikGiderler: any = []
  genelGiderler: any = []
  birimMaliyet: any;
  selectedBilesenRow: any;
  selectedUrunRow: any;
  selectedURUN: any;
  personeller = []
  selectedPersonelRows: any;
  birlesmisVeri: any
  gruplanmisVeri: any = {};
  objectKeys: any;
  genelGiderKatsayi: any;
  constructor(private ButonService: ButonService, private GenelGiderService: GenelGiderService, private GenelGiderKatsayiService: GenelGiderKatsayiService,private NgbModal:NgbModal) {


  }

  async ngOnInit() {

    this.genelGiderler = ((await this.GenelGiderService.GetAll()).items);
    this.genelGiderKatsayi = (await this.GenelGiderKatsayiService.GetAll()).items
    this.birlesmisVeri = this.birlestir();
    this.gruplanmisVeri = this.gruplamaYap();
    this.objectKeys = Object.keys(this.gruplanmisVeri)




  }


  birlestir() {

    return this.genelGiderler.map(gider => {
      const katsayilar = this.genelGiderKatsayi
        .filter(katsayi => katsayi.ad === gider.ad && katsayi.fabrika === gider.fabrika)
        .reduce((acc, katsayi) => {
          acc[katsayi.tur] = gider.tutar * katsayi.deger / 100;
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


  frm: any = {
    kar: 15,
    vadeFarki: 4.5,
    gunlukUretimSayisi: 5,
    tahminiCalisanSayisi: 10,
    ortalamaPersonelMaasi: 0,
    butonTipi: { id: 1, ad: 'Hepsi' },
    durakSayisi: { id: 2, ad: '2' },
    butonCesidi: { id: 1, ad: 'Hepsi' },
    boyOzellik: { id: 1, ad: 'Hepsi' },
  }









  selectedButonTipi: any;
  butonTipi = [
    { id: 1, ad: 'Hepsi' },
    { id: 2, ad: 'Kabin Butonu' },
    { id: 3, ad: 'Kat Butonu' },
  ]
  onButonTipiChange(item: any): void {
    this.selectedButonTipi = item;
  };


  selectedDurakSayisi: any;
  durakSayisi = [
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
    this.selectedDurakSayisi = item;
  };



  selectedButonCesidi: any;
  butonCesidi = [
    { id: 1, ad: 'Hepsi' },
    { id: 2, ad: 'Cam' },
    { id: 3, ad: 'Mekanik' },
  ]
  onButonCesidiChange(item: any): void {
    this.selectedButonCesidi = item;
  };





  selectedBoyOzellik: any;
  boyOzellik = [
    { id: 1, ad: 'Hepsi' },
    { id: 2, ad: 'Tam Boy' },
    { id: 3, ad: 'Yarım Boy' },
  ]
  onBoyOzellikChange(item: any): void {
    this.selectedBoyOzellik = item;
  };



  onRowClickUrunler(event) { }







  genelGiderToplam: any;
  toplamMaliyet: any;
  malzemeToplam: number;
  hesaplaButtonDisabled = true;
  pesinFiyat: any;
  vade1Fiyat: any;
  vade2Fiyat: any;
  vade3Fiyat: any;

  Hesapla() {

    this.malzemeGiderHesap();
    this.iscilikGiderHesap();
    this.genelGiderHesap();

    this.toplamMaliyet = this.iscilikToplam + this.malzemeToplam + (this.genelGiderToplam / this.frm.gunlukUretimSayisi);

    this.fiyatHesap();



  }


  iscilikToplam: any;
  IscilikDeleteFunc(event) {
    this.iscilikGiderler = event;
  }



  iscilikVisible: any;




  malzemeGiderHesap() {
    this.bilesenler?.forEach((item: any) => {
      if (item.stok.dovizCinsi == 'TL') {
        var doviz: any = DOVIZ.filter(c => c.dovizCinsi == item.stok.dovizCinsi)[0]
        item.stok.dovizFiyat = item.stok.birimFiyat * doviz.deger;
      }
      else if (item.stok.dovizCinsi == 'EURO') {
        var doviz: any = DOVIZ.filter(c => c.dovizCinsi == item.stok.dovizCinsi)[0]
        item.stok.dovizFiyat = item.stok.birimFiyat * doviz.deger;
      }
      else if (item.stok.dovizCinsi == 'USD') {
        var doviz: any = DOVIZ.filter(c => c.dovizCinsi == item.stok.dovizCinsi)[0]
        item.stok.dovizFiyat = item.stok.birimFiyat * doviz.deger;
      }
    });
    let total = 0;
    for (let item of this.bilesenler) {
      total += item.miktar * item.stok.dovizFiyat;
    }
    this.malzemeToplam = total;
  }

  iscilikGiderHesap() {
    var totalMaas = 0
    this.iscilikGiderler.forEach(element => {
      totalMaas += element.personel.maas;
    });

    if (this.iscilikGiderler.length != 0) {
      this.frm.ortalamaPersonelMaasi = totalMaas / this.iscilikGiderler.length;
      this.frm.personelSayisi = this.iscilikGiderler.length;
      this.iscilikToplam = (this.frm.ortalamaPersonelMaasi * this.frm.personelSayisi / 28) / this.frm.gunlukUretimSayisi;
    }
    else {
      this.frm.ortalamaPersonelMaasi = 0;
      this.frm.personelSayisi = 0;
      this.iscilikToplam = 0;
    }

  }

  genelGiderHesap() {

    var total = 0
    // this.genelGiderler.forEach(element => {
    //   total += (element.tutar*element.etkiOrani/100);
    // });
    // this.genelGiderToplam=total
    this.gruplanmisVeri['Kabin Fabrikası'].forEach(element => {
      total += element['katsayilar'].buton / 28
    });

    this.genelGiderToplam = total;
  }

  fiyatHesap() {
    this.pesinFiyat = this.toplamMaliyet + this.toplamMaliyet * this.frm.kar / 100;
    this.vade1Fiyat = this.pesinFiyat + this.pesinFiyat * this.frm.vadeFarki / 100;
    this.vade2Fiyat = this.vade1Fiyat + this.vade1Fiyat * this.frm.vadeFarki / 100;
    this.vade3Fiyat = this.vade2Fiyat + this.vade2Fiyat * this.frm.vadeFarki / 100;
  }



  personelEkleDialog(item) {
    this.iscilikGiderler = item
  }
async urunfilter(){
  const filteredProducts = ((await this.ButonService.GetAll()).items).filter(item => {
    const matchesButonTipi = this.selectedButonTipi ? item.butonTipi === this.selectedButonTipi.ad || this.selectedButonTipi.id == 1 : true;
    // const matchesDurakSayisi = this.selectedDurakSayisi? item.durakSayisi === this.selectedDurakSayisi.ad|| this.selectedDurakSayisi.id==1 : true;
    const matchesButonCesidi = this.selectedButonCesidi ? item.butonCesidi === this.selectedButonCesidi.ad || this.selectedButonCesidi.id == 1 : true;
    const matchesBoyOzellik = this.selectedBoyOzellik ? item.boyOzellik === this.selectedBoyOzellik.ad || this.selectedBoyOzellik.id == 1 : true;
    return matchesButonTipi && matchesButonCesidi && matchesBoyOzellik

  });
  this.urunler = filteredProducts;
  this.selectedUrunRow = filteredProducts[0];

  if (this.urunler.length==0) {
    const modalRef = this.NgbModal.open(NoResultModalComponents, {
      size: 'sm',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = 'Birim Kartı';
    modalRef.result.then(async(event) => { });
  }
else{
  const modalRef = this.NgbModal.open(ButonlarModalComponents, {
    size: 'lg',
    backdrop: 'static',
  });
  modalRef.componentInstance.confirmationBoxTitle = 'Buton Listesi';
  modalRef.componentInstance.datas = this.urunler;
  modalRef.result.then((item) => {
    if (item != false) {
      this.selectedURUN=item  
      this.bilesenler = item?.urunBilesenler;
      this.iscilikGiderler = item?.iscilikGiderler;
      let totalMaas = 0;
      this.iscilikGiderler.forEach(element => {
        totalMaas += element.personel.maas;
      });
  
      if (this.iscilikGiderler.length != 0) {
        this.frm.ortalamaPersonelMaasi = totalMaas / this.iscilikGiderler.length;
        this.frm.personelSayisi = this.iscilikGiderler.length;
      }
      else {
        this.frm.ortalamaPersonelMaasi = 0;
        this.frm.personelSayisi = 0;
      }

  
      if (this.bilesenler.length > 0) {
        this.hesaplaButtonDisabled = false;
      }

    }
  });
  
}







  }


}


