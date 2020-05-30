import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CashEquivalentComponent } from './cash-equivalent.component';

const routes: Routes = [{path:'',component:CashEquivalentComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashEquivalentRoutingModule { }
