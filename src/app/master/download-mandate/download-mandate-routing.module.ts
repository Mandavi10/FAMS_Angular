import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DownloadMandateComponent } from './download-mandate.component';

const routes: Routes = [{path:'',component:DownloadMandateComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DownloadMandateRoutingModule { }
