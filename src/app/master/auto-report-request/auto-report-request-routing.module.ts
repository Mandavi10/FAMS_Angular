import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutoReportRequestComponent } from './auto-report-request.component';

const routes: Routes = [{path:'',component:AutoReportRequestComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutoReportRequestRoutingModule { }
