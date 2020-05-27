import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductMasterComponent } from './product-master.component';
import { ProductMasterRoutingModule } from './product-master-routing.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [ProductMasterComponent],
  imports: [
    CommonModule,
    ProductMasterRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class ProductMasterModule { }
