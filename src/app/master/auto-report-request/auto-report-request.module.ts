import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoReportRequestComponent } from './auto-report-request.component';
import { AutoReportRequestRoutingModule } from './auto-report-request-routing.module';

@NgModule({
  declarations: [AutoReportRequestComponent],
  imports: [
    CommonModule,
    AutoReportRequestRoutingModule
  ]
})
export class AutoReportRequestModule { }
