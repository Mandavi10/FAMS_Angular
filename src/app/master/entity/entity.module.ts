import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityComponent } from './entity.component';
import { EntityRoutingModule } from './entity-routing.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [EntityComponent],
  imports: [
    CommonModule,
    EntityRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class EntityModule { }
