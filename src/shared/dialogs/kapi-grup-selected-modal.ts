import { Component, Input } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { KapiGrupService } from 'src/app/core/services/repository/kapi-grup.service';

@Component({
    selector: 'app-kapi-grup-select-modal',
    styleUrls: ['../modal.scss'],
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

    <div full-page style="height: 100%;">


        <div>

            <ag-grid-angular style="width: 100%; height:390px;"
            class="ag-theme-quartz" 
            [rowData]="rowData" 
            [columnDefs]="colDefs"
            [defaultColDef]="defaultColDef"
          
            (gridReady)="getList($event)"
            (selectionChanged)="onSelectionChanged()"
            [rowSelection]="rowSelection" 
            [rowHeight]="22" 
            [headerHeight]="23">
        </ag-grid-angular> 

        </div>

    </div>

</app-design>

</div>


<div class="modal-footer">
<button type="button" class="btn btn-success"
    (click)="close()"
    style="padding:2px 10px; border-radius: 3px; background-color: #017e84;">
    <i class="fa fa-plus" style="color: #fff; margin-right: 5px; font-weight: 700;"></i>
    <span class="d-none d-sm-inline" style="font-size: 13px;">Ekle</span>
</button>
<button type="button" class="btn "  (click)="activeModal.close(false)"
    style="padding:2px 10px; border-radius: 3px; background-color: #fdfdfd; border: 1px solid #e6e6e6;">
    <i class="fa fa-times" style="color: #000; margin-right: 5px; font-weight: 600;"></i>
    <span class="d-none d-sm-inline" style="font-size: 13px;">Vazgeç</span>
</button>
</div>
  `

})
export class KapiGrupSelectModalComponents {
    @Input() confirmationBoxTitle;
    @Input() confirmationMessage;

    constructor(public activeModal: NgbActiveModal, private KapiGrupService: KapiGrupService) {

    }

    rowData: any[];

    public rowSelection: 'single' | 'multiple' = 'multiple';
    private gridApi!: GridApi<any>;

    colDefs: ColDef[] = [
        {
            field: "ad",
            minWidth: 200
        },
        { field: "kod" },
        { field: "KapiGrupAdi" },

    ];
    public defaultColDef: ColDef = {
        flex: 1,
        minWidth: 100,
    };

    async getList(params: GridReadyEvent<any>) {
        this.gridApi = params.api;
        this.rowData = (await this.KapiGrupService.GetAll(() => { })).items;
    }
    selectedRow: any;


    onSelectionChanged() {
        this.selectedRow = this.gridApi.getSelectedRows()[0];
    }

    KapiGrups: any[] = [];
    close() {


        this.activeModal.close(this.selectedRow)

    }
}

