import { Component, Input } from '@angular/core';

@Component({
  selector: 'makine-sasesi-iscilik-giderler-table',
  template: `

<p-table id="row-check" [value]="iscilikGiderler" sortField="gorev.ad" sortMode="single" dataKey="gorev.ad" rowGroupMode="subheader" groupRowsBy="gorev.ad" [tableStyle]="{'min-width': '50rem'}" [style]="{'min-height':' 350px'}" [scrollable]="true"
        scrollHeight="350px" >
            <ng-template pTemplate="header">
                <tr>
                    <th style="text-align: center;color: rgb(99, 0, 0);" colspan="6">
                        İşçilik Giderleri
                        <div class="button-container" style="position: absolute;right: 0;top: 0;">
                            <div class="button-grup " style="gap: 3px !important;">
                                <div class="img-container">
                                    <img style="width: 25px; height: 25px;" src="../../../../../assets/icons/save.png"
                                        alt="">
                                </div>

                            </div>
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



                            <div class="button-grup " style="gap: 3px !important;">
                                <div class="img-container">
                                    <img style="width: 25px; height: 25px;"
                                        src="../../../../../assets/icons/refresh.png" alt="">
                                </div>

                            </div>

                        </div>
                    </th>
                </tr>
                <tr>
                    
                    <th style="font-size: 13px;">Ad</th>
                    <th style="font-size: 13px;"></th>
                    <th style="font-size: 13px;"></th>
                    <th style="font-size: 13px;"></th>
                    <th style="font-size: 13px;"></th>
                </tr>
            </ng-template>
            <ng-template pTemplate="groupheader" let-customer let-rowIndex="rowIndex" let-expanded="expanded">
                <tr>
                    <td colspan="6">
                        <button [pRowToggler]="customer" class="p-button-text p-button-rounded p-button-plain mr-2 " style="width: 30px ; height: 30px;border: none;">
                            <i class="fa-solid fa-caret-down"></i>
                        </button>
                        <span class="font-bold ml-2">{{customer.personel.gorev.ad}}</span>
                    </td>
                </tr>
            </ng-template>
            <ng-template pTemplate="groupfooter" let-customer>
                <tr class="p-rowgroup-footer">
                    <td colspan="6" style="text-align: right">Total Customers</td>
                </tr>
            </ng-template>
            <ng-template pTemplate="rowexpansion" let-customer let-rowIndex="rowIndex">
                <tr >
                    <td>
                        {{customer.personel.ad}}
                    </td>
                   
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </ng-template>
            <ng-template pTemplate="footer">
                <tr>
                    <td colspan="4" class="text-right" style="font-size: 13px;">Toplam</td>
                    <td style="font-size: 13px;">{{0 | currency: 'USD'}}</td>
                </tr>
            </ng-template>
        </p-table>
  `,

})
export class MakineSasesiIscilikGiderlerTableComponent {
    @Input() iscilikGiderler: any;
    @Input() selectedGenelGiderler: any;
}
