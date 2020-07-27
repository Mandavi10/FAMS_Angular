import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioAppraisalsComponent } from './portfolio-appraisals.component';
import { PortfolioAppraisalsRoutingModule } from './portfolio-appraisals-routing.module';

@NgModule({
  declarations: [PortfolioAppraisalsComponent],
  imports: [
    CommonModule,
    PortfolioAppraisalsRoutingModule
  ]
})
export class PortfolioAppraisalsModule { }
