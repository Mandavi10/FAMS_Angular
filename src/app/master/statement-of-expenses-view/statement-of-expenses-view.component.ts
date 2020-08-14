

import { Component, OnInit } from '@angular/core';
import { StatementOfExpenses,StatementOfExpenses1,StatementOfExpenses2,StatementOfExpenses3
  ,StatementOfExpenses4,StatementOfExpenses_Default,StatementOfExpenses5,Bindemployee,StatementOfExpView} from '../../../Models/StatementOfExpense/StatementOfExpenses';
import { Customer} from '../../../Models/HoldingReport/holdingReport';
import { StatementexpensesService } from 'src/app/Services/StatementOfExpenses/statementexpenses.service';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import{DbsecurityService}from 'src/app/Services/dbsecurity.service';


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
    {headerName: 'Download', field: '', width:'100',cellClass:'text-center',cellRenderer: (params) => {
      return ' <a target="_blank"  href="'  + params.data.DownloadLink + '"> Download</a> ';
    }},
     {headerName: 'Data View Mode', field: 'viewmode', width:'150', cellClass:'text-center',cellRenderer: (params) => {
      return '<a href="/StatementOfExpenses?CustomerAccount='  + params.data.CustomerAccount + '&FromDate='+ params.data.FromDate  + '&ToDate='+ params.data.ToDate  + '">View</a>';
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
constructor(private router: Router,private formbulider: FormBuilder, private _statementexpensesService: StatementexpensesService,private Dbsecurity: DbsecurityService) {

  //  this.custodian = new Custodian();
   
}



  ngOnInit(): void {
    debugger;

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
    var ReportName="Statement of Expenses Clientwise";

    this.BindStatementExpView("0","","",ReportName.trim());

    let item = JSON.parse(sessionStorage.getItem('User'));
    this.userType=this.Dbsecurity.Decrypt(item.UserType);

   
    this.accountNumber=item.AccountNo;
    debugger;
    if(this.userType ==1)
    {
      this.GUserId=item.UserId.replace('+',' ');
      this.GAccountNumber=this.accountNumber;   
    }

   else if(this.userType ==3)
    {
      this.GUserId=item.UserId.replace('+',' ');
      this.GAccountNumber="0";
      this.StatementOfExpenseViewForm.controls["UserId"].setValue(0);
      this.isShowCustomer=true;
      this.BindEmployee();
      //this.BindCustomer();
     
    }
    else if(this.userType ==2)
    {
     // this.isShowCustomer=true;
     this.GUserId=item.UserId.replace('+',' ');;
     this.GAccountNumber="1";
      this.BindCustomer();
    }
    else{
      this.GUserId=item.UserId.replace('+',' ');;
      this.GAccountNumber="0";
      this.isShowCustomer=false;
      this.isShowsEmployee=false;
    }
  
    
  }
  onSubmit() {
    debugger;
    if (this.StatementOfExpenseViewForm.valid) {
        const datat = this.StatementOfExpenseViewForm.value;
       if(datat.UserId=="0")
        {
         this.CustomerAccount=datat.UserId; 
        }
        else{
         this.CustomerAccount=datat.UserId;
        }
        var FromDate=datat.FromDate;
        var ToDate=datat.ToDate;
        var ReportName="Statement of Expenses Clientwise";
        this.BindStatementExpView(this.CustomerAccount,FromDate,ToDate,ReportName);
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

  BindStatementExpView(CustomerAccount,FromDate,ToDate,ReportName) {
    this.loading = true;
    var currentContext = this;
    // let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    
    var JsonData ={
      "FromDate" :   FromDate   ,    // this.TransactionStatementForm.controls['FromDate'],
      "ToDate" :  ToDate  ,        //this.TransactionStatementForm.controls['ToDate']
      "CustomerAccount" : CustomerAccount,
     "ReportName":ReportName.trim()
    }

    
    this._statementexpensesService.BindStatementExpView(JsonData).
        subscribe((data) => {
            currentContext.statementOfExpView = data.Table;
            this.statementOfExpView_Copy=data.Table;
           // this.isShowCustomer=true;
        });
    // console.log(sessionStorage.getItem('ID'));
    this.loading = false;
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
           // this.loader1=false;this.loader2=false;
       });
   }
   BindCustomer() {
    this.loading = true;
    var currentContext = this;
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    this._statementexpensesService.BindCustomer(this.Dbsecurity.Decrypt(Sessionvalue.UserId.replace('+',' '))).
        subscribe((data) => {
            currentContext.customer = data.Table;
            this.isShowCustomer=true;
        });
    // console.log(sessionStorage.getItem('ID'));
    this.loading = false;
  }

   BindCustomerOnChange(EmployeeId) {
    // this.EvenOdd=1;
     this.loading = true;
     var currentContext = this;
     this._statementexpensesService.BindCustomer(EmployeeId).
         subscribe((data) => {
             currentContext.customer = data.Table;
             this.isShowCustomer=true;
         });
     // console.log(sessionStorage.getItem('ID'));
     this.loading = false;
   }

}
