import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StokSelectModalComponents } from 'src/shared/dialogs/stok-selected-modal';

@Component({
    selector: 'buton-malzeme-giderler-table',
    template: `

<p-table id="row-check" [value]="malzemeGiderler" [style]="{'min-height':' 450px'}" [scrollable]="true"
            scrollHeight="450px" selectionMode="single" [(selection)]="selectedMalzemeGiderler">
            <ng-template pTemplate="header">
                <tr>
                    <!-- <th style="width: 50px;font-size: 13px;" rowspan="3">Sıra No</th> -->
                    <th style="width: 50px;font-size: 13px;" rowspan="3"></th>
                    <th style="text-align: center;color: rgb(99, 0, 0);" colspan="6">
                   <div style='height:25px;padding:0.3rem 1rem;'></div> 
               
                        <div class="button-container" style="position: absolute;left: 0;top: 0;">
                            
                            <div (click)="stokEkle()" class="button-grup " style="gap: 3px !important;">
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
                    <th style="font-size: 13px;">Malzeme Adı</th>
                    <th style="font-size: 13px;">a=Miktar</th>
                    <th style="font-size: 13px;">Birim</th>
                    <th style="font-size: 13px;">b=Fiyat(TL)</th>
                    <th style="font-size: 13px;text-align: center;">Döviz</th>
                    <th style="font-size: 13px;">c=axb=Malzeme Tutarı(TL)</th>

                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-product let-rowIndex="rowIndex">
                <tr [pSelectableRow]="product" [pSelectableRowIndex]="rowIndex" [pEditableRow]="product">
                  
                    <td> <button (click)="deleteItem(rowIndex)" style="color: rgb(99, 0, 0); font-style:italic;font-weight:bold;border:1px solid gray;">KALDIR</button> </td>
                    <td style="font-size: 12px;font-weight: bold;color: gray;text-align: left;padding-left:10px;">{{ product.stok.ad }}</td>
                    <td style="font-size: 12px;color: gray;text-align: right;padding-left:10px;" [pEditableColumn]="product.miktar" pEditableColumnField="miktar">
                        <p-cellEditor>
                            <ng-template pTemplate="input">
                                <input   form-control [(ngModel)]="product.miktar" name="miktar"
                                    class="form-control shadow-none form-control-nullable"
                                    id="exampleFormControlInput1">
                            </ng-template>
                            <ng-template pTemplate="output">
                                {{product.miktar }}
                            </ng-template>
                        </p-cellEditor>
                    </td>
                    <td style="font-size: 12px;color: gray;text-align: left;padding-left:10px;">{{ product.stok.birim }}</td>
                    <td style="font-size: 12px;color: gray;text-align: left;padding-left:10px;">{{ product.stok.birimFiyat | currency:' ₺':'symbol':'1.2-2'}}</td>
                    <td style="font-size: 12px;color: gray;text-align: left;padding-left:10px;">{{ product.stok.dovizCinsi }}</td>
                    <td style="font-size: 12px;color: gray;text-align: left;padding-left:10px;">{{ product.stok.dovizFiyat*product.miktar | currency:' ₺':'symbol':'1.2-2'}}</td>
                </tr>
            </ng-template>
            <ng-template pTemplate="footer">
                <tr>
                    <td colspan="6" class="text-right" style="font-size: 13px;">Toplam</td>
                    <td style="font-size: 13px;">{{malzemeToplam | currency: '₺'}}</td>
                </tr>
            </ng-template>
        </p-table>
  `,

})
export class ButonMalzemeGiderlerTableComponent {
    @Input() malzemeGiderler: any;
    @Input() selectedMalzemeGiderler: any;
    @Input() malzemeToplam: any;
    @Output() public childFuncStokEkle: EventEmitter<any> = new EventEmitter();
    /**
     *
     */
    constructor(private NgbModal: NgbModal) {


    }

    deleteItem(index: number): void {
        this.malzemeGiderler.splice(index, 1);

    }



    stokEkle() {
        const modalRef = this.NgbModal.open(StokSelectModalComponents, {
            size: 'lg',
            backdrop: 'static',
        });
        modalRef.componentInstance.confirmationBoxTitle = 'Stok Listesi';
        modalRef.result.then((stoks) => {
            if (stoks != false) {

                stoks.forEach(element => {
                    var newValue = {

                        stok: element,
                        miktar: element.miktar ? element.miktar : 0
                    }
                    const customerExists = this.malzemeGiderler.some(customer => customer.stokId === newValue.stok.id);

                    if (customerExists) {
                        alert(`Bu ${element.ad} zaten mevcut! `);
                        return;
                    }
                    this.malzemeGiderler = [...this.malzemeGiderler, newValue];

                    this.childFuncStokEkle.emit(this.malzemeGiderler)
                });



            }
        });
    }





}
