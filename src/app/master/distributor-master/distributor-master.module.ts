import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DistributorMasterComponent } from './distributor-master.component';
import { DistributorMasterRoutingModule } from './distributor-master-routing.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [DistributorMasterComponent],
  imports: [
    CommonModule,
    DistributorMasterRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class DistributorMasterModule { }
