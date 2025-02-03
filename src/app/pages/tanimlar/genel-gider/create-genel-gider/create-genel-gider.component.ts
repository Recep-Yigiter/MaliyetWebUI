import { Component, OnInit } from '@angular/core';
import { StokService } from 'src/app/core/services/repository/stok.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GenelGiderService } from 'src/app/core/services/repository/genel-gider.service';


@Component({
  selector: 'app-create-genel-gider',
  templateUrl: './create-genel-gider.component.html',
  styleUrls: ['./create-genel-gider.component.scss']
})
export class CreateGenelGiderComponent implements OnInit {


  constructor(
    private GenelGiderService: GenelGiderService,
    public activeModal: NgbActiveModal,

  ) {}

  ngOnInit(): void {}


  Kaydet() {

    // "ad": "string",
    // "fabrika": "string",
    // "tur": "string",
    // "etkiOrani": 0,
    // "tutar": 0

    var createModel={
      ad: this.frm.gider.ad,
      fabrika: this.frm.fabrika.ad,
      tutar: this.frm.tutar
    }


    this.GenelGiderService.create(
      createModel,
     async () => {
        this.activeModal.close(true);
      },(errorMessage) => {}
    );
    
  }



  cikis() {
    this.activeModal.close(false);
  }



  frm:any={
    fabrika: { ad: 'Kapı Fabrikası' },
    gider: { ad: 'BAKIM-ONARIM GİDERİ' },
    tutar:0,
  }
    
    
    
    
    
    
    
    
    
  
    
    selectedFabrika:any;
    fabrika=[
     { ad: 'Kapı Fabrikası' },
     { ad: 'Kabin Fabrikası' },
     { ad: 'Motor Fabrikası' },
  
    ]
    onFabrikaChange(item: any): void {
      this.selectedFabrika=item;
    };
    
    
    
    selectedGider:any;
    gider=[
      { ad: 'BAKIM-ONARIM GİDERİ' },
      { ad: 'DOĞALGAZ GİDERİ' },
      { ad: 'ELEKTRİK' },
      { ad: 'SERVİS GİDERİ' },
      { ad: 'YEMEK GİDERİ' },
      { ad: 'İNTERNET-TELEFON GİDERİ' },
      { ad: 'KIRTASİYE GİDERİ' },
    ]
    onGiderChange(item: any): void {
      this.selectedGider=item;
    };
    
    
    
    
    selectedDovizCinsi:any;
    dovizCinsi=[
      { id: 1, ad: 'TL' },
      { id: 2, ad: 'USD' },
      { id: 3, ad: 'EURO' },
    ]
    onDovizCinsiChange(item: any): void {
      this.selectedDovizCinsi=item;
    };
    
    
    

}
