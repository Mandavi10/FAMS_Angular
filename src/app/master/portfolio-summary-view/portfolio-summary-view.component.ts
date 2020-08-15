import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { timer } from 'rxjs';

import{DbsecurityService}from '../../Services/dbsecurity.service';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { Router, ActivatedRoute } from '@angular/router';
import {AppSettings} from 'src/app/app-settings';
import { Bindemployee,Customer,PrimaryDetails,BindMainGriddata} from '../../../Models/PortfolioSummaryView/PortfolioSummaryViewGrid';
import { PortfolioSummaryViewServiceService } from '../../Services/PortfolioSummaryView/portfolio-summary-view-service.service';
@Component({
  selector: 'app-portfolio-summary-view',
  templateUrl: './portfolio-summary-view.component.html',
  styleUrls: ['./portfolio-summary-view.component.css']
})
export class PortfolioSummaryViewComponent implements OnInit {

  btnPrev:boolean=true;userType:number;accountNumber:string;
  GAccountNumber:any;GUserId:number;
  btnNext:boolean=true;isShowCustomer:boolean=false;  CustomerAccount:string;

  IsShowRecord:boolean;  isShowsEmployee:boolean=false;
  IsShowNoRecord:boolean; BindemployeesList:Bindemployee;customer:Customer ;
  isShowLoader:boolean=false;bindmaingrid:BindMainGriddata;


  submitted = false;
  RunningNoOfPage:number;
  NoOfPage:number;SeqNo:number=1;
  Default_NoOfPage:number=1;
  CustomerAccountNo :any;
  PortfolioSummaryFormView : FormGroup;


  columnDefs = [
    {headerName: 'Sr. No.', field: 'SrNo', width:'80'},
    {headerName: 'From Date', field: 'FromDate', width:'150'},
    {headerName: 'To Date', field: 'ToDate', width:'150'},
    {headerName: 'Customer Account', field: 'CustomerAccount', width:'150'},
    {headerName: 'Scheme', field: 'Scheme', width:'150'},
    {headerName: 'Download', field: '', width:'100',cellClass:'text-center',cellRenderer: (params) => {
      return ' <a target="_blank"  href="http://localhost:55073/'  + params.data.DownloadLink + '"> Download</a> ';
    }},
    {headerName: 'Data View Mode', field: 'viewmode', width:'150', cellClass:'text-center',cellRenderer: (params) => {
      return '<a href="/PortfolioSummary?CustomerAccount='  + params.data.CustomerAccount + '&FromDate='+ params.data.FromDate  + '&ToDate='+ params.data.ToDate  + '">View</a>';
    }
    },
  
    
];

rowData = [
    {  SrNo: '1', fromdate:'14/07/2020', todate:'20/07/2020',  customeraccount: '47481000024748', scheme: '', download:'',  viewmode: ''},
    {  SrNo: '2', fromdate:'14/07/2020', todate:'20/07/2020',  customeraccount: '47481000024748', scheme: '', download:'',  viewmode: ''},
    {  SrNo: '3', fromdate:'14/07/2020', todate:'20/07/2020',  customeraccount: '47481000024748', scheme: '', download:'',  viewmode: ''},

   
];
  constructor(private formBuilder: FormBuilder, private Dbsecurity: DbsecurityService,private TSService : PortfolioSummaryViewServiceService) { }

  ngOnInit(): void {
    this.PortfolioSummaryFormView = this.formBuilder.group({  
      EmployeeId: [0],
      UserId: [0 ],
      AsOnDate :[''], 
     
      CustomerAccount:['']
    });
   this.isShowLoader=true;
let item = JSON.parse(sessionStorage.getItem('User'));


this.userType=this.Dbsecurity.Decrypt(item.UserType);
this.accountNumber="0";

if(this.userType ==1)
{
  this.GUserId=item.UserId.replace('+',' ');
  this.GAccountNumber=item.AccountNo;   
}
else if(this.userType ==2)
{
  this.isShowCustomer=true;    
  this.GUserId=item.UserId.replace('+',' ');
  this.GAccountNumber="1";
  this.BindCustomers();
}

else if(this.userType ==3)
{
  this.GUserId=item.UserId.replace('+',' ');
  this.GAccountNumber="0";
  this.PortfolioSummaryFormView.controls["UserId"].setValue(0);
  this.isShowCustomer=true;
  this.BindEmployee();
  
}

else{
  this.GUserId=item.UserId.replace('+',' ');
  this.GAccountNumber="0";
  this.isShowCustomer=false;
  this.isShowsEmployee=false;
}
const datat = this.PortfolioSummaryFormView.value;
var AsOnDate=datat.AsOnDate;
var ToDate=datat.ToDate;
this.BindMainGrid(this.accountNumber,AsOnDate,ToDate);
  }

  
  isFieldValid(field: string) {
    return !this.PortfolioSummaryFormView.get(field).valid && this.PortfolioSummaryFormView.get(field).touched;
}
displayFieldCss(field: string) {
    return {
        'validate': this.isFieldValid(field),
    };
}
  BindMainGrid(accountNumber123,AsOnDate,ToDate){
    let item = JSON.parse(sessionStorage.getItem('User'));   
    let _apipostdata = new PrimaryDetails();
    _apipostdata.userType=item.UserType;
    _apipostdata.ReportName="3";
    _apipostdata.UserId=item.UserId.replace('+',' ');
    _apipostdata.accountNumber=accountNumber123;
    _apipostdata.Fromdate=AsOnDate;
    _apipostdata.Todate=ToDate;
    this.TSService.BindMainGrid(JSON.stringify(_apipostdata)).subscribe(
      (data) => {
        this.isShowLoader=false;
           this.bindmaingrid = data.Table;
          
          
      });
  }

