import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderProcessingComponent } from './order-processing.component';
import { OrderProcessingRoutingModule } from './order-processing-routing.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [OrderProcessingComponent],
  imports: [
    CommonModule,
    OrderProcessingRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class OrderProcessingModule { }
