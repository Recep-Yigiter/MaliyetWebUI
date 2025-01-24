import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IscilikGiderService } from 'src/app/core/services/repository/iscilik-gider.service';
import { KasnakService } from 'src/app/core/services/repository/kasnak.service';
import { UrunBilesenService } from 'src/app/core/services/repository/urun-bilesen.service';
import { PersonelSelectModalComponents } from 'src/shared/dialogs/personel-selected-modal';
import { StokSelectModalComponents } from 'src/shared/dialogs/stok-selected-modal';

@Component({
  selector: 'app-update-kasnak',
  templateUrl: './update-kasnak.component.html',
  styleUrls: ['./update-kasnak.component.scss']
})
export class UpdateKasnakComponent implements OnInit {
  @Input() data:any;
  malzemeGiderler:any=[];
  selectedMalzemeGiderRow:any;
  malzemeGiderToplam:any;
  iscilikGiderler:any=[];
  selectedIscilikGiderRow:any;
  iscilikGiderToplam:any;

  constructor(
    private KasnakService: KasnakService,
    public activeModal: NgbActiveModal,
    private NgbModal:NgbModal,
    private UrunBilesenService:UrunBilesenService,
    private IscilikGiderService:IscilikGiderService

  ) {}

  ngOnInit(): void {
  this.frm={
    

    ad:this.data.ad,
    birim:"ADET",
    kasnakTuru:{ad: this.selectedKasnakTuru?this.selectedKasnakTuru:this.data.kasnakTuru},
    kasnakCapi:{ad: this.selectedKasnakCapi?this.selectedKasnakCapi:this.data.kasnakCapi},
    kanalSayisi:{ad: this.selectedKanalSayisi?this.selectedKanalSayisi:this.data.kanalSayisi},
    halatCapi:{ad: this.selectedHalatCapi?this.selectedHalatCapi:this.data.halatCapi},
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
        suspansiyonId: null,
        miktar:element.miktar?element.miktar:0
  }

      this.malzemeGiderler.push(test)
    });
  }


  Kaydet() {
  var createModel={
    id:this.data.id,
    ad:this.frm.ad,
    birim:"ADET",
    kasnakTuru:this.frm.kasnakTuru.ad,
    kasnakCapi:this.frm.kasnakCapi.ad,
    kanalSayisi:this.frm.kanalSayisi.ad,
    halatCapi:this.frm.halatCapi.ad,
    urunBilesenler:[],
    iscilikGiderler:[]
  }
  this.malzemeGiderler.forEach(element => {
    element.kasnakId=this.data.id
  });



  var modelUrunBilesen={
    items: this.malzemeGiderler
   }

   this.iscilikGiderler.forEach(element => {
     element.personelId= element.personel.id,
     element.kabinId=null,
     element.butonId=null,
     element.kapiId= null,
     element.kasnakId= this.data.id,
     element.makineSasesiId= null,
     element.suspansiyonId= null
   });

   var modelIscilikGider={
   items: this.iscilikGiderler
   }



   this.KasnakService.update(
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




  frm:any={ }
  
  
  
  
  
  
  
  
  
  selectedKasnakCapi:any;
  kasnakCapi=[
    { ad: '240' },
    { ad: '320' },
    { ad: '400' },
  ]
  onKasnakCapiChange(item: any): void {
    this.selectedKasnakCapi=item;
  };
  
  
  selectedKanalSayisi:any;
  kanalSayisi=[
    {  ad: '4-5-6' },
    {  ad: '7-8' },
    {  ad: '9-10' },
    {  ad: '4' },
    {  ad: '5' },
    {  ad: '6' },
    {  ad: '7' },
    {  ad: '8' },
    {  ad: '9' },
  
  ]
  onKanalSayisiChange(item: any): void {
    this.selectedKanalSayisi=item;
  };
  
  
  
  selectedHalatCapi:any;
  halatCapi=[
    {  ad: '6.5' },
    {  ad: '8' },
  ]
  onHalatCapiChange(item: any): void {
    this.selectedHalatCapi=item;
  };
  
  
  
  
  
  
  selectedKasnakTuru:any;
  kasnakTuru = [
    { ad: 'Kabin Kasnağı' },
    { ad: 'Ağırlık Kasnağı' },
  ];
  
  onKasnakTuruChange(kapasite: any): void {
    this.selectedKasnakTuru=kapasite;
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
            miktar:element.miktar?element.miktar:0
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
                KasnakId:null,
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







    

}
