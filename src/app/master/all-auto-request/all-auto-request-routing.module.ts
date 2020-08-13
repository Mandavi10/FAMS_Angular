import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllAutoRequestComponent } from './all-auto-request.component';

const routes: Routes = [{path:'',component:AllAutoRequestComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllAutoRequestRoutingModule { }
