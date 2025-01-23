import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonelComponent } from './personel.component';
import { PersonelTanimlarDesignComponent } from './core/design/design.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { DividerModule } from 'primeng/divider';
import { RouterModule } from '@angular/router';
import { PersonelFormComponent } from './core/components/personel-form';
import { CreatePersonelComponent } from './create-personel/create-personel.component';
import { DropdownModule } from 'primeng/dropdown';
import { UpdatePersonelComponent } from './update-personel/update-personel.component';
import { StokSelectFormComponent } from './core/components/personel-select-form';



@NgModule({
  declarations: [
    PersonelComponent,
    PersonelTanimlarDesignComponent,
    PersonelFormComponent,
    CreatePersonelComponent,
    UpdatePersonelComponent,
    StokSelectFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular,
    DividerModule,
    DropdownModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      // { path: 'create', component: CreateButonMaliyetComponent },
        { path: 'list', component: PersonelComponent },


    ])
  ]
})
export class PersonelModule { }
