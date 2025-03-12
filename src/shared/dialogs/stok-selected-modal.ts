import { Component, Input } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StokService } from 'src/app/core/services/repository/stok.service';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { defaultColDef } from 'src/default-col-def';

@Component({
    selector: 'app-stok-select-modal',
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

            <!-- <ag-grid-angular style="width: 100%; height:390px;"
            class="ag-theme-quartz" 
            [rowData]="rowData" 
            [columnDefs]="colDefs"
            [defaultColDef]="defaultColDef"
            [rowMultiSelectWithClick]="true"
            (gridReady)="getList($event)"
            (rowClicked)="onSelectionChanged()"
            [rowSelection]="rowSelection" 
            [rowHeight]="22" 
            [headerHeight]="23">
        </ag-grid-angular>  -->

        <ag-grid-angular #agGrid style="width: 100%; height:390px;" class="ag-theme-quartz" [rowData]="rowData" 
      [defaultColDef]="defaultColDef" [columnDefs]="colDefs" 
      (gridReady)="getList($event)" (selectionChanged)="onSelectionChanged()" [rowSelection]="rowSelection" [rowHeight]="22"
      [headerHeight]="23" [localeText]="localeText">
    </ag-grid-angular>

        </div>

    </div>

</app-design>

</div>


<div class="modal-footer">
<button type="button" class="btn btn-success"
    (click)="ekle()"
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
export class StokSelectModalComponents {
    @Input() confirmationBoxTitle;
    @Input() confirmationMessage;
  public localeText: {[key:string]:string} = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
    constructor(public activeModal: NgbActiveModal, private StokService: StokService) {

    }

    rowData: any[];

    public rowSelection: 'single' | 'multiple' = 'multiple';
    private gridApi!: GridApi<any>;

    colDefs: ColDef[] = [
        {
            headerCheckboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            checkboxSelection: true,
            field: "ad",
            minWidth: 600,
            filter: "agTextColumnFilter",
            filterParams: {
            filterOptions: ["contains", "notContains"],
            textCustomComparator:this.customFilter
      } 
        },
        { field: 'stokGrubu', width: 130 },
        { field: 'birim', width: 70 },
        {
          field: 'birimFiyat', width: 70,
          valueFormatter: (params) => {
            return new Intl.NumberFormat('tr-TR', {
              style: 'currency',
              currency: 'TRY'
            }).format(params.value);
          }
        },
        { field: 'dovizCinsi', width: 70 },

    ];

    async getList(params: GridReadyEvent<any>) {
        this.gridApi = params.api;
        this.rowData = (await this.StokService.GetAll(() => { })).items;
    }
    selectedRows: any;


    onSelectionChanged() {
        this.selectedRows = this.gridApi.getSelectedRows();
        console.log(this.selectedRows);
    }

    Stoks: any[] = [];
    ekle() {

      console.log(this.selectedRows);
      this.activeModal.close(this.selectedRows)

    }



    customFilter(filterType, filterValue, cellValue) {
        if (!filterValue) {
          return true;
        }
        const normalizeString = (str) => {
          let normalizedStr = str
            .normalize('NFD') 
            .replace(/[\u0300-\u036f]/g, '') 
            .toLowerCase();
    
          normalizedStr = normalizedStr
            .replace(/i/g, 'ı')
            .replace(/ı/g, 'i');
    
          return normalizedStr;
        };
    
    
    
        const normalizedFilterValue = normalizeString(filterValue);
        const normalizedCellValue = normalizeString(cellValue.toString());
    
        if (filterType === 'contains') {
          return normalizedFilterValue.includes(normalizedCellValue);
        }
        return true;
      }
}

