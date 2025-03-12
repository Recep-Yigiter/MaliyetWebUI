import {  Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { KapiGrupService } from 'src/app/core/services/repository/kapi-grup.service';
import { KapiService } from 'src/app/core/services/repository/kapi.service';
import { PersonelService } from 'src/app/core/services/repository/personel.service';
import { StokService } from 'src/app/core/services/repository/stok.service';
import { defaultColDef } from 'src/default-col-def';
import { CreateKapiGrupComponent } from './create-kapi-grup/create-kapi-grup.component';
import { DeleteModalComponents } from 'src/shared/dialogs/informations/delete-modal';
import { UpdateKapiComponent } from './update-kapi/update-kapi.component';
import { CreateKapiComponent } from './create-kapi/create-kapi.component';

@Component({
  selector: 'app-kapi',
  templateUrl: './kapi.component.html',
  styleUrls: ['./kapi.component.scss']
})
export class KapiComponent implements OnInit {
  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'multiple';
  private gridApi!: GridApi<any>;
  public localeText: {[key:string]:string} = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  buttonUpdateDisabled: boolean = true;
  selectedKapi: any;



  constructor(
    private KapiService:KapiService,
    private NgbModal:NgbModal
  ) {}
  
  ngOnInit() {}



  colDefs: ColDef[] = [
   { field: 'ad', width: 300 },
   { field: 'yon', width: 70 },
   { field: 'kapiYuksekligi', width: 120 },
   { field: 'kapiGenisligi', width: 120 },
   { field: 'kapiTipi', width: 70 },
   { field: 'uygunluk', width: 70 },
   { field: 'kaplama', width: 70 },

  ];

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData =(await this.KapiService.GetAll()).items;

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







async yeniKapi(){
  const modalRef = this.NgbModal.open(CreateKapiComponent, {
    size: 'lg',
    backdrop: 'static',
  });
  modalRef.result.then(async (item) => {
    if (item) {
      this.rowData=(await this.KapiService.GetAll()).items;
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
        this.KapiService.delete(this.selectedKapi.id, async() => {
          this.rowData=(await this.KapiService.GetAll()).items
        });
      
      }
    });
  }
}

guncelle(){
  if (this.selectedKapi) {
    const modalRef = this.NgbModal.open(UpdateKapiComponent, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = this.selectedKapi;
    modalRef.result.then(async (item) => {
      if (item) {
        this.rowData =(await this.KapiService.GetAll()).items;
      }
    });
  }
  
}




async yeniKapiGrup(){
  const modalRef = this.NgbModal.open(CreateKapiGrupComponent, {
    size: 'xl',
    backdrop: 'static',
  });
  modalRef.result.then(async (item) => {
    if (item) {
      
    }
  });
}









}
