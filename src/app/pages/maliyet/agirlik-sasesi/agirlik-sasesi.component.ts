import { Component } from '@angular/core';
import { DATA_PERSONELLER } from 'src/assets/personeller';
import { STOKLAR, URUNLER } from 'src/assets/urunler';

@Component({
  selector: 'app-agirlik-sasesi',
  templateUrl: './agirlik-sasesi.component.html',
  styleUrls: ['./agirlik-sasesi.component.scss']
})
export class AgirlikSasesiComponent {
  rowData:any =STOKLAR;
  selectedRows:any;
  personeller=DATA_PERSONELLER
  selectedPersonelRows:any;
  urunler:any=URUNLER
  selectedUrunGrubu:any;
  birimMaliyet:any;
  frm: any = {
    urunGrubu:{id: 1, ad: 'Kabin' },
  };


  butonTipi:any=[
    { id: 1, ad: 'Agırlık Arkada Duvardan Şase' },
    { id: 2, ad: 'Süspansiyon' },
    { id: 3, ad: 'Buton' },
  ]
  onUrunGrubuChange(urunGrubu: any): void {
    this.selectedUrunGrubu=urunGrubu;
 };
}
