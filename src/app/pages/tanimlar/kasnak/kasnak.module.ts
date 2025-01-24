import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KasnakComponent } from './kasnak.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { KasnakFormComponent } from './core/components/urun-form';
import { KasnakDesignComponent } from './core/design/design.component';
import { CreateKasnakComponent } from './create-kasnak/create-kasnak.component';
import { UpdateKasnakComponent } from './update-kasnak/update-kasnak.component';
import { AccordionModule } from 'primeng/accordion';


@NgModule({
  declarations: [
    KasnakComponent,
    KasnakFormComponent,
    KasnakDesignComponent,
    CreateKasnakComponent,
    UpdateKasnakComponent
  ],
  imports: [
    CommonModule,
         FormsModule,
            AgGridAngular,
            DividerModule,
            DialogModule,
            DropdownModule,
            TableModule,
            AccordionModule,
            ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
            RouterModule.forChild([
              // { path: 'create', component: CreateButonMaliyetComponent },
               { path: 'list', component: KasnakComponent },
        
        
            ])
  ]
})
export class KasnakModule { }
