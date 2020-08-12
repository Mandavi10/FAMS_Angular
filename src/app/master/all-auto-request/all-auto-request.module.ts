import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllAutoRequestComponent } from './all-auto-request.component';
import { AllAutoRequestRoutingModule } from './all-auto-request-routing.module';


@NgModule({
  declarations: [AllAutoRequestComponent],
  imports: [
    CommonModule,
    AllAutoRequestRoutingModule
  ]
})
export class AllAutoRequestModule { }
