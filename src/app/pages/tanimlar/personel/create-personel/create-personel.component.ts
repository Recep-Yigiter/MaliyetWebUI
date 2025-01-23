import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GorevService } from 'src/app/core/services/repository/gorev.service';
import { PersonelService } from 'src/app/core/services/repository/personel.service';

@Component({
  selector: 'app-create-personel',
  templateUrl: './create-personel.component.html',
  styleUrls: ['./create-personel.component.scss']
})
export class CreatePersonelComponent implements OnInit {

  gorevler:any;

  constructor(
    private PersonelService: PersonelService,
    public activeModal: NgbActiveModal,
    private GorevService:GorevService

  ) {}
  frm:any;
 async ngOnInit() {
 this.gorevler= (await this.GorevService.GetAll()).items;
    this.frm={
     ad:"",
     maas:0,
     gorevId:this.gorevler[0],
   }
  
 }


  Kaydet() {
    var createModel={
      ad: this.frm.ad,
      maas: this.frm.maas,
      gorevId: this.frm.gorevId.id
    }

    this.PersonelService.create(
      createModel,
     async () => {
        this.activeModal.close(true);
      },(errorMessage) => {}
    );
    
  }



  cikis() {
    this.activeModal.close(false);
  }



    
    selectedGorev:any;
    onGorevChange(item: any): void {
      this.selectedGorev=item;
    };
    
    
    



}
