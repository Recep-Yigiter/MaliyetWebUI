import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,} from '@angular/forms';

import { Router } from '@angular/router';
import { StokService } from 'src/app/core/services/repository/stok.service';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-create-stok',
  templateUrl: './create-stok.component.html',
  styleUrls: ['./create-stok.component.scss'],
  providers:[CurrencyPipe]
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
    stokGrubu:{ ad: 'SAC' },
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
      {ad: 'SAC' },
      {ad: 'Paslanmaz Sac+ decoplate' },
      {ad: 'Galvanizli Sac' },
      {ad: 'Civata-Somun-Pul' },
      {ad: 'Alüminyum' },
      {ad: 'Profil' },
      {ad: 'Granit' },
      {ad: 'Ayna/Cam' },
      {ad: 'Elektronik' },
      {ad: 'Diğer' },
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
