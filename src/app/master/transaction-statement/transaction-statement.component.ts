import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { TransactionstatementService } from '../../Services/TransactionStatement/transactionstatement.service';
import { BindmaingridHeader,BindmaingridDetails,BindmaingridDetailsSummary } from '../../../Models/TransactionStatement/bindmaingrid';
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
import html2canvas from 'html2canvas';  

@Component({
  selector: 'app-transaction-statement',
  templateUrl: './transaction-statement.component.html',
  styleUrls: ['./transaction-statement.component.css']
})
export class TransactionStatementComponent implements OnInit {
  RunningNoOfPage:number;
  NoOfPage:number;
  Default_NoOfPage:number=1;
  CustomerAccountNo :any;


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
  isShowBindmaingridDetails:boolean=false;
  showModalupdatepopup:boolean;
  TransactionStatementForm : FormGroup;HeaderArray:any=[];divMainGrid:boolean=false;
  StaticArray:any=[];FromDate:any;ToDate:any;StaticArray1:any=[];  head = [];isShowCustomer:boolean=false;
  BindcustomerallfieldsList:Bindcustomerallfields; userType:number;
  columnDefs = [
    {headerName: 'Transaction Description', field: 'TransactionDesc', width: 180},
    {headerName: 'Transaction Date', field: 'TransactionDate', width: 150 },
    {headerName: 'Settlement Date', field: 'SettlementDate', width: 150},
    {headerName: 'Security', field: 'Security', width: 150},
    {headerName: 'Exchange', field: 'Exchange', width: 100},
    {headerName: 'Quantity', field: 'Quantity', width: 100},
    {headerName: 'Unit Price', field: 'UnitPrice', width: 120, cellClass:'price', headerClass:'price' },
    {headerName: 'Brkg', field: 'Brkg', width: 100, cellClass:'price', headerClass:'price'},
    {headerName: 'STT', field: 'STT', width: 100, cellClass:'price', headerClass:'price'},
    {headerName: 'Settlement Amount', field: 'SettlementAmount', width: 150, cellClass:'price', headerClass:'price'},
   
];

rowData = [
    { TransactionDescription: 'Security in', TransactionDate: '01/01/2020', SettlementDate: '01/01/2020', Security: 'AXIS BANK LIMITED', Exchange: '', Quantity: '145.000', UnitPrice: '615.333 ', Brkg: '0.00', STT: '0.00', SettlementAmount: '89,223.29'},
    { TransactionDescription: 'Security in', TransactionDate: '01/01/2020', SettlementDate: '01/01/2020', Security: 'AXIS BANK LIMITED', Exchange: '', Quantity: '145.000', UnitPrice: '615.333 ', Brkg: '0.00', STT: '0.00', SettlementAmount: '89,223.29'},
    { TransactionDescription: 'Security in', TransactionDate: '01/01/2020', SettlementDate: '01/01/2020', Security: 'AXIS BANK LIMITED', Exchange: '', Quantity: '145.000', UnitPrice: '615.333 ', Brkg: '0.00', STT: '0.00', SettlementAmount: '89,223.29'},
    { TransactionDescription: 'Security in', TransactionDate: '01/01/2020', SettlementDate: '01/01/2020', Security: 'AXIS BANK LIMITED', Exchange: '', Quantity: '145.000', UnitPrice: '615.333 ', Brkg: '0.00', STT: '0.00', SettlementAmount: '89,223.29'},
    { TransactionDescription: 'Security in', TransactionDate: '01/01/2020', SettlementDate: '01/01/2020', Security: 'AXIS BANK LIMITED', Exchange: '', Quantity: '145.000', UnitPrice: '615.333 ', Brkg: '0.00', STT: '0.00', SettlementAmount: '89,223.29'},
    { TransactionDescription: 'Security in', TransactionDate: '01/01/2020', SettlementDate: '01/01/2020', Security: 'AXIS BANK LIMITED', Exchange: '', Quantity: '145.000', UnitPrice: '615.333 ', Brkg: '0.00', STT: '0.00', SettlementAmount: '89,223.29'},
    { TransactionDescription: 'Security in', TransactionDate: '01/01/2020', SettlementDate: '01/01/2020', Security: 'AXIS BANK LIMITED', Exchange: '', Quantity: '145.000', UnitPrice: '615.333 ', Brkg: '0.00', STT: '0.00', SettlementAmount: '89,223.29'},
    { TransactionDescription: 'Security in', TransactionDate: '01/01/2020', SettlementDate: '01/01/2020', Security: 'AXIS BANK LIMITED', Exchange: '', Quantity: '145.000', UnitPrice: '615.333 ', Brkg: '0.00', STT: '0.00', SettlementAmount: '89,223.29'},
    { TransactionDescription: 'Security in', TransactionDate: '01/01/2020', SettlementDate: '01/01/2020', Security: 'AXIS BANK LIMITED', Exchange: '', Quantity: '145.000', UnitPrice: '615.333 ', Brkg: '0.00', STT: '0.00', SettlementAmount: '89,223.29'},
    
];

  constructor(private router: Router,private TSService : TransactionstatementService
    , private formBuilder: FormBuilder,public datepipe: DatePipe, private Dbsecurity: DbsecurityService) { }

  ngOnInit(): void {
        debugger;
        // this.router.navigate(['/Home']);
        // this.router.navigate(['/TransactionStatement']);
        this.TransactionStatementForm = this.formBuilder.group({  
          EmployeeId: [0, ],
          UserId: [0, ],
          FromDate :[''], 
          ToDate : [''],
          CustomerAccount:['']
        });
        // let item = JSON.parse(sessionStorage.getItem('User'));  
        // this.userType=this.Dbsecurity.Decrypt( item.UserType);
        // if(this.userType == 2)
        // {
        //   this.isShowCustomer=true;          
        //   var currentContext = this;
        //   let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
        //   this.BindCustomers(this.Dbsecurity.Decrypt(Sessionvalue.UserId));
        // }
        // else{
        //   this.isShowCustomer=false;
        // } 
        debugger;


        let item = JSON.parse(sessionStorage.getItem('User'));
  // this.UserId = item.UserId;
  // this.EntityId = item.ReferenceId;
    this.userType=this.Dbsecurity.Decrypt(item.UserType);
    this.accountNumber=this.Dbsecurity.Decrypt( item.AccountNo);
    debugger;
    if(this.userType ==1)
    {
      this.GUserId=item.UserId;
      this.GAccountNumber=this.accountNumber;   
    }

   else if(this.userType ==3)
    {
      this.GUserId=item.UserId;
      this.GAccountNumber="0";
      this.TransactionStatementForm.controls["UserId"].setValue(0);
      this.isShowCustomer=true;
      this.BindEmployee();
      //this.BindCustomers();

     
    }
    else if(this.userType ==2)
    {
     // this.isShowCustomer=true;
    // //  this.GUserId=item.UserId;
    // //  this.GAccountNumber="1";
    // //  this.isShowCustomer=true;          
    // //    var currentContext = this;
    // //    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    // //    //this.BindCustomers(this.Dbsecurity.Decrypt(Sessionvalue.UserId));
    // //    this.BindCustomers(this.GAccountNumber);


       this.isShowCustomer=true;    
       this.GUserId=item.UserId;
       this.GAccountNumber="1";
        this.BindCustomers();

    }
    else{
      this.GUserId=item.UserId;
      this.GAccountNumber="0";
      this.isShowCustomer=false;
      this.isShowsEmployee=false;
    }
    debugger;
     if (this.TransactionStatementForm.controls["UserId"].value==0 && this.TransactionStatementForm.controls["FromDate"].value==""  && this.TransactionStatementForm.controls["ToDate"].value=="") 
    {
      this.BindDefaultLast(this.GAccountNumber,this.GUserId)
    }
        // this.TransactionStatementForm.controls["UserId"].setValue("6010005");
        // this.TransactionStatementForm.controls["FromDate"].setValue("2020-06-30");
        // this.TransactionStatementForm.controls["ToDate"].setValue("2020-06-30");
        // this.BindGrid("6010005","2020-01-01","2020-06-30",1);
  }

  
  onClickupdatepopup() {
    debugger;
var currentContext=this;
    this.TSService.GetSummary(this.CustomerAccountNo).
    subscribe((data) => {
      if(data.Table.length!=0)
      {
      //  this.bindmaingridDetailsSummary=data.Table;
        currentContext.bindmaingridDetailsSummary=data.Table
        this.showModalupdatepopup = true;
      }
    });
    
  }
  hideupdatepopup() {
    debugger;
    this.showModalupdatepopup = false;
  }
  BindDefaultLast(GAccountNumber,UserId)
  {
    this.TSService.BindDefaultData(GAccountNumber,UserId).
    subscribe((data) => {
      //this.statementOfExpenses_Default=data.Table;
     // this.StatementOfExpenseForm.controls['ToDate'].setValue(currentDate);
      // this.TransactionStatementForm.controls["UserId"].setValue(data.Table[0].CustomerAccount);

      if(this.userType==3)
     {
      if(data.Table[0].CustomerAccount=="6010001" || data.Table[0].CustomerAccount=="6010002"||data.Table[0].CustomerAccount=="6010003" || data.Table[0].CustomerAccount=="6010004"||data.Table[0].CustomerAccount=="6010005")
      {
       this.TransactionStatementForm.controls["UserId"].setValue(0);
      }
      else{
       this.TransactionStatementForm.controls["UserId"].setValue(data.Table[0].CustomerAccount);
      }

     }
     else
     {
      this.TransactionStatementForm.controls["UserId"].setValue(data.Table[0].CustomerAccount);
     }
    

    //this.TransactionStatementForm.controls["UserId"].setValue(data.Table[0].CustomerAccount);
    
      this.TransactionStatementForm.controls["FromDate"].setValue(data.Table[0].FromDate);
      this.TransactionStatementForm.controls["ToDate"].setValue(data.Table[0].ToDate);
    this.BindGrid(data.Table[0].CustomerAccount,data.Table[0].FromDate,data.Table[0].ToDate,this.SeqNo,this.Summary_SeqNo) ;
    });
    
  }
  BindEmployee(){
    // this.loader1=true;this.loader2=true;
     let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    // let  Data = new Commonfields();
     //Data.UserId = Sessionvalue.UserId;
     this.TSService.BindEmployee(Sessionvalue.UserId).subscribe(
       (data) => {
         debugger;
            this.BindemployeesList = data.Table;
            this.isShowsEmployee=true;
           // this.loader1=false;this.loader2=false;
       });
   }

   BindCustomerOnChange(EmployeeId) {
    // alert(EmployeeId);
   // this.loading = true;
   this.SeqNo=1;
    var currentContext = this;
    this.TSService.BindCustomer(EmployeeId).
        subscribe((data) => {
            currentContext.customer = data.Table;
            this.isShowCustomer=true;
        });
    // console.log(sessionStorage.getItem('ID'));
    //this.loading = false;
  }

  BindCustomers() {
   // this.loading = true;
    var currentContext = this;
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    this.TSService.BindCustomer(this.Dbsecurity.Decrypt(Sessionvalue.UserId)).
        subscribe((data) => {
            currentContext.customer = data.Table;
            this.isShowCustomer=true;
        });
    // console.log(sessionStorage.getItem('ID'));
   // this.loading = false;
  }
  // BindCustomers(EmployeeId){
  //   // let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
  //   // let  Data = new Commonfields();
  //   // Data.UserId = Sessionvalue.UserId;
  //   this.TSService.BindCustomer(EmployeeId).subscribe(
  //     (data) => {
  //          this.BindcustomerallfieldsList = data.Table;
  //     });
  // }

   PreviousDayFun(){
    var date = new Date();
    var currentDate = date.toISOString().slice(0,10);
    this.TransactionStatementForm.controls['ToDate'].setValue(currentDate);
    date.setDate(date.getDate() - 1);
    var yesterday = date.toISOString().slice(0,10);
    this.TransactionStatementForm.controls['FromDate'].setValue(yesterday);
  }

  LastOneWeekFun(){
    var date = new Date();
    var currentDate = date.toISOString().slice(0,10);
    this.TransactionStatementForm.controls['ToDate'].setValue(currentDate);
    date.setDate(date.getDate() - 7);
    var yesterday = date.toISOString().slice(0,10);
    this.TransactionStatementForm.controls['FromDate'].setValue(yesterday);
  }
  LastOneMonthFun(){
    var date = new Date();
    var currentDate = date.toISOString().slice(0,10);
    this.TransactionStatementForm.controls['ToDate'].setValue(currentDate);
    date.setDate(date.getDate() - 30);
    var yesterday = date.toISOString().slice(0,10);
    this.TransactionStatementForm.controls['FromDate'].setValue(yesterday);
  }

  PreviousClick()
  {
    this.SeqNo-=1;
    //this.BindStatementOfExpReport(this.StatementOfExpenseForm.controls["UserId"].value,this.StatementOfExpenseForm.controls["FromDate"].value,this.StatementOfExpenseForm.controls["ToDate"].value,this.EvenOdd);
    this.BindGrid(this.TransactionStatementForm.controls["UserId"].value,this.TransactionStatementForm.controls["FromDate"].value,this.TransactionStatementForm.controls["ToDate"].value,this.SeqNo,this.Summary_SeqNo);
  }
    // if(this.EvenOdd % 2 !=0)
    // {

    //   this.TSService.NextRecordBind(this.TransactionStatementForm.controls["UserId"].value,this.TransactionStatementForm.controls["FromDate"].value,this.TransactionStatementForm.controls["ToDate"].value,this.EvenOdd).
    //   subscribe((data) => {
    //     if(data.Table.length!=0)
    //     {
    //       this.BindGrid(this.TransactionStatementForm.controls["UserId"].value,this.TransactionStatementForm.controls["FromDate"].value,this.TransactionStatementForm.controls["ToDate"].value,this.EvenOdd);
    //     }
        
    //   });
    // }
    // else
    // {
    //   this.BindGrid(this.TransactionStatementForm.controls["UserId"].value,this.TransactionStatementForm.controls["FromDate"].value,this.TransactionStatementForm.controls["ToDate"].value,this.EvenOdd-1);
    // }
    
  //}
  NextClick()
  {
    debugger;
    this.SeqNo+=1;

    this.BindGrid(this.TransactionStatementForm.controls["UserId"].value,this.TransactionStatementForm.controls["FromDate"].value,this.TransactionStatementForm.controls["ToDate"].value,this.SeqNo,this.Summary_SeqNo);

    // this.UniqueSeqNo+=1;
    // this.Default_NoOfPage+=1;    
    //   this.TSService.NextRecordBind(this.TransactionStatementForm.controls["UserId"].value,this.TransactionStatementForm.controls["FromDate"].value,this.TransactionStatementForm.controls["ToDate"].value,this.SeqNo).
    // subscribe((data) => {
    //   if(data.Table.length!=0)
    //   {
    //     this.NoOfPage=data.Table[0].NoOfPage;
    //     //this.CustomerAccount=data.Table[0].CustomerAccount;
    //     if(this.CustomerAccount != data.Table[0].CustomerAccount)
    //     {
    //       this.Default_NoOfPage=1;
    //     }
    //     this.FromDate=data.Table[0].FromDate;
    //     this.ToDate=data.Table[0].ToDate;
    //     //this.BindGrid(data.Table[0].CustomerAccount,data.Table[0].FromDate,data.Table[0].ToDate,this.SeqNo,this.Summary_SeqNo) ;
    //     //this.BindGrid(this.TransactionStatementForm.controls["UserId"].value,this.TransactionStatementForm.controls["FromDate"].value,this.TransactionStatementForm.controls["ToDate"].value,this.SeqNo,this.Summary_SeqNo);
    //   }
    // });
    // if(this.SeqNo==3)
    // {
    //   this.CustomerAccountNo="6010002";
    // }

    // timer(300).subscribe(x => {
    //   this.NextBind()
    // })
    

    // if((this.CustomerAccountNo=="6010001" || this.CustomerAccountNo=="6010003") && this.SeqNo==3)
    // {
    //        this.SeqNo -=1;
    //       this.isShowbindmaingridDetails=false;
    //       this.isShowmaingridDetailsSummary=true;
          
    // }
    // else if((this.CustomerAccountNo=="6010001" || this.CustomerAccountNo=="6010003") && (this.SeqNo==1 || this.SeqNo==2))
    // {
    //   this.BindGrid(this.TransactionStatementForm.controls["UserId"].value,this.TransactionStatementForm.controls["FromDate"].value,this.TransactionStatementForm.controls["ToDate"].value,this.SeqNo,this.Summary_SeqNo);
       
    // }

    // if((this.CustomerAccountNo=="6010002" || this.CustomerAccountNo=="6010003" || this.CustomerAccountNo=="6010004" || this.CustomerAccountNo=="6010005") && this.SeqNo==4)
    // {
    //     this.SeqNo -=1;
    //    this.isShowbindmaingridDetails=false;
    //    this.isShowmaingridDetailsSummary=true;
       
    // }
    // else if((this.CustomerAccountNo=="6010002"  || this.CustomerAccountNo=="6010003" || this.CustomerAccountNo=="6010004" || this.CustomerAccountNo=="6010005") && (this.SeqNo==1 || this.SeqNo==2 || this.SeqNo==3))
    // {
    //   this.BindGrid(this.TransactionStatementForm.controls["UserId"].value,this.TransactionStatementForm.controls["FromDate"].value,this.TransactionStatementForm.controls["ToDate"].value,this.SeqNo,this.Summary_SeqNo);
     
    // }






    // this.BindGrid(this.TransactionStatementForm.controls["UserId"].value,this.TransactionStatementForm.controls["FromDate"].value,this.TransactionStatementForm.controls["ToDate"].value,this.SeqNo,this.Summary_SeqNo);
    // this.TSService.NextRecordBind(this.TransactionStatementForm.controls["UserId"].value,this.TransactionStatementForm.controls["FromDate"].value,this.TransactionStatementForm.controls["ToDate"].value,this.SeqNo).
    //   subscribe((data) => {
    //   //this.statementOfExpenses_Default=data.Table;
    //  // this.StatementOfExpenseForm.controls['ToDate'].setValue(currentDate);
    //     if(data.Table.length!=0)
    //     {
    //       // this.StatementOfExpenseForm.controls["UserId"].setValue(data.Table[0].CustomerAccount);
    //       // this.StatementOfExpenseForm.controls["FromDate"].setValue(data.Table[0].FromDate);
    //       // this.StatementOfExpenseForm.controls["ToDate"].setValue(data.Table[0].ToDate);
    //       // this.BindStatementOfExpReport(data.Table[0].CustomerAccount,data.Table[0].FromDate,data.Table[0].ToDate,this.EvenOdd) ;
    //       this.BindGrid(this.TransactionStatementForm.controls["UserId"].value,this.TransactionStatementForm.controls["FromDate"].value,this.TransactionStatementForm.controls["ToDate"].value,this.SeqNo,this.Summary_SeqNo);
    //     }
    //     else{
    //       this.Summary_SeqNo +=1;
    //     }

    //   })




    // if(this.EvenOdd % 2 !=0)
    // {

    //   this.TSService.NextRecordBind(this.TransactionStatementForm.controls["UserId"].value,this.TransactionStatementForm.controls["FromDate"].value,this.TransactionStatementForm.controls["ToDate"].value,this.EvenOdd).
    //   subscribe((data) => {
    //     if(data.Table.length!=0)
    //     {
    //       //this.BindGrid(this.TransactionStatementForm.controls["UserId"].value,this.TransactionStatementForm.controls["FromDate"].value,this.TransactionStatementForm.controls["ToDate"].value,this.EvenOdd);
    //     }
    //   });
    // }
    // else
    // {
    //   this.BindGrid(this.TransactionStatementForm.controls["UserId"].value,this.TransactionStatementForm.controls["FromDate"].value,this.TransactionStatementForm.controls["ToDate"].value,this.EvenOdd-1);
    // }
  
    }
  // NextBind()
  // {
  //   if (this.Default_NoOfPage<=this.NoOfPage)
  //    {
  //     this.BindGrid(this.TransactionStatementForm.controls["UserId"].value,this.TransactionStatementForm.controls["FromDate"].value,this.TransactionStatementForm.controls["ToDate"].value,this.SeqNo,this.Summary_SeqNo);
  //     //this.BindGrid(this.CustomerAccount,this.FromDate,this.ToDate,this.SeqNo,this.Summary_SeqNo) ;
  //    }
  //    else
  //    {
  //     this.SeqNo -=1;
  //     this.isShowbindmaingridDetails=false;
  //     this.isShowmaingridDetailsSummary=true;
  //    }

