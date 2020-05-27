import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{UserCreationComponent} from './user-creation.component';
const routes: Routes = [{path:'',component:UserCreationComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserCreationRoutingModule { }
