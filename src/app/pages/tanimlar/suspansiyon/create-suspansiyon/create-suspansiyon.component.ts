import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { KasnakService } from 'src/app/core/services/repository/kasnak.service';
import { SuspansiyonService } from 'src/app/core/services/repository/suspansiyon.service';
import { PersonelSelectModalComponents } from 'src/shared/dialogs/personel-selected-modal';
import { StokSelectModalComponents } from 'src/shared/dialogs/stok-selected-modal';

@Component({
  selector: 'app-create-suspansiyon',
  templateUrl: './create-suspansiyon.component.html',
  styleUrls: ['./create-suspansiyon.component.scss']
})
export class CreateSuspansiyonComponent implements OnInit {
  malzemeGiderler:any=[];
  selectedMalzemeGiderRow:any;
  malzemeGiderToplam:any;
  iscilikGiderler:any=[];
  selectedIscilikGiderRow:any;
  iscilikGiderToplam:any;

  constructor(
    private SuspansiyonService: SuspansiyonService,
    public activeModal: NgbActiveModal,
    private NgbModal:NgbModal

  ) {}

  ngOnInit(): void {}


  Kaydet() {
    // "ad": "string",
    // "birim": "string",
    // "karkasTipi": "string",
    // "kapasite": "string",
    // "askiTipi": "string",
    // "karkasSekli": "string",

  var createModel={
    ad:this.frm.ad,
    birim:"ADET",
    kapasite:this.frm.kapasite.ad,
    askiTipi:this.frm.askiTipi.ad,
    // karkasSekli:this.frm.karkasSekli.ad,
    rayArasi:this.frm.rayArasi.ad,
    urunBilesenler:this.malzemeGiderler,
    iscilikGiderler:this.iscilikGiderler
  }



    this.SuspansiyonService.create(
      createModel,
     async () => {
        this.activeModal.close(true);
      },(errorMessage) => {}
    );
    
  }



  cikis() {
    this.activeModal.close(false);
  }



  frm: any = { 
   karkasTipi:{ ad: 'Kabin Karkası' },
   askiTipi:{ ad: '2/1' },
   karkasSekli:{ ad: 'Tek Sıra Ağırlık' },
   kapasite:{ ad: '800' },
   rayArasi:{ ad: '0-105cm' },
 };
 
 selectedKarkasTipi:any
   karkasTipi = [
     { ad: 'Kabin Karkası' },
     { ad: 'Ağırlık Karkası' },
 
   ];
   onKarkasTipiChange(karkas: any): void {
     this.selectedKarkasTipi = karkas;
   };


   selectedRayArasi:any
   rayArasi = [
     { ad: '0-105cm' },
     { ad: '105-240cm' },
     { ad: '240cm - ∞' },

 
   ];
   onRayArasiChange(rayArasi: any): void {
     this.selectedRayArasi = rayArasi;
   };
 
 
   selectedAskiTipi:any
   askiTipi=[
     { ad: '2/1' },
     { ad: '1/1' },
   ]
   onAskiTipiChange(askiTipi): void {
     this.selectedAskiTipi = askiTipi;
   };
 
 
   selectedKarkasSekli:any
   karkasSekli =  [
     { ad: 'Tek Sıra Ağırlık' },
     { ad: 'Çift Sıra Ağırlık' },
     { ad: 'Tek Sıra Dublex Ağırlık' },
     { ad: 'Çift Sıra Dublex Ağırlık ' },
     ]
 
   onKarkasSekliChange(id): void {
     this.selectedKarkasSekli = id;
   };
 
 
 
   selectedKapasite:any
   kapasite=  [
     { ad: '800' },
     { ad: '1100' },
 
     ]
 
   onKapasiteChange(id): void {
     this.selectedKapasite = id;
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
          var newValue={

            stokId: element.id,
            ad:element.ad,
            birim:element.birim,
            butonId: null,
            kasnakId: null,
            kabinId:null,
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


  deletePersonelItem(index: number): void {

    this.iscilikGiderler=  this.iscilikGiderler.filter(c=>c!==index);
    
  }








  selectedTab: string = 'malzeme-giderleri';  // Varsayılan olarak "kabin" sekmesi seçili

  selectTab(tab: any) {

    var local = localStorage.setItem('tanimlar', JSON.stringify(tab))
    this.selectedTab = tab.tabItem;
    console.log(this.selectedTab);
  }
  menu = [
    {
      label: 'Kartlar',
      expanded: false,
      icon: '',
      href: '',
      submenu: [
        {
          label: 'Malzeme Giderleri',
          tabItem: 'malzeme-giderleri',
          icon: 'fa fa-inbox',
          submenu: [],

          expanded: false,
        },
        {
          label: 'İşçilik Giderleri',
          tabItem: 'iscilik-giderleri',
          icon: 'fa fa-inbox',
          submenu: [],

          expanded: false,
        },







      ],
    },


  ];
    

}
