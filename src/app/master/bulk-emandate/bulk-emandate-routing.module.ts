import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BulkEmandateComponent } from './bulk-emandate.component';

const routes: Routes = [{path:'',component:BulkEmandateComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BulkEMandateRoutingModule { }
