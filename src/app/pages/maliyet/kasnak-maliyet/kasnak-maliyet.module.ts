import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KasnakMaliyetComponent } from './kasnak-maliyet.component';
import { KasnakDesignComponent } from './core/design/design.component';
import { KasnakMaliyetFormComponent } from './core/components/kasnak-maliyet-form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import { ListboxModule } from 'primeng/listbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { KasnakGenelGiderlerTableComponent } from './core/tables/genel-giderler-table';
import { KasnakIscilikGiderlerTableComponent } from './core/tables/iscilik-giderler-table';
import { KasnakMalzemeGiderlerTableComponent } from './core/tables/malzeme-giderler-table';
import { KasnakMaliyetTableComponent } from './core/tables/maliyet-table';
import { KasnakFiyatTableComponent } from './core/tables/fiyat-table';
import { AccordionModule } from 'primeng/accordion';



@NgModule({
  declarations: [
    KasnakMaliyetComponent,
      KasnakDesignComponent,
        KasnakMaliyetFormComponent,
       KasnakGenelGiderlerTableComponent,
       KasnakIscilikGiderlerTableComponent,
       KasnakMalzemeGiderlerTableComponent,
       KasnakMaliyetTableComponent,
       KasnakFiyatTableComponent     
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
        ListboxModule,
        RadioButtonModule,
        DialogModule,
        AccordionModule,
        ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
        RouterModule.forChild([
          // { path: 'create', component: CreateButonMaliyetComponent },
          // { path: 'list', component: ListButonMaliyetComponent },
    
    
        ])
  ]
})
export class KasnakMaliyetModule { }
