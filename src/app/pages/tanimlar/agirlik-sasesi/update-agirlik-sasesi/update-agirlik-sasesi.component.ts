import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgirlikSasesiService } from 'src/app/core/services/repository/agirlik-sasesi.service';
import { IscilikGiderService } from 'src/app/core/services/repository/iscilik-gider.service';
import { KasnakService } from 'src/app/core/services/repository/kasnak.service';
import { UrunBilesenService } from 'src/app/core/services/repository/urun-bilesen.service';
import { PersonelSelectModalComponents } from 'src/shared/dialogs/personel-selected-modal';
import { StokSelectModalComponents } from 'src/shared/dialogs/stok-selected-modal';

@Component({
  selector: 'app-update-agirlik-sasesi',
  templateUrl: './update-agirlik-sasesi.component.html',
  styleUrls: ['./update-agirlik-sasesi.component.scss']
})
export class UpdateAgirlikSasesiComponent implements OnInit {
  @Input() data:any;
  malzemeGiderler:any=[];
  selectedMalzemeGiderRow:any;
  malzemeGiderToplam:any;
  iscilikGiderler:any=[];
  selectedIscilikGiderRow:any;
  iscilikGiderToplam:any;

  constructor(
    private AgirlikSasesiService: AgirlikSasesiService,
    public activeModal: NgbActiveModal,
    private NgbModal:NgbModal,
    private UrunBilesenService:UrunBilesenService,
    private IscilikGiderService:IscilikGiderService

  ) {}

  ngOnInit(): void {

    this.frm={

      ad:this.data.ad,
      birim:"ADET",
      kapasite:{ad: this.selectedKapasite?this.selectedKapasite:this.data.kapasite},
      askiTipi:{ad: this.selectedAskiTipi?this.selectedAskiTipi:this.data.askiTipi},
      karkasSekli:{ad: this.selectedKarkasSekli?this.selectedKarkasSekli:this.data.karkasSekli},
      rayArasi:this.data.rayArasi,
      urunBilesenler:this.malzemeGiderler,
      iscilikGiderler:this.iscilikGiderler
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
          AgirlikSasesiId: null,
          miktar:element.miktar?element.miktar:0,
          aciklama: element.aciklama,
    }
  
        this.malzemeGiderler.push(test)
      });
  }


  Kaydet() {

  var createModel={
    id:this.data.id,
    ad:this.frm.ad,
    birim:"ADET",
    kapasite:this.frm.kapasite.ad,
    askiTipi:this.frm.askiTipi.ad,
    karkasSekli:this.frm.karkasSekli.ad,
    rayArasi:String(this.frm.rayArasi),
    urunBilesenler:[],
    iscilikGiderler:[]
  }





  this.malzemeGiderler.forEach(element => {
    element.AgirlikSasesiId=this.data.id
  });



  var modelUrunBilesen={
    items: this.malzemeGiderler
   }

   this.iscilikGiderler.forEach(element => {
     element.personelId= element.personel.id,
     element.kabinId=null,
     element.butonId=null,
     element.kapiId= null,
     element.kasnakId= null,
     element.makineSasesiId= null,
     element.AgirlikSasesiId= this.data.id
   });

   var modelIscilikGider={
   items: this.iscilikGiderler
   }


   this.AgirlikSasesiService.update(
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



  frm: any = { };
 
 selectedKarkasTipi:any
   karkasTipi = [
     { ad: 'Kabin Karkası' },
     { ad: 'Ağırlık Karkası' },
 
   ];
   onKarkasTipiChange(karkas: any): void {
     this.selectedKarkasTipi = karkas;
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
            AgirlikSasesiId: null,
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
                AgirlikSasesiId: null
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
