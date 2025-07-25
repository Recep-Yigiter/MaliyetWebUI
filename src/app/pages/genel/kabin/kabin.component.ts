import { Component } from '@angular/core';
import { KabinService } from 'src/app/core/services/repository/kabin.service';
import { DOVIZ } from 'src/assets/DATA/doviz';
import { CreateKabinComponent } from './create-kabin/create-kabin.component';
import { DeleteModalComponents } from 'src/shared/dialogs/informations/delete-modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateKabinComponent } from './update-kabin/update-kabin.component';
import { KabinIscilikModalComponent } from './core/settings/kabin-iscilik';
import { IscilikGiderService } from 'src/app/core/services/repository/iscilik-gider.service';
import { IscilikSettingService } from 'src/app/core/services/repository/iscilik-setting.service';
import { KabinGenelGiderModalComponent } from './core/settings/kabin-genel-gider';
import { KabinGenelGiderTutarService } from './core/services/kabin-genel-gider-tutar.service';
import { KabinIscilikGiderTutarService } from './core/services/kabin-iscilik-gider-tutar.service';

@Component({
  selector: 'app-kabin',
  templateUrl: './kabin.component.html',
  styleUrls: ['./kabin.component.scss']
})
export class KabinComponent {

  kabinIscilikGiderTutar: any;
  kabinGenelGiderTutar: any;



  constructor(private KabinService: KabinService,
    private NgbModal: NgbModal,
    private KabinGenelGiderTutarService: KabinGenelGiderTutarService,
    private KabinIscilikGiderTutarService: KabinIscilikGiderTutarService) {
    this.rowData = [];
  }

  varyasyonlar: any;
  rowData: any;


  birlesmisVeri: any
  gruplanmisVeri: any = {};
  objectKeys: any;

  async ngOnInit() {




    this.result();


  }


  async result() {

    this.rowData = (await this.KabinService.GetAll()).items
    this.kabinGenelGiderTutar = await this.KabinGenelGiderTutarService.result();
    this.kabinIscilikGiderTutar = await this.KabinIscilikGiderTutarService.result();
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

        data.grup = "Kabin";
      }
    });
    this.varyasyonlar = [
      { ad: 'SATİNE PASLANMAZ', grup: 'Kabin', },
      { ad: 'KOLYOZ-S', grup: 'Kabin', },
      { ad: 'LAGOS', grup: 'Kabin', },
      { ad: 'ORFOZ', grup: 'Kabin', },
      { ad: 'BELUGA', grup: 'Kabin', },
      { ad: 'LİTRİNOS', grup: 'Kabin', },
      { ad: 'BARACUDA', grup: 'Kabin', },
      { ad: 'ÇAMUKA', grup: 'Kabin', },
      { ad: 'JAVA', grup: 'Kabin', },
      { ad: 'OPAH', grup: 'Kabin', },
      { ad: 'HAMSİ', grup: 'Kabin', },
      { ad: 'SUDAK', grup: 'Kabin', },
      { ad: 'RİNA', grup: 'Kabin', },
      { ad: 'İSPENDEK', grup: 'Kabin', },
      { ad: 'MORİNA FR', grup: 'Kabin', },
      { ad: 'EMPEROR', grup: 'Kabin', },
      { ad: 'TUVAL FR', grup: 'Kabin', },
      { ad: 'SCARLET', grup: 'Kabin', },
      { ad: 'KLİNA', grup: 'Kabin', },
      { ad: 'MELANURYA', grup: 'Kabin', },
      { ad: 'FRONTOZA', grup: 'Kabin', },
      { ad: 'LEVKİT', grup: 'Kabin', },
      { ad: 'SİNARİT', grup: 'Kabin', },
      { ad: 'SARPA', grup: 'Kabin', },
      { ad: 'ÇİKLİT', grup: 'Kabin', },
      { ad: 'BARRELEYE', grup: 'Kabin', },
      { ad: 'CAMGÖZ', grup: 'Kabin', },
      { ad: 'STRANGOLOS', grup: 'Kabin', },
      { ad: 'ZARGANA', grup: 'Kabin', },
      { ad: 'KARMOZ', grup: 'Kabin', },
      { ad: 'MOBİDİK', grup: 'Kabin', },
      { ad: 'KOLYOZ', grup: 'Kabin', },
    ]


    this.birlesmisVeri = this.birlestir();
    this.gruplanmisVeri = this.gruplamaYap();
    this.objectKeys = Object.keys(this.gruplanmisVeri)

   

  }




  birlestir() {


    return this.varyasyonlar.map(item => {
      const _DATA = this.rowData
        .filter(element => element.model === item.ad && element.grup === item.grup)
        .reduce((acc, element) => {
          acc[element.kapasite] = element;
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
    return gruplanmisVeri;

  }






  async yeni() {
    const modalRef = this.NgbModal.open(CreateKabinComponent, {
      size: 'xl',
      backdrop: 'static',
    });
    modalRef.result.then(async (item) => {
      if (item) {
        this.result();

      }
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

    const modalRef = this.NgbModal.open(UpdateKabinComponent, {
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


  iscilikSetting() {
    const modalRef = this.NgbModal.open(KabinIscilikModalComponent, {
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
    const modalRef = this.NgbModal.open(KabinGenelGiderModalComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.result.then(async (item) => {

    });
  }
}
