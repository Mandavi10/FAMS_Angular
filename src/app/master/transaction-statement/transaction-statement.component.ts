import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { TransactionstatementService } from '../../Services/TransactionStatement/transactionstatement.service';
import { Bindmaingrid } from '../../../Models/TransactionStatement/bindmaingrid';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Commonfields } from '../../../Models/commonfields';
import {Bindcustomerallfields} from '../../../Models/SummaryReport/Bindcustomerallfields';
import{DbsecurityService}from '../../Services/dbsecurity.service';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-transaction-statement',
  templateUrl: './transaction-statement.component.html',
  styleUrls: ['./transaction-statement.component.css']
})
export class TransactionStatementComponent implements OnInit {
  BindmaingridList : Bindmaingrid;TransactionStatementForm : FormGroup;HeaderArray:any=[];divMainGrid:boolean=false;
  StaticArray:any=[];FromDate:any;ToDate:any;StaticArray1:any=[];  head = [];divCustomer:boolean=false;
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
    this.router.navigate(['/Home']);
    this.router.navigate(['/TransactionStatement']);
    this.TransactionStatementForm = this.formBuilder.group({  
      FromDate :[''], ToDate : [''],CustomerAccount:['']
  });
        let item = JSON.parse(sessionStorage.getItem('User'));  
        this.userType=this.Dbsecurity.Decrypt( item.UserType);
        if(this.userType == 2)
        {
          this.divCustomer=true;
          this.BindCustomers();
        }
        else{
          this.divCustomer=false;
        } 
  }

  BindCustomers(){
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    let  Data = new Commonfields();
    Data.UserId = Sessionvalue.UserId;
    this.TSService.BindCustomers(JSON.stringify(Data)).subscribe(
      (data) => {
           this.BindcustomerallfieldsList = data.Table;
      });
  }

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

  BindGrid(FromDate,ToDate,CustomerAccount){
    this.FromDate = this.datepipe.transform(FromDate, 'dd-MM-yyyy');
    this.ToDate = this.datepipe.transform(ToDate, 'dd-MM-yyyy');
    this.divMainGrid=true;
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    var UserId = Sessionvalue.UserId;
    var JsonData ={
      "UserId" : UserId,
      "FromDate" :   FromDate   ,    // this.TransactionStatementForm.controls['FromDate'],
      "ToDate" :  ToDate  ,        //this.TransactionStatementForm.controls['ToDate']
      "CustomerAccount" : this.TransactionStatementForm.controls['CustomerAccount'].value
    }
    this.TSService.BindGrid(JsonData).subscribe(
      (data) => {
        this.BindmaingridList = data.Table;        
        });
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
    var csvData = this.ConvertToCSV(JSON.stringify(this.BindmaingridList));
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
  var doc = new jsPDF();  
 
  doc.setFontSize(11);
  doc.setTextColor(100);


  (doc as any).autoTable({
    head: this.head,
    body: this.BindmaingridList,
    theme: 'plain',
    didDrawCell: data => {
      console.log(data.column.index)
    }
  })
      // Open PDF document in new tab
    doc.output('dataurlnewwindow')
  
    // Download PDF document  
    doc.save('StatementOfExpenses.pdf');

}

}
