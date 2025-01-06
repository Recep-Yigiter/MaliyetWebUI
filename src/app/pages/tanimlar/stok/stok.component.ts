import { Component } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { StokService } from 'src/app/core/services/repository/stok.service';
import { defaultColDef } from 'src/default-col-def';

@Component({
  selector: 'app-stok',
  templateUrl: './stok.component.html',
  styleUrls: ['./stok.component.scss'],
})
export class StokComponent {
  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'multiple';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  buttonUpdateDisabled: boolean = true;
  selectedStok: any;
  selectedStoks: any;
  visible:any;
  colDefs: ColDef[] = [
    { field: 'ad', width: 300 },
    { field: 'stokGrubu', width: 130 },
    { field: 'birim', width: 70 },
    { field: 'birimFiyat', width: 70 },
  ];


  constructor(private StokService:StokService) { }

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = await this.StokService.GetAll();;
  }

  rowClick() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.selectedStoks = selectedRows;

    const selectedRow = this.gridApi.getSelectedRows()[0];
    this.selectedStok = selectedRow;

    if (selectedRows.length == 0) {
      this.buttonDisabled = true;
    } else {
      this.buttonDisabled = false;
    }

    if (selectedRows.length == 0) {
      this.buttonUpdateDisabled = true;
    } else if (selectedRows.length == 1) {
      this.buttonUpdateDisabled = false;
    } else {
      this.buttonUpdateDisabled = true;
    }
  }
  rowDblClick(event) {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.selectedStok = event.data;
  }


  kaydet(){
var stok={
  ad: this.frm.ad,
  birim: this.frm.birim.ad,
  birimFiyat: this.frm.birimFiyat,
  dovizCinsi: this.frm.dovizCinsi.ad,
  stokGrubu: this.frm.stokGrubu.ad
}

this.StokService.create(stok,async()=>{
      this.visible=false;
      this.rowData =await this.StokService.GetAll();
    })
  }



async EkleDialog(){
this.visible=true;
this.frm={
  ad:"",
  birim: { id: 1, ad: 'ADET' },
  stokGrubu:{ id: 1, ad: 'Sac' },
  birimFiyat:0,
  dovizCinsi:{ id: 1, ad: 'TL' },
 }
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
