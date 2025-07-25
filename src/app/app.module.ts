import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { DesignComponent } from 'src/shared/core/design/design.component';
import { StokSelectModalComponents } from 'src/shared/dialogs/stok-selected-modal';
import { GorevSelectModalComponents } from 'src/shared/dialogs/gorev-selected-modal';
import { AgGridAngular } from 'ag-grid-angular';
import { PersonelSelectModalComponents } from 'src/shared/dialogs/personel-selected-modal';
import { KapiGrupSelectModalComponents } from 'src/shared/dialogs/kapi-grup-selected-modal';
import { KabinlerModalComponents } from 'src/shared/dialogs/filter-open-dialogs/kabinler-modal';
import { NoResultModalComponents } from 'src/shared/dialogs/informations/no-result-dialog';
import { AgirlikSaselerModalComponents } from 'src/shared/dialogs/filter-open-dialogs/agirlik-saseler-modal';
import { ButonlarModalComponents } from 'src/shared/dialogs/filter-open-dialogs/butonlar-modal';
import { KapilarModalComponents } from 'src/shared/dialogs/filter-open-dialogs/kapilar-modal';
import { ButonKartListModalComponents } from 'src/shared/dialogs/other-dialogs/buton-kart-list-modal';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag'; // TagModule'ü import et
import { DataViewModule } from 'primeng/dataview';
import { TableModule } from 'primeng/table';
import { CurrencyInputDirective } from 'src/shared/core/components/currency-input.directive';
import { ConfirmModalComponents } from 'src/shared/dialogs/informations/confirm-modal';
import { DeleteModalComponents } from 'src/shared/dialogs/informations/delete-modal';
import { ErrorMessageModalComponents } from 'src/shared/dialogs/informations/error-message-modal';
import { HtppErrorHandlerInterceptor } from './core/http-error-handler.interceptor';
import { RequestInterceptor } from './core/request.interceptor';
import { LoginComponent } from './Auth/login/login.component';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AuthInterceptor } from './core/auth.interceptor';
import { UnauthorizedInterceptor } from './core/services/unauthorized.interceptor';

export function tokenGetter() {
  return localStorage.getItem('tokenData');
}
@NgModule({
  declarations: [
    AppComponent,
    DesignComponent,
    StokSelectModalComponents,
    PersonelSelectModalComponents,
    GorevSelectModalComponents,
    KapiGrupSelectModalComponents,
    KabinlerModalComponents,
    NoResultModalComponents,
    AgirlikSaselerModalComponents,
    ButonlarModalComponents,
    KapilarModalComponents,
    ButonKartListModalComponents,
    CurrencyInputDirective,
    ConfirmModalComponents,
    DeleteModalComponents,
    ErrorMessageModalComponents,
    LoginComponent
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
    AgGridAngular,
    ButtonModule,
    TagModule,
    DataViewModule,
    TableModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      }
    }),
  ],
  providers: [
    { provide: "baseUrl", useValue: "https://localhost:7054/api", multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HtppErrorHandlerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy, },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true }
    //{ provide: LocationStrategy, useClass: PathLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
