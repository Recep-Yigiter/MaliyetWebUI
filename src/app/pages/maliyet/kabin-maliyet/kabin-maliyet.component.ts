import { Component, OnInit } from '@angular/core';
import { DOVIZ } from 'src/assets/DATA/doviz';
import { KabinService } from 'src/app/core/services/repository/kabin.service';
import { GenelGiderService } from 'src/app/core/services/repository/genel-gider.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonelSelectModalComponents } from 'src/shared/dialogs/personel-selected-modal';
import { GenelGiderKatsayiService } from 'src/app/core/services/repository/genel-gider-katsayi.service';
import { KABIN_MODELLER } from 'src/assets/DATA/kabin-modeller';
import { UpdateKabinComponent } from '../../tanimlar/kabin/update-kabin/update-kabin.component';
import { KabinlerModalComponents } from 'src/shared/dialogs/filter-open-dialogs/kabinler-modal';
import { NoResultModalComponents } from 'src/shared/dialogs/informations/no-result-dialog';

@Component({
  selector: 'app-kabin-maliyet',
  templateUrl: './kabin-maliyet.component.html',
  styleUrls: ['./kabin-maliyet.component.scss'],
})
export class KabinMaliyetComponent implements OnInit {

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
  birlesmisVeri: any
  gruplanmisVeri: any = {};
  objectKeys: any;
  genelGiderKatsayi: any;
  modeller: any = KABIN_MODELLER;
  constructor(
    private KabinService: KabinService,
    private GenelGiderService: GenelGiderService,
    private GenelGiderKatsayiService: GenelGiderKatsayiService,
    private NgbModal: NgbModal) { }

  async ngOnInit() {
    // this.modeller.push({id:1,ad:"Hepsi"})
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
    personelSayisi: 10,
    ortalamaPersonelMaasi: 0,
    model: {
      ad: "BELUGA",
      img: '../../../../../assets/img/kabin-models/BELUGA.PNG',
      ozellikler:
      {
        kabinDuvar: "Ral 7040 Boyalı Cam & Satine Paslanmaz",
        girisDuvar: "Satine Paslanmaz",
        arkaDuvar: "Füme Ayna",
        taban: "Silver Waves Granit",
        aydinlatma: "Kare Spot (Gün Işığı)",
        tavan: "Decoplate GS-05",
        kupeste: "Ø38 Parlak Satine Paslanmaz Boru",
        supurgelik: "Paslanmaz Çelik",
        opsiyonel: "-",
      }

    },
    kapasite: { id: 1, deger: '320' }
  }










  selectedModel: any;
 onModelChange(item: any):void {
    this.selectedModel = item;
   this.dropdownChangedUrun();

  };





