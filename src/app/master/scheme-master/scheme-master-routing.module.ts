import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchemeMasterComponent } from './scheme-master.component';

const routes: Routes = [{path:'',component:SchemeMasterComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchemeMasterRoutingModule { }
