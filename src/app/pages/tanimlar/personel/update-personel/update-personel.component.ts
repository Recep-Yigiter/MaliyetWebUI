import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GorevService } from 'src/app/core/services/repository/gorev.service';
import { PersonelService } from 'src/app/core/services/repository/personel.service';

@Component({
  selector: 'app-update-personel',
  templateUrl: './update-personel.component.html',
  styleUrls: ['./update-personel.component.scss']
})
export class UpdatePersonelComponent implements OnInit {
  @Input() data;

  gorevler:any;

  constructor(
    private PersonelService: PersonelService,
    public activeModal: NgbActiveModal,
    private GorevService:GorevService

  ) {}

 async ngOnInit() {
 this.gorevler= (await this.GorevService.GetAll()).items;
  this.frm={
    ad:this.data.ad,
    maas: this.data.maas,
    gorevId:this.selectedGorev? this.selectedGorev:this.data.gorev,

  }
 }


  Kaydet() {
    var createModel :any={
      id:this.data.id,
      ad: this.frm.ad,
      maas: this.frm.maas,
      gorevId: this.frm.gorevId.id
    }
createModel.gorev=this.frm.gorevId
    this.PersonelService.update(
      createModel,
     async () => {
        this.activeModal.close(createModel);
      },(errorMessage) => {}
    );
    
  }



  cikis() {
    this.activeModal.close(false);
  }


  frm:any={}
    
    selectedGorev:any;
    gorev=[
      { id: 1, ad: 'Sac' },
      { id: 2, ad: 'Paslanmaz Sac' },
      { id: 3, ad: 'Galvanizli Sac' },
      { id: 4, ad: 'Civata-Somun-Pul' },
      { id: 5, ad: 'Alüminyum' },
      { id: 6, ad: 'Diğer' },
    ]
    onGorevChange(item: any): void {
      this.selectedGorev=item;
    };
    
    
    



}
