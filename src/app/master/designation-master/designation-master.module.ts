import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignationMasterComponent } from './designation-master.component';
import { DesignationMasterRoutingModule } from './designation-master-routing.module';


@NgModule({
  declarations: [DesignationMasterComponent],
  imports: [
    CommonModule,
    DesignationMasterRoutingModule
  ]
})
export class DesignationMasterModule { }
