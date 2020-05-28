import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PMSEmployeesComponent } from './pmsemployees.component';

const routes: Routes = [{path:'',component:PMSEmployeesComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PMSEmployeesRoutingModule { }
