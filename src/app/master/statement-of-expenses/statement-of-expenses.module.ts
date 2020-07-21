import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatementOfExpensesComponent } from './statement-of-expenses.component';
import { StatementOfExpensesRoutingModule } from './statement-of-expenses-routing.module';


@NgModule({
  declarations: [StatementOfExpensesComponent],
  imports: [
    CommonModule,
    StatementOfExpensesRoutingModule
  ]
})
export class StatementOfExpensesModule { }
