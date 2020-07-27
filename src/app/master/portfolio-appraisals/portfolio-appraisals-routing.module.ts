import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortfolioAppraisalsComponent } from './portfolio-appraisals.component';

const routes: Routes = [{path:'',component:PortfolioAppraisalsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioAppraisalsRoutingModule { }
