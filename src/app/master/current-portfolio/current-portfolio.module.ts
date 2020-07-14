import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentPortfolioComponent } from './current-portfolio.component';
import { CurrentPortfolioRoutingModule } from './current-portfolio-routing.module';

@NgModule({
  declarations: [CurrentPortfolioComponent],
  imports: [
    CommonModule,
    CurrentPortfolioRoutingModule
  ]
})
export class CurrentPortfolioModule { }
