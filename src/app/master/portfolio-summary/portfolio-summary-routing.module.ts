import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortfolioSummaryComponent } from './portfolio-summary.component';

const routes: Routes = [{path:'',component:PortfolioSummaryComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioSummaryRoutingModule { }
