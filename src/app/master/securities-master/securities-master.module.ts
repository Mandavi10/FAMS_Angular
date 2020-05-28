import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecuritiesMasterComponent } from './securities-master.component';
import { SecuritiesMasterRoutingModule } from './securities-master-routing.module';


@NgModule({
  declarations: [SecuritiesMasterComponent],
  imports: [
    CommonModule,
    SecuritiesMasterRoutingModule
  ]
})
export class SecuritiesMasterModule { }
