import { Component, OnInit } from '@angular/core';
import { CurrentportfolioService } from 'src/app/Services/CurrentPortFolio/currentportfolio.service';
import{DbsecurityService}from 'src/app/Services/dbsecurity.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Currentportfolio} from '../../../Models/CurrentPortfolio/currentportfolio';
import {Header} from '../../../Models/CurrentPortfolio/header';
import {Bindemployee} from '../../../Models/BankBook/bindemployee';
import {BindCustomers} from '../../../Models/BankBook/bindcustomers';
import {Bindcustomerallfields} from '../../../Models/SummaryReport/Bindcustomerallfields';
//import { SummaryreportService } from '../../Services/SummaryReport/summaryreport.service';
import { Commonfields } from '../../../Models/commonfields';
import { isNgTemplate } from '@angular/compiler';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';



@Component({
  selector: 'app-current-portfolio',
  templateUrl: './current-portfolio.component.html',
  styleUrls: ['./current-portfolio.component.css']
})
export class CurrentPortfolioComponent implements OnInit {
  divMainGrid :boolean=true;userType:any;UserId:any;CustomerAccount:any;PageCount:any;
  isShowLoader:boolean=false;CurrentPortfolioForm : FormGroup;loading: boolean = false;
  CurrentportfolioList : Currentportfolio;loader1:boolean=false;loader2:boolean=false;
  FromDate:any;ToDate:any;ReportDate:any;HeaderList:Header;EmployeeDiv:boolean=false;
  AllEmployeesList:Bindemployee;BindCustomersList:BindCustomers;btnNext:boolean=true;btnPrev:boolean=true;
  NoRecord:boolean=true;liExport:boolean=false;
  constructor(private router: Router, private formBuilder: FormBuilder,private _CurrentportfolioService: CurrentportfolioService,private Dbsecurity: DbsecurityService) { }  //,private SRService : SummaryreportService
  CurrentDate = new Date(); 
  STSumGL:number;
  STSumIncome:number;
  STSumMarketValue:number;
  STSumPercentAssets:number;
  STSumPercentG_L:number;
  STSumTotalCost:number;

  ETSumGL:number;
  ETSumIncome:number;
  ETSumMarketValue:number;
  ETSumPercentAssets:number;
  ETSumPercentG_L:number;
  ETSumTotalCost:number;
  CustNameDive:boolean=false;
  submitted = false;
  BindcustomerallfieldsList : Bindcustomerallfields;
  

  ngOnInit() {
    debugger;
    this.CurrentPortfolioForm = this.formBuilder.group({  
   //   Formdate:[''],
     // Todate:['',Validators.required],
      CustomerAccount:[''] ,ReportDate:[''],EmployeeId:['']
  });
   // this.Showcustdropdown();
    let item = JSON.parse(sessionStorage.getItem('User'));  
    this.userType=this.Dbsecurity.Decrypt( item.UserType);
    if(this.userType == 3){
      this.CustNameDive=true;this.EmployeeDiv=true;
       this.UserId = this.Dbsecurity.Decrypt(item.UserId);
       this.CustomerAccount = ""; 
       this.BindEmployee();
     }
     else if(this.userType == 2){
      this.CustNameDive=true;this.EmployeeDiv=false;
      this.UserId = this.Dbsecurity.Decrypt(item.UserId);
      this.CustomerAccount = ""; 
      this.BindCustomers();
     }
     else{
      this.CustNameDive=false;this.EmployeeDiv=false;
      this.UserId = this.Dbsecurity.Decrypt(item.UserId);
      // this.CustomerAccount = this.Dbsecurity.Decrypt(item.AccountNo);
      this.CustomerAccount = item.AccountNo;
     }
    this.BindDefaultData();
    //this.BindCustomers();
  }
 
  BindDefaultData(){
    debugger;
    this.loader1=true;this.loader2=true;
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    var JsonData ={
      "UserId" : this.UserId,
      "CustomerAccountNo" : this.CustomerAccount ,
      "PageCount" : this.PageCount
    }
    this._CurrentportfolioService.BindDefaultData(JsonData).subscribe(
      (data) => {
        this.ReportDate = data.Table[0]["ReportDate"];
        this.CustomerAccount = data.Table[0]["CustomerAccountNo"];
          this.CurrentPortfolioForm.controls["ReportDate"].setValue(this.ReportDate);
          this.CurrentPortfolioForm.controls["CustomerAccount"].setValue(this.CustomerAccount);
        this.PageCount = 1;
        this.BindDefaultGrid();     
      });
      this.loader1=false;this.loader2=false;     
  }

  BindDefaultGrid(){
    this.loader1=true;this.loader2=true;
    var JsonData ={
      "UserId" : this.UserId,
      "ReportDate" : this.ReportDate,   
      "CustomerAccountNo" : this.CustomerAccount,
      "PageCount" : this.PageCount       
    }
    this._CurrentportfolioService.BindGridAllFields(JsonData).subscribe(
      (data) => {
        this.CurrentportfolioList = data.Table;
        this.HeaderList = data.Table1;

        this.STSumGL = data.Table2[0].SumGL;
        this. STSumIncome = data.Table2[0].SumIncome;
        this. STSumMarketValue = data.Table2[0].SumMarketValue;
        this. STSumPercentAssets= data.Table2[0].SumPercentAssets;
        this. STSumPercentG_L= data.Table2[0].SumPercentG_L;
        this. STSumTotalCost = data.Table2[0].SumTotalCost;

        this.ETSumTotalCost = data.Table2[0].SumGL;
        this.ETSumMarketValue =data.Table2[0].SumIncome;
        this.ETSumIncome =  data.Table2[0].SumMarketValue;
        this.ETSumGL = data.Table2[0].SumPercentAssets;
        this.ETSumPercentG_L = data.Table2[0].SumPercentG_L;
        this.ETSumPercentAssets = data.Table2[0].SumTotalCost;
        this.NoRecord = false;
        });
        
      this.loader1=false;this.loader2=false;
  }


  
  get f() {
    return this.CurrentPortfolioForm.controls;
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


  // BindCustomers(){
  //   let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
  //   let  Data = new Commonfields();
  //   Data.UserId = Sessionvalue.UserId;
  //   this.SRService.BindCustomers(JSON.stringify(Data)).subscribe(
  //     (data) => {
  //          this.BindcustomerallfieldsList = data.Table;
  //     });
  // }
  Search(ReportDate){
    this.ReportDate = ReportDate;
    this.CustomerAccount = this.CurrentPortfolioForm.controls['CustomerAccount'].value;
    this.PageCount = 1;
    this.BindCurrentPortFolioReport(this.ReportDate);
  }
  
  BindCurrentPortFolioReport(ReportDate) {
       this.loader1 = true;this.loader2 = true;
        let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
        var UserId = Sessionvalue.UserId;
        var JsonData ={
          "UserId" : UserId,
          "ReportDate" : ReportDate,   
          "CustomerAccountNo" : this.CustomerAccount,
          "PageCount" : this.PageCount
        }   
        this._CurrentportfolioService.BindGridAllFields(JsonData).
            subscribe((data) => {             
              this.CurrentportfolioList = data.Table;
              this.HeaderList = data.Table1;
              this.STSumGL = data.Table2[0].SumGL;
              this. STSumIncome = data.Table2[0].SumIncome;
              this. STSumMarketValue = data.Table2[0].SumMarketValue;
              this. STSumPercentAssets= data.Table2[0].SumPercentAssets;
              this. STSumPercentG_L= data.Table2[0].SumPercentG_L;
              this. STSumTotalCost = data.Table2[0].SumTotalCost;

              this.ETSumTotalCost = data.Table2[0].SumGL;
              this.ETSumMarketValue =data.Table2[0].SumIncome;
              this.ETSumIncome =  data.Table2[0].SumMarketValue;
              this.ETSumGL = data.Table2[0].SumPercentAssets;
              this.ETSumPercentG_L = data.Table2[0].SumPercentG_L;
              this.ETSumPercentAssets = data.Table2[0].SumTotalCost;
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
              this.loader1 = false;this.loader2 = false;
            });
    }

    BindEmployee(){
      this.loader1=true;this.loader2=true;
      let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
      let  Data = new Commonfields();
      Data.UserId = Sessionvalue.UserId;
      this._CurrentportfolioService.BindEmployee(JSON.stringify(Data)).subscribe(
        (data) => {
             this.AllEmployeesList = data.Table;
             this.loader1=false;this.loader2=false;
        });
    }

    BindCustomers(){
      this.loader1=true;this.loader2=true;
      let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
      let  Data = new Commonfields();
      Data.UserId = this.Dbsecurity.Decrypt(Sessionvalue.UserId);
      this._CurrentportfolioService.BindCustomers(JSON.stringify(Data)).subscribe(
        (data) => {
             this.BindCustomersList = data.Table;
             this.loader1=false;this.loader2=false;
        });
    }

    BindNextData(value){
     // this.loader1 = true;this.loader2 = true;
      if(value == 1){this.PageCount = this.PageCount+1;}
      else if(value == 0){this.PageCount = this.PageCount-1;}
      if(this.PageCount >= 1){
      if(this.PageCount != 0 || this.PageCount !="" ){
        this.loader1=true;this.loader2=true;
      if(this.userType == 3){
        this.BindCurrentPortFolioReport(this.ReportDate);
      } 
      else if(this.userType == 1 ){
        this.BindCurrentPortFolioReport(this.ReportDate);
      } 
      else if(this.userType == 2){
        this.BindCurrentPortFolioReport(this.ReportDate);
      }
      else{
        //this.NextData();
        this.BindCurrentPortFolioReport(this.ReportDate);
      }
    }
  }
  else{ this.PageCount = 1;}
 // this.loader1=false;this.loader2=false;
    }
  
    
    // NextData(){
    //   if(this.userType == 3 ){
    //     this.CustomerAccount="";
    //   }
    //   var JsonData ={
    //     "UserId" : this.UserId,
    //     "CustomerAccount" : this.CustomerAccount ,
    //     "PageCount" : this.PageCount
    //   }
    //   this.BSService.BindNextData(JsonData).subscribe(
    //     (data) => {
    //       this.FromDate = data.Table[0]["FromDate"];
    //       this.ToDate = data.Table[0]["ToDate"];
    //       if(this.userType != 3 ){
    //       this.CustomerAccount = data.Table[0]["CustomerAccount"];
    //       }
    //       this.BindGrid(this.FromDate,this.ToDate);
    //     });  
    // }
  

    BindCustomersOnChange(EmployeeId){
      this.loader1=true;this.loader2=true;
      let  Data = new Commonfields();
      Data.UserId = EmployeeId ;
      this._CurrentportfolioService.BindCustomers(JSON.stringify(Data)).subscribe(
        (data) => {
             this.BindCustomersList = data.Table;
             this.loader1=false;this.loader2=false;
        });
  
    }

    PreviousDayFun(){
      var date = new Date();
      date.setDate(date.getDate() - 1);
      var yesterday = date.toISOString().slice(0,10);
      this.CurrentPortfolioForm.controls['ReportDate'].setValue(yesterday);
    }
  
    LastOneWeekFun(){
      var date = new Date();
      date.setDate(date.getDate() - 7);
      var yesterday = date.toISOString().slice(0,10);
      this.CurrentPortfolioForm.controls['ReportDate'].setValue(yesterday);
    }
    LastOneMonthFun(){
      var date = new Date();
      date.setDate(date.getDate() - 30);
      var yesterday = date.toISOString().slice(0,10);
      this.CurrentPortfolioForm.controls['ReportDate'].setValue(yesterday);
    }

    downloadPDFFile(){
        var data = document.getElementById('CurrentPortfoliotable');  
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
            pdf.save('CurrentPortfolio.pdf'); // Generated PDF   
          });         
      }


//   BindCurrentPortFolioReport(FromDate,ToDate) {
// debugger;
//     // alert(this.CurrentPortfolioForm.controls['CustomerAccount'].value )

//     let item = JSON.parse(sessionStorage.getItem('User'));
//     var usertype=this.Dbsecurity.Decrypt(item.UserType);
//     var userid, CustomerAccountNo;
  
//     if(usertype == 2 ||usertype == 3 || usertype == 4){
     
//       const IsCustomerAccount = this.CurrentPortfolioForm.get('CustomerAccount');
//       IsCustomerAccount.setValidators(Validators.required); IsCustomerAccount.updateValueAndValidity();
//        CustomerAccountNo= this.Dbsecurity.Encrypt(this.CurrentPortfolioForm.controls['CustomerAccount'].value);
      
//     }
//     else{
//       const IsCustomerAccount = this.CurrentPortfolioForm.get('CustomerAccount');
//       IsCustomerAccount.clearValidators(); IsCustomerAccount.updateValueAndValidity();
//       CustomerAccountNo= item.AccountNo
      
      
      
//     }

//     this.submitted = true;
//     // if (this.CurrentPortfolioForm.invalid) {
//     //   return;
//     // }
//     // else{
    
//     this.loading = true;
//     var currentContext = this;

//     // this.FromDate = this.datepipe.transform(FromDate, 'dd-MM-yyyy');
//     // this.ToDate = this.datepipe.transform(ToDate, 'dd-MM-yyyy');
//     this.divMainGrid=true;
//     let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
//     var UserId = Sessionvalue.UserId;
//     var JsonData ={
//       "UserId" : UserId,
//       "FromDate" :   FromDate,   
//       "ToDate" :  ToDate   ,
//       "CustomerAccountNo"   :   CustomerAccountNo
//     }
 
