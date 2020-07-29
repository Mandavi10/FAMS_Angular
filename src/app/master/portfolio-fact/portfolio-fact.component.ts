import { Component, OnInit } from '@angular/core';
import{CapitalSatementService} from '../../Services/CapitalStatement/capital-satement.service';
import {FormBuilder,FormControl,FormGroup,Validator, Validators} from '@angular/forms';
import{DbsecurityService}from '../../Services/dbsecurity.service';
import {Bindcustomerallfields} from '../../../Models/SummaryReport/Bindcustomerallfields';
import { Commonfields } from '../../../Models/commonfields';
import{PortfolioFactService} from '../../Services/PortfolioFact/portfolio-fact.service';
import{SectorAllocation,portfolioSummary,PortfolioHolding,PortfolioPerformance} from '../../../Models/PortfolioFact/portfolioFact';
import{CapitalStatementModel,BindEmployees,BindCustomer} from '../../../Models/CapitalStatement/capitalStatement';
import { ReactiveFormsModule } from '@angular/forms'
@Component({
  selector: 'app-portfolio-fact',
  templateUrl: './portfolio-fact.component.html',
  styleUrls: ['./portfolio-fact.component.css']
})
export class PortfolioFactComponent implements OnInit {


  PortFolioForm:FormGroup
  sectorAllocation:SectorAllocation;
  portfolioSummary:portfolioSummary;
  portfolioHolding:PortfolioHolding;
  PortfolioPerformance:PortfolioPerformance;
  BindcustomerallfieldsList : Bindcustomerallfields;
  CustNameDive:boolean;
  divEmployee:boolean;
  CustomerAccount:string;
  ShowLoaderp:boolean;
  BindemployeesList:BindEmployees;
  PageCount=1
  btnPrev:boolean;
  btnNext:boolean; 
  submitted = false;
  public data1={};
  SumAsstes:number;
  SumMktValue:number;
  SumPerAssets:number;
  sumarryheading1:string;
  sumarryheading2:string;
  sumarry1:string;
  sumarry2:string;
  sumarry3:string;
  sumarry4:string;
  sumarry5:string;
  sumarry6:string;
  sumarry7:string;
  sumarry8:string;
  performanceheading1:string;
  performanceheading2:string;
  performanceheading3:string;
  performanceheading4:string;
  performanceheading5:string;
  performance1:string;
  performance2:string;
  performance3:string;
  performance4:string;
  performance5:string;
  performance6:string;
  performance7:string;
  performance8:string;
  performance9:string;
  performance10:string;
  performance11:string;
  performance12:string;
  performance13:string;
  performance14:string;
  performance15:string;
  performance16:string;
  performance17:string;
  performance18:string;
  performance19:string;
  performance20:string;

  FromDate:string;
  ToDate:string;
  summary={};
  showperformance:boolean;
  showsummary:boolean;
  showholding:boolean;
  showsector:boolean;
  showmainheading:boolean;
  showGrid:boolean;

  constructor(private _porfolioFactService:PortfolioFactService,private formbuilder:FormBuilder, private _capitalStateService:CapitalSatementService,private Dbsecurity: DbsecurityService) { }

  ngOnInit() {

    this.btnNext=false;
    this.btnPrev=false;

    this.PortFolioForm=this.formbuilder.group({
      CustomerAccount:['',Validators.required],
      Formdate:['',Validators.required],
      Todate:['',Validators.required] ,
      Employee1:['',Validators.required]

    })

    this.Showcustdropdown();
    this.BindDefaultData();
  }

  get f() {
    return this.PortFolioForm.controls;
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
     
      this.CustomerAccount = "";
      this.CustNameDive=true;
      this.divEmployee=true;
      
      this.BindEmployee();
  
    }
  
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
  
     UserId =this.Dbsecurity.Encrypt(this.PortFolioForm.controls['Employee1'].value);
  
    }
  
    this._capitalStateService.BindCustomers(UserId).subscribe(
      (data) => {
      //  this.totalcustomer=data.Table.length;
        
           this.BindcustomerallfieldsList = data.Table;
      });
  }


  LastOneMonthFun(){
    var date = new Date();
    var currentDate = date.toISOString().slice(0,10);
    this.PortFolioForm.controls['Todate'].setValue(currentDate);
    date.setDate(date.getDate() - 30);
    var yesterday = date.toISOString().slice(0,10);
    this.PortFolioForm.controls['Formdate'].setValue(yesterday);
  }
  
  PreviousDayFun(){
    var date = new Date();
    var currentDate = date.toISOString().slice(0,10);
    console.log(currentDate);
    this.PortFolioForm.controls['Todate'].setValue(currentDate);
    date.setDate(date.getDate() - 1);
    var yesterday = date.toISOString().slice(0,10);
    console.log(yesterday);
    this.PortFolioForm.controls['Formdate'].setValue(yesterday);
  
    
          
  }
  
  LastOneWeekFun(){
    var date = new Date();
    var currentDate = date.toISOString().slice(0,10);
    console.log(currentDate);
    this.PortFolioForm.controls['Todate'].setValue(currentDate);
    date.setDate(date.getDate() - 7);
    var yesterday = date.toISOString().slice(0,10);
    console.log(yesterday);
    this.PortFolioForm.controls['Formdate'].setValue(yesterday);
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
//  if(Usertype == 3){
//  if(this.PageCount == this.totalpagecount){
//    this.btnNext=false; 
   

//  }
// }
// if(Usertype == 2){
//   // alert(this.PageCount)
//   // alert(this.totalcustomer)
//   if(this.PageCount == this.totalcustomer){
//     this.btnNext=false;
  
//   }
//  }



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

  // if(Usertype == 3){
  //   if(this.PageCount < this.totalpagecount){
  //     this.btnNext=true;
      
   
  //   }
  //  }
  
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
//this.data=' ';

  var JsonData ={
    "UserId" : item.UserId,
    "CustomerAccountNo" :this.PortFolioForm.controls['CustomerAccount'].value,
    "PageCount" : this.PageCount
  }

  var pagecountb=this.PageCount;

  this._porfolioFactService.BindNextData(JsonData).subscribe(
    (data) => {

      if(data.Table.length > 0){
      this.FromDate = data.Table[0]["AsOnDate"];
      this.ToDate = data.Table[0]["AsOnDate"];
      // this.CustomerAccount = "";
      // this.CustomerAccount = this.Dbsecurity.Encrypt(data.Table[0]["CustomerAccountNo"]);

     // this.CustomerAccount = this.Dbsecurity.Encrypt(data.Table[0]["CustomerAccountNo"]); 
      
      if(this.PortFolioForm.controls['CustomerAccount'].value != 0){
        var pagecount=1; 
         this.CustomerAccount = this.Dbsecurity.Encrypt(data.Table[0]["CustomerAccountNo"]); 

       }
       else{
      this.CustomerAccount=this.Dbsecurity.Encrypt(this.PortFolioForm.controls['CustomerAccount'].value);
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
       var temppgcount=1
      var JsonData ={
        "UserId" : item.UserId,
        "fromdate" : this.FromDate,
        "todate" :  this.ToDate,
        "CustomerAccountNo" : this.CustomerAccount ,
        "PageCount" :temppgcount//pagecount
      }
      this.ShowLoaderp=true;
      this.showGrid=false;
      this._porfolioFactService.BindGrid(JsonData).subscribe((res)=>{
        console.log('portgoliofactgird');
      console.log(res);
      this.sectorAllocation=res.Table;
      this.portfolioHolding=res.Table2;
    this.portfolioSummary=res.Table4;
    this.PortfolioPerformance=res.Table5;
    console.log(this.portfolioSummary);
    
    

    this.sumarryheading1=res.Table4[0].Heading;
this.sumarryheading2=res.Table4[0].Data;

this.sumarry1=res.Table4[1].Heading;
this.sumarry2=res.Table4[1].Data;
this.sumarry3=res.Table4[2].Heading;
this.sumarry4=res.Table4[2].Data;
this.sumarry5=res.Table4[3].Heading;
this.sumarry6=res.Table4[3].Data;
this.sumarry7=res.Table4[4].Heading;
this.sumarry8=res.Table4[4].Data;

this.performanceheading1=res.Table5[0].Heading
this.performanceheading2=res.Table5[0].Data1
this.performanceheading3=res.Table5[0].Data2
this.performanceheading4=res.Table5[0].Data3
this.performanceheading5=res.Table5[0].Data4


this.performance1=res.Table5[1].Heading
this.performance2=res.Table5[1].Data1
this.performance3=res.Table5[1].Data2
this.performance4=res.Table5[1].Data3
this.performance5=res.Table5[1].Data4


this.performance6=res.Table5[2].Heading
this.performance7=res.Table5[2].Data1
this.performance8=res.Table5[2].Data2
this.performance9=res.Table5[2].Data3
this.performance10=res.Table5[2].Data4

this.performance11=res.Table5[3].Heading
this.performance12=res.Table5[3].Data1
this.performance13=res.Table5[3].Data2
this.performance14=res.Table5[3].Data3
this.performance15=res.Table5[3].Data4
    

      
      this.SumAsstes=res.Table1[0].SumAsstes;
      this.SumMktValue=res.Table3[0].SumMktValue;
      this.SumPerAssets=res.Table3[0].SumPerAssets;
    
      this.data1=res.Table6;
      
      // if(res.Table.length!=0 && this.PortFolioForm.controls['CustomerAccount'].value == 0){
      //   this.btnPrev=false;
      //   this.btnNext=true; 
      
      // }
      
      
      // for(var i=0;i<res.Table.length;i++){
         
      //   if(this.bindgrid[i].ReceivedDate == ""){
      //     this.bindgrid[i].ReceivedDate = ''
      //     // this.bindgrid1[i].FromDate = ''
      //     // this.bindgrid1[i].Amount = ''
      //   }
        
      
      // }
      
      
     
      
      // console.log(this.bindgrid)
      // console.log(this.pagination)
      
      // // this.data='Showing '+res.Table.length+' out of ' + res.Table1[0].Total + '';
      // this.data=' ';
      // this.totalpagecount=res.Table1[0].Total
      
     
      
      this.showGrid=true;
      this.ShowLoaderp=false;
      
      
      }) 
        }
        else{
          // this.btnNext=false;
          // this.btnPrev=true;
        }

    });
}


  BindDefaultData(){
    // this.loader1=true;this.loader2=true;
  
    
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    let  Data = new Commonfields();
    Data.UserId = Sessionvalue.UserId;
    
    this._porfolioFactService.BindDefaultData(JSON.stringify(Data)).subscribe(
      (data) => {
        this.FromDate = data.Table[0]["AsOnDate"];
        this.ToDate = data.Table[0]["AsOnDate"];
        this.CustomerAccount = data.Table[0]["CustomerAccountNo"];
        // console.log('default');
        // console.log(data.Table[0].FromDate);
        this.PortFolioForm.controls["Formdate"].setValue(data.Table[0].AsOnDate);
        this.PortFolioForm.controls["Todate"].setValue(data.Table[0].AsOnDate);
        this.PortFolioForm.controls["CustomerAccount"].setValue(data.Table[0].CustomerAccountNo);
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
        this._porfolioFactService.BindGrid(JsonData).subscribe((res)=>{
          if(res.Table.length >0 && res.Table2.length >0 &&res.Table4.length >0  && res.Table5.length >0 ){
          console.log('portgoliofactgird');
        console.log(res);
        this.sectorAllocation=res.Table;
        this.portfolioHolding=res.Table2;
      this.portfolioSummary=res.Table4;
      this.PortfolioPerformance=res.Table5;
      console.log(this.portfolioSummary);
      
      this.sumarryheading1=res.Table4[0].Heading;
this.sumarryheading2=res.Table4[0].Data;

this.sumarry1=res.Table4[1].Heading;
this.sumarry2=res.Table4[1].Data;
this.sumarry3=res.Table4[2].Heading;
this.sumarry4=res.Table4[2].Data;
this.sumarry5=res.Table4[3].Heading;
this.sumarry6=res.Table4[3].Data;
this.sumarry7=res.Table4[4].Heading;
this.sumarry8=res.Table4[4].Data;

this.performanceheading1=res.Table5[0].Heading
this.performanceheading2=res.Table5[0].Data1
this.performanceheading3=res.Table5[0].Data2
this.performanceheading4=res.Table5[0].Data3
this.performanceheading5=res.Table5[0].Data4


this.performance1=res.Table5[1].Heading
this.performance2=res.Table5[1].Data1
this.performance3=res.Table5[1].Data2
this.performance4=res.Table5[1].Data3
this.performance5=res.Table5[1].Data4


this.performance6=res.Table5[2].Heading
this.performance7=res.Table5[2].Data1
this.performance8=res.Table5[2].Data2
this.performance9=res.Table5[2].Data3
this.performance10=res.Table5[2].Data4

this.performance11=res.Table5[3].Heading
this.performance12=res.Table5[3].Data1
this.performance13=res.Table5[3].Data2
this.performance14=res.Table5[3].Data3
this.performance15=res.Table5[3].Data4
      
      
        
        this.SumAsstes=res.Table1[0].SumAsstes;
        this.SumMktValue=res.Table3[0].SumMktValue;
        this.SumPerAssets=res.Table3[0].SumPerAssets;
      
        this.data1=res.Table6;
        this.showmainheading=true;

        this. showperformance=true;
        this.showsummary=true;
        this.showholding=true;
        this.showsector=true;
        
        // if(res.Table.length!=0 && this.PortFolioForm.controls['CustomerAccount'].value == 0){
        //   this.btnPrev=false;
        //   this.btnNext=true; 
        
        // }
        
        
        // for(var i=0;i<res.Table.length;i++){
           
        //   if(this.bindgrid[i].ReceivedDate == ""){
        //     this.bindgrid[i].ReceivedDate = ''
        //     // this.bindgrid1[i].FromDate = ''
        //     // this.bindgrid1[i].Amount = ''
        //   }
          
        
        // }
        
        
       
        
        // console.log(this.bindgrid)
        // console.log(this.pagination)
        
        // // this.data='Showing '+res.Table.length+' out of ' + res.Table1[0].Total + '';
        // this.data=' ';
        // this.totalpagecount=res.Table1[0].Total
        
       
          }
          else{
            this. showperformance=false;
             this.showsummary=false;
             this.showholding=false;
             this.showsector=false;
             this.btnPrev=false;
             this.btnNext=false;
             this.showmainheading=false;
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
     
      const IsCustomerAccount = this.PortFolioForm.get('CustomerAccount');
      IsCustomerAccount.setValidators(Validators.required); IsCustomerAccount.updateValueAndValidity();
      CustomerAccountNo= this.Dbsecurity.Encrypt(this.PortFolioForm.controls['CustomerAccount'].value);
    }
    else{
      const IsCustomerAccount = this.PortFolioForm.get('CustomerAccount');
      IsCustomerAccount.clearValidators(); IsCustomerAccount.updateValueAndValidity();
      CustomerAccountNo= item.AccountNo
      
    }
  
    if(usertype == 3){
  
        
      const IsEmployee = this.PortFolioForm.get('Employee1');
      IsEmployee.setValidators(Validators.required); IsEmployee.updateValueAndValidity();
      // CustomerAccountNo= this.Dbsecurity.Encrypt(this.capitalStatForm.controls['Employee1'].value);
  
    }
    else{
      const IsEmployee = this.PortFolioForm.get('Employee1');
      IsEmployee.clearValidators(); IsEmployee.updateValueAndValidity();
      // CustomerAccountNo= item.AccountNo
  
    }
    this.submitted = true;
    if (this.PortFolioForm.invalid) {
      
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

       // if(usertype == 2 && this.StatementDividendForm.controls['CustomerAccount'].value == 0){
  
  //   // CustomerAccountNo= this.Dbsecurity.Encrypt('6010001');
  //   // this.NextData('');
  //   // return false;
  //   //alert('insearch')
  //   this.btnPrev=true;
  //  this.btnNext==true;
  //   }
     
       
      //  if(usertype == 3 && this.StatementDividendForm.controls['CustomerAccount'].value == 0){
  
      //    CustomerAccountNo= this.Dbsecurity.Encrypt('6010001');
      //   //  this.btnNext==true;
      //    // this.NextData(''); 
      //    // return false;
      //  }
   var jasondata= {
    "fromdate":this.PortFolioForm.controls['Formdate'].value ,
    "PageCount": this.PageCount,
    "todate":this.PortFolioForm.controls['Todate'].value,
    "UserId": userid,
    "CustomerAccountNo": CustomerAccountNo
   
  }
  this.ShowLoaderp=true;
  this.showGrid=false;
  this._porfolioFactService.BindGrid(jasondata).subscribe((res)=>{

    if(res.Table.length >0 && res.Table2.length >0 &&res.Table4.length >0  && res.Table5.length >0 ){
    console.log('portgoliofactgird');
  console.log(res);
  this.sectorAllocation=res.Table;
  this.portfolioHolding=res.Table2;
this.portfolioSummary=res.Table4;
this.PortfolioPerformance=res.Table5;
console.log(this.portfolioSummary);


// for(var i=1;i<res.Table4.length;i++){
//   this.summary=res.Table4[i].Heading;
//   this.summary=res.Table4[i].Data;

// }
this.sumarryheading1=res.Table4[0].Heading;
this.sumarryheading2=res.Table4[0].Data;

this.sumarry1=res.Table4[1].Heading;
this.sumarry2=res.Table4[1].Data;
this.sumarry3=res.Table4[2].Heading;
this.sumarry4=res.Table4[2].Data;
this.sumarry5=res.Table4[3].Heading;
this.sumarry6=res.Table4[3].Data;
this.sumarry7=res.Table4[4].Heading;
this.sumarry8=res.Table4[4].Data;

this.performanceheading1=res.Table5[0].Heading
this.performanceheading2=res.Table5[0].Data1
this.performanceheading3=res.Table5[0].Data2
this.performanceheading4=res.Table5[0].Data3
this.performanceheading5=res.Table5[0].Data4


this.performance1=res.Table5[1].Heading
this.performance2=res.Table5[1].Data1
this.performance3=res.Table5[1].Data2
this.performance4=res.Table5[1].Data3
this.performance5=res.Table5[1].Data4


this.performance6=res.Table5[2].Heading
this.performance7=res.Table5[2].Data1
this.performance8=res.Table5[2].Data2
this.performance9=res.Table5[2].Data3
this.performance10=res.Table5[2].Data4

this.performance11=res.Table5[3].Heading
this.performance12=res.Table5[3].Data1
this.performance13=res.Table5[3].Data2
this.performance14=res.Table5[3].Data3
this.performance15=res.Table5[3].Data4

// this.performance16=res.Table5[4].Heading
// this.performance17=res.Table5[4].Data1
// this.performance18=res.Table5[4].Data2
// this.performance19=res.Table5[4].Data3
// this.performance20=res.Table5[4].Data4





console.log('summaryheading')
console.log(this.sumarryheading1);
console.log(this.sumarryheading2);
console.log(this.summary);




  
  this.SumAsstes=res.Table1[0].SumAsstes;
  this.SumMktValue=res.Table3[0].SumMktValue;
  this.SumPerAssets=res.Table3[0].SumPerAssets;

  this.data1=res.Table6;
  
  if(res.Table.length!=0 && this.PortFolioForm.controls['CustomerAccount'].value == 0){
    this.btnPrev=false;
    this.btnNext=true; 
  
  }
  this. showperformance=true;
  this.showsummary=true;
  this.showholding=true;
  this.showsector=true;
  this.showmainheading=true;
  
  
  // for(var i=0;i<res.Table.length;i++){
     
  //   if(this.bindgrid[i].ReceivedDate == ""){
  //     this.bindgrid[i].ReceivedDate = ''
  //     // this.bindgrid1[i].FromDate = ''
  //     // this.bindgrid1[i].Amount = ''
  //   }
    
  
  // }
  
  
 
  
  // console.log(this.bindgrid)
  // console.log(this.pagination)
  
  // // this.data='Showing '+res.Table.length+' out of ' + res.Table1[0].Total + '';
  // this.data=' ';
  // this.totalpagecount=res.Table1[0].Total
  
}
else{
 this. showperformance=false;
  this.showsummary=false;
  this.showholding=false;
  this.showsector=false;
  this.btnPrev=false;
  this.btnNext=false;
  this.showmainheading=false;
}

  
  
  this.ShowLoaderp=false;
  this.showGrid=true;
  
  
  })
  }
  
  }




}
