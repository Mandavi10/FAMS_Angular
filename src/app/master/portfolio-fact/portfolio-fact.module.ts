import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioFactComponent } from './portfolio-fact.component';
import { PortfolioFactRoutingModule } from './portfolio-fact-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [PortfolioFactComponent],
  imports: [
    CommonModule,
    PortfolioFactRoutingModule,FormsModule, ReactiveFormsModule
  ]
})
export class PortfolioFactModule { }
