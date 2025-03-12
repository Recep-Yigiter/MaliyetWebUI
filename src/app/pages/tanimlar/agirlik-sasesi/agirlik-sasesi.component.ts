import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { PersonelService } from 'src/app/core/services/repository/personel.service';
import { StokService } from 'src/app/core/services/repository/stok.service';
import { defaultColDef } from 'src/default-col-def';
import { DeleteModalComponents } from 'src/shared/dialogs/informations/delete-modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateAgirlikSasesiComponent } from './create-agirlik-sasesi/create-agirlik-sasesi.component';
import { UpdateAgirlikSasesiComponent } from './update-agirlik-sasesi/update-agirlik-sasesi.component';
import { AgirlikSasesiService } from 'src/app/core/services/repository/agirlik-sasesi.service';

@Component({
  selector: 'app-agirlik-sasesi',
  templateUrl: './agirlik-sasesi.component.html',
  styleUrls: ['./agirlik-sasesi.component.scss']
})
export class AgirlikSasesiComponent implements OnInit {
  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'multiple';
  private gridApi!: GridApi<any>;
  public localeText: {[key:string]:string} = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  buttonUpdateDisabled: boolean = true;
  selectedAgirlikSasesi: any;
  selectedAgirlikSasesis: any;




  constructor(private AgirlikSasesiService:AgirlikSasesiService,private NgbModal:NgbModal) {
    
    
  }
  ngOnInit(): void {
  
  }



  colDefs: ColDef[] = [
    { field: 'ad', width: 300 },
    { field: 'rayArasi', width: 70 },
    { field: 'kapasite', width: 70 },
    { field: 'askiTipi', width: 70 },
    { field: 'karkasSekli', width: 120 },

  ];

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData =(await this.AgirlikSasesiService.GetAll()).items;
   
    
  }

  rowClick() {

    const selectedRow = this.gridApi.getSelectedRows()[0];
    this.selectedAgirlikSasesi = selectedRow;

    if (selectedRow) {
      this.buttonDisabled = false;
    } else {
      this.buttonDisabled = true;
    }

  }
  rowDblClick(event) {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.selectedAgirlikSasesi = event.data;
  }













async yeni(){
  const modalRef = this.NgbModal.open(CreateAgirlikSasesiComponent, {
    size: 'xl',
    backdrop: 'static',
  });
  modalRef.result.then(async (item) => {
    if (item) {
      this.rowData=(await this.AgirlikSasesiService.GetAll()).items
    }
  });
}

sil(){
  if (this.selectedAgirlikSasesi) {
    const modalRef = this.NgbModal.open(DeleteModalComponents, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = 'Birim Kartı';
    modalRef.result.then(async(event) => {
      if (event == true) {
        this.AgirlikSasesiService.delete(this.selectedAgirlikSasesi.id, async() => {
          this.rowData=(await this.AgirlikSasesiService.GetAll()).items
        });
      
      }
    });
  }
}

guncelle(){
  if (this.selectedAgirlikSasesi) {
    const modalRef = this.NgbModal.open(UpdateAgirlikSasesiComponent, {
      size: 'xl',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = this.selectedAgirlikSasesi;
    modalRef.result.then(async (item) => {
      if (item) {
        this.rowData =(await this.AgirlikSasesiService.GetAll()).items;
      }
    });
  }
  
}















}
