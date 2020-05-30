import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionStatementComponent } from './transaction-statement.component';
import { TransactionStatementRoutingModule } from './transaction-statement-routing.module';


@NgModule({
  declarations: [TransactionStatementComponent],
  imports: [
    CommonModule,
    TransactionStatementRoutingModule
  ]
})
export class TransactionStatementModule { }
