import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { GenelGiderService } from 'src/app/core/services/repository/genel-gider.service';
import { defaultColDef } from 'src/default-col-def';
import { DeleteModalComponents } from 'src/shared/dialogs/informations/delete-modal';
import { CreateGenelGiderComponent } from './create-genel-gider/create-genel-gider.component';
import { UpdateGenelGiderComponent } from './update-genel-gider/update-genel-gider.component';
import { GENEL_GIDER } from 'src/shared/genel-giderler';
import { GENEL_GIDER_KATSAYI } from 'src/shared/genel-gider-katsayi';
import { GenelGiderKatsayiService } from 'src/app/core/services/repository/genel-gider-katsayi.service';
import { UpdateGenelGiderKatsayiComponent } from './update-genel-gider-katsayi/update-genel-gider-katsayi.component';

@Component({
  selector: 'app-genel-gider',
  templateUrl: './genel-gider.component.html',
  styleUrls: ['./genel-gider.component.scss']
})
export class GenelGiderComponent implements OnInit {
  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'multiple';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  buttonUpdateDisabled: boolean = true;
  selectedGenelGider: any;

  colDefs: ColDef[] = [
    { field: 'ad', width: 300 },
    { field: 'fabrika', width: 130 },
    { field: 'tur', width: 70 },
    { field: 'tutar', width: 70 },
  ];




  // Verileri kategoriye göre gruplama




  constructor(private GenelGiderService: GenelGiderService,
    private GenelGiderKatsayiService: GenelGiderKatsayiService,
    private NgbModal: NgbModal,

  ) { }

  genelGider: any;

  genelGiderKatsayi: any;


  birlesmisVeri: any
  gruplanmisVeri: any = {};
  objectKeys: any;
  async ngOnInit() {
    this.genelGider = (await this.GenelGiderService.GetAll()).items
    this.genelGiderKatsayi = (await this.GenelGiderKatsayiService.GetAll()).items


    this.birlesmisVeri = this.birlestir();
    this.gruplanmisVeri = this.gruplamaYap();
    this.objectKeys = Object.keys(this.gruplanmisVeri)


  }
  birlestir() {

    return this.genelGider.map(gider => {
      const katsayilar = this.genelGiderKatsayi
        .filter(katsayi => katsayi.ad === gider.ad && katsayi.fabrika === gider.fabrika)
        .reduce((acc, katsayi) => {
          katsayi.tutar = gider.tutar * katsayi.deger / 100;
          // acc[katsayi.tur] =gider.tutar*katsayi.deger/100;
          acc[katsayi.tur] = katsayi;
          return acc;
        }, {});

      return {
        ...gider,
        katsayilar
      };
    });
  }
  gruplamaYap() {
    const gruplanmisVeri = this.birlesmisVeri.reduce((acc, gider) => {
      if (!acc[gider.fabrika]) {
        acc[gider.fabrika] = [];
      }
      acc[gider.fabrika].push(gider);

      return acc;
    }, {});

    return gruplanmisVeri;

  }











  selectedItem: any | null = null;
  isSelected(item: any): boolean {
    return this.selectedRowEvent === item;
  }

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = (await this.GenelGiderService.GetAll()).items;;

  }
  selectedRowEvent: number | null = null;




  katsayilarArray: any = []
  selectedDialogRowEvent: any = [];
  rowClick(event) {

    if (this.selectedRowEvent === event) {
      this.selectedRowEvent = null;
      this.selectedGenelGider = null;
    } else {
      this.selectedRowEvent = event;
      this.selectedGenelGider = event;
    }
    if (this.selectedGenelGider) {
      this.buttonDisabled = false;
    } else {
      this.buttonDisabled = true;
    }


  }
  rowDblClick(event) {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.selectedGenelGider = event.data;
  }
  dialogRowClick(event) {
    this.selectedDialogRowEvent = event
  }






  async yeni() {
    const modalRef = this.NgbModal.open(CreateGenelGiderComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = 'Genel Gider Kartı';
    modalRef.result.then(async (item) => {
      if (item) {
        this.genelGider = (await this.GenelGiderService.GetAll()).items
        this.genelGiderKatsayi = (await this.GenelGiderKatsayiService.GetAll()).items
        this.birlesmisVeri = this.birlestir();
        this.gruplanmisVeri = this.gruplamaYap();
        this.objectKeys = Object.keys(this.gruplanmisVeri)

      }
    });
  }

  sil() {
    if (this.selectedGenelGider) {
      const modalRef = this.NgbModal.open(DeleteModalComponents, {
        size: 'sm',
        backdrop: 'static',
      });
      modalRef.componentInstance.data = 'Genel Gider';
      modalRef.result.then(async (event) => {
        if (event == true) {
          this.GenelGiderService.delete(this.selectedGenelGider.id, async () => {
            this.genelGider = (await this.GenelGiderService.GetAll()).items
            this.genelGiderKatsayi = (await this.GenelGiderKatsayiService.GetAll()).items
            this.birlesmisVeri = this.birlestir();
            this.gruplanmisVeri = this.gruplamaYap();
            this.objectKeys = Object.keys(this.gruplanmisVeri)
          });
        }
      });
    }
  }

  guncelle() {
    if (this.selectedGenelGider) {
      const modalRef = this.NgbModal.open(UpdateGenelGiderComponent, {
        size: 'md',
        backdrop: 'static',
      });
      modalRef.componentInstance.data = this.selectedGenelGider;
      modalRef.result.then(async (item) => {
        if (item) {
          this.genelGider = (await this.GenelGiderService.GetAll()).items
          this.genelGiderKatsayi = (await this.GenelGiderKatsayiService.GetAll()).items
          this.birlesmisVeri = this.birlestir();
          this.gruplanmisVeri = this.gruplamaYap();
          this.objectKeys = Object.keys(this.gruplanmisVeri)
        }
      });
    }

  }

  visibleKatsayilar: boolean = false;
  // katsayilar() {
  //   var test = this.selectedRowEvent['katsayilar'];
  //   const turler = new Set();
  //   this.genelGiderKatsayi.forEach(obj => { turler.add(obj.tur); });
  //   const benzersizTurler = [...turler];
  //   this.katsayilarArray = [];
  //   benzersizTurler.forEach(element => {
  //     if (test[`${element}`]) {
  //       this.katsayilarArray.push(test[`${element}`]);
  //     }
  //   });

  //   this.visibleKatsayilar = true;

  // }

  guncelleKatsayi() {



    if (this.selectedGenelGider) {
      const modalRef = this.NgbModal.open(UpdateGenelGiderKatsayiComponent, {
        size: 'md',
        backdrop: 'static',
      });
      modalRef.componentInstance.data = this.selectedGenelGider;
      modalRef.result.then(async (item) => {
        if (item) {

        }
      });
    }






    // this.GenelGiderKatsayiService.update("")
  }























}
