import { Component, Input } from '@angular/core';

@Component({
  selector: 'kabin-genel-giderler-table',
  template: `
  <p-table id="row-check" [value]="genelGiderler" [style]="{'min-height':' 417px'}" dataKey="id" [scrollable]="true"
scrollHeight="417px" selectionMode="single" [(selection)]="selectedGenelGiderler">
<ng-template pTemplate="header">
    <tr>
        <!-- <th style="width: 50px;font-size: 13px;" rowspan="3">Sıra No</th> -->
        <th style="text-align: center;color: rgb(99, 0, 0);" colspan="6">
        <div style='height:25px;padding:0.3rem 1rem;'></div> 
            <div class="button-container" style="position: absolute;left: 0;top: 0;">
               
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
        <!-- <td>{{rowIndex+1}} </td> -->
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
        <td>{{ product.birimFiyat*product.miktar | currency:' ₺':'symbol':'1.2-2'}}</td>
    </tr>
</ng-template>
<!-- <ng-template pTemplate="footer">
    <tr>
        <td colspan="6" class="text-right" style="font-size: 13px;">Toplam</td>
        <td style="font-size: 13px;">{{0 | currency: 'USD'}}</td>
    </tr>
</ng-template> -->
</p-table>
  `,

})
export class KabinGenelGiderlerTableComponent {
    @Input() genelGiderler: any;
    @Input() selectedGenelGiderler: any;
}
