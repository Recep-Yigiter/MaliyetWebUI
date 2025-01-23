import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { PersonelService } from 'src/app/core/services/repository/personel.service';
import { StokService } from 'src/app/core/services/repository/stok.service';
import { defaultColDef } from 'src/default-col-def';
import { CreateButonComponent } from './create-buton/create-buton.component';
import { DeleteModalComponents } from 'src/shared/dialogs/informations/delete-modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateButonComponent } from './update-buton/update-buton.component';
import { ButonService } from 'src/app/core/services/repository/buton.service';

@Component({
  selector: 'app-buton',
  templateUrl: './buton.component.html',
  styleUrls: ['./buton.component.scss']
})
export class ButonComponent implements OnInit {
  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'multiple';
  private gridApi!: GridApi<any>;
  public localeText: {[key:string]:string} = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  buttonUpdateDisabled: boolean = true;
  selectedButon: any;
  selectedButons: any;




  constructor(private ButonService:ButonService,private StokService:StokService,private PersonelService:PersonelService,private NgbModal:NgbModal) {
    
    
  }
  ngOnInit(): void {
  
  }



  colDefs: ColDef[] = [
    { field: 'ad', width: 300 },
    { field: 'butonTipi', width: 120 },
    { field: 'durakSayisi', width: 70 },
    { field: 'butonCesidi', width: 70 },
    { field: 'butonOzellik', width: 70 },

  ];

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData =(await this.ButonService.GetAll()).items;
   
    
  }

  rowClick() {

    const selectedRow = this.gridApi.getSelectedRows()[0];
    this.selectedButon = selectedRow;

    if (selectedRow) {
      this.buttonDisabled = false;
    } else {
      this.buttonDisabled = true;
    }

  }
  rowDblClick(event) {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.selectedButon = event.data;
  }





  visible: boolean;
  yeniButon(){
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


//#region yeni Buton oluşturmak için açılan  DİALOG---------------------
kaydet(){
//  var test= {
//     ad: "string",
//     birim: "string",
//     butonTipi: "string",
//     durakSayisi: "string",
//     butonCesidi: "string",
//     butonOzellik: "string",
//     urunBilesenler: [
//       {
//         miktar: 0,
//         olusturmaTarihi: "2024-12-30T12:00:03.151Z",
//         stok: {
//           id: 1,
//           ad: "string",
//           birim: "string",
//           birimFiyat: 0,
//           dovizCinsi: "string"
//         }
//       }
//     ],
//     iscilikGiderler: []
//   }

  var buton={
    ad:this.frm.ad,
    birim:"ADET",
    butonTipi:this.frm.butonTipi.ad,
    durakSayisi:this.frm.durakSayisi.ad,
    butonCesidi:this.frm.butonCesidi.ad,
    butonOzellik:this.frm.boyOzellik.ad,
    urunBilesenler:this.bilesenler,
    iscilikGiderler:this.iscilikGiderler
  }

  console.log(buton);
   this.ButonService.create(buton,async() =>{
   this.visible=false;
   this.rowData =await this.ButonService.GetAll();
   })

}


frm:any={
  butonTipi: { id: 1, ad: 'Buton Butonu' },
  durakSayisi:{ id: 1, ad: '2' },
  butonCesidi:{ id: 1, ad: 'Cam' },
  boyOzellik: { id: 1, ad: 'Tam Boy' },
}









selectedButonTipi:any;
butonTipi=[
  { id: 1, ad: 'Buton Butonu' },
  { id: 2, ad: 'Kat Butonu' },
]
onButonTipiChange(item: any): void {
  this.selectedButonTipi=item;
};


selectedDurakSayisi:any;
durakSayisi=[
  { id: 1, ad: '2' },
  { id: 2, ad: '3' },
  { id: 3, ad: '4' },
  { id: 4, ad: '5' },
  { id: 5, ad: '6' },
  { id: 6, ad: '7' },
  { id: 7, ad: '8' },
  { id: 8, ad: '9' },
  { id: 9, ad: '10' },
  { id: 10, ad: '11' },
  { id: 11, ad: '12' },
  { id: 12, ad: '13' },
  { id: 13, ad: '14' },
]
onDurakSayisiChange(item: any): void {
  this.selectedDurakSayisi=item;
};



selectedButonCesidi:any;
butonCesidi=[
  { id: 1, ad: 'Cam' },
  { id: 2, ad: 'Mekanik' },
]
onButonCesidiChange(item: any): void {
  this.selectedButonCesidi=item;
};





selectedBoyOzellik:any;
boyOzellik=[
  { id: 1, ad: 'Tam Boy' },
  { id: 2, ad: 'Yarım Boy' },
]
onBoyOzellikChange(item: any): void {
  this.selectedBoyOzellik=item;
};



//#endregion



//#region yeni Buton için stok ekleme  DİALOG--------------------------------
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



//#region  yeni Buton için İşçi giderler ekleme  DİALOG-----------------------
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












async yeni(){
  const modalRef = this.NgbModal.open(CreateButonComponent, {
    size: 'xl',
    backdrop: 'static',
  });
  modalRef.result.then(async (item) => {
    if (item) {
      this.rowData=(await this.ButonService.GetAll()).items
    }
  });
}

sil(){
  if (this.selectedButon) {
    const modalRef = this.NgbModal.open(DeleteModalComponents, {
      size: 'sm',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = 'Birim Kartı';
    modalRef.result.then(async(event) => {
      if (event == true) {
        this.ButonService.delete(this.selectedButon.id, async() => {
          this.rowData=(await this.ButonService.GetAll()).items
        });
      
      }
    });
  }
}

guncelle(){
  if (this.selectedButon) {
    const modalRef = this.NgbModal.open(UpdateButonComponent, {
      size: 'xl',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = this.selectedButon;
    modalRef.result.then(async (item) => {
      if (item) {
        location.reload()
      }
    });
  }
  
}















}
