import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { KabinService } from 'src/app/core/services/repository/kabin.service';
import { KABIN_MODELLER } from 'src/assets/DATA/kabin-modeller';
import { PersonelSelectModalComponents } from 'src/shared/dialogs/personel-selected-modal';
import { StokSelectModalComponents } from 'src/shared/dialogs/stok-selected-modal';

@Component({
  selector: 'app-create-kabin',
  templateUrl: './create-kabin.component.html',
  styleUrls: ['./create-kabin.component.scss']
})
export class CreateKabinComponent implements OnInit {
  malzemeGiderler: any = [];
  selectedMalzemeGiderRow: any;
  malzemeGiderToplam: any;
  iscilikGiderler: any = [];
  selectedIscilikGiderRow: any;
  iscilikGiderToplam: any;
  modeller: any = KABIN_MODELLER;
  constructor(
    private KabinService: KabinService,
    public activeModal: NgbActiveModal,
    private NgbModal: NgbModal

  ) { }

  ngOnInit(): void { }


  Kaydet() {


    var createModel = {

      // birim:this.frm.birim.ad,
      // tur:this.frm.tur.ad,
      // model:this.frm.model.ad,
      // kabinKaplama:this.frm.kabinKaplama.ad,
      // zeminKaplama:this.frm.zeminKaplama.ad,
      // aksesuarKaplama:this.frm.aksesuarKaplama.ad,
      // kapasite:this.frm.kapasite.deger,
      // urunBilesenler:this.malzemeGiderler,
      // iscilikGiderler:this.iscilikGiderler
     
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
      urunBilesenler:this.malzemeGiderler,
      iscilikGiderler:this.iscilikGiderler
    }


    this.KabinService.create(
      createModel,
      async () => {
        this.activeModal.close(true);
      }, (errorMessage) => { }
    );

  }



  cikis() {
    this.activeModal.close(false);
  }




  frm: any = {
    ad: "",
    model: {
      ad: "BELUGA",
      img:'../../../../../assets/img/kabin-models/BELUGA.PNG',
      ozellikler:
      {
        kabinDuvar: "Ral 7040 Boyalı Cam & Satine Paslanmaz",
        girisDuvar: "Satine Paslanmaz",
        arkaDuvar: "Füme Ayna",
        taban: "Silver Waves Granit",
        aydinlatma: "Kare Spot (Gün Işığı)",
        tavan: "Decoplate GS-05",
        kupeste: "Ø38 Parlak Satine Paslanmaz Boru",
        supurgelik: "Paslanmaz Çelik",
        opsiyonel: "-",
      }

    },
    kapasite: { id: 1, deger: '320' },


  }






  selectedModel: any;
  // modeller=[
  //   { id: 1, ad: 'ESB' },
  // ]
  onModelChange(item: any): void {
    this.selectedModel = item;
  };






  selectedKapasite: any;
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
    this.selectedKapasite = kapasite;
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
          var newValue = {

            stokId: element.id,
            ad: element.ad,
            birim: element.birim,
            butonId: null,
            KapiGrupId: null,
            kasnakId: null,
            kapiGrupId: null,
            makineSasesiId: null,
            suspansiyonId: null,
            miktar: element.miktar ? element.miktar : 0
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
          var newValue = {
            id: "bb4913c6-3205-480d-9122-7b24d160c4db",
            isDeleted: false,
            olusturmaTarihi: "2002-12-12T00:00:00",
            personel: element,
            personelId: element.id,
            kabinId: null,
            butonId: null,
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

    this.iscilikGiderler = this.iscilikGiderler.filter(c => c !== index);

  }





  selectedTab: string = 'malzeme-giderleri';  // Varsayılan olarak "kabin" sekmesi seçili

  selectTab(tab: any) {
    
    var local= localStorage.setItem('tanimlar',JSON.stringify(tab))
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
          tabItem:'malzeme-giderleri',
          icon: 'fa fa-inbox',
          submenu: [  ],
        
          expanded: false,
        },
        {
          label: 'İşçilik Giderleri',
          tabItem:'iscilik-giderleri',
          icon: 'fa fa-inbox',
          submenu: [  ],
         
          expanded: false,
        },
        
        
       
        
        
        
        
      ],
    },
  

  ];


}
