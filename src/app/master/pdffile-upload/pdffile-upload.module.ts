import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PDFFileUploadComponent } from './pdffile-upload.component';
import { PDFFileUploadRoutingModule } from './pdffile-upload-routing.module';


@NgModule({
  declarations: [PDFFileUploadComponent],
  imports: [
    CommonModule,
    PDFFileUploadRoutingModule
  ]
})
export class PDFFileUploadModule { }
