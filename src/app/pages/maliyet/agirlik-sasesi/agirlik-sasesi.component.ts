import { Component } from '@angular/core';


@Component({
  selector: 'app-agirlik-sasesi',
  templateUrl: './agirlik-sasesi.component.html',
  styleUrls: ['./agirlik-sasesi.component.scss']
})
export class AgirlikSasesiComponent {
  rowData:any =[];
  selectedRows:any;
  personeller=[]
  selectedPersonelRows:any;
  urunler:any=[]
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
