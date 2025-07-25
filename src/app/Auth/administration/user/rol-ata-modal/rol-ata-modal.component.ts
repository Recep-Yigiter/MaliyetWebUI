import { Component, Input, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthorizationEndpointService } from 'src/app/core/services/Identity/authorization-endpoint.service';
import { RoleService } from 'src/app/core/services/Identity/role.service';
import { UserService } from 'src/app/core/services/Identity/user.service';
import { DeleteModalComponents } from 'src/shared/dialogs/informations/delete-modal';

@Component({
  selector: 'app-rol-ata-modal',
  templateUrl: './rol-ata-modal.component.html',
  styleUrls: ['./rol-ata-modal.component.scss']
})
export class RolAtaModalComponent {
  @Input() data;
  @ViewChild('rolesComponent') rolesComponent!: MatSelectionList;

  rowData: any;
  assignRoles: string[];
  constructor(private NgbModal: NgbModal,
    public activeModal: NgbActiveModal,
    private RoleService: RoleService,
    private UserService: UserService
  ) {


  }

  async ngOnInit() {
    this.GetRoleToUser()

  }


  async GetRoleToUser() {
    this.rowData = await this.RoleService.list();
    this.rowData = (Object.entries(this.rowData.datas).map(([id, name]) => ({
      id,
      name
    }))).map(c => c.name);
    this.assignRoles = (await this.UserService.GetRolesToUser(this.data.userName))["userRoles"]
  
    // console.log((await this.UserService.GetRolesToUser("3c089ebb-a029-427b-ad70-2d901bf51e2b"))["userRoles"]); 
  }



  Kaydet() {
    const selectedItems = this.rolesComponent.selectedOptions.selected.map(item => item.value);
    this.UserService.AssignRoleToUser(this.data.id,selectedItems,() => {
        this.activeModal.close(true);
      },(errorMessage) => {}
    )  

  }

  sil() {
    const modalRef = this.NgbModal.open(DeleteModalComponents, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = 'Birim Kartı';
    modalRef.result.then(async (event) => {
      if (event == true) {
        // this.KabinService.delete(this.data.id, async () => {
        //   this.activeModal.close(true);
        // });
      }
    });
  }

  cikis() {
    this.activeModal.close(false);
  }
}
