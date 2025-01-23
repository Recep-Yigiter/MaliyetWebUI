import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'kapi-maliyet-table',
  template: `
 
 
 <table id="myTable" class="yks_table_group " style="width:450px;">
                    <thead style="border-bottom: 1px solid #a3a3a3;">
                      <th style="width:370px"></th>
                      <th style="font-size: 11px;color: gray; width: 160px;text-align: left;">Kasa</th>
                      <th style="font-size: 11px;color: gray; width: 160px;text-align: left;">Panel</th>
                      <th style="font-size: 11px;color: gray; width: 160px;text-align: left;">Mekanizma</th>
                      <th style="font-size: 11px;color: gray; width: 160px;text-align: left;">TOPLAM</th>
                    </thead>
                    <tbody>
               
                      <tr style="border-bottom: 1px solid #b4b4b4;">
                          <td style="font-size: 12px;font-weight: bold;color: gray;text-align: left;padding-left:10px;">İşçilik</td>
                          <td style="font-size: 12px;color: gray;text-align: left;padding-left:10px;">{{kasaIscilikToplam?'₺'+kasaIscilikToplam.toFixed(2):0 | currency:' ₺':'symbol':'1.2-2'}}</td>
                          <td style="font-size: 12px;color: gray;text-align: left;padding-left:10px;">{{panelIscilikToplam?'₺'+panelIscilikToplam.toFixed(2):0 | currency:' ₺':'symbol':'1.2-2'}}</td>
                          <td style="font-size: 12px;color: gray;text-align: left;padding-left:10px;">{{mekanizmaIscilikToplam?'₺'+mekanizmaIscilikToplam.toFixed(2):0 | currency:' ₺':'symbol':'1.2-2'}}</td>
                          <td style="font-size: 12px;color: gray;text-align: left;padding-left:10px;display:flex; justify-content:space-between; align-item:center;" >
                             {{iscilikToplam?'₺'+iscilikToplam.toFixed(2):0 | currency:' ₺':'symbol':'1.2-2'}}
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
                          <td style="font-size: 12px;color: gray;text-align: left;padding-left:10px;">{{kasaGenelGiderToplam?'₺'+(kasaGenelGiderToplam).toFixed(2):0 | currency:' ₺':'symbol':'1.2-2'}}</td>
                          <td style="font-size: 12px;color: gray;text-align: left;padding-left:10px;">{{panelGenelGiderToplam?'₺'+(panelGenelGiderToplam).toFixed(2):0 | currency:' ₺':'symbol':'1.2-2'}}</td>
                          <td style="font-size: 12px;color: gray;text-align: left;padding-left:10px;">{{mekanizmaGenelGiderToplam?'₺'+(mekanizmaGenelGiderToplam).toFixed(2):0 | currency:' ₺':'symbol':'1.2-2'}}</td>
                          <td style="font-size: 12px;color: gray;text-align: left;padding-left:10px;display:flex; justify-content:space-between; align-item:center;">
                              {{genelGiderToplam?'₺'+genelGiderToplam.toFixed(2):0 | currency:' ₺':'symbol':'1.2-2'}}
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
                          <td style="font-size: 12px;font-weight: bold;color: gray;text-align: left;padding-left:10px;">Malz. Giderler</td>
                          <td style="font-size: 12px;color: gray;text-align: left;padding-left:10px;">{{kasaToplam?'₺'+kasaToplam.toFixed(2):0 | currency:' ₺':'symbol':'1.2-2'}}</td>
                          <td style="font-size: 12px;color: gray;text-align: left;padding-left:10px;">{{panelToplam?'₺'+panelToplam.toFixed(2):0 | currency:' ₺':'symbol':'1.2-2'}}</td>
                          <td style="font-size: 12px;color: gray;text-align: left;padding-left:10px;">{{mekanizmaToplam?'₺'+mekanizmaToplam.toFixed(2):0 | currency:' ₺':'symbol':'1.2-2'}}</td>
                          <td style="font-size: 12px;color: gray;text-align: left;padding-left:10px;">{{malzemeToplam?'₺'+malzemeToplam.toFixed(2):0 | currency:' ₺':'symbol':'1.2-2'}} </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #b4b4b4;">
                          <td style="font-size: 12px;font-weight: bold;color: gray;text-align: left;padding-left:10px;">TOPLAM</td>
                          <td style="font-size: 12px;color: black;text-align: left;padding-left:10px;font-weight:bold;">{{kasaToplam? '₺'+(kasaToplam+kasaIscilikToplam+kasaGenelGiderToplam).toFixed(2):0 | currency:' ₺':'symbol':'1.2-2'}}</td>
                          <td style="font-size: 12px;color: black;text-align: left;padding-left:10px;font-weight:bold;">{{panelToplam? '₺'+(panelToplam+panelIscilikToplam+panelGenelGiderToplam).toFixed(2):0 | currency:' ₺':'symbol':'1.2-2'}}</td>
                          <td style="font-size: 12px;color: black;text-align: left;padding-left:10px;font-weight:bold;">{{mekanizmaToplam? '₺'+(mekanizmaToplam+mekanizmaIscilikToplam+mekanizmaGenelGiderToplam).toFixed(2):0 | currency:' ₺':'symbol':'1.2-2'}}</td>
                          <td style="font-size: 12px;color: red;text-align: left;padding-left:10px;font-weight:bold;" >{{toplamMaliyet?'₺'+(iscilikToplam+genelGiderToplam+malzemeToplam).toFixed(2):0 | currency:' ₺':'symbol':'1.2-2'}} </td>
                      </tr>
                    </tbody>
                  </table>
 `,

})
export class KapiMaliyetTableComponent {
       @Input() malzemeToplam: any;
       @Input() genelGiderToplam: any;
       @Input() iscilikToplam: any;
       @Input() toplamMaliyet: any;

       //malzeme
       @Input() kasaToplam: any;
       @Input() panelToplam: any;
       @Input() mekanizmaToplam: any;

       //işçilik
       @Input() kasaIscilikToplam: any;
       @Input() panelIscilikToplam: any;
       @Input() mekanizmaIscilikToplam: any;

       @Input() kasaGenelGiderToplam: any;
       @Input() panelGenelGiderToplam: any;
       @Input() mekanizmaGenelGiderToplam: any;

   
   
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
   