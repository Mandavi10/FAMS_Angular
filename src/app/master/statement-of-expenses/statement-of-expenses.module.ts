import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatementOfExpensesComponent } from './statement-of-expenses.component';
import { StatementOfExpensesRoutingModule } from './statement-of-expenses-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [StatementOfExpensesComponent],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,
    StatementOfExpensesRoutingModule
  ]
})
export class StatementOfExpensesModule { }
