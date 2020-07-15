import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataAnalysisComponent } from './data-analysis.component';
import { DataAnalysisRoutingModule } from './data-analysis-routing.module';


@NgModule({
  declarations: [DataAnalysisComponent],
  imports: [
    CommonModule,
    DataAnalysisRoutingModule
  ]
})
export class DataAnalysisModule { }
