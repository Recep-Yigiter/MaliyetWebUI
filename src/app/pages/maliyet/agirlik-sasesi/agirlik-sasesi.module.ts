import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgirlikSasesiComponent } from './agirlik-sasesi.component';
import { AgirlikSasesiDesignComponent } from './core/design/design.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { TableModule } from 'primeng/table';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import { ListboxModule } from 'primeng/listbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';
import { AgirlikSasesiGenelGiderlerTableComponent } from './core/tables/genel-giderler-table';
import { AgirlikSasesiIscilikGiderlerTableComponent } from './core/tables/iscilik-giderler-table';
import { AgirlikSasesiMalzemeGiderlerTableComponent } from './core/tables/malzeme-giderler-table';
import { AgirlikSasesiMaliyetTableComponent } from './core/tables/maliyet-table';
import { AgirlikSasesiFiyatTableComponent } from './core/tables/fiyat-table';
import { AgirlikSasesiMaliyetFormComponent } from './core/components/suspansiyon-maliyet-form';



@NgModule({
  declarations: [
    AgirlikSasesiComponent,
    AgirlikSasesiDesignComponent,
    AgirlikSasesiMaliyetFormComponent,
        AgirlikSasesiGenelGiderlerTableComponent,
        AgirlikSasesiIscilikGiderlerTableComponent,
        AgirlikSasesiMalzemeGiderlerTableComponent,
        AgirlikSasesiMaliyetTableComponent,
        AgirlikSasesiFiyatTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
        AgGridAngular,
        AgGridModule,
        TableModule,
        AutoCompleteModule,
        DropdownModule,
        DividerModule,
        DialogModule,
        AccordionModule,
        ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
        RouterModule.forChild([
          // { path: 'create', component: CreateButonMaliyetComponent },
          // { path: 'list', component: ListButonMaliyetComponent },
    
    
        ])
  ]
})
export class AgirlikSasesiModule { }
