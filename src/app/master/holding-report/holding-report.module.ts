import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoldingReportComponent } from './holding-report.component';
import { HoldingReportRoutingModule } from './holding-report-routing.module';


@NgModule({
  declarations: [HoldingReportComponent],
  imports: [
    CommonModule,
    HoldingReportRoutingModule
  ]
})
export class HoldingReportModule { }
