import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { KabinService } from 'src/app/core/services/repository/kabin.service';
import { PersonelService } from 'src/app/core/services/repository/personel.service';
import { StokService } from 'src/app/core/services/repository/stok.service';
import { ISCILIK } from 'src/assets/DATA/iscilik';
import { DATA_URUNLER } from 'src/assets/urunler';
import { defaultColDef } from 'src/default-col-def';

@Component({
  selector: 'app-kabin',
  templateUrl: './kabin.component.html',
  styleUrls: ['./kabin.component.scss']
})
export class KabinComponent implements OnInit {
  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'multiple';
  private gridApi!: GridApi<any>;
  public localeText: {[key:string]:string} = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  buttonUpdateDisabled: boolean = true;
  selectedStok: any;
  selectedStoks: any;




  constructor(private KabinService:KabinService,private StokService:StokService,private PersonelService:PersonelService) {
    
    
  }
  ngOnInit(): void {
  
  }



  colDefs: ColDef[] = [
    { field: 'ad', width: 300 },
    { field: 'tur', width: 120 },
    { field: 'model', width: 70 },
    { field: 'kapasite', width: 70 },
    { field: 'kabinKaplama', width: 70 },
    { field: 'aksesuarKaplama', width: 70 },
    { field: 'zeminKaplama', width: 70 },
  ];

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData =await this.KabinService.GetAll();
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





  visible: boolean;
  yeni(){

    this.visible=true;
    
  }


bilesenler:any=[];
selectedBilesenRow:any;
malzemeToplam:any;
iscilikGiderler:any=[];
genelGiderler:any=[];
//#region yeni Kabin oluşturmak için açılan  DİALOG---------------------



frm:any={
  ad:"",
  birim:{ id: 1, ad: 'ADET' },
  tur:  { id: 1, ad: 'Normal Kabin' },
  model:  { id: 1, ad: 'ESB' },
  zeminKaplama:  { id: 1, ad: 'PVC' },
  kabinKaplama:   { id: 1, ad: 'ESB' },
  aksesuarKaplama:   { id: 1, ad: 'ESB' },
  kapasite:{ id: 1, deger: '320' }
}




selectedTur:any;
turler=[
  { id: 1, ad: 'Normal Kabin' },
]
onTurChange(item: any): void {
  this.selectedTur=item;
};


selectedModel:any;
modeller=[
  { id: 1, ad: 'ESB' },
]
onModelChange(item: any): void {
  this.selectedModel=item;
};



selectedZeminKaplama:any;
zeminKaplamalar=[
  { id: 1, ad: 'PVC' },
]
onZeminKaplamaChange(item: any): void {
  this.selectedZeminKaplama=item;
};


selectedKabinKaplama:any;
kabinKaplamalar=[
  { id: 1, ad: 'ESB' },
]
onKabinKaplamaChange(item: any): void {
  this.selectedKabinKaplama=item;
};

selectedAksesuarKaplama:any;
aksesuarKaplamalar=[
  { id: 1, ad: 'ESB' },
]
onAksesuarKaplamaChange(item: any): void {
  this.selectedAksesuarKaplama=item;
};


selectedKapasite:any;
kapasiteler = [
  { id: 1, deger: '320' },
  { id: 2, deger: '400' },
  { id: 3, deger: '480' },
  { id: 4, deger: '630' },
  { id: 5, deger: '800' },
  { id: 6, deger: '1000' },
  { id: 7, deger: '1250' },
  { id: 8, deger: '1600' },
];
onKapasiteChange(kapasite: any): void {
  this.selectedKapasite=kapasite;
};


selectedBirim:any;
birimler = [
  { id: 1, ad: 'ADET' },
  { id: 2, ad: 'KG' },
  { id: 3, ad: 'M' },
  { id: 4, ad: 'M^2' },
  { id: 5, ad: 'TAKIM' },

];
onBirimChange(item){
  this.selectedBirim=item;
}
kaydet(){

  var kabin={
    ad:this.frm.ad,
    birim:this.frm.birim.ad,
    tur:this.frm.tur.ad,
    model:this.frm.model.ad,
    kabinKaplama:this.frm.kabinKaplama.ad,
    zeminKaplama:this.frm.zeminKaplama.ad,
    aksesuarKaplama:this.frm.aksesuarKaplama.ad,
    kapasite:this.frm.kapasite.deger,
    urunBilesenler:this.bilesenler,
    personeller:this.iscilikGiderler
  }
   this.KabinService.create(kabin,async() =>{
   this.visible=false;
   this.rowData =await this.KabinService.GetAll();
   })

}

//#endregion



//#region yeni Kabin için stok ekleme  DİALOG--------------------------------
stoklar:any;
stoklarVisible:boolean;
selectedStokEkle:any;
async stokEkleDialog(){
this.stoklar= await this.StokService.GetAll();
this.stoklarVisible=true;
}
stokEkle(){

  this.selectedStokEkle.forEach(element => {
    element.miktar=0
    var test={
      id:0,
      miktar:element.miktar,
      stok:element
    }
    this.bilesenler.push(test)
  });
  this.stoklarVisible=false;
}
//#endregion



//#region  yeni Kabin için İşçi giderler ekleme  DİALOG-----------------------
personellerVisible:any;
personeller:any;
selectedPersonelEkle:any;


async personelEkleDialog(){
  this.personeller= await this.PersonelService.GetAll();
   this.personellerVisible=true;
  }

  personelEkle(){
    this.selectedPersonelEkle.forEach(element => {
      element.miktar=0;
      element.birim="SAAT";
      this.iscilikGiderler.push(element)
    });
     this.personellerVisible=false;
  }


//#endregion



}
