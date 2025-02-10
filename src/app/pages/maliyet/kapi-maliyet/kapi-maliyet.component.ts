import { Component, OnInit } from '@angular/core';
import { DOVIZ } from 'src/assets/DATA/doviz';
import { KabinService } from 'src/app/core/services/repository/kabin.service';
import { HttpClient } from '@angular/common/http';
import { PersonelService } from 'src/app/core/services/repository/personel.service';
import { GenelGiderService } from 'src/app/core/services/repository/genel-gider.service';
import { KapiService } from 'src/app/core/services/repository/kapi.service';
import { GenelGiderKatsayiService } from 'src/app/core/services/repository/genel-gider-katsayi.service';
import { KapilarModalComponents } from 'src/shared/dialogs/filter-open-dialogs/kapilar-modal';
import { NoResultModalComponents } from 'src/shared/dialogs/informations/no-result-dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-kapi-maliyet',
  templateUrl: './kapi-maliyet.component.html',
  styleUrls: ['./kapi-maliyet.component.scss']
})
export class KapiMaliyetComponent implements OnInit {




  kabinler: any = [];
  bilesenler: any = [];
  iscilikGiderler: any = []
  genelGiderler: any = []
  birimMaliyet: any;
  selectedBilesenRow: any;
  selectedUrunRow: any;
  selectedURUN: any;
  personeller = []
  selectedPersonelRows: any;

  constructor(
    private KapiService: KapiService,
    private GenelGiderService: GenelGiderService,
    private GenelGiderKatsayiService: GenelGiderKatsayiService,
    private NgbModal: NgbModal
  ) {


  }
  birlesmisVeri: any
  gruplanmisVeri: any = {};
  objectKeys: any;
  genelGiderKatsayi: any;
  async ngOnInit() {

    this.genelGiderler = ((await this.GenelGiderService.GetAll()).items);
    this.genelGiderKatsayi = (await this.GenelGiderKatsayiService.GetAll()).items
    this.birlesmisVeri = this.birlestir();
    this.gruplanmisVeri = this.gruplamaYap();
    this.objectKeys = Object.keys(this.gruplanmisVeri)

    var total = 0
    this.genelGiderler.forEach(element => {
      total += (element.tutar * element.etkiOrani / 100);
    });

    this.genelGiderMaliyet = total;












  }





  frm: any = {
    kar: 15,
    vadeFarki: 4.5,
    gunlukUretimSayisi: 15,
    tahminiCalisanSayisi: 10,
    ortalamaPersonelMaasi: 0,
    yon: { id: 1, ad: 'Hepsi' },
    kapiYuksekligi: { id: 1, ad: 'Hepsi' },
    kapiGenisligi: { id: 1, ad: 'Hepsi' },
    kapiTipi: { id: 1, ad: 'Hepsi' },
    kaplama: { id: 1, ad: 'Hepsi' }
  }



  selectedYon: any;
  yon = [
    { id: 1, ad: 'Hepsi' },
    { id: 2, ad: 'Sağ' },
    { id: 3, ad: 'Sol' },
    { id: 4, ad: 'Merkezi' },
  ]
  onYonChange(item: any): void {
    this.selectedYon = item;
  };


  selectedKapiYukseklik: any;
  kapiYuksekligi = [
    { id: 1, ad: 'Hepsi' },
    { id: 2, ad: '200' },
    { id: 3, ad: '210' },
  ]
  onKapiYuksekligiChange(item: any): void {
    this.selectedKapiYukseklik = item;
  };


  selectedKapiGenisligi: any;
  kapiGenisligi = [
    { id: 1, ad: 'Hepsi' },
    { id: 2, ad: '70' },
    { id: 3, ad: '80' },
    { id: 4, ad: '90' },
  ]
  onKapiGenisligiChange(item: any): void {
    this.selectedKapiGenisligi = item;
  };


  selectedKapiTipi: any;
  kapiTipi = [
    { id: 1, ad: 'Hepsi' },
    { id: 2, ad: 'Otomatik' },
    { id: 3, ad: 'İç Güvenlik' },
    { id: 4, ad: 'Yarı Otomatik' },
    { id: 5, ad: 'Dairesel' },
  ];
  onKapiTipiChange(kapasite: any): void {
    this.selectedKapiTipi = kapasite;
  };


  selectedKaplama: any;
  kaplama = [
    { id: 1, ad: 'Hepsi' },
    { id: 2, ad: 'Satine' },
    { id: 3, ad: 'Decoplate' },
  ];

