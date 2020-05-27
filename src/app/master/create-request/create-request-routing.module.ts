import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateRequestComponent } from './create-request.component';

const routes: Routes = [{path:'',component:CreateRequestComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateRequestRoutingModule { }
