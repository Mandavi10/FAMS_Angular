import { Component, OnInit } from '@angular/core';
import{DbsecurityService}from '../../Services/dbsecurity.service';
import { LoginServiceService } from '../../Services/login-service.service';
import { Commonfields } from '../../../Models/commonfields';
import { Bindalltabs } from '../../../Models/Login/bindalltabs';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ChangePassWordPopUp : boolean = false; CommonfieldsList : Commonfields; ChangePasswordForm: FormGroup;showModalsavepopup: boolean = false;
  OrderProcessing:boolean;
  Successtext : any; BindalltabsList : Bindalltabs; isShowLoader : boolean = false;

  constructor(private formbulider: FormBuilder,private Dbsecurity: DbsecurityService, private _loginService : LoginServiceService) { }

  ngOnInit(): void {
    let item1 = JSON.parse(sessionStorage.getItem('User'));
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
 

}
