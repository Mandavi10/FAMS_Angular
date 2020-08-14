import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import{DbsecurityService}from '../../Services/dbsecurity.service';
import { Commonfields } from '../../../Models/commonfields';
import{CapitalSatementService} from '../../Services/CapitalStatement/capital-satement.service';
import{CapitalStatementModel,BindEmployees,BindCustomer} from '../../../Models/CapitalStatement/capitalStatement';
import {Bindcustomerallfields} from '../../../Models/SummaryReport/Bindcustomerallfields';
import {BindViewGrid} from '../../../Models/StatementDividend/StatementDividend';

@Component({
  selector: 'app-capital-statement-view',
  templateUrl: './capital-statement-view.component.html',
  styleUrls: ['./capital-statement-view.component.css']
})
export class CapitalStatementViewComponent implements OnInit {
  StatementCapitalViewForm:FormGroup;divEmployee:boolean=false;CustNameDive:boolean=false;
  userType:any;UserId:any;CustomerAccount:any;Formdate:any;Todate:any;isShowLoader:boolean=false;
  BindemployeesList:BindEmployees;BindcustomerallfieldsList:Bindcustomerallfields;BindViewGridList:BindViewGrid;
  columnDefs = [
    {headerName: 'Sr. No.', field: 'SrNo', width:'80'},
    {headerName: 'From Date', field: 'FromDate', width:'150'},
    {headerName: 'To Date', field: 'ToDate', width:'150'},
    {headerName: 'Customer Account', field: 'CustomerAccount', width:'150'},
    {headerName: 'Scheme', field: 'Scheme', width:'150'},
    // {headerName: 'Download', field: '', width:'100',cellClass:'text-center', cellRenderer: function clickNextRendererFunc(){
    //   return '      <i class="fa fa-file-pdf-o" aria-hidden="true" title="Download"></i>';
    // }},
    // {headerName: 'Data View Mode', field: 'viewmode', width:'150', cellClass:'text-center',cellRenderer: function clickNextRendererFunc(){
    //   return '<button type="button" class="btn btn-success">View</button>';
    // }},
    // {headerName: 'Download', field: '', width:'100',cellClass:'text-center', cellRenderer: function clickNextRendererFunc(){
    //   return ' <a target="_blank"  href="../../../assets/Files/Portfolio_Report.pdf"> Download</a> ';
    // }},
    {headerName: 'Download', field: '', width:'100',cellClass:'text-center',cellRenderer: (params) => {
      return ' <a target="_blank"  href="'  + params.data.DownloadLink + '"> Download</a> ';
    }},
     {headerName: 'Data View Mode', field: 'viewmode', width:'150', cellClass:'text-center',cellRenderer: (params) => {
      return '<a href="/CapitalStatement?CustomerAccount='  + params.data.CustomerAccount + '&FromDate='+ params.data.FromDate  + '&ToDate='+ params.data.ToDate  + '">View</a>';
    }
    },
  
    
];

// rowData = [
//     {  SrNo: '1', fromdate:'14/07/2020', todate:'20/07/2020',  customeraccount: '47481000024748', scheme: '', download:'',  viewmode: ''},
//     {  SrNo: '2', fromdate:'14/07/2020', todate:'20/07/2020',  customeraccount: '47481000024748', scheme: '', download:'',  viewmode: ''},
//     {  SrNo: '3', fromdate:'14/07/2020', todate:'20/07/2020',  customeraccount: '47481000024748', scheme: '', download:'',  viewmode: ''},  
// ];
  constructor(private formBuilder: FormBuilder,private Dbsecurity: DbsecurityService,
    private _CapitalSatementService:CapitalSatementService) { }

