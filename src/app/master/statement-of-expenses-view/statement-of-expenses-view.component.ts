

import { Component, OnInit } from '@angular/core';
import { StatementOfExpenses,StatementOfExpenses1,StatementOfExpenses2,StatementOfExpenses3
  ,StatementOfExpenses4,StatementOfExpenses_Default,StatementOfExpenses5,Bindemployee,StatementOfExpView} from '../../../Models/StatementOfExpense/StatementOfExpenses';
import { Customer} from '../../../Models/HoldingReport/holdingReport';
import { StatementexpensesService } from 'src/app/Services/StatementOfExpenses/statementexpenses.service';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';

import { AgGridAngular } from 'ag-grid-angular';
import{DbsecurityService}from 'src/app/Services/dbsecurity.service';
import { DatePipe } from '@angular/common'; 
import {AppSettings} from 'src/app/app-settings';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable , Inject } from '@angular/core';




import { timer } from 'rxjs';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
//import html2canvas from 'html2canvas'; 
import { Router, ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';



@Component({
  selector: 'app-statement-of-expenses-view',
  templateUrl: './statement-of-expenses-view.component.html',
  styleUrls: ['./statement-of-expenses-view.component.css']
})
export class StatementOfExpensesViewComponent implements OnInit {
  //isShowsEmployee:boolean;
  //isShowCustomer:boolean;
  // loading:boolean;


  baseUrl: string = "";
  btnPrev:boolean=true;
  btnNext:boolean=true;
  IsShowRecord:boolean;
  IsShowNoRecord:boolean;

  isShowsEmployee:boolean=false;
  isShowstatementOfExpenses4:boolean=false;
  isShowstatementOfExpenses5:boolean=false;
  EvenOdd:number=1;

  //isShowLoader:boolean=false;
  isShowLoader:boolean;
  HeaderArray : any =[];
  holdingReport:any=[];
  showModalstatemaster: boolean;
  StatementOfExpenseViewForm: FormGroup; 
  statementOfExpenses:StatementOfExpenses;
  statementOfExpenses1:StatementOfExpenses1;
  statementOfExpenses2:StatementOfExpenses2;
  statementOfExpenses3:StatementOfExpenses3;
  statementOfExpenses4:StatementOfExpenses4;
  statementOfExpenses_Default:StatementOfExpenses_Default;
  statementOfExpenses5:StatementOfExpenses5;
  BindemployeesList:Bindemployee;

  statementOfExpView:StatementOfExpView;
  statementOfExpView_Copy:StatementOfExpView;
   
   gridAllFields5: any []; 
   head = []
   buttonDisabledReset: boolean = false; /*buttonDisabledDelete: boolean = true;*/ submitted = false; sucess = false; Show = true;
  Temp: number = 1; CustodianId: number = 0; loading: boolean = false;
  message: string;
  setClickedRow: Function;
  Isdiv1:boolean;
  Isdiv:boolean;

  CurrentDate = new Date();
  isShowCustomer:boolean=false;
  customer:Customer ;
  CustomerAccount:string;
  userType:number;
 accountNumber:string;
  selectedRowId:number;
  pmsDetails:[];
  IsEquity:boolean;
  IsCashAndEquiv:boolean;
  GAccountNumber:any;
  GUserId:number;

  
  
    

 columnDefs = [
    {headerName: 'Sr. No.', field: 'SrNo', width:'80'},
    {headerName: 'From Date', field: 'FromDate', width:'150'},
    {headerName: 'To Date', field: 'ToDate', width:'150'},
    {headerName: 'Customer Account', field: 'CustomerAccount', width:'150'},
    {headerName: 'Scheme', field: 'Scheme', width:'150'},
    // {headerName: 'Download', field: '', width:'100',cellClass:'text-center',cellRenderer: (params) => {
    //   return ' <a target="_blank"  href="'  + params.data.DownloadLink + '"> Download</a> ';
    // }},

    {headerName: 'Download', field: '', width:'100',cellClass:'txtCenter',cellRenderer: (params) => {
      return ' <a target="_blank" href="'+ this.baseUrl +'' + params.data.DownloadLink + '"> <i class="fa fa-file-pdf-o" aria-hidden="true"></i></a> ';
      }},
     {headerName: 'Data View Mode', field: 'viewmode', width:'150', cellClass:'txtCenter',cellRenderer: (params) => {
      return '<a href="/StatementOfExpenses?CustomerAccount='  + params.data.CustomerAccount + '&FromDate='+ params.data.FromDate  + '&ToDate='+ params.data.ToDate  + '"><button type="button" class="btn btn-success" >View </button></a>';
    }
    },


    // {headerName: 'Data View Mode', field: 'viewmode', width:'150', cellClass:'text-center',cellRenderer: function clickNextRendererFunc(){
    //   return '<button type="button" class="btn btn-success">View</button>';
    // }},
  
    
];


rowData = [
    {  SrNo: '1', fromdate:'14/07/2020', todate:'20/07/2020',  customeraccount: '47481000024748', scheme: '', download:'',  viewmode: ''},
    {  SrNo: '2', fromdate:'14/07/2020', todate:'20/07/2020',  customeraccount: '47481000024748', scheme: '', download:'',  viewmode: ''},
    {  SrNo: '3', fromdate:'14/07/2020', todate:'20/07/2020',  customeraccount: '47481000024748', scheme: '', download:'',  viewmode: ''},

   
];
constructor(private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string,private datePipe: DatePipe,private router: Router,private formbulider: FormBuilder, private _statementexpensesService: StatementexpensesService,private Dbsecurity: DbsecurityService) {
  
  //  this.custodian = new Custodian();
   
}



  ngOnInit(): void {
    debugger;
    this.baseUrl = AppSettings.Login_URL;
    this.StatementOfExpenseViewForm = this.formbulider.group({
      EmployeeId: [0, ],
      UserId: [0, ],
      FromDate: ['', ],
      ToDate: ['',],
    });

    // this.isShowsEmployee=true;
    // this.isShowsEmployee=true;
    // this.BindEmployee();
    // this.BindCustomer();
    //var ReportName="Statement of Expenses Clientwise";
    var ReportType="8";

    // this.BindStatementExpView("0","","",ReportType.trim());

    let item = JSON.parse(sessionStorage.getItem('User'));
    this.userType=this.Dbsecurity.Decrypt(item.UserType);

   
    this.accountNumber=item.AccountNo;
    debugger;
    if(this.userType ==1)
    {
      this.GUserId=item.UserId.replace('+',' ');
      this.GAccountNumber=this.accountNumber;   
      this.BindStatementExpView(this.accountNumber,"","",ReportType.trim());
    }

   else if(this.userType ==3 || this.userType == 4)
    {
      this.GUserId=item.UserId.replace('+',' ');
      this.GAccountNumber="0";
      this.StatementOfExpenseViewForm.controls["UserId"].setValue(0);
      this.isShowCustomer=true;
      // this.statementOfExpView = [];
      // this.statementOfExpView_Copy=[]];

      this.BindEmployee();
      this.BindStatementExpView(1,"","",ReportType.trim());
      //this.BindCustomer();
     
    }
    else if(this.userType ==2)
    {
     // this.isShowCustomer=true;
     this.GUserId=item.UserId.replace('+',' ');;
     this.GAccountNumber="1";
      this.BindCustomer();
      this.BindStatementExpView(1,"","",ReportType.trim());
    }
    else{
      this.GUserId=item.UserId.replace('+',' ');;
      this.GAccountNumber="0";
      this.isShowCustomer=false;
      this.isShowsEmployee=false;
      this.BindStatementExpView(1,"","",ReportType.trim());
    }
  
    
  }
  onSubmit() {
    debugger;
    if (this.validation()) {
      if (this.StatementOfExpenseViewForm.valid) {
          const datat = this.StatementOfExpenseViewForm.value;
          let item = JSON.parse(sessionStorage.getItem('User'));
    this.userType=this.Dbsecurity.Decrypt(item.UserType);
    this.accountNumber=item.AccountNo;
    debugger;
    if(this.userType ==1)
    {
      this.CustomerAccount=this.accountNumber;
    }
    else
    {
          if(datat.UserId=="0")
          {
          this.CustomerAccount=datat.UserId; 
          }
          else{
          this.CustomerAccount=datat.UserId;
          }
    }
        
          var FromDate=datat.FromDate;
          var ToDate=datat.ToDate;

          var splitted = FromDate.split("-", 3); 
          FromDate = (splitted[2] +"/"+ splitted[1] +"/"+ splitted[0]);
          var splitted = ToDate.split("-", 3); 
          ToDate = (splitted[2] +"/"+ splitted[1] +"/"+ splitted[0]);
        // var ReportName="Statement of Expenses Clientwise";
        var ReportType="8";
          this.BindStatementExpView(this.CustomerAccount,FromDate,ToDate,ReportType);
      } 
    }
  }
  // FetchLatestReport() {
  //   debugger;
  //   this.isShowLoader=true;
  //    var currentContext = this;
  //   var ReportName="8";

  //   let item = JSON.parse(sessionStorage.getItem('User'));
  //   this.userType=this.Dbsecurity.Decrypt(item.UserType);

   
  //   this.accountNumber=item.AccountNo;
  //   debugger;
  //   if(this.userType ==1)
  //   {
  //     this.GUserId=item.UserId.replace('+',' ');
  //     this.accountNumber=this.accountNumber;   
  //   }

  //  else if(this.userType ==3)
  //   {
  //     const datat = this.StatementOfExpenseViewForm.value;
  //    this.accountNumber=datat.UserId;
     
  //   }
  //   else if(this.userType ==2)
  //   {
  //   const datat = this.StatementOfExpenseViewForm.value;
  //    this.accountNumber=datat.UserId;
      
  //   }
  //   else{


  //     this.GUserId=item.UserId.replace('+',' ');
  //     this.accountNumber=this.accountNumber;   
    
  //   }
  
  //    var JsonData ={

  //      "CustomerAccount" : this.accountNumber,
  //     "ReportName":ReportName
  //    }
 
     
  //    this._statementexpensesService.GetFetchLatestReport(JsonData).
  //        subscribe((data) => {
  //           var ReportType="9";
    
  //           this.BindStatementExpView("0","","",ReportType.trim());
  //           this.isShowLoader=false;
  //        });
     
  //  }

   FetchLatestReport() {
     debugger;
    
    let item = JSON.parse(sessionStorage.getItem('User'));
    if(this.Dbsecurity.Decrypt(item.UserType)==1){
      this.isShowLoader=true;
    var currentContext = this;
    
    var ReportName="8";
    const datat = this.StatementOfExpenseViewForm.value;
    //var CustomerAccount=datat.UserId;
    var CustomerAccount=item.AccountNo;
    var JsonData ={
    
    "CustomerAccount" : CustomerAccount,
    "ReportName":ReportName
    }
    
       this._statementexpensesService.GetFetchLatestReport(JsonData).
         subscribe((data) => {
            var ReportType="8";    
            this.BindStatementExpView("0","","",ReportType.trim());
            this.isShowLoader=false;
         });
     
  //  }
    // this.TSService.GetFetchLatestReport(JsonData).
    //     subscribe((data) => {
    //       var ReportType="9";
    //     this.BindTransactionStatementView("0","","",ReportType.trim()); 
    //       this.isShowLoader=false;
    //     });
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
    
    var ReportName="8";
    const datat = this.StatementOfExpenseViewForm.value;
    var CustomerAccount=datat.UserId;
    var JsonData ={
    //this.TransactionStatementForm.controls['ToDate']
    "CustomerAccount" : CustomerAccount,
    "ReportName":ReportName
    }
    
    
    // this.TSService.GetFetchLatestReport(JsonData).
    //      subscribe((data) => {
    //        var ReportType="9";
    //       this.BindTransactionStatementView("0","","",ReportType.trim()); 
    //         this.isShowLoader=false;
    //      });

    this._statementexpensesService.GetFetchLatestReport(JsonData).
         subscribe((data) => {
            var ReportType="8";    
            this.BindStatementExpView("0","","",ReportType.trim());
            this.isShowLoader=false;
         });
    
   
   }
  }
    
    }


  

  StatementOfExpViewSearch(evt: any) {
    debugger;
    let searchText = evt.target.value.toLocaleLowerCase();    
    if(searchText ===  '' || searchText === undefined || searchText === null)
    {
      this.statementOfExpView  = JSON.parse(JSON.stringify(this.statementOfExpView_Copy));
     
    }
    else{
      let gridArr = JSON.parse(JSON.stringify(this.statementOfExpView_Copy));
      let finalArr = [];
      gridArr.forEach(row => {
        
        var FromDate = row.FromDate.toLocaleLowerCase();
        var ToDate = row.ToDate.toLocaleLowerCase();
        var CustomerAccount = row.CustomerAccount.toLocaleLowerCase();
        var Scheme = row.Scheme.toLocaleLowerCase();

        var isFromDate= FromDate.includes(searchText) ;
        var isToDate = ToDate.includes(searchText);
        var isCustomerAccount = CustomerAccount.includes(searchText);
        var isScheme = Scheme.includes(searchText);

       if( isFromDate || isToDate || isCustomerAccount || isScheme)
        {
          finalArr.push(row);
        }
        
      });
      this.statementOfExpView  = JSON.parse(JSON.stringify(finalArr));
    }
  }

  BindStatementExpView(CustomerAccount,FromDate,ToDate,ReportType) {
   // this.loading = true;
    var currentContext = this;
    // let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    
    var JsonData ={
      "FromDate" :   FromDate   ,    // this.TransactionStatementForm.controls['FromDate'],
      "ToDate" :  ToDate  ,        //this.TransactionStatementForm.controls['ToDate']
      "CustomerAccount" : CustomerAccount,
     "ReportType":ReportType.trim()
    }
    this.isShowLoader=true;
    
    this._statementexpensesService.BindStatementExpView(JsonData).
        subscribe((data) => {
          this.isShowLoader=false;
            currentContext.statementOfExpView = data.Table;
            this.statementOfExpView_Copy=data.Table;
           // this.isShowCustomer=true;
        });
    // console.log(sessionStorage.getItem('ID'));
   // this.loading = false;
  }
  BindEmployee(){
    // this.loader1=true;this.loader2=true;
     let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    // let  Data = new Commonfields();
     //Data.UserId = Sessionvalue.UserId;
     this._statementexpensesService.BindEmployee(Sessionvalue.UserId.replace('+',' ')).subscribe(
       (data) => {
         debugger;
            this.BindemployeesList = data.Table;
            this.isShowsEmployee=true;
             this.loading = false;
           // this.loader1=false;this.loader2=false;
       });
   }
   BindCustomer() {
   // this.loading = true;
    var currentContext = this;
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    this._statementexpensesService.BindCustomer(this.Dbsecurity.Decrypt(Sessionvalue.UserId.replace('+',' '))).
        subscribe((data) => {
            currentContext.customer = data.Table;
            this.isShowCustomer=true;
            this.loading = false;
        });
    // console.log(sessionStorage.getItem('ID'));
   // this.loading = false;
  }

   BindCustomerOnChange(EmployeeId) {
    // this.EvenOdd=1;
    // this.loading = true;
     var currentContext = this;
     this._statementexpensesService.BindCustomer(EmployeeId).
         subscribe((data) => {
             currentContext.customer = data.Table;
             this.isShowCustomer=true;
         });
     // console.log(sessionStorage.getItem('ID'));
     //this.loading = false;
   }

   CustomerOn_Change(){
     debugger;
    let acno=((document.getElementById("ddlcustomerdropdown") as HTMLInputElement).value);
    var ReportType="8";
      if(acno =="0")
      {
        document.getElementById("ddlcustomerdropdown").classList.add('validate');
      }
      else{
        document.getElementById("ddlcustomerdropdown").classList.remove('validate');
      }

      this.BindStatementExpView(acno,"","",ReportType);
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

    let date1=((document.getElementById("date1") as HTMLInputElement).value);
    if(date1 =="")
    {
     document.getElementById("date1").classList.add('validate');
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

    let date1=((document.getElementById("date1") as HTMLInputElement).value);
    if(date1 !="")
    {
     document.getElementById("date1").classList.remove('validate');
    }

  }

}

