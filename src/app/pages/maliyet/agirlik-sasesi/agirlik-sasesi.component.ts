import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgirlikSasesiService } from 'src/app/core/services/repository/agirlik-sasesi.service';
import { GenelGiderKatsayiService } from 'src/app/core/services/repository/genel-gider-katsayi.service';
import { GenelGiderService } from 'src/app/core/services/repository/genel-gider.service';
import { KasnakService } from 'src/app/core/services/repository/kasnak.service';
import { DOVIZ } from 'src/assets/DATA/doviz';
import { AgirlikSaselerModalComponents } from 'src/shared/dialogs/filter-open-dialogs/agirlik-saseler-modal';
import { NoResultModalComponents } from 'src/shared/dialogs/informations/no-result-dialog';


@Component({
  selector: 'app-agirlik-sasesi',
  templateUrl: './agirlik-sasesi.component.html',
  styleUrls: ['./agirlik-sasesi.component.scss']
})
export class AgirlikSasesiComponent implements OnInit {
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
  constructor(
    private AgirlikSasesiService: AgirlikSasesiService,
    private GenelGiderService: GenelGiderService,
    private GenelGiderKatsayiService: GenelGiderKatsayiService,
    private NgbModal: NgbModal) {
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
    askiTipi: { id: 1, ad: 'Hepsi' },
    karkasSekli: { id: 1, ad: 'Hepsi' },
    kapasite: { id: 1, ad: 'Hepsi' },
    rayArasi: 0
  };



  selectedAskiTipi: any
  askiTipi = [
    { id: 1, ad: 'Hepsi' },
    { id: 2, ad: '2/1' },
    { id: 3, ad: '1/1' },
  ]
  onAskiTipiChange(askiTipi): void {
    this.selectedAskiTipi = askiTipi;
  };


  selectedKarkasSekli: any
  karkasSekli = [
    { id: 1, ad: 'Hepsi' },
    { id: 2, ad: 'Tek Sıra Ağırlık' },
    { id: 3, ad: 'Çift Sıra Ağırlık' },
    { id: 4, ad: 'Tek Sıra Dublex Ağırlık' },
    { id: 5, ad: 'Çift Sıra Dublex Ağırlık ' },
  ]

  onKarkasSekliChange(id): void {
    this.selectedKarkasSekli = id;
  };



  selectedKapasite: any
  kapasite = [
    { id: 1, ad: 'Hepsi' },
    { id: 2, ad: '800' },
    { id: 3, ad: '1100' },

  ]

  onKapasiteChange(id): void {
    this.selectedKapasite = id;
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

    this.toplamMaliyet = this.iscilikToplam + this.malzemeToplam + (this.genelGiderToplam / this.frm.personelSayisi);

    this.fiyatHesap();



  }


  iscilikToplam: any;
  IscilikDeleteFunc(event) {
    this.iscilikGiderler = event;
  }


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

    this.gruplanmisVeri['Kabin Fabrikası'].forEach(element => {
      total += element['katsayilar'].AgirlikSasesi / 28
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






  async urunfilter() {
    this.birimMaliyet = null;
    const filteredProducts = ((await this.AgirlikSasesiService.GetAll()).items).filter(item => {
      const matchesDurakSayisi = this.selectedAskiTipi ? item.askiTipi === this.selectedAskiTipi.ad || this.selectedAskiTipi.id == 1 : true;
      const matchesButonCesidi = this.selectedKapasite ? item.kapasite === this.selectedKapasite.ad || this.selectedKapasite.id == 1 : true;
      const matchesBoyOzellik = this.selectedKarkasSekli ? item.karkasSekli === this.selectedKarkasSekli.ad || this.selectedKarkasSekli.id == 1 : true;
      return matchesDurakSayisi && matchesButonCesidi && matchesBoyOzellik

    });
    this.urunler = filteredProducts;
    this.selectedUrunRow = filteredProducts[0];

    if (this.urunler.length == 0) {
      const modalRef = this.NgbModal.open(NoResultModalComponents, {
        size: 'sm',
        backdrop: 'static',
      });
      modalRef.componentInstance.data = 'Birim Kartı';
      modalRef.result.then(async (event) => { });
    }
    else {
      const modalRef = this.NgbModal.open(AgirlikSaselerModalComponents, {
        size: 'lg',
        backdrop: 'static',
      });
      modalRef.componentInstance.confirmationBoxTitle = 'Ağırlık Şase Listesi';
      modalRef.componentInstance.datas = this.urunler;
      modalRef.result.then((item) => {
        if (item != false) {
          this.selectedURUN = item
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


