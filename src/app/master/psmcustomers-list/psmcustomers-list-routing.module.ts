import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PSMCustomersListComponent } from './psmcustomers-list.component';

const routes: Routes = [{path:'',component:PSMCustomersListComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PSMCustomersListRoutingModule { }
