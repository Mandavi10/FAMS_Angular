import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadMandateComponent } from './download-mandate.component';
import { DownloadMandateRoutingModule } from './download-mandate-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
@NgModule({
  declarations: [DownloadMandateComponent],
  imports: [
    CommonModule,
    DownloadMandateRoutingModule,
    BsDatepickerModule,
    AgGridModule.withComponents([])
  ]
})
export class DownloadMandateModule { }
