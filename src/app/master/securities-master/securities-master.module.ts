import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecuritiesMasterComponent } from './securities-master.component';
import { SecuritiesMasterRoutingModule } from './securities-master-routing.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [SecuritiesMasterComponent],
  imports: [
    CommonModule,
    SecuritiesMasterRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class SecuritiesMasterModule { }