 async dropdownChangedUrun(){
    const filteredProducts = ((await this.KabinService.GetAll()).items).filter(item => {
      const matchesModel = this.selectedModel ? item.model === this.selectedModel.ad || this.selectedModel.id == 1 : true;
      const matchesKapasite = this.selectedKapasite ? item.kapasite === this.selectedKapasite.deger || this.selectedKapasite.id == 1 : true;
      return matchesModel && matchesKapasite;
    });


    this.selectedURUN = filteredProducts[0];
    this.bilesenler = filteredProducts[0]?.urunBilesenler;
    this.iscilikGiderler = filteredProducts[0]?.iscilikGiderler;
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










  selectedKapasite: any;
  kapasiteler = [
    { id: 1, deger: '320' },
    { id: 2, deger: '400' },
    { id: 3, deger: '480' },
    { id: 4, deger: '630' },
    { id: 5, deger: '800' },
    { id: 6, deger: '1000' },
    { id: 7, deger: '1250' },
    { id: 8, deger: '1600' },
  ];
 async onKapasiteChange(kapasite: any) {
    this.selectedKapasite = kapasite;



  };









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




  selectedPersonelEkle: any;
  async personelEkleDialog(event) {

    this.selectedPersonelEkle = []
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
    // this.genelGiderler.forEach(element => {
    //   total += (element.tutar*element.etkiOrani/100);
    // });
    // this.genelGiderToplam=total

    this.gruplanmisVeri['Kabin Fabrikası'].forEach(element => {
      total += element['katsayilar'].kabin / 28
    });

    this.genelGiderToplam = total;
  }

  fiyatHesap() {
    this.pesinFiyat = this.toplamMaliyet + this.toplamMaliyet * this.frm.kar / 100;
    this.vade1Fiyat = this.pesinFiyat + this.pesinFiyat * this.frm.vadeFarki / 100;
    this.vade2Fiyat = this.vade1Fiyat + this.vade1Fiyat * this.frm.vadeFarki / 100;
    this.vade3Fiyat = this.vade2Fiyat + this.vade2Fiyat * this.frm.vadeFarki / 100;
  }

  childFuncStokEkle(item) {
    this.bilesenler = item
  }









  personelEkle() {
    const modalRef = this.NgbModal.open(PersonelSelectModalComponents, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.confirmationBoxTitle = 'Personel Listesi';
    modalRef.result.then((personel) => {
      if (personel != false) {
        var newValue = {
          id: "bb4913c6-3205-480d-9122-7b24d160c4db",
          isDeleted: false,
          olusturmaTarihi: "2002-12-12T00:00:00",
          personel: personel,
          personelId: personel.id,
          kabinId: null,
          butonId: null,
          kapiId: null,
          kasnakId: null,
          makineSasesiId: null,
          suspansiyonId: null
        }
        const customerExists = this.iscilikGiderler.some(customer => customer.personel.id === newValue.personel.id);

        if (customerExists) {
          alert(`Bu ${personel.ad} zaten mevcut! `);
          return;
        }
        this.iscilikGiderler = [...this.iscilikGiderler, newValue];

      }
    });
  }



  // async urunfilter() {
  //   this.selectedURUN = []
  //   const filteredProducts = ((await this.KabinService.GetAll()).items).filter(item => {
  //     const matchesModel = this.selectedModel ? item.model === this.selectedModel.ad || this.selectedModel.id == 1 : true;
  //     const matchesKapasite = this.selectedKapasite ? item.kapasite === this.selectedKapasite.deger || this.selectedKapasite.id == 1 : true;
  //     return matchesModel && matchesKapasite;
  //   });
  //   this.kabinler = filteredProducts;

  //   if (this.kabinler.length == 0) {
  //     const modalRef = this.NgbModal.open(NoResultModalComponents, {
  //       size: 'sm',
  //       backdrop: 'static',
  //     });
  //     modalRef.componentInstance.data = 'Birim Kartı';
  //     modalRef.result.then(async (event) => { });
  //   }
  //   else {
  //     const modalRef = this.NgbModal.open(KabinlerModalComponents, {
  //       size: 'lg',
  //       backdrop: 'static',
  //     });
  //     modalRef.componentInstance.confirmationBoxTitle = 'Kabin Listesi';
  //     modalRef.componentInstance.datas = this.kabinler;
  //     modalRef.result.then((item) => {
  //       if (item != false) {
  //         this.selectedURUN = item
  //         this.bilesenler = item?.urunBilesenler;
  //         this.iscilikGiderler = item?.iscilikGiderler;
  //         let totalMaas = 0;
  //         this.iscilikGiderler.forEach(element => {
  //           totalMaas += element.personel.maas;
  //         });

  //         if (this.iscilikGiderler.length != 0) {
  //           this.frm.ortalamaPersonelMaasi = totalMaas / this.iscilikGiderler.length;
  //           this.frm.personelSayisi = this.iscilikGiderler.length;
  //         }
  //         else {
  //           this.frm.ortalamaPersonelMaasi = 0;
  //           this.frm.personelSayisi = 0;
  //         }


  //         if (this.bilesenler.length > 0) {
  //           this.hesaplaButtonDisabled = false;
  //         }

  //       }
  //     });

  //   }







  // }










}


