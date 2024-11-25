import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AG_GRID_LOCALE_TR } from 'AG_GRID_LOCALE_TR ';
import { defaultColDef } from 'default-col-def';

@Component({
  selector: 'app-buton-maliyet',
  templateUrl: './buton-maliyet.component.html',
  styleUrls: ['./buton-maliyet.component.scss'],
})
export class ButonMaliyetComponent {
  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'multiple';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  selectedRow: any;

  constructor(private fb: FormBuilder) {}

  public frm: FormGroup = this.fb.group({
    kod: [null, [Validators.required, Validators.maxLength(16)]],
    ad: [null, [Validators.required, Validators.maxLength(16)]],
    aciklama: [null, [Validators.required, Validators.maxLength(16)]],
  });
  get kod() {
    return this.frm.get('kod');
  }
  get ad() {
    return this.frm.get('ad');
  }
  get aciklama() {
    return this.frm.get('aciklama');
  }

  colDefs: ColDef[] = [
    { field: 'ad', width: 300,
        headerCheckboxSelection: true,  // Tüm satırlar için checkbox ekler
      checkboxSelection: true, },
    { field: 'miktar', width: 70, },
    { field: 'birim', width: 70,  },
    { field: 'birimFiyat', width: 70,  },
  ];

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = [
      { ad: 'BUTON KASASI SAC', miktar: 6.5, birim: 'KG', birimFiyat: 234 },
      { ad: 'BOYA ', miktar: 6.5, birim: 'KG', birimFiyat: 34 },
      { ad: 'KAPAK SATİNE 1.5MM ', miktar: 0.77, birim: 'KG', birimFiyat: 346 },
      { ad: 'BUTON KARTI KIRMIZI LED ', miktar: 5.75, birim: 'ADET', birimFiyat: 66 },
      { ad: 'BUTON KASA(PLASTİK GRUP) ', miktar: 7, birim: 'KG', birimFiyat: 228 },
      { ad: 'GDOT 6 GÖSTERGE ', miktar: 7, birim: 'KG', birimFiyat: 4 },
    ];
  }

  rowClick() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.selectedRow = selectedRows;
    this.buttonDisabled = false;
  }












  rowDataPersonel: any[];
  public rowSelectionPersonel: 'single' | 'multiple' = 'multiple';
  private gridApiPersonel!: GridApi<any>;
  selectedRowPersonel: any;
  colDefsPersonel: ColDef[] = [
    { field: 'ad', width: 300,
        headerCheckboxSelection: true,  // Tüm satırlar için checkbox ekler
      checkboxSelection: true, },

  ];

  async getListPersonel(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowDataPersonel = [];
  }

  rowClickPersonel() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.selectedRow = selectedRows;
    this.buttonDisabled = false;
  }






}
