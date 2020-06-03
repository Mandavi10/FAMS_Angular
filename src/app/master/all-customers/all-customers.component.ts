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
SaveData(){
  debugger;
  if (this.AllCustomersForm.valid) {
  let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));

  //let SaveallfieldsList = new Saveallfields();

  //this.SaveallfieldsList.UserId = "3";

  this.SaveallfieldsList = this.AllCustomersForm.value;
  this.AllCustomerService.SaveData(JSON.stringify(this.SaveallfieldsList)).subscribe(

    (data) => {
      this.CustomerResponse = data;
      if (data[0].value == "1") {
        alert("Customer create successfully.!!")
        this.BindGrid();
        this.isShowForm=false;
this.isShowGrid=true;
      }
      else
      {
        alert("Customer Username already exist. !!")
        //this.BindGrid();
      }
  //     this.CommonfieldsList = data.Table; 
        
       });
  //     this.showModalPMSEmploye = false;
     }
     else {
       this.validateAllFormFields(this.AllCustomersForm);
    }
   //
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