import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PDFFileUploadComponent } from './pdffile-upload.component';
import { PDFFileUploadRoutingModule } from './pdffile-upload-routing.module';
import{FormsModule,ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [PDFFileUploadComponent],
  imports: [
    CommonModule,
    PDFFileUploadRoutingModule,FormsModule,ReactiveFormsModule
  ]
})
export class PDFFileUploadModule { }
