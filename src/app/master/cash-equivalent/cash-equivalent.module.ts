import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CashEquivalentComponent } from './cash-equivalent.component';
import { CashEquivalentRoutingModule } from './cash-equivalent-routing.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [CashEquivalentComponent],
  imports: [
    CommonModule,
    CashEquivalentRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class CashEquivalentModule { }
