import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BranchMasterComponent } from './branch-master.component';

const routes: Routes = [{path:'',component:BranchMasterComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchMasterRoutingModule { }
