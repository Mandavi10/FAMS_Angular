import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DistributorMasterComponent } from './distributor-master.component';

const routes: Routes = [{path:'',component:DistributorMasterComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistributorMasterRoutingModule { }
