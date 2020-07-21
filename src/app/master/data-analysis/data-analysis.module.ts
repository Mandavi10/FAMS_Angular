import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataAnalysisComponent } from './data-analysis.component';
import { DataAnalysisRoutingModule } from './data-analysis-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
@NgModule({
  declarations: [DataAnalysisComponent],
  imports: [
    CommonModule,
    DataAnalysisRoutingModule,
    BsDatepickerModule,
    AgGridModule.withComponents([])
  ]
})
export class DataAnalysisModule { }
