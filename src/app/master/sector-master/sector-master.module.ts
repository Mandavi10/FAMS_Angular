import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectorMasterComponent } from './sector-master.component';
import { SectorMasterRoutingModule } from './sector-master-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SectorMasterComponent],
  imports: [
    CommonModule,
    SectorMasterRoutingModule,FormsModule,ReactiveFormsModule,
    AgGridModule.withComponents([])
  ]
})
export class SectorMasterModule { }
