import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustodianMasterComponent } from './custodian-master.component';
import { CustodianMasterRoutingModule } from './custodian-master-routing.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [CustodianMasterComponent],
  imports: [
    CommonModule,
    CustodianMasterRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class CustodianMasterModule { }
