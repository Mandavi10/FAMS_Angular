import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BulkEmandateComponent } from './bulk-emandate.component';
import { BulkEMandateRoutingModule } from './bulk-emandate-routing.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [BulkEmandateComponent],
  imports: [
    CommonModule,
    BulkEMandateRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class BulkEMandateModule { }
