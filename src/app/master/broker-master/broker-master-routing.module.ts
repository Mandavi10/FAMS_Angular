import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrokerMasterComponent } from './broker-master.component';

const routes: Routes = [{path:'',component:BrokerMasterComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrokerMasterRoutingModule { }
