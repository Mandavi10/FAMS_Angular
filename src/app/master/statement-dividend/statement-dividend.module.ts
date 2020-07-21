import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatementDividendComponent } from './statement-dividend.component';
import { StatementDividendRoutingModule } from './statement-dividend-routing.module';

@NgModule({
  declarations: [StatementDividendComponent],
  imports: [
    CommonModule,
    StatementDividendRoutingModule
  ]
})
export class StatementDividendModule { }
