import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { Router, ActivatedRoute } from '@angular/router';

import { TransactionstatementService } from '../../Services/TransactionStatement/transactionstatement.service';
import { PortfoliosummaryService } from '../../Services/PortfolioSummary/portfoliosummary.service';
import { BindmaingridHeader,BindPortfolioAllocation,BindPortfolioSummary,BindPortfolioPerformance,BindPortfolioAllocation_Total } from '../../../Models/PortfolioSummary/PortfolioSummary';

import { Customer} from '../../../Models/HoldingReport/holdingReport';
import { Bindcustomerallfields} from '../../../Models/SummaryReport/Bindcustomerallfields';
import { Bindemployee} from '../../../Models/StatementOfExpense/StatementOfExpenses';

import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
//import { DatePipe } from '@angular/common';
import { Commonfields } from '../../../Models/commonfields';

import{DbsecurityService}from '../../Services/dbsecurity.service';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { timer } from 'rxjs';
import html2canvas from 'html2canvas';  

@Component({
  selector: 'app-portfolio-summary',
  templateUrl: './portfolio-summary.component.html',
  styleUrls: ['./portfolio-summary.component.css']
})
export class PortfolioSummaryComponent implements OnInit {


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
  bindPortfolioAllocation : BindPortfolioAllocation;
  bindPortfolioSummary : BindPortfolioSummary;
  bindPortfolioPerformance : BindPortfolioPerformance;
  bindPortfolioAllocation_Total:BindPortfolioAllocation_Total;

  isShowBindmaingridDetails:boolean=false;
  showModalupdatepopup:boolean;
  PortfolioSummaryForm : FormGroup;HeaderArray:any=[];divMainGrid:boolean=false;
  StaticArray:any=[];FromDate:any;ToDate:any;StaticArray1:any=[];  head = [];isShowCustomer:boolean=false;
  BindcustomerallfieldsList:Bindcustomerallfields; userType:number;
  constructor(private router: Router,private TSService : PortfoliosummaryService
  , private formBuilder: FormBuilder, private Dbsecurity: DbsecurityService) { }

ngOnInit(): void {
      debugger;
      // this.router.navigate(['/Home']);
      // this.router.navigate(['/TransactionStatement']);
      this.PortfolioSummaryForm = this.formBuilder.group({  
        EmployeeId: [0, ],
        UserId: [0, ],
        AsOnDate :[''], 
       
        CustomerAccount:['']
      });
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
    this.PortfolioSummaryForm.controls["UserId"].setValue(0);
    this.isShowCustomer=true;
    this.BindEmployee();
    //this.BindCustomers();
  }
  else if(this.userType ==2)
  {
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
   if (this.PortfolioSummaryForm.controls["UserId"].value==0 && this.PortfolioSummaryForm.controls["AsOnDate"].value=="") 
  {
    this.BindDefaultLast(this.GAccountNumber,this.GUserId)
  }
      // this.TransactionStatementForm.controls["UserId"].setValue("6010005");
      // this.TransactionStatementForm.controls["FromDate"].setValue("2020-06-30");
      // this.TransactionStatementForm.controls["ToDate"].setValue("2020-06-30");
      // this.BindGrid("6010005","2020-01-01","2020-06-30",1);
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
     this.PortfolioSummaryForm.controls["UserId"].setValue(0);
    }
    else{
     this.PortfolioSummaryForm.controls["UserId"].setValue(data.Table[0].CustomerAccount);
    }

   }
   else
   {
    this.PortfolioSummaryForm.controls["UserId"].setValue(data.Table[0].CustomerAccount);
   }

  //this.TransactionStatementForm.controls["UserId"].setValue(data.Table[0].CustomerAccount);
  this.PortfolioSummaryForm.controls["AsOnDate"].setValue(data.Table[0].AsOnDate);
  this.BindGrid(data.Table[0].CustomerAccount,data.Table[0].AsOnDate,this.SeqNo) ;
  //this.BindGrid("6010001","2020-06-30",this.SeqNo) ;
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
}

PreviousClick()
{
  this.SeqNo-=1;
  //this.BindStatementOfExpReport(this.StatementOfExpenseForm.controls["UserId"].value,this.StatementOfExpenseForm.controls["FromDate"].value,this.StatementOfExpenseForm.controls["ToDate"].value,this.EvenOdd);
  this.BindGrid(this.PortfolioSummaryForm.controls["UserId"].value,this.PortfolioSummaryForm.controls["AsOnDate"].value,this.SeqNo);
}
NextClick()
{
  debugger;
  this.SeqNo+=1;
  this.BindGrid(this.PortfolioSummaryForm.controls["UserId"].value,this.PortfolioSummaryForm.controls["AsOnDate"].value,this.SeqNo);

  }

BindGrid(CustomerAccount,AsOnDate,SeqNo){
  let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
  var UserId = this.Dbsecurity.Decrypt( Sessionvalue.UserId);
  var JsonData ={
    "UserId" : UserId,
    "AsOnDate" :   AsOnDate   ,    // this.TransactionStatementForm.controls['FromDate'],
    "CustomerAccount" : CustomerAccount,
    "SeqNo":SeqNo
  }
  var currentContext = this;
  this.TSService.BindGrid(JsonData).subscribe(
    (data) => {

      debugger;
      // this.isShowbindmaingridDetails=true;
       currentContext.bindmaingridHeader = data.Table;
       currentContext.bindPortfolioAllocation = data.Table1;  
       currentContext.bindPortfolioSummary = data.Table2; 
       currentContext.bindPortfolioPerformance = data.Table3;
       currentContext.bindPortfolioAllocation_Total=data.Table4 
       // this.CustomerAccountNo = data.Table1[4].CustomerAccountNo;
      // this.isShowbindmaingridDetails=true;
      // this.isShowmaingridDetailsSummary=false;
      });
}
onSubmit() {
  this.SeqNo=1;
  debugger;
  if (this.PortfolioSummaryForm.valid) {
      //this.sucess=true;
      const datat = this.PortfolioSummaryForm.value;
      if(datat.UserId=="0")
      {
       //this.CustomerAccount=this.accountNumber
        this.CustomerAccount=datat.UserId; //change to discuss with vipul
      }
      else{
       this.CustomerAccount=datat.UserId;
      }
      var AsOnDate=datat.AsOnDate;
      var ToDate=datat.ToDate;
      this.BindGrid(this.CustomerAccount,AsOnDate,this.SeqNo);
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
  var csvData = this.ConvertToCSV(JSON.stringify(this.bindPortfolioSummary));
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
var data = document.getElementById('portfolioSummaryGridPdf');  
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
    pdf.save('Portfolio_Summary.pdf'); // Generated PDF   
  });    

}

}
