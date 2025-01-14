import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'makine-sasesi-maliyet-table',
  template: `
        <table id="myTable" class="yks_table_group " style="width:300px;">
         <thead style="border-bottom: 1px solid #a3a3a3;">
           <th></th>
           <th style="font-size: 11px;color: black; width: 160px;text-align: left;">Maliyet</th>
         </thead>
         <tbody>
          
           <tr style="border-bottom: 1px solid #160e0e;">
               <td style="font-size: 12px;font-weight: bold;color: gray;text-align: left;padding-left:10px;">İşçilik</td>
               <td style="font-size: 12px;color: gray;text-align: left;padding-left:10px;" *ngIf="iscilikToplam">{{iscilikToplam | currency:' ₺':'symbol':'1.2-2'}} </td>
               <td style="font-size: 12px;color: gray;text-align: left;padding-left:10px;" *ngIf="!iscilikToplam">{{0 | currency:' ₺':'symbol':'1.2-2'}} </td>
           </tr>
           <tr style="border-bottom: 1px solid #160e0e;">
               <td style="font-size: 12px;font-weight: bold;color: gray;text-align: left;padding-left:10px;">Genel Giderler</td>
               <td style="font-size: 12px;color: gray;text-align: left;padding-left:10px;" *ngIf="iscilikToplam">{{genelGiderToplam | currency:' ₺':'symbol':'1.2-2'}} </td>
               <td style="font-size: 12px;color: gray;text-align: left;padding-left:10px;" *ngIf="!iscilikToplam">{{0 | currency:' ₺':'symbol':'1.2-2'}} </td>
           </tr>
           <tr style="border-bottom: 1px solid #160e0e;">
               <td style="font-size: 12px;font-weight: bold;color: gray;text-align: left;padding-left:10px;">Malzeme Giderler</td>
               <td style="font-size: 12px;color: gray;text-align: left;padding-left:10px;" *ngIf="iscilikToplam">{{malzemeToplam | currency:' ₺':'symbol':'1.2-2'}} </td>
               <td style="font-size: 12px;color: gray;text-align: left;padding-left:10px;" *ngIf="!iscilikToplam">{{0 | currency:' ₺':'symbol':'1.2-2'}} </td>
           </tr>
           <tr style="border-bottom: 1px solid #160e0e;">
               <td style="font-size: 12px;font-weight: bold;color: gray;text-align: left;padding-left:10px;">TOPLAM</td>
               <td style="font-size: 12px;color: black;text-align: left;padding-left:10px;font-weight:bold;" *ngIf="toplamMaliyet">{{toplamMaliyet | currency:' ₺':'symbol':'1.2-2'}} </td>
               <td style="font-size: 12px;color: black;text-align: left;padding-left:10px;font-weight:bold;" *ngIf="!toplamMaliyet">{{0 | currency:' ₺':'symbol':'1.2-2'}} </td>
           </tr>
         </tbody>
    </table>
  `,
})
export class MakineSasesiMaliyetTableComponent {
    @Input() malzemeToplam: any;
    @Input() iscilikToplam: any;
    @Input() toplamMaliyet: any;
    @Input() genelGiderToplam: any;
    @Input() kasaToplam:any
    @Input() panelToplam:any
    @Input() mekanizmaToplam:any

}
