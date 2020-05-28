import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityMasterComponent } from './city-master.component';
import { CityMasterRoutingModule } from './city-master-routing.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [CityMasterComponent],
  imports: [
    CommonModule,
    CityMasterRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class CityMasterModule { }
