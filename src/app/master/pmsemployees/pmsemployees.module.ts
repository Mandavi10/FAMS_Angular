import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PMSEmployeesComponent } from './pmsemployees.component';
import { PMSEmployeesRoutingModule } from './pmsemployees-routing.module';


@NgModule({
  declarations: [PMSEmployeesComponent],
  imports: [
    CommonModule,
    PMSEmployeesRoutingModule
  ]
})
export class PMSEmployeesModule { }
