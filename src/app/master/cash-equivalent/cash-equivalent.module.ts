import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CashEquivalentComponent } from './cash-equivalent.component';
import { CashEquivalentRoutingModule } from './cash-equivalent-routing.module';


@NgModule({
  declarations: [CashEquivalentComponent],
  imports: [
    CommonModule,
    CashEquivalentRoutingModule
  ]
})
export class CashEquivalentModule { }