  // }
  BindGrid(CustomerAccount,FromDate,ToDate,SeqNo,SummarySeqNo){
    // this.FromDate = this.datepipe.transform(FromDate, 'dd-MM-yyyy');
    // this.ToDate = this.datepipe.transform(ToDate, 'dd-MM-yyyy');
    // this.divMainGrid=true;
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    var UserId = this.Dbsecurity.Decrypt( Sessionvalue.UserId);
    // if(UserId=="30007" || UserId=="30008"){
    //   CustomerAccount =  this.Dbsecurity.Decrypt( Sessionvalue.AccountNo)
    // }
    // else{
    //   CustomerAccount = this.TransactionStatementForm.controls['CustomerAccount'].value;
    // }

    
    var JsonData ={
      "UserId" : UserId,
      "FromDate" :   FromDate   ,    // this.TransactionStatementForm.controls['FromDate'],
      "ToDate" :  ToDate  ,        //this.TransactionStatementForm.controls['ToDate']
      "CustomerAccount" : CustomerAccount,
      "SeqNo":SeqNo,
      "SummarySeqNo":SummarySeqNo
    }
    var currentContext = this;
    this.TSService.BindGrid(JsonData).subscribe(
      (data) => {

        debugger;
        // this.isShowbindmaingridDetails=true;
        currentContext.bindmaingridHeader = data.Table;

        // this.NoOfPage = data.Table1[4].NoOfPage;
          this.CustomerAccountNo = data.Table1[4].CustomerAccountNo;

        //  if((this.CustomerAccountNo=="6010001" || this.CustomerAccountNo=="6010003") && this.SeqNo==3)
        //  {
        //        // this.SeqNo -=1;
        //        this.isShowbindmaingridDetails=false;
        //        this.isShowmaingridDetailsSummary=true;
        //        this.bindmaingridDetailsSummary = data.Table2;
        //  }
        //  else if((this.CustomerAccountNo=="6010001" || this.CustomerAccountNo=="6010003") && (this.SeqNo==1 || this.SeqNo==2))
        //  {
        //     this.isShowbindmaingridDetails=true;
        //     this.isShowmaingridDetailsSummary=false;
        //     this.bindmaingridDetails = data.Table1;
        //     this.bindmaingridDetailsSummary = data.Table2;
        //  }

        //  if((this.CustomerAccountNo=="6010002" || this.CustomerAccountNo=="6010003" || this.CustomerAccountNo=="6010004" || this.CustomerAccountNo=="6010005") && this.SeqNo==4)
        //  {
        //     // this.SeqNo -=1;
        //     this.isShowbindmaingridDetails=false;
        //     this.isShowmaingridDetailsSummary=true;
        //     this.bindmaingridDetailsSummary = data.Table2;
        //  }
        //  else if((this.CustomerAccountNo=="6010002"  || this.CustomerAccountNo=="6010003" || this.CustomerAccountNo=="6010004" || this.CustomerAccountNo=="6010005") && (this.SeqNo==1 || this.SeqNo==2 || this.SeqNo==3))
        //  {
        //   this.isShowbindmaingridDetails=true;
        //   this.isShowmaingridDetailsSummary=false;
        //   this.bindmaingridDetails = data.Table1;
        //   this.bindmaingridDetailsSummary = data.Table2;
        //  }





        // if(this.NoOfPage >=this.SeqNo && this.CustomerAccountNo == data.Table1[4].CustomerAccountNo)
        // {
        //   this.isShowbindmaingridDetails=true;
        //   this.isShowmaingridDetailsSummary=false;
        //   currentContext.bindmaingridDetails = data.Table1;
        // }
        // else
        // {
        //   this.SeqNo -=1;
        //   this.isShowbindmaingridDetails=false;
        //   this.isShowmaingridDetailsSummary=true;
        //   currentContext.bindmaingridDetailsSummary = data.Table2;
        // }
        // if(this.UniqueSeqNo <= data.Table1[0].NoOfPage)
        // {
        //   this.isShowbindmaingridDetails=true;
        //   this.isShowmaingridDetailsSummary=false;
        //   currentContext.bindmaingridDetails = data.Table1;
        // }
        // else
        // {
        //   this.isShowbindmaingridDetails=false;
        //   this.isShowmaingridDetailsSummary=true;
        //   currentContext.bindmaingridDetailsSummary = data.Table2;
        // }





        this.isShowbindmaingridDetails=true;
        this.isShowmaingridDetailsSummary=false;
        currentContext.bindmaingridDetails = data.Table1;  
       // currentContext.bindmaingridDetailsSummary = data.Table2;  
        });
  }
  onSubmit() {
    this.SeqNo=1;
    debugger;
    //alert('OnSubmi Clicked');
    //this.submitted = true;
    if (this.TransactionStatementForm.valid) {
        //this.sucess=true;
        const datat = this.TransactionStatementForm.value;

       
        // var CustomerAccount="Cust_000001";
        // var Date="2020-04-09";
       // var CustomerAccount:
        if(datat.UserId=="0")
        {
         //this.CustomerAccount=this.accountNumber
          this.CustomerAccount=datat.UserId; //change to discuss with vipul
        }
        else{
         this.CustomerAccount=datat.UserId;

        }
        // var CustomerAccount="Cust_000001";
        // var Date="2020-04-09";
       // var CustomerAccount:
       
        
        var FromDate=datat.FromDate;
        var ToDate=datat.ToDate;
        this.BindGrid(this.CustomerAccount,FromDate,ToDate,this.SeqNo,this.Summary_SeqNo);
    } 
  }
ConvertToCSV(objArray) {
      this.HeaderArray = {
        TransactionDesc: "Transaction Description", TransactionDate: "Transaction Date", SettlementDate: "Settlement Date", Security: "Security",
        Exchange: "Exchange", Quantity: "Quantity", UnitPrice: "UnitPrice", Brkg: "Brkg", STT: "STT", SettlementAmount: "SettlementAmount"
    }
    this.StaticArray = {value:"ADROIT PMS SERVICES PVT LTD",value1:"MUMBAI",value2:"TRANSACTION STATEMENT",
  value3:"From " + this.FromDate +" To " + this.ToDate ,value4:"Account : 6010001     RUBY DECOSTA   - ADT001",
value5:"ADROITPMS1"}
this.StaticArray1={value:"Current Period Transactions",value1:"Current Period Settled  Transactions"
,value3:"Shares - Listed"}

  var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  var str = '';
  var row = "";

     for (var i = 0; i < array.length; i++) {
      var line = "";

      if (i == 0) {
        for (var index in this.StaticArray) {
            if (line != '') line += ','

            line += this.StaticArray[index];
            str += line + '\r\n';
            line = "";
        }
        
    }
    line = '';
      if (i == 0) {
          for (var index in this.HeaderArray) {
              if (line != '') line += ','

              line += this.HeaderArray[index];
          }
          str += line + '\r\n';
      }
      line = '';
      if (i == 0) {
        for (var index in this.StaticArray1) {
            if (line != '') line += ','

            line += this.StaticArray1[index];
            str += line + '\r\n';
            line = "";
        }
        
    }
      line = '';
      for (var index in array[i]) {
          if (line != '') line += ','
          line += (<string>array[i][index]);
      }
      str += line + '\r\n';
  }
  return str;
}
downloadCSVFile() {
    var csvData = this.ConvertToCSV(JSON.stringify(this.bindmaingridDetails));
    var a = document.createElement("a");
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    var blob = new Blob([csvData], { type: 'text/csv' });
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = 'TransactionStatement.csv';/* your file name*/
    a.click();
    return 'success';
}
downloadPDFFile(){
   
  debugger;  
  // var doc = new jsPDF();  
 
  // doc.setFontSize(11);
  // doc.setTextColor(100);


  // (doc as any).autoTable({
  //   head: this.head,
  //   body: this.bindmaingridDetails,
  //   theme: 'plain',
  //   didDrawCell: data => {
  //     console.log(data.column.index)
  //   }
  // })
  //     // Open PDF document in new tab
  //   doc.output('dataurlnewwindow')
  
  //   // Download PDF document  
  //   doc.save('StatementOfExpenses.pdf');



  var data = document.getElementById('bankmastertable');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('Transaction_Statement.pdf'); // Generated PDF   
    });    
  

}

}
