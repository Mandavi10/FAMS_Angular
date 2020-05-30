import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecuritiesCustomerComponent } from './securities-customer.component';
import { SecuritiesCustomerRoutingModule } from './securities-customer-routing.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [SecuritiesCustomerComponent],
  imports: [
    CommonModule,
    SecuritiesCustomerRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class SecuritiesCustomerModule { }
