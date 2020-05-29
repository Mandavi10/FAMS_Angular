import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PSMCustomersListComponent } from './psmcustomers-list.component';
import { PSMCustomersListRoutingModule } from './psmcustomers-list-routing.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [PSMCustomersListComponent],
  imports: [
    CommonModule,
    PSMCustomersListRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class PSMCustomersListModule { }
