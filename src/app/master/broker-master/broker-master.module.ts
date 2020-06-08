import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrokerMasterComponent } from './broker-master.component';
import { BrokerMasterRoutingModule } from './broker-master-routing.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [BrokerMasterComponent],
  imports: [
    CommonModule,
    BrokerMasterRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class BrokerMasterModule { }
