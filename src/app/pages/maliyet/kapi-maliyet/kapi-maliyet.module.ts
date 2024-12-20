import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KapiMaliyetComponent } from './kapi-maliyet.component';
import { KapiDesignComponent } from './core/design/design.component';
import { KapiMaliyetFormComponent } from './core/components/kasnak-maliyet-form';
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



@NgModule({
  declarations: [
    KapiMaliyetComponent,
          KapiDesignComponent,
            KapiMaliyetFormComponent
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
      ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
      RouterModule.forChild([
        // { path: 'create', component: CreateButonMaliyetComponent },
        // { path: 'list', component: ListButonMaliyetComponent },
      
      
      ])
  ]
})
export class KapiMaliyetModule { }
