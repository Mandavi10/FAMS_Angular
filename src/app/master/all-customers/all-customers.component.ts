import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { AllCustomersService } from '../../Services/AllCustomers/all-customers.service';
import { AllCustomers} from '../../../Models/AllCustomers/all-customers';
import { SaveAllFields} from '../../../Models/AllCustomers/save-all-fields';

import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Allcustomerresponse } from 'src/Models/AllCustomers/allcustomerresponse';




@Component({
  selector: 'app-all-customers',
  templateUrl: './all-customers.component.html',
  styleUrls: ['./all-customers.component.css']
})
export class AllCustomersComponent implements OnInit {
  AllCustomersList:AllCustomers;AllCustomersForm: FormGroup; SaveallfieldsList : SaveAllFields;CustomerResponse:Allcustomerresponse;
  showModalupdatepopup:boolean;
  selectedRowId:number;
  CustomerId:number;
  Temp: number = 1; 
  isShowLoader:boolean=false;
  columnDefs = [
    {headerName: 'Sr. No.', field: 'Sno', width:'80'},
    {headerName: 'Customer Account', field: 'AccountNo', width:'150'},
    {headerName: 'User Name', field: 'UserName', width:'150'},
    {headerName: 'User Email', field: 'EmailId', width:'150'},
    {headerName: 'Active', field: 'Active', width:'150'},
   
    
];

rowData = [
    {  srNo: '1', CustomerAccount:'Demo demo demo', UserName:'Demo',  UserEmail: 'Demo', Active: 'Demo'},
    {  srNo: '2', CustomerAccount:'Demo', UserName:'Demo',  UserEmail: 'Demo', Active: 'Demo'},
    {  srNo: '3', CustomerAccount:'Demo', UserName:'Demo',  UserEmail: 'Demo', Active: 'Demo'}
   
   
];

showModalsavepopup: boolean;
onClicksavepopup() {
  this.AllCustomersForm.reset();
  this.AllCustomersForm.controls['CustomerAccount'].setValue('');
  this.AllCustomersForm.controls['CustomerUsername'].setValue('');
  this.AllCustomersForm.controls['CustomerEmailID'].setValue('');

  this.showModalsavepopup = true;
}
  
hidesavepopup() {
  this.showModalsavepopup = false;
}

onClickupdatepopup() {
  this.showModalupdatepopup = true;
}
hideupdatepopup() {
  debugger;
 this.showModalupdatepopup = false;
}

  constructor(private formBuilder: FormBuilder,private AllCustomerService : AllCustomersService) { }
  isShowGrid:boolean=true;
  isShowForm:boolean=false;

  ngOnInit(): void {
    this.AllCustomersForm = this.formBuilder.group({  
      CustomerAccount : [''], CustomerUsername :[''], CustomerEmailID : ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
  });
 this.BindGrid();
 this.isShowForm=false;
this.isShowGrid=true;
  }
  Cancel()
  {
    this.isShowForm=false;
    this.isShowGrid=true;
  }
  ShowGridOrForm()
  {
this.isShowForm=true;
this.isShowGrid=false;
  }

BindGrid(){
  this.AllCustomerService.BindGrid().subscribe(
    (data) => {
      this.AllCustomersList = data.Table;
        
      });
}
onRowSelected(event){
  debugger;
    if (event.column.colId != "all" ) // only first column clicked
    {
      this.Temp=2;
      //this.showModalsavepopup = true;    
      this.ShowGridOrForm();
      this.AllCustomersForm.controls['CustomerAccount'].setValue(event.data.AccountNo);
      this.AllCustomersForm.controls['CustomerUsername'].setValue(event.data.UserName);
      this.AllCustomersForm.controls['CustomerEmailID'].setValue(event.data.EmailId);
     
      this.CustomerId=event.data.UserId;
      // event.preventDefault();
      // event.preventDefault();
      // execute the action as you want here in on click of hyperlink
    }
    else if ((event.column.colId == "all" ) && (event.node.selected) ){
      this.Temp=2;
      // this.showModalsavepopup = true;    
      this.ShowGridOrForm();
      this.AllCustomersForm.controls['CustomerAccount'].setValue(event.data.AccountNo);
      this.AllCustomersForm.controls['CustomerUsername'].setValue(event.data.UserName);
      this.AllCustomersForm.controls['CustomerEmailID'].setValue(event.data.EmailId);
      this.CustomerId=event.data.UserId;
    }
  }
  onSubmit() {
    debugger;
    //alert('OnSubmi Clicked');
    //this.submitted = true;
    if (this.AllCustomersForm.valid) {
        //this.sucess=true;
        const datat = this.AllCustomersForm.value;
        
        if (this.Temp == 1) {
            this.SaveData();
        }
        else {
            this.UpdateData();
        }
    } else {
        this.validateAllFormFields(this.AllCustomersForm);
    }
  }

SaveData(){
  debugger;
  this.isShowLoader=true;
  let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
  //let SaveallfieldsList = new Saveallfields();
  //this.SaveallfieldsList.UserId = "3";

  this.SaveallfieldsList = this.AllCustomersForm.value;
  this.AllCustomerService.SaveData(JSON.stringify(this.SaveallfieldsList)).subscribe(

    (data) => {
      this.CustomerResponse = data;
      if (data[0].value == "1") {
        this.onClicksavepopup();
        //alert("Customer create successfully.!!")
        this.BindGrid();
        this.isShowForm=false;
        this.isShowGrid=true;
        this.isShowLoader=false;
      }
      else
      {
        alert("Customer Username already exist. !!")
        this.isShowLoader=false;
        //this.BindGrid();
      }
  //     this.CommonfieldsList = data.Table; 
        
       });
  //     this.showModalPMSEmploye = false;
     
   //
  }

 
  UpdateData(){
    debugger;
    this.isShowLoader=true;
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    //let SaveallfieldsList = new Saveallfields();
    //this.SaveallfieldsList.UserId = "3";
  
    this.SaveallfieldsList = this.AllCustomersForm.value;
    this.AllCustomerService.UpdateData(JSON.stringify(this.SaveallfieldsList),this.CustomerId).subscribe(
  
      (data) => {
        this.CustomerResponse = data;
        if (data[0].value == "1") {
          this.onClickupdatepopup();
          //alert("Customer create successfully.!!")
          this.BindGrid();
          this.isShowForm=false;
          this.isShowGrid=true;
          this.isShowLoader=false;
        }
        else
        {
          alert("Customer Username already exist. !!")
          this.isShowLoader=false;
          //this.BindGrid();
        }
    //     this.CommonfieldsList = data.Table; 
          
         });
    //     this.showModalPMSEmploye = false;
      
     //
    }
 
    isFieldValid(field: string) {
      return !this.AllCustomersForm.get(field).valid && this.AllCustomersForm.get(field).touched;
    }
    displayFieldCss(field: string) {
      return {
          'validate': this.isFieldValid(field),
      };
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