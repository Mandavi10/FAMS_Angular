import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchemeMasterDetailsComponent } from './scheme-master-details.component';
import { SchemeMasterDetailsRoutingModule } from './scheme-master-details-routing.module';
import { AgGridModule } from 'ag-grid-angular';


@NgModule({
  declarations: [SchemeMasterDetailsComponent],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
    SchemeMasterDetailsRoutingModule
  ]
})
export class SchemeMasterDetailsModule { }
