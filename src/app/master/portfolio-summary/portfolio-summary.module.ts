import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioSummaryComponent } from './portfolio-summary.component';
import { PortfolioSummaryRoutingModule } from './portfolio-summary-routing.module';


@NgModule({
  declarations: [PortfolioSummaryComponent],
  imports: [
    CommonModule,
    PortfolioSummaryRoutingModule
  ]
})
export class PortfolioSummaryModule { }
