import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PMSEmployeesComponent } from './pmsemployees.component';
import { PMSEmployeesRoutingModule } from './pmsemployees-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { BrowserModule } from '@angular/platform-browser';
import{FormsModule,ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import {AuthGuardService } from 'src/app/Services/auth-guard.service';
import {AppSettings} from 'src/app/app-settings';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import{HeaderComponent} from 'src/app/header/header.component';

@NgModule({
  declarations: [PMSEmployeesComponent],
  imports: [
    CommonModule,
    //HeaderComponent,
    PMSEmployeesRoutingModule,FormsModule,ReactiveFormsModule,HttpClientModule,
    AgGridModule.withComponents([])
  ],
  providers: [DatePipe,AuthGuardService, { provide: 'BASE_URL', useFactory: getBaseUrl }],
  bootstrap: [PMSEmployeesComponent]
})
export class PMSEmployeesModule { }
export function getBaseUrl() {
  var BASE_URL=AppSettings.Login_URL;
    return BASE_URL;
}

