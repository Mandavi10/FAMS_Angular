import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionMasterComponent } from './region-master.component';
import { RegionMasterRoutingModule } from './region-master-routing.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [RegionMasterComponent],
  imports: [
    CommonModule,
    RegionMasterRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class RegionMasterModule { }
