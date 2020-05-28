import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{FormsModule,ReactiveFormsModule} from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import{LoginComponent} from './login.component';
import {AppSettings} from '../app-settings';
import { HttpClientModule } from '@angular/common/http';
import { LoginServiceService } from '../Services/login-service.service';
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [LoginServiceService ,{ provide: 'BASE_URL', useFactory: getBaseUrl }],
})
export class LoginModule { }
export function getBaseUrl() {
  var BASE_URL=AppSettings.Login_URL;
    return BASE_URL;
}


