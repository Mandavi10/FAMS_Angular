import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityMasterComponent } from './city-master.component';
import { CityMasterRoutingModule } from './city-master-routing.module';
import { AgGridAngular } from 'ag-grid-angular';

@NgModule({
  declarations: [CityMasterComponent],
  imports: [
    CommonModule,
    CityMasterRoutingModule
  ]
})
export class CityMasterModule { }
