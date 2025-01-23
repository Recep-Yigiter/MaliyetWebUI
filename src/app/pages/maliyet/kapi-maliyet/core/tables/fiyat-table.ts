import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'kapi-fiyat-table',
  template: `
     
        <!-- <table id="myTable" class="yks_table_group " style="width: 300px;">
                    <thead style="border-bottom: 1px solid #a3a3a3;">
                      <th></th>
                      <th style="font-size: 11px;color: black;">KASA</th>
                      <th style="font-size: 11px;color: black;">PANEL</th>
                      <th style="font-size: 11px;color: black;">MEKANIZMA</th>
                    </thead>
                    <tbody>

                    <ng-container *ngIf="!fiyatList">
                    <tr style="border-bottom: 1px solid #160e0e;">
                          <td style="font-size: 12px;font-weight: bold;color: gray;">Peşin</td>
                          <td style="font-size: 12px;color: gray;">{{0| currency:' ₺':'symbol':'1.2-2'}}  </td>
                          <td style="font-size: 12px;color: gray;">{{0| currency:' ₺':'symbol':'1.2-2'}}  </td>
                          <td style="font-size: 12px;color: gray;" >{{0| currency:' ₺':'symbol':'1.2-2'}}  </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #160e0e;">
                          <td style="font-size: 12px;font-weight: bold;color: gray;">60 Gün</td>
                          <td style="font-size: 12px;color: gray;">{{0| currency:' ₺':'symbol':'1.2-2'}}  </td>
                          <td style="font-size: 12px;color: gray;">{{0| currency:' ₺':'symbol':'1.2-2'}}  </td>
                          <td style="font-size: 12px;color: gray;" >{{0| currency:' ₺':'symbol':'1.2-2'}}  </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #160e0e;">
                          <td style="font-size: 12px;font-weight: bold;color: gray;">90 Gün</td>
                          <td style="font-size: 12px;color: gray;">{{0| currency:' ₺':'symbol':'1.2-2'}}  </td>
                          <td style="font-size: 12px;color: gray;">{{0| currency:' ₺':'symbol':'1.2-2'}}  </td>
                          <td style="font-size: 12px;color: gray;" >{{0| currency:' ₺':'symbol':'1.2-2'}}  </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #160e0e;">
                          <td style="font-size: 12px;font-weight: bold;color: gray;">120 Gün</td>
                          <td style="font-size: 12px;color: gray;">{{0| currency:' ₺':'symbol':'1.2-2'}}  </td>
                          <td style="font-size: 12px;color: gray;">{{0| currency:' ₺':'symbol':'1.2-2'}}  </td>
                          <td style="font-size: 12px;color: gray;" >{{0| currency:' ₺':'symbol':'1.2-2'}} </td>
                      </tr>  

  
                    </ng-container>


                    <ng-container *ngIf="fiyatList">
                       <ng-container *ngFor="let item of fiyatList">
                         <tr style="border-bottom: 1px solid #160e0e;">
                             <td style="font-size: 12px;font-weight: bold;color: gray;">{{item.vade}}</td>
                             <td style="font-size: 12px;color: gray;">{{item.kasaFiyat| currency:' ₺':'symbol':'1.2-2'}}  </td>
                             <td style="font-size: 12px;color: gray;">{{item.panelFiyat| currency:' ₺':'symbol':'1.2-2'}}  </td>
                             <td style="font-size: 12px;color: gray;" >{{item.mekanizmaFiyat| currency:' ₺':'symbol':'1.2-2'}} </td>
                         </tr> 
                         </ng-container>
                    </ng-container>
                     
  
                    </tbody>
                  </table> -->
  

                  <table id="myTable" class="yks_table_group " style="width: 300px;">
                    <thead style="border-bottom: 1px solid #a3a3a3;">
                      <th></th>
                      <th style="font-size: 11px;color: gray;">Kasa</th>
                      <th style="font-size: 11px;color: gray;">Panel</th>
                      <th style="font-size: 11px;color: gray;">Mekanizma</th>
                      <th style="font-size: 11px;color: black;">Toplam</th>

                    </thead>
                    <tbody>

                    <ng-container >

                    <tr style="border-bottom: 1px solid #b4b4b4;">
                          <td style="font-size: 12px;font-weight: bold;color: gray;">Peşin</td>
                          <td style="font-size: 12px;color: gray;">{{kasaPesinFiyat?' ₺'+kasaPesinFiyat.toFixed(2):0| currency:' ₺':'symbol':'1.2-2'}}  </td>
                          <td style="font-size: 12px;color: gray;">{{panelPesinFiyat?' ₺'+panelPesinFiyat.toFixed(2):0| currency:' ₺':'symbol':'1.2-2'}}  </td>
                          <td style="font-size: 12px;color: gray;">{{mekanizmaPesinFiyat?' ₺'+mekanizmaPesinFiyat.toFixed(2):0| currency:' ₺':'symbol':'1.2-2'}}  </td>
                          <td style="font-size: 12px;color: gray;">{{pesinToplam?' ₺'+pesinToplam.toFixed(2):0| currency:' ₺':'symbol':'1.2-2'}}  </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #b4b4b4;">
                          <td style="font-size: 12px;font-weight: bold;color: gray;">60 Gün</td>
                          <td style="font-size: 12px;color: gray;">{{kasaVade1Fiyat?' ₺'+kasaVade1Fiyat.toFixed(2):0| currency:' ₺':'symbol':'1.2-2'}}  </td>
                          <td style="font-size: 12px;color: gray;">{{panelVade1Fiyat?' ₺'+panelVade1Fiyat.toFixed(2):0| currency:' ₺':'symbol':'1.2-2'}}  </td>
                          <td style="font-size: 12px;color: gray;">{{mekanizmaVade1Fiyat?' ₺'+mekanizmaVade1Fiyat.toFixed(2):0| currency:' ₺':'symbol':'1.2-2'}}  </td>
                          <td style="font-size: 12px;color: gray;">{{vade1Toplam?' ₺'+vade1Toplam.toFixed(2):0| currency:' ₺':'symbol':'1.2-2'}}  </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #b4b4b4;">
                          <td style="font-size: 12px;font-weight: bold;color: gray;">90 Gün</td>
                          <td style="font-size: 12px;color: gray;">{{kasaVade2Fiyat?' ₺'+kasaVade2Fiyat.toFixed(2):0| currency:' ₺':'symbol':'1.2-2'}}  </td>
                          <td style="font-size: 12px;color: gray;">{{panelVade2Fiyat?' ₺'+panelVade2Fiyat.toFixed(2):0| currency:' ₺':'symbol':'1.2-2'}}  </td>
                          <td style="font-size: 12px;color: gray;">{{mekanizmaVade2Fiyat?' ₺'+mekanizmaVade2Fiyat.toFixed(2):0| currency:' ₺':'symbol':'1.2-2'}}  </td>
                          <td style="font-size: 12px;color: gray;">{{vade2Toplam?' ₺'+vade2Toplam.toFixed(2):0| currency:' ₺':'symbol':'1.2-2'}}  </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #b4b4b4;">
                          <td style="font-size: 12px;font-weight: bold;color: gray;">120 Gün</td>
                          <td style="font-size: 12px;color: gray;">{{kasaVade3Fiyat?' ₺'+kasaVade3Fiyat.toFixed(2):0| currency:' ₺':'symbol':'1.2-2'}}  </td>
                          <td style="font-size: 12px;color: gray;">{{panelVade3Fiyat?' ₺'+panelVade3Fiyat.toFixed(2):0| currency:' ₺':'symbol':'1.2-2'}}  </td>
                          <td style="font-size: 12px;color: gray;">{{mekanizmaVade3Fiyat?' ₺'+mekanizmaVade3Fiyat.toFixed(2):0| currency:' ₺':'symbol':'1.2-2'}}  </td>
                          <td style="font-size: 12px;color: gray;">{{vade3Toplam?' ₺'+vade3Toplam.toFixed(2):0| currency:' ₺':'symbol':'1.2-2'}} </td>
                      </tr>  




                    <!-- <tr style="border-bottom: 1px solid #b4b4b4;">
                          <td style="font-size: 12px;font-weight: bold;color: gray;">Peşin</td>
                          <td style="font-size: 12px;color: gray;" *ngIf="pesinFiyat">{{pesinFiyat| currency:' ₺':'symbol':'1.2-2'}}  </td>
                          <td style="font-size: 12px;color: gray;" *ngIf="!pesinFiyat">{{0| currency:' ₺':'symbol':'1.2-2'}}  </td>

                      </tr>
                      <tr style="border-bottom: 1px solid #b4b4b4;">
                          <td style="font-size: 12px;font-weight: bold;color: gray;">60 Gün</td>
                          <td style="font-size: 12px;color: gray;"*ngIf="vade1Fiyat">{{vade1Fiyat| currency:' ₺':'symbol':'1.2-2'}}  </td>
                          <td style="font-size: 12px;color: gray;" *ngIf="!vade1Fiyat">{{0| currency:' ₺':'symbol':'1.2-2'}}  </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #b4b4b4;">
                          <td style="font-size: 12px;font-weight: bold;color: gray;">90 Gün</td>
                          <td style="font-size: 12px;color: gray;"*ngIf="vade2Fiyat">{{vade2Fiyat| currency:' ₺':'symbol':'1.2-2'}}  </td>
                          <td style="font-size: 12px;color: gray;" *ngIf="!vade2Fiyat">{{0| currency:' ₺':'symbol':'1.2-2'}}  </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #b4b4b4;">
                          <td style="font-size: 12px;font-weight: bold;color: gray;">120 Gün</td>
                          <td style="font-size: 12px;color: gray;"*ngIf="vade3Fiyat">{{vade3Fiyat| currency:' ₺':'symbol':'1.2-2'}}  </td>
                          <td style="font-size: 12px;color: gray;" *ngIf="!vade3Fiyat">{{0| currency:' ₺':'symbol':'1.2-2'}}  </td>
                    </tr>  -->
  
           </ng-container>
       </tbody>
  </table>
  `,

})
export class KapiFiyatTableComponent  implements OnInit{
    ngOnInit(): void {
       
    }
    @Input() genelGiderler: any;
    @Input() selectedGenelGiderler: any;
    @Input() fiyatList: any[]=[];

    //pesin
    @Input() kasaPesinFiyat: any;
    @Input() kasaVade1Fiyat: any;
    @Input() kasaVade2Fiyat: any;
    @Input() kasaVade3Fiyat: any;
    @Input() panelPesinFiyat: any;
    @Input() panelVade1Fiyat: any;
    @Input() panelVade2Fiyat: any;
    @Input() panelVade3Fiyat: any;
    @Input() mekanizmaPesinFiyat: any;
    @Input() mekanizmaVade1Fiyat: any;
    @Input() mekanizmaVade2Fiyat: any;
    @Input() mekanizmaVade3Fiyat: any;

    @Input() pesinToplam: any;
    @Input() vade1Toplam: any;
    @Input() vade2Toplam: any;
    @Input() vade3Toplam: any;
}
