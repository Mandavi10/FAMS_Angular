import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatementOfExpensesComponent } from './statement-of-expenses.component';

const routes: Routes = [{path:'',component:StatementOfExpensesComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatementOfExpensesRoutingModule { }
