import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PMSProviderComponent } from './pmsprovider.component';

const routes: Routes = [{path:'',component:PMSProviderComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PMSproviderRoutingModule { }
