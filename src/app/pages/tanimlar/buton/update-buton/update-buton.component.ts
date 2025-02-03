import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ButonService } from 'src/app/core/services/repository/buton.service';
import { IscilikGiderService } from 'src/app/core/services/repository/iscilik-gider.service';
import { KabinService } from 'src/app/core/services/repository/kabin.service';
import { UrunBilesenService } from 'src/app/core/services/repository/urun-bilesen.service';
import { PersonelSelectModalComponents } from 'src/shared/dialogs/personel-selected-modal';
import { StokSelectModalComponents } from 'src/shared/dialogs/stok-selected-modal';

@Component({
  selector: 'app-update-buton',
  templateUrl: './update-buton.component.html',
  styleUrls: ['./update-buton.component.scss']
})
export class UpdateButonComponent implements OnInit {
   @Input() data;

  malzemeGiderler:any=[];
  selectedMalzemeGiderRow:any;
  malzemeGiderToplam:any;
  iscilikGiderler:any=[];
  selectedIscilikGiderRow:any;
  iscilikGiderToplam:any;

  constructor(
    private ButonService: ButonService,
    public activeModal: NgbActiveModal,
    private NgbModal:NgbModal,
    private UrunBilesenService:UrunBilesenService,
    private IscilikGiderService:IscilikGiderService

  ) {}

 async ngOnInit() {
  this.frm={
    ad:this.data.ad,
    butonTipi: {ad: this.selectedButonTipi?this.selectedButonTipi:this.data.butonTipi},
    durakSayisi:{ad: this.selectedDurakSayisi?this.selectedDurakSayisi:this.data.durakSayisi},
    butonCesidi:{ad: this.selectedButonCesidi?this.selectedButonCesidi:this.data.butonCesidi},
    boyOzellik: {ad: this.selectedBoyOzellik?this.selectedBoyOzellik:this.data.boyOzellik},
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
         birim:"ADET",
         butonTipi:this.frm.butonTipi.ad,
         durakSayisi:this.frm.durakSayisi.ad,
         butonCesidi:this.frm.butonCesidi.ad,
         butonOzellik:this.frm.boyOzellik.ad,
         urunBilesenler:[],
         iscilikGiderler:[]
      }

      this.malzemeGiderler.forEach(element => {
        element.butonId=this.data.id
      });

      var modelUrunBilesen={
       items: this.malzemeGiderler
      }

      this.iscilikGiderler.forEach(element => {
        element.personelId= element.personel.id,
        element.kabinId=null,
        element.butonId=this.data.id,
        element.kapiId= null,
        element.kasnakId= null,
        element.makineSasesiId= null,
        element.suspansiyonId= null
      });

      var modelIscilikGider={
      items: this.iscilikGiderler
      }



      this.ButonService.update(
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














  selectedButonTipi:any;
  butonTipi=[
    { ad: 'Kabin Butonu' },
    { ad: 'Kat Butonu' },
  ]
  onButonTipiChange(item: any): void {
    this.selectedButonTipi=item;
  };


  selectedDurakSayisi:any;
  durakSayisi=[
    {  ad: '2' },
    {  ad: '3' },
    {  ad: '4' },
    {  ad: '5' },
    {  ad: '6' },
    {  ad: '7' },
    {  ad: '8' },
    {  ad: '9' },
    {  ad: '10' },
    {  ad: '11' },
    {  ad: '12' },
    {  ad: '13' },
    {  ad: '14' },
  ]
  onDurakSayisiChange(item: any): void {
    this.selectedDurakSayisi=item;
  };



  selectedButonCesidi:any;
  butonCesidi=[
    { ad: 'Cam' },
    { ad: 'Mekanik' },
  ]
  onButonCesidiChange(item: any): void {
    this.selectedButonCesidi=item;
  };





  selectedBoyOzellik:any;
  boyOzellik=[
    {ad: 'Tam Boy' },
    {ad: 'Yarım Boy' },
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

  deletePersonelItem(item: any): void {
    this.iscilikGiderler=  this.iscilikGiderler.filter(c=>c!==item);

  }






}
