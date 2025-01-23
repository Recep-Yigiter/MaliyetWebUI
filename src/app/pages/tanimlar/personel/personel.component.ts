import { Component } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { PersonelService } from 'src/app/core/services/repository/personel.service';
import { defaultColDef } from 'src/default-col-def';
import { CreatePersonelComponent } from './create-personel/create-personel.component';
import { DeleteModalComponents } from 'src/shared/dialogs/informations/delete-modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdatePersonelComponent } from './update-personel/update-personel.component';

@Component({
  selector: 'app-personel',
  templateUrl: './personel.component.html',
  styleUrls: ['./personel.component.scss']
})
export class PersonelComponent {
  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'multiple';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  buttonUpdateDisabled: boolean = true;
  selectedPersonel: any;
  selectedPersonels: any;


  colDefs: ColDef[] = [
    { field: 'ad', width: 200 },
    { field: 'maas', width: 70,type: 'rightAligned'},
  ];



constructor(private PersonelService:PersonelService,private NgbModal:NgbModal) {}
  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = (await this.PersonelService.GetAll()).items;
  }

  rowClick() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.selectedPersonels = selectedRows;

    const selectedRow = this.gridApi.getSelectedRows()[0];
    this.selectedPersonel = selectedRow;

    if (selectedRows.length == 0) {
      this.buttonDisabled = true;
    } else {
      this.buttonDisabled = false;
    }
    if (selectedRows.length == 0) {
      this.buttonUpdateDisabled = true;
    } 
    else if (selectedRows.length == 1) {
      this.buttonUpdateDisabled = false;
    } 
    else {
      this.buttonUpdateDisabled = true;
    }
  }
  rowDblClick(event) {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.selectedPersonel = event.data;
  }

async yeni(){
  const modalRef = this.NgbModal.open(CreatePersonelComponent, {
    size: 'md',
    backdrop: 'static',
  });
  modalRef.componentInstance.data = 'Personel Kartı';
  modalRef.result.then(async (item) => {
    if (item) {
      this.rowData=(await this.PersonelService.GetAll()).items
    }
  });
}

sil(){
  if (this.selectedPersonel) {
    const modalRef = this.NgbModal.open(DeleteModalComponents, {
      size: 'sm',
      backdrop: 'static',
    });

    modalRef.result.then(async(event) => {
      if (event == true) {
        this.PersonelService.delete(this.selectedPersonel.id, async() => {
          this.rowData=(await this.PersonelService.GetAll()).items
        });
      }
    });
  }
}

guncelle(){
  if (this.selectedPersonel) {
    const modalRef = this.NgbModal.open(UpdatePersonelComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = this.selectedPersonel;
    modalRef.result.then(async (item) => {
      if (item) {
        this.rowData=(await this.PersonelService.GetAll()).items
      }
    });
  }
  
}



}
