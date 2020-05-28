import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllCustomersComponent } from './all-customers.component';

const routes: Routes = [{path:'',component:AllCustomersComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllCustomersRoutingModule { }
