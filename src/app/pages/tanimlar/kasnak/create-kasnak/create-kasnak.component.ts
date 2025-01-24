import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { KasnakService } from 'src/app/core/services/repository/kasnak.service';
import { PersonelSelectModalComponents } from 'src/shared/dialogs/personel-selected-modal';
import { StokSelectModalComponents } from 'src/shared/dialogs/stok-selected-modal';

@Component({
  selector: 'app-create-kasnak',
  templateUrl: './create-kasnak.component.html',
  styleUrls: ['./create-kasnak.component.scss']
})
export class CreateKasnakComponent implements OnInit {
  malzemeGiderler:any=[];
  selectedMalzemeGiderRow:any;
  malzemeGiderToplam:any;
  iscilikGiderler:any=[];
  selectedIscilikGiderRow:any;
  iscilikGiderToplam:any;

  constructor(
    private KasnakService: KasnakService,
    public activeModal: NgbActiveModal,
    private NgbModal:NgbModal

  ) {}

  ngOnInit(): void {}


  Kaydet() {


  var createModel={
    ad:this.frm.ad,
    birim:"ADET",
    kasnakTuru:this.frm.kasnakTuru.ad,
    kasnakCapi:this.frm.kasnakCapi.ad,
    kanalSayisi:this.frm.kanalSayisi.ad,
    halatCapi:this.frm.halatCapi.ad,
    urunBilesenler:this.malzemeGiderler,
    iscilikGiderler:this.iscilikGiderler
  }



console.log(createModel);

    this.KasnakService.create(
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
    gunlukUretimSayisi:5,
    tahminiCalisanSayisi:10,
    ortalamaPersonelMaasi:0,
    kasnakCapi: {  ad: '240' },
    kanalSayisi: { ad: '4-5-6' },
    halatCapi: {  ad: '6.5' },
    kasnakTuru: {  ad: 'Kabin Kasnağı' },
  }
  
  
  
  
  
  
  
  
  
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
