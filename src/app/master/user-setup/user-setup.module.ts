import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSetupComponent } from './user-setup.component';
import { UserSetupRoutingModule } from './user-setup-routing.module';


@NgModule({
  declarations: [UserSetupComponent],
  imports: [
    CommonModule,
    UserSetupRoutingModule
  ]
})
export class UserSetupModule { }
