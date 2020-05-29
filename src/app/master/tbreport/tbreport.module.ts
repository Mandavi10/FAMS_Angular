import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TBReportComponent } from './tbreport.component';
import { TBReportRoutingModule } from './tbreport-routing.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [TBReportComponent],
  imports: [
    CommonModule,
    TBReportRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class TBReportModule { }
