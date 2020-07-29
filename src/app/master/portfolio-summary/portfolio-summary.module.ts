import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioSummaryComponent } from './portfolio-summary.component';
import { PortfolioSummaryRoutingModule } from './portfolio-summary-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PortfolioSummaryComponent],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,
    PortfolioSummaryRoutingModule
  ]
})
export class PortfolioSummaryModule { }
