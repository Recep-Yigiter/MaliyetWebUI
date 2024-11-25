import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AG_GRID_LOCALE_TR } from 'AG_GRID_LOCALE_TR ';
import { defaultColDef } from 'default-col-def';

@Component({
  selector: 'app-suspansiyon-maliyet',
  templateUrl: './suspansiyon-maliyet.component.html',
  styleUrls: ['./suspansiyon-maliyet.component.scss']
})
export class SuspansiyonMaliyetComponent {
  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'multiple';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  selectedRow: any;

  constructor(private fb: FormBuilder) {}

  public frm: FormGroup = this.fb.group({
    ad: [null, [Validators.required, Validators.maxLength(16)]],
    aciklama: [null, [Validators.required, Validators.maxLength(16)]],
    kapasite: [null, [Validators.required, Validators.maxLength(16)]],
    askiTipi: [null, [Validators.required, Validators.maxLength(16)]],
    rayArasi: [null, [Validators.required, Validators.maxLength(16)]],
    sacAgirlik: [null, [Validators.required, Validators.maxLength(16)]],
    kosebent: [null, [Validators.required, Validators.maxLength(16)]],



  });

  get ad() {
    return this.frm.get('ad');
  }
  get kapasite() {
    return this.frm.get('kapasite');
  }
  get askiTipi() {
    return this.frm.get('askiTipi');
  }
  get rayArasi() {
    return this.frm.get('rayArasi');
  }
  get kosebent() {
    return this.frm.get('kosebent');
  }
  get sacAgirlik() {
    return this.frm.get('sacAgirlik');
  }

  get aciklama() {
    return this.frm.get('aciklama');
  }

  colDefs: ColDef[] = [
    { field: 'ad', width: 300, headerCheckboxSelection: true,  // Tüm satırlar için checkbox ekler
      checkboxSelection: true,  }, // Tüm satırlar için checkbox ekler checkboxSelection: true,
    { field: 'miktar', width: 70, },
    { field: 'birim', width: 70,  },
    { field: 'birimFiyat', width: 70,  },
  ];

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = [
      { ad: 'SAC', miktar: 1, birim: 'KG', birimFiyat: 28 },
      { ad: 'M12*30 C.S.P.R ', miktar: 1, birim: 'TAKIM', birimFiyat: 5.18 },
      { ad: 'M10*20 C.S.P.R', miktar: 1, birim: 'TAKIM', birimFiyat: 3.23 },
      { ad: 'M8*20 C.S.P.R', miktar: 1, birim: 'TAKIM', birimFiyat: 1.87 },
      { ad: 'FREN BLOĞU ', miktar: 1, birim: 'ADET', birimFiyat: 3915 },
      { ad: 'BOYA ', miktar:1, birim: 'KG', birimFiyat: 2.5 },
      { ad: 'KABİN PATEN BLOĞU ', miktar: 1, birim: 'ADET', birimFiyat: 257.5 },
      { ad: 'YAĞDANLIK	 ', miktar: 1, birim: 'ADET', birimFiyat: 40 },
      { ad: 'RADANSA	 ', miktar: 1, birim: 'ADET', birimFiyat: 30 },
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
    this.rowDataPersonel = [{ad:'Recep YİĞİTER'}];
  }

  rowClickPersonel() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.selectedRow = selectedRows;
    this.buttonDisabled = false;
  }






}
