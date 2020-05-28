import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustodianMasterComponent } from './custodian-master.component';
import { CustodianMasterRoutingModule } from './custodian-master-routing.module';


@NgModule({
  declarations: [CustodianMasterComponent],
  imports: [
    CommonModule,
    CustodianMasterRoutingModule
  ]
})
export class CustodianMasterModule { }
