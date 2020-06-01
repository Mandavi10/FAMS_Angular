import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecuritiesMasterComponent } from './securities-master.component';
import { SecuritiesMasterRoutingModule } from './securities-master-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SecuritiesMasterComponent],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,
    SecuritiesMasterRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class SecuritiesMasterModule { }
