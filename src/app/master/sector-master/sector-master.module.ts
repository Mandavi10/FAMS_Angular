import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectorMasterComponent } from './sector-master.component';
import { SectorMasterRoutingModule } from './sector-master-routing.module';


@NgModule({
  declarations: [SectorMasterComponent],
  imports: [
    CommonModule,
    SectorMasterRoutingModule
  ]
})
export class SectorMasterModule { }
