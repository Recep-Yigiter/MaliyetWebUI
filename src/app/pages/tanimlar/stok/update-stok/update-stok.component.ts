import { Component, Input, OnInit } from '@angular/core';
import { StokService } from 'src/app/core/services/repository/stok.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-update-stok',
  templateUrl: './update-stok.component.html',
  styleUrls: ['./update-stok.component.scss'],
   providers:[CurrencyPipe]
})
export class UpdateStokComponent implements OnInit {
  @Input() data;

  constructor(
    private StokService: StokService,
    public activeModal: NgbActiveModal,

  ) {}

  ngOnInit(): void {

    this.frm={
      ad:this.data.ad,
      birim:  {ad: this.selectedBirim?this.selectedBirim:this.data.birim},
      stokGrubu:{ad: this.selectedStokGrubu?this.selectedStokGrubu:this.data.stokGrubu},
      birimFiyat:this.data.birimFiyat,
      dovizCinsi:{ad: this.selectedDovizCinsi?this.selectedDovizCinsi:this.data.dovizCinsi},

    }
  }


  Kaydet() {
    var createModel={
      id:this.data.id,
      ad: this.frm.ad,
      birim: this.frm.birim.ad,
      birimFiyat: this.frm.birimFiyat,
      dovizCinsi: this.frm.dovizCinsi.ad,
      stokGrubu: this.frm.stokGrubu.ad
    }

    
    this.StokService.update(
      createModel,
     async () => {
        this.activeModal.close(true);
      },(errorMessage) => {}
    );
    
  }



  cikis() {
    this.activeModal.close(false);
  }



  frm:any={}
    
    
    
    
    
    
    
    
    
  
    
    selectedBirim:any;
    birim=[
     {  ad: 'ADET' },
     {  ad: 'KG' },
     {  ad: 'M' },
     {  ad: 'M^2' },
     {  ad: 'TAKIM' },
  
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
      { ad: 'TL' },
      { ad: 'USD' },
      { ad: 'EURO' },
    ]
    onDovizCinsiChange(item: any): void {
      this.selectedDovizCinsi=item;
    };
    
    
    

}
