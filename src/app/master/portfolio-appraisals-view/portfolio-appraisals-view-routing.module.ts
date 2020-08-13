import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortfolioAppraisalsViewComponent } from './portfolio-appraisals-view.component';

const routes: Routes =  [{path:'',component:PortfolioAppraisalsViewComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioAppraisalsViewRoutingModule { }
