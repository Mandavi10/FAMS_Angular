import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityMasterComponent } from './city-master.component';
import { CityMasterRoutingModule } from './city-master-routing.module';


@NgModule({
  declarations: [CityMasterComponent],
  imports: [
    CommonModule,
    CityMasterRoutingModule
  ]
})
export class CityMasterModule { }