  ngOnInit(): void {
    this.StatementCapitalViewForm = this.formBuilder.group({  
      Formdate:['',Validators.required],
      Todate:['',Validators.required],
      CustomerAccount:[''] ,
      EmployeeId:['']
   });
   let item = JSON.parse(sessionStorage.getItem('User'));
    this.userType=this.Dbsecurity.Decrypt(item.UserType);
    if(this.userType == 3 || this.userType == 4){
      this.CustNameDive=true;this.divEmployee=true;
       this.UserId = this.Dbsecurity.Decrypt(item.UserId);
       this.CustomerAccount = item.AccountNo;
       this.BindEmployee();
     }
     else if(this.userType == 2){
      this.CustNameDive=true;this.divEmployee=false;
      this.UserId = this.Dbsecurity.Decrypt(item.UserId);
      this.CustomerAccount = item.AccountNo;
      this.BindCustomers();
     }
     else{
      this.CustNameDive=false;this.divEmployee=false;
      this.UserId = this.Dbsecurity.Decrypt(item.UserId);
      this.CustomerAccount = item.AccountNo;
     }
     this.BindViewGrid();
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
  get AllFields() { return this.StatementCapitalViewForm.controls; }
  displayFieldCss(field: string) {
    return {
        'validate': this.isFieldValid(field),
    };
}
isFieldValid(field: string) {
    return !this.StatementCapitalViewForm.get(field).valid && this.StatementCapitalViewForm.get(field).touched;
}

  BindEmployee(){
    this.isShowLoader=true;
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    let  Data = new Commonfields();
    Data.UserId = Sessionvalue.UserId;
    this._CapitalSatementService.BindEmployee(JSON.stringify(Data)).subscribe(
      (data) => {
           this.BindemployeesList = data.Table;
           this.isShowLoader=false;
      });
  }

  BindCustomers(){
    this.isShowLoader=true;
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    let  Data = new Commonfields();
    Data.UserId = this.Dbsecurity.Decrypt(Sessionvalue.UserId);
    this._CapitalSatementService.BindCustomer(JSON.stringify(Data)).subscribe(
      (data) => {
        this.BindcustomerallfieldsList = data.Table;
        this.isShowLoader=false;
      });
  }

  BindCustomersOnChange(EmployeeId){
    debugger;
    this.isShowLoader=true;
    let  Data = new Commonfields();
    Data.UserId = EmployeeId ;
    this._CapitalSatementService.BindCustomer(JSON.stringify(Data)).subscribe(
      (data) => {
           this.BindcustomerallfieldsList = data.Table;
           this.isShowLoader=false;
      });
  }

  BindViewGrid(){
    this.isShowLoader=true;
   // if (this.StatementCapitalViewForm.valid) {
    var JsonData ={
      "UserId" : this.UserId,
      "CustomerAccountNo" : this.CustomerAccount.trim(),
       "PageType" : "6"
    }  
    this._CapitalSatementService.BindViewGrid(JsonData).subscribe(
      (data) => {
           this.BindViewGridList = data.Table;
           this.isShowLoader=false;
      }); 
   // }
    // else{
    //   this.validateAllFormFields(this.StatementCapitalViewForm);      
    // }
  }

  SearchData(){
    debugger;
    if(this.StatementCapitalViewForm.valid){
    this.isShowLoader=true;
    this.Formdate = this.StatementCapitalViewForm.controls["Formdate"].value;
    this.Todate = this.StatementCapitalViewForm.controls["Todate"].value;
    if(this.userType==1){
      let item = JSON.parse(sessionStorage.getItem('User'));
      this.CustomerAccount = item.AccountNo;
    }
    else{
      this.CustomerAccount = this.StatementCapitalViewForm.controls["CustomerAccount"].value;
    }
    var JsonData ={
      "UserId" : this.UserId,
      "CustomerAccountNo" : this.CustomerAccount.trim(),
      "fromdate" : this.Formdate,
      "todate" : this.Todate,
      "PageType" : "6"
    }  
    this._CapitalSatementService.BindViewGrid(JsonData).subscribe(
      (data) => {
           this.BindViewGridList = data.Table;
           this.isShowLoader=false;
      });
    }
    else{
      this.validateAllFormFields(this.StatementCapitalViewForm); 
    } 
  }

  FetchLatestReport() {
     this.CustomerAccount=this.StatementCapitalViewForm.controls['CustomerAccount'].value;
     var JsonData ={
      "CustomerAccountNo" : this.CustomerAccount.trim(),
      "PageType" : "6"
     }   
     this._CapitalSatementService.GetFetchLatestReport(JsonData).
         subscribe((data) => {
           
         });
   }


}
