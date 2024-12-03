import { Component } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AG_GRID_LOCALE_TR } from 'AG_GRID_LOCALE_TR ';
import { defaultColDef } from 'default-col-def';

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

  colDefs: ColDef[] = [
    { field: 'ad', width: 600 },
    { field: 'birim', width: 70 },
    { field: 'birimFiyat', width: 70 },
  ];

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = [
      { ad: 'BUTON KASASI SAC', miktar: 6.5, birim: 'KG', birimFiyat: 234 },
      { ad: 'BOYA ', miktar: 6.5, birim: 'KG', birimFiyat: 34 },
      { ad: 'KAPAK SATİNE 1.5MM ', miktar: 0.77, birim: 'KG', birimFiyat: 346 },
      { ad: 'BUTON KARTI KIRMIZI LED ',  miktar: 5.75,  birim: 'ADET',  birimFiyat: 66,},
      { ad: 'BUTON KASA(PLASTİK GRUP) ',  miktar: 7,  birim: 'KG',  birimFiyat: 228,},
      { ad: 'GDOT 6 GÖSTERGE ', miktar: 7, birim: 'KG', birimFiyat: 4 },
      { ad: 'SAC', miktar: 1, birim: 'KG', birimFiyat: 28 },
      { ad: 'M12*30 C.S.P.R ',  miktar: 1,  birim: 'TAKIM',  birimFiyat: 5.18,},
      { ad: 'M10*20 C.S.P.R',  miktar: 1,  birim: 'TAKIM',  birimFiyat: 3.23,},
      { ad: 'M8*20 C.S.P.R',  miktar: 1,  birim: 'TAKIM',  birimFiyat: 1.87,},
      { ad: 'FREN BLOĞU ', miktar: 1, birim: 'ADET', birimFiyat: 3915 },
      { ad: 'BOYA ', miktar: 1, birim: 'KG', birimFiyat: 2.5 },
      { ad: 'KABİN PATEN BLOĞU ',  miktar: 1,  birim: 'ADET',  birimFiyat: 257.5,},
      { ad: 'YAĞDANLIK	 ', miktar: 1, birim: 'ADET', birimFiyat: 40 },
      { ad: 'RADANSA	 ', miktar: 1, birim: 'ADET', birimFiyat: 30 },
    ];
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
}
