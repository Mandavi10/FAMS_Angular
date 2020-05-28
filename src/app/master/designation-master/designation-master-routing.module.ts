import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DesignationMasterComponent } from './designation-master.component';

const routes: Routes = [{path:'',component:DesignationMasterComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignationMasterRoutingModule { }
