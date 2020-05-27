import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRequestComponent } from './create-request.component';
import { CreateRequestRoutingModule } from './create-request-routing.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [CreateRequestComponent],
  imports: [
    CommonModule,
    CreateRequestRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class CreateRequestModule { }
