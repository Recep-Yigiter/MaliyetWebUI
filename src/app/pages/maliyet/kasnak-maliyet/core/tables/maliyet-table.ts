import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'kasnak-maliyet-table',
  template: `
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
                                         <i (click)="showIscilikGider()" class="fa-solid fa-clipboard" style="font-size: 17px;cursor:pointer;"></i>

                                           <ul [ngClass]="{ 'show': isDropdownOpenIscilikGider }">

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
                                         <i (click)="showIscilikGider()" class="fa-solid fa-clipboard" style="font-size: 17px;cursor:pointer;"></i>

                                           <ul [ngClass]="{ 'show': isDropdownOpenIscilikGider }">

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
                          <td style="font-size: 12px;color: gray;text-align: left;padding-left:10px;display:flex; justify-content:space-between; align-item:center;"  *ngIf="genelGiderToplam">{{genelGiderToplam | currency:' ₺':'symbol':'1.2-2'}}
                          <div class="portHeadLightMenu"
                                   style="display: flex;align-items: center;justify-content: center; margin: 0 20px;">
                                   <ul style="display: flex; position: relative;">
                                       <li>
                                         <i (click)="showGenelGider()" class="fa-solid fa-clipboard" style="font-size: 17px;cursor:pointer;"></i>

                                           <ul [ngClass]="{ 'show': isDropdownOpenGenelGider }">

                                           <div style="padding:4px 8px">
                                            
                                                  <div style="display:flex; align-item:center;">
                                                      <div style="padding:2px 6px">
                                                          <div style="border-bottom:1px solid;padding:2px 6px;color: white;">
                                                           Toplam Genel Gider (Gün)
                                                          </div>
                                                          <div style="padding:2px 6px;color: white;">
                                                                Üretim Sayısı
                                                          </div>
                                                      </div>
                                                  </div>
                                           </div>
                                           </ul>
                                       </li>
                                   </ul>
                               </div>
                        </td>
                          <td style="font-size: 12px;color: gray;text-align: left;padding-left:10px;display:flex; justify-content:space-between; align-item:center;" *ngIf="!genelGiderToplam">
                            {{0 | currency:' ₺':'symbol':'1.2-2'}}
                            <div class="portHeadLightMenu"
                                   style="display: flex;align-items: center;justify-content: center; margin: 0 20px;">
                                   <ul style="display: flex; position: relative;">
                                       <li>
                                         <i (click)="showGenelGider()" class="fa-solid fa-clipboard" style="font-size: 17px;cursor:pointer;"></i>

                                           <ul [ngClass]="{ 'show': isDropdownOpenGenelGider }">

                                           <div style="padding:4px 8px">
                                            
                                                  <div style="display:flex; align-item:center;">
                                                      <div style="padding:2px 6px">
                                                          <div style="border-bottom:1px solid;padding:2px 6px;color: white;">
                                                           Toplam Genel Gider (Gün)
                                                          </div>
                                                          <div style="padding:2px 6px;color: white;">
                                                                Üretim Sayısı
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
export class KasnakMaliyetTableComponent {
    @Input() malzemeToplam: any;
        @Input() iscilikToplam: any;
        @Input() toplamMaliyet: any;
        @Input() genelGiderToplam: any;
    
    
        isDropdownOpenIscilikGider:any = false;
         showIscilikGider() {
            this.isDropdownOpenIscilikGider = !this.isDropdownOpenIscilikGider;
            this.isDropdownOpenGenelGider = false;
          }
    
    
        isDropdownOpenGenelGider:any = false;
         showGenelGider() {
            this.isDropdownOpenGenelGider = !this.isDropdownOpenGenelGider;
            this.isDropdownOpenIscilikGider=false;
          }
    
    
    
        
          @HostListener('document:click', ['$event'])
          onDocumentClick(event: MouseEvent) {
            const clickedInside =
              event.target instanceof HTMLElement &&
              event.target.closest('.portHeadLightMenu');
        
            if (!clickedInside) {
              this.isDropdownOpenIscilikGider = false;
              this.isDropdownOpenGenelGider = false;
            }
          }
    
          
         
    }
    