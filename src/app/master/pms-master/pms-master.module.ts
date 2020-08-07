import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PmsMasterComponent } from './pms-master.component';
import { PmsMasterRoutingModule } from './pms-master-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PmsMasterComponent],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
    PmsMasterRoutingModule,FormsModule,ReactiveFormsModule,
  ]
})
export class PmsMasterModule { }
