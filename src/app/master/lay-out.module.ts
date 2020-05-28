import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent} from '../main-layout/main-layout.component';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { LayOutRoutingModule } from './lay-out-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import{NorightclickModule}from '../Services/norightclick.module';
import { CountryMasterComponent } from './country-master/country-master.component';
import { SectorMasterComponent } from './sector-master/sector-master.component';
import { CityMasterComponent } from './city-master/city-master.component';
import { DesignationMasterComponent } from './designation-master/designation-master.component';



@NgModule({
  declarations: [MainLayoutComponent,HeaderComponent,SidebarComponent,FooterComponent, CountryMasterComponent, SectorMasterComponent, CityMasterComponent, DesignationMasterComponent],
  imports: [
    CommonModule,
    LayOutRoutingModule,
    AgGridModule.withComponents([]),
    NorightclickModule
  ]
})
export class LayOutModule { }
