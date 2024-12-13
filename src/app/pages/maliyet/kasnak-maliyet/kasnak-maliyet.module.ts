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



@NgModule({
  declarations: [
    KasnakMaliyetComponent,
      KasnakDesignComponent,
        KasnakMaliyetFormComponent
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
        ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
        RouterModule.forChild([
          // { path: 'create', component: CreateButonMaliyetComponent },
          // { path: 'list', component: ListButonMaliyetComponent },
    
    
        ])
  ]
})
export class KasnakMaliyetModule { }
