import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { BankBookViewRoutingModule } from './bank-book-view-routing.module';
import { BankBookViewComponent } from './bank-book-view.component';
@NgModule({
  declarations: [BankBookViewComponent],
  imports: [
    CommonModule,
    BankBookViewRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class BankBookViewModule { }
