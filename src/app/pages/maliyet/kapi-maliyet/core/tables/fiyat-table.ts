import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'kapi-fiyat-table',
  template: `
        <!-- <table class="yks_table_group ">
            <tbody>
                <tr style="height: 25px !important;">
                    <td class="yks_td_label" style="border-left: #000000; text-align: end; text-align: end;">

                        <label style=" min-width: 160px; font-weight: 600; font-size: 13px; color: #7a0000;">Peşin Fiyat:
                        </label>
                    </td>
                    <td style="width: 100%;">

                        <label style=" min-width: 60px; 
                    font-weight: 600; 
                    font-size: 13px; 
                    color: #666666;">

                            <span> 0 ₺ </span>


                        </label>
                    </td>

                </tr>
                <tr style="height: 25px !important;">
                    <td class="yks_td_label" style="border-left: #000000; text-align: end; text-align: end;">

                        <label style=" min-width: 160px; font-weight: 600; font-size: 13px; color: #7a0000;">60 Gün:
                        </label>
                    </td>
                    <td style="width: 100%;">

                        <label style=" min-width: 60px; 
                    font-weight: 600; 
                    font-size: 13px; 
                    color: #666666;">

                            <span> 0 ₺ </span>


                        </label>
                    </td>

                </tr>

                <tr style="height: 25px !important;">
                    <td class="yks_td_label" style="border-left: #000000; text-align: end; text-align: end;">

                        <label style=" min-width: 160px; font-weight: 600; font-size: 13px; color: #7a0000;">
                            90 gün :
                        </label>
                    </td>
                    <td style="width: 100%;">

                        <label style=" min-width: 60px; 
                    font-weight: 600; 
                    font-size: 13px; 
                    color: #666666;">

                            <span>  0 ₺</span>


                        </label>
                    </td>

                </tr>
                <tr style="height: 25px !important;">
                    <td class="yks_td_label" style="border-left: #000000; text-align: end; text-align: end;">

                        <label style=" min-width: 160px; font-weight: 600; font-size: 13px; color: #7a0000;">
                            120 Gün:
                        </label>
                    </td>
                    <td style="width: 100%;">

                        <label style=" min-width: 60px; 
                    font-weight: 600; 
                    font-size: 13px; 
                    color: #666666;">

                            <span>  0 ₺</span>


                        </label>
                    </td>

                </tr>





            </tbody>
        </table> -->
        <table id="myTable" class="yks_table_group " style="width: 300px;">
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
                  </table>
  
  `,

})
export class KapiFiyatTableComponent  implements OnInit{
    ngOnInit(): void {
       
    }
    @Input() genelGiderler: any;
    @Input() selectedGenelGiderler: any;
    @Input() fiyatList: any[]=[];
}
