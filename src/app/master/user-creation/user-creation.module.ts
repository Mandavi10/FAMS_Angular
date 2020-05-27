import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import{UserCreationComponent} from './user-creation.component';
import { UserCreationRoutingModule } from './user-creation-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import {AppSettings} from 'src/app/app-settings';

@NgModule({
  declarations: [UserCreationComponent],
  imports: [
    CommonModule,
    UserCreationRoutingModule,ReactiveFormsModule,FormsModule,
    AgGridModule.withComponents([])
  ],
  providers: [{ provide: 'BASE_URL', useFactory: getBaseUrl }],
})
export class UserCreationModule { }
export function getBaseUrl() {
  var BASE_URL=AppSettings.SaveUser_URL;
    return BASE_URL;
}