  BindEmployee(){
    
     let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
  
     this.TSService.BindEmployee(Sessionvalue.UserId.replace('+',' ')).subscribe(
       (data) => {
         debugger;
            this.BindemployeesList = data.Table;
            this.isShowsEmployee=true;
           
       });
   }

   BindCustomers() {
    
     var currentContext = this;
     let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
     this.TSService.BindCustomer(this.Dbsecurity.Decrypt(Sessionvalue.UserId.replace('+',' '))).
         subscribe((data) => {
             currentContext.customer = data.Table;
             this.isShowCustomer=true;
         });
   }
   BindCustomerOnChange(EmployeeId) {
    
   this.SeqNo=1;
    var currentContext = this;
    this.TSService.BindCustomer(EmployeeId).
        subscribe((data) => {
            currentContext.customer = data.Table;
            this.isShowCustomer=true;
        });
    
  }

  


  onSubmit() {

    this.SeqNo=1;
    this.submitted = true;
    if (this.validation()) {
      
      const datat = this.PortfolioSummaryFormView.value;
      if(datat.UserId=="0")
      {
      
        this.CustomerAccount=datat.UserId; 
      }
      else{
       this.CustomerAccount=datat.UserId;
      }
      var AsOnDate=datat.AsOnDate;
      var ToDate=datat.ToDate;
      this.BindMainGrid(this.CustomerAccount,AsOnDate,ToDate)

    } 
}

  CustomerOn_Change(){
    let acno=((document.getElementById("ddlcustomerdropdown") as HTMLInputElement).value);
   
   if(acno =="0")
   {
    document.getElementById("ddlcustomerdropdown").classList.add('validate');
   }
   else{
    document.getElementById("ddlcustomerdropdown").classList.remove('validate');
   }
  }
  FetchLatestReport() {
    let acno=((document.getElementById("ddlcustomerdropdown") as HTMLInputElement).value);
   
   if(acno =="0")
   {
    document.getElementById("ddlcustomerdropdown").classList.add('validate');
   }
   else{
    document.getElementById("ddlcustomerdropdown").classList.remove('validate');

    this.isShowLoader=true;
    var currentContext = this;
    // let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    var ReportName="3";
    const datat = this.PortfolioSummaryFormView.value;
    var CustomerAccount=datat.UserId;
    var JsonData ={
    //this.TransactionStatementForm.controls['ToDate']
    "CustomerAccount" : CustomerAccount,
    "ReportName":ReportName
    }
    
    
    this.TSService.GetFetchLatestReport(JsonData).
    subscribe((data) => {
    // currentContext.transactionStatementView = data.Table;
    // this.transactionStatementView_Copy=data.Table;
    // this.isShowCustomer=true;
    const datat = this.PortfolioSummaryFormView.value;
var AsOnDate=datat.AsOnDate;
var ToDate=datat.ToDate;
    this.BindMainGrid(this.accountNumber,AsOnDate,ToDate)
    
    });
    // console.log(sessionStorage.getItem('ID'));
    //this.loading = false;
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
  validation():boolean{

    var flag=true;
    let item = JSON.parse(sessionStorage.getItem('User'));
    if(this.Dbsecurity.Decrypt(item.UserType)==3){
      let emp=((document.getElementById("ddlemployeedropdown") as HTMLInputElement).value);
      if(emp =="0")
      {
       document.getElementById("ddlemployeedropdown").classList.add('validate');
       flag=false;
      }
    }
    if(this.Dbsecurity.Decrypt(item.UserType)==3 ||this.Dbsecurity.Decrypt(item.UserType)==2){
    let acno=((document.getElementById("ddlcustomerdropdown") as HTMLInputElement).value);
    if(acno =="0")
    {
     document.getElementById("ddlcustomerdropdown").classList.add('validate');
     flag=false;
    }
  }
    let date=((document.getElementById("date") as HTMLInputElement).value);
    if(date =="")
    {
     document.getElementById("date").classList.add('validate');
     flag=false;
    }
    
    return flag;
  }
  RemoveClass(){
    let item = JSON.parse(sessionStorage.getItem('User'));
    if(this.Dbsecurity.Decrypt(item.UserType)==3){
    let emp=((document.getElementById("ddlemployeedropdown") as HTMLInputElement).value);
    if(emp !="0")
    {
     document.getElementById("ddlemployeedropdown").classList.remove('validate');
    }
  }
  if(this.Dbsecurity.Decrypt(item.UserType)==3 ||this.Dbsecurity.Decrypt(item.UserType)==2){
    let acno=((document.getElementById("ddlcustomerdropdown") as HTMLInputElement).value);
    if(acno !="0")
    {
     document.getElementById("ddlcustomerdropdown").classList.remove('validate');
    }
  }
    let date=((document.getElementById("date") as HTMLInputElement).value);
    if(date !="")
    {
     document.getElementById("date").classList.remove('validate');
    }

  }

}
