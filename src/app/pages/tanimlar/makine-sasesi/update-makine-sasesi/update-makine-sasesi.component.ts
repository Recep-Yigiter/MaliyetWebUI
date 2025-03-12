import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IscilikGiderService } from 'src/app/core/services/repository/iscilik-gider.service';
import { KasnakService } from 'src/app/core/services/repository/kasnak.service';
import { MakineSasesiService } from 'src/app/core/services/repository/makine-sasesi.service';
import { UrunBilesenService } from 'src/app/core/services/repository/urun-bilesen.service';
import { PersonelSelectModalComponents } from 'src/shared/dialogs/personel-selected-modal';
import { StokSelectModalComponents } from 'src/shared/dialogs/stok-selected-modal';

@Component({
  selector: 'app-update-makine-sasesi',
  templateUrl: './update-makine-sasesi.component.html',
  styleUrls: ['./update-makine-sasesi.component.scss']
})
export class UpdateMakineSasesiComponent implements OnInit {
  @Input() data: any;
  malzemeGiderler: any = [];
  selectedMalzemeGiderRow: any;
  malzemeGiderToplam: any;
  iscilikGiderler: any = [];
  selectedIscilikGiderRow: any;
  iscilikGiderToplam: any;

  constructor(
    private MakineSasesiService: MakineSasesiService,
    public activeModal: NgbActiveModal,
    private NgbModal: NgbModal,
    private UrunBilesenService: UrunBilesenService,
    private IscilikGiderService: IscilikGiderService

  ) { }

  ngOnInit(): void {
    this.frm = {
      ad: this.data.ad,
      birim: "ADET",
      saseTipi: { ad: this.selectedSaseTipi ? this.selectedSaseTipi : this.data.saseTipi },
      kapasite: { ad: this.selectedKapasite ? this.selectedKapasite : this.data.kapasite },
      urunBilesenler: this.malzemeGiderler,
      iscilikGiderler: this.iscilikGiderler
    }
    this.iscilikGiderler = this.data.iscilikGiderler
    this.data.urunBilesenler.forEach(element => {
      var test = {
        stokId: element.stok.id,
        ad: element.stok.ad,
        birim: element.stok.birim,
        butonId: null,
        kabinId: null,
        kasnakId: null,
        kapiGrupId: null,
        makineSasesiId: null,
        suspansiyonId: null,
        miktar:element.miktar?element.miktar:0,
        aciklama: element.aciklama,
      }
      this.malzemeGiderler.push(test)
    });
  }
  
  
  
  Kaydet() {

    var createModel = {
      id: this.data.id,
      ad: this.frm.ad,
      birim: "ADET",
      saseTipi: this.frm.saseTipi.ad,
      kapasite: this.frm.kapasite.ad,
      urunBilesenler: [],
      iscilikGiderler: []
    }

    this.malzemeGiderler.forEach(element => {
      element.makineSasesiId = this.data.id
    });



    var modelUrunBilesen = {
      items: this.malzemeGiderler
    }

    this.iscilikGiderler.forEach(element => {
      element.personelId = element.personel.id,
        element.kabinId = null,
        element.butonId = null,
        element.kapiId = null,
        element.kasnakId = null,
        element.makineSasesiId = this.data.id,
        element.suspansiyonId = null
    });

    var modelIscilikGider = {
      items: this.iscilikGiderler
    }


    this.MakineSasesiService.update(
      createModel,
      async () => {

        this.UrunBilesenService.create(modelUrunBilesen, () => {
          this.IscilikGiderService.create(modelIscilikGider, () => {
            this.activeModal.close(true);
          });
        });


      }, (errorMessage) => { }
    );








  }



  cikis() {
    this.activeModal.close(false);
  }






  frm: any = {
    ad: "",
    saseTipi: { ad: 'Ağırlık Arkada Duvardan Şase' },
    kapasite: { ad: '320' },
  };


  saseTipi: any = [
    { ad: 'Ağırlık Arkada Duvardan Şase' },
    { ad: 'MRL Duvardan' },
    { ad: "MRL Ray'a bağlı" },
    { ad: "MR Dişlili" },
    { ad: "MR Dişlisiz" },
  ]
  kapasite: any = [
    { ad: "320" },
    { ad: "450" },
    { ad: "630" },
    { ad: "800" },
    { ad: "1000" },
    { ad: "1600" },
    { ad: "2000" },
    { ad: "3000" },

  ]
  selectedSaseTipi: any
  onSaseTipiChange(item: any): void {
    this.selectedSaseTipi = item;
  };

  selectedKapasite: any;
  onKapasiteChange(item: any): void {
    this.selectedKapasite = item;
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
            kasnakId: null,
            kabinId: null,
            kapiGrupId: null,
            makineSasesiId: null,
            suspansiyonId: null,
            miktar: element.miktar ? element.miktar : 0
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









}
