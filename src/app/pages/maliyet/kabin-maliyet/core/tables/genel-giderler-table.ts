import { Component, Input } from '@angular/core';

@Component({
    selector: 'kabin-genel-giderler-table',
    template: `
  <p-table id="row-check" [value]="genelGiderler" [style]="{'min-height':' 400px'}" dataKey="id" [scrollable]="true"
scrollHeight="400px" selectionMode="single" [(selection)]="selectedGenelGiderler">
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
    <th>Gider Adı</th>
    <th style="font-size: 13px;">a=Miktar</th>
    <th style="font-size: 13px;">Birim</th>
    <th style="font-size: 13px;">b=Fiyat(TL)</th>
    <th style="font-size: 13px;text-align: center;">Döviz</th>
    <th style="font-size: 13px;">c=axb=Tutar(TL)</th>
    </tr>

</ng-template>
<ng-template pTemplate="body" let-product let-rowIndex="rowIndex">


    <tr >                   
      <td>{{ product.ad }}</td>
      <td>1</td>
      <td>Adet</td>
      
      <td *ngFor="let type of ['kabin']">
        <ng-container *ngIf="product.katsayilar[type]">
          {{ product.katsayilar[type]/28 | currency:' ₺':'symbol':'1.2-2'}}
        </ng-container>
        <ng-container *ngIf="!product.katsayilar[type]">
          {{ '-' }}
        </ng-container>
      </td>
      <td>TL</td>
      <td>{{ product.tutar | currency:' ₺':'symbol':'1.2-2'}}</td>
    </tr>
</ng-template>
<ng-template pTemplate="footer">
    <tr>
        <td></td>
        <td></td>
        <td colspan="1" class="text-right" style="font-size: 13px;">Toplam</td>
        <td style="font-size: 13px;"> {{genelGiderToplam?' ₺'+genelGiderToplam.toFixed(2):0| currency:' ₺':'symbol':'1.2-2'}}</td>
        <td></td>
        <td></td>
        
       
    </tr>
</ng-template> 
</p-table>
  `,

})
export class KabinGenelGiderlerTableComponent {
    @Input() genelGiderler: any;
    @Input() genelGiderToplam: any;
    @Input() selectedGenelGiderler: any;
}
