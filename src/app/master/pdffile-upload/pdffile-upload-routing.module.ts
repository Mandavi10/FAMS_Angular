import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PDFFileUploadComponent } from './pdffile-upload.component';

const routes: Routes = [{path:'',component:PDFFileUploadComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PDFFileUploadRoutingModule { }
