import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataAnalysisComponent } from './data-analysis.component';
import { DataAnalysisRoutingModule } from './data-analysis-routing.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [DataAnalysisComponent],
  imports: [
    CommonModule,
    DataAnalysisRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class DataAnalysisModule { }
