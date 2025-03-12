import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ButonService } from 'src/app/core/services/repository/buton.service';
import { BUTON_MODELLER } from 'src/assets/DATA/buton-modeller';
import { ButonKartListModalComponents } from 'src/shared/dialogs/other-dialogs/buton-kart-list-modal';
import { PersonelSelectModalComponents } from 'src/shared/dialogs/personel-selected-modal';
import { StokSelectModalComponents } from 'src/shared/dialogs/stok-selected-modal';

@Component({
  selector: 'app-create-buton',
  templateUrl: './create-buton.component.html',
  styleUrls: ['./create-buton.component.scss']
})
export class CreateButonComponent implements OnInit {
  malzemeGiderler: any = [];
  selectedMalzemeGiderRow: any;
  malzemeGiderToplam: any;
  iscilikGiderler: any = [];
  selectedIscilikGiderRow: any;
  iscilikGiderToplam: any;
  models = BUTON_MODELLER
  constructor(
    private ButonService: ButonService,
    public activeModal: NgbActiveModal,
    private NgbModal: NgbModal

  ) { }

  ngOnInit(): void {
    const users = [
      { id: 1, name: 'John', age: 25 },
      { id: 2, name: 'Jane', age: 30 },
      { id: 3, name: 'Mike', age: 22 }
    ];
  
  }


  Kaydet() {


    var createModel = {
      ad: this.frm.ad,
      birim: "ADET",
      model: this.selectedButon.ad,
      kontrolPaneli: this.selectedButon.kontrolPaneli,
      sivaAltiUstu: this.selectedButon.ozellikler.sivaAltiUstu,
      kaplama: this.selectedButon.ozellikler.kaplama,
      butonTipi: this.selectedButon.ozellikler.butonTipi,
      ekran: this.selectedButon.ozellikler.ekran,
      sistem: this.selectedButon.ozellikler.sistem,
      urunBilesenler: this.malzemeGiderler,
      iscilikGiderler: this.iscilikGiderler
    }


    this.ButonService.create(
      createModel,
      async () => {
        this.activeModal.close(true);
      }, (errorMessage) => { }
    );

  }



  cikis() {
    this.activeModal.close(false);
  }




  // frm: any = {
  //   butonTipi: { id: 1, ad: 'Kabin Butonu' },
  //   durakSayisi: { id: 1, ad: '2' },
  //   butonCesidi: { id: 1, ad: 'Cam' },
  //   boyOzellik: { id: 1, ad: 'Tam Boy' },
  // }


  frm: any = {
    ad: "",
    model: {
      ad: "YLP 01",
      img: '../../../../../assets/img/buton-models/YLP-01.PNG',
      kontrolPaneli: "Kat Kontrol Paneli",
      ozellikler:
      {
        sivaAltiUstu: "Sıva Üstü Kat Butonu",
        kaplama: "Paslanmaz Çelik Kaplama",
        butonTipi: "Mekanik Tekli Buton",
        ekran: "Dot Matrix Ekran",
        sistem: "Simplex Sistem",
      }
    },
    kontrolPaneli: '',
    sivaAltiUstu: "",
    kaplama: "",
    butonTipi: "",
    ekran: "",
    sistem: "",
  }




  selectedModel: any;

  onModelChange(item: any): void {
    this.selectedModel = item;
  };

  selectedKontrolPaneli: any;
  kontrolPaneli = [
    { ad: 'Kat Kontrol Paneli ' },
    { ad: 'Kabin Kontrol Paneli' },
    { ad: 'Yatay Kabin Kontrol Paneli' },
  ]
  onKontrolPaneliChange(item: any): void {
    this.selectedKontrolPaneli = item;
  };





  selectedButonTipi: any;
  butonTipi = [
    { id: 1, ad: 'Kabin Butonu' },
    { id: 2, ad: 'Kat Butonu' },
  ]
  onButonTipiChange(item: any): void {
    this.selectedButonTipi = item;
  };


