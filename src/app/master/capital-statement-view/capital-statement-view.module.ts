import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalStatementViewComponent } from './capital-statement-view.component';
import { CapitalStatementViewRoutingModule } from './capital-statement-view-routing.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [CapitalStatementViewComponent],
  imports: [
    CommonModule,
    CapitalStatementViewRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class CapitalStatementViewModule { }
