import { Component } from '@angular/core';
import { MakineSasesiService } from 'src/app/core/services/repository/makine-sasesi.service';
import { DOVIZ } from 'src/assets/DATA/doviz';
import { UpdateMakineSasesiComponent } from './update-makine-sasesi/update-makine-sasesi.component';
import { CreateMakineSasesiComponent } from './create-makine-sasesi/create-makine-sasesi.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MakineSasesiIscilikModalComponent } from './core/settings/makine-sasesi-iscilik';
import { IscilikSettingService } from 'src/app/core/services/repository/iscilik-setting.service';
import { MakineSasesiGenelGiderTutarService } from './core/services/makine-sasesi-genel-gider-tutar.service';
import { MakineSasesiIscilikGiderTutarService } from './core/services/makine-sasesi-iscilik-gider-tutar.service';
import { MakineSasesiGenelGiderModalComponent } from './core/settings/makine-sasesi-genel-gider';

@Component({
  selector: 'app-makine-sasesi',
  templateUrl: './makine-sasesi.component.html',
  styleUrls: ['./makine-sasesi.component.scss']
})
export class MakineSasesiComponent {
  makineSasesiGenelGiderTutar: any;
  makineSasesiIscilikGiderTutar: any;

  constructor(private MakineSasesiService: MakineSasesiService,
    private NgbModal: NgbModal,
    private IscilikSettingService: IscilikSettingService,
    private MakineSasesiGenelGiderTutarService: MakineSasesiGenelGiderTutarService,
    private MakineSasesiIscilikGiderTutarService: MakineSasesiIscilikGiderTutarService

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

    this.rowData = (await this.MakineSasesiService.GetAll()).items
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

        data.grup = "Makine Şasesi";
      }
    });

    this.varyasyonlar = [
      { ad: "Ağırlık Arkada Duvardan Şase", grup: 'Makine Şasesi', },
      { ad: 'MRL Duvardan', grup: 'Makine Şasesi', },
      { ad: "MRL Ray'a Bağlı", grup: 'Makine Şasesi', },
      { ad: 'MR Dişlili', grup: 'Makine Şasesi', },
      { ad: 'MR Dişlisiz', grup: 'Makine Şasesi', },


    ]


    this.birlesmisVeri = this.birlestir();
    this.gruplanmisVeri = this.gruplamaYap();
    this.objectKeys = Object.keys(this.gruplanmisVeri)

  }



  birlestir() {
    return this.varyasyonlar.map(item => {
      const _DATA = this.rowData
        .filter(element => element.saseTipi === item.ad && element.grup === item.grup)
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
    const modalRef = this.NgbModal.open(CreateMakineSasesiComponent, {
      size: 'xl',
      backdrop: 'static',
    });
    modalRef.result.then(async (item) => {
      if (item) {
        console.log(item);
        this.rowData = (await this.MakineSasesiService.GetAll()).items

        this.rowData.forEach(data => {
          let total = 0;
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
            total += urunBilesen.miktar * urunBilesen.stok.dovizFiyat;
            data.malzemeGider = total;
          })
          data.grup = "Makine Şasesi";

        });
        this.birlesmisVeri = this.birlestir();
        this.gruplanmisVeri = this.gruplamaYap();
        this.objectKeys = Object.keys(this.gruplanmisVeri)

      }
    });
  }

  guncelle(item) {

    const modalRef = this.NgbModal.open(UpdateMakineSasesiComponent, {
      size: 'xl',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = item;
    modalRef.result.then(async (item) => {
      if (item) {
        this.rowData = (await this.MakineSasesiService.GetAll()).items


        this.rowData.forEach(data => {
          let total = 0;
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
            total += urunBilesen.miktar * urunBilesen.stok.dovizFiyat;
            data.malzemeGider = total;
          })
          data.grup = "Makine Şasesi";

        });
        this.birlesmisVeri = this.birlestir();
        this.gruplanmisVeri = this.gruplamaYap();
        this.objectKeys = Object.keys(this.gruplanmisVeri)

      }
    });

  }

  iscilikSetting() {
    const modalRef = this.NgbModal.open(MakineSasesiIscilikModalComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.result.then(async (item) => {
      if (item) {
        this.rowData = (await this.MakineSasesiService.GetAll()).items
        var iscilikSetting = (await this.IscilikSettingService.GetAll()).items.filter(c => c.prosesAdi == "makine-sasesi")[0]
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
          }
          if (data.iscilikGiderler.length > 0) {
            let totalIscilikGider = 0;
            totalIscilikGider = (iscilikSetting.ortalamaCalisanMaasi * iscilikSetting.uretimdekiPersonelSayisi / 28) / iscilikSetting.gunlukUretimSayisi;
            data.iscilikGider = totalIscilikGider;
          }
          let totalIscilikGider = 0;
          totalIscilikGider = (iscilikSetting.ortalamaCalisanMaasi * iscilikSetting.uretimdekiPersonelSayisi / 28) / iscilikSetting.gunlukUretimSayisi;
          data.iscilikGider = totalIscilikGider;
          data.grup = "Makine Şasesi";
        });




        this.varyasyonlar = [
          { ad: "Ağırlık Arkada Duvardan Şase", grup: 'Makine Şasesi', },
          { ad: 'MRL Duvardan', grup: 'Makine Şasesi', },
          { ad: "MRL Ray'a Bağlı", grup: 'Makine Şasesi', },
          { ad: 'MR Dişlili', grup: 'Makine Şasesi', },
          { ad: 'MR Dişlisiz', grup: 'Makine Şasesi', },


        ]

        this.birlesmisVeri = this.birlestir();
        this.gruplanmisVeri = this.gruplamaYap();
        this.objectKeys = Object.keys(this.gruplanmisVeri)

      }
    });
  }
  genelGiderModal() {
    const modalRef = this.NgbModal.open(MakineSasesiGenelGiderModalComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.result.then(async (item) => {

    });
  }
}
