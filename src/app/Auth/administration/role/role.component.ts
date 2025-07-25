import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { defaultColDef } from 'src/shared/default-col-def';
import { RoleService } from 'src/app/core/services/Identity/role.service';
import { CreateRoleComponent } from './create-role/create-role.component';
import { DeleteModalComponents } from 'src/shared/dialogs/informations/delete-modal';
import { UpdateRoleComponent } from './update-role/update-role.component';


@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  buttonDisabled: boolean = true;
  rowData: any;
  public rowSelection: 'single' | 'multiple' = 'multiple';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonUpdateDisabled: boolean = true;
  selectedRole: any;
  selectedRoles: any;
  visible: any;
  colDefs: ColDef[] = [
    { field: 'name', },


  ];



  constructor(private RoleService: RoleService, private NgbModal: NgbModal) { }






  ngOnInit(): void {


  }

 async GetAllRoles() {
    this.rowData = await this.RoleService.list();
    this.rowData = Object.entries(this.rowData.datas).map(([id, name]) => ({
      id,
      name
    }));
  }
  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = await this.RoleService.list();
    this.rowData = Object.entries(this.rowData.datas).map(([id, name]) => ({
      id,
      name
    }));

  }
  rowClick() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.selectedRoles = selectedRows;

    const selectedRow = this.gridApi.getSelectedRows()[0];
    this.selectedRole = selectedRow;

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




  async yeni() {
    const modalRef = this.NgbModal.open(CreateRoleComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.result.then(async (item) => {
      if (item) {
        this.GetAllRoles();
      }
    });
  }

  sil() {
    if (this.selectedRole) {
      console.log(this.selectedRole);
      const modalRef = this.NgbModal.open(DeleteModalComponents, {
        size: 'md',
        backdrop: 'static',
      });
      modalRef.componentInstance.data = 'Birim Kartı';
      modalRef.result.then(async (event) => {
        if (event == true) {
          this.RoleService.delete(this.selectedRole.id, async () => {
             this.GetAllRoles();
          });

        }
      });
    }
  }

  guncelle() {
    if (this.selectedRole) {
      const modalRef = this.NgbModal.open(UpdateRoleComponent, {
        size: 'md',
        backdrop: 'static',
      });
      modalRef.componentInstance.data = this.selectedRole;
      modalRef.result.then(async (item) => {
        if (item) {
             this.GetAllRoles();
        }
      });
    }

  }














}

