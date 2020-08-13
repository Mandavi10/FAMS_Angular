import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CapitalStatementViewComponent } from './capital-statement-view.component';
const routes: Routes =  [{path:'',component:CapitalStatementViewComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapitalStatementViewRoutingModule { }
