import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ButonService } from 'src/app/core/services/repository/buton.service';
import { IscilikGiderService } from 'src/app/core/services/repository/iscilik-gider.service';
import { KabinService } from 'src/app/core/services/repository/kabin.service';
import { UrunBilesenService } from 'src/app/core/services/repository/urun-bilesen.service';
import { ButonKartListModalComponents } from 'src/shared/dialogs/other-dialogs/buton-kart-list-modal';
import { PersonelSelectModalComponents } from 'src/shared/dialogs/personel-selected-modal';
import { StokSelectModalComponents } from 'src/shared/dialogs/stok-selected-modal';

@Component({
  selector: 'app-update-buton',
  templateUrl: './update-buton.component.html',
  styleUrls: ['./update-buton.component.scss']
})
export class UpdateButonComponent implements OnInit {
   @Input() data;

  malzemeGiderler:any=[];
  selectedMalzemeGiderRow:any;
  malzemeGiderToplam:any;
  iscilikGiderler:any=[];
  selectedIscilikGiderRow:any;
  iscilikGiderToplam:any;

  constructor(
    private ButonService: ButonService,
    public activeModal: NgbActiveModal,
    private NgbModal:NgbModal,
    private UrunBilesenService:UrunBilesenService,
    private IscilikGiderService:IscilikGiderService

  ) {}

 async ngOnInit() {
this.frm.ad=this.data.ad
  this.selectedButon.ad=this.data.model;
  this.selectedButon.kontrolPaneli=this.data.kontrolPaneli;
  this.selectedButon.ozellikler.sivaAltiUstu=this.data.sivaAltiUstu;
  this.selectedButon.ozellikler.kaplama=this.data.kaplama;
  this.selectedButon.ozellikler.butonTipi=this.data.butonTipi;
  this.selectedButon.ozellikler.ekran=this.data.ekran;
  this.selectedButon.ozellikler.sistem=this.data.sistem;



  this.iscilikGiderler=this.data.iscilikGiderler
  this.data.urunBilesenler.forEach(element => {
    var test={
      stokId: element.stok.id,
      ad:element.stok.ad,
      birim:element.stok.birim,
      butonId: null,
      kabinId:null,
      kasnakId: null,
      kapiGrupId:null,
      makineSasesiId: null,
      suspansiyonId: null,
      miktar:element.miktar?element.miktar:0,
      aciklama: element.aciklama,

}

    this.malzemeGiderler.push(test)
  });

    // this.malzemeGiderler=this.data.urunBilesenler
    // console.log(this.data.urunBilesenler);
  }


  Kaydet() {
    var createModel = {
      id:this.data.id,
      ad: this.frm.ad,
      birim: "ADET",
      model: this.selectedButon.ad,
      kontrolPaneli: this.selectedButon.kontrolPaneli,
      sivaAltiUstu: this.selectedButon.ozellikler.sivaAltiUstu,
      kaplama: this.selectedButon.ozellikler.kaplama,
      butonTipi: this.selectedButon.ozellikler.butonTipi,
      ekran: this.selectedButon.ozellikler.ekran,
      sistem: this.selectedButon.ozellikler.sistem,
      urunBilesenler:[],
      iscilikGiderler:[]
    }
      
      this.malzemeGiderler.forEach(element => {
        element.butonId=this.data.id
      });

      var modelUrunBilesen={
       items: this.malzemeGiderler
      }

      this.iscilikGiderler.forEach(element => {
        element.personelId= element.personel.id,
        element.kabinId=null,
        element.butonId=this.data.id,
        element.kapiId= null,
        element.kasnakId= null,
        element.makineSasesiId= null,
        element.suspansiyonId= null
      });

      var modelIscilikGider={
      items: this.iscilikGiderler
      }

      this.ButonService.update(
        createModel,
       async () => {

          this.UrunBilesenService.create(modelUrunBilesen,()=>{
            this.IscilikGiderService.create(modelIscilikGider,()=>{
              this.activeModal.close(true);
            });
          });


        },(errorMessage) => {}
      );



  }






  cikis() {
    this.activeModal.close(false);
  }




  frm:any={ ad:""}

















  stokEkle() {
    const modalRef = this.NgbModal.open(StokSelectModalComponents, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.confirmationBoxTitle = 'Stok Listesi';
    modalRef.result.then((stoks) => {
      if (stoks != false) {

        stoks.forEach(element => {
          var newValue={
            stokId: element.id,
            ad:element.ad,
            birim:element.birim,
            butonId: null,
            KapiGrupId:null,
            kasnakId: null,
            kapiGrupId:null,
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
            var newValue={
                id: "bb4913c6-3205-480d-9122-7b24d160c4db",
                isDeleted: false,
                olusturmaTarihi: "2002-12-12T00:00:00",
                personel:element,
                personelId: element.id,
                kabinId:null,
                butonId:null,
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

  deletePersonelItem(item: any): void {
    this.iscilikGiderler=  this.iscilikGiderler.filter(c=>c!==item);

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
