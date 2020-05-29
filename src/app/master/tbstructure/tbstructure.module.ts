import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TBstructureComponent } from './tbstructure.component';
import { TBstructureRoutingModule } from './tbstructure-routing.module';


@NgModule({
  declarations: [TBstructureComponent],
  imports: [
    CommonModule,
    TBstructureRoutingModule
  ]
})
export class TBstructureModule { }
