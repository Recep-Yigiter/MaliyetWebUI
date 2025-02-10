import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgirlikSasesiComponent } from './agirlik-sasesi.component';
import { CreateAgirlikSasesiComponent } from './create-agirlik-sasesi/create-agirlik-sasesi.component';
import { UpdateAgirlikSasesiComponent } from './update-agirlik-sasesi/update-agirlik-sasesi.component';
import { AgirlikSasesiFormComponent } from './core/components/urun-form';
import { AgirlikSasesiDesignComponent } from './core/design/design.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AgirlikSasesiComponent,
    CreateAgirlikSasesiComponent,
    UpdateAgirlikSasesiComponent,
    AgirlikSasesiFormComponent,
    AgirlikSasesiDesignComponent
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
           { path: 'list', component: AgirlikSasesiComponent },
        
        
        ])
  ]
})
export class AgirlikSasesiModule { }
