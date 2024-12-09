import { Component, ViewChild } from '@angular/core';
import { AutoComplete } from 'primeng/autocomplete';
import { DATA_PERSONELLER } from 'src/assets/personeller';
import { DATA_STOKLAR, DOVIZ } from 'src/assets/stoklar';

@Component({
  selector: 'app-kabin-maliyet',
  templateUrl: './kabin-maliyet.component.html',
  styleUrls: ['./kabin-maliyet.component.scss']
})
export class KabinMaliyetComponent {

  rowData:any = DATA_STOKLAR;
  selectedRows:any;
  personeller=DATA_PERSONELLER
  selectedPersonelRows:any;
  constructor() {}

  frm: any = {
    ad: 'KABİN SÜSPANSİYONU 2/1',
    karkasTipleri: '',
    kapasite: '',
    askiTipi: '',
    karkasSekli: '',
    rayArasi: '',
    kosebent: '',
    sacAgirligi: 0,
    toplamAgirlik: 0,
    aciklama: '',
  };
 

}
