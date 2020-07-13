import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent} from '../main-layout/main-layout.component';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { MenuComponent } from '../menu/menu.component';
import { LayOutRoutingModule } from './lay-out-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import{NorightclickModule}from '../Services/norightclick.module';




@NgModule({
  declarations: [MainLayoutComponent,HeaderComponent,SidebarComponent,FooterComponent,MenuComponent],
  imports: [
    CommonModule,
    LayOutRoutingModule,
    AgGridModule.withComponents([]),
    NorightclickModule
  ]
})
export class LayOutModule { }
