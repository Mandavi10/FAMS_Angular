import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignationMasterComponent } from './designation-master.component';
import { DesignationMasterRoutingModule } from './designation-master-routing.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [DesignationMasterComponent],
  imports: [
    CommonModule,
    DesignationMasterRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class DesignationMasterModule { }
