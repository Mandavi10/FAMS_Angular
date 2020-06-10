import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityMasterComponent } from './city-master.component';
import { CityMasterRoutingModule } from './city-master-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CityMasterComponent],
  imports: [
    CommonModule,
    CityMasterRoutingModule,FormsModule,ReactiveFormsModule,
    AgGridModule.withComponents([])
  ]
})
export class CityMasterModule { }
