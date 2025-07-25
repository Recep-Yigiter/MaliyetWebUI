import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { defaultColDef } from 'src/shared/default-col-def';
import { RoleService } from 'src/app/core/services/Identity/role.service';
import { DeleteModalComponents } from 'src/shared/dialogs/informations/delete-modal';
import { UserService } from 'src/app/core/services/Identity/user.service';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { RolAtaModalComponent } from './rol-ata-modal/rol-ata-modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  buttonDisabled: boolean = true;
  rowData: any;
  public rowSelection: 'single' | 'multiple' = 'multiple';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonUpdateDisabled: boolean = true;
  selectedUser: any;
  selectedUsers: any;
  visible: any;
  colDefs: ColDef[] = [
    { field: 'userName', },
    { field: 'email', },
    { field: 'nameSurname', },


  ];



  constructor(private UserService: UserService, private NgbModal: NgbModal) { }






  ngOnInit(): void {


  }

  async GetAllUsers() {
    this.rowData = await this.UserService.GetAll();
    // this.rowData = Object.entries(this.rowData.datas).map(([id, name]) => ({
    //   id,
    //   name
    // }));
  }
  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = (await this.UserService.GetAll())["users"];
    // this.rowData = Object.entries(this.rowData.datas).map(([id, name]) => ({
    //   id,
    //   name
    // }));
  }
  rowClick() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.selectedUsers = selectedRows;

    const selectedRow = this.gridApi.getSelectedRows()[0];
    this.selectedUser = selectedRow;

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
    const modalRef = this.NgbModal.open(CreateUserComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.result.then(async (item) => {
      if (item) {
        this.GetAllUsers();
      }
    });
  }

  sil() {
    if (this.selectedUser) {
      const modalRef = this.NgbModal.open(DeleteModalComponents, {
        size: 'md',
        backdrop: 'static',
      });
      modalRef.componentInstance.data = 'Birim Kartı';
      modalRef.result.then(async (event) => {
        if (event == true) {
          // this.UserService.delete(this.selectedUser.id, async () => {});

        }
      });
    }
  }

  guncelle() {
    if (this.selectedUser) {
      const modalRef = this.NgbModal.open(UpdateUserComponent, {
        size: 'md',
        backdrop: 'static',
      });
      modalRef.componentInstance.data = this.selectedUser;
      modalRef.result.then(async (item) => {
        if (item) {
          this.GetAllUsers();
        }
      });
    }

  }


  rolAta() {
    if (this.selectedUser) {
      const modalRef = this.NgbModal.open(RolAtaModalComponent, {
        size: 'md',
        backdrop: 'static',
      });
      modalRef.componentInstance.data = this.selectedUser;
      modalRef.result.then(async (item) => {
        if (item) {
          this.GetAllUsers();
        }
      });
    }
  }











}

