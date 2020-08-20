import { Component, OnInit } from '@angular/core';
import{DbsecurityService}from '../../Services/dbsecurity.service';
import { LoginServiceService } from '../../Services/login-service.service';
import { Commonfields } from '../../../Models/commonfields';
import { Bindalltabs,BindallNotification,BinddataNotification,BindallNotificationCount } from '../../../Models/Login/bindalltabs';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {AppSettings} from 'src/app/app-settings';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ChangePassWordPopUp : boolean = false; CommonfieldsList : Commonfields; ChangePasswordForm: FormGroup;showModalsavepopup: boolean = false;
  SubjectNote:string='';OtherTab:boolean=false;

  OrderProcessing:boolean=false;

  Successtext : any; BindalltabsList : Bindalltabs; isShowLoader : boolean = false;
  Isattchmentsfalse: boolean = false;
  BindallNotificationdata : BindallNotification;   BindallNotificationdata1:BindallNotificationCount;
  BindallNotificationdata2:BindallNotificationCount;
  BindallNotificationdata3:BindallNotificationCount;
  Isnotificationfound:boolean=false;
  BindallNotificationwisedata : BinddataNotification;
  IsAll:string='1'; Notebind:string=''; lblall:string=''; lblunreadall:string='';
  lbltodayall:string='';
  constructor(private formbulider: FormBuilder,private Dbsecurity: DbsecurityService, private _loginService : LoginServiceService) { 
    this.baseUrl = AppSettings.Login_URL;
  }

//   jquery_1_11_3_min_p('#searchText').keypress(function (event) {

//     var keycode = (event.keyCode ? event.keyCode : event.which);
//     if (keycode == '13') {

//         SearchBindRequestHeader();
//     }

