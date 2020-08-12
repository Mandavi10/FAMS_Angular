import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioSummaryViewComponent } from './portfolio-summary-view.component';
import { PortfolioSummaryViewRoutingModule } from './portfolio-summary-view-routing.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [PortfolioSummaryViewComponent],
  imports: [
    CommonModule,
    PortfolioSummaryViewRoutingModule,
    AgGridModule.withComponents([])
   
  ]
})
export class PortfolioSummaryViewModule { }
