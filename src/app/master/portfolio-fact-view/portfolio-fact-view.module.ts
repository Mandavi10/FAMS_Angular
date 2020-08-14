import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioFactViewComponent } from './portfolio-fact-view.component';
import { PortfolioFactViewRoutingModule } from './portfolio-fact-view-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PortfolioFactViewComponent],
  imports: [
    CommonModule,
    PortfolioFactViewRoutingModule,FormsModule, ReactiveFormsModule,
    AgGridModule.withComponents([])
  ]
})
export class PortfolioFactViewModule { }
