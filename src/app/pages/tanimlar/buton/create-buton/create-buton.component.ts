import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ButonService } from 'src/app/core/services/repository/buton.service';
import { PersonelSelectModalComponents } from 'src/shared/dialogs/personel-selected-modal';
import { StokSelectModalComponents } from 'src/shared/dialogs/stok-selected-modal';

@Component({
  selector: 'app-create-buton',
  templateUrl: './create-buton.component.html',
  styleUrls: ['./create-buton.component.scss']
})
export class CreateButonComponent implements OnInit {
  malzemeGiderler:any=[];
  selectedMalzemeGiderRow:any;
  malzemeGiderToplam:any;
  iscilikGiderler:any=[];
  selectedIscilikGiderRow:any;
  iscilikGiderToplam:any;

  constructor(
    private ButonService: ButonService,
    public activeModal: NgbActiveModal,
    private NgbModal:NgbModal

  ) {}

  ngOnInit(): void {}


  Kaydet() {
    // "ad": "string",
    // "birim": "string",
    // "butonTipi": "string",
    // "durakSayisi": "string",
    // "butonCesidi": "string",
    // "butonOzellik": "string",

  var createModel={
    ad:this.frm.ad,
    birim:"ADET",
    butonTipi:this.frm.butonTipi.ad,
    durakSayisi:this.frm.durakSayisi.ad,
    butonCesidi:this.frm.butonCesidi.ad,
    butonOzellik:this.frm.boyOzellik.ad,
    urunBilesenler:this.malzemeGiderler,
    iscilikGiderler:this.iscilikGiderler
  }





    this.ButonService.create(
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
    butonTipi: { id: 1, ad: 'Kabin Butonu' },
    durakSayisi:{ id: 1, ad: '2' },
    butonCesidi:{ id: 1, ad: 'Cam' },
    boyOzellik: { id: 1, ad: 'Tam Boy' },
  }
  
  
  
  
  
  
  
  
  
  selectedButonTipi:any;
  butonTipi=[
    { id: 1, ad: 'Kabin Butonu' },
    { id: 2, ad: 'Kat Butonu' },
  ]
  onButonTipiChange(item: any): void {
    this.selectedButonTipi=item;
  };
  
  
  selectedDurakSayisi:any;
  durakSayisi=[
    { id: 1, ad: '2' },
    { id: 2, ad: '3' },
    { id: 3, ad: '4' },
    { id: 4, ad: '5' },
    { id: 5, ad: '6' },
    { id: 6, ad: '7' },
    { id: 7, ad: '8' },
    { id: 8, ad: '9' },
    { id: 9, ad: '10' },
    { id: 10, ad: '11' },
    { id: 11, ad: '12' },
    { id: 12, ad: '13' },
    { id: 13, ad: '14' },
  ]
  onDurakSayisiChange(item: any): void {
    this.selectedDurakSayisi=item;
  };
  
  
  
  selectedButonCesidi:any;
  butonCesidi=[
    { id: 1, ad: 'Cam' },
    { id: 2, ad: 'Mekanik' },
  ]
  onButonCesidiChange(item: any): void {
    this.selectedButonCesidi=item;
  };
  
  
  
  
  
  selectedBoyOzellik:any;
  boyOzellik=[
    { id: 1, ad: 'Tam Boy' },
    { id: 2, ad: 'Yarım Boy' },
  ]
  onBoyOzellikChange(item: any): void {
    this.selectedBoyOzellik=item;
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


  deletePersonelItem(index: number): void {

    this.iscilikGiderler=  this.iscilikGiderler.filter(c=>c!==index);
    
  }







    

}
