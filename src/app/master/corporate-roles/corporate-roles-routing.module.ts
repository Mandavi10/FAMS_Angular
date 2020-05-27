import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{CorporateRolesComponent} from './corporate-roles.component';
const routes: Routes = [{path:'',component:CorporateRolesComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateRolesRoutingModule { }
