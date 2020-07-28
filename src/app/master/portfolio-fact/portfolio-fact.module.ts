import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioFactComponent } from './portfolio-fact.component';
import { PortfolioFactRoutingModule } from './portfolio-fact-routing.module';

@NgModule({
  declarations: [PortfolioFactComponent],
  imports: [
    CommonModule,
    PortfolioFactRoutingModule
  ]
})
export class PortfolioFactModule { }
