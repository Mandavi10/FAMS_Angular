import { Component, OnInit } from '@angular/core';
import{StatementDividentService} from '../../Services/StatementDividend/statement-divident.service';
import{statementDividend,pagination,DividendModel} from '../../../Models/StatementDividend/StatementDividend';
import {FormBuilder,FormControl,FormGroup,Validator, Validators} from '@angular/forms';


@Component({
  selector: 'app-statement-dividend',
  templateUrl: './statement-dividend.component.html',
  styleUrls: ['./statement-dividend.component.css']
})
export class StatementDividendComponent implements OnInit {

  public bindgrid:statementDividend;
  public downloadExcelgrid:statementDividend;
  public bindgridDivident:DividendModel; //DividendModel
  
  submitted = false;
  PageCount:number=1;
  btnPrev: boolean;
  btnNext:boolean;
  public pagination:pagination;
  public data:any;
  HeaderArray={};
  public SumReceivableAmount:number;
  public SumReceivedAmount:number;
  public SumTDSAmount:number;
  public SumNetAmount:number;
  public SumBalanceAmount:number;
 public SumTotal_Dividend_Received:number;
  public SumOutstanding_Divident:number;
  public SumTotal_Amount:number;
  public SumTDS_Amount:number;
  StaticArray={};
  ShowLoaderp:boolean;



  StatementDividendForm:FormGroup;
  constructor(private _StatementDividendService:StatementDividentService,private formbuilder:FormBuilder) { }

  ngOnInit() {
    this.btnPrev=false;
    this.btnNext==false;
    this.StatementDividendForm=this.formbuilder.group({
      Formdate:['',Validators.required],
      Todate:['',Validators.required]
    })
  }

  
  get f() {
    return this.StatementDividendForm.controls;
  }

  prevClick(){
    this.PageCount = this.PageCount - 1;
    this.bindGrid();
    if (this.PageCount == 1) {
        this.btnPrev=false;
    }
    else {
      this.btnPrev=true;
    }
    

}
nextClick(){
  this.PageCount = this.PageCount + 1;
  this.bindGrid();
  if (this.PageCount > 1) {
      this.btnPrev=true;
  }
  else {
    this.btnPrev=false;
  }
}

LastOneMonthFun(){
  var date = new Date();
  var currentDate = date.toISOString().slice(0,10);
  this.StatementDividendForm.controls['Todate'].setValue(currentDate);
  date.setDate(date.getDate() - 30);
  var yesterday = date.toISOString().slice(0,10);
  this.StatementDividendForm.controls['Formdate'].setValue(yesterday);
}

PreviousDayFun(){
  var date = new Date();
  var currentDate = date.toISOString().slice(0,10);
  console.log(currentDate);
  this.StatementDividendForm.controls['Todate'].setValue(currentDate);
  date.setDate(date.getDate() - 1);
  var yesterday = date.toISOString().slice(0,10);
  console.log(yesterday);
  this.StatementDividendForm.controls['Formdate'].setValue(yesterday);

  
        
}

LastOneWeekFun(){
  var date = new Date();
  var currentDate = date.toISOString().slice(0,10);
  console.log(currentDate);
  this.StatementDividendForm.controls['Todate'].setValue(currentDate);
  date.setDate(date.getDate() - 7);
  var yesterday = date.toISOString().slice(0,10);
  console.log(yesterday);
  this.StatementDividendForm.controls['Formdate'].setValue(yesterday);
}


bindGrid(){
  this.submitted = true;
  if (this.StatementDividendForm.invalid) {
    return;
  }
  else{
    let item = JSON.parse(sessionStorage.getItem('User'));

 var jasondata= {
  "fromdate":this.StatementDividendForm.controls['Formdate'].value ,
  "PageCount": this.PageCount,
  "todate":this.StatementDividendForm.controls['Todate'].value,
  "UserId": item.UserId,
 
}
this.ShowLoaderp=true;
this._StatementDividendService.BindGrid(jasondata).subscribe((res)=>{
console.log(res);
this.bindgrid=res.Table;
this.bindgridDivident=res.Table1;
// this.pagination=res.Table1;


for(var i=0;i<res.Table.length;i++){
   
  if(this.bindgrid[i].ReceivedDate == ""){
    this.bindgrid[i].ReceivedDate = '#####'
    // this.bindgrid1[i].FromDate = ''
    // this.bindgrid1[i].Amount = ''
  }
  

}



this.SumReceivableAmount=res.Table2[0].SumReceivableAmount;
this.SumReceivedAmount=res.Table2[0].SumReceivedAmount;
this.SumTDSAmount=res.Table2[0].SumTDSAmount;
this.SumNetAmount=res.Table2[0].SumNetAmount;
this.SumBalanceAmount=res.Table2[0].SumBalanceAmount;

this.SumTotal_Dividend_Received=res.Table3[0].SumTotal_Dividend_Received;
this.SumOutstanding_Divident=res.Table3[0].SumOutstanding_Divident;
this.SumTotal_Amount=res.Table3[0].SumTotal_Amount;
this.SumTDS_Amount=res.Table3[0].SumTDS_Amount;


console.log(this.bindgrid)
console.log(this.pagination)
this.ShowLoaderp=false;

})
}

}




ConvertToCSV(objArray) {   //kislay

  this.HeaderArray = {
    ExDate: "ExDate", ReceivedDate: "ReceivedDate", Security: "Security", Quantity: "Quantity",
    Rate: "Rate", Amount: "Amount", ReceivableAmount: "ReceivableAmount", ReceivedAmount: "ReceivedAmount", TDSAmount
           : "TDSAmount"    , NetAmount: "NetAmount", BalanceAmount: "BalanceAmount"
           }
           this.StaticArray = {value:"ADROIT PMS SERVICES PVT LTD",value1:"MUMBAI",value2:"STATEMENT OF DIVIDEND",
           value3:"From " + this.StatementDividendForm.controls['Formdate'].value +" To " +this.StatementDividendForm.controls['Todate'].value ,value4:"Account : 6010001     RUBY DECOSTA   - ADT001",
         value5:"ADROITPMS1"}
  
  
  var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  var str = '';
  var row = "";  
  for (var index in objArray[0]) {
      //Now convert each value to string and comma-separated
      row += index + ',';
  }
  row = row.slice(0, -1);
  //append Label row with line break
  //str += row + '\r\n';
  for (var i = 0; i < array.length; i++) {
      var line = '';

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
      var line = '';
      for (var index in array[i]) {
        // if(index != "UploadHeaderId"){
        //   if(index != "TLUID" ){
        //     if(index != "Rowno"){
        //       if(index != "legacyUploadedID"){
          if (line != '') line += ','  
          line += array[i][index];
        //     }
        //   }
        // }
        // }
      }
      str += line + '\r\n';
  }
  return str;
}

downloadMainGrid() {   //real downlad grid
  
      var csvData = this.ConvertToCSV(JSON.stringify(this.bindgrid));
       var a = document.createElement("a");
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        var blob = new Blob([csvData], { type: 'text/csv' });
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = 'CapitalStatement.csv';/* your file name*/
         a.click();
         return 'success';
 // });
}



}
