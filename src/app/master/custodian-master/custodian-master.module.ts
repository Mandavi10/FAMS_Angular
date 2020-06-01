import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustodianMasterComponent } from './custodian-master.component';
import { CustodianMasterRoutingModule } from './custodian-master-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ CustodianMasterComponent],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,
    CustodianMasterRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class CustodianMasterModule { }
