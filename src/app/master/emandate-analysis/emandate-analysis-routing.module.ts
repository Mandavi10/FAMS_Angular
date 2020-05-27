import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmandateAnalysisComponent } from './emandate-analysis.component';

const routes: Routes = [{path:'',component:EmandateAnalysisComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmandateAnalysisRoutingModule { }
