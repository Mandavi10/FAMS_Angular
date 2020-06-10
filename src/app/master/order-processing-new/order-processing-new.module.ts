import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderProcessingNewComponent } from './order-processing-new.component';
import { OrderProcessingNewRoutingModule } from './order-processing-new-routing.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [OrderProcessingNewComponent],
  imports: [
    CommonModule,
    OrderProcessingNewRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class OrderProcessingNewModule { }
