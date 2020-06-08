import { Component, OnInit } from '@angular/core';
import{DbsecurityService}from '../../Services/dbsecurity.service';
import { LoginServiceService } from '../../Services/login-service.service';
import { Commonfields } from '../../../Models/commonfields';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ChangePassWordPopUp : boolean = false; CommonfieldsList : Commonfields; ChangePasswordForm: FormGroup;showModalsavepopup: boolean = false;
  constructor(private formbulider: FormBuilder,private Dbsecurity: DbsecurityService, private _loginService : LoginServiceService) { }

  ngOnInit(): void {
    debugger;
    this.ChangePasswordForm = this.formbulider.group({
    });
    let item = JSON.parse(sessionStorage.getItem('User'));
    var value = this.Dbsecurity.Decrypt(item.IsDefaultPswdChange);
                if( value == "False"){
                    this.ChangePassWordPopUp = true;
                }
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
            //alert("Password changed");
            this.showModalsavepopup = true;
            this.ChangePassWordPopUp  = false;
          }
      });
    }
    else{
      alert("invalid Confirmedpassword");
    }
    }
    else{
      alert("invalid oldpassword");
    }
   
  }

}
