import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent} from '../main-layout/main-layout.component';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { LayOutRoutingModule } from './lay-out-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import{NorightclickModule}from '../Services/norightclick.module';

import { TrialBalanceReportComponent } from './trial-balance-report/trial-balance-report.component';

import { EntityComponent } from './entity/entity.component';
import { CustomerComponent } from './customer/customer.component';





@NgModule({
  declarations: [MainLayoutComponent,HeaderComponent,SidebarComponent,FooterComponent, TrialBalanceReportComponent, EntityComponent, CustomerComponent],
  imports: [
    CommonModule,
    LayOutRoutingModule,
    AgGridModule.withComponents([]),
    NorightclickModule
  ]
})
export class LayOutModule { }
