import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataAnalysisComponent } from './data-analysis.component';

const routes: Routes = [{path:'',component:DataAnalysisComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataAnalysisRoutingModule { }
