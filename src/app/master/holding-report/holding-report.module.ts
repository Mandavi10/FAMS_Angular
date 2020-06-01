import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoldingReportComponent } from './holding-report.component';
import { HoldingReportRoutingModule } from './holding-report-routing.module';
import { AgGridModule } from 'ag-grid-angular';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HoldingReportComponent],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,
    HoldingReportRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class HoldingReportModule { }
