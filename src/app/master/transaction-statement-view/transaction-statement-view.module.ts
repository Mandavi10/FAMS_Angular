import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionStatementViewComponent } from './transaction-statement-view.component';
import { TransactionStatementViewRoutingModule } from './transaction-statement-view-routing.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [TransactionStatementViewComponent],
  imports: [
    CommonModule,
    TransactionStatementViewRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class TransactionStatementViewModule { }
