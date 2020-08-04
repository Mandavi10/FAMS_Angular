import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioAppraisalsComponent } from './portfolio-appraisals.component';
import { PortfolioAppraisalsRoutingModule } from './portfolio-appraisals-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PortfolioAppraisalsComponent],
  imports: [
    CommonModule,
    PortfolioAppraisalsRoutingModule,FormsModule,ReactiveFormsModule
  ]
})
export class PortfolioAppraisalsModule { }
