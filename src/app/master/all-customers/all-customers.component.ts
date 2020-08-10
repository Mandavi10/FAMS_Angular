import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { AllCustomersService } from '../../Services/AllCustomers/all-customers.service';
import { AllCustomers} from '../../../Models/AllCustomers/all-customers';
import { SaveAllFields} from '../../../Models/AllCustomers/save-all-fields';
import { Router, ActivatedRoute } from '@angular/router';
import { PmsCustomerListService } from 'src/app/Services/PMSCustomerList/pms-customer-list.service';
import {Custodian,PortFolio,LinkedPMSEmployee,PMSCustomerListDetails,PMSCustomerListCodeDetails,PMSCustomerList  } from '../../../Models/PMSCustomerList/pmsCustomerList';

import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Allcustomerresponse } from 'src/Models/AllCustomers/allcustomerresponse';




@Component({
  selector: 'app-all-customers',
  templateUrl: './all-customers.component.html',
  styleUrls: ['./all-customers.component.css']
})
export class AllCustomersComponent implements OnInit {
  AllCustomersList:AllCustomers;
  AllCustomersList_Copy:AllCustomers;
  
  AllCustomersForm: FormGroup; SaveallfieldsList : SaveAllFields;CustomerResponse:Allcustomerresponse;
  showModalupdatepopup:boolean;
  selectedRowId:number;
  CustomerId:number;
  Temp: number = 1; 
  linkedPMSEmployee:LinkedPMSEmployee;

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

  constructor(private router: Router,private formBuilder: FormBuilder,private AllCustomerService : AllCustomersService,private _pmsCustomerListService: PmsCustomerListService) { }
  isShowGrid:boolean=true;
  isShowForm:boolean=false;

  ngOnInit(): void {
    this.AllCustomersForm = this.formBuilder.group({  
      CustomerAccount : [''], CustomerUsername :[''], 
      CustomerEmailID : [''],
      EmployeeCode: ['',Validators.required]
  });
 this.BindGrid();
 this.BindLinkedPMSEmployee();
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


  BindLinkedPMSEmployee() {
    
    // this.loading = true;
    var currentContext = this;
    this._pmsCustomerListService.BindLinkedPMSEmployee().
        subscribe((data) => {
            currentContext.linkedPMSEmployee = data.Table;
        });
    // console.log(sessionStorage.getItem('ID'));
    // this.loading = false;
  }

  AllCustomerSearch(evt: any) {
    debugger;
    let searchText = evt.target.value.toLocaleLowerCase();    
    if(searchText ===  '' || searchText === undefined || searchText === null)
    {
      this.AllCustomersList  = JSON.parse(JSON.stringify(this.AllCustomersList_Copy));
     
    }
    else{


      let gridArr = JSON.parse(JSON.stringify(this.AllCustomersList_Copy));
      let finalArr = [];
      gridArr.forEach(row => {

  
        var AccountNo = row.AccountNo.toLocaleLowerCase();
        var UserName = row.UserName.toLocaleLowerCase();
        var EmailId = row.EmailId.toLocaleLowerCase();

       
        var isAccountNo= AccountNo.includes(searchText) ;
        var isUserName = UserName.includes(searchText);
        var isEmailId = EmailId.includes(searchText);

       

       if( isAccountNo || isUserName || isEmailId )
        {
          finalArr.push(row);
        }
        
      });
      this.AllCustomersList  = JSON.parse(JSON.stringify(finalArr));
    }
  }

BindGrid(){
  this.AllCustomerService.BindGrid().subscribe(
    (data) => {
      this.AllCustomersList = data.Table;
      this.AllCustomersList_Copy=data.Table;
        
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

            this.isShowLoader=false;

        }
    // } else {
    //     this.validateAllFormFields(this.AllCustomersForm);
    //     this.isShowLoader=false;

    // }
  }

SaveData(){
  debugger;

  this.isShowLoader=true;

  let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
  //let SaveallfieldsList = new Saveallfields();
  //this.SaveallfieldsList.UserId = "3";

  this.SaveallfieldsList = this.AllCustomersForm.value;
  console.log('savedata')
  console.log(this.AllCustomersForm.value)
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
    this.isShowLoader=false;
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

    this.isShowLoader=false;

        }
    //     else
    //     {
    // this.isShowLoader=false;
    //       alert("Customer Username already exist. !!")

    //       //this.BindGrid();
    //     }
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
private gridApi;
private gridColumnApi;
getValue(inputSelector) {
  // var text = document.querySelector(inputSelector).value;
  var text = 'array';
   switch (text) {
     
     case 'array':
       return [
         // [],
         
         [
           {
             data: {
               value: 'this cell:',
               type: 'String',
             },
             mergeAcross: 1,
           },
           // {
           //   data: {
           //     value: 'is empty because the first cell has mergeAcross=1',
           //     type: 'String',
           //   },
           // },
         ],
         [],
       ];
     case 'none':
       return;
     case 'tab':
       return '\t';
     case 'true':
       return true;
     case 'none':
       return;
     default:
       return text;
   }
 }
 getParams() {
   return {
     // suppressQuotes: this.getValue('#suppressQuotes'),
     // columnSeparator: this.getValue('#columnSeparator'),
     // customHeader: this.getValue('#customHeader'),
     // customFooter: this.getValue('#customFooter'),
   };
 }
onGridReady(params) {
  debugger;
  this.gridApi = params.api;
  this.gridColumnApi = params.columnApi;
}
downloadCSVFile() {
  debugger;
var params = this.getParams();
    // if (params.suppressQuotes || params.columnSeparator) {
    //   alert(
    //     'NOTE: you are downloading a file with non-standard quotes or separators - it may not render correctly in Excel.'
    //   );
    // }
    this.gridApi.exportDataAsCsv(params);
  }

}