import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PMSProviderComponent } from './pmsprovider.component';
import { PMSproviderRoutingModule } from './pmsprovider-routing.module';


@NgModule({
  declarations: [PMSProviderComponent],
  imports: [
    CommonModule,
    PMSproviderRoutingModule
  ]
})
export class PMSproviderModule { }
