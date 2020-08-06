import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PmsMasterComponent } from './pms-master.component';


const routes: Routes = [{path:'',component:PmsMasterComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PmsMasterRoutingModule { }
