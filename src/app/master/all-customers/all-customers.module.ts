import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllCustomersComponent } from './all-customers.component';
import { AllCustomersRoutingModule } from './all-customers-routing.module';


@NgModule({
  declarations: [AllCustomersComponent],
  imports: [
    CommonModule,
    AllCustomersRoutingModule
  ]
})
export class AllCustomersModule { }
