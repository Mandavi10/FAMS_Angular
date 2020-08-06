import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchemeMasterComponent } from './scheme-master.component';
import { SchemeMasterRoutingModule } from './scheme-master-routing.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [SchemeMasterComponent],
  imports: [
    CommonModule,
    SchemeMasterRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class SchemeMasterModule { }
