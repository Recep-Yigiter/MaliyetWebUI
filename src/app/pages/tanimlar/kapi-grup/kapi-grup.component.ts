import {  Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { KapiGrupService } from 'src/app/core/services/repository/kapi-grup.service';
import { defaultColDef } from 'src/default-col-def';
import { CreateKapiGrupComponent } from './create-kapi-grup/create-kapi-grup.component';
import { DeleteModalComponents } from 'src/shared/dialogs/informations/delete-modal';
import { UpdateKapiGrupComponent } from './update-kapi-grup/update-kapi-grup.component';

@Component({
  selector: 'app-kapi-grup',
  templateUrl: './kapi-grup.component.html',
  styleUrls: ['./kapi-grup.component.scss']
})
export class KapiGrupComponent implements OnInit {
  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'multiple';
  private gridApi!: GridApi<any>;
  public localeText: {[key:string]:string} = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  buttonUpdateDisabled: boolean = true;
  selectedKapi: any;



  constructor(
    private KapiGrupService:KapiGrupService,
    private NgbModal:NgbModal
  ) {
    
    
  }
  ngOnInit(): void {
  
  }



  colDefs: ColDef[] = [
   { field: 'ad', width: 300 },
   { field: 'tur', width: 90 },

  ];

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData =(await this.KapiGrupService.GetAll()).items;

  }

  rowClick() {
  

    const selectedRow = this.gridApi.getSelectedRows()[0];
    this.selectedKapi = selectedRow;

    if (selectedRow.length == 0) {
      this.buttonDisabled = true;
    } else {
      this.buttonDisabled = false;
    }

   
  }
  rowDblClick(event) {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.selectedKapi = event.data;
  }







async yeni(){
  const modalRef = this.NgbModal.open(CreateKapiGrupComponent, {
    size: 'lg',
    backdrop: 'static',
  });
  modalRef.result.then(async (item) => {
    if (item) {
      this.rowData=(await this.KapiGrupService.GetAll()).items;
    }
  });
}




sil(){
  if (this.selectedKapi) {
    const modalRef = this.NgbModal.open(DeleteModalComponents, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = 'Birim Kartı';
    modalRef.result.then(async(event) => {
      if (event == true) {
        this.KapiGrupService.delete(this.selectedKapi.id, async() => {
          this.rowData=(await this.KapiGrupService.GetAll()).items
        });
      
      }
    });
  }
}

guncelle(){
  if (this.selectedKapi) {
    const modalRef = this.NgbModal.open(UpdateKapiGrupComponent, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = this.selectedKapi;
    modalRef.result.then(async (item) => {
      if (item) {
        location.reload()
      }
    });
  }
  
}












}
