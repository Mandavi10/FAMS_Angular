import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegionMasterComponent } from './region-master.component';
const routes: Routes = [{path:'',component:RegionMasterComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegionMasterRoutingModule { }
