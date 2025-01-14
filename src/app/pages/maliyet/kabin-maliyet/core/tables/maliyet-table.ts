import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'kabin-maliyet-table',
  template: `
        <!-- <table class="yks_table_group ">
            <tbody>

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
               
                      <tr style="border-bottom: 1px solid #b4b4b4;">
                          <td style="font-size: 12px;font-weight: bold;color: gray;text-align: left;padding-left:10px;">İşçilik</td>
                          <td style="font-size: 12px;color: gray;text-align: left;padding-left:10px;display:flex; justify-content:space-between; align-item:center;" *ngIf="iscilikToplam">
                            
                          {{iscilikToplam | currency:' ₺':'symbol':'1.2-2'}}
                          <div class="portHeadLightMenu"
                                   style="display: flex;align-items: center;justify-content: center; margin: 0 20px;">
                                   <ul style="display: flex; position: relative;">
                                       <li>
                                         <i (click)="show()" class="fa-solid fa-clipboard" style="font-size: 17px;cursor:pointer;"></i>

                                           <ul [ngClass]="{ 'show': isDropdownOpen }">

                                           <div style="padding:4px 8px">
                                            
                                                  <div style="display:flex; align-item:center;">
                                                      <div style="padding:2px 6px">
                                                          <div style="border-bottom:1px solid;padding:2px 6px;color: white;">
                                                           Ortalama Maaş x Çalışan Sayısı
                                                          </div>
                                                          <div style="padding:2px 6px;color: white;">
                                                               28 (Aylık Mesai) x Üretim Sayısı
                                                          </div>
                                                      </div>
                                                  </div>
                                           </div>
                                           </ul>
                                       </li>
                                   </ul>
                               </div>
                             </td>
                          <td style="font-size: 12px;color: gray;text-align: left;padding-left:10px;display:flex; justify-content:space-between; align-item:center;" *ngIf="!iscilikToplam">
                            {{0 | currency:' ₺':'symbol':'1.2-2'}}
                             
                            
                             <div class="portHeadLightMenu"
                                   style="display: flex;align-items: center;justify-content: center; margin: 0 20px;">
                                   <ul style="display: flex; position: relative;">
                                       <li>
                                         <i (click)="show()" class="fa-solid fa-clipboard" style="font-size: 17px;cursor:pointer;"></i>

                                           <ul [ngClass]="{ 'show': isDropdownOpen }">

                                           <div style="padding:4px 8px">
                                            
                                                  <div style="display:flex; align-item:center;">
                                                      <div style="padding:2px 6px">
                                                          <div style="border-bottom:1px solid;padding:2px 6px;color: white;">
                                                           Ortalama Maaş x Çalışan Sayısı
                                                          </div>
                                                          <div style="padding:2px 6px;color: white;">
                                                               28 (Aylık Mesai) x Üretim Sayısı
                                                          </div>
                                                      </div>
                                                  </div>
                                           </div>
                                           </ul>
                                       </li>
                                   </ul>
                               </div>
                            </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #b4b4b4;">
                          <td style="font-size: 12px;font-weight: bold;color: gray;text-align: left;padding-left:10px;">Genel Giderler</td>
                          <td style="font-size: 12px;color: gray;text-align: left;padding-left:10px;" *ngIf="genelGiderToplam">{{genelGiderToplam | currency:' ₺':'symbol':'1.2-2'}} </td>
                          <td style="font-size: 12px;color: gray;text-align: left;padding-left:10px;" *ngIf="!genelGiderToplam">{{0 | currency:' ₺':'symbol':'1.2-2'}} </td>

                      </tr>
                      <tr style="border-bottom: 1px solid #b4b4b4;">
                          <td style="font-size: 12px;font-weight: bold;color: gray;text-align: left;padding-left:10px;">Malzeme Giderler</td>
                          <td style="font-size: 12px;color: gray;text-align: left;padding-left:10px;" *ngIf="malzemeToplam">{{malzemeToplam | currency:' ₺':'symbol':'1.2-2'}} </td>
                          <td style="font-size: 12px;color: gray;text-align: left;padding-left:10px;" *ngIf="!malzemeToplam">{{0 | currency:' ₺':'symbol':'1.2-2'}} </td>

                      </tr>
                      <tr style="border-bottom: 1px solid #b4b4b4;">
                          <td style="font-size: 12px;font-weight: bold;color: gray;text-align: left;padding-left:10px;">TOPLAM</td>
                          <td style="font-size: 12px;color: black;text-align: left;padding-left:10px;font-weight:bold;" *ngIf="toplamMaliyet">{{toplamMaliyet | currency:' ₺':'symbol':'1.2-2'}} </td>
                          <td style="font-size: 12px;color: black;text-align: left;padding-left:10px;font-weight:bold;" *ngIf="!toplamMaliyet">{{0 | currency:' ₺':'symbol':'1.2-2'}} </td>

                      </tr>
  
  
                    </tbody>
                  </table>
  `,

})
export class KabinMaliyetTableComponent {
    @Input() malzemeToplam: any;
    @Input() iscilikToplam: any;
    @Input() toplamMaliyet: any;
    @Input() genelGiderToplam: any;
    @Input() kasaToplam:any
    @Input() panelToplam:any
    @Input() mekanizmaToplam:any

     show() {
        this.isDropdownOpen = !this.isDropdownOpen;
      }
      selectedTab:any

      isDropdownOpen = false;
    
      @HostListener('document:click', ['$event'])
      onDocumentClick(event: MouseEvent) {
        const clickedInside =
          event.target instanceof HTMLElement &&
          event.target.closest('.portHeadLightMenu');
    
        if (!clickedInside) {
          this.isDropdownOpen = false;
        }
      }
}
