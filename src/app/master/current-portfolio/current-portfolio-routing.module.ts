import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrentPortfolioComponent } from './current-portfolio.component';
const routes: Routes = [{path:'',component:CurrentPortfolioComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrentPortfolioRoutingModule { }
