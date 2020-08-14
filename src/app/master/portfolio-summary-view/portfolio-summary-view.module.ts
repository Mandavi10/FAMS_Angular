import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioSummaryViewComponent } from './portfolio-summary-view.component';
import { PortfolioSummaryViewRoutingModule } from './portfolio-summary-view-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PortfolioSummaryViewComponent],
  imports: [
    CommonModule,CommonModule,FormsModule,ReactiveFormsModule,
    PortfolioSummaryViewRoutingModule,
    AgGridModule.withComponents([])
   
  ]
})
export class PortfolioSummaryViewModule { }
