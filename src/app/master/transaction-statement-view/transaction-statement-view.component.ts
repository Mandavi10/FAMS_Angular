import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { TransactionstatementService } from '../../Services/TransactionStatement/transactionstatement.service';
import { BindmaingridHeader,BindmaingridDetails,BindmaingridDetailsSummary,TransactionStatementView } from '../../../Models/TransactionStatement/bindmaingrid';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Commonfields } from '../../../Models/commonfields';
import { Customer} from '../../../Models/HoldingReport/holdingReport';
import {Bindcustomerallfields} from '../../../Models/SummaryReport/Bindcustomerallfields';
import {Bindemployee} from '../../../Models/StatementOfExpense/StatementOfExpenses';
import{DbsecurityService}from '../../Services/dbsecurity.service';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { timer } from 'rxjs';
//import html2canvas from 'html2canvas';  

@Component({
  selector: 'app-transaction-statement-view',
  templateUrl: './transaction-statement-view.component.html',
  styleUrls: ['./transaction-statement-view.component.css']
})
export class TransactionStatementViewComponent implements OnInit {
  IsShowRecord:boolean;
  IsShowNoRecord:boolean;

  btnPrev:boolean=true;
  btnNext:boolean=true;
  RunningNoOfPage:number;
  NoOfPage:number;
  Default_NoOfPage:number=1;
  CustomerAccountNo :any;
  EvenOdd:number=1;


  isShowmaingridDetailsSummary:boolean=false;
  isShowbindmaingridDetails:boolean=false;
  CustomerAccount:string;
  // FromDate:any;
  // ToDate:any;
  customer:Customer ;
  accountNumber:string;
  GAccountNumber:any;
  GUserId:number;
  isShowsEmployee:boolean=false;
  BindemployeesList:Bindemployee;

  UniqueSeqNo:number=1;
  Page_SeqNo:number=1;
  SeqNo:number=1;
  Summary_SeqNo:number=1;
  isShowLoader:boolean=false;
  bindmaingridHeader : BindmaingridHeader;
  bindmaingridDetails : BindmaingridDetails;
  bindmaingridDetailsSummary : BindmaingridDetailsSummary;
  transactionStatementView:TransactionStatementView;
  transactionStatementView_Copy:TransactionStatementView;
  isShowBindmaingridDetails:boolean=false;
  showModalupdatepopup:boolean;
  TransactionStatementViewForm : FormGroup;HeaderArray:any=[];divMainGrid:boolean=false;
  StaticArray:any=[];FromDate:any;ToDate:any;StaticArray1:any=[];  head = [];isShowCustomer:boolean=false;
  BindcustomerallfieldsList:Bindcustomerallfields; userType:number;
  

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
//constructor(private router: Router,private formbulider: FormBuilder, private TSService: TransactionstatementService,private Dbsecurity: DbsecurityService) {}

constructor(private router: Router,private formbulider: FormBuilder,private TSService : TransactionstatementService, private formBuilder: FormBuilder,public datepipe: DatePipe, private Dbsecurity: DbsecurityService) { }

  ngOnInit(): void {
    debugger;

    this.TransactionStatementViewForm = this.formbulider.group({
      EmployeeId: [0, ],
      UserId: [0, ],
      FromDate: ['', ],
      ToDate: ['',],
    });

    // this.isShowsEmployee=true;
    // this.isShowsEmployee=true;
    // this.BindEmployee();
    // this.BindCustomer();



    //var ReportName="Transaction Statement Cleintwise";
    var ReportType="9";
    this.BindTransactionStatementView("0","","",ReportType.trim());
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
      this.TransactionStatementViewForm.controls["UserId"].setValue(0);
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
    if (this.TransactionStatementViewForm.valid) {
        const datat = this.TransactionStatementViewForm.value;
       if(datat.UserId=="0")
        {
         this.CustomerAccount=datat.UserId; 
        }
        else{
         this.CustomerAccount=datat.UserId;
        }
        var FromDate=datat.FromDate;
        var ToDate=datat.ToDate;
        //var ReportName="Transaction Statement Cleintwise";
        var ReportType="9";
        this.BindTransactionStatementView(this.CustomerAccount,FromDate,ToDate,ReportType);
    } 
  }

  TransactionStatementViewSearch(evt: any) {
    debugger;
    let searchText = evt.target.value.toLocaleLowerCase();    
    if(searchText ===  '' || searchText === undefined || searchText === null)
    {
      this.transactionStatementView  = JSON.parse(JSON.stringify(this.transactionStatementView_Copy));
     
    }
    else{
      let gridArr = JSON.parse(JSON.stringify(this.transactionStatementView_Copy));
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
      this.transactionStatementView  = JSON.parse(JSON.stringify(finalArr));
    }
  }

  FetchLatestReport() {
    debugger;
    // this.loading = true;
    this.isShowLoader=true;
     var currentContext = this;
     // let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
     var ReportName="Transaction Statement Cleintwise";
     const datat = this.TransactionStatementViewForm.value;
     var CustomerAccount=datat.UserId;
     var JsonData ={
           //this.TransactionStatementForm.controls['ToDate']
       "CustomerAccount" : CustomerAccount,
      "ReportName":ReportName
     }
 
     
     this.TSService.GetFetchLatestReport(JsonData).
         subscribe((data) => {
            //  currentContext.transactionStatementView = data.Table;
            //  this.transactionStatementView_Copy=data.Table;
            // this.isShowCustomer=true;
            this.isShowLoader=false;
         });
     // console.log(sessionStorage.getItem('ID'));
     //this.loading = false;
     
   }

  BindTransactionStatementView(CustomerAccount,FromDate,ToDate,ReportType) {
   // this.loading = true;
   this.isShowLoader=true;
    var currentContext = this;
    // let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    
    var JsonData ={
      "FromDate" :   FromDate   ,    // this.TransactionStatementForm.controls['FromDate'],
      "ToDate" :  ToDate  ,        //this.TransactionStatementForm.controls['ToDate']
      "CustomerAccount" : CustomerAccount,
     "ReportType":ReportType
    }

    
    this.TSService.BindTransactionStatementView(JsonData).
        subscribe((data) => {
          this.isShowLoader=false;
            currentContext.transactionStatementView = data.Table;
            this.transactionStatementView_Copy=data.Table;
           // this.isShowCustomer=true;
        });
    // console.log(sessionStorage.getItem('ID'));
    //this.loading = false;
    
  }
  BindEmployee(){
    
    // this.loader1=true;this.loader2=true;
     let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    // let  Data = new Commonfields();
     //Data.UserId = Sessionvalue.UserId;
     this.TSService.BindEmployee(Sessionvalue.UserId.replace('+',' ')).subscribe(
       (data) => {
         debugger;
            this.BindemployeesList = data.Table;
            this.isShowsEmployee=true;
           // this.loader1=false;this.loader2=false;
       });
   }
   BindCustomer() {
    //this.loading = true;
    this.isShowLoader=true;
    var currentContext = this;
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    this.TSService.BindCustomer(this.Dbsecurity.Decrypt(Sessionvalue.UserId.replace('+',' '))).
        subscribe((data) => {
            currentContext.customer = data.Table;
            this.isShowCustomer=true;
        });
    // console.log(sessionStorage.getItem('ID'));
    //this.loading = false;
    this.isShowLoader=false;
  }

   BindCustomerOnChange(EmployeeId) {
    // this.EvenOdd=1;
     //this.loading = true;
     this.isShowLoader=true;
     var currentContext = this;
     this.TSService.BindCustomer(EmployeeId).
         subscribe((data) => {
             currentContext.customer = data.Table;
             this.isShowCustomer=true;
         });
     // console.log(sessionStorage.getItem('ID'));
     //this.loading = false;
     this.isShowLoader=false;
   }

}
