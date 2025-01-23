import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,} from '@angular/forms';

import { Router } from '@angular/router';
import { StokService } from 'src/app/core/services/repository/stok.service';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-create-stok',
  templateUrl: './create-stok.component.html',
  styleUrls: ['./create-stok.component.scss']
})
export class CreateStokComponent implements OnInit {


  constructor(
    private StokService: StokService,
    public activeModal: NgbActiveModal,

  ) {}

  ngOnInit(): void {}


  Kaydet() {
    var createModel={
      ad: this.frm.ad,
      birim: this.frm.birim.ad,
      birimFiyat: this.frm.birimFiyat,
      dovizCinsi: this.frm.dovizCinsi.ad,
      stokGrubu: this.frm.stokGrubu.ad
    }

    
    this.StokService.create(
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
    ad:"",
    birim: { id: 1, ad: 'ADET' },
    stokGrubu:{ id: 1, ad: 'Sac' },
    birimFiyat:0,
    dovizCinsi:{ id: 1, ad: 'TL' },
  }
    
    
    
    
    
    
    
    
    
  
    
    selectedBirim:any;
    birim=[
     { id: 1, ad: 'ADET' },
     { id: 2, ad: 'KG' },
     { id: 3, ad: 'M' },
     { id: 4, ad: 'M^2' },
  
    ]
    onBirimChange(item: any): void {
      this.selectedBirim=item;
    };
    
    
    
    selectedStokGrubu:any;
    stokGrubu=[
      { id: 1, ad: 'Sac' },
      { id: 2, ad: 'Paslanmaz Sac' },
      { id: 3, ad: 'Galvanizli Sac' },
      { id: 4, ad: 'Civata-Somun-Pul' },
      { id: 5, ad: 'Alüminyum' },
      { id: 6, ad: 'Diğer' },
    ]
    onStokGrubuChange(item: any): void {
      this.selectedStokGrubu=item;
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
