import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { ApiClientService } from 'src/app/core/services/api-client.service';
import { GenelGiderKatsayiService } from 'src/app/core/services/repository/genel-gider-katsayi.service';
import { GenelGiderService } from 'src/app/core/services/repository/genel-gider.service';


@Injectable({
    providedIn: 'root'
})
export class KabinGenelGiderTutarService {
    genelGiderler: any;
    genelGiderKatsayi: any;
    birlesmisVeri: any;
    gruplanmisVeri:any;
    toplamGenelGiderTutar: number = 0;
    objectKeys:any;
    constructor(private GenelGiderService: GenelGiderService, private GenelGiderKatsayiService: GenelGiderKatsayiService) {

    }


    async result() {
        this.genelGiderler = ((await this.GenelGiderService.GetAll()).items);
        this.genelGiderKatsayi = (await this.GenelGiderKatsayiService.GetAll()).items
        this.birlesmisVeri = this.birlestir();
        this.gruplanmisVeri = this.gruplamaYap();
        this.objectKeys = Object.keys(this.gruplanmisVeri);


        let toplamGenelGider = 0
        this.gruplanmisVeri['Kabin Fabrikası'].forEach(element => {
            toplamGenelGider += element.katsayilar["kabin"] / 28;
        })
        this.toplamGenelGiderTutar = toplamGenelGider;

        return this.toplamGenelGiderTutar
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





