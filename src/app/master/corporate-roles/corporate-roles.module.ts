import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{CorporateRolesComponent} from './corporate-roles.component';
import { CorporateRolesRoutingModule } from './corporate-roles-routing.module';

@NgModule({
  declarations: [CorporateRolesComponent],
  imports: [
    CommonModule,
    CorporateRolesRoutingModule
  ]
})
export class CorporateRolesModule { }
