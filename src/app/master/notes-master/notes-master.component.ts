import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotemasterService } from '../../Services/NoteMsater/notemaster.service';
import {Bindgridfields} from '../../../Models/NoteMaster/bindgridfields';
import { Commonfields } from '../../../Models/commonfields';
import { DbsecurityService } from 'src/app/Services/dbsecurity.service';
import { ValueCache } from 'ag-grid-community';
import {AppSettings} from 'src/app/app-settings';

@Component({
  selector: 'app-notes-master',
  templateUrl: './notes-master.component.html',
  styleUrls: ['./notes-master.component.css']
})
export class NotesMasterComponent implements OnInit {
  BindgridfieldsList : Bindgridfields;CommonfieldsList : Commonfields;showModalsavepopup: boolean= false;
  HeaderArray : any; liNew : boolean = true; liExporttoex : boolean = true; NoteMasterForm : FormGroup;
  isShowLoader : boolean = false; NMId : any; SucesspopText : any;
  columnDefs = [
    {headerName: 'All', field: 'all', width:'60', cellRenderer: function(){
      return'<input type="checkbox" class="texBox" value="All" style="width:15px"/>'
          }},
          {hide: true , field: 'NMId', width: 150},
          {hide: true , field: 'FontSize', width: 150},
          {hide: true , field: 'EmailType', width: 150},
    {headerName: 'Sr. No.', field: 'srNo', width:'80'},
    {headerName: 'Subject', field: 'subject', width:'150'},
    {headerName: 'Date of Submission', field: 'dateofsubmission', width:'150'},
    
    
];

rowData = [
    {  srNo: '1', subject:'Trial Report', dateofsubmission:'29/05/2020'},
    {  srNo: '2', subject:'Trial Report', dateofsubmission:'29/05/2020'},
    {  srNo: '3', subject:'Trial Report', dateofsubmission:'29/05/2020'},   
];


onClicksavepopup(event) {
  this.showModalsavepopup = true;
  
  }
  
  hidesavepopup() {
  this.showModalsavepopup = false;
  }

  showModalstatemaster: boolean;
  showGrid = true;
  showForm = false;
  Allcustomer_Change()
  {
  const Email = this.NoteMasterForm.get('Email');
  document.getElementById("txtEmailId").setAttribute("placeholder", "");
    if(this.NoteMasterForm.controls['Allcustomercheck'].value==true){
      this.NoteMasterForm.controls['Email'].setValue('');
     this.Emailcodedisabled=true;
     Email.clearValidators(); Email.updateValueAndValidity();
  }
  else{
      this.Emailcodedisabled=false;
      this.NoteMasterForm.controls['Email'].setValue('');
      Email.setValidators(Validators.required); Email.updateValueAndValidity();
  }

   
  }

  onClickNew() {
    this.NoteMasterForm.reset();
    this.liNew = false;
    this.showGrid = false;
    this.showForm = true;
    this.liExporttoex = false;
    this.NMId = "";
    }
  onClickstatemaster(event) {
    this.showModalstatemaster = true;    
    }
    
    hidestatemaster() {
    this.showModalstatemaster = false;
    }
  constructor(private NMService : NotemasterService,private router: Router,private formBuilder: FormBuilder) {
    this.baseUrl = AppSettings.Login_URL;
  }

  baseUrl: string = ""; imagebindurl:any='';Attachmentcodedisabled:boolean= true;imagefilename:string="";
  Emailcodedisabled:boolean=false; IscustomerAll:string="";imageurl:any=''; fileToUpload: any;
  lblmsg:string='';imagebase64:any='';currentId: number = 0; Isattachments:string="";
  Allcheckboxcodedisabled:boolean=false; Subjectcodedisabled:boolean=false;
  Subjectnotecodedisabled:boolean=false; FileCoddisabled:boolean=false;
  btnsavedisable:boolean=false;
  ngOnInit(): void {
    this.NoteMasterForm = this.formBuilder.group({ 
      Email : ['',[Validators.required]] ,
      Allcustomercheck : [''] ,
      Subject : ['',Validators.required] , 
      SubjectNote : ['',Validators.required],
      Attachments:['']
    });
    this.BindGrid();
  }
  commaSepEmail = (control: AbstractControl): { [key: string]: any } | null => {
    alert(control.value);
    const emails = control.value.split(',');
    const forbidden = emails.some(email => Validators.email(new FormControl(email)));
    console.log(forbidden);
    return forbidden ? { 'Email': { value: control.value } } : null;
  };
  chkEmail() {
    let email = ((document.getElementById("txtEmailId") as HTMLInputElement).value);
    let check=0;
    let regex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z0-9.-]{2,4}$/;
    const email1 = ((document.getElementById("txtEmailId") as HTMLInputElement).value).split(',');
    for(var i=0;i<email1.length;i++)
    {
      if (regex.test(email1[i]) != true) {
        check=1;
      }
    }
    
    if (check==1) {
        this.NoteMasterForm.controls['Email'].setValue('');
        document.getElementById("txtEmailId").classList.add('validate');
        document.getElementById("txtEmailId").setAttribute("placeholder", "Invalid-Email");
    }
    else {
        document.getElementById("txtEmailId").classList.remove('validate');
        document.getElementById("txtEmailId").setAttribute("placeholder", "");
    }       
  }
  
  SearchFun(Searchvalue)
  {
    debugger;
    this.isShowLoader = true;
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    var Email = Sessionvalue.UserId;
    var JsonData ={
      "UserId":Email,
      "Searchvalue":Searchvalue
    }
    this.NMService.BindSearchGrid(JsonData).subscribe(
      (data) => {
        this.BindgridfieldsList = data.Table;
      });
      this.isShowLoader = false;
  }



  CancelFun(){
  this.showGrid = true;
  this.showForm = false;
  this.liNew = true;
  this.liExporttoex = true;
  this.btnsavedisable=false;
  this.NoteMasterForm.reset();
  this.Allcheckboxcodedisabled=false;
  this.Emailcodedisabled=false;
  this.Subjectnotecodedisabled=false;
  this.Subjectcodedisabled=false;
  this.Attachmentcodedisabled=true;
  this.FileCoddisabled=false;
  this.imagefilename="";
  const Email = this.NoteMasterForm.get('Email');
  Email.setValidators(Validators.required); Email.updateValueAndValidity();


  this.BindGrid();
  }

  BindGrid(){
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    var UserId = Sessionvalue.UserId;
    var JsonData ={
      "UserId": UserId
    }
    this.NMService.BindGrid(JSON.stringify(JsonData)).subscribe(
      (data) => {  
        this.BindgridfieldsList = data.Table;   
  });
}

Filechangeevent(event: any,field)
{
  this.imageurl=null;
  this.lblmsg='';
  if(event.target.files[0].size <2942439)
  {
    if (event.target.files[0].type=='image/png' ||event.target.files[0].type=='image/jpeg'||
    event.target.files[0].type=='image/jpg' ||event.target.files[0].type=='image/gif' ||
    event.target.files[0].type=='image/bmp') {

    this.currentId = field;
    //this.imageurl=event.target.files[0];
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.handleInputChange(file);
    }
    else
    {
    this.lblmsg='Please select jpg, jpeg, png, gif or bmp file only';
    }
    }
  }
  else{alert("Scan image size can't be more than 3 MB");}

}
handleInputChange(files) {
  var file = files;
  var pattern = /image-*/;
  var reader = new FileReader();
  if (!file.type.match(pattern)) {
    alert('invalid format');
    return;
  }
  reader.onloadend = this._handleReaderLoaded.bind(this);
  reader.readAsDataURL(file);

}
_handleReaderLoaded(e) {
  let id = this.currentId;
  let reader = e.target;
  var base64result = reader.result.substr(reader.result.indexOf(',') + 1);
  //this.imageSrc = base64result;
  switch (id) {
    case 1:
  this.fileToUpload = base64result;

  }
}

SaveData()
{
if(this.NMId !='')
{
  event.preventDefault();
}
else{

  if (this.NoteMasterForm.valid) {   
    this.isShowLoader = true;
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    var UserId = Sessionvalue.UserId;
    if(this.NoteMasterForm.controls['Allcustomercheck'].value==true){
      this.IscustomerAll="1";
    }
    else{
  this.IscustomerAll=this.NoteMasterForm.controls['Email'].value;
    }

   
    const Email = this.NoteMasterForm.get('Email');
      var JsonData ={
    "Email" : this.IscustomerAll,
    "Subject":  this.NoteMasterForm.controls['Subject'].value,
    "Note" :  this.NoteMasterForm.controls['SubjectNote'].value,
    "Attachment":  this.fileToUpload,
    "UserId": UserId
       }
       this.NMService.SaveData(JSON.stringify(JsonData)).subscribe(
            (data) => {  
              this.CommonfieldsList = data.Table;   
              if(this.CommonfieldsList[0].Result == "1"){
                this.Emailcodedisabled=false;
                Email.setValidators(Validators.required); Email.updateValueAndValidity();
                this.SucesspopText = "Saved Successfully";
                this.showModalsavepopup = true;
              }
              else{
                this.SucesspopText = "Error";
                this.showModalsavepopup = true;
              }
              this.showGrid = true;
              this.showForm = false;
              this.liNew = true;
              this.liExporttoex = true;
              this.isShowLoader = false;
              this. BindGrid();
        });
  }
  else{

    this.validateAllFormFields(this.NoteMasterForm);
  }
}
}

validateAllFormFields(formGroup: FormGroup) {
  Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);

      if (control instanceof FormControl) {
          control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
          this.validateAllFormFields(control);
      }
  });
}
displayFieldCss(field: string) {
  return {
      'validate': this.isFieldValid(field),
  };
}
isFieldValid(field: string) {
  return !this.NoteMasterForm.get(field).valid && this.NoteMasterForm.get(field).touched;
}



ConvertToCSV(objArray) {
  this.HeaderArray = {
    srNo: "Sr.No.",  subject: "Subject", 
    dateofsubmission: "Date of submission " 
}
  var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  var str = '';
  var row = "";

  //   for (var index in objArray[0]) {
          //Now convert each value to string and comma-separated
     //     row += index + ',';
     // }
     // row = row.slice(0, -1);
      //append Label row with line break
     // str += row + '\r\n';

     for (var i = 0; i < array.length; i++) {
      var line = "";

      if (i == 0) {
          for (var index in this.HeaderArray) {
              if (line != '') line += ','

              line += this.HeaderArray[index];
          }
          str += line + '\r\n';
      }
      var line = '';
      for (var index in array[i]) {
        if(index != "NMId"){
          if(index != "Note"){
            if(index != "FontSize"){
          if (line != '') line += ','
          line += (<string>array[i][index]);
          }
        }
      }
    }
      str += line + '\r\n';
  }
  return str;
}
downloadCSVFile() {  
  this.isShowLoader = true;
  var csvData = this.ConvertToCSV(JSON.stringify(this.BindgridfieldsList));
  var a = document.createElement("a");
  a.setAttribute('style', 'display:none;');
  document.body.appendChild(a);
  var blob = new Blob([csvData], { type: 'text/csv' });
  var url = window.URL.createObjectURL(blob);
  a.href = url;  
  a.download = 'NoteFile.csv';/* your file name*/
  this.isShowLoader = false;
  a.click();
  return 'success';
}
CheckClickLink()
{
  if(this.imagefilename =='')
  {
    event.preventDefault();
  }
  
}
onRowSelected(event){
  
   this.NMId = event.data.NMId;
   this.NoteMasterForm.reset();
   this.NoteMasterForm.controls['Subject'].setValue(event.data.subject);
   this.NoteMasterForm.controls['SubjectNote'].setValue(event.data.Note);
  this.imagefilename=event.data.FontSize;
  this.imagebindurl="";
this.imagebindurl=this.baseUrl+"/"+"Notificationattachments"+"/"+this.imagefilename;
  if(this.imagefilename !='')
  {
    this.Attachmentcodedisabled=false;
  }
  else
  {
    
    this.Attachmentcodedisabled=true;
  }
  
  this.Allcheckboxcodedisabled=true;
  this.Emailcodedisabled=true;
  this.Subjectnotecodedisabled=true;
  this.Subjectcodedisabled=true;
  this.FileCoddisabled=true;
   if(event.data.EmailType=="2")
   {
    this.BindallEmail(event.data.NMId);
    
   }
   else{
    this.NoteMasterForm.controls['Allcustomercheck'].setValue('true');
   }
  
  this.liNew = false;
  this.showGrid = false;
  this.showForm = true;
  this.liExporttoex = false;
  this.btnsavedisable=true;
  
}



BindallEmail(Notificationid)
{
  var JsonData ={
    "UserId": Notificationid
  }
  this.NMService.BindEmaildata(JSON.stringify(JsonData)).subscribe(
    (data) => {  
      this.BindgridfieldsList = data.Table;   
      this.NoteMasterForm.controls['Email'].setValue(this.BindgridfieldsList[0].subject);
});
}

}
