import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IscilikGiderService } from 'src/app/core/services/repository/iscilik-gider.service';
import { PersonelService } from 'src/app/core/services/repository/personel.service';
import { UpdatePersonelComponent } from 'src/app/pages/tanimlar/personel/update-personel/update-personel.component';
import { DeleteModalComponents } from 'src/shared/dialogs/informations/delete-modal';
import { PersonelSelectModalComponents } from 'src/shared/dialogs/personel-selected-modal';

@Component({
    selector: 'suspansiyon-iscilik-giderler-table',
    template: `

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

                            <div (click)="personelEkle()" class="button-grup " style="gap: 3px !important;">
                                <div class="img-container">
                                    <img style="width: 25px; height: 25px;"
                                        src="../../../../../assets/icons/add-file.png" alt="">
                                </div>

                            </div>

                            <div (click)="hardDelete()" class="button-grup " style="gap: 3px !important;">
                                <div class="img-container">
                                    <img style="width: 25px; height: 25px;"
                                        src="../../../../../assets/icons/delete-file.png" alt="">
                                </div>

                            </div>

                            <div (click)="update()" class="button-grup " style="gap: 3px !important;">
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
            <button (click)="deleteItem(customer)" style="color: rgb(99, 0, 0); font-style:italic;font-weight:bold;border:1px solid gray;">KALDIR</button>{{customer.personel.ad}}
            </td>
            <td>
                <span class="ml-1 vertical-align-middle"> </span>
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
export class SuspansiyonIscilikGiderlerTableComponent {
    @Input() iscilikGiderler: any;
    @Input() iscilikToplam: any;
    @Input() selectedIscilikGiderler: any;
    @Output() public childFunc: EventEmitter<any> = new EventEmitter();
    @Output() public personelChildFunc: EventEmitter<any> = new EventEmitter();



    constructor(private PersonelService: PersonelService, private NgbModal: NgbModal,private IscilikGiderService:IscilikGiderService) {


    }

    hardDelete() {
          if (this.selectedIscilikGiderler) {
            const modalRef = this.NgbModal.open(DeleteModalComponents, {
              size: 'sm',
              backdrop: 'static',
            });
        
            modalRef.result.then(async(event) => {
              if (event == true) {
                this.IscilikGiderService.delete(this.selectedIscilikGiderler.id, async() => {
                    this.iscilikGiderler = this.iscilikGiderler.filter(c => c !== this.selectedIscilikGiderler);
                    this.childFunc.emit(this.iscilikGiderler)
                });
              }
            });
          }
     
    }
    update(){
        if (this.selectedIscilikGiderler) {
            const modalRef = this.NgbModal.open(UpdatePersonelComponent, {
              size: 'md',
              backdrop: 'static',
            });
            modalRef.componentInstance.data = this.selectedIscilikGiderler.personel;
            modalRef.result.then(async (item) => {
              if (item) {
                 var oldValue = this.iscilikGiderler.filter(c => c.personel.id === item.id)[0];
                 oldValue.personel=item

              }
            });
          }
    }



    deleteItem(item: any): void {
        this.iscilikGiderler = this.iscilikGiderler.filter(c => c !== item);
        this.childFunc.emit(this.iscilikGiderler)
    }

    personeller: any;
    async personelEkle() {
        const modalRef = this.NgbModal.open(PersonelSelectModalComponents, {
            size: 'lg',
            backdrop: 'static',
        });
        modalRef.componentInstance.confirmationBoxTitle = 'Personel Listesi';
        modalRef.result.then((personels) => {
            if (personels != false) {


                personels.forEach(element => {
                    var newValue = {
                        id: "bb4913c6-3205-480d-9122-7b24d160c4db",
                        isDeleted: false,
                        olusturmaTarihi: "2002-12-12T00:00:00",
                        personel: element,
                        personelId: element.id,
                        kabinId: null,
                        butonId: null,
                        kapiId: null,
                        kasnakId: null,
                        makineSasesiId: null,
                        suspansiyonId: null
                    }
                    const customerExists = this.iscilikGiderler.some(customer => customer.personel.id === newValue.personel.id);

                    if (customerExists) {
                        alert(`Bu ${element.ad} zaten mevcut! `);
                        return;
                    }
                    this.iscilikGiderler = [...this.iscilikGiderler, newValue];
                });

                this.personelChildFunc.emit(this.iscilikGiderler)
            }
        });
    }







}
