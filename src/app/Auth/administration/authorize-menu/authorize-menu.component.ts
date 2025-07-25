import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { ApplicationService } from 'src/app/core/services/Identity/application.service';
import { defaultColDef } from 'src/shared/default-col-def';
import { RolAtamaModelComponent } from './rol-atama-model/rol-atama-model.component';

@Component({
  selector: 'app-authorize-menu',
  templateUrl: './authorize-menu.component.html',
  styleUrls: ['./authorize-menu.component.scss']
})
export class AuthorizeMenuComponent implements OnInit {

  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'multiple';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  selectedKabin: any;
  objectKeys: any;
  gruplanmisVeri: any;



  constructor(private ApplicationService: ApplicationService, private NgbModal: NgbModal) { }
  async ngOnInit() {

    this.rowData = (await this.ApplicationService.DefinitionEndPoints(
      () => { },
      (errorMessage) => { }));

    this.gruplama();

  }

  colDefs: ColDef[] = [
    { field: 'name', width: 300 },
    { field: 'actions', width: 300 },
  ];

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;

  }

  rowClick() {

    const selectedRow = this.gridApi.getSelectedRows()[0];
    this.selectedKabin = selectedRow;

    if (selectedRow) {
      this.buttonDisabled = false;
    } else {
      this.buttonDisabled = true;
    }


  }

  async yeni() {

  }

  sil() {

  }

  guncelle() {


  }





  gruplama() {
    const grouped = {};

    this.rowData.forEach(item => {
      const key = item.name;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(item);
    });

    this.gruplanmisVeri = grouped
    // this.objectKeys = Object.keys(this.gruplanmisVeri)

  }

  groupedKeys(): string[] {
    return this.gruplanmisVeri ? Object.keys(this.gruplanmisVeri) : [];
  }



  rolAta(menu, action) {


    var item: any = [menu, action];

    item = {
      ...item[1],
      menu: item[0]
    };

    const modalRef = this.NgbModal.open(RolAtamaModelComponent, {
      size: 'md',
      backdrop: 'static',
    });



    modalRef.componentInstance.data = item;
    modalRef.result.then(async (item) => {
      if (item) {
        // this.rowData = (await this.RoleService.GetAll()).items;
      }
    });





  }









































}
