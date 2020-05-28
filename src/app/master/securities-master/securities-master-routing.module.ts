import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecuritiesMasterComponent } from './securities-master.component';

const routes: Routes = [{path:'',component:SecuritiesMasterComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecuritiesMasterRoutingModule { }
