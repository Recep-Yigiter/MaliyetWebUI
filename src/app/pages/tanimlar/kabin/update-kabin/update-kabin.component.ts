import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IscilikGiderService } from 'src/app/core/services/repository/iscilik-gider.service';
import { KabinService } from 'src/app/core/services/repository/kabin.service';
import { UrunBilesenService } from 'src/app/core/services/repository/urun-bilesen.service';
import { KABIN_MODELLER } from 'src/assets/DATA/kabin-modeller';
import { PersonelSelectModalComponents } from 'src/shared/dialogs/personel-selected-modal';
import { StokSelectModalComponents } from 'src/shared/dialogs/stok-selected-modal';

@Component({
  selector: 'app-update-kabin',
  templateUrl: './update-kabin.component.html',
  styleUrls: ['./update-kabin.component.scss']
})
export class UpdateKabinComponent implements OnInit {
   @Input() data;
  
  malzemeGiderler:any=[];
  selectedMalzemeGiderRow:any;
  malzemeGiderToplam:any;
  iscilikGiderler:any=[];
  selectedIscilikGiderRow:any;
  iscilikGiderToplam:any;
  modeller: any = KABIN_MODELLER;
  constructor(
    private KabinService: KabinService,
    public activeModal: NgbActiveModal,
    private NgbModal:NgbModal,
    private UrunBilesenService:UrunBilesenService,
    private IscilikGiderService:IscilikGiderService

  ) {}

 async ngOnInit() {

var model=this.modeller.filter(c=>c.ad==this.data.model)[0]
    this.frm={
      ad:this.data.ad,
      kapasite:{deger:this.selectedKapasite?this.selectedKapasite: this.data.kapasite},
      model:model,
      kabinDuvar: model.ozellikler.kabinDuvar,
      girisDuvar:  model.ozellikler.girisDuvar,
      arkaDuvar:  model.ozellikler.arkaDuvar,
      taban:  model.ozellikler.taban,
      aydinlatma:  model.ozellikler.aydinlatma,
      tavan:  model.ozellikler.tavan,
      kupeste:  model.ozellikler.kupeste,
      supurgelik:  model.ozellikler.supurgelik,
      opsiyonel:  model.ozellikler.opsiyonel,
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


    // this.malzemeGiderler=this.data.urunBilesenler
    // console.log(this.data.urunBilesenler);
  }


  Kaydet() {
      var createModel={
    id:this.data.id,
    // ad:this.frm.ad,
    // birim:this.frm.birim.ad,
    // tur:this.frm.tur.ad,
    // model:this.frm.model.ad,
    // kabinKaplama:this.frm.kabinKaplama.ad,
    // zeminKaplama:this.frm.zeminKaplama.ad,
    // aksesuarKaplama:this.frm.aksesuarKaplama.ad,
    // kapasite:this.frm.kapasite.deger,,
    ad: this.frm.ad,
    kapasite:this.frm.kapasite.deger,
    model:this.frm.model.ad,
    kabinDuvar: this.frm.model.ozellikler.kabinDuvar,
    girisDuvar:  this.frm.model.ozellikler.girisDuvar,
    arkaDuvar:  this.frm.model.ozellikler.arkaDuvar,
    taban:  this.frm.model.ozellikler.taban,
    aydinlatma:  this.frm.model.ozellikler.aydinlatma,
    tavan:  this.frm.model.ozellikler.tavan,
    kupeste:  this.frm.model.ozellikler.kupeste,
    supurgelik:  this.frm.model.ozellikler.supurgelik,
    opsiyonel:  this.frm.model.ozellikler.opsiyonel,


    urunBilesenler:[],
    iscilikGiderler:[]
      }

      this.malzemeGiderler.forEach(element => {
        element.kabinId=this.data.id
      });

      var modelUrunBilesen={
       items: this.malzemeGiderler
      }

      this.iscilikGiderler.forEach(element => {
        element.personelId= element.personel.id,
        element.kabinId=this.data.id,
        element.butonId=null,
        element.kapiId= null,
        element.kasnakId= null,
        element.makineSasesiId= null,
        element.suspansiyonId= null
      });
      
      var modelIscilikGider={
      items: this.iscilikGiderler
      }


      this.KabinService.update(
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





  frm: any = {

  }
  
  
  

  
  
  selectedModel:any;
  // modeller=[
  //   { ad: 'ESB' },
  // ]
  onModelChange(item: any): void {
    this.selectedModel=item;
  };
  
 
  
  
  selectedKapasite:any;
  kapasiteler = [
    { deger: '320' },
    { deger: '400' },
    { deger: '480' },
    { deger: '630' },
    { deger: '800' },
    { deger: '1000' },
    { deger: '1250' },
    { deger: '1600' },
  ];
  onKapasiteChange(kapasite: any): void {
    this.selectedKapasite=kapasite;
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




    

}
