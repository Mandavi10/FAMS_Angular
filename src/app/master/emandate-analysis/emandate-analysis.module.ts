import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmandateAnalysisComponent } from './emandate-analysis.component';
import { EmandateAnalysisRoutingModule } from './emandate-analysis-routing.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [EmandateAnalysisComponent],
  imports: [
    CommonModule,
    EmandateAnalysisRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class EmandateAnalysisModule { }
