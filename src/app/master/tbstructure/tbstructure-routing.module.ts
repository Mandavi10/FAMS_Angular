import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TBstructureComponent } from './tbstructure.component';

const routes: Routes = [{path:'',component:TBstructureComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TBstructureRoutingModule { }
