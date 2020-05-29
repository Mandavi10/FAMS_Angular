import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllCustomersComponent } from './all-customers.component';
import { AllCustomersRoutingModule } from './all-customers-routing.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [AllCustomersComponent],
  imports: [
    CommonModule,
    AllCustomersRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class AllCustomersModule { }
