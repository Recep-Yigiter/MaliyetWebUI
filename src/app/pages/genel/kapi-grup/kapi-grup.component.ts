import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { KapiGrupService } from 'src/app/core/services/repository/kapi-grup.service';
import { DOVIZ } from 'src/assets/DATA/doviz';
import { CreateKapiGrupComponent } from './create-kapi-grup/create-kapi-grup.component';
import { UpdateKapiGrupComponent } from './update-kapi-grup/update-kapi-grup.component';
import { KasaKapiGrupIscilikModalComponent } from './core/settings/iscilik/kasa-kapi-grup-iscilik';
import { MekanizmaKapiGrupIscilikModalComponent } from './core/settings/iscilik/mekanizma-kapi-grup-iscilik';
import { PanelKapiGrupIscilikModalComponent } from './core/settings/iscilik/panel-kapi-grup-iscilik';
import { KasaIscilikGiderTutarService } from './core/services/iscilik/kasa-iscilik-gider-tutar.service';
import { PanelIscilikGiderTutarService } from './core/services/iscilik/panel-iscilik-gider-tutar.service';
import { MekanizmaIscilikGiderTutarService } from './core/services/iscilik/mekanizma-iscilik-gider-tutar.service';
import { KapiGrupGenelGiderModalComponent } from './core/settings/kapi-grup-genel-gider';
import { KapiGrupGenelGiderTutarService } from './core/services/kapi-grup-genel-gider-tutar.service';

@Component({
  selector: 'app-kapi-grup',
  templateUrl: './kapi-grup.component.html',
  styleUrls: ['./kapi-grup.component.scss']
})
export class KapiGrupComponent {
  KapiGrupGenelGiderTutar: any;
  KasaKapiGrupIscilikGiderTutar: any;
  PanelKapiGrupIscilikGiderTutar: any;
  MekanizmaKapiGrupIscilikGiderTutar: any;
  constructor(private KapiGrupService: KapiGrupService,
    private NgbModal: NgbModal,
    private KasaIscilikGiderTutarService: KasaIscilikGiderTutarService,
    private PanelIscilikGiderTutarService: PanelIscilikGiderTutarService,
    private MekanizmaIscilikGiderTutarService: MekanizmaIscilikGiderTutarService,
    private KapiGrupGenelGiderTutarService: KapiGrupGenelGiderTutarService,
  ) {


  }

  varyasyonlar: any;
  rowData: any;


  birlesmisVeri: any
  gruplanmisVeri: any = {};
  objectKeys: any;
  gruplanmisVerideToplamFiyat: any;
  async ngOnInit() {

    this.result();

  }

  async result() {


    this.rowData = (await this.KapiGrupService.GetAll()).items
    this.KapiGrupGenelGiderTutar = await this.KapiGrupGenelGiderTutarService.result();
    this.KasaKapiGrupIscilikGiderTutar = await this.KasaIscilikGiderTutarService.result();
    this.PanelKapiGrupIscilikGiderTutar = await this.PanelIscilikGiderTutarService.result();
    this.MekanizmaKapiGrupIscilikGiderTutar = await this.MekanizmaIscilikGiderTutarService.result();
    this.rowData.forEach(data => {
      if (data.urunBilesenler.length > 0) {
        let totalUrunBilesen = 0;
        data.urunBilesenler.forEach((urunBilesen: any) => {
          if (urunBilesen.stok.dovizCinsi == 'TL') {
            var doviz: any = DOVIZ.filter(c => c.dovizCinsi == urunBilesen.stok.dovizCinsi)[0]
            urunBilesen.stok.dovizFiyat = urunBilesen.stok.birimFiyat * doviz.deger;
          }
          else if (urunBilesen.stok.dovizCinsi == 'EURO') {
            var doviz: any = DOVIZ.filter(c => c.dovizCinsi == urunBilesen.stok.dovizCinsi)[0]
            urunBilesen.stok.dovizFiyat = urunBilesen.stok.birimFiyat * doviz.deger;
          }
          else if (urunBilesen.stok.dovizCinsi == 'USD') {
            var doviz: any = DOVIZ.filter(c => c.dovizCinsi == urunBilesen.stok.dovizCinsi)[0]
            urunBilesen.stok.dovizFiyat = urunBilesen.stok.birimFiyat * doviz.deger;
          }
          totalUrunBilesen += urunBilesen.miktar * urunBilesen.stok.dovizFiyat;
          data.malzemeGider = totalUrunBilesen;



        })

        data.grup = "Kapı";
      }
    });



    this.rowData.forEach((data: any) => {

      if (data.tur === 'Kasa') {
        data.iscilikGider = this.KasaKapiGrupIscilikGiderTutar;
        data.genelGider = this.KapiGrupGenelGiderTutar / 3;
      }
      else if (data.tur === 'Panel') {
        data.iscilikGider = this.PanelKapiGrupIscilikGiderTutar
        data.genelGider = this.KapiGrupGenelGiderTutar / 3;
      }
      else {
        data.iscilikGider = this.MekanizmaKapiGrupIscilikGiderTutar
        data.genelGider = this.KapiGrupGenelGiderTutar / 3;
      }



    })

    this.varyasyonlar = [
      { ad: 'Kasa', grup: 'Kapı', },
      { ad: 'Panel', grup: 'Kapı', },
      { ad: 'Mekanizma', grup: 'Kapı', },
    ]


    this.birlesmisVeri = this.birlestir();
    this.gruplanmisVeri = this.gruplamaYap();
    this.objectKeys = Object.keys(this.gruplanmisVeri);
  }


