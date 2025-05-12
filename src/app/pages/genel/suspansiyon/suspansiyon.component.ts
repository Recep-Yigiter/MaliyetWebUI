import { Component } from '@angular/core';
import { SuspansiyonService } from 'src/app/core/services/repository/suspansiyon.service';
import { DOVIZ } from 'src/assets/DATA/doviz';
import { CreateSuspansiyonComponent } from './create-suspansiyon/create-suspansiyon.component';
import { UpdateSuspansiyonComponent } from './update-suspansiyon/update-suspansiyon.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IscilikSettingService } from 'src/app/core/services/repository/iscilik-setting.service';
import { SuspansiyonIscilikModalComponent } from './core/settings/suspansiyon-iscilik';
import { MakineSasesiGenelGiderTutarService } from '../makine-sasesi/core/services/makine-sasesi-genel-gider-tutar.service';
import { MakineSasesiIscilikGiderTutarService } from '../makine-sasesi/core/services/makine-sasesi-iscilik-gider-tutar.service';
import { SuspansiyonGenelGiderModalComponent } from './core/settings/suspansiyon-genel-gider';

@Component({
  selector: 'app-suspansiyon',
  templateUrl: './suspansiyon.component.html',
  styleUrls: ['./suspansiyon.component.scss']
})
export class SuspansiyonComponent {
  makineSasesiGenelGiderTutar: any;
  makineSasesiIscilikGiderTutar: any;

  constructor(
    private SuspansiyonService: SuspansiyonService,
    private NgbModal: NgbModal,
    private IscilikSettingService: IscilikSettingService,
    private MakineSasesiGenelGiderTutarService: MakineSasesiGenelGiderTutarService,
    private MakineSasesiIscilikGiderTutarService: MakineSasesiIscilikGiderTutarService,
  ) { }


  varyasyonlar: any;
  rowData: any;


  birlesmisVeri: any
  gruplanmisVeri: any = {};
  objectKeys: any;

  async ngOnInit() {

    this.result();

  }

  async result() {

    this.rowData = (await this.SuspansiyonService.GetAll()).items
    this.makineSasesiGenelGiderTutar = await this.MakineSasesiGenelGiderTutarService.result();
    this.makineSasesiIscilikGiderTutar = await this.MakineSasesiIscilikGiderTutarService.result();
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

        data.grup = "Süspansiyon";
      }
    });

    this.varyasyonlar = [
      { ad: '2/1', grup: 'Süspansiyon', },
      { ad: '1/1', grup: 'Süspansiyon', },
    ]



    this.birlesmisVeri = this.birlestir();
    this.gruplanmisVeri = this.gruplamaYap();
    this.objectKeys = Object.keys(this.gruplanmisVeri)

  }

  birlestir() {

    return this.varyasyonlar.map(item => {
      const _DATA = this.rowData
        .filter(element => element.askiTipi === item.ad && element.grup === item.grup)
        .reduce((acc, element) => {
          acc[element.rayArasi] = element;
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
    const modalRef = this.NgbModal.open(CreateSuspansiyonComponent, {
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

    const modalRef = this.NgbModal.open(UpdateSuspansiyonComponent, {
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
    const modalRef = this.NgbModal.open(SuspansiyonIscilikModalComponent, {
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
      const modalRef = this.NgbModal.open(SuspansiyonGenelGiderModalComponent, {
        size: 'md',
        backdrop: 'static',
      });
      modalRef.result.then(async (item) => {
  
      });
    }

}
