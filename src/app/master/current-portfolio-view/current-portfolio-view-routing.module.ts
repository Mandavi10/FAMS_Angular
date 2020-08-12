import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrentPortfolioViewComponent } from './current-portfolio-view.component';

const routes: Routes =  [{path:'',component:CurrentPortfolioViewComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrentPortfolioViewRoutingModule { }
