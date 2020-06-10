import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateMasterComponent } from './state-master.component';
import { StateMasterRoutingModule } from './state-master-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [StateMasterComponent],
  imports: [
    CommonModule,
    StateMasterRoutingModule,FormsModule,ReactiveFormsModule,
    AgGridModule.withComponents([])
  ]
})
export class StateMasterModule { }