  onKaplamaChange(kapasite: any): void {
    this.selectedKaplama = kapasite;
  };


  onRowClickUrunler(event) { }


  visible: boolean;
  async urunleriGoster() {
    this.selectedURUN = []
    const filteredProducts = ((await this.KapiService.GetAll()).items).filter(item => {
      const matchesButonTipi = this.selectedYon ? item.yon === this.selectedYon.ad || this.selectedYon.id == 1 : true;
      const matchesDurakSayisi = this.selectedKapiYukseklik ? item.kapiYuksekligi === this.selectedKapiYukseklik.ad || this.selectedKapiYukseklik.id == 1 : true;
      const matchesButonCesidi = this.selectedKapiGenisligi ? item.kapiGenisligi === this.selectedKapiGenisligi.ad || this.selectedKapiGenisligi.id == 1 : true;
      const matchesKasnakTuru = this.selectedKapiTipi ? item.kapiTipi === this.selectedKapiTipi.ad || this.selectedKapiTipi.id == 1 : true;
      const matchesKaplama = this.selectedKaplama ? item.kaplama === this.selectedKaplama.ad || this.selectedKaplama.id == 1 : true;
      return matchesButonTipi && matchesDurakSayisi && matchesButonCesidi && matchesKasnakTuru && matchesKaplama
    });
    this.kabinler = filteredProducts;
    this.visible = true;
  }




  genelGiderToplam: any;
  toplamMaliyet: any;



  kasaBilesenler: any;
  panelBilesenler: any;
  mekanizmaBilesenler: any;

  kasaIscilikGiderler: any;
  panelIscilikGiderler: any;
  mekanizmaIscilikGiderler: any;
  urunSec(event) {

    this.kasaBilesenler = this.selectedURUN?.kapiGruplari.filter(c => c.tur == "Kasa")[0]?.urunBilesenler
    this.panelBilesenler = this.selectedURUN?.kapiGruplari.filter(c => c.tur == "Panel")[0]?.urunBilesenler
    this.mekanizmaBilesenler = this.selectedURUN?.kapiGruplari.filter(c => c.tur == "Mekanizma")[0]?.urunBilesenler


    this.kasaIscilikGiderler = this.selectedURUN?.kapiGruplari.filter(c => c.tur == "Kasa")[0]?.iscilikGiderler
    this.panelIscilikGiderler = this.selectedURUN?.kapiGruplari.filter(c => c.tur == "Panel")[0]?.iscilikGiderler
    this.mekanizmaIscilikGiderler = this.selectedURUN?.kapiGruplari.filter(c => c.tur == "Mekanizma")[0]?.iscilikGiderler


    let kasaTotalMaas = 0;
    this.kasaIscilikGiderler.forEach(element => {
      kasaTotalMaas += element.personel.maas;
    });


    let panelTotalMaas = 0;
    this.panelIscilikGiderler.forEach(element => {
      panelTotalMaas += element.personel.maas;
    });


    let mekanizmaTotalMaas = 0;
    this.mekanizmaIscilikGiderler.forEach(element => {
      mekanizmaTotalMaas += element.personel.maas;
    });






    this.bilesenler = this.selectedURUN?.kapiGruplari.filter(c => c.tur == "Kasa")[0]?.urunBilesenler;
    this.iscilikGiderler = this.selectedURUN?.kapiGruplari.filter(c => c.tur == "Kasa")[0]?.iscilikGiderler;
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

    this.visible = false;

    if (this.selectedURUN) {
      this.hesaplaButtonDisabled = false;
    }
    if (this.selectedURUN) {
      this.radioSelect = false;
    }

  }


  kasaMalzemeToplam: any;
  panelMalzemeToplam: any;
  mekanizmaMalzemeToplam: any;
  malzemeToplam: number;

  kasaIscilikToplam: any;
  panelIscilikToplam: any;
  mekanizmaIscilikToplam: any;


