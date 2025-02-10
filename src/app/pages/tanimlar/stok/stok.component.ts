import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { StokService } from 'src/app/core/services/repository/stok.service';
import { defaultColDef } from 'src/default-col-def';
import { CreateStokComponent } from './create-stok/create-stok.component';
import { DeleteModalComponents } from 'src/shared/dialogs/informations/delete-modal';
import { UpdateStokComponent } from './update-stok/update-stok.component';

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
  visible:any;
  colDefs: ColDef[] = [
    { field: 'ad', width: 300 },
    { field: 'stokGrubu', width: 130 },
    { field: 'birim', width: 70 },
    { field: 'birimFiyat', width: 70 ,
      valueFormatter: (params) => {
        return new Intl.NumberFormat('tr-TR', {
          style: 'currency',
          currency: 'TRY'
        }).format(params.value);
      }
    },
  ];


  constructor(private StokService:StokService,private NgbModal:NgbModal) { }


  

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData =( await this.StokService.GetAll()).items;;
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






async yeni(){
  const modalRef = this.NgbModal.open(CreateStokComponent, {
    size: 'md',
    backdrop: 'static',
  });
  modalRef.componentInstance.data = 'Stok Kartı';
  modalRef.result.then(async (item) => {
    if (item) {
      this.rowData=(await this.StokService.GetAll()).items
    }
  });
}

sil(){
  if (this.selectedStok) {
    const modalRef = this.NgbModal.open(DeleteModalComponents, {
      size: 'sm',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = 'Birim Kartı';
    modalRef.result.then(async(event) => {
      if (event == true) {
        this.StokService.delete(this.selectedStok.id, async() => {
          this.rowData=(await this.StokService.GetAll()).items
        });
      
      }
    });
  }
}

guncelle(){
 
  if (this.selectedStok) {
    const modalRef = this.NgbModal.open(UpdateStokComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = this.selectedStok;
    modalRef.result.then(async (item) => {
      if (item) {
        this.rowData=(await this.StokService.GetAll()).items
      }
    });
  }
  
}




  
  
  
  
  
  
  
  
  
  
  
  

  




}
