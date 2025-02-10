import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { KabinService } from 'src/app/core/services/repository/kabin.service';
import { PersonelService } from 'src/app/core/services/repository/personel.service';
import { StokService } from 'src/app/core/services/repository/stok.service';
import { defaultColDef } from 'src/default-col-def';
import { CreateKabinComponent } from './create-kabin/create-kabin.component';
import { DeleteModalComponents } from 'src/shared/dialogs/informations/delete-modal';
import { UpdateKabinComponent } from './update-kabin/update-kabin.component';

@Component({
  selector: 'app-kabin',
  templateUrl: './kabin.component.html',
  styleUrls: ['./kabin.component.scss']
})
export class KabinComponent implements OnInit {
  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'multiple';
  private gridApi!: GridApi<any>;
  public localeText: {[key:string]:string} = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  selectedKabin: any;





  constructor(private KabinService:KabinService,private NgbModal:NgbModal) {
    
    
  }
  ngOnInit(): void {

  }



  colDefs: ColDef[] = [
    { field: 'ad', width: 300 },
    { field: 'model', width: 150 },
    { field: 'kapasite', width: 150 },
    { field: 'kabinDuvar', width: 150 },
    { field: 'girisDuvar', width: 150 },
    { field: 'arkaDuvar', width: 150 },
    { field: 'taban', width: 150 },
    { field: 'aydinlatma', width: 150 },
    { field: 'kupeste', width: 150 },
    { field: 'supurgelik', width: 150 },
    { field: 'opsiyonel', width: 150 },

  ];

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData =(await this.KabinService.GetAll()).items;
  }

  rowClick() {
 
    const selectedRow = this.gridApi.getSelectedRows()[0];
    this.selectedKabin = selectedRow;

    if (selectedRow) {
      this.buttonDisabled = false;
    } else {
      this.buttonDisabled = true;
    }

    
  }






async yeni(){
  const modalRef = this.NgbModal.open(CreateKabinComponent, {
    size: 'lg',
    backdrop: 'static',
  });
  modalRef.result.then(async (item) => {
    if (item) {
      this.rowData=(await this.KabinService.GetAll()).items
    }
  });
}

sil(){
  if (this.selectedKabin) {
    const modalRef = this.NgbModal.open(DeleteModalComponents, {
      size: 'sm',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = 'Birim Kartı';
    modalRef.result.then(async(event) => {
      if (event == true) {
        this.KabinService.delete(this.selectedKabin.id, async() => {
          this.rowData=(await this.KabinService.GetAll()).items
        });
      
      }
    });
  }
}

guncelle(){
  if (this.selectedKabin) {
    const modalRef = this.NgbModal.open(UpdateKabinComponent, {
      size: 'xl',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = this.selectedKabin;
    modalRef.result.then(async (item) => {
      if (item) {
        location.reload()
      }
    });
  }
  
}








}
