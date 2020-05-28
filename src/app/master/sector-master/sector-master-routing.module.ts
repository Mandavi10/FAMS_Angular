import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SectorMasterComponent } from './sector-master.component';

const routes: Routes = [{path:'',component:SectorMasterComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectorMasterRoutingModule { }
