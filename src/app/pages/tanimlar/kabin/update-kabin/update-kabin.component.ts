import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IscilikGiderService } from 'src/app/core/services/repository/iscilik-gider.service';
import { KabinService } from 'src/app/core/services/repository/kabin.service';
import { UrunBilesenService } from 'src/app/core/services/repository/urun-bilesen.service';
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

  constructor(
    private KabinService: KabinService,
    public activeModal: NgbActiveModal,
    private NgbModal:NgbModal,
    private UrunBilesenService:UrunBilesenService,
    private IscilikGiderService:IscilikGiderService

  ) {}

 async ngOnInit() {

  // var test=  await this.KabinService.getById(this.data.id)

    this.frm={
      ad:this.data.ad,
      birim:{ad: this.selectedBirim?this.selectedBirim:this.data.birim},
      tur:{ad: this.selectedTur?this.selectedTur:this.data.tur},
      model:{ad: this.selectedModel?this.selectedModel:this.data.model},
      zeminKaplama:{ad:this.selectedZeminKaplama?this.selectedZeminKaplama: this.data.zeminKaplama},
      kabinKaplama:{ad:this.selectedKabinKaplama?this.selectedKabinKaplama: this.data.kabinKaplama },
      aksesuarKaplama:{ad:this.selectedAksesuarKaplama?this.selectedAksesuarKaplama: this.data.aksesuarKaplama },
      kapasite:{deger:this.selectedKapasite?this.selectedKapasite: this.data.kapasite}
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
    ad:this.frm.ad,
    birim:this.frm.birim.ad,
    tur:this.frm.tur.ad,
    model:this.frm.model.ad,
    kabinKaplama:this.frm.kabinKaplama.ad,
    zeminKaplama:this.frm.zeminKaplama.ad,
    aksesuarKaplama:this.frm.aksesuarKaplama.ad,
    kapasite:this.frm.kapasite.deger,
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




  frm:any={ }
  
  
  
  
  selectedTur:any;
  turler=[
    { ad: 'Normal Kabin' },
  ]
  onTurChange(item: any): void {
    this.selectedTur=item;
  };
  
  
  selectedModel:any;
  modeller=[
    { ad: 'ESB' },
  ]
  onModelChange(item: any): void {
    this.selectedModel=item;
  };
  
  
  
  selectedZeminKaplama:any;
  zeminKaplamalar=[
    { ad: 'PVC' },
  ]
  onZeminKaplamaChange(item: any): void {
    this.selectedZeminKaplama=item;
  };
  
  
  selectedKabinKaplama:any;
  kabinKaplamalar=[
    { ad: 'ESB' },
  ]
  onKabinKaplamaChange(item: any): void {
    this.selectedKabinKaplama=item;
  };
  
  selectedAksesuarKaplama:any;
  aksesuarKaplamalar=[
    { ad: 'ESB' },
  ]
  onAksesuarKaplamaChange(item: any): void {
    this.selectedAksesuarKaplama=item;
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
  
  
  selectedBirim:any;
  birimler = [
    { ad: 'ADET' },
    { ad: 'KG' },
    { ad: 'M' },
    { ad: 'M^2' },
    { ad: 'TAKIM' },
  
  ];
  onBirimChange(item){
    this.selectedBirim=item;
  }
    











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
