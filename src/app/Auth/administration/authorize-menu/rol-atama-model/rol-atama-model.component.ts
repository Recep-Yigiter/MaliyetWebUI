import { Component, Input, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthorizationEndpointService } from 'src/app/core/services/Identity/authorization-endpoint.service';
import { RoleService } from 'src/app/core/services/Identity/role.service';
import { DeleteModalComponents } from 'src/shared/dialogs/informations/delete-modal';

@Component({
  selector: 'app-rol-atama-model',
  templateUrl: './rol-atama-model.component.html',
  styleUrls: ['./rol-atama-model.component.scss']
})
export class RolAtamaModelComponent {
  @Input() data;
  @ViewChild('rolesComponent') rolesComponent!: MatSelectionList;

  rowData: any;
  constructor(private NgbModal: NgbModal,
    public activeModal: NgbActiveModal,
    private RoleService: RoleService,
    private AuthorizationEndpoint: AuthorizationEndpointService
  ) {


  }

  async ngOnInit() {
    this.GetAllRole()
    this.GetRoleToEndpoints()
  }

  async GetAllRole() {
    this.rowData = await this.RoleService.list();
    this.rowData = (Object.entries(this.rowData.datas).map(([id, name]) => ({
      id,
      name
    }))).map(c => c.name);
  }

  assignRoles: string[];
  async GetRoleToEndpoints() {
   this.assignRoles= (await this.AuthorizationEndpoint.getRoleToEndpoints(this.data.code, this.data.menu))["roles"]
  }

  Kaydet() {
    const selectedItems = this.rolesComponent.selectedOptions.selected.map(item => item.value);
    this.AuthorizationEndpoint.AssignRoleEndpoint(selectedItems, this.data.menu, this.data.code,async () => {
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

    var test = [
      { id: "042df191-31a3-4d5a-a0bf-afded7084ca3", name: "deneme" }
    ]
  }
}
