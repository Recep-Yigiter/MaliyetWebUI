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
  ad
  kontrolPaneli
  sivaAltiUstu
  kaplama
  butonTipi
  ekran
  sistem


  colDefs: ColDef[] = [
    { field: 'ad', width: 200 },
    { field: 'model', width: 150 },
    { field: 'kontrolPaneli', width: 150 },
    { field: 'sivaAltiUstu', width: 150 },
    { field: 'kaplama', width: 200 },
    { field: 'butonTipi', width: 200 },
    { field: 'ekran', width: 150 },
    { field: 'sistem', width: 150 },

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






bilesenler:any=[];
selectedBilesenRow:any;
malzemeToplam:any;
iscilikGiderler:any=[];
genelGiderler:any=[];








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
      size: 'md',
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
        this.rowData =(await this.ButonService.GetAll()).items;
      }
    });
  }
  
}















}
