import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PersonelService } from 'src/app/core/services/repository/personel.service';

@Component({
  selector: 'kabin-iscilik-giderler-table',
  template: `

<!-- <p-table id="row-check" [value]="iscilikGiderler" sortField="gorev.ad" sortMode="single" dataKey="gorev.ad" rowGroupMode="subheader" groupRowsBy="gorev.ad" [tableStyle]="{'min-width': '50rem'}" [style]="{'min-height':' 448px'}" [scrollable]="true"
        scrollHeight="448px" >
            <ng-template pTemplate="header">
                <tr>
                    <th style="text-align: center;color: rgb(99, 0, 0);" colspan="6">
                    <div style='height:25px;padding:0.3rem 1rem;'></div> 
                        <div class="button-container" style="position: absolute;left: 0;top: 0;">

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
                    <button [pRowToggler]="customer" class="p-button-text p-button-rounded p-button-plain mr-2 " style="width: 30px ; height: 30px;border: none;background-color: transparent;">
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
                    <td style="padding: 0.3rem 0rem 0.3rem 4rem;">
                        {{customer.personel.ad}}
                    </td>
                   
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </ng-template>

        </p-table> -->

        <p-table id="row-check" [value]="iscilikGiderler"
                                rowGroupMode="rowspan"
                                sortField="gorev.ad"
                                sortMode="single"
                                dataKey="personel.id"
                                groupRowsBy="gorev.ad"
                                [tableStyle]="{'min-width': '50rem'}" 
                                [style]="{'min-height':' 448px'}"
                                [scrollable]="true" 
                                selectionMode="single" 
                                [(selection)]="selectedIscilikGiderler"
                                scrollHeight="448px">
        <ng-template pTemplate="header">
                <tr>
                    <th style="text-align: center;color: rgb(99, 0, 0);" colspan="6">
                    <div style='height:25px;padding:0.3rem 1rem;'></div> 
                        <div class="button-container" style="position: absolute;left: 0;top: 0;">

                            <div (click)="personelEkleDialog()" class="button-grup " style="gap: 3px !important;">
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



                           

                        </div>
                    </th>
                </tr>
                <tr>
                    
                    <th style="font-size: 13px;width:6rem;">Gorev</th>
                    <th style="font-size: 13px;">Ad</th>
                    <th style="font-size: 13px;"></th>
                    <th style="font-size: 13px;"></th>
                    <th style="font-size: 13px;"></th>
                    <th style="font-size: 13px;"></th>
                </tr>
        </ng-template>


    <ng-template pTemplate="body" let-customer let-rowIndex="rowIndex" let-rowgroup="rowgroup" let-rowspan="rowspan">
        <tr [pSelectableRow]="customer" [pSelectableRowIndex]="rowIndex">
            <!-- <td>{{rowIndex}}</td> -->
            <td *ngIf="rowgroup" [attr.rowspan]="rowspan">
                <span class="font-bold ml-2" style="text-align:center;display:flex;">{{customer.personel.gorev.ad}}</span>
            </td>
            <td>
            <button (click)="deleteItem(customer)" style="color: rgb(99, 0, 0); font-style:italic;font-weight:bold;border:1px solid gray;">KALDIR</button>   {{customer.personel.ad}}
            </td>
            <td>
                <span class="ml-1 vertical-align-middle"></span>
            </td>
            <td>
               
            </td>
            <td>
                <!-- <p-tag [value]="customer.status" [severity]="getSeverity(customer.status)"></p-tag> -->
            </td>
            <td>
               
            </td>
        </tr>
    </ng-template>
</p-table>

  `,

})
export class KabinIscilikGiderlerTableComponent {
    @Input() iscilikGiderler: any;
    @Input() iscilikToplam: any;
    @Input() selectedIscilikGiderler: any;
    @Output() public childFunc: EventEmitter<any> = new EventEmitter();
    @Output() public personelChildFunc: EventEmitter<any> = new EventEmitter();


    /**
     *
     */
    constructor(private PersonelService:PersonelService) {
        
        
    }

    deleteItem(item: any): void {
        this.iscilikGiderler=  this.iscilikGiderler.filter(c=>c!==item);
        this.childFunc.emit(this.iscilikGiderler)
      }

      personeller:any;
   async personelEkleDialog(){
        this.personeller= (await this.PersonelService.GetAll()).items;

        this.personelChildFunc.emit(this.personeller)
    }
}
