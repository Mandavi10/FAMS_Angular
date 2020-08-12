import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatementOfExpensesViewComponent } from './statement-of-expenses-view.component';
const routes: Routes =  [{path:'',component:StatementOfExpensesViewComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatementOfExpensesViewRoutingModule { }
