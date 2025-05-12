import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { ApiClientService } from 'src/app/core/services/api-client.service';
import { GenelGiderKatsayiService } from 'src/app/core/services/repository/genel-gider-katsayi.service';
import { GenelGiderService } from 'src/app/core/services/repository/genel-gider.service';
import { IscilikSettingService } from 'src/app/core/services/repository/iscilik-setting.service';


@Injectable({
    providedIn: 'root'
})
export class KasaIscilikGiderTutarService {
    genelGiderler: any;
    genelGiderKatsayi: any;
    birlesmisVeri: any;
    gruplanmisVeri: any;
    toplamIscilikGiderTutar: number = 0;
    objectKeys: any;
    constructor(private IscilikSettingService: IscilikSettingService,) {

    }


    async result() {
        var iscilikSetting = (await this.IscilikSettingService.GetAll()).items.filter(c => c.prosesAdi == "kasa")[0];
        let totalIscilikGider = 0;
        totalIscilikGider = (iscilikSetting.ortalamaCalisanMaasi * iscilikSetting.uretimdekiPersonelSayisi / 28) / iscilikSetting.gunlukUretimSayisi;
     
        return totalIscilikGider;

    }




    birlestir() {

        return this.genelGiderler.map(gider => {
            const katsayilar = this.genelGiderKatsayi
                .filter(katsayi => katsayi.ad === gider.ad && katsayi.fabrika === gider.fabrika)
                .reduce((acc, katsayi) => {
                    acc[katsayi.tur] = gider.tutar * katsayi.deger / 100;
                    return acc;
                }, {});

            return {
                ...gider,
                katsayilar
            };
        });
    }
    gruplamaYap() {
        const gruplanmisVeri = this.birlesmisVeri.reduce((acc, gider) => {
            if (!acc[gider.fabrika]) {
                acc[gider.fabrika] = [];
            }
            acc[gider.fabrika].push(gider);

            return acc;
        }, {});

        return gruplanmisVeri;

    }




}