// });

  ngOnInit(): void {
    debugger;
    let item1 = JSON.parse(sessionStorage.getItem('User'));
    var UsertType  = this.Dbsecurity.Decrypt(item1.UserType);
    this.BindAllPost();
    this.BindAllPostcount();
    if(UsertType =="2"){this.OtherTab=true;}
if(UsertType !="1"){
}
else{
document.getElementById("divWidth").classList.add("fullmaincontainer");
}
    var value1 = this.Dbsecurity.Decrypt(item1.UserType);
    if(value1=="2"){
this.OrderProcessing=true;
    }
    else
    {
this.OrderProcessing=false;
    }

    this.ChangePasswordForm = this.formbulider.group({
      ConfirmPassword : ['',Validators.required] , NewPassword : ['',Validators.required] , OldPassword : ['',Validators.required]
    });
    let item = JSON.parse(sessionStorage.getItem('User'));
    var value = this.Dbsecurity.Decrypt(item.IsDefaultPswdChange);
                if( value == "False"){
                    this.ChangePassWordPopUp = true;
                }
                this.BindAllTab();
               
  }
  onClicksavepopup(event) {
    this.showModalsavepopup = true;
    
    }
    
    hidesavepopup() {
    this.showModalsavepopup = false;
    }
  ChangePassCancel(){
    this.ChangePassWordPopUp  = false;
  }
  
  SearchFun(Searchvalue)
  {
    debugger;
    this.isShowLoader = true;
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    //var Email = this.Dbsecurity.Decrypt(Sessionvalue.EmailId);
    var Email = Sessionvalue.EmailId;

    var JsonData ={
      "EmailId":Email,
      "NotiType":this.IsAll,
      "Searchvalue":Searchvalue
    }
    this._loginService.BindSearchNote(JsonData).subscribe(
      (data) => {
        this.BindallNotificationdata = data.Table;
        
      });
      this.isShowLoader = false;
  }


  


  ChangePassSave(OldPassWord,NewPassWord,ConfirmedPassword){
    if (this.ChangePasswordForm.valid) {
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    var UserId = Sessionvalue.UserId;
    if(this.Dbsecurity.Decrypt(Sessionvalue.Password) == OldPassWord){
      if(NewPassWord == ConfirmedPassword){
    var NewPassWord = this.Dbsecurity.Encrypt(NewPassWord);
    var JsonField = {
      "OldPassword":OldPassWord,
      "NewPassword":NewPassWord,
      "UserId":UserId
    }
    this._loginService.ChangePassWordNewUser(JsonField).subscribe(
      (data) => {
          this.CommonfieldsList = data.Table;
          if(this.CommonfieldsList[0].Result == "1"){
            this.Successtext = "Password changed Successfully";
            this.showModalsavepopup = true;
            this.ChangePassWordPopUp  = false;
          }
      });
    }
    else{
      this.ChangePasswordForm.controls['NewPassword'].setValue("");
      this.ChangePasswordForm.controls['ConfirmPassword'].setValue("");
      this.validateAllFormFields(this.ChangePasswordForm);
      this.Successtext = "invalid Confirmedpassword";
      this.showModalsavepopup = true;

    }
    }
    else{
      this.ChangePasswordForm.controls['OldPassword'].setValue("");
      this.validateAllFormFields(this.ChangePasswordForm);
      this.Successtext = "invalid oldpassword";
      this.showModalsavepopup = true;
    }
  }
  else{
    this.validateAllFormFields(this.ChangePasswordForm);
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
    return !this.ChangePasswordForm.get(field).valid && this.ChangePasswordForm.get(field).touched;
  }
  BindAllTab(){
    debugger;
    this.isShowLoader = true;
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    var UserType = this.Dbsecurity.Decrypt(Sessionvalue.UserType);
    var JsonData ={
      "UserId":UserType
    }
    this._loginService.BindAllTab(JsonData).subscribe(
      (data) => {
        this.BindalltabsList = data.Table;
      });
      this.isShowLoader = false;
  }
  imagefilename:string=""; baseUrl: string = ""; imagebindurl:any='';
  Attachmentcodedisabled:boolean= false; Allpostid=[];
  CheckClickLink()
  {
    if(this.imagefilename =='')
    {
      event.preventDefault();
    }
  }
  divClickRead(Lineid)
  {
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    //var Email = this.Dbsecurity.Decrypt(Sessionvalue.EmailId);
    var Email = Sessionvalue.EmailId;

    var JsonData ={
      "EmailId":Email,
      "NotiType":Lineid
    }
    this._loginService.BindRowwisedata(JsonData).subscribe(
      (data) => {
        this.BindallNotificationwisedata = data.Table;
        this.Notebind= this.BindallNotificationwisedata[0].Note;
        this.imagefilename=this.BindallNotificationwisedata[0].AttachmentFile;
        this.imagebindurl="";
      this.imagebindurl=this.baseUrl+"/"+"Notificationattachments"+"/"+this.imagefilename;
        if(this.imagefilename !='')
        {
          this.Attachmentcodedisabled=true;
        }
        else
        {
          
          this.Attachmentcodedisabled=false;
        }
        
        this.BindAllPostcount();
      });
      debugger;
      var dynamicid='Dynamicdiv'+Lineid;
      var element = document.getElementById(dynamicid);
      
     for(var t=0;t<this.Allpostid.length;t++)
     {
       if(Lineid==this.Allpostid[t])
       {
        var dynamicid1='Dynamicdiv'+this.Allpostid[t];
        var element1 = document.getElementById(dynamicid1);
        element1.classList.remove("fontBold");
        element1.classList.remove("notificationboxunactive");
        element.classList.add("notificationboxactive");
       }
       else{
        var dynamicid1='Dynamicdiv'+this.Allpostid[t];
        var element1 = document.getElementById(dynamicid1);
        element1.classList.remove("notificationboxactive");
        element1.classList.add("notificationboxunactive");
        
       }
     
     }
     
      

      //element.classList.remove("notificationboxactive");
      // element.classList.remove("fontBold");
     

      this.isShowLoader = false;
      
  }
  ClickAll()
  {
    
   this.IsAll='1';
   var element = document.getElementById("myDIV1");
   element.classList.remove("msgall");
   var element1 = document.getElementById("myDIV");
   element1.classList.add("msgall");
   var element2 = document.getElementById("myDIV2");
   element2.classList.remove("msgall");
   this.BindAllPost();
   
  }

  ClickRead()
  {
    
    this.IsAll='2';
    this.BindAllPost();
    var element3 = document.getElementById("myDIV");
    element3.classList.remove("msgall");
    var element13 = document.getElementById("myDIV1");
    element13.classList.add("msgall");
    var element23 = document.getElementById("myDIV2");
    element23.classList.remove("msgall");
  }

  ClickTodayNotification()
  {
    
    this.IsAll='3';
    this.BindAllPost();
    var element = document.getElementById("myDIV");
    element.classList.remove("msgall");
    var element1 = document.getElementById("myDIV1");
    element1.classList.remove("msgall");
    var element2 = document.getElementById("myDIV2");
    element2.classList.add("msgall");
  }

  BindAllPost(){
    this.Allpostid=[];
    debugger;
    this.isShowLoader = true;
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    //var Email = this.Dbsecurity.Decrypt(Sessionvalue.EmailId);
    var Email = Sessionvalue.EmailId;

    var JsonData ={
      "EmailId":Email,
      "NotiType":this.IsAll
    }
    this._loginService.BindNote(JsonData).subscribe(
      (data) => {
        this.BindallNotificationdata = data.Table;
        for(var kk=0;kk<data.Table.length;kk++)
        {
        this.Allpostid.push(data.Table[kk].NMId);
          
        }
        
      });
      this.isShowLoader = false;
  }

  BindAllPostcount(){
    
    debugger;
    this.isShowLoader = true;
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    //var Email = this.Dbsecurity.Decrypt(Sessionvalue.EmailId);
    var Email = Sessionvalue.EmailId;

    var JsonData ={
      "EmailId":Email
    }
    this._loginService.BindNoteCount(JsonData).subscribe(
      (data) => {
        this.BindallNotificationdata1 = data.Table;
        this.lblall=this.BindallNotificationdata1[0].Total;

        this.BindallNotificationdata2 = data.Table1;
        this.lblunreadall=this.BindallNotificationdata2[0].Total;

        this.BindallNotificationdata3 = data.Table2;
        this.lbltodayall=this.BindallNotificationdata3[0].Total;
        
        
      });
      this.isShowLoader = false;
  }

  
 

}
