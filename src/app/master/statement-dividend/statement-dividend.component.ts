import { Component, OnInit } from '@angular/core';
import{StatementDividentService} from '../../Services/StatementDividend/statement-divident.service';
import{statementDividend,pagination,DividendModel} from '../../../Models/StatementDividend/StatementDividend';
import {FormBuilder,FormControl,FormGroup,Validator, Validators} from '@angular/forms';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import{DbsecurityService}from '../../Services/dbsecurity.service';
import {Bindcustomerallfields} from '../../../Models/SummaryReport/Bindcustomerallfields';
import { SummaryreportService } from '../../Services/SummaryReport/summaryreport.service';
import { Commonfields } from '../../../Models/commonfields';

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
  StaticArray1={};
  ShowLoaderp:boolean;
  CustNameDive:boolean;
  BindcustomerallfieldsList : Bindcustomerallfields;



  StatementDividendForm:FormGroup;
  constructor(private _StatementDividendService:StatementDividentService,private formbuilder:FormBuilder,private Dbsecurity: DbsecurityService,private SRService : SummaryreportService) { }

  ngOnInit() {
    this.btnPrev=false;
    this.btnNext==false;
    this.Showcustdropdown(); 
    this.StatementDividendForm=this.formbuilder.group({
      Formdate:['',Validators.required],
      Todate:['',Validators.required] ,
      CustomerAccount:['',Validators.required] 
      //CustomerAccount
    })
    this.BindCustomers();
  }

Showcustdropdown(){ 
  let item = JSON.parse(sessionStorage.getItem('User'));
  var usertype=this.Dbsecurity.Decrypt(item.UserType);
  var userid=this.Dbsecurity.Decrypt(item.UserId);
  
  if(usertype == 2 ||usertype == 3 || usertype == 4){
    this.CustNameDive=true; 
    // this.StatementDividendForm=this.formbuilder.group({
    //   CustomerAccount:['',Validators.required] 
    // })
  }
  else{
    this.CustNameDive=false; 

  }
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


BindCustomers(){
  let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
  let  Data = new Commonfields();
  Data.UserId = Sessionvalue.UserId;
  this.SRService.BindCustomers(JSON.stringify(Data)).subscribe(
    (data) => {
         this.BindcustomerallfieldsList = data.Table;
    });
}

bindGrid(){
  
  let item = JSON.parse(sessionStorage.getItem('User'));
  var usertype=this.Dbsecurity.Decrypt(item.UserType);
  var userid, CustomerAccountNo;

  if(usertype == 2 ||usertype == 3 || usertype == 4){
   
    const IsCustomerAccount = this.StatementDividendForm.get('CustomerAccount');
    IsCustomerAccount.setValidators(Validators.required); IsCustomerAccount.updateValueAndValidity();
    CustomerAccountNo= this.StatementDividendForm.controls['CustomerAccount'].value;
  }
  else{
    const IsCustomerAccount = this.StatementDividendForm.get('CustomerAccount');
    IsCustomerAccount.clearValidators(); IsCustomerAccount.updateValueAndValidity();
    userid= item.UserId
    
  }
  this.submitted = true;
  if (this.StatementDividendForm.invalid) {
    alert('invalid')
    return;
  }
  else{
    
    // let item = JSON.parse(sessionStorage.getItem('User'));
    // var usertype=this.Dbsecurity.Decrypt(item.UserType);
    // var userid, CustomerAccountNo;
    
    // if(usertype == 2 ||usertype == 3 || usertype == 4){

      
    //   CustomerAccountNo= this.Dbsecurity.Encrypt(this.StatementDividendForm.controls['CustomerAccount'].value);
      
    // }
    // else
    // {
    //   userid= item.UserId
    // }
 var jasondata= {
  "fromdate":this.StatementDividendForm.controls['Formdate'].value ,
  "PageCount": this.PageCount,
  "todate":this.StatementDividendForm.controls['Todate'].value,
  "UserId": userid,
  "CustomerAccountNo": CustomerAccountNo
 
}
this.ShowLoaderp=true;
this._StatementDividendService.BindGrid(jasondata).subscribe((res)=>{
console.log(res);
this.bindgrid=res.Table;
this.bindgridDivident=res.Table1;
// this.pagination=res.Table1;


for(var i=0;i<res.Table.length;i++){
   
  if(this.bindgrid[i].ReceivedDate == ""){
    this.bindgrid[i].ReceivedDate = ''
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


this.StaticArray1={value:"Total",value1:"",value2:"",value3:"",value4:"",value5:""
         ,value6:this.SumReceivableAmount,value7:this.SumReceivedAmount,value8:this.SumTDSAmount,value9:this.SumNetAmount,value10:this.SumBalanceAmount}
             
  
  
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
  var line = "";
  for (var index in this.StaticArray1) {
      if (line != '') line += ','
      line += this.StaticArray1[index];
  }  
  str += line + '\r\n';
  var line = "";
  

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

downloadPDF(){
  // this.showhead=false;
  // const elementToPrint = document.getElementById('tbldiv'); //The html element to become a pdf
  // //const pdf = new jsPDF('p', 'pt', 'a4');
  // const pdf = new jsPDF();
  // pdf.addHTML(elementToPrint, () => {
  //     pdf.save('web.pdf');
  // });  
  var doc = new jsPDF('legal', 'pt','a3' );
  // doc.text("From HTML", 40, 50);legal
   //doc.text( 40, 50);
   var res = doc.autoTableHtmlToJson(document.getElementById("bankmastertable1"));
   var res1 = doc.autoTableHtmlToJson(document.getElementById("bankmastertable2"));

   console.log(res)
   console.log(res.data)
   console.log(res.data[0])
   doc.autoTable(res.columns, res1.data, {
     startY: 90
   });
  
   doc.save();
   
}




}
