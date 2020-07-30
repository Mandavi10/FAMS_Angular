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
import{CapitalStatementModel,BindEmployees,BindCustomer} from '../../../Models/CapitalStatement/capitalStatement';
import{CapitalSatementService} from '../../Services/CapitalStatement/capital-satement.service';
import html2canvas from 'html2canvas';

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
  public data1={};
  FromDate:string;
  ToDate:string;
  CustomerAccount:string;
  BindemployeesList:BindEmployees;
  divEmployee:boolean;
  count:number=0;
  ISSummary:boolean=false;
  ISMaingrid:boolean=true; 
  showModalsavepopup:boolean;
  totalpagecount:number;
  totalcustomer:number;
  IsshowHeading:boolean;
  showGrid:boolean;
  



  StatementDividendForm:FormGroup;
  constructor(private _StatementDividendService:StatementDividentService,private formbuilder:FormBuilder,private Dbsecurity: DbsecurityService,private _capitalStateService:CapitalSatementService) { }

  ngOnInit() {
    this.btnPrev=false;
    this.btnNext==false;
    this.Showcustdropdown(); 
    this.StatementDividendForm=this.formbuilder.group({
      Formdate:['',Validators.required],
      Todate:['',Validators.required] ,
      CustomerAccount:['',Validators.required],
      Employee1:['',Validators.required]
      //CustomerAccount
    })
    // this.BindCustomers();
    this.BindDefaultData();
  }
  onClicksavepopup() {
    this.showModalsavepopup = true;
  }
  hidesavepopup() {
    this.showModalsavepopup = false;
   }

