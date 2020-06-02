import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderProcessingComponent } from './order-processing.component';

const routes: Routes = [{path:'',component:OrderProcessingComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderProcessingRoutingModule { }
