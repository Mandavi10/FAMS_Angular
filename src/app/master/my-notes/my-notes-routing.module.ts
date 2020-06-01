import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyNotesComponent } from './my-notes.component';

const routes: Routes = [{path:'',component:MyNotesComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MynotesRoutingModule { }
