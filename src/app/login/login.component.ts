import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginServiceService } from '../Services/login-service.service';
import { Logindetails } from '../../Models/Login/logindetails';
import{DbsecurityService}from '../Services/dbsecurity.service';
import{FormJsondata} from '../../Models/Login/form-jsondata';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showSideNav= true;
  href1: string;LoginForm: FormGroup;public errormsg: any;message: string; login: Logindetails; btnloginDisabled: boolean = false;
  CaptchaArr = ['redCaptcha','greanCaptcha','blueCaptcha','orangeCaptcha','voiletCaptcha'];
  randomcaptchavalue:string="";  randomcaptcha:string="";
  constructor(private router: Router,private formBuilder: FormBuilder,private _loginService: LoginServiceService,private Dbsecurity: DbsecurityService) {
    router.events.subscribe(event => {
      if (router.url === '/Dashboard') {
        this.showSideNav = false;
      }
    });

   }
  ngOnInit() {
    sessionStorage.clear();
    this.LoginForm = this.formBuilder.group({
      //APPID: ['', [Validators.required,Validators.minLength(6),Validators.pattern('^[0-9]*$')]],
      UserName: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      Password: ['', [Validators.required,Validators.pattern('^[0-9]*$')]],
      //Password: ['', [Validators.required,Validators.pattern('(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d$@$!%*?&].{7,}')]],
      captcha: ['', [Validators.required]]
  });
  this.BindRandomCaptcha();
    }
    Removelabel() { this.errormsg = '';  this.btnloginDisabled = false;}
    BindRandomCaptcha()
    {
      let Stringlength = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
      const lengthOfCode = 5;
      this.randomcaptcha=makeRandom(lengthOfCode, Stringlength);
       this.randomcaptchavalue=this.CaptchaArr[Math.floor(Math.random()*this.CaptchaArr.length)];
       
    }
    onReset()
    {
this.BindRandomCaptcha();
this.LoginForm.reset();
    }
    get AllFields() { return this.LoginForm.controls; }
    displayFieldCss(field: string) {

      return {
          'validate': this.isFieldValid(field),
      };
  }
  isFieldValid(field: string) {

      return !this.LoginForm.get(field).valid && this.LoginForm.get(field).touched;
  }


  onSubmit() {
    //commenton push

    this.router.navigate(['/Dashboard']);

    if (this.LoginForm.valid) {
      
    if(this.AllFields.captcha.value == this.randomcaptcha)
    {

      this.btnloginDisabled = true;
      let _apipostdata = new FormJsondata();
       //_apipostdata.APPID=this.AllFields.APPID.value;
       _apipostdata.UserName=this.AllFields.UserName.value;
       _apipostdata.Password=this.Dbsecurity.Encrypt(this.AllFields.Password.value);
        this._loginService.GetLogin(JSON.stringify(_apipostdata)).subscribe(
            (data) => {
                this.login = data;
                if (data[0].Flag == "0") {
                  this.btnloginDisabled = false;
                    this.errormsg = data[0].FlagValue;
                    this.LoginForm.reset();
                    this.BindRandomCaptcha();
                }
                else {
                  this.btnloginDisabled = false;
                    sessionStorage.setItem('User', JSON.stringify(data[0]));
                    let item = JSON.parse(sessionStorage.getItem('User'));
                    //console.log(item.UserId);
                    this.router.navigate(['/Home']);
                }
            });
          }
          else{
this.errormsg="Invalid Captcha!!";
this.LoginForm.reset();
this.BindRandomCaptcha();
          }
    }
    else {
        this.validateAllFormFields(this.LoginForm);
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
  }

  function makeRandom(lengthOfCode: number, possible: string) {
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
      return text;
  }
  


