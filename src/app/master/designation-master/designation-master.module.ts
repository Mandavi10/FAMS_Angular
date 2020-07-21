import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignationMasterComponent } from './designation-master.component';
import { DesignationMasterRoutingModule } from './designation-master-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DesignationMasterComponent],
  imports: [
    CommonModule,
    DesignationMasterRoutingModule,FormsModule,ReactiveFormsModule,
    AgGridModule.withComponents([])
  ]
})
export class DesignationMasterModule { }
