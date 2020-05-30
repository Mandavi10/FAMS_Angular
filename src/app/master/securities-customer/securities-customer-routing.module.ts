import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecuritiesCustomerComponent } from './securities-customer.component';

const routes: Routes = [{path:'',component:SecuritiesCustomerComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecuritiesCustomerRoutingModule { }
