import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentPortfolioComponent } from './current-portfolio.component';
import { CurrentPortfolioRoutingModule } from './current-portfolio-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CurrentPortfolioComponent],
  imports: [
    CommonModule,
    CurrentPortfolioRoutingModule,FormsModule,ReactiveFormsModule
  ]
})
export class CurrentPortfolioModule { }
