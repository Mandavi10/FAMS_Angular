import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { TransactionstatementService } from '../../Services/TransactionStatement/transactionstatement.service';
import { Bindmaingrid } from '../../../Models/TransactionStatement/bindmaingrid';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-transaction-statement',
  templateUrl: './transaction-statement.component.html',
  styleUrls: ['./transaction-statement.component.css']
})
export class TransactionStatementComponent implements OnInit {
  BindmaingridList : Bindmaingrid;TransactionStatementForm : FormGroup;HeaderArray:any=[];divMainGrid:boolean=false;

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
    , private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.router.navigate(['/Home']);
    this.router.navigate(['/TransactionStatement']);
    this.TransactionStatementForm = this.formBuilder.group({  
      FromDate :[''], ToDate : ['']
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

  BindGrid(FromDate,ToDate){
    this.divMainGrid=true;
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    var UserId = Sessionvalue.UserId;
    var JsonData ={
      "UserId" : UserId,
      "FromDate" :   FromDate   ,    // this.TransactionStatementForm.controls['FromDate'],
      "ToDate" :  ToDate          //this.TransactionStatementForm.controls['ToDate']
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
  var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  var str = '';
  var row = "";

     for (var i = 0; i < array.length; i++) {
      var line = "";

      if (i == 0) {
          for (var index in this.HeaderArray) {
              if (line != '') line += ','

              line += this.HeaderArray[index];
          }
          str += line + '\r\n';
      }
      var line = '';
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

}
