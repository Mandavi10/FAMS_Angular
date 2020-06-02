import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrialBalanceReportComponent } from './trial-balance-report.component';
import { TrialBalanceReportRoutingModule } from './trial-balance-report-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { BrowserModule } from '@angular/platform-browser';
import{FormsModule,ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import {AuthGuardService } from 'src/app/Services/auth-guard.service';
import {AppSettings} from 'src/app/app-settings';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [TrialBalanceReportComponent],
  imports: [
    CommonModule,
    TrialBalanceReportRoutingModule,FormsModule,ReactiveFormsModule,
    AgGridModule.withComponents([])
  ],
  providers: [DatePipe,AuthGuardService, { provide: 'BASE_URL', useFactory: getBaseUrl }],
  bootstrap: [TrialBalanceReportComponent]
})
export class TrialBalanceReportModule { }
export function getBaseUrl() {
  var BASE_URL=AppSettings.Login_URL;
    return BASE_URL;
}
