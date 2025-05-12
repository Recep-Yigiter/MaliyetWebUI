import { Component } from '@angular/core';
import { AgirlikSasesiService } from 'src/app/core/services/repository/agirlik-sasesi.service';
import { DOVIZ } from 'src/assets/DATA/doviz';
import { CreateAgirlikSasesiComponent } from './create-agirlik-sasesi/create-agirlik-sasesi.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateAgirlikSasesiComponent } from './update-agirlik-sasesi/update-agirlik-sasesi.component';
import { AgirlikSasesiIscilikModalComponent } from './core/settings/agirlik-sasesi-iscilik';
import { IscilikSettingService } from 'src/app/core/services/repository/iscilik-setting.service';
import { AgirlikSasesiGenelGiderTutarService } from './core/services/agirlik-sasesi-genel-gider-tutar.service';
import { AgirlikSasesiIscilikGiderTutarService } from './core/services/agirlik-sasesi-iscilik-gider-tutar.service';
import { AgirlikSasesiGenelGiderModalComponent } from './core/settings/agirlik-sasesi-genel-gider';

@Component({
  selector: 'app-agirlik-sasesi',
  templateUrl: './agirlik-sasesi.component.html',
  styleUrls: ['./agirlik-sasesi.component.scss']
})
export class AgirlikSasesiComponent {
  agirlikSasesiGenelGiderTutar: any;
  agirlikSasesiIscilikGiderTutar: any;

  constructor(private AgirlikSasesiService: AgirlikSasesiService,
     private NgbModal: NgbModal,
     private AgirlikSasesiGenelGiderTutarService: AgirlikSasesiGenelGiderTutarService,
     private AgirlikSasesiIscilikGiderTutarService: AgirlikSasesiIscilikGiderTutarService
    ) {


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

    this.rowData = (await this.AgirlikSasesiService.GetAll()).items
    this.agirlikSasesiGenelGiderTutar = await this.AgirlikSasesiGenelGiderTutarService.result();
    this.agirlikSasesiIscilikGiderTutar = await this.AgirlikSasesiIscilikGiderTutarService.result();
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

        data.grup = "Ağırlık Şasesi";
      }
    });

    this.varyasyonlar = [
      { ad: '2/1 Tek Sıra Ağırlık', grup: 'Ağırlık Şasesi', },
      { ad: '2/1 Çift Sıra Ağırlık', grup: 'Ağırlık Şasesi', },
      { ad: '2/1 Tek Sıra Dublex Ağırlık', grup: 'Ağırlık Şasesi', },
      { ad: '2/1 Çift Sıra Dublex Ağırlık ', grup: 'Ağırlık Şasesi', },
      { ad: '1/1 Tek Sıra Ağırlık', grup: 'Ağırlık Şasesi', },
      { ad: '1/1 Çift Sıra Ağırlık', grup: 'Ağırlık Şasesi', },
      { ad: '1/1 Tek Sıra Dublex Ağırlık', grup: 'Ağırlık Şasesi', },
      { ad: '1/1 Çift Sıra Dublex Ağırlık', grup: 'Ağırlık Şasesi', },
    ]

    this.birlesmisVeri = this.birlestir();
    this.gruplanmisVeri = this.gruplamaYap();
    this.objectKeys = Object.keys(this.gruplanmisVeri)

  }

  birlestir() {
    return this.varyasyonlar.map(item => {
            const _DATA = this.rowData
        .filter(element => element.karkasSekli === item.ad && element.grup === item.grup)
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
    const modalRef = this.NgbModal.open(CreateAgirlikSasesiComponent, {
      size: 'xl',
      backdrop: 'static',
    });
    modalRef.result.then(async (item) => {
      if (item) {
        this.result();
      }
    });
  }


  guncelle(item) {

    const modalRef = this.NgbModal.open(UpdateAgirlikSasesiComponent, {
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
    const modalRef = this.NgbModal.open(AgirlikSasesiIscilikModalComponent, {
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
      const modalRef = this.NgbModal.open(AgirlikSasesiGenelGiderModalComponent, {
        size: 'md',
        backdrop: 'static',
      });
      modalRef.result.then(async (item) => {
  
      });
    }
}
