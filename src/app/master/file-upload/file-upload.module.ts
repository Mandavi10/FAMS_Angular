import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { FileUploadRoutingModule } from './file-upload-routing.module';
import{FormsModule,ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [FileUploadComponent],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,
    FileUploadRoutingModule
  ]
})
export class FileUploadModule { }
