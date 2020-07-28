import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortfolioFactComponent } from './portfolio-fact.component';

const routes: Routes = [{path:'',component:PortfolioFactComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioFactRoutingModule { }
