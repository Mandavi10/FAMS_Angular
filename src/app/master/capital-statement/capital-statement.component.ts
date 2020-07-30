import { Component, OnInit } from '@angular/core';
import{CapitalSatementService} from '../../Services/CapitalStatement/capital-satement.service';
import{CapitalStatementModel,pagination,BindEmployees,BindCustomer} from '../../../Models/CapitalStatement/capitalStatement';
import {FormBuilder,FormControl,FormGroup,Validator, Validators} from '@angular/forms';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import{DbsecurityService}from '../../Services/dbsecurity.service';
import {Bindcustomerallfields} from '../../../Models/SummaryReport/Bindcustomerallfields';
import { SummaryreportService } from '../../Services/SummaryReport/summaryreport.service';
import { Commonfields } from '../../../Models/commonfields';
// import html2canvas from 'html2canvas';

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
  BindcustomerallfieldsList:BindCustomer;
  public data1={};
  FromDate:string;
  ToDate:string;
  CustomerAccount:string;
  divEmployee:boolean;
  BindemployeesList:BindEmployees;
  ISSummary:boolean=false;
  ISMaingrid:boolean=true;
  count:number=1;
  countback:number=0;
  currentpagecount:number;
  totalpagecount:number;
  IsshowHeading:boolean;
  showGrid:boolean;
  customerlength:number;
  temppagecount:number;
  IsshowCSV:boolean=false;
  


  constructor(private _capitalStateService:CapitalSatementService,private formbuilder:FormBuilder,private Dbsecurity: DbsecurityService,private SRService : SummaryreportService) { }

  ngOnInit(): void {
    this.showhead=true;
    this.btnPrev=false;
    this.btnNext==false;
    this.Showcustdropdown();
    this.capitalStatForm=this.formbuilder.group({
      Formdate:['',Validators.required],
      Todate:['',Validators.required],
      CustomerAccount:['',Validators.required],
      Employee1:['',Validators.required]
    })

    this.DownloadExcel();

    this.BindDefaultData();

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


// BindCustomers(){
//   let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
//   let  Data = new Commonfields();
//   Data.UserId = Sessionvalue.UserId;
//   this.SRService.BindCustomers(JSON.stringify(Data)).subscribe(
//     (data) => {
//          this.BindcustomerallfieldsList = data.Table;
//     });
// }

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

   UserId =this.Dbsecurity.Encrypt(this.capitalStatForm.controls['Employee1'].value);

  }

  this._capitalStateService.BindCustomers(UserId).subscribe(
    (data) => {
         this.BindcustomerallfieldsList = data.Table;
         this.customerlength=data.Table.length;
         
    });
}


BindNextData(value){

  let item = JSON.parse(sessionStorage.getItem('User'));
  var Usertype=this.Dbsecurity.Decrypt(item.UserType);

  // this.loader1=true;this.loader2=true;
  if(value == 1){
    

    this.PageCount = this.PageCount+1;

    
    // if(this.capitalStatForm.controls['CustomerAccount'].value != 0 && this.PageCount>1){
    //   this.btnNext=false;
    //   //this.btnPrev=false;
      
    //   }
   
    
    if(this.PageCount%2 != 0){
      this.ISSummary=false;
      this.ISMaingrid=true;
     

      this.NextData(value);
    }
    else{
      if(this.capitalStatForm.controls['CustomerAccount'].value != 0){
        this.btnNext=false;
        this.btnPrev=true;
        }
        else{
          this.btnPrev=true;

        }
      this.ISSummary=true;
      this.ISMaingrid=false;
      
    }
  }
  // else if(value == 0){
    
  //   this.PageCount = this.PageCount-1;
  //   if(this.PageCount%2 != 0){
  //     this.ISSummary=false;
  //     this.ISMaingrid=true;

  //     this.NextData(value);
  //   }
  //   else{
  //     this.ISSummary=true;
  //     this.ISMaingrid=false;
      
  //   }
  // }
  else if(value == 0){
    
    // if(this.capitalStatForm.controls['CustomerAccount'].value != 0 && this.PageCount<4){
    //   this.btnNext=true;
    //   this.btnPrev=false;
      
    //   }
    
    this.PageCount = this.PageCount-1;
     
  if(this.PageCount == 1){
    this.btnPrev=false;
    this.btnNext=true;
 
  }
    
    if(this.PageCount%2 == 0){
      
     
      
      this.ISSummary=true;
      this.ISMaingrid=false;
      this.NextData(value);

      
    }
    else{
      if(this.capitalStatForm.controls['CustomerAccount'].value != 0){
        this.btnNext=true;
        this.btnPrev=false;

      }
      this.ISSummary=false;
      this.ISMaingrid=true;

      
      
    }
  }


  // this.griddiv=true;
  //  this.NextData();

  // this.bindGrid();
  

  if(this.capitalStatForm.controls['CustomerAccount'].value == 0 && Usertype == 3){
        
    // if(this.PageCount ==10){
      if(this.PageCount == (this.customerlength *2)){ 
        this.btnNext=false; 

      }

      if(this.PageCount <(this.customerlength *2)){ 
        this.btnNext=true;
  
      }

   }

   if(this.capitalStatForm.controls['CustomerAccount'].value == 0 && Usertype == 2){
    
    
    if(this.PageCount == (this.customerlength *2)){ 
      this.btnNext=false;
  
    }
    if(this.PageCount <(this.customerlength *2)){ 
      this.btnNext=true;

    }
  }


}

NextData(value){

  let item = JSON.parse(sessionStorage.getItem('User'));
  //item.userid;
  
if(value == 1){
  this.count++;
// var pagecountn= this.PageCount-(this.count*1);
var pagecountn=this.count;

}
else{
  // this.countback++;
  // var pagecountn= this.PageCount-this.countback;
  this.count--;
  var pagecountn=this.count;
}
if(pagecountn < 1)
{
  return false;

}

      

// this.count++;
// var pagecountn= this.PageCount-(this.count*1);
//  var pagecountn= this.PageCount;
// alert(pagecountn)
// alert(this.PageCount)
// if(this.PageCount == 4){
//   this.btnNext=false;

// }
//var Usertype=this.Dbsecurity.Decrypt(item.UserType);


  var JsonData ={
    "UserId" : item.UserId,
    "CustomerAccountNo" :this.capitalStatForm.controls['CustomerAccount'].value,
    "fromdate" : this.capitalStatForm.controls['Formdate'].value,
        "todate" :  this.capitalStatForm.controls['Todate'].value,
    "PageCount" : pagecountn
  }

  var pagecountb=pagecountn;

  this._capitalStateService.BindNextData(JsonData).subscribe(
    (data) => {
    
     

      if(data.Table.length!=0){

      this.FromDate = data.Table[0]["FromDate"];
      this.ToDate = data.Table[0]["ToDate"];
      // this.CustomerAccount = "";
      // this.CustomerAccount = this.Dbsecurity.Encrypt(data.Table[0]["CustomerAccountNo"]);


      this.CustomerAccount = this.Dbsecurity.Encrypt(data.Table[0]["CustomerAccountNo"]); 
      if(this.capitalStatForm.controls['CustomerAccount'].value != 0){
        var pagecount=1;
        // this.CustomerAccount = this.Dbsecurity.Encrypt(data.Table[0]["CustomerAccountNo"]); 

       }
       else{
        //this.CustomerAccount=this.Dbsecurity.Encrypt(this.capitalStatForm.controls['CustomerAccount'].value);
        this.btnNext=true;
       }

       var Usertype=this.Dbsecurity.Decrypt(item.UserType);

      //  alert(Usertype)
      
      
      
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
      this._capitalStateService.BindGrid(JsonData).subscribe(
        (res) => {
          if(res.Table.length !=0){
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
          this.IsshowHeading=true;
          this.data1=res.Table2
          console.log(this.data1)
          var tabledata=res.Table.length
          // if(Usertype == 3){
          // if(value == 1 && this.capitalStatForm.controls['CustomerAccount'].value == 0){
          //   var sumpage=res.Table.length + this.currentpagecount
          //   alert(res.Table.length)
          //   alert(this.currentpagecount)
          //   this.data='Showing '+(sumpage )+' out of ' + this.totalpagecount + '';
          //   //sumpage=res.Table.length + this.currentpagecount
          // //  sumpage+res.Table.length
          // }
          // else if(value ==0 && this.capitalStatForm.controls['CustomerAccount'].value == 0){
          //    this.data='Showing '+(res.Table.length - this.currentpagecount) +' out of ' + this.totalpagecount + '';
          // }
          // }
          // else
          // {
          //  this.data='Showing '+res.Table.length+' out of ' + res.Table1[0].Total + '';
       
          this.data=' ';
       
       
          // } 
        }
        else
        {
          // this.ISSummary=false;
          // this.ISMaingrid=false;
          // this.IsshowHeading=false;
          
          // this.data1={};
        }
          this.ShowLoaderp=false;
          this.showGrid=true;
          });
        }
        else{
         // this.btnNext=false;
        }

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
  this._capitalStateService.BindDefaultData(JSON.stringify(Data)).subscribe(
    (data) => {
      let item = JSON.parse(sessionStorage.getItem('User'));
      
      var Usertype=this.Dbsecurity.Decrypt(item.UserType);

      //  alert(Usertype)
      
      
      var customeraccountno
       if(Usertype == 2 || Usertype == 4 || Usertype == 3 ){
       customeraccountno=data.Table[0]["CustomerAccountNo"];
       }
       else
       {
         customeraccountno=this.Dbsecurity.Decrypt(item.AccountNo); 
       }
     
      this.FromDate = data.Table[0]["FromDate"];
      this.ToDate = data.Table[0]["ToDate"];
      this.CustomerAccount = data.Table[0]["CustomerAccountNo"];
      this.capitalStatForm.controls["Formdate"].setValue(data.Table[0].FromDate);
      this.capitalStatForm.controls["Todate"].setValue(data.Table[0].ToDate);
      this.capitalStatForm.controls["CustomerAccount"].setValue(data.Table[0].CustomerAccountNo);
      this.PageCount = 1;
      // this.griddiv=true;
      let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
      var UserId = this.Dbsecurity.Decrypt( Sessionvalue.UserId);
      var customeraccount1=this.Dbsecurity.Encrypt(customeraccountno)
      var JsonData ={
        "UserId" : UserId,
        "fromdate" : this.FromDate,
        "todate" :  this.ToDate,
        "CustomerAccountNo" : customeraccount1,
        "PageCount" : this.PageCount
      }
      this.ShowLoaderp=true;
      this.showGrid=false;
      this._capitalStateService.BindGrid(JsonData).subscribe(
        (res) => {
          if(res.Table.length !=0){
          this.bindgrid=res.Table;
          //this.pagination=res.Table1;
          console.log('bindgrid');
          console.log(res);
          console.log(res.Table[0].SaleAmount);
          console.log(this.bindgrid[0].SaleDate);

          if(res.Table.length!=0){
            this.btnPrev=false;
            this.btnNext=true;
        
          }

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

          this.data1=res.Table2
          this.IsshowHeading=true;
          console.log(this.data1)
          // this.data='Showing '+res.Table.length+' out of ' + res.Table1[0].Total + '';
          this.data=' ';
        }
        else
        {
          this.ISSummary=false;
          this.ISMaingrid=false;
          this.IsshowHeading=false;
          this.btnNext=false;
          this.btnPrev=false;
          // this.data1={};
        }
          this.ShowLoaderp=false;
          this.showGrid=true;
          });

    });
}



  bindGrid(){

    let item = JSON.parse(sessionStorage.getItem('User'));
    var usertype=this.Dbsecurity.Decrypt(item.UserType);
    var userid, CustomerAccountNo;
    this.PageCount=1
    if(usertype == 2 ||usertype == 3 || usertype == 4){

      const IsCustomerAccount = this.capitalStatForm.get('CustomerAccount');
      IsCustomerAccount.setValidators(Validators.required); IsCustomerAccount.updateValueAndValidity();
     if(this.capitalStatForm.controls['CustomerAccount'].value != 0){
      

     }
   

      CustomerAccountNo= this.Dbsecurity.Encrypt(this.capitalStatForm.controls['CustomerAccount'].value);
    }
    else{
      const IsCustomerAccount = this.capitalStatForm.get('CustomerAccount');
      IsCustomerAccount.clearValidators(); IsCustomerAccount.updateValueAndValidity();
      CustomerAccountNo= item.AccountNo

    }
    if(usertype == 3){

      
      const IsEmployee = this.capitalStatForm.get('Employee1');
      IsEmployee.setValidators(Validators.required); IsEmployee.updateValueAndValidity();
      // CustomerAccountNo= this.Dbsecurity.Encrypt(this.capitalStatForm.controls['Employee1'].value);

    }
    else{
      const IsEmployee = this.capitalStatForm.get('Employee1');
      IsEmployee.clearValidators(); IsEmployee.updateValueAndValidity();
      // CustomerAccountNo= item.AccountNo

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

      // var pagecount=1


      // if(usertype == 2 && this.capitalStatForm.controls['CustomerAccount'].value == 0){

      //  CustomerAccountNo= this.Dbsecurity.Encrypt('6010001');
      // // this.NextData('');
      // // return false;
      // }


      
      // if(usertype == 3 && this.capitalStatForm.controls['CustomerAccount'].value == 0){

      //   CustomerAccountNo= this.Dbsecurity.Encrypt('6010001');
      //   // this.NextData('');
      //   // return false;
      // }


   var jasondata= {
    "fromdate":this.capitalStatForm.controls['Formdate'].value ,
    "PageCount": this.PageCount,
    "todate":this.capitalStatForm.controls['Todate'].value,
    "UserId": item.UserId,
    "CustomerAccountNo": CustomerAccountNo

  }
  console.log('jasondata')
  console.log(jasondata)
  this.ShowLoaderp=true;
  this.showGrid=false;
this._capitalStateService.BindGrid(jasondata).subscribe((res)=>{

  this.bindgrid=res.Table;
  console.log(this.bindgrid)
  //this.pagination=res.Table1;
  if(res.Table.length!=0){
    this.btnPrev=false;
    this.btnNext=true;

  
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

  // if(this.PageCount%2 != 0){
  //   this.ISSummary=false;
  //   this.ISMaingrid=true;

  //  // this.bindGrid();
  // }
  // else{
  //   this.ISSummary=true;
  //   this.ISMaingrid=false;
  // }

  console.log(this.bindgrid);
  this.SumSaleAmount=res.Table1[0].SumSaleAmount;
  this.SumPurchaseAmount=res.Table1[0].SumPurchaseAmount;
  this.SumIndexedCost=res.Table1[0].SumIndexedCost;
  this.SumST=res.Table1[0].SumST;
  this.SumLT=res.Table1[0].SumLT;
  this.SumAfterIndex_LT=res.Table1[0].SumAfterIndex_LT;

  this.data1=res.Table2
  this.IsshowHeading=true;
  console.log(this.data1)
  this.ISSummary=false;
  this.ISMaingrid=true;
//var pagecnt=1
  // if(this.PageCount%2 != 0){
  //   this.ISSummary=false;
  //   this.ISMaingrid=true;

  // }
  // else{
  //   this.ISSummary=true;
  //   this.ISMaingrid=false;
  //   //this.NextData();
  // }
this.currentpagecount=res.Table.length;
this.totalpagecount=res.Table1[0].Total ;
  // this.data='Showing '+res.Table.length+' out of ' + res.Table1[0].Total + '';
  this.data=' ';


  
}
else
{
  this.ISSummary=false;
  this.ISMaingrid=false;
  this.IsshowHeading=false;
  this.btnNext=false;
  this.btnPrev=false;
  // this.data1={};
}
this.ShowLoaderp=false;
this.showGrid=true;
})
}


  }


//   bindGrid(CustomerAccountNo,FromDate,ToDate,PageCount1){



//     let item = JSON.parse(sessionStorage.getItem('User'));
//     var usertype=this.Dbsecurity.Decrypt(item.UserType);
//     var userid, CustomerAccountNo;
//     if(usertype == 2 ||usertype == 3 || usertype == 4){

//       const IsCustomerAccount = this.capitalStatForm.get('CustomerAccount');
//       IsCustomerAccount.setValidators(Validators.required); IsCustomerAccount.updateValueAndValidity();
//     //  if(this.capitalStatForm.controls['CustomerAccount'].value != 0){
//     //   this.PageCount=1

//     //  }

//       CustomerAccountNo= this.Dbsecurity.Encrypt(this.capitalStatForm.controls['CustomerAccount'].value);
//     }
//     else{
//       const IsCustomerAccount = this.capitalStatForm.get('CustomerAccount');
//       IsCustomerAccount.clearValidators(); IsCustomerAccount.updateValueAndValidity();
//       CustomerAccountNo= item.AccountNo

//     }
//     if(usertype == 3){
//       const IsEmployee = this.capitalStatForm.get('Employee1');
//       IsEmployee.setValidators(Validators.required); IsEmployee.updateValueAndValidity();
//       // CustomerAccountNo= this.Dbsecurity.Encrypt(this.capitalStatForm.controls['Employee1'].value);

//     }
//     else{
//       const IsEmployee = this.capitalStatForm.get('Employee1');
//       IsEmployee.clearValidators(); IsEmployee.updateValueAndValidity();
//       // CustomerAccountNo= item.AccountNo

//     }

//     this.submitted = true;
//     if (this.capitalStatForm.invalid) {
//       return;
//     }
//     else{
//       let item = JSON.parse(sessionStorage.getItem('User'));
//       var usertype=this.Dbsecurity.Decrypt(item.UserType);
//       var userid, CustomerAccountNo;

//       // if(usertype == 2 ||usertype == 3 || usertype == 4){

//       //   //userid=this.StatementDividendForm.controls['CustomerAccount'].value accountno
//       //   CustomerAccountNo= this.Dbsecurity.Encrypt(this.capitalStatForm.controls['CustomerAccount'].value);

//       // }
//       // else
//       // {
//       //   userid= item.UserId
//       // }

//       var FromDate= this.capitalStatForm.controls['Formdate'].value;
//       var ToDate=this.capitalStatForm.controls['Todate'].value;
//       var PageCount1=this.PageCount;
//    var jasondata= {
//     "fromdate":FromDate ,
//     "PageCount": PageCount1,
//     "todate":ToDate,
//     "UserId": item.UserId,
//     "CustomerAccountNo": CustomerAccountNo

//   }
//   console.log('jasondata')
//   console.log(jasondata)
//   this.ShowLoaderp=true;
// this._capitalStateService.BindGrid(jasondata).subscribe((res)=>{

//   this.bindgrid=res.Table;
//   //this.pagination=res.Table1;
//   console.log('bindgrid');
//   console.log(res);
//   console.log(res.Table[0].SaleAmount);
//   console.log(this.bindgrid[0].SaleDate);

//   for(var i=0;i<res.Table.length;i++){

//     if(this.bindgrid[i].SaleAmount == null){
//       this.bindgrid[i].SaleAmount = ''
//       // this.bindgrid1[i].FromDate = ''
//       // this.bindgrid1[i].Amount = ''
//     }
//     if( this.bindgrid[i].PurchaseAmount == null){
//       this.bindgrid[i].PurchaseAmount = ''
//     }
//     if( this.bindgrid[i].IndexedCost == null){
//       this.bindgrid[i].IndexedCost = ''
//     }
//     if( this.bindgrid[i].LT == null){
//       this.bindgrid[i].LT = ''
//     }
//     if( this.bindgrid[i].AfterIndex_LT == null){
//       this.bindgrid[i].AfterIndex_LT = ''
//     }


//   }

//   console.log(this.bindgrid);
//   this.SumSaleAmount=res.Table1[0].SumSaleAmount;
//   this.SumPurchaseAmount=res.Table1[0].SumPurchaseAmount;
//   this.SumIndexedCost=res.Table1[0].SumIndexedCost;
//   this.SumST=res.Table1[0].SumST;
//   this.SumLT=res.Table1[0].SumLT;
//   this.SumAfterIndex_LT=res.Table1[0].SumAfterIndex_LT;

//   this.data1=res.Table2
//   console.log(this.data1)

//   this.ShowLoaderp=false;

//   })
// }

//   }

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

  // downloadPDFFile(){

  //   debugger;
  //   var doc = new jsPDF();

  //   doc.setFontSize(11);
  //   doc.setTextColor(100);

  //   (doc as any).autoTable({
  //     head: this.head,
  //     body: this.bindgrid,
  //     theme: 'plain',
  //     didDrawCell: data => {
  //       console.log(data.column.index)
  //     }
  //   })
  //       // Open PDF document in new tab
  //     doc.output('dataurlnewwindow')

  //     // Download PDF document
  //     doc.save('StatementOfExpenses.pdf');

  // }



  // downloadPDF(){
  //   this.showhead=false;
  //   // const elementToPrint = document.getElementById('tbldiv'); //The html element to become a pdf
  //   // //const pdf = new jsPDF('p', 'pt', 'a4');
  //   // const pdf = new jsPDF();
  //   // pdf.addHTML(elementToPrint, () => {
  //   //     pdf.save('web.pdf');
  //   // });
  //   var doc = new jsPDF('legal', 'pt','a3' );
  //   // doc.text("From HTML", 40, 50);legal
  //    //doc.text( 40, 50);
  //    var res = doc.autoTableHtmlToJson(document.getElementById("gridmain"));
  //    console.log('downloadpdf')
  //    console.log(res)
  //  console.log(res.data)
  //  console.log(res.data[0])
  //    doc.autoTable(res.columns, res.data, {
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
  
    // var data = document.getElementById('capitalStatementGrid');  
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
    //     pdf.save('CapitalStatement Gain/Loss_Html.pdf'); // Generated PDF   
    //   });    
    
  
  }



}
