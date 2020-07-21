import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderProcessingNewComponent } from './order-processing-new.component';

const routes: Routes = [{path:'',component:OrderProcessingNewComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderProcessingNewRoutingModule { }
