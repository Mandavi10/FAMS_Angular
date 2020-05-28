import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PSMCustomersListComponent } from './psmcustomers-list.component';
import { PSMCustomersListRoutingModule } from './psmcustomers-list-routing.module';


@NgModule({
  declarations: [PSMCustomersListComponent],
  imports: [
    CommonModule,
    PSMCustomersListRoutingModule
  ]
})
export class PSMCustomersListModule { }
