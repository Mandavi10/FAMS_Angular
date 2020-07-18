import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalStatementComponent } from './capital-statement.component';
import { CapitalStatementRoutingModule } from './capital-statement-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CapitalStatementComponent],
  imports: [
    CommonModule,
    CapitalStatementRoutingModule,FormsModule,ReactiveFormsModule
  ]
})
export class CapitalStatementModule { }
