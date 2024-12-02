import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
} from 'ag-grid-community';
import { AG_GRID_LOCALE_TR } from 'AG_GRID_LOCALE_TR ';
import { defaultColDef } from 'default-col-def';
import { AutoComplete, AutoCompleteCompleteEvent } from 'primeng/autocomplete';

@Component({
  selector: 'app-suspansiyon-maliyet',
  templateUrl: './suspansiyon-maliyet.component.html',
  styleUrls: ['./suspansiyon-maliyet.component.scss'],
})
export class SuspansiyonMaliyetComponent {
  rowData = [
    {id:11, ad: 'SAC', miktar: 1, birim: 'KG', birimFiyat: 28 },
    {
      id: 1,
      ad: 'M12*30 C.S.P.R ',
      miktar: 1,
      birim: 'TAKIM',
      birimFiyat: 5.18,
    },
    {
      id: 2,
      ad: 'M10*20 C.S.P.R',
      miktar: 1,
      birim: 'TAKIM',
      birimFiyat: 3.23,
    },
    { id: 3, ad: 'M8*20 C.S.P.R', miktar: 1, birim: 'TAKIM', birimFiyat: 1.87 },
    { id: 4, ad: 'FREN BLOĞU ', miktar: 1, birim: 'ADET', birimFiyat: 3915 },
    { id: 5, ad: 'BOYA ', miktar: 1, birim: 'KG', birimFiyat: 2.5 },
    {
      id: 6,
      ad: 'KABİN PATEN BLOĞU ',
      miktar: 1,
      birim: 'ADET',
      birimFiyat: 257.5,
    },
    { id: 7, ad: 'YAĞDANLIK	 ', miktar: 1, birim: 'ADET', birimFiyat: 40 },
    { id: 8, ad: 'RADANSA	 ', miktar: 1, birim: 'ADET', birimFiyat: 30 },
  ];

  metaKey: boolean = false;

  constructor(private fb: FormBuilder) {
  }

  selectedRows: any[];

  selectRows() {
  }

  deneme: any = [{ ad: '2/1' }, { ad: '1/1' }];

  frm: any = {
    ad: 'KABİN SÜSPANSİYONU 2/1',
    kapasite: '1250 den küçük',
    askiTipi: '',
    rayArasi: '1570 mm',
    kosebent: '20',
    sacAgirligi: '312.71 kg',
    aciklama: '',
  };

  hesapla() {
    
  }
  @ViewChild(AutoComplete) autoComplete: AutoComplete;  // p-autocomplete bileşenini referans alıyoruz

  urunler: any[] = [
    { ad: 'KABİN SÜSPANSİYONU 2/1', code: 'KS2/1',selectedRowData:[{
      id: 1,
      ad: 'M12*30 C.S.P.R ',
      miktar: 1,
      birim: 'TAKIM',
      birimFiyat: 5.18,
    },
    {
      id: 2,
      ad: 'M10*20 C.S.P.R',
      miktar: 1,
      birim: 'TAKIM',
      birimFiyat: 3.23,
    },] },
    { ad: 'KABİN SÜSPANSİYONU 1/1', code: 'KS1/1',selectedRowData:[] },

  ];
  filteredUrunler: any[] | undefined;
  selectedUrunler: any;
  onFocus() {
    this.autoComplete.show();
    this.filterCountry({ query: '' });
  }

  filterCountry(event: any) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.urunler as any[]).length; i++) {
      let country = (this.urunler as any[])[i];
      if (country.ad.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredUrunler = filtered;
  }


  ngModelChange(){
  this.selectedRows=this.selectedUrunler.selectedRowData
  console.log( this.selectedRows)
  }
}
