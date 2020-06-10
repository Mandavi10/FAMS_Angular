import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TBstructureComponent } from './tbstructure.component';
import { TBstructureRoutingModule } from './tbstructure-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TBstructureComponent],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,
    TBstructureRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class TBstructureModule { }
