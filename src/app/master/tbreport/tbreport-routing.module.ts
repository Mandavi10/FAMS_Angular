import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TBReportComponent } from './tbreport.component';

const routes: Routes = [{path:'',component:TBReportComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TBReportRoutingModule { }
