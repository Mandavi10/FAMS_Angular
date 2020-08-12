import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatementOfExpensesViewComponent } from './statement-of-expenses-view.component';
import { StatementOfExpensesViewRoutingModule } from './statement-of-expenses-view-routing.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [StatementOfExpensesViewComponent],
  imports: [
    CommonModule,
    StatementOfExpensesViewRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class StatementOfExpensesViewModule { }
