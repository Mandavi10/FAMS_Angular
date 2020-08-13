import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionStatementViewComponent } from './transaction-statement-view.component';

const routes: Routes = [{path:'',component:TransactionStatementViewComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionStatementViewRoutingModule { }
