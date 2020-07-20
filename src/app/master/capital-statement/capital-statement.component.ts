import { Component, OnInit } from '@angular/core';
import{CapitalSatementService} from '../../Services/CapitalStatement/capital-satement.service';
import{CapitalStatementModel,pagination} from '../../../Models/CapitalStatement/capitalStatement';
import {FormBuilder,FormControl,FormGroup,Validator, Validators} from '@angular/forms';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import{DbsecurityService}from '../../Services/dbsecurity.service';
import {Bindcustomerallfields} from '../../../Models/SummaryReport/Bindcustomerallfields';
import { SummaryreportService } from '../../Services/SummaryReport/summaryreport.service';
import { Commonfields } from '../../../Models/commonfields';

@Component({
  selector: 'app-capital-statement',
  templateUrl: './capital-statement.component.html',
  styleUrls: ['./capital-statement.component.css']
})
export class CapitalStatementComponent implements OnInit {
  
  public bindgrid:CapitalStatementModel;
  public downloadExcelgrid:CapitalStatementModel;
  capitalStatForm:FormGroup;
  submitted = false;
  PageCount:number=1;
  btnPrev: boolean;
  btnNext:boolean;
  public pagination:pagination;
  public data:any;
  HeaderArray={};
  public SumSaleAmount:number;
  public SumPurchaseAmount:number;
  public SumIndexedCost:number;
  public SumST:number;
  public SumLT:number;
  public SumAfterIndex_LT:number;
  ShowLoaderp:boolean;
  StaticArray={};
  StaticArray1={};
  StaticArray2={};
  head=[];
  showhead:boolean;
  CustNameDive:boolean;
  BindcustomerallfieldsList : Bindcustomerallfields;


  constructor(private _capitalStateService:CapitalSatementService,private formbuilder:FormBuilder,private Dbsecurity: DbsecurityService,private SRService : SummaryreportService) { }

  ngOnInit(): void {
    this.showhead=true;
    this.btnPrev=false;
    this.btnNext==false;
    this.Showcustdropdown();
    this.capitalStatForm=this.formbuilder.group({
      Formdate:['',Validators.required],
      Todate:['',Validators.required],
      CustomerAccount:['',Validators.required] 
    })

    this.DownloadExcel();
    this.BindCustomers();
    
  }

  Showcustdropdown(){
    let item = JSON.parse(sessionStorage.getItem('User'));
    var usertype=this.Dbsecurity.Decrypt(item.UserType);
    var userid=this.Dbsecurity.Decrypt(item.UserId);
    
    if(usertype == 2 ||usertype == 3 || usertype == 4){
      this.CustNameDive=true; 
    }
    else{
      this.CustNameDive=false; 
  
    }
  }

  get f() {
    return this.capitalStatForm.controls;
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

// PreviousDayFun(){
//   var date = new Date();
//   var currentDate = date.toISOString().slice(0,10);
//   this.capitalStatForm.controls['ToDate'].setValue(currentDate);
//   date.setDate(date.getDate() - 1);
//   var yesterday = date.toISOString().slice(0,10);
//   this.capitalStatForm.controls['FromDate'].setValue(yesterday);
//   console.log(currentDate);
//       console.log(yesterday);
// }

// LastOneWeekFun(){
//   var date = new Date();
//   var currentDate = date.toISOString().slice(0,10);
//   this.capitalStatForm.controls['ToDate'].setValue(currentDate);
//   date.setDate(date.getDate() - 7);
//   var yesterday = date.toISOString().slice(0,10);
//   this.capitalStatForm.controls['FromDate'].setValue(yesterday);
//   console.log(currentDate);
//       console.log(yesterday);
// }
LastTwoWeekFun(){
  var date = new Date();
  var currentDate = date.toISOString().slice(0,10);
  console.log(currentDate);
  this.capitalStatForm.controls['Todate'].setValue(currentDate);
  date.setDate(date.getDate() - 14);
  var yesterday = date.toISOString().slice(0,10);
  console.log(yesterday);
  this.capitalStatForm.controls['Formdate'].setValue(yesterday);
      
}

// LastOneMonthFun(){
//   var date = new Date();
//   var currentDate = date.toISOString().slice(0,10);
//   this.capitalStatForm.controls['ToDate'].setValue(currentDate);
//   date.setDate(date.getDate() - 30);
//   var yesterday = date.toISOString().slice(0,10);
//   this.capitalStatForm.controls['FromDate'].setValue(yesterday);
// }

PreviousDayFun(){
  var date = new Date();
  var currentDate = date.toISOString().slice(0,10);
  console.log(currentDate);
  this.capitalStatForm.controls['Todate'].setValue(currentDate);
  date.setDate(date.getDate() - 1);
  var yesterday = date.toISOString().slice(0,10);
  console.log(yesterday);
  this.capitalStatForm.controls['Formdate'].setValue(yesterday);

  
        
}

LastOneWeekFun(){
  var date = new Date();
  var currentDate = date.toISOString().slice(0,10);
  console.log(currentDate);
  this.capitalStatForm.controls['Todate'].setValue(currentDate);
  date.setDate(date.getDate() - 7);
  var yesterday = date.toISOString().slice(0,10);
  console.log(yesterday);
  this.capitalStatForm.controls['Formdate'].setValue(yesterday);
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
     
      const IsCustomerAccount = this.capitalStatForm.get('CustomerAccount');
      IsCustomerAccount.setValidators(Validators.required); IsCustomerAccount.updateValueAndValidity();
      CustomerAccountNo= this.capitalStatForm.controls['CustomerAccount'].value;
    }
    else{
      const IsCustomerAccount = this.capitalStatForm.get('CustomerAccount');
      IsCustomerAccount.clearValidators(); IsCustomerAccount.updateValueAndValidity();
      userid= item.UserId
      
    }

    this.submitted = true;
    if (this.capitalStatForm.invalid) {
      return;
    }
    else{
      let item = JSON.parse(sessionStorage.getItem('User'));
      var usertype=this.Dbsecurity.Decrypt(item.UserType);
      var userid, CustomerAccountNo;
      
      // if(usertype == 2 ||usertype == 3 || usertype == 4){
  
      //   //userid=this.StatementDividendForm.controls['CustomerAccount'].value accountno
      //   CustomerAccountNo= this.Dbsecurity.Encrypt(this.capitalStatForm.controls['CustomerAccount'].value);
        
      // } 
      // else
      // {
      //   userid= item.UserId
      // }

   var jasondata= {
    "fromdate":this.capitalStatForm.controls['Formdate'].value ,
    "PageCount": this.PageCount,
    "todate":this.capitalStatForm.controls['Todate'].value,
    "UserId": item.UserId,
    "CustomerAccountNo": CustomerAccountNo
   
  }
  this.ShowLoaderp=true;
this._capitalStateService.BindGrid(jasondata).subscribe((res)=>{

  this.bindgrid=res.Table;
  //this.pagination=res.Table1;
  console.log('bindgrid');
  console.log(res);
  console.log(res.Table[0].SaleAmount);
  console.log(this.bindgrid[0].SaleDate);

  for(var i=0;i<res.Table.length;i++){
   
    if(this.bindgrid[i].SaleAmount == null){
      this.bindgrid[i].SaleAmount = ''
      // this.bindgrid1[i].FromDate = ''
      // this.bindgrid1[i].Amount = ''
    }
    if( this.bindgrid[i].PurchaseAmount == null){
      this.bindgrid[i].PurchaseAmount = ''
    }
    if( this.bindgrid[i].IndexedCost == null){
      this.bindgrid[i].IndexedCost = ''
    }
    if( this.bindgrid[i].LT == null){
      this.bindgrid[i].LT = ''
    }
    if( this.bindgrid[i].AfterIndex_LT == null){
      this.bindgrid[i].AfterIndex_LT = ''
    }
    

  }
 
  console.log(this.bindgrid);
  this.SumSaleAmount=res.Table1[0].SumSaleAmount;
  this.SumPurchaseAmount=res.Table1[0].SumPurchaseAmount;
  this.SumIndexedCost=res.Table1[0].SumIndexedCost;
  this.SumST=res.Table1[0].SumST;
  this.SumLT=res.Table1[0].SumLT;
  this.SumAfterIndex_LT=res.Table1[0].SumAfterIndex_LT;
  
  this.ShowLoaderp=false;
  
  })
}

  }

  DownloadExcel(){

    this._capitalStateService.DownloadExcel().subscribe((res)=>{
      this.downloadExcelgrid=res.Table
      console.log(this.downloadExcelgrid)

    })

  }


  ConvertToCSV(objArray) {   //kislay

    this.HeaderArray = {
      Security: "Security", SaleDate: "SaleDate", SaleQty: "SaleQty", SaleRate: "SaleRater",
      SaleAmount: "SaleAmount", PurchaseDate: "PurchaseDate", PurchaseRate: "PurchaseRate", Price: "Price", PurchaseAmount
             : "PurchaseAmount"    , IndexedCost: "IndexedCost", DaysHeld: "DaysHeld", ST: "ST"
             , LT: "LT", AfterIndex_LT: "AfterIndex_LT"
             }
             this.StaticArray = {value:"ADROIT PMS SERVICES PVT LTD",value1:"MUMBAI",value2:"STATEMENT OF CAPITAL GAIN/LOSS",
             value3:"From " + this.capitalStatForm.controls['Formdate'].value +" To " +this.capitalStatForm.controls['Todate'].value ,value4:"Account : 6010001     RUBY DECOSTA   - ADT001",
           value5:"ADROITPMS1"}

           this.StaticArray1={value:"Total",value1:"",value2:"",value3:"",value4:this.SumSaleAmount,value5:""
,value6:"",value7:"",value8:this.SumPurchaseAmount,value9:this.SumIndexedCost,value10:"",value11:this.SumST,value12:this.SumLT,value13:this.SumAfterIndex_LT}
    
this.StaticArray2={value:"",value1:"Sale",value2:"",value3:"",value4:"",value5:"Purchase"
,value6:"",value7:"",value8:"",value9:"",value10:"",value11:"Realized Gain/Loss",value12:"",value13:""}
    
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
      for (var index in this.StaticArray2) {
          if (line != '') line += ','
          line += this.StaticArray2[index];
      }  
      str += line + '\r\n';
    }
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

  downloadPDFFile(){
   
    debugger;  
    var doc = new jsPDF();  
   
    doc.setFontSize(11);
    doc.setTextColor(100);
  
    (doc as any).autoTable({
      head: this.head,
      body: this.bindgrid,
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



  downloadPDF(){
    this.showhead=false;
    // const elementToPrint = document.getElementById('tbldiv'); //The html element to become a pdf
    // //const pdf = new jsPDF('p', 'pt', 'a4');
    // const pdf = new jsPDF();
    // pdf.addHTML(elementToPrint, () => {
    //     pdf.save('web.pdf');
    // });  
    var doc = new jsPDF('legal', 'pt','a3' );
    // doc.text("From HTML", 40, 50);legal
     //doc.text( 40, 50);
     var res = doc.autoTableHtmlToJson(document.getElementById("gridmain"));
     console.log('downloadpdf')
     console.log(res)
   console.log(res.data)
   console.log(res.data[0])
     doc.autoTable(res.columns, res.data, {
       startY: 90
     });
    
     doc.save();
     
  }


  
}
