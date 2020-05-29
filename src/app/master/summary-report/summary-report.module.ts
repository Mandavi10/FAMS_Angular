import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryReportComponent } from './summary-report.component';
import { SummaryReportRoutingModule } from './summary-report-routing.module';


@NgModule({
  declarations: [SummaryReportComponent],
  imports: [
    CommonModule,
    SummaryReportRoutingModule
  ]
})
export class SummaryReportModule { }
