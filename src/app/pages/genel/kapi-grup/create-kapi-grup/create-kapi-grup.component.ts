import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { KapiGrupService } from 'src/app/core/services/repository/kapi-grup.service';
import { PersonelSelectModalComponents } from 'src/shared/dialogs/personel-selected-modal';
import { StokSelectModalComponents } from 'src/shared/dialogs/stok-selected-modal';

@Component({
  selector: 'app-create-kapi-grup',
  templateUrl: './create-kapi-grup.component.html',
  styleUrls: ['./create-kapi-grup.component.scss']
})
export class CreateKapiGrupComponent implements OnInit {
  malzemeGiderler:any=[];
  selectedMalzemeGiderRow:any;
  malzemeGiderToplam:any;
  iscilikGiderler:any=[];
  selectedIscilikGiderRow:any;
  iscilikGiderToplam:any;

  constructor(
    private KapiGrupService: KapiGrupService,
    public activeModal: NgbActiveModal,
    private NgbModal:NgbModal

  ) {}

  ngOnInit(): void {}


  Kaydet() {


  var createModel={
    ad:this.frm.ad,
    tur:this.frm.tur.ad,
    kapiGenisligi:this.frm.kapiGenisligi.ad,
    urunBilesenler:this.malzemeGiderler,
    iscilikGiderler:this.iscilikGiderler
  }

    this.KapiGrupService.create(
      createModel,
     async () => {
        this.activeModal.close(true);
      },(errorMessage) => {}
    );
    
  }



  cikis() {
    this.activeModal.close(false);
  }



frm:any={
  ad:"",
  tur:{ ad: 'Kasa' },
  kapiGenisligi:{ ad: '70' },
}





selectedTur:any;
tur=[
  {ad: 'Kasa' },
  {ad: 'Panel' },
  {ad: 'Mekanizma' },
]
onTurChange(item: any): void {
  this.selectedTur=item;
};




selectedKapiGenisligi:any;
kapiGenisligi=[
  {ad: '70' },
  {ad: '80' },
  {ad: '90' },
  {ad: '100' },
  {ad: '110' },
  {ad: '120' },
]
onKapiGenisligiChange(item: any): void {
  this.selectedKapiGenisligi=item;
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

  isModalOpen = false;
  selectedImage: any = null;

  openModal(image: any) {
    this.selectedImage = image;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedImage = null;
  }

    

}

