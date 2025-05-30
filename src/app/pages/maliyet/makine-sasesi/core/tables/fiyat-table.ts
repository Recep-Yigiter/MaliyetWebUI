import { Component, Input } from '@angular/core';

@Component({
  selector: 'makine-sasesi-fiyat-table',
  template: `
      <table id="myTable" class="yks_table_group " style="width: 300px;">
                    <thead style="border-bottom: 1px solid #a3a3a3;">
                      <th></th>
                      <th style="font-size: 11px;color: black;">Fiyat</th>

                    </thead>
                    <tbody>

                    <ng-container >
                    <tr style="border-bottom: 1px solid #b4b4b4;">
                          <td style="font-size: 12px;font-weight: bold;color: gray;">Peşin</td>
                          <td style="font-size: 12px;color: gray;">{{pesinFiyat?' ₺'+pesinFiyat.toFixed(2):0| currency:' ₺':'symbol':'1.2-2'}}  </td>

                      </tr>
                      <tr style="border-bottom: 1px solid #b4b4b4;">
                          <td style="font-size: 12px;font-weight: bold;color: gray;">60 Gün</td>
                          <td style="font-size: 12px;color: gray;">{{vade1Fiyat?' ₺'+vade1Fiyat.toFixed(2):0| currency:' ₺':'symbol':'1.2-2'}}  </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #b4b4b4;">
                          <td style="font-size: 12px;font-weight: bold;color: gray;">90 Gün</td>
                          <td style="font-size: 12px;color: gray;">{{vade2Fiyat?' ₺'+vade2Fiyat.toFixed(2):0| currency:' ₺':'symbol':'1.2-2'}}  </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #b4b4b4;">
                          <td style="font-size: 12px;font-weight: bold;color: gray;">120 Gün</td>
                          <td style="font-size: 12px;color: gray;">{{vade3Fiyat?' ₺'+vade3Fiyat.toFixed(2):0| currency:' ₺':'symbol':'1.2-2'}}  </td>
                    </tr> 
  
  
           </ng-container>
       </tbody>
  </table>
  `,

})
export class MakineSasesiFiyatTableComponent {
    @Input() genelGiderler: any;
    @Input() selectedGenelGiderler: any;
    @Input() pesinFiyat: any;
    @Input() vade1Fiyat: any;
    @Input() vade2Fiyat: any;
    @Input() vade3Fiyat: any;
}
