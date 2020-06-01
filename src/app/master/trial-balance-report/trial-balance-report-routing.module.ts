import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrialBalanceReportComponent } from './trial-balance-report.component';
const routes: Routes = [{path:'',component:TrialBalanceReportComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrialBalanceReportRoutingModule { }
