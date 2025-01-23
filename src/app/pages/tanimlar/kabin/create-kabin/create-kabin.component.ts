import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { KabinService } from 'src/app/core/services/repository/kabin.service';
import { PersonelSelectModalComponents } from 'src/shared/dialogs/personel-selected-modal';
import { StokSelectModalComponents } from 'src/shared/dialogs/stok-selected-modal';

@Component({
  selector: 'app-create-kabin',
  templateUrl: './create-kabin.component.html',
  styleUrls: ['./create-kabin.component.scss']
})
export class CreateKabinComponent implements OnInit {
  malzemeGiderler:any=[];
  selectedMalzemeGiderRow:any;
  malzemeGiderToplam:any;
  iscilikGiderler:any=[];
  selectedIscilikGiderRow:any;
  iscilikGiderToplam:any;

  constructor(
    private KabinService: KabinService,
    public activeModal: NgbActiveModal,
    private NgbModal:NgbModal

  ) {}

  ngOnInit(): void {}


  Kaydet() {


  var createModel={
    ad:this.frm.ad,
    birim:this.frm.birim.ad,
    tur:this.frm.tur.ad,
    model:this.frm.model.ad,
    kabinKaplama:this.frm.kabinKaplama.ad,
    zeminKaplama:this.frm.zeminKaplama.ad,
    aksesuarKaplama:this.frm.aksesuarKaplama.ad,
    kapasite:this.frm.kapasite.deger,
    urunBilesenler:this.malzemeGiderler,
    iscilikGiderler:this.iscilikGiderler
  }




    this.KabinService.create(
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
    birim:{ id: 1, ad: 'ADET' },
    tur:  { id: 1, ad: 'Normal Kabin' },
    model:  { id: 1, ad: 'ESB' },
    zeminKaplama:  { id: 1, ad: 'PVC' },
    kabinKaplama:   { id: 1, ad: 'ESB' },
    aksesuarKaplama:   { id: 1, ad: 'ESB' },
    kapasite:{ id: 1, deger: '320' }
  }
  
  
  
  
  selectedTur:any;
  turler=[
    { id: 1, ad: 'Normal Kabin' },
  ]
  onTurChange(item: any): void {
    this.selectedTur=item;
  };
  
  
  selectedModel:any;
  modeller=[
    { id: 1, ad: 'ESB' },
  ]
  onModelChange(item: any): void {
    this.selectedModel=item;
  };
  
  
  
  selectedZeminKaplama:any;
  zeminKaplamalar=[
    { id: 1, ad: 'PVC' },
  ]
  onZeminKaplamaChange(item: any): void {
    this.selectedZeminKaplama=item;
  };
  
  
  selectedKabinKaplama:any;
  kabinKaplamalar=[
    { id: 1, ad: 'ESB' },
  ]
  onKabinKaplamaChange(item: any): void {
    this.selectedKabinKaplama=item;
  };
  
  selectedAksesuarKaplama:any;
  aksesuarKaplamalar=[
    { id: 1, ad: 'ESB' },
  ]
  onAksesuarKaplamaChange(item: any): void {
    this.selectedAksesuarKaplama=item;
  };
  
  
  selectedKapasite:any;
  kapasiteler = [
    { id: 1, deger: '320' },
    { id: 2, deger: '400' },
    { id: 3, deger: '480' },
    { id: 4, deger: '630' },
    { id: 5, deger: '800' },
    { id: 6, deger: '1000' },
    { id: 7, deger: '1250' },
    { id: 8, deger: '1600' },
  ];
  onKapasiteChange(kapasite: any): void {
    this.selectedKapasite=kapasite;
  };
  
  
  selectedBirim:any;
  birimler = [
    { id: 1, ad: 'ADET' },
    { id: 2, ad: 'KG' },
    { id: 3, ad: 'M' },
    { id: 4, ad: 'M^2' },
    { id: 5, ad: 'TAKIM' },
  
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


  deletePersonelItem(index: number): void {

    this.iscilikGiderler=  this.iscilikGiderler.filter(c=>c!==index);
    
  }







    

}
