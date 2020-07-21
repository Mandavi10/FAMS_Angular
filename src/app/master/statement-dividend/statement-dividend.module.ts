import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatementDividendComponent } from './statement-dividend.component';
import { StatementDividendRoutingModule } from './statement-dividend-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [StatementDividendComponent],
  imports: [
    CommonModule,
    StatementDividendRoutingModule,FormsModule,ReactiveFormsModule
  ]
})
export class StatementDividendModule { }
