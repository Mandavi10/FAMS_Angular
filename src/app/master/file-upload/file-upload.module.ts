import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { FileUploadRoutingModule } from './file-upload-routing.module';


@NgModule({
  declarations: [FileUploadComponent],
  imports: [
    CommonModule,
    FileUploadRoutingModule
  ]
})
export class FileUploadModule { }
