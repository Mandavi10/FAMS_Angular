import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustodianMasterComponent } from './custodian-master.component';

const routes: Routes = [{path:'',component:CustodianMasterComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustodianMasterRoutingModule { }
