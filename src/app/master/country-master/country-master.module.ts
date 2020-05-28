import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryMasterComponent } from './country-master.component';
import { CountryMasterRoutingModule } from './country-master-routing.module';
import { AgGridModule } from 'ag-grid-angular';



@NgModule({
  declarations: [CountryMasterComponent],
  imports: [
    CommonModule,
    CountryMasterRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class CountryMasterModule { }
