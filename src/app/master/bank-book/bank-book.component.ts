import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { BankbookService } from '../../Services/BankBook/bankbook.service';
import { Bindgrid } from '../../../Models/BankBook/bindgrid';
import { Totalsumgrid } from '../../../Models/BankBook/totalsumgrid';
import { Header } from '../../../Models/BankBook/header';
import { Bindemployee } from '../../../Models/BankBook/bindemployee'
import { Allcustomers } from '../../../Models/BankBook/Allcustomers';
import { DatePipe } from '@angular/common';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Commonfields } from '../../../Models/commonfields';
import{DbsecurityService}from '../../Services/dbsecurity.service';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
//import html2canvas from 'html2canvas';  


@Component({
  selector: 'app-bank-book',
  templateUrl: './bank-book.component.html',
  styleUrls: ['./bank-book.component.css']
})
export class BankBookComponent implements OnInit {
  BindgridList:Bindgrid;BankBookForm:FormGroup;TotalsumgridData:Totalsumgrid;Buy_SellAmount:any;Income:any;
  Expenses:any;Dep_with:any;Balance:any;griddiv:boolean=false;HeaderArray:any=[];StaticArray:any=[];
  FromDate:any;ToDate:any;Head=[];StaticArray1:any=[];StaticArray2:any=[];BindCustomersList:Allcustomers;
  loader1:boolean=false;loader2:boolean=false;divCustomer:boolean=false;userType:number;HeaderList:Header;
  divEmployee:boolean=false;BindemployeesList:Bindemployee;CustomerAccount:any;PageCount:any;UserId:any;
  TotalRecord:any;PaginationCount:any;divTotal:boolean=true;Code:any="";NoOfPage:any="";Flag:any;
  NoRecord:boolean=true;btnNext:boolean=true;btnPrev:boolean=true;

  constructor(private BSService : BankbookService,private router: Router, 
    private formBuilder: FormBuilder,public datepipe: DatePipe, private Dbsecurity: DbsecurityService) { }

  ngOnInit(): void {
   
    this.loader1 = true; this.loader2 = true;
    this.BankBookForm = this.formBuilder.group({  
      FromDate :[''], ToDate : [''],CustomerAccount : ['',] , EmployeeId : ['']
  });
  let item = JSON.parse(sessionStorage.getItem('User'));  
  this.userType=this.Dbsecurity.Decrypt( item.UserType);
if(this.userType == 3){
  this.UserId = this.Dbsecurity.Decrypt(item.UserId);
  this.CustomerAccount = ""; 
  this.divCustomer=true;
  this.divEmployee=true;
  this.BindEmployee();
}

  else if(this.userType == 2){
    this.UserId = this.Dbsecurity.Decrypt(item.UserId);
    this.CustomerAccount = "";
    this.divCustomer=true;
    this.divEmployee=false;
    this.BindCustomers();
  }

  else{
    this.UserId = this.Dbsecurity.Decrypt(item.UserId);
    this.CustomerAccount = this.Dbsecurity.Decrypt(item.AccountNo);
  }
  this.PageCount = 1;
  this.BindDefaultData();
  this.loader1 = false; this.loader2 = false;
  }

  BindNextData(value){
    if(value == 1){this.PageCount = this.PageCount+1;}
    else if(value == 0){this.PageCount = this.PageCount-1;}
    if(this.PageCount >= 1){
    if(this.PageCount != 0 || this.PageCount !="" ){
      this.loader1=true;this.loader2=true;
    this.griddiv=true;
    if(this.userType == 3){
      this.BindGrid(this.FromDate,this.ToDate);
    } 
    else if(this.userType == 1 ){
      this.BindGrid(this.FromDate,this.ToDate);
    } 
    else if(this.userType == 2){
      this.BindGrid(this.FromDate,this.ToDate);
    }
    else{this.NextData();}
  }
}
else{ this.PageCount = 1;}
  }

  
  NextData(){
    if(this.userType == 3 ){
      this.CustomerAccount="";
    }
    var JsonData ={
      "UserId" : this.UserId,
      "CustomerAccount" : this.CustomerAccount ,
      "PageCount" : this.PageCount
    }
    this.BSService.BindNextData(JsonData).subscribe(
      (data) => {
        this.FromDate = data.Table[0]["FromDate"];
        this.ToDate = data.Table[0]["ToDate"];
        if(this.userType != 3 ){
        this.CustomerAccount = data.Table[0]["CustomerAccount"];
        }
        this.BindGrid(this.FromDate,this.ToDate);
      });  
  }

  
  BindDefaultData(){
    this.loader1=true;this.loader2=true;
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    var JsonData ={
      "UserId" : this.UserId,
      "CustomerAccount" : this.CustomerAccount ,
      "PageCount" : this.PageCount
    }
    this.BSService.BindDefaultData(JsonData).subscribe(
      (data) => {
        this.FromDate = data.Table[0]["FromDate"];
        this.ToDate = data.Table[0]["ToDate"];
        this.BankBookForm.controls["FromDate"].setValue(data.Table[0].FromDate);
        this.BankBookForm.controls["ToDate"].setValue(data.Table[0].ToDate);
        this.BankBookForm.controls["CustomerAccount"].setValue(data.Table[0].CustomerAccount);
        if(this.userType != 1 ){
        this.CustomerAccount = data.Table[0].CustomerAccount;
        }
        if(this.userType != 3 ){
          this.CustomerAccount = data.Table[0].CustomerAccount;
          }
        this.PageCount = 1;
        this.griddiv=true;  
        this.BindDefaultGrid();     
      });
      this.loader1=false;this.loader2=false;
      
  }
  BindDefaultGrid(){
    this.loader1=true;this.loader2=true;
    var JsonData ={
      "UserId" : this.UserId,
      "FromDate" : this.FromDate,   
      "ToDate" :  this.ToDate,
      "CustomerAccount" : this.CustomerAccount,
      "PageCount" : this.PageCount       
    }

    this.BSService.BindGrid(JsonData).subscribe(
      (data) => {
        this.BindgridList = data.Table; 
        this.TotalsumgridData = data.Table1;
        this.HeaderList = data.Table2;
        this.Buy_SellAmount=this.TotalsumgridData[0].Buy_SellAmount;
        this.Income=this.TotalsumgridData[0].Income;
        this.Expenses=this.TotalsumgridData[0].Expenses;
        this.Dep_with=this.TotalsumgridData[0].Dep_with;
        this.Balance=this.TotalsumgridData[0].Balance;
        this.NoRecord = false;
        });
      this.loader1=false;this.loader2=false;
  }

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

  SearchData(FromDate,ToDate){
    this.FromDate = FromDate;
    this.ToDate = ToDate;
    this.CustomerAccount = this.BankBookForm.controls['CustomerAccount'].value;
    this.PageCount = 1;
    this.BindGrid( this.FromDate, this.ToDate);
  }


  BindGrid(FromDate,ToDate){
    debugger;
    this.loader1=true;this.loader2=true;
    if(this.FromDate == ""){
    this.FromDate = this.datepipe.transform(FromDate, 'dd-MM-yyyy');
    this.ToDate = this.datepipe.transform(ToDate, 'dd-MM-yyyy');
    }
    this.griddiv=true;
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    var UserId = this.Dbsecurity.Decrypt( Sessionvalue.UserId);
    var CustomerAccount="";
    if(UserId=="30007" ||
    UserId=="30008"){
      CustomerAccount =  this.Dbsecurity.Decrypt( Sessionvalue.AccountNo)
    }
    else{
      CustomerAccount = this.BankBookForm.controls['CustomerAccount'].value;
    }

    var JsonData ={
      "UserId" : this.UserId,
      "FromDate" :   FromDate,   
      "ToDate" :  ToDate,
      "CustomerAccount" : this.CustomerAccount,
      "PageCount" : this.PageCount         

    }
    this.BSService.BindGrid(JsonData).subscribe(
      (data) => {
        debugger;
        this.BindgridList = data.Table; 
        this.TotalsumgridData = data.Table1;
        this.HeaderList = data.Table2;
        this.Buy_SellAmount=this.TotalsumgridData[0].Buy_SellAmount;
        this.Income=this.TotalsumgridData[0].Income;
        this.Expenses=this.TotalsumgridData[0].Expenses;
        this.Dep_with=this.TotalsumgridData[0].Dep_with;
        this.Balance=this.TotalsumgridData[0].Balance;
        this.TotalRecord=this.TotalsumgridData[0].Total;
        if((data.Table.length !=0) && (data.Table1.length !=0) && (data.Table2.length !=0) )
          {
            this.btnNext=true;
            this.NoRecord = false;
          }
          else{
            this.btnNext = false;
            this.btnPrev=true;
            this.NoRecord = true;
            }
           

        // if(data.Table.lenght == 0  && data.Table2.lenght == 0 ){ 
        //   this.NoRecord = true;
        //   this.PageCount = this.PageCount + 1;
        // }
        // else{
        //   this.NoRecord = false;
        // }
        //this.divTotal=false;
      //   if(this.Flag !=""){
      //     this.Flag = this.Flag +1;
      //   }
      //   if( this.NoOfPage == ""){
      //   this.NoOfPage = this.BindgridList[0].NoOfPage;
      //   this.Code = this.BindgridList[0].Code;
      //   this.Flag = 1;
      //   }
      //  if(this.NoOfPage == this.Flag &&  this.Code == this.BindgridList[0].Code){
      //    // this.divTotal = true;
      //     this.NoOfPage = "";
      //     this.Code = "";
      //  }
      //  if(this.BindgridList[0].NoOfPage == 0){
      //   this.divTotal=true;
      //   this.NoOfPage == "";
      // }
      //  else{
      //    this.Flag = 1;
      //  }




        this.loader1=false;this.loader2=false;
       // this.PaginationCount = (this.PaginationCount + data.Table1.length) + " Out " + this.TotalRecord;
        });
  }

  PreviousDayFun(){
    var date = new Date();
    var currentDate = date.toISOString().slice(0,10);
    this.BankBookForm.controls['ToDate'].setValue(currentDate);
    date.setDate(date.getDate() - 1);
    var yesterday = date.toISOString().slice(0,10);
    this.BankBookForm.controls['FromDate'].setValue(yesterday);
  }

  LastOneWeekFun(){
    var date = new Date();
    var currentDate = date.toISOString().slice(0,10);
    this.BankBookForm.controls['ToDate'].setValue(currentDate);
    date.setDate(date.getDate() - 7);
    var yesterday = date.toISOString().slice(0,10);
    this.BankBookForm.controls['FromDate'].setValue(yesterday);
  }
  LastOneMonthFun(){
    var date = new Date();
    var currentDate = date.toISOString().slice(0,10);
    this.BankBookForm.controls['ToDate'].setValue(currentDate);
    date.setDate(date.getDate() - 30);
    var yesterday = date.toISOString().slice(0,10);
    this.BankBookForm.controls['FromDate'].setValue(yesterday);
  }
  ConvertToCSV(objArray) {
    this.HeaderArray = {
      Code: "Code", Name: "Name", BankAcc: "BankAcc", BankName: "BankName",SetDate:"Set Date",
      TransAccount: "Tran Account", TransactionDesc: "Transaction Description", Security: "Security",
      Buy_SellAmount: "Buy/Sell Amount", Income: "Income", Expenses: "Expenses",Dep_with:"Dep/with",
      Balance:"Balance",CustodianAcc:"Custodian Account",AccountCode:"Account Code"
  }
  this.StaticArray = {value:"ADROIT PMS SERVICES PVT LTD",value1:"MUMBAI",value2:"Bank Book",
value3:"From " + this.FromDate +" To " + this.ToDate ,
value5:"ADROITPMS1"}

this.StaticArray1={value:"Bank Total",value1:"",value2:"",value3:"",value4:"",value5:""
,value6:"",value7:"",value8:this.Buy_SellAmount,value9:this.Income,value10:this.Expenses,value11:this.Dep_with,value12:this.Balance}

this.StaticArray2={value:"Total",value1:"",value2:"",value3:"",value4:"",value5:""
,value6:"",value7:"	Closing Balance",value8:this.Buy_SellAmount,value9:this.Income,value10:this.Expenses,value11:this.Dep_with,value12:this.Balance}


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
    for (var index in array[i]) {
      if(index != "FinalSecNo"){
        if(index != "NoOfPage"){
        if (line != '') line += ','
        line += (<string>array[i][index]);
        }
      }
    }
    str += line + '\r\n';
}
var line = "";
  for (var index in this.StaticArray1) {
      if (line != '') line += ','
      line += this.StaticArray1[index];
  }  
  str += line + '\r\n';
  var line = "";
  for (var index in this.StaticArray2) {  
      if (line != '') line += ','
      line += this.StaticArray2[index];   
  }  
  str += line + '\r\n';
return str;
}
downloadCSVFile() {
  var csvData = this.ConvertToCSV(JSON.stringify(this.BindgridList));
  var a = document.createElement("a");
  a.setAttribute('style', 'display:none;');
  document.body.appendChild(a);
  var blob = new Blob([csvData], { type: 'text/csv' });
  var url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = 'BankBook.csv';/* your file name*/
  a.click();
  return 'success';
}

 downloadPDFFile(){
   
//   debugger;  
//   // var doc = new jsPDF();  
 
//   // doc.setFontSize(11);
//   // doc.setTextColor(100);

//   // if(this.EvenOdd % 2 !=0)
//   // {
//   //   (doc as any).autoTable({
//   //     head: this.head,
//   //     body: this.statementOfExpenses4,
//   //     theme: 'plain',
//   //     didDrawCell: data => {
//   //       console.log(data.column.index)
//   //     }
//   //   })
//   //     // Open PDF document in new tab
//   //   doc.output('dataurlnewwindow')
  
//   //   // Download PDF document  
//   //   doc.save('StatementOfExpenses.pdf');
//   // }
//   // else
//   // {
//   //   (doc as any).autoTable({
//   //     head: this.head,
//   //     body: this.statementOfExpenses5,
//   //     theme: 'plain',
//   //     didDrawCell: data => {
//   //       console.log(data.column.index)
//   //     }
//   //   })
//   //     // Open PDF document in new tab
//   //   doc.output('dataurlnewwindow')
  
//   //   // Download PDF document  
//   //   doc.save('StatementOfExpenses_Summary.pdf');
//   // }

  // var data = document.getElementById('bankmastertable');  
  //   html2canvas(data).then(canvas => {  
  //     // Few necessary setting options  
  //     var imgWidth = 208;   
  //     var pageHeight = 295;    
  //     var imgHeight = canvas.height * imgWidth / canvas.width;  
  //     var heightLeft = imgHeight;  
  
  //     const contentDataURL = canvas.toDataURL('image/png')  
  //     let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
  //     var position = 0;  
  //     pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
  //     pdf.save('BankBook.pdf'); // Generated PDF   
  //   });    
  

}
}
