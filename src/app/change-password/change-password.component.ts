import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginServiceService } from '../Services/login-service.service';
import{DbsecurityService}from '../Services/dbsecurity.service';
import{Changepasswordjson} from '../../Models/Login/changepasswordjson';
import{Changepasswordres} from '../../Models/Login/changepasswordres';
import { ConfirmPasswordValidator } from '../../Models/Validations/validation';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  ChangepasswordForm: FormGroup;btnSubmitDisabled: boolean = false;public errormsg: any; message: string; changepasswordres:Changepasswordres;
  constructor(private router1: ActivatedRoute,private router: Router,private formBuilder: FormBuilder,private _loginService: LoginServiceService,private Dbsecurity: DbsecurityService) { }

  ngOnInit(): void {
    this.ChangepasswordForm = this.formBuilder.group({
      newpassword: ['', [Validators.required,Validators.pattern('(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d$@$!%*?&].{7,}')]],
      confirmPassword: ['', [Validators.required,  Validators.pattern('(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d$@$!%*?&].{7,}')]]
  },
  { validator: ConfirmPasswordValidator.MatchPassword }
  );
  }
  Removelabel() { this.errormsg = '';  this.btnSubmitDisabled = false;}
  get AllFields() { return this.ChangepasswordForm.controls; }
  displayFieldCss(field: string) {

    return {
        'validate': this.isFieldValid(field),
    };
}
isFieldValid(field: string) {

    return !this.ChangepasswordForm.get(field).valid && this.ChangepasswordForm.get(field).touched;
}

  onSubmit()
  {
    if (this.ChangepasswordForm.valid) {
      this.btnSubmitDisabled = true;
      let id = this.router1.snapshot.paramMap.get("Id");
      let _apipostdata = new Changepasswordjson();
       _apipostdata.password= this.Dbsecurity.Encrypt(this.AllFields.newpassword.value);
       _apipostdata.Userid=id;
        this._loginService.Changepassword(JSON.stringify(_apipostdata)).subscribe(
            (data) => {
                this.changepasswordres = data;
                if (data[0].Flag == "0") {
                  this.btnSubmitDisabled = false;
                    this.errormsg = data[0].FlagValue;
                    this.ChangepasswordForm.reset();
                    
                }
                else {
                  this.btnSubmitDisabled = false;
                  this.message="Password updated successfully!!";
                  this.btnSubmitDisabled = false;
                  alert(this.message);
                  //console.log(item.UserId);
                  this.router.navigate(['/Login']);
                }
            });
          
          
    }
    else {
        this.validateAllFormFields(this.ChangepasswordForm);
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

