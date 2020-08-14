import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionStatementViewComponent } from './transaction-statement-view.component';
import { TransactionStatementViewRoutingModule } from './transaction-statement-view-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import{FormsModule,ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {AuthGuardService } from 'src/app/Services/auth-guard.service';
import {AppSettings} from 'src/app/app-settings';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [TransactionStatementViewComponent],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,
    TransactionStatementViewRoutingModule,
    AgGridModule.withComponents([])
  ],
  providers: [DatePipe,AuthGuardService, { provide: 'BASE_URL', useFactory: getBaseUrl }],
})
export class TransactionStatementViewModule { }
export function getBaseUrl() {
  var BASE_URL=AppSettings.Login_URL;
    return BASE_URL;
}