//     this._CurrentportfolioService.BindGridAllFields(JsonData).
//         subscribe((data) => {
          
//           this.CurrentportfolioList = data.Table;
//           console.log('cportfolio') 
//           console.log(data) 

//          this.STSumGL = data.Table1[0].SumGL
//          this. STSumIncome = data.Table1[0].SumIncome
//          this. STSumMarketValue = data.Table1[0].SumMarketValue
//          this. STSumPercentAssets= data.Table1[0].SumPercentAssets
//          this. STSumPercentG_L= data.Table1[0].SumPercentG_L
//          this. STSumTotalCost = data.Table1[0].SumTotalCost
          
          
        
//          this. ETSumGL = data.Table2[0].SumGL
//          this. ETSumIncome= data.Table2[0].SumIncome
//          this. ETSumMarketValue = data.Table2[0].SumMarketValue
//          this. ETSumPercentAssets = data.Table2[0].SumPercentAssets
//          this. ETSumPercentG_L = data.Table2[0].SumPercentG_L
//          this. ETSumTotalCost = data.Table2[0].SumTotalCost
         

//             // currentContext.gridAllFields = data.Table;
//             // currentContext.gridAllFields1 = data.Table1;
//             // currentContext.gridAllFields2 = data.Table2;
//             // currentContext.gridAllFields3 = data.Table3;
//             // currentContext.gridAllFields4 = data.Table4;   
//             // currentContext.gridAllFields5 = data.Table5;    
              
//             // if(data.Table.length>0)      
//             // {
//             //   this.IsEquity=true;
//             // }
//             // else
//             // {
//             //   this.IsEquity=false;
//             // }
//             // if(data.Table2.length>0)      
//             // {
//             //   this.IsCashAndEquiv=true;
//             // }
//             // else
//             // {
//             //   this.IsCashAndEquiv=false;
//             // }
//         });
//     // console.log(sessionStorage.getItem('ID'));
//     this.loading = false;
//   //}
// }

// downloadPDF(){
//   // this.showhead=false;
 
//   var doc = new jsPDF('legal', 'pt','a3' );
//   // doc.text("From HTML", 40, 50);legal
//    //doc.text( 40, 50);
//    var res = doc.autoTableHtmlToJson(document.getElementById("bankmastertable1"));
//    var res1 = doc.autoTableHtmlToJson(document.getElementById("bankmastertable2"));
//    console.log('downloadpdf')
//    console.log(res)
//  console.log(res.data)
//  console.log(res.data[0])
//    doc.autoTable(res.columns, res1.data, {
//      startY: 90
//    });
  
//    doc.save();
   
// }


}