  kasaGenelGiderToplam: any;
  panelGenelGiderToplam: any;
  mekanizmaGenelGiderToplam: any;
  genelGiderMaliyet: any;
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

  }


  iscilikToplam: any;
  IscilikDeleteFunc(event) {
    this.iscilikGiderler = event;
  }



  iscilikVisible: any;
  selectedPersonelEkle: any;



  malzemeGiderHesap() {

    this.kasaBilesenler?.forEach((item: any) => {
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
    let kasaTotal = 0;
    for (let item of this.kasaBilesenler) {
      kasaTotal += item.miktar * item.stok.dovizFiyat;
    }
    this.kasaMalzemeToplam = kasaTotal;



    this.panelBilesenler?.forEach((item: any) => {
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
    let panelTotal = 0;
    for (let item of this.panelBilesenler) {
      panelTotal += item.miktar * item.stok.dovizFiyat;
    }
    this.panelMalzemeToplam = panelTotal;



    this.mekanizmaBilesenler?.forEach((item: any) => {
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
    let mekanizmaTotal = 0;
    for (let item of this.mekanizmaBilesenler) {
      mekanizmaTotal += item.miktar * item.stok.dovizFiyat;
    }
    this.mekanizmaMalzemeToplam = mekanizmaTotal;


    this.malzemeToplam = this.kasaMalzemeToplam + this.panelMalzemeToplam + this.mekanizmaMalzemeToplam;





  }

  iscilikGiderHesap() {
    var kasaTotalMaas = 0
    this.kasaIscilikGiderler.forEach(element => {
      kasaTotalMaas += element.personel.maas;
    });

    if (this.kasaIscilikGiderler.length != 0) {
      this.frm.ortalamaPersonelMaasi = kasaTotalMaas / this.kasaIscilikGiderler.length;
      this.frm.personelSayisi = this.kasaIscilikGiderler.length;
      this.kasaIscilikToplam = ((kasaTotalMaas / this.kasaIscilikGiderler.length) * (this.kasaIscilikGiderler.length) / 28) / this.frm.gunlukUretimSayisi;
    }
    else {
      this.frm.ortalamaPersonelMaasi = 0;
      this.frm.personelSayisi = 0;
      this.kasaIscilikToplam = 0;
    }




    var panelTotalMaas = 0
    this.panelIscilikGiderler.forEach(element => {
      panelTotalMaas += element.personel.maas;
    });
    if (this.panelIscilikGiderler.length != 0) {
      this.frm.ortalamaPersonelMaasi = panelTotalMaas / this.panelIscilikGiderler.length;
      this.frm.personelSayisi = this.panelIscilikGiderler.length;
      this.panelIscilikToplam = ((panelTotalMaas / this.panelIscilikGiderler.length) * (this.panelIscilikGiderler.length) / 28) / this.frm.gunlukUretimSayisi;
    }
    else {
      this.frm.ortalamaPersonelMaasi = 0;
      this.frm.personelSayisi = 0;
      this.panelIscilikToplam = 0;
    }




    var mekanizmaTotalMaas = 0
    this.mekanizmaIscilikGiderler.forEach(element => {
      mekanizmaTotalMaas += element.personel.maas;
    });
    if (this.mekanizmaIscilikGiderler.length != 0) {
      this.frm.ortalamaPersonelMaasi = mekanizmaTotalMaas / this.mekanizmaIscilikGiderler.length;
      this.frm.personelSayisi = this.mekanizmaIscilikGiderler.length;
      this.mekanizmaIscilikToplam = ((mekanizmaTotalMaas / this.mekanizmaIscilikGiderler.length) * (this.mekanizmaIscilikGiderler.length) / 28) / this.frm.gunlukUretimSayisi;
    }
    else {
      this.frm.ortalamaPersonelMaasi = 0;
      this.frm.personelSayisi = 0;
      this.mekanizmaIscilikToplam = 0;
    }







    this.iscilikToplam = this.kasaIscilikToplam + this.panelIscilikToplam + this.mekanizmaIscilikToplam










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

  genelGiderHesap() {





    var total = 0
    // this.genelGiderler.forEach(element => {
    //   total += (element.tutar*element.etkiOrani/100);
    // });
    // this.genelGiderToplam=total

    this.gruplanmisVeri['Kapı Fabrikası'].forEach(element => {
      total += element['katsayilar'].kapi / 28
    });

    this.genelGiderToplam = total;

    // this.genelGiderMaliyet=total;

    var toplamPersonel = this.kasaIscilikGiderler.length + this.panelIscilikGiderler.length + this.mekanizmaIscilikGiderler.length
    var birimGenelGider = total / toplamPersonel
    this.kasaGenelGiderToplam = birimGenelGider * this.kasaIscilikGiderler.length / this.frm.gunlukUretimSayisi
    this.panelGenelGiderToplam = birimGenelGider * this.panelIscilikGiderler.length / this.frm.gunlukUretimSayisi
    this.mekanizmaGenelGiderToplam = birimGenelGider * this.mekanizmaIscilikGiderler.length / this.frm.gunlukUretimSayisi

    // this.genelGiderToplam=birimGenelGider*toplamPersonel/this.frm.gunlukUretimSayisi
















  }


  //pesin
  kasaPesinFiyat: any;
  kasaVade1Fiyat: any;
  kasaVade2Fiyat: any;
  kasaVade3Fiyat: any;
  panelPesinFiyat: any;
  panelVade1Fiyat: any;
  panelVade2Fiyat: any;
  panelVade3Fiyat: any;
  mekanizmaPesinFiyat: any;
  mekanizmaVade1Fiyat: any;
  mekanizmaVade2Fiyat: any;
  mekanizmaVade3Fiyat: any;



  pesinToplam: any;
  vade1Toplam: any;
  vade2Toplam: any;
  vade3Toplam: any;

  fiyatHesap() {


    var toplamKasaMaliyet = this.kasaMalzemeToplam + this.kasaIscilikToplam + ((this.genelGiderToplam / 3))

    this.kasaPesinFiyat = toplamKasaMaliyet + toplamKasaMaliyet * this.frm.kar / 100;
    this.kasaVade1Fiyat = this.kasaPesinFiyat + this.kasaPesinFiyat * this.frm.vadeFarki / 100;
    this.kasaVade2Fiyat = this.kasaVade1Fiyat + this.kasaVade1Fiyat * this.frm.vadeFarki / 100;
    this.kasaVade3Fiyat = this.kasaVade2Fiyat + this.kasaVade2Fiyat * this.frm.vadeFarki / 100;


    var toplamPanelMaliyet = this.panelMalzemeToplam + this.panelIscilikToplam + ((this.genelGiderToplam / 3))
    this.panelPesinFiyat = toplamPanelMaliyet + toplamPanelMaliyet * this.frm.kar / 100;
    this.panelVade1Fiyat = this.panelPesinFiyat + this.panelPesinFiyat * this.frm.vadeFarki / 100;
    this.panelVade2Fiyat = this.panelVade1Fiyat + this.panelVade1Fiyat * this.frm.vadeFarki / 100;
    this.panelVade3Fiyat = this.panelVade2Fiyat + this.panelVade2Fiyat * this.frm.vadeFarki / 100;


    var toplamMekanizmaMaliyet = this.mekanizmaMalzemeToplam + this.mekanizmaIscilikToplam + ((this.genelGiderToplam / 3))
    this.mekanizmaPesinFiyat = toplamMekanizmaMaliyet + toplamMekanizmaMaliyet * this.frm.kar / 100;
    this.mekanizmaVade1Fiyat = this.mekanizmaPesinFiyat + this.mekanizmaPesinFiyat * this.frm.vadeFarki / 100;
    this.mekanizmaVade2Fiyat = this.mekanizmaVade1Fiyat + this.mekanizmaVade1Fiyat * this.frm.vadeFarki / 100;
    this.mekanizmaVade3Fiyat = this.mekanizmaVade2Fiyat + this.mekanizmaVade2Fiyat * this.frm.vadeFarki / 100;



    this.pesinToplam = this.kasaPesinFiyat + this.panelPesinFiyat + this.mekanizmaPesinFiyat;
    this.vade1Toplam = this.kasaVade1Fiyat + this.panelVade1Fiyat + this.mekanizmaVade1Fiyat;
    this.vade2Toplam = this.kasaVade2Fiyat + this.panelVade2Fiyat + this.mekanizmaVade2Fiyat;
    this.vade3Toplam = this.kasaVade3Fiyat + this.panelVade3Fiyat + this.mekanizmaVade3Fiyat;




  }





  selectedKapiGrup: any = {
    id: 1,
    label: 'Kasa',
  };
  radioSelect: boolean = true;
  menu = [
    {
      submenu: [
        {
          id: 1,
          label: 'Kasa',
        },
        {
          id: 2,
          label: 'Panel',
        },
        {
          id: 3,
          label: 'Mekanizma',
        },
      ],
    },


  ];



  toggleNode() {
    this.bilesenler = this.selectedURUN?.kapiGruplari.filter(c => c.tur == this.selectedKapiGrup)[0]?.urunBilesenler
    this.iscilikGiderler = this.selectedURUN?.kapiGruplari.filter(c => c.tur == this.selectedKapiGrup)[0]?.iscilikGiderler;


    this.bilesenler = this.selectedURUN?.kapiGruplari.filter(c => c.tur == this.selectedKapiGrup)[0]?.urunBilesenler;
    this.iscilikGiderler = this.selectedURUN?.kapiGruplari.filter(c => c.tur == this.selectedKapiGrup)[0]?.iscilikGiderler;
    let totalMaas = 0;
    this.iscilikGiderler.forEach(element => {
      totalMaas += element.personel.maas;
    });




    this.Hesapla();

    if (this.iscilikGiderler.length != 0) {

      this.frm.ortalamaPersonelMaasi = totalMaas / this.iscilikGiderler.length;
      this.frm.personelSayisi = this.iscilikGiderler.length;
    }
    else {
      this.frm.ortalamaPersonelMaasi = 0;
      this.frm.personelSayisi = 0;
    }
  }








  childFuncStokEkle(item) {
    this.bilesenler = item
  }




  personelEkleDialog(item) {
    this.iscilikGiderler = item
  }




  async urunfilter() {
    this.selectedURUN = []
    const filteredProducts = ((await this.KapiService.GetAll()).items).filter(item => {
      const matchesButonTipi = this.selectedYon ? item.yon === this.selectedYon.ad || this.selectedYon.id == 1 : true;
      const matchesDurakSayisi = this.selectedKapiYukseklik ? item.kapiYuksekligi === this.selectedKapiYukseklik.ad || this.selectedKapiYukseklik.id == 1 : true;
      const matchesButonCesidi = this.selectedKapiGenisligi ? item.kapiGenisligi === this.selectedKapiGenisligi.ad || this.selectedKapiGenisligi.id == 1 : true;
      const matchesKasnakTuru = this.selectedKapiTipi ? item.kapiTipi === this.selectedKapiTipi.ad || this.selectedKapiTipi.id == 1 : true;
      const matchesKaplama = this.selectedKaplama ? item.kaplama === this.selectedKaplama.ad || this.selectedKaplama.id == 1 : true;
      return matchesButonTipi && matchesDurakSayisi && matchesButonCesidi && matchesKasnakTuru && matchesKaplama
    });
    this.kabinler = filteredProducts;
    this.selectedUrunRow = filteredProducts[0];

    if (this.kabinler.length == 0) {
      const modalRef = this.NgbModal.open(NoResultModalComponents, {
        size: 'sm',
        backdrop: 'static',
      });
      modalRef.componentInstance.data = 'Birim Kartı';
      modalRef.result.then(async (event) => { });
    }
    else {
      const modalRef = this.NgbModal.open(KapilarModalComponents, {
        size: 'lg',
        backdrop: 'static',
      });
      modalRef.componentInstance.confirmationBoxTitle = 'Buton Listesi';
      modalRef.componentInstance.datas = this.kabinler;
      modalRef.result.then((item) => {
        if (item != false) {
          this.selectedURUN=item;
          
          this.kasaBilesenler = item?.kapiGruplari.filter(c => c.tur == "Kasa")[0]?.urunBilesenler
          this.panelBilesenler = item?.kapiGruplari.filter(c => c.tur == "Panel")[0]?.urunBilesenler
          this.mekanizmaBilesenler = item?.kapiGruplari.filter(c => c.tur == "Mekanizma")[0]?.urunBilesenler


          this.kasaIscilikGiderler = item?.kapiGruplari.filter(c => c.tur == "Kasa")[0]?.iscilikGiderler
          this.panelIscilikGiderler = item?.kapiGruplari.filter(c => c.tur == "Panel")[0]?.iscilikGiderler
          this.mekanizmaIscilikGiderler = item?.kapiGruplari.filter(c => c.tur == "Mekanizma")[0]?.iscilikGiderler


          let kasaTotalMaas = 0;
          this.kasaIscilikGiderler.forEach(element => {
            kasaTotalMaas += element.personel.maas;
          });


          let panelTotalMaas = 0;
          this.panelIscilikGiderler.forEach(element => {
            panelTotalMaas += element.personel.maas;
          });


          let mekanizmaTotalMaas = 0;
          this.mekanizmaIscilikGiderler.forEach(element => {
            mekanizmaTotalMaas += element.personel.maas;
          });






          this.bilesenler = this.selectedURUN?.kapiGruplari.filter(c => c.tur == "Kasa")[0]?.urunBilesenler;
          this.iscilikGiderler = this.selectedURUN?.kapiGruplari.filter(c => c.tur == "Kasa")[0]?.iscilikGiderler;
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

          this.visible = false;

          if (this.selectedURUN) {
            this.hesaplaButtonDisabled = false;
          }
          if (this.selectedURUN) {
            this.radioSelect = false;
          }
        }
      });

    }







  }


}


