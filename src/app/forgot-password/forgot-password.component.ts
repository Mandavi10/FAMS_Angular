import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginServiceService } from '../Services/login-service.service';
import{DbsecurityService}from '../Services/dbsecurity.service';
import{EmailSent} from '../../Models/Login/email-sent';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  Forgotpasswordform: FormGroup;public errormsg: any; emailsent:EmailSent; message: string; btnsubmitDisabled: boolean = false;
  constructor(private router: Router,private formBuilder: FormBuilder,private _loginService: LoginServiceService,private Dbsecurity: DbsecurityService) { }
  Show(){
    this.router.navigate(['/Login']);
}
  ngOnInit(): void {
    this.Forgotpasswordform = this.formBuilder.group({
      EmailID: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
  });
  }

  Removelabel() { this.errormsg = ''; this.btnsubmitDisabled = false;}
  get AllFields() { return this.Forgotpasswordform.controls;  }
  displayFieldCss(field: string) {

    return {
        'validate': this.isFieldValid(field),
    };
}
isFieldValid(field: string) {

    return !this.Forgotpasswordform.get(field).valid && this.Forgotpasswordform.get(field).touched;
}

  onSubmit()
  {
    if (this.Forgotpasswordform.valid) {
      this.btnsubmitDisabled = true;
      this._loginService.ForgotPassword(this.AllFields.EmailID.value).subscribe(
        (data) => {
            this.emailsent = data;
            if (data[0].Flag == "0") {
                this.errormsg = data[0].FlagValue;
                this.Forgotpasswordform.reset();
                this.btnsubmitDisabled = false;
            }
            else {
                this.message="Email sent successfully!!";
                this.btnsubmitDisabled = false;
                alert(this.message);
                //console.log(item.UserId);
                this.router.navigate(['/Login']);
            }
        });
    }
    else
    {
      this.validateAllFormFields(this.Forgotpasswordform);
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
