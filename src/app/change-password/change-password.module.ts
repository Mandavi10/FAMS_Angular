import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './change-password.component';
import { ChangePasswordRoutingModule } from './change-password-routing.module';
@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,
    ChangePasswordRoutingModule
  ]
})
export class ChangePasswordModule { }
