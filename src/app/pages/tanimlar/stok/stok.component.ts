import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridApi, GridOptions, GridReadyEvent, ITextFilterParams } from 'ag-grid-community';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { StokService } from 'src/app/core/services/repository/stok.service';
import { defaultColDef } from 'src/default-col-def';
import { CreateStokComponent } from './create-stok/create-stok.component';
import { DeleteModalComponents } from 'src/shared/dialogs/informations/delete-modal';
import { UpdateStokComponent } from './update-stok/update-stok.component';
import { TurkishTextFilter } from './core/birim-filter.service';

@Component({
  selector: 'app-stok',
  templateUrl: './stok.component.html',
  styleUrls: ['./stok.component.scss'],
})
export class StokComponent {
  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'multiple';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  buttonUpdateDisabled: boolean = true;
  selectedStok: any;
  selectedStoks: any;
  visible: any;
  colDefs: ColDef[] = [
    {
      field: 'ad',
      width: 600,
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


  constructor(private StokService: StokService, private NgbModal: NgbModal) { }




  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = (await this.StokService.GetAll()).items;;
  }
  rowClick() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.selectedStoks = selectedRows;

    const selectedRow = this.gridApi.getSelectedRows()[0];
    this.selectedStok = selectedRow;

    if (selectedRows.length == 0) {
      this.buttonDisabled = true;
    } else {
      this.buttonDisabled = false;
    }

    if (selectedRows.length == 0) {
      this.buttonUpdateDisabled = true;
    } else if (selectedRows.length == 1) {
      this.buttonUpdateDisabled = false;
    } else {
      this.buttonUpdateDisabled = true;
    }
  }
  rowDblClick(event) {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.selectedStok = event.data;
  }






  async yeni() {
    const modalRef = this.NgbModal.open(CreateStokComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = 'Stok Kartı';
    modalRef.result.then(async (item) => {
      if (item) {
        this.rowData = (await this.StokService.GetAll()).items
      }
    });
  }

  sil() {
    if (this.selectedStok) {
      const modalRef = this.NgbModal.open(DeleteModalComponents, {
        size: 'md',
        backdrop: 'static',
      });
      modalRef.componentInstance.data = 'Birim Kartı';
      modalRef.result.then(async (event) => {
        if (event == true) {
          this.StokService.delete(this.selectedStok.id, async () => {
            this.rowData = (await this.StokService.GetAll()).items
          });

        }
      });
    }
  }

  guncelle() {

    if (this.selectedStok) {
      const modalRef = this.NgbModal.open(UpdateStokComponent, {
        size: 'md',
        backdrop: 'static',
      });
      modalRef.componentInstance.data = this.selectedStok;
      modalRef.result.then(async (item) => {
        if (item) {
          this.rowData = (await this.StokService.GetAll()).items
        }
      });
    }

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



const nameFilterParams: ITextFilterParams = {
  filterOptions: ["contains", "notContains"],
  textFormatter: (r) => {
    if (r == null) return null;
    return r
      .toLowerCase()
      .replace(/[àáâãäå]/g, "a")
      .replace(/æ/g, "ae")
      .replace(/ç/g, "c")
      .replace(/[èéêë]/g, "e")
      .replace(/[ìíîï]/g, "i")
      .replace(/ñ/g, "n")
      .replace(/[òóôõö]/g, "o")
      .replace(/œ/g, "oe")
      .replace(/[ùúûü]/g, "u")
      .replace(/[ýÿ]/g, "y");
  },
  debounceMs: 200,
  maxNumConditions: 1,
};