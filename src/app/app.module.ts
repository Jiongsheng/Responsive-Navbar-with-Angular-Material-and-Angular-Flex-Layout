import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ADAMaterialModule } from './material-module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from './app.component';
import { MainSectionComponent } from './main-section/main-section.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { TopNavComponent } from './top-nav/top-nav.component';

import {SideNavService} from './services/side-nav.service';
import { ChangePasswordComponent,ChangePasswordComponentDialog } from './util/change-password/change-password.component';
import { OrganisationComponent } from './administration/organisation/organisation.component';
import { OrganisationSearchComponent } from './administration/organisation-search/organisation-search.component';
import { OrganisationTableComponent } from './administration/organisation-table/organisation-table.component';
import { OrganisationEntryComponent } from './administration/organisation-entry/organisation-entry.component';
import { HttpClientComponent } from './util/http-client/http-client.component';

import {HttpInterceptorService} from './services/http-interceptor.service';

@NgModule({
  declarations: [AppComponent, MainSectionComponent, SideNavComponent, TopNavComponent, ChangePasswordComponent,ChangePasswordComponentDialog, OrganisationComponent, OrganisationSearchComponent, OrganisationTableComponent, OrganisationEntryComponent, HttpClientComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ADAMaterialModule,
    FlexLayoutModule,
    FormsModule
  ],
  entryComponents: [ChangePasswordComponent,ChangePasswordComponentDialog],
  providers: [
    SideNavService,
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
