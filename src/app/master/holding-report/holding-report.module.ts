import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoldingReportComponent } from './holding-report.component';
import { HoldingReportRoutingModule } from './holding-report-routing.module';
import { AgGridModule } from 'ag-grid-angular';


@NgModule({
  declarations: [HoldingReportComponent],
  imports: [
    CommonModule,
    HoldingReportRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class HoldingReportModule { }
