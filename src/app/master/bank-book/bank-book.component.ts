import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { BankbookService } from '../../Services/BankBook/bankbook.service';
import { Bindgrid } from '../../../Models/BankBook/bindgrid';
import { Totalsumgrid } from '../../../Models/BankBook/totalsumgrid';
import { DatePipe } from '@angular/common';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bank-book',
  templateUrl: './bank-book.component.html',
  styleUrls: ['./bank-book.component.css']
})
export class BankBookComponent implements OnInit {
  BindgridList:Bindgrid;BankBookForm:FormGroup;TotalsumgridData:Totalsumgrid;Buy_SellAmount:any;Income:any;
  Expenses:any;Dep_with:any;Balance:any;griddiv:boolean=false;HeaderArray:any=[];StaticArray:any=[];
  FromDate:any;ToDate:any;
  constructor(private BSService : BankbookService,private router: Router, 
    private formBuilder: FormBuilder,public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.BankBookForm = this.formBuilder.group({  
      FromDate :[''], ToDate : ['']
  });
  }

  BindGrid(FromDate,ToDate){
    this.FromDate = this.datepipe.transform(FromDate, 'dd-MM-yyyy');
    this.ToDate = this.datepipe.transform(ToDate, 'dd-MM-yyyy');
    this.griddiv=true;
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    var UserId = Sessionvalue.UserId;
    var JsonData ={
      "UserId" : UserId,
      "FromDate" :   FromDate,   
      "ToDate" :  ToDate         
    }
    this.BSService.BindGrid(JsonData).subscribe(
      (data) => {
        this.BindgridList = data.Table; 
        this.TotalsumgridData = data.Table1;
        this.Buy_SellAmount=this.TotalsumgridData[0].Buy_SellAmount;
        this.Income=this.TotalsumgridData[0].Income;
        this.Expenses=this.TotalsumgridData[0].Expenses;
        this.Dep_with=this.TotalsumgridData[0].Dep_with;
        this.Balance=this.TotalsumgridData[0].Balance;
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
        if (line != '') line += ','
        line += (<string>array[i][index]);
    }
    str += line + '\r\n';
}
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

}
