import { Component, OnInit,ViewChild } from '@angular/core';
import { FileuploadService } from '../../Services/FileUpload/fileupload.service';
import { FormGroup, Validators, FormControl, FormBuilder, FormArray,ReactiveFormsModule,FormsModule } from '@angular/forms';
import { Commonfields } from '../../../Models/commonfields';

@Component({
  selector: 'app-pdffile-upload',
  templateUrl: './pdffile-upload.component.html',
  styleUrls: ['./pdffile-upload.component.css']
})
export class PDFFileUploadComponent implements OnInit {
  //PdfFileUpload:FormGroup;
  CommonfieldsList:Commonfields;showModalsavepopup:boolean;isShowLoader:boolean=false;
  @ViewChild('fileInput') fileInput
  constructor(private FileuploadService : FileuploadService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  //   this.PdfFileUpload = this.formBuilder.group({  
  //     fileupload :['']
  // });
  }

  uploadpdffile(){
    debugger;
    this.isShowLoader=true;
     let formData=new FormData();
   formData.append('upload', this.fileInput.nativeElement.files[0]);
     this.FileuploadService.UploadPDF(formData).
     subscribe((data) => {
      this.CommonfieldsList = data;
      //alert(this.CommonfieldsList.Result[0]);
      this.isShowLoader=false;
      this.showModalsavepopup=true;     
     });
   }

   hidesavepopup() {
    this.showModalsavepopup = false;
   }

}
