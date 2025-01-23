import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { KapiService } from 'src/app/core/services/repository/kapi.service';
import { KapiGrupSelectModalComponents } from 'src/shared/dialogs/kapi-grup-selected-modal';
import { PersonelSelectModalComponents } from 'src/shared/dialogs/personel-selected-modal';
import { StokSelectModalComponents } from 'src/shared/dialogs/stok-selected-modal';

@Component({
  selector: 'app-update-kapi',
  templateUrl: './update-kapi.component.html',
  styleUrls: ['./update-kapi.component.scss']
})
export class UpdateKapiComponent implements OnInit {
  @Input() data;
  kapiGruplari:any=[];
  selectedMalzemeGiderRow:any;
  malzemeGiderToplam:any;
  iscilikGiderler:any=[];
  selectedIscilikGiderRow:any;
  iscilikGiderToplam:any;

  constructor(
    private KapiService: KapiService,
    public activeModal: NgbActiveModal,
    private NgbModal:NgbModal

  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.frm={
      // ad:this.data.ad,
      // birim:{ad: this.selectedBirim?this.selectedBirim:this.data.birim},
      // tur:{ad: this.selectedTur?this.selectedTur:this.data.tur},
      // model:{ad: this.selectedModel?this.selectedModel:this.data.model},
      // zeminKaplama:{ad:this.selectedZeminKaplama?this.selectedZeminKaplama: this.data.zeminKaplama},
      // kabinKaplama:{ad:this.selectedKabinKaplama?this.selectedKabinKaplama: this.data.kabinKaplama },
      // aksesuarKaplama:{ad:this.selectedAksesuarKaplama?this.selectedAksesuarKaplama: this.data.aksesuarKaplama },
      // kapasite:{deger:this.selectedKapasite?this.selectedKapasite: this.data.kapasite}

    ad: this.data.ad?this.data.ad:this.frm.ad,
    birim: "ADET",
    yon: {ad: this.selectedYon?this.selectedYon:this.data.yon},
    kapiYuksekligi: {ad: this.selectedKapiYukseklik?this.selectedKapiYukseklik:this.data.kapiYuksekligi},
    kapiGenisligi: {ad: this.selectedKapiGenisligi?this.selectedKapiGenisligi:this.data.kapiGenisligi},
    kapiTipi:{ad: this.selectedKapiTipi?this.selectedKapiTipi:this.data.kapiTipi},
    uygunluk: "81-20",
    kaplama:{ad: this.selectedKaplama?this.selectedKaplama:this.data.kaplama},
    kapiGruplari:this.kapiGruplari,
    }
    
   
    this.data.kapiGruplari.forEach(kapiGrup => {
      var test={
         id: kapiGrup.id,
         ad:kapiGrup.ad,
         birim:"ADET",
         miktar:1}

      this.kapiGruplari.push(test)
    });

  }


  Kaydet() {
  var createModel={
    id:this.data.id,
    ad: this.frm.ad,
    birim: "ADET",
    yon:   this.frm.yon.ad,
    kapiYuksekligi:  this.frm.kapiYuksekligi.ad,
    kapiGenisligi: this.frm.kapiGenisligi.ad,
    kapiTipi:this.frm.kapiTipi.ad,
    uygunluk: "81-20",
    kaplama: this.frm.kaplama.ad,
    kapiGruplari:this.kapiGruplari,
  }

    this.KapiService.update(
      createModel,
     async () => {
        this.activeModal.close(true);
      },(errorMessage) => {}
    );
    
  }



  cikis() {
    this.activeModal.close(false);
  }



  frm:any={ }
  
  
  
  
  
  selectedYon:any;
  yon=[
    {  ad: 'Sağ' },
    {  ad: 'Sol' },
    {  ad: 'Merkezi' },
  ]
  onYonChange(item: any): void {
    this.selectedYon=item;
  };
  
  
  selectedKapiYukseklik:any;
  kapiYuksekligi=[
    { ad: '200' },
    { ad: '210' },
  ]
  onKapiYuksekligiChange(item: any): void {
    this.selectedKapiYukseklik=item;
  };
  
  
  selectedKapiGenisligi:any;
  kapiGenisligi=[
    {  ad: '70' },
    {  ad: '80' },
    {  ad: '90' },
  ]
  onKapiGenisligiChange(item: any): void {
    this.selectedKapiGenisligi=item;
  };
  
  
  selectedKapiTipi:any;
  kapiTipi = [
    {  ad: 'Otomatik' },
    {  ad: 'İç Güvenlik' },
    {  ad: 'Yarı Otomatik' },
    {  ad: 'Dairesel' },
  ];
  onKapiTipiChange(kapasite: any): void {
    this.selectedKapiTipi=kapasite;
  };
  
  
  selectedKaplama:any;
  kaplama = [
    { ad: 'Satine' },
    { ad: 'Decoplate' },
  ];
  
  onKaplamaChange(kapasite: any): void {
    this.selectedKaplama=kapasite;
  };
     






  kapiGrupEkle() {
    const modalRef = this.NgbModal.open(KapiGrupSelectModalComponents, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.confirmationBoxTitle = 'Kapi Grupları';
    modalRef.result.then((kapiGrup) => {
      if (kapiGrup != false) {



  var newValue={
    id: kapiGrup.id,
    ad:kapiGrup.ad,
    birim:"ADET",
    miktar:1
  }
  const customerExists = this.kapiGruplari.some(customer => customer.id === newValue.id);

  if (customerExists) {
    alert(`Bu ${kapiGrup.ad} zaten mevcut! `);
    return;
  }
  this.kapiGruplari = [...this.kapiGruplari, newValue];

      }
    });
  }




  deleteKapiGrupItem(index: number): void {
    this.kapiGruplari.splice(index, 1);
    
  }










    

}