Showcustdropdown(){ 
  let item = JSON.parse(sessionStorage.getItem('User'));
  var usertype=this.Dbsecurity.Decrypt(item.UserType);
  var userid1=this.Dbsecurity.Decrypt(item.UserId);

  if(usertype == 2 || usertype == 4){
    this.CustNameDive=true;
    this.divEmployee=false;

   this.BindCustomers();
  }
  else{
    this.CustNameDive=false;
    this.divEmployee=false;

  }

  if(usertype == 3){
   // this.UserId = this.Dbsecurity.Decrypt(item.UserId);
    this.CustomerAccount = "";
    this.CustNameDive=true;
    this.divEmployee=true;
    
    this.BindEmployee();

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



BindNextData(value){


if(value==0){
this.ISMaingrid=false;
this.ISSummary=true;

}
else if(value == 1){
  this.ISMaingrid=true;
this.ISSummary=false;

}


  // // this.loader1=true;this.loader2=true;
  // if(value == 1){
   

  //   this.PageCount = this.PageCount+1;

  //   if(this.PageCount%2 != 0){
  //     this.ISSummary=false;
  //     this.ISMaingrid=true;

  //    // this.NextData(value);
  //   }
  //   else{
  //     this.ISSummary=true;
  //     this.ISMaingrid=false;
  //     //this.NextData();
  //   }
  // }
  // else if(value == 0){
   
  //   this.PageCount = this.PageCount-1;
  //   if(this.PageCount%2 != 0){
  //     this.ISSummary=false;
  //     this.ISMaingrid=true;

  //    // this.NextData(value);
  //   }
  //   else{
  //     this.ISSummary=true;
  //     this.ISMaingrid=false;
  //     //this.NextData();
  //   }
  //}
  // this.griddiv=true;
  //  this.NextData();

  // this.bindGrid();



}



NextData(value){

  let item = JSON.parse(sessionStorage.getItem('User'));
  var totalpagecount;
  //item.userid;
  
// if(value == 1){
//   this.count++;
// var pagecountn= this.PageCount-(this.count*1);
// }
// else{
//   this.count++;
//   var pagecountn= this.PageCount;
// }
var Usertype=this.Dbsecurity.Decrypt(item.UserType);
      

if(value == 1){
  
 this.PageCount=this.PageCount+1;
 if(this.PageCount >1){
this.btnPrev=true;
 }
 if(Usertype == 3){
 if(this.PageCount == this.totalpagecount){
   this.btnNext=false; 
   

 }
}
if(Usertype == 2){
  // alert(this.PageCount)
  // alert(this.totalcustomer)
  if(this.PageCount == this.totalcustomer){
    this.btnNext=false;
  // return false;
    
 
  }
 }



//  if(this.PageCount%2 == 0){ this.totalcustomer
//   if(this.StatementDividendForm.controls['CustomerAccount'].value != 0){
//     this.btnNext=false;
//     this.btnPrev=true;
//     }
//     else{
//       this.btnPrev=true;

//     }
//  }
}
else if(value == 0){

  
  this.PageCount=this.PageCount-1; 

  if(Usertype == 3){
    if(this.PageCount < this.totalpagecount){
      this.btnNext=true;
      
   
    }
   }
  
  if(this.PageCount == 1){
    this.btnPrev=false;
    this.btnNext=true;
 
  }

  // if(this.PageCount%2 != 0){
  //   if(this.StatementDividendForm.controls['CustomerAccount'].value != 0){
  //     this.btnNext=true;
  //     this.btnPrev=false;

  //   }
  // }
}
// this.count++;
// var pagecountn= this.PageCount-(this.count*1);
this.data=' ';

  var JsonData ={
    "UserId" : item.UserId,
    "CustomerAccountNo" :this.StatementDividendForm.controls['CustomerAccount'].value,
    "PageCount" : this.PageCount
  }

  var pagecountb=this.PageCount;

  this._StatementDividendService.BindNextData(JsonData).subscribe(
    (data) => {

      if(data.Table.length!=0){
      this.FromDate = data.Table[0]["FromDate"];
      this.ToDate = data.Table[0]["ToDate"];
      // this.CustomerAccount = "";
      // this.CustomerAccount = this.Dbsecurity.Encrypt(data.Table[0]["CustomerAccountNo"]);

     // this.CustomerAccount = this.Dbsecurity.Encrypt(data.Table[0]["CustomerAccountNo"]); 
      
      if(this.StatementDividendForm.controls['CustomerAccount'].value != 0){
        var pagecount=1; 
         this.CustomerAccount = this.Dbsecurity.Encrypt(data.Table[0]["CustomerAccountNo"]); 

       }
       else{
      this.CustomerAccount=this.Dbsecurity.Encrypt(this.StatementDividendForm.controls['CustomerAccount'].value);
        // this.btnNext=true;
         
       }

       

       var Usertype=this.Dbsecurity.Decrypt(item.UserType);
     

       if(Usertype == 2){
        this.CustomerAccount = this.Dbsecurity.Encrypt(data.Table[0]["CustomerAccountNo"]); 
      }
  
      // if(Usertype == 3 && this.capitalStatForm.controls['CustomerAccount'].value == 0){

      //   this.CustomerAccount = this.Dbsecurity.Encrypt('6010002');
      // }
       var pagecount=pagecountb;
      var JsonData ={
        "UserId" : item.UserId,
        "fromdate" : this.FromDate,
        "todate" :  this.ToDate,
        "CustomerAccountNo" : this.CustomerAccount ,
        "PageCount" :pagecount
      }
      this.ShowLoaderp=true;
      this.showGrid=false;
      this._StatementDividendService.BindGrid(JsonData).subscribe((res)=>{
      console.log(res);
      this.bindgrid=res.Table;
      this.bindgridDivident=res.Table1;
      // this.pagination=res.Table1;  res.Table1[0].Total
      
   totalpagecount=res.Table1[0].Total;
   
     
     
   

   

      
      for(var i=0;i<res.Table.length;i++){
         
        if(this.bindgrid[i].ReceivedDate == ""){
          this.bindgrid[i].ReceivedDate = ''
          // this.bindgrid1[i].FromDate = ''
          // this.bindgrid1[i].Amount = ''
        }
        
      
      }
      
      
 
      this.SumReceivableAmount=res.Table1[0].SumReceivableAmount;
      this.SumReceivedAmount=res.Table1[0].SumReceivedAmount;
      this.SumTDSAmount=res.Table1[0].SumTDSAmount;
      this.SumNetAmount=res.Table1[0].SumNetAmount;
      this.SumBalanceAmount=res.Table1[0].SumBalanceAmount;
      
      this.IsshowHeading=true;
      this.data1=res.Table2
      console.log(this.bindgrid)
      console.log(this.pagination)
      
      this.ShowLoaderp=false;
      this.showGrid=true;
      
      })
        }
        else{
          // this.btnNext=false;
          // this.btnPrev=true;
        }

    });
}



BindCustomers(){

  let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
  let UserId;
  // let  Data = new Commonfields();
  // Data.UserId = Sessionvalue.UserId;

  let item = JSON.parse(sessionStorage.getItem('User'));
  var usertype=this.Dbsecurity.Decrypt(item.UserType);
  // var userid1=this.Dbsecurity.Decrypt(item.UserId);


  if(usertype == 2 || usertype == 4){
    UserId=item.UserId
  }

  if(usertype == 3){

   // this.UserId = this.Dbsecurity.Decrypt(item.UserId);

   UserId =this.Dbsecurity.Encrypt(this.StatementDividendForm.controls['Employee1'].value);

  }

  this._capitalStateService.BindCustomers(UserId).subscribe(
    (data) => {
      this.totalcustomer=data.Table.length;
      
         this.BindcustomerallfieldsList = data.Table;
    });
}

BindEmployee(){
  this.ShowLoaderp=true;
  let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));

  let  Data = new Commonfields();
  Data.UserId = Sessionvalue.UserId;
  this._capitalStateService.BindEmployee(JSON.stringify(Data)).subscribe(
    (data) => {
         this.BindemployeesList = data.Table;
         this.ShowLoaderp=false;
    });
}

