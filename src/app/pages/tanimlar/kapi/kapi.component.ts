import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { ButonService } from 'src/app/core/services/repository/buton.service';
import { KabinService } from 'src/app/core/services/repository/kabin.service';
import { KapiService } from 'src/app/core/services/repository/kapi.service';
import { PersonelService } from 'src/app/core/services/repository/personel.service';
import { StokService } from 'src/app/core/services/repository/stok.service';
import { ISCILIK } from 'src/assets/DATA/iscilik';
import { DATA_URUNLER } from 'src/assets/urunler';
import { defaultColDef } from 'src/default-col-def';

@Component({
  selector: 'app-kapi',
  templateUrl: './kapi.component.html',
  styleUrls: ['./kapi.component.scss']
})
export class KapiComponent implements OnInit {
  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'multiple';
  private gridApi!: GridApi<any>;
  public localeText: {[key:string]:string} = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  buttonUpdateDisabled: boolean = true;
  selectedStok: any;
  selectedStoks: any;




  constructor(private KapiService:KapiService,private StokService:StokService,private PersonelService:PersonelService) {
    
    
  }
  ngOnInit(): void {
  
  }



  colDefs: ColDef[] = [
    { field: 'ad', width: 300 },
   { field: 'yon', width: 70 },
   { field: 'kapiYuksekligi', width: 70 },
   { field: 'kapiGenisligi', width: 70 },
   { field: 'kapiTipi', width: 70 },
   { field: 'uygunluk', width: 70 },
   { field: 'kaplama', width: 70 },

  ];

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData =await this.KapiService.GetAll();

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
    this.frm.ad='';
    this.iscilikGiderler=[];
    this.bilesenler=[];
    this.visible=true;
  }


bilesenler:any=[];
selectedBilesenRow:any;
malzemeToplam:any;
iscilikGiderler:any=[];
genelGiderler:any=[];


//#region yeni Kabin oluşturmak için açılan  DİALOG---------------------
kaydet(){


  var buton={
    ad:this.frm.ad,
    birim:"ADET",
    yon:this.frm.yon.ad,
    kapiYuksekligi:this.frm.kapiYuksekligi.ad,
    kapiGenisligi:this.frm.kapiGenisligi.ad,
    kapiTipi:this.frm.kapiTipi.ad,
    uygunluk:"81-20",
    kaplama:this.frm.kaplama.ad,
    urunBilesenler:this.bilesenler,
    iscilikGiderler:this.iscilikGiderler
  }

  console.log(buton);
   this.KapiService.create(buton,async() =>{
   this.visible=false;
   this.rowData =await this.KapiService.GetAll();
   })

}



frm:any={
  yon: { id: 1, ad: 'Sağ' },
  kapiYuksekligi: { id: 1, ad: '200' },
  kapiGenisligi: { id: 1, ad: '70' },
  kapiTipi: { id: 1, ad: 'Otomatik' },
  kaplama:{ id: 1, ad: 'Satine' }
}





selectedYon:any;
yon=[
  { id: 1, ad: 'Sağ' },
  { id: 2, ad: 'Sol' },
  { id: 3, ad: 'Merkezi' },
]
onYonChange(item: any): void {
  this.selectedYon=item;
};


selectedKapiYukseklik:any;
kapiYuksekligi=[
  { id: 1, ad: '200' },
  { id: 2, ad: '210' },
]
onKapiYuksekligiChange(item: any): void {
  this.selectedKapiYukseklik=item;
};


selectedKapiGenisligi:any;
kapiGenisligi=[
  { id: 1, ad: '70' },
  { id: 2, ad: '80' },
  { id: 3, ad: '90' },
]
onKapiGenisligiChange(item: any): void {
  this.selectedKapiGenisligi=item;
};


selectedKapiTipi:any;
kapiTipi = [
  { id: 1, ad: 'Otomatik' },
  { id: 2, ad: 'İç Güvenlik' },
  { id: 3, ad: 'Yarı Otomatik' },
  { id: 4, ad: 'Dairesel' },
];
onKapiTipiChange(kapasite: any): void {
  this.selectedKapiTipi=kapasite;
};


selectedKaplama:any;
kaplama = [
  { id: 1, ad: 'Satine' },
  { id: 2, ad: 'Decoplate' },
];

onKaplamaChange(kapasite: any): void {
  this.selectedKaplama=kapasite;
};
   
     

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
      var personel={
        personel:element
      }
      this.iscilikGiderler.push(personel)
    });
     this.personellerVisible=false;
  }


//#endregion




}
