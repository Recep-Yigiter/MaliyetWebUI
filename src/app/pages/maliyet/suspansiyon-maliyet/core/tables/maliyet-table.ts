import { Component, Input } from '@angular/core';

@Component({
  selector: 'suspansiyon-maliyet-table',
  template: `
        <table class="yks_table_group ">
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

                            <span> 12.250,70 ₺ </span>


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

                            <span> 12.250,70 ₺ </span>


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

                            <span> {{malzemeToplam}}</span>


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

                            <span> </span>


                        </label>
                    </td>

                </tr>





            </tbody>
        </table>
  `,

})
export class SuspansiyonMaliyetTableComponent {
    @Input() malzemeToplam: any;
}