BindDefaultData(){
  // this.loader1=true;this.loader2=true;

  
  let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
  let  Data = new Commonfields();
  Data.UserId = Sessionvalue.UserId;
  this._StatementDividendService.BindDefaultData(JSON.stringify(Data)).subscribe(
    (data) => {
      this.FromDate = data.Table[0]["FromDate"];
      this.ToDate = data.Table[0]["ToDate"];
      this.CustomerAccount = data.Table[0]["CustomerAccountNo"];
      console.log('default');
      console.log(data.Table[0].CustomerAccountNo);
      this.StatementDividendForm.controls["Formdate"].setValue(data.Table[0].FromDate);
      this.StatementDividendForm.controls["Todate"].setValue(data.Table[0].ToDate);
      this.StatementDividendForm.controls["CustomerAccount"].setValue(data.Table[0].CustomerAccountNo);
      this.PageCount = 1;
      // this.griddiv=true;
      let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
      var UserId = this.Dbsecurity.Decrypt( Sessionvalue.UserId);
      var customeraccount1=this.Dbsecurity.Encrypt( this.CustomerAccount)
      var JsonData ={
        "UserId" : UserId,
        "fromdate" : this.FromDate,   
        "todate" :  this.ToDate,
        "CustomerAccountNo" : customeraccount1,
        "PageCount" : this.PageCount       
      }
      this.ShowLoaderp=true;
      this.showGrid=false;
      this._StatementDividendService.BindGrid(JsonData).subscribe((res)=>{
      console.log(res);
      if(res.Table.length > 0){
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
      
      
      
      this.SumReceivableAmount=res.Table1[0].SumReceivableAmount;
      this.SumReceivedAmount=res.Table1[0].SumReceivedAmount;
      this.SumTDSAmount=res.Table1[0].SumTDSAmount;
      this.SumNetAmount=res.Table1[0].SumNetAmount;
      this.SumBalanceAmount=res.Table1[0].SumBalanceAmount;
      
      // this.SumTotal_Dividend_Received=res.Table3[0].SumTotal_Dividend_Received;
      // this.SumOutstanding_Divident=res.Table3[0].SumOutstanding_Divident;
      // this.SumTotal_Amount=res.Table3[0].SumTotal_Amount;
      // this.SumTDS_Amount=res.Table3[0].SumTDS_Amount;

      // if(res.Table.length!=0){
      //   this.btnPrev=false;
      //   this.btnNext=true;
    
      // }
      //  this.data='Showing '+res.Table.length+' out of ' + res.Table1[0].Total + '';
       this.data=' ';
       this.IsshowHeading=true;
      this.data1=res.Table2
      console.log(this.bindgrid)
      console.log(this.pagination)
      }
      else
{
  this.ISSummary=false;
  this.ISMaingrid=false;
  this.IsshowHeading=false;
  this.btnNext=false;
  this.btnPrev=false;
  
}

      this.ShowLoaderp=false;
      
      this.showGrid=true;
      
      })   
    });
}




