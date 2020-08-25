import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchemeMasterDetailsComponent } from './scheme-master-details.component';

const routes: Routes = [{path:'',component:SchemeMasterDetailsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchemeMasterDetailsRoutingModule { }
