import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockExchangeMasterComponent } from './stock-exchange-master.component';


const routes: Routes = [{path:'',component:StockExchangeMasterComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockExchangeMasterRoutingModule { }
