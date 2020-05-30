import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSetupComponent } from './user-setup.component';
import { UserSetupRoutingModule } from './user-setup-routing.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [UserSetupComponent],
  imports: [
    CommonModule,
    UserSetupRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class UserSetupModule { }