  birlestir() {

    return this.varyasyonlar.map(item => {
      const _DATA = this.rowData
        .filter(element => element.tur === item.ad)
        .reduce((acc, element) => {
          acc[element.kapiGenisligi] = element;
          return acc;
        }, {});

      return {
        ...item,
        _DATA
      };
    });
  }
  gruplamaYap() {

    const gruplanmisVeri = this.birlesmisVeri.reduce((acc, data) => {
      if (!acc[data.grup]) {
        acc[data.grup] = [];
      }
      acc[data.grup].push(data);

      return acc;
    }, {});



    const grupluVeri: any = {};
    gruplanmisVeri["Kapı"].forEach((parca: any) => {


      const grupAdi = parca.ad;
      const data = parca._DATA;
      Object.keys(data).forEach((genislik: string) => {
        if (!grupluVeri[genislik]) {
          grupluVeri[genislik] = {};
        }

        grupluVeri[genislik][grupAdi] = data[genislik];

        let test = grupluVeri[genislik][grupAdi]





      });
    });



    Object.keys(grupluVeri).forEach(key => {
      let ToplamTutar = 0;
      Object.keys(grupluVeri[key]).forEach(key2 => {
        if (grupluVeri[key][key2].malzemeGider) {
          ToplamTutar += grupluVeri[key][key2].malzemeGider + grupluVeri[key][key2].iscilikGider + grupluVeri[key][key2].genelGider;
          grupluVeri[key].toplamFiyat = ToplamTutar;
        }
      });
    })
    this.gruplanmisVerideToplamFiyat = grupluVeri;
    return gruplanmisVeri;

  }






  async yeni() {
    const modalRef = this.NgbModal.open(CreateKapiGrupComponent, {
      size: 'xl',
      backdrop: 'static',
    });
    modalRef.result.then(async (item) => {
      if (item) {this.result()}
    });
  }

  sil() {
    // if (this.selectedKabin) {
    //   const modalRef = this.NgbModal.open(DeleteModalComponents, {
    //     size: 'md',
    //     backdrop: 'static',
    //   });
    //   modalRef.componentInstance.data = 'Birim Kartı';
    //   modalRef.result.then(async (event) => {
    //     if (event == true) {
    //       this.KabinService.delete(this.selectedKabin.id, async () => {
    //         this.rowData = (await this.KabinService.GetAll()).items
    //       });

    //     }
    //   });
    // }
  }

  guncelle(item) {

    const modalRef = this.NgbModal.open(UpdateKapiGrupComponent, {
      size: 'xl',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = item;
    modalRef.result.then(async (item) => {
      if (item) {
        this.result();
      }
    });

  }

  myComponent: any;
  iscilikSetting(item) {
    if (item == "Kasa") {
      this.myComponent = KasaKapiGrupIscilikModalComponent;
    }
    else if (item == "Panel") {
      this.myComponent = PanelKapiGrupIscilikModalComponent;
    }
    else {
      this.myComponent = MekanizmaKapiGrupIscilikModalComponent;
    }
    const modalRef = this.NgbModal.open(this.myComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.result.then(async (item) => {
      if (item) {
        this.result();
      }
    });
  }

  genelGiderModal() {
    const modalRef = this.NgbModal.open(KapiGrupGenelGiderModalComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.result.then(async (item) => {

    });
  }



  // getToplamByType(type: string): number {
  //   let toplam = 0;
  //   debugger;
  //  let objectKeys = Object.keys(this.gruplanmisVeri)
  //   for (const grup of this.objectKeys) {
  //     for (const grupVeri of grup) {
  //       const data = grupVeri._DATA[type];
  //       if (data && data.urunBilesenler.length !== 0) {
  //         const iscilik =
  //           grupVeri.ad === 'Kasa'
  //             ? this.KasaKapiGrupIscilikGiderTutar
  //             : grupVeri.ad === 'Panel'
  //             ? this.PanelKapiGrupIscilikGiderTutar
  //             : grupVeri.ad === 'Mekanizma'
  //             ? this.MekanizmaKapiGrupIscilikGiderTutar
  //             : 0;

  //         toplam += (data.malzemeGider ?? 0) + iscilik;
  //       }
  //     }
  //   }

  //   // Genel gideri de ekleyelim
  //   toplam += this.KapiGrupGenelGiderTutar;

  //   return toplam;
  // }

}
