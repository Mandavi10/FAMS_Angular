import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchMasterComponent } from './branch-master.component';
import { BranchMasterRoutingModule } from './branch-master-routing.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [BranchMasterComponent],
  imports: [
    CommonModule,
    BranchMasterRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class BranchMasterModule { }
