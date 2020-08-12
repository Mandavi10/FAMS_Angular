import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortfolioFactViewComponent } from './portfolio-fact-view.component';

const routes: Routes = [{path:'',component:PortfolioFactViewComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioFactViewRoutingModule { }
