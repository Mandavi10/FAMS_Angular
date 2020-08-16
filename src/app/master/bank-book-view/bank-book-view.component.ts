import { Component, OnInit } from '@angular/core';
import{DbsecurityService}from 'src/app/Services/dbsecurity.service';
import { AgGridAngular } from 'ag-grid-angular';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
 import { Customer} from '../../../Models/HoldingReport/holdingReport';
 import { BankbookService } from '../../Services/BankBook/bankbook.service';
 import { Bindgrid } from '../../../Models/BankBook/bindgrid';
 import { Bindgridview } from '../../../Models/BankBook/bindgridview';
 import { Totalsumgrid } from '../../../Models/BankBook/totalsumgrid';
 import { Header } from '../../../Models/BankBook/header';
 import { Bindemployee } from '../../../Models/BankBook/bindemployee'
 import { Allcustomers } from '../../../Models/BankBook/Allcustomers';
 import { Commonfields } from '../../../Models/commonfields';
 import {AppSettings} from 'src/app/app-settings';
 import { Injectable , Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-bank-book-view',
  templateUrl: './bank-book-view.component.html',
  styleUrls: ['./bank-book-view.component.css']
})
export class BankBookViewComponent implements OnInit {
  columnDefs = [
    {headerName: 'Sr. No.', field: 'Srno', width:'80'},
    {headerName: 'From Date', field: 'ReportDate', width:'150'},
    {headerName: 'To Date', field: 'ToDate', width:'150'},
    {headerName: 'Customer Account', field: 'CustomerAccountNo', width:'150'},
    {headerName: 'Scheme', field: 'Scheme', width:'150'},

    {headerName: 'Download', field: '', width:'100',cellClass:'text-center',cellRenderer: (params) => {
      return ' <a target="_blank"  href="'+ this.baseUrl +''  + params.data.DownloadLink + '"> Download</a> ';
    }},
    {headerName: 'Data View Mode', field: 'viewmode', width:'150', cellClass:'text-center',cellRenderer: (params) => {
      return '<a href="/BankBook?CustomerAccount='  + params.data.CustomerAccountNo + '&FromDate='+ params.data.ReportDate  + '&ToDate='+ params.data.ToDate  + '">View</a>';
    }
    },
  
    
];

// rowData = [
//     {  SrNo: '1', fromdate:'14/07/2020', todate:'20/07/2020',  customeraccount: '47481000024748', scheme: '', download:'',  viewmode: ''},
//     {  SrNo: '2', fromdate:'14/07/2020', todate:'20/07/2020',  customeraccount: '47481000024748', scheme: '', download:'',  viewmode: ''},
//     {  SrNo: '3', fromdate:'14/07/2020', todate:'20/07/2020',  customeraccount: '47481000024748', scheme: '', download:'',  viewmode: ''},

   
// ];

BindgridList:Bindgrid;BankBookViewForm:FormGroup;TotalsumgridData:Totalsumgrid;Buy_SellAmount:any;Income:any;
  Expenses:any;Dep_with:any;Balance:any;griddiv:boolean=false;HeaderArray:any=[];StaticArray:any=[];
  FromDate:any;ToDate:any;Head=[];StaticArray1:any=[];StaticArray2:any=[];BindCustomersList:Allcustomers;
  loader1:boolean=false;loader2:boolean=false; isShowLoader:boolean=false;divCustomer:boolean=false;userType:number;HeaderList:Header;
  divEmployee:boolean=false;BindemployeesList:Bindemployee;CustomerAccount:any;PageCount:any;UserId:any;
  TotalRecord:any;PaginationCount:any;divTotal:boolean=true;Code:any="";NoOfPage:any="";Flag:any;
  NoRecord:boolean=true;btnNext:boolean=true;btnPrev:boolean=true;liExport:boolean=false;baseUrl: string = "";
  IsShowRecord:boolean;  IsShowNoRecord:boolean;
 
 BindGridview1:Array<Bindgridview>;

  constructor(private BSService : BankbookService, private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string,private Dbsecurity: DbsecurityService,private formbulider: FormBuilder) { }

  ngOnInit(): void {
    this.baseUrl = AppSettings.Login_URL;
    this.BankBookViewForm = this.formbulider.group({
      EmployeeId: [0, ],
      UserId: [0, ],
      FromDate: ['', ],
      ToDate: ['',],
  });
  
  // this.BindEmployee();
  // this.BindCustomers();
  this.BankBookViewForm.controls["EmployeeId"].setValue('');
  this.BankBookViewForm.controls["UserId"].setValue('0');
  
  let item = JSON.parse(sessionStorage.getItem('User'));  
  this.userType=this.Dbsecurity.Decrypt( item.UserType); 
  
if(this.userType == 3){
  this.UserId = this.Dbsecurity.Decrypt(item.UserId);
  this.CustomerAccount = ""; 
  this.divCustomer=true;
  this.divEmployee=true;
  this.BindEmployee();
   // this.BindGridView('','','');
}

  else if(this.userType == 2){
    this.UserId = this.Dbsecurity.Decrypt(item.UserId);
    this.CustomerAccount = "";
    this.divCustomer=true;
    this.divEmployee=false;
    this.BindCustomers();
    // this.BindGridView('','','');
  }

  else{
    this.UserId = this.Dbsecurity.Decrypt(item.UserId);
    // this.CustomerAccount = this.Dbsecurity.Decrypt(item.AccountNo);
    this.CustomerAccount = item.AccountNo;
    this.BindDefaultData();
  }
  this.PageCount = 1;
  
  this.loader1 = false; this.loader2 = false;
 // }
 if(this.userType==3||this.userType==4){
  this.BindGridview1=[];
 }
 else{
 //this.BindGridView('','','');
 this.BindDefaultData();
 }  

  }

  BindDefaultData(){
    
    this.loader1=true;this.loader2=true;
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    var JsonData ={
      "UserId" : this.UserId,
      "CustomerAccount" : this.CustomerAccount ,
      "PageCount" : this.PageCount
    } 
    let fromdate,todate;
    this.BSService.BindDefaultData(JsonData).subscribe(
      (data) => {
        this.FromDate = data.Table[0]["FromDate"];
        this.ToDate = data.Table[0]["ToDate"];
        fromdate=data.Table[0].FromDate;
        todate=data.Table[0].ToDate;
        
        this.BankBookViewForm.controls["FromDate"].setValue(data.Table[0].FromDate);
        this.BankBookViewForm.controls["ToDate"].setValue(data.Table[0].ToDate);
        //this.BankBookViewForm.controls["CustomerAccount"].setValue(data.Table[0].CustomerAccount);
        if(this.userType != 1 ){
        this.CustomerAccount = data.Table[0].CustomerAccount;
        }
        if(this.userType != 3 ){
          this.CustomerAccount = data.Table[0].CustomerAccount;
          }
          this.BindGridView(fromdate,todate,this.CustomerAccount);
        this.PageCount = 1;
        this.griddiv=true;  
       
       
      });
  
      // this.BindGridView(fromdate,todate,this.CustomerAccount);
      //this.BindDefaultGrid();   
      this.loader1=false;this.loader2=false;
      
  }

