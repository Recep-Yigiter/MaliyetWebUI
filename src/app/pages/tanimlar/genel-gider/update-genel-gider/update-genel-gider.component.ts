import { Component, Input, OnInit } from '@angular/core';
import { StokService } from 'src/app/core/services/repository/stok.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GenelGiderService } from 'src/app/core/services/repository/genel-gider.service';


@Component({
  selector: 'app-update-genel-gider',
  templateUrl: './update-genel-gider.component.html',
  styleUrls: ['./update-genel-gider.component.scss']
})
export class UpdateGenelGiderComponent implements OnInit {
  @Input() data: any;

  constructor(
    private GenelGiderService: GenelGiderService,
    public activeModal: NgbActiveModal,

  ) { }

  ngOnInit(): void {
    this.frm = {

      fabrika: { ad: this.selectedFabrika ? this.selectedFabrika : this.data.fabrika },
      gider: { ad: this.selectedGider ? this.selectedGider : this.data.ad },
      tutar: this.data.tutar,
    }

  }


  Kaydet() {



    var createModel={
      id:this.data.id,
      ad: this.frm.gider.ad,
      fabrika: this.frm.fabrika.ad,
      tutar: this.frm.tutar
    }


    this.GenelGiderService.update(
      createModel,
      async () => {
        this.activeModal.close(true);
      }, (errorMessage) => { }
    );

  }



  cikis() {
    this.activeModal.close(false);
  }



  frm: any = {}











  selectedFabrika: any;
  fabrika = [
    { ad: 'Kapı Fabrikası' },
    { ad: 'Kabin Fabrikası' },
    { ad: 'Motor Fabrikası' },

  ]
  onFabrikaChange(item: any): void {
    this.selectedFabrika = item;
  };



  selectedGider: any;
  gider = [
    { ad: 'BAKIM-ONARIM GİDERİ' },
    { ad: 'DOĞALGAZ GİDERİ' },
    { ad: 'ELEKTRİK' },
    { ad: 'SERVİS GİDERİ' },
    { ad: 'YEMEK GİDERİ' },
    { ad: 'İNTERNET-TELEFON GİDERİ' },
    { ad: 'KIRTASİYE GİDERİ' },
  ]
  onGiderChange(item: any): void {
    this.selectedGider = item;
  };









}
