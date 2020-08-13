import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentPortfolioViewComponent } from './current-portfolio-view.component';
import { CurrentPortfolioViewRoutingModule } from './current-portfolio-view-routing.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [CurrentPortfolioViewComponent],
  imports: [
    CommonModule,
    CurrentPortfolioViewRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class CurrentPortfolioViewModule { }
