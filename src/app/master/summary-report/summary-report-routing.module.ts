import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SummaryReportComponent } from './summary-report.component';

const routes: Routes = [{path:'',component:SummaryReportComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SummaryReportRoutingModule { }
