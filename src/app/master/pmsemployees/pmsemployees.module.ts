import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PMSEmployeesComponent } from './pmsemployees.component';
import { PMSEmployeesRoutingModule } from './pmsemployees-routing.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [PMSEmployeesComponent],
  imports: [
    CommonModule,
    PMSEmployeesRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class PMSEmployeesModule { }
