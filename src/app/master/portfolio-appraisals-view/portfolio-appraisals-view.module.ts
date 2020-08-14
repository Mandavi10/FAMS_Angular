import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioAppraisalsViewComponent } from './portfolio-appraisals-view.component';
import { PortfolioAppraisalsViewRoutingModule } from './portfolio-appraisals-view-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PortfolioAppraisalsViewComponent],
  imports: [
    CommonModule,
    PortfolioAppraisalsViewRoutingModule,
    AgGridModule.withComponents([]),FormsModule,ReactiveFormsModule
  ]
})
export class PortfolioAppraisalsViewModule { }
