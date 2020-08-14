import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatementDividendViewComponent } from './statement-dividend-view.component';
import { StatementDividendViewRoutingModule } from './statement-dividend-view-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [StatementDividendViewComponent],
  imports: [
    CommonModule,
    StatementDividendViewRoutingModule,FormsModule, ReactiveFormsModule,
    AgGridModule.withComponents([])
  ]
})
export class StatementDividendViewModule { }
