import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalStatementComponent } from './capital-statement.component';
import { CapitalStatementRoutingModule } from './capital-statement-routing.module';


@NgModule({
  declarations: [CapitalStatementComponent],
  imports: [
    CommonModule,
    CapitalStatementRoutingModule
  ]
})
export class CapitalStatementModule { }
