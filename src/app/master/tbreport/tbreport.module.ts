import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TBReportComponent } from './tbreport.component';
import { TBReportRoutingModule } from './tbreport-routing.module';


@NgModule({
  declarations: [TBReportComponent],
  imports: [
    CommonModule,
    TBReportRoutingModule
  ]
})
export class TBReportModule { }