  selectedDurakSayisi: any;
  durakSayisi = [
    { id: 1, ad: '2' },
    { id: 2, ad: '3' },
    { id: 3, ad: '4' },
    { id: 4, ad: '5' },
    { id: 5, ad: '6' },
    { id: 6, ad: '7' },
    { id: 7, ad: '8' },
    { id: 8, ad: '9' },
    { id: 9, ad: '10' },
    { id: 10, ad: '11' },
    { id: 11, ad: '12' },
    { id: 12, ad: '13' },
    { id: 13, ad: '14' },
  ]
  onDurakSayisiChange(item: any): void {
    this.selectedDurakSayisi = item;
  };



  selectedButonCesidi: any;
  butonCesidi = [
    { id: 1, ad: 'Cam' },
    { id: 2, ad: 'Mekanik' },
  ]
  onButonCesidiChange(item: any): void {
    this.selectedButonCesidi = item;
  };





  selectedBoyOzellik: any;
  boyOzellik = [
    { id: 1, ad: 'Tam Boy' },
    { id: 2, ad: 'Yarım Boy' },
  ]
  onBoyOzellikChange(item: any): void {
    this.selectedBoyOzellik = item;
  };





  stokEkle() {
    const modalRef = this.NgbModal.open(StokSelectModalComponents, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.confirmationBoxTitle = 'Stok Listesi';
    modalRef.result.then((stoks) => {
      if (stoks != false) {

        stoks.forEach(element => {
          var newValue = {

            stokId: element.id,
            ad: element.ad,
            birim: element.birim,
            butonId: null,
            KapiGrupId: null,
            kasnakId: null,
            kapiGrupId: null,
            makineSasesiId: null,
            suspansiyonId: null,
            miktar:element.miktar?element.miktar:0,
            aciklama: element.aciklama,
          }
          const customerExists = this.malzemeGiderler.some(customer => customer.stokId === newValue.stokId);

          if (customerExists) {
            alert(`Bu ${element.ad} zaten mevcut! `);
            return;
          }
          this.malzemeGiderler = [...this.malzemeGiderler, newValue];


        });



      }
    });
  }
  personelEkle() {
    const modalRef = this.NgbModal.open(PersonelSelectModalComponents, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.confirmationBoxTitle = 'Personel Listesi';
    modalRef.result.then((personels) => {
      if (personels != false) {


        personels.forEach(element => {
          var newValue = {
            id: "bb4913c6-3205-480d-9122-7b24d160c4db",
            isDeleted: false,
            olusturmaTarihi: "2002-12-12T00:00:00",
            personel: element,
            personelId: element.id,
            kabinId: null,
            butonId: null,
            kapiId: null,
            kasnakId: null,
            makineSasesiId: null,
            suspansiyonId: null
          }
          const customerExists = this.iscilikGiderler.some(customer => customer.personel.id === newValue.personel.id);

          if (customerExists) {
            alert(`Bu ${element.ad} zaten mevcut! `);
            return;
          }
          this.iscilikGiderler = [...this.iscilikGiderler, newValue];
        });


      }
    });
  }



  deleteStokItem(index: number): void {
    this.malzemeGiderler.splice(index, 1);

  }


  deletePersonelItem(index: number): void {

    this.iscilikGiderler = this.iscilikGiderler.filter(c => c !== index);

  }



  selectedButon: any = {
    ad: "YLP 01",
    img: '../../../../../assets/img/buton-models/.PNG',
    kontrolPaneli: "Kat Kontrol Paneli",
    ozellikler:
    {
      sivaAltiUstu: "Sıva Üstü Kat Butonu",
      kaplama: "Paslanmaz Çelik Kaplama",
      butonTipi: "Mekanik Tekli Buton",
      ekran: "Dot Matrix Ekran",
      sistem: "Simplex Sistem",
    }
  };
  selectDialogOpen() {
    const modalRef = this.NgbModal.open(ButonKartListModalComponents, {
      size: 'lg',
      backdrop: 'static',
      windowClass:"custom-modal"
    });
    modalRef.componentInstance.confirmationBoxTitle = 'Buton Listesi';
    modalRef.result.then((item) => {
      if (item != false) {

        this.selectedButon = item




      }
    });
  }







}
