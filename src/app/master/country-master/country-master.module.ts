import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryMasterComponent } from './country-master.component';
import { CountryMasterRoutingModule } from './country-master-routing.module';


@NgModule({
  declarations: [CountryMasterComponent],
  imports: [
    CommonModule,
    CountryMasterRoutingModule
  ]
})
export class CountryMasterModule { }
