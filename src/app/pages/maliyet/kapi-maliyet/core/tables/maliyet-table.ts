import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'kapi-maliyet-table',
  template: `
        <!-- <table class="yks_table_group ">
            <tbody>

                <tr style="height: 25px !important;">
                    <td class="yks_td_label" style="border-left: #000000; text-align: end; text-align: end;">

                        <label style=" min-width: 160px; font-weight: 600; font-size: 13px; color: #7a0000;">KASA:
                        </label>
                    </td>
                    <td style="width: 100%;">

                        <label style=" min-width: 60px; 
                    font-weight: 600; 
                    font-size: 13px; 
                    color: #666666;">

                            <span *ngIf="kasaToplam"> {{kasaToplam}} ₺ </span>
                            <span *ngIf="!kasaToplam"> 0 ₺ </span>


                        </label>
                    </td>

                </tr>
                <tr style="height: 25px !important;">
                    <td class="yks_td_label" style="border-left: #000000; text-align: end; text-align: end;">

                        <label style=" min-width: 160px; font-weight: 600; font-size: 13px; color: #7a0000;">PANEL:
                        </label>
                    </td>
                    <td style="width: 100%;">

                        <label style=" min-width: 60px; 
                    font-weight: 600; 
                    font-size: 13px; 
                    color: #666666;">

                            <span *ngIf="panelToplam"> {{panelToplam}} ₺ </span>
                            <span *ngIf="!panelToplam"> 0 ₺ </span>


                        </label>
                    </td>

                </tr>
                <tr style="height: 25px !important;">
                    <td class="yks_td_label" style="border-left: #000000; text-align: end; text-align: end;">

                        <label style=" min-width: 160px; font-weight: 600; font-size: 13px; color: #7a0000;">MEKANİZMA:
                        </label>
                    </td>
                    <td style="width: 100%;">

                        <label style=" min-width: 60px; 
                    font-weight: 600; 
                    font-size: 13px; 
                    color: #666666;">

                            <span *ngIf="mekanizmaToplam"> {{mekanizmaToplam}} ₺ </span>
                            <span *ngIf="!mekanizmaToplam"> 0 ₺ </span>


                        </label>
                    </td>

                </tr>
                <tr style="height: 25px !important;">
                    <td class="yks_td_label" style="border-left: #000000; text-align: end; text-align: end;">

                        <label style=" min-width: 160px; font-weight: 600; font-size: 13px; color: #7a0000;">İşçilik:
                        </label>
                    </td>
                    <td style="width: 100%;">

                        <label style=" min-width: 60px; 
                    font-weight: 600; 
                    font-size: 13px; 
                    color: #666666;">

                            <span *ngIf="iscilikToplam"> {{iscilikToplam}} ₺ </span>
                            <span *ngIf="!iscilikToplam"> 0 ₺ </span>


                        </label>
                    </td>

                </tr>
                <tr style="height: 25px !important;">
                    <td class="yks_td_label" style="border-left: #000000; text-align: end; text-align: end;">

                        <label style=" min-width: 160px; font-weight: 600; font-size: 13px; color: #7a0000;">Genel
                            Gider:
                        </label>
                    </td>
                    <td style="width: 100%;">

                        <label style=" min-width: 60px; 
                    font-weight: 600; 
                    font-size: 13px; 
                    color: #666666;">

                            <span *ngIf="genelGiderToplam"> {{genelGiderToplam}} ₺ </span>
                            <span *ngIf="!genelGiderToplam"> 0 ₺ </span>


                        </label>
                    </td>

                </tr>

                <tr style="height: 25px !important;">
                    <td class="yks_td_label" style="border-left: #000000; text-align: end; text-align: end;">

                        <label style=" min-width: 160px; font-weight: 600; font-size: 13px; color: #7a0000;">
                            Malzeme :
                        </label>
                    </td>
                    <td style="width: 100%;">

                        <label style=" min-width: 60px; 
                    font-weight: 600; 
                    font-size: 13px; 
                    color: #666666;">

                            <span *ngIf="malzemeToplam"> {{malzemeToplam}} ₺ </span>
                            <span *ngIf="!malzemeToplam"> 0 ₺ </span>

                        </label>
                    </td>

                </tr>
                <tr style="height: 25px !important;">
                    <td class="yks_td_label" style="border-left: #000000; text-align: end; text-align: end;">

                        <label style=" min-width: 160px; font-weight: 600; font-size: 13px; color: #7a0000;">
                            Maliyet Tutarı:
                        </label>
                    </td>
                    <td style="width: 100%;">

                        <label style=" min-width: 60px; 
                    font-weight: 600; 
                    font-size: 13px; 
                    color: #666666;">

                       
                            <span *ngIf="toplamMaliyet"> {{toplamMaliyet}} ₺ </span>
                            <span *ngIf="!toplamMaliyet"> 0 ₺ </span>
                        </label>
                    </td>

                </tr>





            </tbody>
        </table> -->
 
 
        <table id="myTable" class="yks_table_group " style="width:300px;">
                    <thead style="border-bottom: 1px solid #a3a3a3;">
                      <th></th>
                      <th style="font-size: 11px;color: black; width: 160px;text-align: left;">Maliyet</th>
                    </thead>
                    <tbody>
                      <tr style="border-bottom: 1px solid #160e0e;">
                          <td style="font-size: 12px;font-weight: bold;color: gray;text-align: left;padding-left:10px;">Kasa</td>
                          <td style="font-size: 12px;color: gray;text-align: left;padding-left:10px;">{{kasaToplam | currency:' ₺':'symbol':'1.2-2'}} </td>

                      </tr>
                      <tr style="border-bottom: 1px solid #160e0e;">
                          <td style="font-size: 12px;font-weight: bold;color: gray;text-align: left;padding-left:10px;">Panel</td>
                          <td style="font-size: 12px;color: gray;text-align: left;padding-left:10px;">{{panelToplam | currency:' ₺':'symbol':'1.2-2'}} </td>
                          





                      </tr>
                      <tr style="border-bottom: 1px solid #160e0e;">
                          <td style="font-size: 12px;font-weight: bold;color: gray;text-align: left;padding-left:10px;">Mekanizma</td>
                          <td style="font-size: 12px;color: gray;text-align: left;padding-left:10px;">{{mekanizmaToplam | currency:' ₺':'symbol':'1.2-2'}} </td>

                      </tr>
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
export class KapiMaliyetTableComponent {
    @Input() malzemeToplam: any;
    @Input() iscilikToplam: any;
    @Input() toplamMaliyet: any;
    @Input() genelGiderToplam: any;
    @Input() kasaToplam:any
    @Input() panelToplam:any
    @Input() mekanizmaToplam:any


}