  validation():boolean{

    var flag=true;
    let item = JSON.parse(sessionStorage.getItem('User'));
    if(this.Dbsecurity.Decrypt(item.UserType)==3){
      let emp=((document.getElementById("ddlemployeedropdown") as HTMLInputElement).value);
      if(emp =="")
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
  if(this.Dbsecurity.Decrypt(item.UserType)==1){
    let date=((document.getElementById("date") as HTMLInputElement).value);
    if(date =="")
    {
     document.getElementById("date").classList.add('validate');
     flag=false;
    }
    
    let date1=((document.getElementById("date1") as HTMLInputElement).value);
    if(date1 =="")
    {
     document.getElementById("date1").classList.add('validate');
     flag=false;
    }
  }
  else{
    let emp=((document.getElementById("ddlemployeedropdown") as HTMLInputElement).value);
    if(emp =="")
    {
     document.getElementById("ddlemployeedropdown").classList.add('validate');
     flag=false;
    }
    let acno=((document.getElementById("ddlcustomerdropdown") as HTMLInputElement).value);
    if(acno =="0")
    {
     document.getElementById("ddlcustomerdropdown").classList.add('validate');
     flag=false;
    }
  }

    return flag;
    // if(flag=true)
    // {
    //   this.SearchData();
    // }
  }

 RemoveClass(){
    let item = JSON.parse(sessionStorage.getItem('User'));
    if(this.Dbsecurity.Decrypt(item.UserType)==3){
    let emp=((document.getElementById("ddlemployeedropdown") as HTMLInputElement).value);
    if(emp !="")
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
  if(this.Dbsecurity.Decrypt(item.UserType)==1){
    let date=((document.getElementById("date") as HTMLInputElement).value);
    if(date !="")
    {
     document.getElementById("date").classList.remove('validate');
    }
    let date1=((document.getElementById("date1") as HTMLInputElement).value);
    if(date1 !="")
    {
     document.getElementById("date1").classList.remove('validate');
    }
  }
  else{
    let acno=((document.getElementById("ddlcustomerdropdown") as HTMLInputElement).value);
    if(acno !="0")
    {
     document.getElementById("ddlcustomerdropdown").classList.remove('validate');
    }
    let emp=((document.getElementById("ddlemployeedropdown") as HTMLInputElement).value);
    if(emp !="")
    {
     document.getElementById("ddlemployeedropdown").classList.remove('validate');
    }
  }

  }

  SearchData(FromDate,ToDate){
    this.PageCount = 1;
    if (this.validation()) {
      
      const datat = this.BankBookViewForm.value;
      if(datat.UserId=="0")
      {
      
        this.CustomerAccount=datat.UserId; 
      }
      else{
       this.CustomerAccount=datat.UserId;
      }
      // var splitted =  this.FromDate.split("-", 3); 
      // this.FromDate = (splitted[2] +"/"+ splitted[1] +"/"+ splitted[0]);
      // var splitted =  this.ToDate.split("-", 3); 
      // this.ToDate = (splitted[2] +"/"+ splitted[1] +"/"+ splitted[0]);

      this.FromDate = FromDate;
      this.ToDate = ToDate;
      //this.CustomerAccount = this.BankBookViewForm.controls['UserId'].value;
     
      
      
      this.BindGridView( this.FromDate, this.ToDate,this.CustomerAccount);

    } 
    // this.RemoveClass();
    
  }
  
  BindGridView(FromDate,ToDate,CustomerAccount){
    this.isShowLoader=true;
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));

    var FromDate1="";
    var ToDate1 ="";
  
     if(FromDate != undefined)
    {
      var splitted = FromDate.split("-", 3); 
       FromDate1 = (splitted[2] +"/"+ splitted[1] +"/"+ splitted[0]); 
    }
if( ToDate != undefined){
  var splitted = ToDate.split("-", 3); 
  ToDate1 = (splitted[2] +"/"+ splitted[1] +"/"+ splitted[0]);
}
   

    var JsonData ={
      
      "CustomerAccount":CustomerAccount,
      "FromDate" : FromDate1 ,
      "ToDate" : ToDate1,
      "ReportType":'1',
    }
    this.BSService.BindGridView(JsonData).subscribe(
      (data) => {
        this.BindGridview1=data.Table;
        

      });
      this.isShowLoader=false;
      
  }

//   FetchLatestReport() {
//     let item = JSON.parse(sessionStorage.getItem('User'));
//     if(this.Dbsecurity.Decrypt(item.UserType)==1){
//       this.isShowLoader=true;
//     var currentContext = this;
//     // let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
//     var ReportName="1";
//     const datat = this.BankBookViewForm.value;
//     var CustomerAccount=datat.UserId;
//     var JsonData ={
//     //this.TransactionStatementForm.controls['ToDate']
//     "CustomerAccount" : CustomerAccount,
//     "ReportName":ReportName
//     }
    
    
//     this.BSService.GetFetchLatestReport(JsonData).
//     subscribe((data) => {
//     // currentContext.transactionStatementView = data.Table;
//     // this.transactionStatementView_Copy=data.Table;
//     // this.isShowCustomer=true;
//     const datat = this.BankBookViewForm.value;
// var AsOnDate=datat.AsOnDate;
// var ToDate=datat.ToDate;
//     this.BindMainGrid(this.accountNumber,AsOnDate,ToDate)
    
//     });
//     // console.log(sessionStorage.getItem('ID'));
//     //this.loading = false;
//     }
//     else{
//     let acno=((document.getElementById("ddlcustomerdropdown") as HTMLInputElement).value);
   
//    if(acno =="0")
//    {
//     document.getElementById("ddlcustomerdropdown").classList.add('validate');
//    }
//    else{
//     document.getElementById("ddlcustomerdropdown").classList.remove('validate');

//     this.isShowLoader=true;
//     var currentContext = this;
//     // let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
//     var ReportName="3";
//     const datat = this.BankBookViewForm.value;
//     var CustomerAccount=datat.UserId;
//     var JsonData ={
//     //this.TransactionStatementForm.controls['ToDate']
//     "CustomerAccount" : CustomerAccount,
//     "ReportName":ReportName
//     }
    
    
//     this.BSService.GetFetchLatestReport(JsonData).
//     subscribe((data) => {
//     // currentContext.transactionStatementView = data.Table;
//     // this.transactionStatementView_Copy=data.Table;
//     // this.isShowCustomer=true;
//     const datat = this.BankBookViewForm.value;
// var AsOnDate=datat.AsOnDate;
// var ToDate=datat.ToDate;
//     this.BindMainGrid(this.accountNumber,AsOnDate,ToDate)
    
//     });
//     // console.log(sessionStorage.getItem('ID'));
//     //this.loading = false;
//    }
//   }
    
//     }