bindGrid(){
  
  this.PageCount=1;
  let item = JSON.parse(sessionStorage.getItem('User'));
  var usertype=this.Dbsecurity.Decrypt(item.UserType);
  var userid, CustomerAccountNo;

  if(usertype == 2 ||usertype == 3 || usertype == 4){
   
    const IsCustomerAccount = this.StatementDividendForm.get('CustomerAccount');
    IsCustomerAccount.setValidators(Validators.required); IsCustomerAccount.updateValueAndValidity();
    CustomerAccountNo= this.Dbsecurity.Encrypt(this.StatementDividendForm.controls['CustomerAccount'].value);
  }
  else{
    const IsCustomerAccount = this.StatementDividendForm.get('CustomerAccount');
    IsCustomerAccount.clearValidators(); IsCustomerAccount.updateValueAndValidity();
    CustomerAccountNo= item.AccountNo
    
  }

  if(usertype == 3){

      
    const IsEmployee = this.StatementDividendForm.get('Employee1');
    IsEmployee.setValidators(Validators.required); IsEmployee.updateValueAndValidity();
    // CustomerAccountNo= this.Dbsecurity.Encrypt(this.capitalStatForm.controls['Employee1'].value);

  }
  else{
    const IsEmployee = this.StatementDividendForm.get('Employee1');
    IsEmployee.clearValidators(); IsEmployee.updateValueAndValidity();
    // CustomerAccountNo= item.AccountNo

  }
  this.submitted = true;
  if (this.StatementDividendForm.invalid) {
    
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
   
     
    //  if(usertype == 3 && this.StatementDividendForm.controls['CustomerAccount'].value == 0){

    //    CustomerAccountNo= this.Dbsecurity.Encrypt('6010001');
    //   //  this.btnNext==true;
    //    // this.NextData(''); 
    //    // return false;
    //  }
 var jasondata= {
  "fromdate":this.StatementDividendForm.controls['Formdate'].value ,
  "PageCount": this.PageCount,
  "todate":this.StatementDividendForm.controls['Todate'].value,
  "UserId": userid,
  "CustomerAccountNo": CustomerAccountNo
 
}
this.ShowLoaderp=true;
this.showGrid=false;
this._StatementDividendService.BindGrid(jasondata).subscribe((res)=>{
console.log(res);
if(res.Table.length >0){
this.bindgrid=res.Table;
this.bindgridDivident=res.Table1;
// this.pagination=res.Table1;

// if(res.Table.length >0){
//   this.btnNext==true;
// }else{ this.btnNext==true;}


if(res.Table.length!=0 && this.StatementDividendForm.controls['CustomerAccount'].value == 0){
  this.btnPrev=false;
  this.btnNext=true; 

}


for(var i=0;i<res.Table.length;i++){
   
  if(this.bindgrid[i].ReceivedDate == ""){
    this.bindgrid[i].ReceivedDate = ''
    // this.bindgrid1[i].FromDate = ''
    // this.bindgrid1[i].Amount = ''
  }
  

}



this.SumReceivableAmount=res.Table1[0].SumReceivableAmount;
this.SumReceivedAmount=res.Table1[0].SumReceivedAmount;
this.SumTDSAmount=res.Table1[0].SumTDSAmount;
this.SumNetAmount=res.Table1[0].SumNetAmount;
this.SumBalanceAmount=res.Table1[0].SumBalanceAmount;

// this.SumTotal_Dividend_Received=res.Table3[0].SumTotal_Dividend_Received;
// this.SumOutstanding_Divident=res.Table3[0].SumOutstanding_Divident;
// this.SumTotal_Amount=res.Table3[0].SumTotal_Amount;
// this.SumTDS_Amount=res.Table3[0].SumTDS_Amount; Total
this.IsshowHeading=true;
this.data1=res.Table2
console.log(this.bindgrid)
console.log(this.pagination)

// this.data='Showing '+res.Table.length+' out of ' + res.Table1[0].Total + '';
this.data=' ';
this.totalpagecount=res.Table1[0].Total

// if(usertype == 2 && this.StatementDividendForm.controls['CustomerAccount'].value == 0){

//   // CustomerAccountNo= this.Dbsecurity.Encrypt('6010001');
//   // this.NextData('');
//   // return false;
//   //alert('insearch')
//   this.btnPrev=true;
//  this.btnNext==true;
//   }
} 
else
{
  this.ISSummary=false;
  this.ISMaingrid=false;
  this.IsshowHeading=false;
  this.btnNext=false;
  this.btnPrev=false;
  
}


this.ShowLoaderp=false;
this.showGrid=true;


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

// downloadMainGrid() {   //real downlad grid
  
//       var csvData = this.ConvertToCSV(JSON.stringify(this.bindgrid));
//        var a = document.createElement("a");
//         a.setAttribute('style', 'display:none;');
//         document.body.appendChild(a);
//         var blob = new Blob([csvData], { type: 'text/csv' });
//         var url = window.URL.createObjectURL(blob);
//         a.href = url;
//         a.download = 'CapitalStatement.csv';/* your file name*/
//          a.click();
//          return 'success';
//  // });
// }

// downloadPDF(){
//   // this.showhead=false;
//   // const elementToPrint = document.getElementById('tbldiv'); //The html element to become a pdf
//   // //const pdf = new jsPDF('p', 'pt', 'a4');
//   // const pdf = new jsPDF();
//   // pdf.addHTML(elementToPrint, () => {
//   //     pdf.save('web.pdf');
//   // });  
//   var doc = new jsPDF('legal', 'pt','a3' );
//   // doc.text("From HTML", 40, 50);legal
//    //doc.text( 40, 50);
//    var res = doc.autoTableHtmlToJson(document.getElementById("bankmastertable1"));
//    var res1 = doc.autoTableHtmlToJson(document.getElementById("bankmastertable2"));

//    console.log(res)
//    console.log(res.data)
//    console.log(res.data[0])
//    doc.autoTable(res.columns, res1.data, {
//      startY: 90
//    });
  
//    doc.save();
   
// }


downloadPDFFile(){
    
  // var doc = new jsPDF();  
 
  // doc.setFontSize(11);    // doc.setTextColor(100);

  // if(this.EvenOdd % 2 !=0)
  // {
  //   (doc as any).autoTable({
  //     head: this.head,
  //     body: this.statementOfExpenses4,
  //     theme: 'plain',
  //     didDrawCell: data => {
  //       console.log(data.column.index)
  //     }
  //   })
  //     // Open PDF document in new tab
  //   doc.output('dataurlnewwindow')
  
  //   // Download PDF document  
  //   doc.save('StatementOfExpenses.pdf');
  // }
  // else
  // {
  //   (doc as any).autoTable({
  //     head: this.head,
  //     body: this.statementOfExpenses5,
  //     theme: 'plain',
  //     didDrawCell: data => {
  //       console.log(data.column.index)
  //     }
  //   })
  //     // Open PDF document in new tab
  //   doc.output('dataurlnewwindow')
  
  //   // Download PDF document  
  //   doc.save('StatementOfExpenses_Summary.pdf');
  // }

  var data = document.getElementById('Statementdiv');  
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
      pdf.save('StatementDividend_Html.pdf'); // Generated PDF   
    });    
  

}

}

