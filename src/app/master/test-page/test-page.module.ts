import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestPageComponent } from './test-page.component';
import { TestPageRoutingModule } from './test-page-routing.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [TestPageComponent],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
    TestPageRoutingModule
  ]
})
export class TestPageModule { }
