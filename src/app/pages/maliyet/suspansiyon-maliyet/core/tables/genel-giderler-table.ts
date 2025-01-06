import { Component, Input } from '@angular/core';

@Component({
  selector: 'suspansiyon-genel-giderler-table',
  template: `
  <p-table id="row-check" [value]="genelGiderler" [style]="{'min-height':' 350px'}" dataKey="id" [scrollable]="true"
scrollHeight="350px" selectionMode="single" [(selection)]="selectedGenelGiderler">
<ng-template pTemplate="header">
    <tr>
        <th style="width: 50px;font-size: 13px;" rowspan="3">Sıra No</th>
        <th style="text-align: center;color: rgb(99, 0, 0);" colspan="6">Genel Giderleri
            <div class="button-container" style="position: absolute;right: 0;top: 0;">
                <div class="button-grup " style="gap: 3px !important;">
                    <div class="img-container">
                        <img style="width: 25px; height: 25px;" src="../../../../../assets/icons/save.png"
                            alt="">
                    </div>

                </div>
                <div class="button-grup " style="gap: 3px !important;">
                    <div class="img-container">
                        <img style="width: 25px; height: 25px;"
                            src="../../../../../assets/icons/add-file.png" alt="">
                    </div>

                </div>

                <div class="button-grup " style="gap: 3px !important;">
                    <div class="img-container">
                        <img style="width: 25px; height: 25px;"
                            src="../../../../../assets/icons/delete-file.png" alt="">
                    </div>

                </div>

                <div class="button-grup " style="gap: 3px !important;">
                    <div class="img-container">
                        <img style="width: 25px; height: 25px;"
                            src="../../../../../assets/icons/edit-file.png" alt="">
                    </div>

                </div>



                <div class="button-grup " style="gap: 3px !important;">
                    <div class="img-container">
                        <img style="width: 25px; height: 25px;"
                            src="../../../../../assets/icons/refresh.png" alt="">
                    </div>

                </div>


            </div>
        </th>
    </tr>
    <tr>
       
        <th style="font-size: 13px;">Malzeme Adı</th>
        <th style="font-size: 13px;">a=Miktar</th>
        <th style="font-size: 13px;">Birim</th>
        <th style="font-size: 13px;">b=Fiyat(TL)</th>
        <th style="font-size: 13px;text-align: center;">Döviz</th>
        <th style="font-size: 13px;">c=axb=Tutar(TL)</th>
    </tr>
</ng-template>
<ng-template pTemplate="body" let-product let-rowIndex="rowIndex">
    <tr [pSelectableRow]="product" [pSelectableRowIndex]="rowIndex" [pEditableRow]="product">
        <td>{{rowIndex+1}} </td>
        <td>{{ product.ad }}</td>
        <td [pEditableColumn]="product.miktar" pEditableColumnField="miktar">
            <p-cellEditor>
                <ng-template pTemplate="input">
                    <input form-control [(ngModel)]="product.miktar" name="miktar"
                        class="form-control shadow-none form-control-nullable"
                        id="exampleFormControlInput1">
                </ng-template>
                <ng-template pTemplate="output">
                    {{ product.miktar }}
                </ng-template>
            </p-cellEditor>
        </td>
        <td>{{ product.birim }}</td>
        <td>{{ product.birimFiyat }}</td>
        <td>{{ product.dovizCinsi }}</td>
        <td>{{ product.birimFiyat*product.miktar }}</td>
    </tr>
</ng-template>
<ng-template pTemplate="footer">
    <tr>
        <td colspan="6" class="text-right" style="font-size: 13px;">Toplam</td>
        <td style="font-size: 13px;">{{0 | currency: 'USD'}}</td>
    </tr>
</ng-template>
</p-table>
  `,

})
export class SuspansiyonGenelGiderlerTableComponent {
    @Input() genelGiderler: any;
    @Input() selectedGenelGiderler: any;
}
