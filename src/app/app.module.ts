import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { LayOutModule } from './master/lay-out.module';
import { RouterModule } from '@angular/router';
import{ForgotPasswordModule} from './forgot-password/forgot-password.module';
import{LoginModule} from './login/login.module';
import { AgGridModule } from 'ag-grid-angular';
import {AuthGuardService } from './Services/auth-guard.service';
import {AppSettings} from './app-settings';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MultiSelectService } from './multi-select.service';

@NgModule({
  declarations: [
    AppComponent,
    ChangePasswordComponent   
  ],
  imports: [
    BrowserModule,BrowserAnimationsModule,FormsModule,ReactiveFormsModule,LayOutModule,LoginModule,ForgotPasswordModule,
    RouterModule.forRoot([]),
    AgGridModule.withComponents([]),
    HttpClientModule,
    BsDatepickerModule.forRoot()
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }


