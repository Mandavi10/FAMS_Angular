import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryReportComponent } from './summary-report.component';
import { SummaryReportRoutingModule } from './summary-report-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
@NgModule({
  declarations: [SummaryReportComponent],
  imports: [
    CommonModule,
    SummaryReportRoutingModule,
    BsDatepickerModule,
    AgGridModule.withComponents([])
  ]
})
export class SummaryReportModule { }
