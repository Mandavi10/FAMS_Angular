import { Component, OnInit,ViewChild } from '@angular/core';
import { FileuploadService } from '../../Services/FileUpload/fileupload.service';
import { FormGroup, Validators, FormControl, FormBuilder, FormArray,ReactiveFormsModule,FormsModule } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  fileupload: FormGroup;
  isShowLoader:boolean=false;
  showModalsavepopup:boolean;
  public btnupload:boolean=true;public btnfileinput:boolean=false;
  @ViewChild('fileInput') fileInput
  constructor(private FileuploadService : FileuploadService) { }

  ngOnInit(): void {
 
  }

  uploadClick()
  {
    debugger;
    this.btnfileinput=true;
    this.btnupload=false;
  }
  uploadcsvfile(){
   this.isShowLoader=true;
    let formData=new FormData();
  formData.append('upload', this.fileInput.nativeElement.files[0]);
    this.FileuploadService.UploadCSV(formData).
    subscribe((data) => {
      this.isShowLoader=false;
      this.showModalsavepopup = true;
    });
  }
  hidesavepopup() {
    this.showModalsavepopup = false;
   }
}
