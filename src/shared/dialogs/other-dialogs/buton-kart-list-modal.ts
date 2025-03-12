import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonelService } from 'src/app/core/services/repository/personel.service';
import { BUTON_MODELLER } from 'src/assets/DATA/buton-modeller';
import { ButonListService } from './buton-list.service';
import { ButonService } from 'src/app/core/services/repository/buton.service';
export interface Product {
   id?: string;
   code?: string;
   name?: string;
   description?: string;
   price?: number;
   quantity?: number;
   inventoryStatus?: string;
   category?: string;
   image?: string;
   rating?: number;
}
@Component({
   selector: 'app-Personel-select-modal',
   styleUrls: ['../../modal.scss'],
   providers: [ButonListService],
   template: `


<div class="modal-header "style="    padding: 0rem 0rem;">
  <h4 class="modal-title"></h4>
  <h4 class="modal-title">{{confirmationBoxTitle}} </h4>
  <button type="button" class="btn-close" style="border: none; height: 30px; width: 30px;" aria-label="Close" (click)="activeModal.close(false)">
      <i class="fa-solid fa-xmark"></i>
  </button>
</div>


<div class="">

<app-design w100="width:100%;" displayNone="display:none;">





    <div full-page-filter> </div>
    <div full-page style="height: 100%; padding:10px">



        <!-- <div>
           <tbody>
        <div class="card-list" style="overflow: auto;    max-height: 666px;padding:10px">
  
        <ng-container *ngFor="let item of objectKeys">
        <div  style="width:100% ">
        <strong> {{ item}}</strong>
        </div>
                 
        <ng-container *ngFor="let gider of gruplanmisData[item];let i = index">
        <div (click)="ekle(gider)"  class="card mb-1" >

        <div style="display:flex;">
               <div >
                   <img [src]="gider.img" alt="Kart 1 Resmi" style="object-fit: contain;padding:5px">
                </div>
                <div>
                    <tr class="yks_table_group"  style="display: grid; grid-template-columns: {{105}}px auto">
                       <td class="" >Kontrol Paneli</td>
                       <td class=""  style="padding: 0px 0px 0px 0px; min-width: 185px;color: #212529;border:none">{{item}}</td>
                    </tr>

                    <tr class="yks_table_group"  style="display: grid; grid-template-columns: {{105}}px auto">
                       <td class="" >Buton Yeri</td>
                       <td class=""  style="padding: 0px 0px 0px 0px; min-width: 185px;color: #212529;border:none"> {{gider.ozellikler.sivaAltiUstu}}</td>
                    </tr>
                    
                    <tr class="yks_table_group"  style="display: grid; grid-template-columns: {{105}}px auto">
                       <td class="" >Ekran </td>
                       <td class=""  style="padding: 0px 0px 0px 0px; min-width: 185px;color: #212529;border:none"> {{gider.ozellikler.ekran}}</td>
                    </tr>

                    <tr class="yks_table_group"  style="display: grid; grid-template-columns: {{105}}px auto">
                       <td class="" >Kaplama</td>
                       <td class=""  style="padding: 0px 0px 0px 0px; min-width: 185px;color: #212529;border:none"> {{gider.ozellikler.kaplama}}</td>
                    </tr>

                    <tr class="yks_table_group"  style="display: grid; grid-template-columns: {{105}}px auto">
                       <td class="" >Buton Tipi</td>
                       <td class=""  style="padding: 0px 0px 0px 0px; min-width: 185px;color: #212529;border:none"> {{gider.ozellikler.butonTipi}}</td>
                    </tr>

                    <tr class="yks_table_group"  style="display: grid; grid-template-columns: {{105}}px auto">
                       <td class="" >Sistem </td>
                       <td class=""  style="padding: 0px 0px 0px 0px; min-width: 185px;color: #212529;border:none"> {{gider.ozellikler.sistem}}</td>
                    </tr>
                </div>
        </div>
                
                <h2>{{gider.ad}}</h2>
          


                 
            </div>
            </ng-container>      
      
            </ng-container>
       
            
           
          
          
    </div>

           </tbody>
        </div>   -->



        <p-table id="row-check" [value]="data" [style]="{'min-height':' 600px'}" [scrollable]="true"
            scrollHeight="600px" selectionMode="single" >

            <ng-template pTemplate="body" let-product let-rowIndex="rowIndex">
                <tr (click)="onSelectionChanged(product)" [pSelectableRow]="product" [pSelectableRowIndex]="rowIndex" [pEditableRow]="product">
                  
                    <td>


                    <div style="display:flex; ">
                        <div style="width: 135px; 
    height: 135px; border:1px solid rgb(201, 201, 201);">
   
                           <img [src]="product.img" alt="Kart 1 Resmi" style="object-fit: contain;padding: 5px;width: 100%;height: 100%;">
                        </div>

                        <!-- <div style="margin-left:10px">
                             <tr class="yks_table_group"  style="display: grid; grid-template-columns: {{105}}px auto">
                                <td class=""  style="padding: 0px 0px 0px 0px; min-width: 100%;color:rgb(0, 0, 0);border-right: 1px solid #bbbbbb; ;font-size:11px">Kontrol Paneli</td>
                                <td class=""  style="padding: 0px 0px 0px 10px; min-width: 185px;color: #212529;border:none ;font-size:11px">{{product.kontrolPaneli}}</td>
                             </tr>
    
                             <tr class="yks_table_group"  style="display: grid; grid-template-columns: {{105}}px auto">
                                <td class=""  style="padding: 0px 0px 0px 0px; min-width: 100%;color: #212529;border-right: 1px solid #bbbbbb; ;font-size:11px">Buton Yeri</td>
                                <td class=""  style="padding: 0px 0px 0px 10px; min-width: 185px;color: #212529;border:none ;font-size:11px"> {{product.ozellikler.sivaAltiUstu}}</td>
                             </tr>
                             
                             <tr class="yks_table_group"  style="display: grid; grid-template-columns: {{105}}px auto">
                                <td class=""  style="padding: 0px 0px 0px 0px; min-width: 100%;color: #212529;border-right: 1px solid #bbbbbb; ;font-size:11px">Ekran </td>
                                <td class=""  style="padding: 0px 0px 0px 10px; min-width: 185px;color: #212529;border:none ;font-size:11px"> {{product.ozellikler.ekran}}</td>
                             </tr>
    
                             <tr class="yks_table_group"  style="display: grid; grid-template-columns: {{105}}px auto">
                                <td class=""  style="padding: 0px 0px 0px 0px; min-width: 100%;color: #212529;border-right: 1px solid #bbbbbb; ;font-size:11px">Kaplama</td>
                                <td class=""  style="padding: 0px 0px 0px 10px; min-width: 185px;color: #212529;border:none ;font-size:11px"> {{product.ozellikler.kaplama}}</td>
                             </tr>
    
                             <tr class="yks_table_group"  style="display: grid; grid-template-columns: {{105}}px auto">
                                <td class=""  style="padding: 0px 0px 0px 0px; min-width: 100%;color: #212529;border-right: 1px solid #bbbbbb; ;font-size:11px">Buton Tipi</td>
                                <td class=""  style="padding: 0px 0px 0px 10px; min-width: 185px;color: #212529;border:none ;font-size:11px"> {{product.ozellikler.butonTipi}}</td>
                             </tr>
    
                             <tr class="yks_table_group"  style="display: grid; grid-template-columns: {{105}}px auto">
                                <td class=""  style="padding: 0px 0px 0px 0px; min-width: 100%;color: #212529;border-right: 1px solid #bbbbbb; ;font-size:11px">Sistem </td>
                                <td class=""  style="padding: 0px 0px 0px 10px; min-width: 185px;color: #212529;border:none ;font-size:11px"> {{product.ozellikler.sistem}}</td>
                             </tr>
                      </div> -->


                    </div>

                 
                     </td>

                     <td style="min-width: 105px;">
                        <div style="font-size:13px;font-weight:bold;padding:10px "> {{ product.ad }}</div>
                     </td>
                     <td style="width:100%;min-width: 105px;">
                     <div style="margin-left:10px">
                             <tr class="yks_table_group"  style="display: grid; grid-template-columns: {{105}}px auto">
                                <td class=""  style="padding: 0px 0px 0px 0px; min-width: 100%;color:rgb(0, 0, 0);border-right: 1px solid #bbbbbb; ;font-size:11px">Kontrol Paneli</td>
                                <td class=""  style="padding: 0px 0px 0px 10px; min-width: 185px;color: #212529;border:none ;font-size:11px">{{product.kontrolPaneli}}</td>
                             </tr>
    
                             <tr class="yks_table_group"  style="display: grid; grid-template-columns: {{105}}px auto">
                                <td class=""  style="padding: 0px 0px 0px 0px; min-width: 100%;color: #212529;border-right: 1px solid #bbbbbb; ;font-size:11px">Buton Yeri</td>
                                <td class=""  style="padding: 0px 0px 0px 10px; min-width: 185px;color: #212529;border:none ;font-size:11px"> {{product.ozellikler.sivaAltiUstu}}</td>
                             </tr>
                             
                             <tr class="yks_table_group"  style="display: grid; grid-template-columns: {{105}}px auto">
                                <td class=""  style="padding: 0px 0px 0px 0px; min-width: 100%;color: #212529;border-right: 1px solid #bbbbbb; ;font-size:11px">Ekran </td>
                                <td class=""  style="padding: 0px 0px 0px 10px; min-width: 185px;color: #212529;border:none ;font-size:11px"> {{product.ozellikler.ekran}}</td>
                             </tr>
    
                             <tr class="yks_table_group"  style="display: grid; grid-template-columns: {{105}}px auto">
                                <td class=""  style="padding: 0px 0px 0px 0px; min-width: 100%;color: #212529;border-right: 1px solid #bbbbbb; ;font-size:11px">Kaplama</td>
                                <td class=""  style="padding: 0px 0px 0px 10px; min-width: 185px;color: #212529;border:none ;font-size:11px"> {{product.ozellikler.kaplama}}</td>
                             </tr>
    
                             <tr class="yks_table_group"  style="display: grid; grid-template-columns: {{105}}px auto">
                                <td class=""  style="padding: 0px 0px 0px 0px; min-width: 100%;color: #212529;border-right: 1px solid #bbbbbb; ;font-size:11px">Buton Tipi</td>
                                <td class=""  style="padding: 0px 0px 0px 10px; min-width: 185px;color: #212529;border:none ;font-size:11px"> {{product.ozellikler.butonTipi}}</td>
                             </tr>
    
                             <tr class="yks_table_group"  style="display: grid; grid-template-columns: {{105}}px auto">
                                <td class=""  style="padding: 0px 0px 0px 0px; min-width: 100%;color: #212529;border-right: 1px solid #bbbbbb; ;font-size:11px">Sistem </td>
                                <td class=""  style="padding: 0px 0px 0px 10px; min-width: 185px;color: #212529;border:none ;font-size:11px"> {{product.ozellikler.sistem}}</td>
                             </tr>
                      </div>
                     </td>


                </tr>
            </ng-template>

        </p-table>
    </div>

</app-design>

</div>


<div class="modal-footer">
<button type="button" class="btn btn-success"
    (click)="sec()"
    style="padding:2px 10px; border-radius: 3px; background-color: #017e84;">
    <i class="fa fa-plus" style="color: #fff; margin-right: 5px; font-weight: 700;"></i>
    <span class="d-none d-sm-inline" style="font-size: 13px;">Seç</span>
</button>
<button type="button" class="btn "  (click)="activeModal.close(false)"
    style="padding:2px 10px; border-radius: 3px; background-color: #fdfdfd; border: 1px solid #e6e6e6;">
    <i class="fa fa-times" style="color: #000; margin-right: 5px; font-weight: 600;"></i>
    <span class="d-none d-sm-inline" style="font-size: 13px;">Vazgeç</span>
</button>
</div>
  `

})
export class ButonKartListModalComponents implements OnInit {
   @Input() confirmationBoxTitle;
   @Input() confirmationMessage;

   constructor(public activeModal: NgbActiveModal) {

   }
   ngOnInit(): void {
      this.gruplanmisData = this.gruplamaYap();
      this.objectKeys = Object.keys(this.gruplamaYap());
      this.cols = [
         { field: 'code', header: 'Code' },
         { field: 'name', header: 'Name' },
         { field: 'category', header: 'Category' },
         { field: 'quantity', header: 'Quantity' }
      ];

   }
   gruplanmisData: any;
   objectKeys: any;
   data: any = BUTON_MODELLER



   onSelectionChanged(item) {
      this.selectedRows = item
  }
   selectedRows:any;
   sec() {
      this.activeModal.close(this.selectedRows)

   }

   gruplamaYap() {
      const gruplanmisVeri = this.data.reduce((acc, gider) => {
         if (!acc[gider.kontrolPaneli]) {
            acc[gider.kontrolPaneli] = [];
         }
         acc[gider.kontrolPaneli].push(gider);

         return acc;
      }, {});

      return gruplanmisVeri;

   }




   cols!: any[];





}








