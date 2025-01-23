import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { DesignComponent } from 'src/shared/core/design/design.component';
import { StokSelectModalComponents } from 'src/shared/dialogs/stok-selected-modal';
import { GorevSelectModalComponents } from 'src/shared/dialogs/gorev-selected-modal';
import { AgGridAngular } from 'ag-grid-angular';
import { PersonelSelectModalComponents } from 'src/shared/dialogs/personel-selected-modal';
import { KapiGrupSelectModalComponents } from 'src/shared/dialogs/kapi-grup-selected-modal';
@NgModule({
  declarations: [
    AppComponent,
    DesignComponent,
    StokSelectModalComponents,
    PersonelSelectModalComponents,
    GorevSelectModalComponents,
    KapiGrupSelectModalComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    PagesModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AgGridAngular

  ],
  providers: [
     { provide: "baseUrl", useValue: "http://192.168.4.111:8082/api", multi: true },
     { provide: LocationStrategy, useClass: HashLocationStrategy, },
     ],
  bootstrap: [AppComponent]
})
export class AppModule { }
