import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import{FormsModule,ReactiveFormsModule} from '@angular/forms';

import { NachMandateRoutingModule } from './nach-mandate-routing.module';
import{NachMandateComponent} from './nach-mandate.component';
import { AgGridModule } from 'ag-grid-angular';
import { RouterModule } from '@angular/router';
import {AuthGuardService } from 'src/app/Services/auth-guard.service';
import {AppSettings} from 'src/app/app-settings';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';



@NgModule({
  declarations: [NachMandateComponent],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,AgGridModule.withComponents([]),
    NachMandateRoutingModule ,HttpClientModule
  ],
  providers: [DatePipe,AuthGuardService, { provide: 'BASE_URL', useFactory: getBaseUrl }],
  bootstrap: [NachMandateComponent]
})
export class NachMandateModule { }
export function getBaseUrl() {
  var BASE_URL=AppSettings.SaveEditMandate_URL;
    return BASE_URL;
}

