import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatementDividendViewComponent } from './statement-dividend-view.component';

const routes: Routes =  [{path:'',component:StatementDividendViewComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatementDividendViewRoutingModule { }
