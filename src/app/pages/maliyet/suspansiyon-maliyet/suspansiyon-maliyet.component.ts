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
  selectedRows: any[];
  selectedPersonelRows: any[];
  filteredUrunler: any[] | undefined;
  selectedUrunler: any;

  rowData = [
    { id: 11, ad: 'SAC', miktar: 1, birim: 'KG', birimFiyat: 28 },
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
    {
      id: 3,
      ad: 'M8*20 C.S.P.R',
      miktar: 1,
      birim: 'TAKIM',
      birimFiyat: 1.87,
    },
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
  rowDataPersonel = [
    {
      id: 1,
      ad: 'Recep YİĞİTER ',
    },

  ];
  constructor(private fb: FormBuilder) {}

  askiTipleri: any = [{ ad: '2/1' }, { ad: '1/1' }];
  kapasite: any = [{ ad: "0-1250KG"}, { ad: "< 1250KG"}, { ad: "0-1600KG"}];
  rayArasi: any = [{ ad: "1570 mm",code:1570}, { ad: "3170 mm",code:3170}];
  suspansiyonCinsi: any = [{ ad: "Kabin Karkası "}, { ad: "Ağırlık Karkası"}];

  frm: any = {
    ad:'KABİN SÜSPANSİYONU 2/1',
    suspansiyonCinsi:"",
    kapasite: { ad: "0-1250KG"},
    askiTipi: { ad: '2/1' },
    rayArasi: 3170,
    kosebent: 20,
    sacAgirligi: 0,
    toplamAgirlik: 0,
    aciklama: '',
  }
  hesapla() {

    if (this.frm.askiTipi.ad=='2/1') {
      if (this.frm.kapasite.ad==="1250'den küçük") {
        this.frm.sacAgirligi=(this.frm.rayArasi-100)/86.2*4 +12+2+10+this.frm.rayArasi/235+(this.frm.rayArasi+100)/86.2*2+10+2;
        this.frm.toplamAgirlik=this.frm.sacAgirligi +this.frm.kosebent*4;
      }
      else if(this.frm.kapasite.ad==="1250'den büyük"){
         this.frm.sacAgirligi=(this.frm.rayArasi-100)/86.2*4 +12+2+10+this.frm.rayArasi/235+(this.frm.rayArasi+300)/86.2*3+10+2;
         this.frm.toplamAgirlik=this.frm.sacAgirligi +this.frm.kosebent*4;
      }
    }
    else{
      this.frm.sacAgirligi=(this.frm.rayArasi-100)/86.2*4+12*2/2+10+10+2
      this.frm.toplamAgirlik=this.frm.sacAgirligi +this.frm.kosebent*4;
    }

    


  }
  @ViewChild(AutoComplete) autoComplete: AutoComplete;

  urunler: any[] = [
    {
      ad: 'KABİN SÜSPANSİYONU 2/1',
      code: 'KS2/1',
      selectedRowData: [
        { id: 11, ad: 'SAC', miktar: 1, birim: 'KG', birimFiyat: 28 },
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
        {
          id: 3,
          ad: 'M8*20 C.S.P.R',
          miktar: 1,
          birim: 'TAKIM',
          birimFiyat: 1.87,
        },
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
      ],
    },
    {
      ad: 'KABİN SÜSPANSİYONU 1/1',
      code: 'KS1/1',
      selectedRowData: [
        {
          id: 2,
          ad: 'M10*20 C.S.P.R',
          miktar: 1,
          birim: 'TAKIM',
          birimFiyat: 3.23,
        },
      ],
    },

    {
      ad: 'AĞIRLIK SÜSPANSİYONU 1/1 TEK SIRA',
      code: 'KS1/1',
      selectedRowData: [],
    },
    {
      ad: 'AĞIRLIK SÜSPANSİYONU 1/1 ÇİFT SIRA',
      code: 'KS1/1',
      selectedRowData: [],
    },
    {
      ad: 'AĞIRLIK SÜSPANSİYONU 1/1 TEK SIRA DUBLEX',
      code: 'KS1/1',
      selectedRowData: [],
    },
    {
      ad: 'AĞIRLIK SÜSPANSİYONU 1/1 ÇİFT SIRA DUBLEX',
      code: 'KS1/1',
      selectedRowData: [],
    },
    {
      ad: 'AĞIRLIK SÜSPANSİYONU 2/1 TEK SIRA',
      code: 'KS1/1',
      selectedRowData: [],
    },
    {
      ad: 'AĞIRLIK SÜSPANSİYONU 2/1 ÇİFT SIRA',
      code: 'KS1/1',
      selectedRowData: [],
    },
    {
      ad: 'AĞIRLIK SÜSPANSİYONU 2/1 TEK SIRA DUBLEX',
      code: 'KS1/1',
      selectedRowData: [],
    },
    {
      ad: 'AĞIRLIK SÜSPANSİYONU 2/1 ÇİFT SIRA DUBLEX',
      code: 'KS1/1',
      selectedRowData: [],
    },
  ];

  onFocus() {
    this.autoComplete.show();
    this.filterUrunler({ query: '' });
  }

  filterUrunler(event: any) {
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

  ngModelChange() {
    this.rowData = [
      { id: 11, ad: 'SAC', miktar: 1, birim: 'KG', birimFiyat: 28 },
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
      {
        id: 3,
        ad: 'M8*20 C.S.P.R',
        miktar: 1,
        birim: 'TAKIM',
        birimFiyat: 1.87,
      },
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
    this.selectedRows = this.selectedUrunler?.selectedRowData;


    if (this.frm.askiTipi.ad=='2/1') {
      if (this.frm.kapasite.ad==="1250'den küçük") {
        this.frm.rayArasi=1570;
      }
      else if(this.frm.kapasite.ad==="1250'den büyük"){
        this.frm.rayArasi=3170;
      }
    }
    else{
      this.frm.rayArasi=1570;
      this.frm.kosebent=17.5
    }
  }
}
