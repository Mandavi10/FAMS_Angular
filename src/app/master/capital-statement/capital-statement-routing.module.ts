import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CapitalStatementComponent } from './capital-statement.component';

const routes: Routes = [{path:'',component:CapitalStatementComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapitalStatementRoutingModule { }
