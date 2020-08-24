import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockExchangeMasterComponent } from './stock-exchange-master.component';
import { StockExchangeMasterRoutingModule } from './stock-exchange-master-routing.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [StockExchangeMasterComponent],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
    StockExchangeMasterRoutingModule
  ]
})
export class StockExchangeMasterModule { }
