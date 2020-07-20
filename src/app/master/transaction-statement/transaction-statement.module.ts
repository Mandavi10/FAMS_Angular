import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionStatementComponent } from './transaction-statement.component';
import { TransactionStatementRoutingModule } from './transaction-statement-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import{FormsModule,ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {AuthGuardService } from 'src/app/Services/auth-guard.service';
import {AppSettings} from 'src/app/app-settings';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [TransactionStatementComponent],
  imports: [
    CommonModule,
    TransactionStatementRoutingModule,FormsModule,ReactiveFormsModule,
    BsDatepickerModule,
    AgGridModule.withComponents([])
  ],
  providers: [DatePipe,AuthGuardService, { provide: 'BASE_URL', useFactory: getBaseUrl }],
})
export class TransactionStatementModule { }
export function getBaseUrl() {
  var BASE_URL=AppSettings.Login_URL;
    return BASE_URL;
}
