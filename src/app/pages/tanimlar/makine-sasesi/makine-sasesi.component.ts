import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { PersonelService } from 'src/app/core/services/repository/personel.service';
import { StokService } from 'src/app/core/services/repository/stok.service';
import { defaultColDef } from 'src/default-col-def';
import { DeleteModalComponents } from 'src/shared/dialogs/informations/delete-modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MakineSasesiService } from 'src/app/core/services/repository/makine-sasesi.service';
import { CreateMakineSasesiComponent } from './create-makine-sasesi/create-makine-sasesi.component';
import { UpdateMakineSasesiComponent } from './update-makine-sasesi/update-makine-sasesi.component';

@Component({
  selector: 'app-makine-sasesi',
  templateUrl: './makine-sasesi.component.html',
  styleUrls: ['./makine-sasesi.component.scss']
})
export class MakineSasesiComponent implements OnInit {
  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'multiple';
  private gridApi!: GridApi<any>;
  public localeText: {[key:string]:string} = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  buttonUpdateDisabled: boolean = true;
  selectedMakineSasesi: any;
  selectedMakineSasesis: any;




  constructor(private MakineSasesiService:MakineSasesiService,private NgbModal:NgbModal) {
    
    
  }
  ngOnInit(): void {
  
  }

  saseTipi
  kapasite

  colDefs: ColDef[] = [
    { field: 'ad', width: 300 },
    { field: 'saseTipi', width: 200 },
    { field: 'kapasite', width: 70 },

  ];

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData =(await this.MakineSasesiService.GetAll()).items;
   
    
  }

  rowClick() {

    const selectedRow = this.gridApi.getSelectedRows()[0];
    this.selectedMakineSasesi = selectedRow;

    if (selectedRow) {
      this.buttonDisabled = false;
    } else {
      this.buttonDisabled = true;
    }

  }
  rowDblClick(event) {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.selectedMakineSasesi = event.data;
  }













async yeni(){
  const modalRef = this.NgbModal.open(CreateMakineSasesiComponent, {
    size: 'xl',
    backdrop: 'static',
  });
  modalRef.result.then(async (item) => {
    if (item) {
      this.rowData=(await this.MakineSasesiService.GetAll()).items
    }
  });
}

sil(){
  if (this.selectedMakineSasesi) {
    const modalRef = this.NgbModal.open(DeleteModalComponents, {
      size: 'sm',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = 'Birim Kartı';
    modalRef.result.then(async(event) => {
      if (event == true) {
        this.MakineSasesiService.delete(this.selectedMakineSasesi.id, async() => {
          this.rowData=(await this.MakineSasesiService.GetAll()).items
        });
      
      }
    });
  }
}

guncelle(){
  if (this.selectedMakineSasesi) {
    const modalRef = this.NgbModal.open(UpdateMakineSasesiComponent, {
      size: 'xl',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = this.selectedMakineSasesi;
    modalRef.result.then(async (item) => {
      if (item) {
        location.reload()
      }
    });
  }
  
}















}
