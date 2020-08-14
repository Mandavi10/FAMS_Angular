import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatementOfExpensesViewComponent } from './statement-of-expenses-view.component';
import { StatementOfExpensesViewRoutingModule } from './statement-of-expenses-view-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [StatementOfExpensesViewComponent],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,
    StatementOfExpensesViewRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class StatementOfExpensesViewModule { }