    FetchLatestReport() {
    
      let item = JSON.parse(sessionStorage.getItem('User'));
      if(this.Dbsecurity.Decrypt(item.UserType)==1){
        this.isShowLoader=true;
      var currentContext = this;
      // let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
      var ReportName="1";
      const datat = this.BankBookViewForm.value;
      var CustomerAccount=item.AccountNo;
      var JsonData ={
      //this.TransactionStatementForm.controls['ToDate']
      "CustomerAccount" : CustomerAccount,
      "ReportName":ReportName
      }
      
      
      this.BSService.GetFetchLatestReport(JsonData).
      subscribe((data) => {
      // currentContext.transactionStatementView = data.Table;
      // this.transactionStatementView_Copy=data.Table;
      // this.isShowCustomer=true;
      const datat = this.BankBookViewForm.value;
     
      var FromDate=datat.FromDate;
      var ToDate=datat.ToDate;
      this.BindGridView(FromDate,ToDate,CustomerAccount)
      
      });
      // console.log(sessionStorage.getItem('ID'));
      //this.loading = false;
      }
      else{
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
      var ReportName="1";
      const datat = this.BankBookViewForm.value;
      var CustomerAccount=datat.UserId;
      var JsonData ={
      //this.TransactionStatementForm.controls['ToDate']
      "CustomerAccount" : CustomerAccount,
      "ReportName":ReportName
      }
      
      
      this.BSService.GetFetchLatestReport(JsonData).
      subscribe((data) => {
      // currentContext.transactionStatementView = data.Table;
      // this.transactionStatementView_Copy=data.Table;
      // this.isShowCustomer=true;
      const datat = this.BankBookViewForm.value;
  var FromDate=datat.FromDate;
  var ToDate=datat.ToDate;
      this.BindGridView(FromDate,ToDate,CustomerAccount)
      
      });
      // console.log(sessionStorage.getItem('ID'));
      //this.loading = false;
     }
    }
      
      }

  BindDefaultGrid(){
   
    this.loader1=true;this.loader2=true;
    var JsonData ={
      "UserId" : this.UserId,
      "FromDate" : this.FromDate,   
      "ToDate" :  this.ToDate,
      "CustomerAccount" : this.CustomerAccount,
      "PageCount" : this.PageCount,
      "ReportType":'1',       
    }

    this.BSService.BindGridView(JsonData).subscribe(
      (data) => {
        if((data.Table.length !=0))
      {
        this.loader1=false;this.loader2=false;
        this.btnNext=true;
        this.IsShowRecord=true;
        this.IsShowNoRecord=false;
        this.BindGridview1=data.Table;
       // this.BindgridList = data.Table; 
        // this.TotalsumgridData = data.Table1;
        // this.HeaderList = data.Table2;
        // this.Buy_SellAmount=this.TotalsumgridData[0].Buy_SellAmount;
        // this.Income=this.TotalsumgridData[0].Income;
        // this.Expenses=this.TotalsumgridData[0].Expenses;
        // this.Dep_with=this.TotalsumgridData[0].Dep_with;
        // this.Balance=this.TotalsumgridData[0].Balance;
        this.NoRecord = false;
      }
      else
      {
        this.loader1=false;this.loader2=false;
        //this.isShowLoader=false;
        this.IsShowRecord=false;
        this.IsShowNoRecord=true;
        this.btnNext=false;
      }
        });
      
      
  }

  // ReMoveclass1(){
  //   document.getElementById("ddlcustomerdropdown").classList.remove('validate');
  // }

  BindCustomersOnChange(EmployeeId){
    this.loader1=true;this.loader2=true;
    let  Data = new Commonfields();
    Data.UserId = EmployeeId ;
    this.BSService.BindCustomers(JSON.stringify(Data)).subscribe(
      (data) => {
           this.BindCustomersList = data.Table;
           this.loader1=false;this.loader2=false;
      });

  }
  

  
  BindEmployee(){
    this.loader1=true;this.loader2=true;
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    let  Data = new Commonfields();
    Data.UserId = Sessionvalue.UserId;
    this.BSService.BindEmployee(JSON.stringify(Data)).subscribe(
      (data) => {
           this.BindemployeesList = data.Table;
           this.loader1=false;this.loader2=false;
      });
  }

  BindCustomers(){

    this.loader1=true;this.loader2=true;
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    let  Data = new Commonfields();
    Data.UserId = this.Dbsecurity.Decrypt(Sessionvalue.UserId);
    this.BSService.BindCustomers(JSON.stringify(Data)).subscribe(
      (data) => {
           this.BindCustomersList = data.Table;
           this.loader1=false;this.loader2=false;
      });
  }

  

}
