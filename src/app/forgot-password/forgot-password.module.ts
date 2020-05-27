import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import{ForgotPasswordComponent} from './forgot-password.component';
@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
      ReactiveFormsModule,
    ForgotPasswordRoutingModule
  ]
})
export class ForgotPasswordModule { }
