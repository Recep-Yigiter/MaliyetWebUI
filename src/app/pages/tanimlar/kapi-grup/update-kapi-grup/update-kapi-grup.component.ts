import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IscilikGiderService } from 'src/app/core/services/repository/iscilik-gider.service';
import { KapiGrupService } from 'src/app/core/services/repository/kapi-grup.service';
import { UrunBilesenService } from 'src/app/core/services/repository/urun-bilesen.service';
import { PersonelSelectModalComponents } from 'src/shared/dialogs/personel-selected-modal';
import { StokSelectModalComponents } from 'src/shared/dialogs/stok-selected-modal';

@Component({
  selector: 'app-update-kapi-grup',
  templateUrl: './update-kapi-grup.component.html',
  styleUrls: ['./update-kapi-grup.component.scss']
})
export class UpdateKapiGrupComponent implements OnInit {
  @Input() data:any;
  malzemeGiderler:any=[];
  selectedMalzemeGiderRow:any;
  malzemeGiderToplam:any;
  iscilikGiderler:any=[];
  selectedIscilikGiderRow:any;
  iscilikGiderToplam:any;

  constructor(
    private KapiGrupService: KapiGrupService,
    public activeModal: NgbActiveModal,
    private NgbModal:NgbModal,
    private UrunBilesenService:UrunBilesenService,
    private IscilikGiderService:IscilikGiderService

  ) {}

  ngOnInit(): void {

    this.frm={
      ad:this.data.ad,
      tur: {ad: this.selectedTur?this.selectedTur:this.data.tur},
      
    }
  
  
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
  }


  Kaydet() {


    
    var createModel={
      id:this.data.id,
      kapiId:this.data.kapiId?this.data.kapiId:null,
      ad:this.frm.ad,
      tur:this.frm.tur.ad,
      urunBilesenler:[],
      iscilikGiderler:[]
   }

   this.malzemeGiderler.forEach(element => {
     element.kapiGrupId=this.data.id
   });

   var modelUrunBilesen={
    items: this.malzemeGiderler
   }

   this.iscilikGiderler.forEach(element => {
     element.personelId= element.personel.id,
     element.kabinId=null,
     element.butonId=null,
     element.kapiGrupId= this.data.id,
     element.kasnakId= null,
     element.makineSasesiId= null,
     element.suspansiyonId= null
   });

   var modelIscilikGider={
   items: this.iscilikGiderler
   }


   this.KapiGrupService.update(
     createModel,
    async () => {

       this.UrunBilesenService.create(modelUrunBilesen,()=>{
         this.IscilikGiderService.create(modelIscilikGider,()=>{
           this.activeModal.close(true);
         });
       });


     },(errorMessage) => {}
   );











  // var createModel={
  //   ad:this.frm.ad,
  //   tur:this.frm.tur.ad,
  //   urunBilesenler:this.malzemeGiderler,
  //   iscilikGiderler:this.iscilikGiderler
  // }

  //   this.KapiGrupService.create(
  //     createModel,
  //    async () => {
  //       this.activeModal.close(true);
  //     },(errorMessage) => {}
  //   );
    
  }



  cikis() {
    this.activeModal.close(false);
  }



frm:any={
  ad:"",
  tur:{ ad: 'Kasa' },
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
      
        // if (customerExists) {
        //   alert(`Bu ${element.ad} zaten mevcut! `);
        //   return;
        // }
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

