import { Component, Input, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GorevService } from 'src/app/core/services/repository/gorev.service';
import { IscilikSettingService } from 'src/app/core/services/repository/iscilik-setting.service';

@Component({
    selector: 'app-mekanizma-kapi-grup-iscilik-modal',
    styleUrls: ['../../../create-kapi-grup/create-kapi-grup.component.scss'],
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
                                    <div (click)="Kaydet()" class="button-grup ">
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

                        <kapi-grup-form [span]="170" [label]="'Ortalama Maaş'">
                            <input type="number" disabled="false" form-control [(ngModel)]="frm.ortalamaCalisanMaasi" name="ad"
                                class="form-control shadow-none form-control-nullable"
                                style="height: 26px;  " id="exampleFormControlInput1">
                        </kapi-grup-form>
                        <kapi-grup-form [span]="170" [label]="'Üret. Per. Sayısı'">
                            <input type="number" disabled="false" form-control [(ngModel)]="frm.uretimdekiPersonelSayisi" name="ad"
                                class="form-control shadow-none form-control-nullable"
                                style="height: 26px;  " id="exampleFormControlInput1">
                        </kapi-grup-form>
                        <kapi-grup-form [span]="170" [label]="'Üretim Sayısı'">
                            <input type="number" disabled="false" form-control [(ngModel)]="frm.gunlukUretimSayisi" name="ad"
                                class="form-control shadow-none form-control-nullable"
                                style="height: 26px;  " id="exampleFormControlInput1">
                        </kapi-grup-form>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
  `

})
export class MekanizmaKapiGrupIscilikModalComponent implements OnInit {
    @Input() confirmationBoxTitle;
    @Input() confirmationMessage;
    iscilikSetting:any;
    constructor(public activeModal: NgbActiveModal, private IscilikSettingService: IscilikSettingService) {

    }
    async ngOnInit() {
        this.iscilikSetting = (await this.IscilikSettingService.GetAll()).items.filter(c => c.prosesAdi == "mekanizma")[0];
        this.frm.ortalamaCalisanMaasi = this.iscilikSetting.ortalamaCalisanMaasi;
        this.frm.gunlukUretimSayisi = this.iscilikSetting.gunlukUretimSayisi;
        this.frm.uretimdekiPersonelSayisi = this.iscilikSetting.uretimdekiPersonelSayisi;
    }


    Kaydet() { 
        this.frm.id=this.iscilikSetting.id;
        this.IscilikSettingService.update(this.frm, ()=>{
            this.activeModal.close(true);
        })
    }
    cikis() { }

    frm: any = {
        prosesAdi:"mekanizma",
        ortalamaCalisanMaasi: 0,
        uretimdekiPersonelSayisi: 0,
        gunlukUretimSayisi: 0,
    }
}

