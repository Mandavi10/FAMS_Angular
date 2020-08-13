import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortfolioSummaryViewComponent } from './portfolio-summary-view.component';

const routes: Routes = [{path:'',component:PortfolioSummaryViewComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioSummaryViewRoutingModule { }
