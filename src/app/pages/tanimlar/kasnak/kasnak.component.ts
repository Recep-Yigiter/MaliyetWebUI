import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { PersonelService } from 'src/app/core/services/repository/personel.service';
import { StokService } from 'src/app/core/services/repository/stok.service';
import { defaultColDef } from 'src/default-col-def';
import { DeleteModalComponents } from 'src/shared/dialogs/informations/delete-modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateKasnakComponent } from './create-kasnak/create-kasnak.component';
import { UpdateKasnakComponent } from './update-kasnak/update-kasnak.component';
import { KasnakService } from 'src/app/core/services/repository/kasnak.service';

@Component({
  selector: 'app-kasnak',
  templateUrl: './kasnak.component.html',
  styleUrls: ['./kasnak.component.scss']
})
export class KasnakComponent implements OnInit {
  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'multiple';
  private gridApi!: GridApi<any>;
  public localeText: {[key:string]:string} = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  buttonUpdateDisabled: boolean = true;
  selectedKasnak: any;
  selectedKasnaks: any;




  constructor(private KasnakService:KasnakService,private NgbModal:NgbModal) {
    
    
  }
  ngOnInit(): void {
  
  }



  colDefs: ColDef[] = [
    { field: 'ad', width: 300 },
    { field: 'kasnakCapi', width: 120 },
    { field: 'kanalSayisi', width: 70 },
    { field: 'halatCapi', width: 70 },
    { field: 'kasnakTuru', width: 120 },

  ];

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData =(await this.KasnakService.GetAll()).items;
   
    
  }

  rowClick() {

    const selectedRow = this.gridApi.getSelectedRows()[0];
    this.selectedKasnak = selectedRow;

    if (selectedRow) {
      this.buttonDisabled = false;
    } else {
      this.buttonDisabled = true;
    }

  }
  rowDblClick(event) {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.selectedKasnak = event.data;
  }










frm:any={
  gunlukUretimSayisi:5,
  tahminiCalisanSayisi:10,
  ortalamaPersonelMaasi:0,
  kasnakCapi: { id: 1, ad: 'Hepsi' },
  kanalSayisi: { id: 1, ad: 'Hepsi' },
  halatCapi: { id: 1, ad: 'Hepsi' },
  kasnakTuru: { id: 1, ad: 'Hepsi' },
}









selectedKasnakCapi:any;
kasnakCapi=[
  { id: 1, ad: 'Hepsi' },
  { id: 2, ad: '240' },
  { id: 3, ad: '320' },
  { id: 4, ad: '400' },
]
onKasnakCapiChange(item: any): void {
  this.selectedKasnakCapi=item;
};


selectedKanalSayisi:any;
kanalSayisi=[
  { id: 1, ad: 'Hepsi' },
  { id: 2, ad: '4-5-6' },
  { id: 3, ad: '7-8' },
  { id: 4, ad: '9-10' },
  { id: 5, ad: '4' },
  { id: 6, ad: '5' },
  { id: 7, ad: '6' },
  { id: 8, ad: '7' },
  { id: 9, ad: '8' },
  { id: 10, ad: '9' },

]
onKanalSayisiChange(item: any): void {
  this.selectedKanalSayisi=item;
};



selectedHalatCapi:any;
halatCapi=[
  { id: 1, ad: 'Hepsi' },
  { id: 2, ad: 'Cam' },
  { id: 2, ad: 'Mekanik' },
]
onHalatCapiChange(item: any): void {
  this.selectedHalatCapi=item;
};






selectedKasnakTuru:any;
kasnakTuru = [
  { id: 1, ad: 'Hepsi' },
  { id: 2, ad: 'Kabin Kasnağı' },
  { id: 3, ad: 'Ağırlık Kasnağı' },
];

onKasnakTuruChange(kapasite: any): void {
  this.selectedKasnakTuru=kapasite;
};






async yeni(){
  const modalRef = this.NgbModal.open(CreateKasnakComponent, {
    size: 'xl',
    backdrop: 'static',
  });
  modalRef.result.then(async (item) => {
    if (item) {
      this.rowData=(await this.KasnakService.GetAll()).items
    }
  });
}

sil(){
  if (this.selectedKasnak) {
    const modalRef = this.NgbModal.open(DeleteModalComponents, {
      size: 'sm',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = 'Birim Kartı';
    modalRef.result.then(async(event) => {
      if (event == true) {
        this.KasnakService.delete(this.selectedKasnak.id, async() => {
          this.rowData=(await this.KasnakService.GetAll()).items
        });
      
      }
    });
  }
}

guncelle(){
  if (this.selectedKasnak) {
    const modalRef = this.NgbModal.open(UpdateKasnakComponent, {
      size: 'xl',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = this.selectedKasnak;
    modalRef.result.then(async (item) => {
      if (item) {
        location.reload()
      }
    });
  }
  
}















}
