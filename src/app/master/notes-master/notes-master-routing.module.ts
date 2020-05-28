import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotesMasterComponent } from './notes-master.component';

const routes: Routes = [{path:'',component:NotesMasterComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesMasterRoutingModule { }
