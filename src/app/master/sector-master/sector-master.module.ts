import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectorMasterComponent } from './sector-master.component';
import { SectorMasterRoutingModule } from './sector-master-routing.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [SectorMasterComponent],
  imports: [
    CommonModule,
    SectorMasterRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class SectorMasterModule { }
