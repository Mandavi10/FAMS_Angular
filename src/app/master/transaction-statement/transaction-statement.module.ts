import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionStatementComponent } from './transaction-statement.component';
import { TransactionStatementRoutingModule } from './transaction-statement-routing.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [TransactionStatementComponent],
  imports: [
    CommonModule,
    TransactionStatementRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class TransactionStatementModule { }
