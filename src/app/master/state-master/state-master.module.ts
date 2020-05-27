import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateMasterComponent } from './state-master.component';
import { StateMasterRoutingModule } from './state-master-routing.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [StateMasterComponent],
  imports: [
    CommonModule,
    StateMasterRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class StateMasterModule { }
