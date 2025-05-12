import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { PersonelService } from 'src/app/core/services/repository/personel.service';
import { StokService } from 'src/app/core/services/repository/stok.service';
import { defaultColDef } from 'src/default-col-def';
import { DeleteModalComponents } from 'src/shared/dialogs/informations/delete-modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SuspansiyonService } from 'src/app/core/services/repository/suspansiyon.service';
import { CreateSuspansiyonComponent } from './create-suspansiyon/create-suspansiyon.component';
import { UpdateSuspansiyonComponent } from './update-suspansiyon/update-suspansiyon.component';

@Component({
  selector: 'app-suspansiyon',
  templateUrl: './suspansiyon.component.html',
  styleUrls: ['./suspansiyon.component.scss']
})
export class SuspansiyonComponent implements OnInit {
  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'multiple';
  private gridApi!: GridApi<any>;
  public localeText: {[key:string]:string} = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  buttonUpdateDisabled: boolean = true;
  selectedSuspansiyon: any;
  selectedSuspansiyons: any;




  constructor(private SuspansiyonService:SuspansiyonService,private NgbModal:NgbModal) {
    
    
  }
  ngOnInit(): void {
  
  }



  colDefs: ColDef[] = [
    { field: 'ad', width: 300 },
    // { field: 'kapasite', width: 70 },
    // { field: 'askiTipi', width: 70 },
    // { field: 'karkasSekli', width: 120 },
    // { field: 'rayArasi', width: 120 },

  ];

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData =(await this.SuspansiyonService.GetAll()).items;
   
    
  }

  rowClick() {

    const selectedRow = this.gridApi.getSelectedRows()[0];
    this.selectedSuspansiyon = selectedRow;

    if (selectedRow) {
      this.buttonDisabled = false;
    } else {
      this.buttonDisabled = true;
    }

  }
  rowDblClick(event) {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.selectedSuspansiyon = event.data;
  }













async yeni(){
  const modalRef = this.NgbModal.open(CreateSuspansiyonComponent, {
    size: 'xl',
    backdrop: 'static',
  });
  modalRef.result.then(async (item) => {
    if (item) {
      this.rowData=(await this.SuspansiyonService.GetAll()).items
    }
  });
}

sil(){
  if (this.selectedSuspansiyon) {
    const modalRef = this.NgbModal.open(DeleteModalComponents, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = 'Birim Kartı';
    modalRef.result.then(async(event) => {
      if (event == true) {
        this.SuspansiyonService.delete(this.selectedSuspansiyon.id, async() => {
          this.rowData=(await this.SuspansiyonService.GetAll()).items
        });
      
      }
    });
  }
}

guncelle(){
  if (this.selectedSuspansiyon) {
    const modalRef = this.NgbModal.open(UpdateSuspansiyonComponent, {
      size: 'xl',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = this.selectedSuspansiyon;
    modalRef.result.then(async (item) => {
      if (item) {
        this.rowData =(await this.SuspansiyonService.GetAll()).items;
      }
    });
  }
  
}















}
