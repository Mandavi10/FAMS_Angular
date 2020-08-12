import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BankBookViewComponent } from './bank-book-view.component';

const routes: Routes =  [{path:'',component:BankBookViewComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankBookViewRoutingModule { }
