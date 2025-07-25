import { Component, Input, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GorevService } from 'src/app/core/services/repository/gorev.service';
import { IscilikSettingService } from 'src/app/core/services/repository/iscilik-setting.service';
import { GenelGiderService } from 'src/app/core/services/repository/genel-gider.service';
import { GenelGiderKatsayiService } from 'src/app/core/services/repository/genel-gider-katsayi.service';

@Component({
    selector: 'app-kabin-iscilik-modal',
    styleUrls: ['../../create-kabin/create-kabin.component.scss'],
    template: `
<div class="modal-header " style="padding: 0rem 0rem;">
    <h4 class="modal-title"></h4>
    <h4 class="modal-title"> </h4>
    <button type="button" class="btn-close" style="border: none; height: 30px; width: 30px;" aria-label="Close"
        (click)="activeModal.close(false)">
        <i class="fa-solid fa-xmark"></i>
    </button>
</div>



<div class="">
    <div class="container-fluid">
        <div class="panel header" data-resize-name="header">
            <div class="content">
                <div class="actions" style="padding: 2px 0px 2px 0px; display: flex;">
                    <div class="action-items" style="width: 100%; display: flex; align-items: center;">
                        <div class="action-left">
                            <div class="btn-group ml-1 mr-1">
                                <div class="button-container">
                                    <div class="button-grup disabled">
                                        <div class="img-container">
                                            <img src="../../../../../assets/icons/add-file.png" alt="">
                                        </div>
                                        <span class="d-none d-sm-inline button-label">Yeni</span>
                                    </div>
                                    <div (click)="Kaydet()" class="button-grup disabled">
                                        <div class="img-container">
                                            <img src="../../../../../assets/icons/save.png" alt="">
                                        </div>
                                        <span class="d-none d-sm-inline button-label">Kaydet</span>
                                    </div>
                                    <div class="button-grup disabled">
                                        <div class="img-container">
                                            <img src="../../../../../assets/icons/delete-file.png" alt="">
                                        </div>
                                        <span class="d-none d-sm-inline button-label">Sil</span>
                                    </div>
                                    <div (click)="activeModal.close(false)" class="button-grup">
                                        <div class="img-container">
                                            <img src="../../../../../assets/icons/close.png" alt="">
                                        </div>
                                        <span class="d-none d-sm-inline button-label">Çıkış</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div>


                <div style="display: grid; grid-template-columns:1fr; gap: 4px;">
                    <div style="display: flex; flex-direction: column; border: 1px solid rgb(230, 230, 230); color: white; padding: 4px;">
                    <p-table id="row-check" [value]="gruplanmisVeri['Kapı Fabrikası']" [style]="{'min-height':' 400px'}" dataKey="id" [scrollable]="true"
                         scrollHeight="400px" selectionMode="single" [(selection)]="selectedGenelGiderler">
                         <ng-template pTemplate="header">
                             <tr>
                                 <th style="text-align: center;color: rgb(99, 0, 0);" colspan="6">
                                 <div style='height:25px;padding:0.3rem 1rem;'></div> 
                                     <div class="button-container" style="position: absolute;left: 0;top: 0;">
                                         <div class="button-grup disabled" style="gap: 3px !important;">
                                             <div class="img-container">
                                                 <img style="width: 25px; height: 25px;"
                                                     src="../../../../../assets/icons/add-file.png" alt="">
                                             </div>
                         
                                         </div>
                                         <div class="button-grup disabled" style="gap: 3px !important;">
                                             <div class="img-container">
                                                 <img style="width: 25px; height: 25px;"
                                                     src="../../../../../assets/icons/delete-file.png" alt="">
                                             </div>
                         
                                         </div>
                                         <div class="button-grup disabled" style="gap: 3px !important;">
                                             <div class="img-container">
                                                 <img style="width: 25px; height: 25px;"
                                                     src="../../../../../assets/icons/edit-file.png" alt="">
                                             </div>
                         
                                         </div>
                                     </div>
                                 </th>
                             </tr>
                             <tr>
                             <th>Gider Adı</th>
                             <th style="font-size: 13px;">b=Fiyat(TL)</th>
                             <!-- <th style="font-size: 13px;text-align: center;">Döviz</th>
                             <th style="font-size: 13px;">c=axb=Tutar(TL)</th> -->
                             </tr>
                         
                         </ng-template>
                         <ng-template pTemplate="body" let-product let-rowIndex="rowIndex">
                         
                         
                             <tr >                   
                               <td>{{ product.ad }}</td>
                               <td *ngFor="let type of ['kapi']" >
                                 <ng-container *ngIf="product.katsayilar[type]">
                                   {{ product.katsayilar[type]/28 | currency:' ₺':'symbol':'1.2-2'}}
                                 </ng-container>
                                 <ng-container *ngIf="!product.katsayilar[type]">
                                   {{ '-' }}
                                 </ng-container>
                               </td>
                             </tr>
                         </ng-template>
                         <ng-template pTemplate="footer">
                             <tr>

                                 <td colspan="1" class="text-right" style="font-size: 13px;">Toplam</td>
                                 <td style="font-size: 13px;"> {{toplamGenelGiderTutar| currency:' ₺':'symbol':'1.2-2'}}</td>
                         
                             </tr>
                         </ng-template> 
                 </p-table>
                       



                    </div>

                </div>
            </div>
        </div>
    </div>
</div>

  `

})
export class KabinGenelGiderModalComponent implements OnInit {
    selectedGenelGiderler: any;
    iscilikSetting: any;
    genelGiderler: any = []
    birlesmisVeri: any
    gruplanmisVeri: any = {};
    objectKeys: any;
    genelGiderKatsayi: any;
    toplamGenelGiderTutar: any;
    constructor(public activeModal: NgbActiveModal, private GenelGiderService: GenelGiderService, private GenelGiderKatsayiService: GenelGiderKatsayiService) {

    }
    async ngOnInit() {
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
    }


    Kaydet() {

    }
    cikis() { }



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

