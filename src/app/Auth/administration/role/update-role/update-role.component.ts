import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleService } from 'src/app/core/services/Identity/role.service';

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.scss']
})
export class UpdateRoleComponent {
    @Input() data;

malzemeGiderler: any = [];
  selectedMalzemeGiderRow: any;
  malzemeGiderToplam: any;
  iscilikGiderler: any = [];
  selectedIscilikGiderRow: any;
  iscilikGiderToplam: any;
  constructor(
    private RoleService: RoleService,
    public activeModal: NgbActiveModal,

  ) { }

  ngOnInit(): void {
     this.frm={
      name:this.data.name,
    }
   }


  Kaydet() {


    var createModel = {
      id:this.data.id,
      name:this.frm.name
 
    }

    this.RoleService.update(
      createModel,
      async () => {
        this.activeModal.close(true);
      }, (errorMessage) => { }
    );

  }



  cikis() {
    this.activeModal.close(false);
  }



  frm:any={
    ad:"",
  }
 






  selectedModel: any;
  // modeller=[
  //   { id: 1, ad: 'ESB' },
  // ]
  onModelChange(item: any): void {
    this.selectedModel = item;
  };








































}
