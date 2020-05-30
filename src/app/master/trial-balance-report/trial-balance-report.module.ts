import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrialBalanceReportComponent } from './trial-balance-report.component';
import { TrialBalanceReportRoutingModule } from './trial-balance-report-routing.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [TrialBalanceReportComponent],
  imports: [
    CommonModule,
    TrialBalanceReportRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class TrialBalanceReportModule { }
