import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleService } from 'src/app/core/services/Identity/role.service';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss']
})
export class CreateRoleComponent implements OnInit {
  malzemeGiderler: any = [];
  selectedMalzemeGiderRow: any;
  malzemeGiderToplam: any;
  iscilikGiderler: any = [];
  selectedIscilikGiderRow: any;
  iscilikGiderToplam: any;
  constructor(
    private RoleService: RoleService,
    public activeModal: NgbActiveModal,
    private NgbModal: NgbModal

  ) { }

  ngOnInit(): void { }


  Kaydet() {


    var createModel = {
      name:this.frm.name
 
    }

    this.RoleService.create(
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
