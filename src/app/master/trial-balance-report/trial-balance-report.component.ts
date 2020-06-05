import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import{JsonFieldData,Customer} from '../../../Models/TrialBalanceReport/json-field-data';
import{ResponseData} from '../../../Models/TrialBalanceReport/response-data';

import{TrialbalancereportService}from '../../Services/TrialBalanceReport/trialbalancereport.service';
import{DbsecurityService}from '../../Services/dbsecurity.service';





@Component({
  selector: 'app-trial-balance-report',
  templateUrl: './trial-balance-report.component.html',
  styleUrls: ['./trial-balance-report.component.css']
})
export class TrialBalanceReportComponent implements OnInit {
   BindSubAccountAssets : any= [];TrialBalanceForm: FormGroup; 
   AccountNo : any;customer:Customer ;_ResponseData:ResponseData
   tdCAOBDebit :any;tdCAOBCredit :any;tdCATransDebit :any;tdCATransCredit :any;tdCACBDebit :any;tdCACBCredit :any;tdCA1OBDebit :any;tdCA1OBCredit :any;tdCA1TransDebit :any;tdCA1TransCredit :any;tdCA1CBDebit :any;tdCA1CBCredit :any;tdCA2OBDebit :any;tdCA2OBCredit :any;
   tdCA2TransDebit :any;tdCA2TransCredit :any;tdCA2CBDebit :any;tdCA2CBCredit :any;tdCA3OBDebit :any;tdCA3OBCredit :any;tdCA3TransDebit :any;tdCA3TransCredit :any;tdCA3CBDebit :any;tdCA3CBCredit :any;ExpODebit :any;ExpOCredit :any;ExpTDebit :any;ExpTCredit :any;ExpCDebitS :any;ExpCCredit :any;
   Exp1ODebit :any;Exp1OCredit :any;Exp1TDebit :any;Exp1TCredit :any;Exp1CDebitS :any;Exp1CCredit :any;InODebit :any;InOCredit :any;InTDebit :any;InTCredit :any;InCDebit :any;InCCredit :any;In1ODebit :any;In1OCredit :any;In1TDebit :any;In1TCredit :any;In1CDebit :any;In1CCredit :any;
   In2ODebit :any;In2OCredit :any;In2TDebit :any;In2TCredit :any;In2CDebit :any;In2CCredit :any;LiaODebit :any;LiaOCredit :any;LiaTDebit :any;LiaTCredit :any;LiaCDebit :any;LiaCCredit :any;Lia1ODebit :any;Lia1OCredit :any;
   Lia1TDebit:any;Lia1TCredit:any;Lia1CDebit:any;Lia1CCredit:any;Lia2ODebit:any;Lia2OCredit:any;Lia2TDebit:any;Lia2TCredit:any;Lia2CDebit:any;Lia2CCredit:any;Lia3ODebit:any;Lia3OCredit:any;Lia3TDebit:any;Lia3TCredit:any;Lia3CDebit:any;Lia3CCredit:any;Lia4ODebit:any;Lia4TDebit:any;Lia4TCredit:any;Lia4CDebit:any;Lia4CCredit:any;Lia5ODebit:any;
   Lia5OCredit:any;Lia5TDebit:any;Lia5TCredit:any;Lia5CDebit:any;Lia5CCredit:any;totalODebit:any;totalOCredit:any;totalTDebit:any;totalTCredit:any;totalCDebit:any;totalCCredit:any;
   Lia4OCredit:any;
   currentdate : any;Fromdate : any; Todate : any;
  
   constructor(private _TrialBalanceService: TrialbalancereportService, private formBuilder: FormBuilder, private Dbsecurity: DbsecurityService) { }
  isShowCustomer:boolean=false;
  isTotal:boolean=false;
  isUnrealizedGain:boolean=false;
  isCurrentLiab:boolean=false;
  isCapital:boolean=false;
  isLiabilities:boolean=false;
  isGain:boolean=false;
  isDividend:boolean=false;
  isIncome:boolean=false;
  isExpense:boolean=false;
  isInvestment:boolean=false;
  isCurrentAssets:boolean=false;
  isAssets:boolean=false;



  accountNumber:string;
  userType:number;
  value:any;
  value1:any;
  TotalODebit :any;
  TotalOCredit :any;
  TotalTDebit :any;
  TotalTCredit :any;
  TotalCDebit :any;
  TotalCCredit :any;
    ngOnInit(): void {

      this.currentdate = new Date();
      this.TrialBalanceForm = this.formBuilder.group({  
       Fromdate :[''], Todate : ['']
    });
      let item = JSON.parse(sessionStorage.getItem('User'));
     
        this.userType=this.Dbsecurity.Decrypt( item.UserType);
        this.accountNumber=this.Dbsecurity.Decrypt( item.AccountNo);
        if(this.userType == 2)
        {
          this.isShowCustomer=true;
          this.BindCustomer();
        }
        else{
          this.isShowCustomer=false;
        }
    this.TrialBalanceForm = this.formBuilder.group({  
      CustomerAccount : [''], Account :[''], AccountSubLayer : [''], FromDate : [''], ToDate : [''],tdCAOBDebit:['']
  });
  //document.getElementById('Account').innerText = '';
  }
BindCustomer(){
  var currentContext = this;
  this._TrialBalanceService.BindCustomer().
      subscribe((data) => {
          currentContext.customer = data.Table;
      });

}
SubAccontsFunction(value1)
{
  this.value1 = value1;
}
  AccontsFunction(value){
  this.value = value;

    if(value=='1')
    {
      this.BindSubAccountAssets=[{text: 'Select', value: '' },
      {text: 'Current Assets', value: '2' },
      {text: 'Investment', value: '5' },
      {text: 'All', value: '50' },
    ];
    }
    else if(value=='3')
    {
      this.BindSubAccountAssets=[{text: 'Select', value: '' },
      {text: 'Dividend', value: '1' },
      {text: 'Gain/Loss', value: '2' },
      {text: 'All', value: '50' },
    ];
    }
    else if(value=='4')
    {
      this.BindSubAccountAssets=[{text: 'Select', value: '' },
      {text: 'Capital', value: '1' },
      {text: 'Current Liabilities', value: '2' },
      {text: 'Unrealized Gain\Loss', value: '3' },
      {text: 'All', value: '50' },

    ];
    }
    else if(value=='50')
    {
      this.BindSubAccountAssets=[
      {text: 'All', value: '50' },
    ];
  }
    else if(value=='2')
    {
      this.BindSubAccountAssets=[
      {text: 'All', value: '50' },
    ];
  }
    }    
      

    PreviousDayFun(){
      var date = new Date();
      var currentDate = date.toISOString().slice(0,10);
      this.TrialBalanceForm.controls['ToDate'].setValue(currentDate);
      date.setDate(date.getDate() - 1);
      var yesterday = date.toISOString().slice(0,10);
      this.TrialBalanceForm.controls['FromDate'].setValue(yesterday);
    }
    LastOneWeekFun(){
      var date = new Date();
      var currentDate = date.toISOString().slice(0,10);
      this.TrialBalanceForm.controls['ToDate'].setValue(currentDate);
      date.setDate(date.getDate() - 7);
      var yesterday = date.toISOString().slice(0,10);
      this.TrialBalanceForm.controls['FromDate'].setValue(yesterday);
    }
    LastOneMonthFun(){
      var date = new Date();
      var currentDate = date.toISOString().slice(0,10);
      this.TrialBalanceForm.controls['ToDate'].setValue(currentDate);
      date.setDate(date.getDate() - 30);
      var yesterday = date.toISOString().slice(0,10);
      this.TrialBalanceForm.controls['FromDate'].setValue(yesterday);
    }


  GetData(Todate,Fromdate)
  {
    // let _apipostdata = new JsonFieldData();
    // //_apipostdata.APPID=this.AllFields.APPID.value;
    // _apipostdata.CustomerAccount=this.Dbsecurity.Encrypt(this.AllFields.ddlCustomer.value);
    // _apipostdata.Account=this.AllFields.ddlAccount.value;
    // _apipostdata.AccountSubLayer=this.AllFields.ddlSubLayer.value;
    // _apipostdata.FromDate=this.AllFields.FromDate.value;
    // _apipostdata.ToDate=this.AllFields.ToDate.value;
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    
  let DataNew = new JsonFieldData();
if(this.Dbsecurity.Decrypt(Sessionvalue.UserType)!="2")
{
  DataNew.CustomerAccount = this.Dbsecurity.Decrypt(Sessionvalue.AccountNo);
  DataNew.Account = "50";
  DataNew.AccountSubLayer = "50";
  DataNew.FromDate = Fromdate;
  DataNew.ToDate = Todate;
}
else
{
  DataNew = this.TrialBalanceForm.value;

}
    //this.JsonFieldDataList.Account = this.TrialBalanceForm.get['Account'];
     this._TrialBalanceService.GetTrialData(JSON.stringify(DataNew)).subscribe((data) => 
     {   
      this._ResponseData= data.Table; 
      if(this.value==undefined && this.value1== undefined)
      {
this.value="50";
this.value1="50";
      }
        if(this.value=="1" && this.value1=="2")
        {
          this.isTotal=true;
          this.isUnrealizedGain=false;
          this.isCurrentLiab=false;
          this.isCapital=false;
          this.isLiabilities=false;
          this.isGain=false;
          this.isDividend=false;
          this.isIncome=false;
          this.isExpense=false;
          this.isInvestment=false;
          this.isCurrentAssets=true;
          this.isAssets=true;
        this.tdCAOBDebit = this._ResponseData[7].OBDebit;
        this.tdCAOBCredit = this._ResponseData[7].OBCredit;
        this.tdCATransDebit = this._ResponseData[7].TransDebit;
        this.tdCATransCredit = this._ResponseData[7].TransCredit;
        this.tdCACBDebit = this._ResponseData[7].CBDebit;
        this.tdCACBCredit = this._ResponseData[7].CBCredit;

        this.tdCA1OBDebit = this._ResponseData[8].OBDebit;
        this.tdCA1OBCredit = this._ResponseData[8].OBCredit;
        this.tdCA1TransDebit = this._ResponseData[8].TransDebit;
        this.tdCA1TransCredit = this._ResponseData[8].TransCredit;
        this.tdCA1CBDebit = this._ResponseData[8].CBDebit;
        this.tdCA1CBCredit = this._ResponseData[8].CBCredit;
        this.TotalODebit = "0";
        this.TotalOCredit = "0";
        this.TotalTDebit = "0";
        this.TotalTCredit = "0";
        this.TotalCDebit = "0";
        this.TotalCCredit = "0";
      this.TotalODebit = parseFloat(this.TotalODebit) + parseFloat(this._ResponseData[7].OBDebit);
        this.TotalODebit = parseFloat(this.TotalODebit) + parseFloat(this._ResponseData[8].OBDebit);
        this.TotalOCredit = parseFloat(this.TotalOCredit) + parseFloat(this._ResponseData[7].OBCredit);
          this.TotalOCredit = parseFloat(this.TotalOCredit) + parseFloat(this._ResponseData[8].OBCredit);
        this.TotalTDebit = parseFloat(this.TotalTDebit) + parseFloat(this._ResponseData[7].TransDebit);
        this.TotalTDebit = parseFloat(this.TotalTDebit) + parseFloat(this._ResponseData[8].TransDebit);
        this.TotalTCredit = parseFloat(this.TotalTCredit) + parseFloat(this._ResponseData[7].TransCredit);
        this.TotalTCredit = parseFloat(this.TotalTCredit) + parseFloat(this._ResponseData[8].TransCredit);
        this.TotalCDebit = parseFloat(this.TotalCDebit) + parseFloat(this._ResponseData[7].CBDebit);
          this.TotalCDebit = parseFloat(this.TotalCDebit) + parseFloat(this._ResponseData[8].CBDebit);
          this.TotalCCredit = parseFloat(this.TotalCCredit) + parseFloat(this._ResponseData[7].CBCredit);
      this.TotalCCredit = parseFloat(this.TotalCCredit) + parseFloat(this._ResponseData[8].CBCredit);

        this.totalODebit = this.TotalODebit;
        this.totalOCredit = this.TotalOCredit;
        this.totalTDebit = this.TotalTDebit;
        this.totalTCredit = this.TotalTCredit;
        this.totalCDebit = this.TotalCDebit;
        this.totalCCredit = this.TotalCCredit;
       }   
           
       if(this.value=="1" && this.value1=="5")
       {
        this.isTotal=true;
        this.isUnrealizedGain=false;
        this.isCurrentLiab=false;
        this.isCapital=false;
        this.isLiabilities=false;
        this.isGain=false;
        this.isDividend=false;
        this.isIncome=false;
        this.isExpense=false;
        this.isInvestment=true;
        this.isCurrentAssets=false;
        this.isAssets=true;
       this.tdCA2OBDebit = this._ResponseData[7].OBDebit;
       this.tdCA2OBCredit = this._ResponseData[7].OBCredit;
       this.tdCA2TransDebit = this._ResponseData[7].TransDebit;
       this.tdCA2TransCredit = this._ResponseData[7].TransCredit;
       this.tdCA2CBDebit = this._ResponseData[7].CBDebit;
       this.tdCA2CBCredit = this._ResponseData[7].CBCredit;

       this.tdCA3OBDebit = this._ResponseData[8].OBDebit;
       this.tdCA3OBCredit = this._ResponseData[8].OBCredit;
       this.tdCA3TransDebit = this._ResponseData[8].TransDebit;
       this.tdCA3TransCredit = this._ResponseData[8].TransCredit;
       this.tdCA3CBDebit = this._ResponseData[8].CBDebit;
       this.tdCA3CBCredit = this._ResponseData[8].CBCredit;
       this.TotalODebit = "0";
       this.TotalOCredit = "0";
       this.TotalTDebit = "0";
       this.TotalTCredit = "0";
       this.TotalCDebit = "0";
       this.TotalCCredit = "0";
     this.TotalODebit = parseFloat(this.TotalODebit) + parseFloat(this._ResponseData[7].OBDebit);
       this.TotalODebit = parseFloat(this.TotalODebit) + parseFloat(this._ResponseData[8].OBDebit);
       this.TotalOCredit = parseFloat(this.TotalOCredit) + parseFloat(this._ResponseData[7].OBCredit);
         this.TotalOCredit = parseFloat(this.TotalOCredit) + parseFloat(this._ResponseData[8].OBCredit);
       this.TotalTDebit = parseFloat(this.TotalTDebit) + parseFloat(this._ResponseData[7].TransDebit);
       this.TotalTDebit = parseFloat(this.TotalTDebit) + parseFloat(this._ResponseData[8].TransDebit);
       this.TotalTCredit = parseFloat(this.TotalTCredit) + parseFloat(this._ResponseData[7].TransCredit);
       this.TotalTCredit = parseFloat(this.TotalTCredit) + parseFloat(this._ResponseData[8].TransCredit);
       this.TotalCDebit = parseFloat(this.TotalCDebit) + parseFloat(this._ResponseData[7].CBDebit);
         this.TotalCDebit = parseFloat(this.TotalCDebit) + parseFloat(this._ResponseData[8].CBDebit);
         this.TotalCCredit = parseFloat(this.TotalCCredit) + parseFloat(this._ResponseData[7].CBCredit);
     this.TotalCCredit = parseFloat(this.TotalCCredit) + parseFloat(this._ResponseData[8].CBCredit);

       this.totalODebit = this.TotalODebit;
       this.totalOCredit = this.TotalOCredit;
       this.totalTDebit = this.TotalTDebit;
       this.totalTCredit = this.TotalTCredit;
       this.totalCDebit = this.TotalCDebit;
       this.totalCCredit = this.TotalCCredit;
      }   

      if(this.value=="1" && this.value1=="50")
      {
        this.isTotal=true;
        this.isUnrealizedGain=false;
        this.isCurrentLiab=false;
        this.isCapital=false;
        this.isLiabilities=false;
        this.isGain=false;
        this.isDividend=false;
        this.isIncome=false;
        this.isExpense=false;
        this.isInvestment=true;
        this.isCurrentAssets=true;
        this.isAssets=true;
        // alert(this._ResponseData[7].OBDebit);
        // this.SpamtdCAOBDebit = this._ResponseData[7].OBDebit;
        // alert(this.SpamtdCAOBDebit);
        this.TrialBalanceForm.controls['tdCAOBDebit'].setValue(this._ResponseData[7].OBDebit);
      //this.tdCAOBDebit = this._ResponseData[7].OBDebit;
      this.tdCAOBCredit = this._ResponseData[7].OBCredit;
      this.tdCATransDebit = this._ResponseData[7].TransDebit;
      this.tdCATransCredit = this._ResponseData[7].TransCredit;
      this.tdCACBDebit = this._ResponseData[7].CBDebit;
      this.tdCACBCredit = this._ResponseData[7].CBCredit;

      this.tdCA1OBDebit = this._ResponseData[8].OBDebit;
      this.tdCA1OBCredit = this._ResponseData[8].OBCredit;
      this.tdCA1TransDebit = this._ResponseData[8].TransDebit;
      this.tdCA1TransCredit = this._ResponseData[8].TransCredit;
      this.tdCA1CBDebit = this._ResponseData[8].CBDebit;
      this.tdCA1CBCredit = this._ResponseData[8].CBCredit;

      this.tdCA2OBDebit = this._ResponseData[7].OBDebit;
      this.tdCA2OBCredit = this._ResponseData[7].OBCredit;
      this.tdCA2TransDebit = this._ResponseData[7].TransDebit;
      this.tdCA2TransCredit = this._ResponseData[7].TransCredit;
      this.tdCA2CBDebit = this._ResponseData[7].CBDebit;
      this.tdCA2CBCredit = this._ResponseData[7].CBCredit;

      this.tdCA3OBDebit = this._ResponseData[8].OBDebit;
      this.tdCA3OBCredit = this._ResponseData[8].OBCredit;
      this.tdCA3TransDebit = this._ResponseData[8].TransDebit;
      this.tdCA3TransCredit = this._ResponseData[8].TransCredit;
      this.tdCA3CBDebit = this._ResponseData[8].CBDebit;
      this.tdCA3CBCredit = this._ResponseData[8].CBCredit;

      this.TotalODebit = "0";
      this.TotalOCredit = "0";
      this.TotalTDebit = "0";
      this.TotalTCredit = "0";
      this.TotalCDebit = "0";
      this.TotalCCredit = "0";

    this.TotalODebit = parseFloat(this.TotalODebit) + parseFloat(this._ResponseData[7].OBDebit);
      this.TotalODebit = parseFloat(this.TotalODebit) + parseFloat(this._ResponseData[8].OBDebit);
    this.TotalODebit = parseFloat(this.TotalODebit) + parseFloat(this._ResponseData[7].OBDebit);
      this.TotalODebit = parseFloat(this.TotalODebit) + parseFloat(this._ResponseData[8].OBDebit);

      this.TotalOCredit = parseFloat(this.TotalOCredit) + parseFloat(this._ResponseData[7].OBCredit);
        this.TotalOCredit = parseFloat(this.TotalOCredit) + parseFloat(this._ResponseData[8].OBCredit);
      this.TotalOCredit = parseFloat(this.TotalOCredit) + parseFloat(this._ResponseData[7].OBCredit);
        this.TotalOCredit = parseFloat(this.TotalOCredit) + parseFloat(this._ResponseData[8].OBCredit);

      this.TotalTDebit = parseFloat(this.TotalTDebit) + parseFloat(this._ResponseData[7].TransDebit);
      this.TotalTDebit = parseFloat(this.TotalTDebit) + parseFloat(this._ResponseData[8].TransDebit);
      this.TotalTDebit = parseFloat(this.TotalTDebit) + parseFloat(this._ResponseData[7].TransDebit);
      this.TotalTDebit = parseFloat(this.TotalTDebit) + parseFloat(this._ResponseData[8].TransDebit);

      this.TotalTCredit = parseFloat(this.TotalTCredit) + parseFloat(this._ResponseData[7].TransCredit);
      this.TotalTCredit = parseFloat(this.TotalTCredit) + parseFloat(this._ResponseData[8].TransCredit);
      this.TotalTCredit = parseFloat(this.TotalTCredit) + parseFloat(this._ResponseData[7].TransCredit);
      this.TotalTCredit = parseFloat(this.TotalTCredit) + parseFloat(this._ResponseData[8].TransCredit);

      this.TotalCDebit = parseFloat(this.TotalCDebit) + parseFloat(this._ResponseData[7].CBDebit);
        this.TotalCDebit = parseFloat(this.TotalCDebit) + parseFloat(this._ResponseData[8].CBDebit);
      this.TotalCDebit = parseFloat(this.TotalCDebit) + parseFloat(this._ResponseData[7].CBDebit);
        this.TotalCDebit = parseFloat(this.TotalCDebit) + parseFloat(this._ResponseData[8].CBDebit);

        this.TotalCCredit = parseFloat(this.TotalCCredit) + parseFloat(this._ResponseData[7].CBCredit);
    this.TotalCCredit = parseFloat(this.TotalCCredit) + parseFloat(this._ResponseData[8].CBCredit);
        this.TotalCCredit = parseFloat(this.TotalCCredit) + parseFloat(this._ResponseData[7].CBCredit);
    this.TotalCCredit = parseFloat(this.TotalCCredit) + parseFloat(this._ResponseData[8].CBCredit);

      this.totalODebit = this.TotalODebit;
      this.totalOCredit = this.TotalOCredit;
      this.totalTDebit = this.TotalTDebit;
      this.totalTCredit = this.TotalTCredit;
      this.totalCDebit = this.TotalCDebit;
      this.totalCCredit = this.TotalCCredit;
     } 

     if(this.value=="2" )
     {
      this.isTotal=true;
      this.isUnrealizedGain=false;
      this.isCurrentLiab=false;
      this.isCapital=false;
      this.isLiabilities=false;
      this.isGain=false;
      this.isDividend=false;
      this.isIncome=false;
      this.isExpense=true;
      this.isInvestment=false;
      this.isCurrentAssets=true;
      this.isAssets=false;
     this.ExpODebit = this._ResponseData[11].OBDebit;
     this.ExpOCredit = this._ResponseData[11].OBCredit;
     this.ExpTDebit = this._ResponseData[11].TransDebit;
     this.ExpTCredit = this._ResponseData[11].TransCredit;
     this.ExpCDebitS = this._ResponseData[11].CBDebit;
     this.ExpCCredit = this._ResponseData[11].CBCredit;

     this.Exp1ODebit = this._ResponseData[12].OBDebit;
     this.Exp1OCredit = this._ResponseData[12].OBCredit;
     this.Exp1TDebit = this._ResponseData[12].TransDebit;
     this.Exp1TCredit = this._ResponseData[12].TransCredit;
     this.Exp1CDebitS = this._ResponseData[12].CBDebit;
     this.Exp1CCredit = this._ResponseData[12].CBCredit;


     this.TotalODebit = "0";
     this.TotalOCredit = "0";
     this.TotalTDebit = "0";
     this.TotalTCredit = "0";
     this.TotalCDebit = "0";
     this.TotalCCredit = "0";

     this.TotalODebit = parseFloat(this.TotalODebit) + parseFloat(this._ResponseData[11].OBDebit);
     this.TotalODebit = parseFloat(this.TotalODebit) + parseFloat(this._ResponseData[12].OBDebit);
   

     this.TotalOCredit = parseFloat(this.TotalOCredit) + parseFloat(this._ResponseData[11].OBCredit);
     this.TotalOCredit = parseFloat(this.TotalOCredit) + parseFloat(this._ResponseData[12].OBCredit);
   

     this.TotalTDebit = parseFloat(this.TotalTDebit) + parseFloat(this._ResponseData[11].TransDebit);
     this.TotalTDebit = parseFloat(this.TotalTDebit) + parseFloat(this._ResponseData[12].TransDebit);


     this.TotalTCredit = parseFloat(this.TotalTCredit) + parseFloat(this._ResponseData[11].TransCredit);
     this.TotalTCredit = parseFloat(this.TotalTCredit) + parseFloat(this._ResponseData[12].TransCredit);
 

     this.TotalCDebit = parseFloat(this.TotalCDebit) + parseFloat(this._ResponseData[11].CBDebit);
     this.TotalCDebit = parseFloat(this.TotalCDebit) + parseFloat(this._ResponseData[12].CBDebit);
 
     this.TotalCCredit = parseFloat(this.TotalCCredit) + parseFloat(this._ResponseData[11].CBCredit);
     this.TotalCCredit = parseFloat(this.TotalCCredit) + parseFloat(this._ResponseData[12].CBCredit);
 

     this.totalODebit = this.TotalODebit;
     this.totalOCredit = this.TotalOCredit;
     this.totalTDebit = this.TotalTDebit;
     this.totalTCredit = this.TotalTCredit;
     this.totalCDebit = this.TotalCDebit;
     this.totalCCredit = this.TotalCCredit;
    } 
    if(this.value=="3" && this.value1=="1")
    {

      this.isTotal=true;
      this.isUnrealizedGain=false;
      this.isCurrentLiab=false;
      this.isCapital=false;
      this.isLiabilities=false;
      this.isGain=false;
      this.isDividend=true;
      this.isIncome=true;
      this.isExpense=false;
      this.isInvestment=false;
      this.isCurrentAssets=true;
      this.isAssets=false;
    this.InODebit = this._ResponseData[14].OBDebit;
    this.InOCredit = this._ResponseData[14].OBCredit;
    this.InTDebit = this._ResponseData[14].TransDebit;
    this.InTCredit = this._ResponseData[14].TransCredit;
    this.InCDebit = this._ResponseData[14].CBDebit;
    this.InCCredit = this._ResponseData[14].CBCredit;

    this.TotalODebit = "0";
    this.TotalOCredit = "0";
    this.TotalTDebit = "0";
    this.TotalTCredit = "0";
    this.TotalCDebit = "0";
    this.TotalCCredit = "0";

    this.TotalODebit = parseFloat(this.TotalODebit) + parseFloat(this._ResponseData[14].OBDebit);
    this.TotalOCredit = parseFloat(this.TotalOCredit) + parseFloat(this._ResponseData[14].OBCredit);
    this.TotalTDebit = parseFloat(this.TotalTDebit) + parseFloat(this._ResponseData[14].TransDebit);
    this.TotalTCredit = parseFloat(this.TotalTCredit) + parseFloat(this._ResponseData[14].TransCredit);
    this.TotalCDebit = parseFloat(this.TotalCDebit) + parseFloat(this._ResponseData[14].CBDebit);
    this.TotalCCredit = parseFloat(this.TotalCCredit) + parseFloat(this._ResponseData[14].CBCredit);


    this.totalODebit = this.TotalODebit;
    this.totalOCredit = this.TotalOCredit;
    this.totalTDebit = this.TotalTDebit;
    this.totalTCredit = this.TotalTCredit;
    this.totalCDebit = this.TotalCDebit;
    this.totalCCredit = this.TotalCCredit;
   } 

   if(this.value=="3" && this.value1=="50")
   {
    this.isTotal=true;
    this.isUnrealizedGain=false;
    this.isCurrentLiab=false;
    this.isCapital=false;
    this.isLiabilities=false;
    this.isGain=true;
    this.isDividend=true;
    this.isIncome=true;
    this.isExpense=false;
    this.isInvestment=false;
    this.isCurrentAssets=true;
    this.isAssets=false;
   this.InODebit = this._ResponseData[14].OBDebit;
   this.InOCredit = this._ResponseData[14].OBCredit;
   this.InTDebit = this._ResponseData[14].TransDebit;
   this.InTCredit = this._ResponseData[14].TransCredit;
   this.InCDebit = this._ResponseData[14].CBDebit;
   this.In1CCredit = this._ResponseData[14].CBCredit;

   this.In1ODebit = this._ResponseData[10].OBDebit;
   this.In1OCredit = this._ResponseData[10].OBCredit;
   this.In1TDebit = this._ResponseData[10].TransDebit;
   this.In1TCredit = this._ResponseData[10].TransCredit;
   this.In1CDebit = this._ResponseData[10].CBDebit;
   this.In2CCredit = this._ResponseData[10].CBCredit;

   this.In2ODebit = this._ResponseData[9].OBDebit;
   this.In2OCredit = this._ResponseData[9].OBCredit;
   this.In2TDebit = this._ResponseData[9].TransDebit;
   this.In2TCredit = this._ResponseData[9].TransCredit;
   this.In2CDebit = this._ResponseData[9].CBDebit;
   this.In2CCredit = this._ResponseData[9].CBCredit;

   this.TotalODebit = "0";
   this.TotalOCredit = "0";
   this.TotalTDebit = "0";
   this.TotalTCredit = "0";
   this.TotalCDebit = "0";
   this.TotalCCredit = "0";

   this.TotalODebit = parseFloat(this.TotalODebit) + parseFloat(this._ResponseData[14].OBDebit);
   this.TotalODebit = parseFloat(this.TotalODebit) + parseFloat(this._ResponseData[10].OBDebit);
   this.TotalODebit = parseFloat(this.TotalODebit) + parseFloat(this._ResponseData[9].OBDebit);

   this.TotalOCredit = parseFloat(this.TotalOCredit) + parseFloat(this._ResponseData[14].OBDebit);
   this.TotalOCredit = parseFloat(this.TotalOCredit) + parseFloat(this._ResponseData[10].OBDebit);
   this.TotalOCredit = parseFloat(this.TotalOCredit) + parseFloat(this._ResponseData[9].OBDebit);

   this.TotalTDebit = parseFloat(this.TotalTDebit) + parseFloat(this._ResponseData[14].TransDebit);
   this.TotalTDebit = parseFloat(this.TotalTDebit) + parseFloat(this._ResponseData[10].TransDebit);
   this.TotalTDebit = parseFloat(this.TotalTDebit) + parseFloat(this._ResponseData[9].TransDebit);

   this.TotalTCredit = parseFloat(this.TotalTCredit) + parseFloat(this._ResponseData[14].TransCredit);
   this.TotalTCredit = parseFloat(this.TotalTCredit) + parseFloat(this._ResponseData[10].TransCredit);
   this.TotalTCredit = parseFloat(this.TotalTCredit) + parseFloat(this._ResponseData[9].TransCredit);

   this.TotalCDebit = parseFloat(this.TotalCDebit) + parseFloat(this._ResponseData[14].CBDebit);
   this.TotalCDebit = parseFloat(this.TotalCDebit) + parseFloat(this._ResponseData[10].CBDebit);
   this.TotalCDebit = parseFloat(this.TotalCDebit) + parseFloat(this._ResponseData[9].CBDebit);

   this.TotalCCredit = parseFloat(this.TotalCCredit) + parseFloat(this._ResponseData[14].CBCredit);
   this.TotalCCredit = parseFloat(this.TotalCCredit) + parseFloat(this._ResponseData[10].CBCredit);
   this.TotalCCredit = parseFloat(this.TotalCCredit) + parseFloat(this._ResponseData[9].CBCredit);



   this.totalODebit = this.TotalODebit;
   this.totalOCredit = this.TotalOCredit;
   this.totalTDebit = this.TotalTDebit;
   this.totalTCredit = this.TotalTCredit;
   this.totalCDebit = this.TotalCDebit;
   this.totalCCredit = this.TotalCCredit;
  } 

  if(this.value=="4" && this.value1=="1")
  {
    this.isTotal=true;
    this.isUnrealizedGain=false;
    this.isCurrentLiab=false;
    this.isCapital=true;
    this.isLiabilities=true;
    this.isGain=false;
    this.isDividend=false;
    this.isIncome=false;
    this.isExpense=false;
    this.isInvestment=false;
    this.isCurrentAssets=false;
    this.isAssets=false;

  this.LiaODebit = this._ResponseData[15].OBDebit;
  this.LiaOCredit = this._ResponseData[15].OBCredit;
  this.LiaTDebit = this._ResponseData[15].TransDebit;
  this.LiaTCredit = this._ResponseData[15].TransCredit;
  this.LiaCDebit = this._ResponseData[15].CBDebit;
  this.LiaCCredit = this._ResponseData[15].CBCredit;




  this.TotalODebit = "0";
  this.TotalOCredit = "0";
  this.TotalTDebit = "0";
  this.TotalTCredit = "0";
  this.TotalCDebit = "0";
  this.TotalCCredit = "0";

  this.TotalODebit = parseFloat(this.TotalODebit) + parseFloat(this._ResponseData[15].OBDebit);
  this.TotalOCredit = parseFloat(this.TotalOCredit) + parseFloat(this._ResponseData[15].OBCredit);
  this.TotalTDebit = parseFloat(this.TotalTDebit) + parseFloat(this._ResponseData[15].TransDebit);
  this.TotalTCredit = parseFloat(this.TotalTCredit) + parseFloat(this._ResponseData[15].TransCredit);
  this.TotalCDebit = parseFloat(this.TotalCDebit) + parseFloat(this._ResponseData[15].CBDebit);
  this.TotalCCredit = parseFloat(this.TotalCCredit) + parseFloat(this._ResponseData[15].CBCredit);


  this.totalODebit = this.TotalODebit;
  this.totalOCredit = this.TotalOCredit;
  this.totalTDebit = this.TotalTDebit;
  this.totalTCredit = this.TotalTCredit;
  this.totalCDebit = this.TotalCDebit;
  this.totalCCredit = this.TotalCCredit;
 } 

 if(this.value=="4" && this.value1=="2")
 {
  this.isTotal=true;
  this.isUnrealizedGain=false;
  this.isCurrentLiab=true;
  this.isCapital=false;
  this.isLiabilities=true;
  this.isGain=false;
  this.isDividend=false;
  this.isIncome=false;
  this.isExpense=false;
  this.isInvestment=false;
  this.isCurrentAssets=false;
  this.isAssets=false;
 this.Lia1ODebit = this._ResponseData[19].OBDebit;
 this.Lia1OCredit = this._ResponseData[19].OBCredit;
 this.Lia1TDebit = this._ResponseData[19].TransDebit;
 this.Lia1TCredit = this._ResponseData[19].TransCredit;
 this.Lia1CDebit = this._ResponseData[19].CBDebit;
 this.Lia1CCredit = this._ResponseData[19].CBCredit;

 this.Lia2ODebit = this._ResponseData[11].OBDebit;
 this.Lia2OCredit = this._ResponseData[11].OBCredit;
 this.Lia2TCredit = this._ResponseData[11].TransDebit;
 this.Lia1TCredit = this._ResponseData[11].TransCredit;
 this.Lia2TDebit = this._ResponseData[11].CBDebit;
 this.Lia2CCredit = this._ResponseData[11].CBCredit;

 this.Lia3ODebit = this._ResponseData[20].OBDebit;
 this.Lia3OCredit = this._ResponseData[20].OBCredit;
 this.Lia3TDebit = this._ResponseData[20].TransDebit;
 this.Lia3TCredit = this._ResponseData[20].TransCredit;
 this.Lia3CDebit = this._ResponseData[20].CBDebit;
 this.Lia3CCredit = this._ResponseData[20].CBCredit;


 this.TotalODebit = "0";
 this.TotalOCredit = "0";
 this.TotalTDebit = "0";
 this.TotalTCredit = "0";
 this.TotalCDebit = "0";
 this.TotalCCredit = "0";


 this.TotalODebit = parseFloat(this.TotalODebit) + parseFloat(this._ResponseData[19].OBDebit);
 this.TotalODebit = parseFloat(this.TotalODebit) + parseFloat(this._ResponseData[11].OBDebit);
 this.TotalODebit = parseFloat(this.TotalODebit) + parseFloat(this._ResponseData[20].OBDebit);

 this.TotalOCredit = parseFloat(this.TotalOCredit) + parseFloat(this._ResponseData[19].OBCredit);
 this.TotalOCredit = parseFloat(this.TotalOCredit) + parseFloat(this._ResponseData[11].OBCredit);
 this.TotalOCredit = parseFloat(this.TotalOCredit) + parseFloat(this._ResponseData[20].OBCredit);

 this.TotalTDebit = parseFloat(this.TotalTDebit) + parseFloat(this._ResponseData[19].TransDebit);
 this.TotalTDebit = parseFloat(this.TotalTDebit) + parseFloat(this._ResponseData[11].TransDebit);
 this.TotalTDebit = parseFloat(this.TotalTDebit) + parseFloat(this._ResponseData[20].TransDebit);

 this.TotalTCredit = parseFloat(this.TotalTCredit) + parseFloat(this._ResponseData[19].TransCredit);
 this.TotalTCredit = parseFloat(this.TotalTCredit) + parseFloat(this._ResponseData[11].TransCredit);
 this.TotalTCredit = parseFloat(this.TotalTCredit) + parseFloat(this._ResponseData[20].TransCredit);

 this.TotalCDebit = parseFloat(this.TotalCDebit) + parseFloat(this._ResponseData[19].CBDebit);
 this.TotalCDebit = parseFloat(this.TotalCDebit) + parseFloat(this._ResponseData[11].CBDebit);
 this.TotalCDebit = parseFloat(this.TotalCDebit) + parseFloat(this._ResponseData[20].CBDebit);

 this.TotalCCredit = parseFloat(this.TotalCCredit) + parseFloat(this._ResponseData[19].CBCredit);
 this.TotalCCredit = parseFloat(this.TotalCCredit) + parseFloat(this._ResponseData[11].CBCredit);
 this.TotalCCredit = parseFloat(this.TotalCCredit) + parseFloat(this._ResponseData[20].CBCredit);



 this.totalODebit = this.TotalODebit;
 this.totalOCredit = this.TotalOCredit;
 this.totalTDebit = this.TotalTDebit;
 this.totalTCredit = this.TotalTCredit;
 this.totalCDebit = this.TotalCDebit;
 this.totalCCredit = this.TotalCCredit;
} 

if(this.value=="4" && this.value1=="3")
{
  this.isTotal=true;
  this.isUnrealizedGain=true;
  this.isCurrentLiab=false;
  this.isCapital=false;
  this.isLiabilities=true;
  this.isGain=false;
  this.isDividend=false;
  this.isIncome=false;
  this.isExpense=false;
  this.isInvestment=false;
  this.isCurrentAssets=false;
  this.isAssets=false;
this.Lia4ODebit = this._ResponseData[22].OBDebit;
this.Lia4OCredit = this._ResponseData[22].OBCredit;
this.Lia4TDebit = this._ResponseData[22].TransDebit;
this.Lia4TCredit = this._ResponseData[22].TransCredit;
this.Lia4CDebit = this._ResponseData[22].CBDebit;
this.Lia4CCredit = this._ResponseData[22].CBCredit;

this.Lia5ODebit = this._ResponseData[21].OBDebit;
this.Lia5OCredit = this._ResponseData[21].OBCredit;
this.Lia5TDebit = this._ResponseData[21].TransDebit;
this.Lia5TCredit = this._ResponseData[21].TransCredit;
this.Lia5CDebit = this._ResponseData[21].CBDebit;
this.Lia5CCredit = this._ResponseData[21].CBCredit;


this.TotalODebit = "0";
this.TotalOCredit = "0";
this.TotalTDebit = "0";
this.TotalTCredit = "0";
this.TotalCDebit = "0";
this.TotalCCredit = "0";


this.TotalODebit = parseFloat(this.TotalODebit) + parseFloat(this._ResponseData[22].OBDebit);
this.TotalODebit = parseFloat(this.TotalODebit) + parseFloat(this._ResponseData[21].OBDebit);

this.TotalOCredit = parseFloat(this.TotalOCredit) + parseFloat(this._ResponseData[22].OBCredit);
this.TotalOCredit = parseFloat(this.TotalOCredit) + parseFloat(this._ResponseData[21].OBCredit);

this.TotalTDebit = parseFloat(this.TotalTDebit) + parseFloat(this._ResponseData[22].TransDebit);
this.TotalTDebit = parseFloat(this.TotalTDebit) + parseFloat(this._ResponseData[21].TransDebit);


this.TotalTCredit = parseFloat(this.TotalTCredit) + parseFloat(this._ResponseData[22].TransCredit);
this.TotalTCredit = parseFloat(this.TotalTCredit) + parseFloat(this._ResponseData[21].TransCredit);

this.TotalCDebit = parseFloat(this.TotalCDebit) + parseFloat(this._ResponseData[22].CBDebit);
this.TotalCDebit = parseFloat(this.TotalCDebit) + parseFloat(this._ResponseData[21].CBDebit);

this.TotalCCredit = parseFloat(this.TotalCCredit) + parseFloat(this._ResponseData[22].CBCredit);
this.TotalCCredit = parseFloat(this.TotalCCredit) + parseFloat(this._ResponseData[21].CBCredit);



this.totalODebit = this.TotalODebit;
this.totalOCredit = this.TotalOCredit;
this.totalTDebit = this.TotalTDebit;
this.totalTCredit = this.TotalTCredit;
this.totalCDebit = this.TotalCDebit;
this.totalCCredit = this.TotalCCredit;
} 
if(this.value=="4" && this.value1=="50")
{

  this.isTotal=true;
  this.isUnrealizedGain=true;
  this.isCurrentLiab=true;
  this.isCapital=true;
  this.isLiabilities=true;
  this.isGain=false;
  this.isDividend=false;
  this.isIncome=false;
  this.isExpense=false;
  this.isInvestment=false;
  this.isCurrentAssets=false;
  this.isAssets=false;
this.LiaODebit = this._ResponseData[15].OBDebit;
this.LiaOCredit = this._ResponseData[15].OBCredit;
this.LiaTDebit = this._ResponseData[15].TransDebit;
this.LiaTCredit = this._ResponseData[15].TransCredit;
this.LiaCDebit = this._ResponseData[15].CBDebit;
this.LiaCCredit = this._ResponseData[15].CBCredit;

this.Lia1ODebit = this._ResponseData[19].OBDebit;
this.Lia1OCredit = this._ResponseData[19].OBCredit;
this.Lia1TDebit = this._ResponseData[19].TransDebit;
this.Lia1TCredit = this._ResponseData[19].TransCredit;
this.Lia1CDebit = this._ResponseData[19].CBDebit;
this.Lia1CCredit = this._ResponseData[19].CBCredit;

this.Lia2ODebit = this._ResponseData[11].OBDebit;
this.Lia2OCredit = this._ResponseData[11].OBCredit;
this.Lia2TDebit = this._ResponseData[11].TransDebit;
this.Lia2TCredit = this._ResponseData[11].TransCredit;
this.Lia2TDebit = this._ResponseData[11].CBDebit;
this.Lia2CCredit = this._ResponseData[11].CBCredit;

this.Lia3ODebit = this._ResponseData[20].OBDebit;
this.Lia3OCredit = this._ResponseData[20].OBCredit;
this.Lia3TDebit = this._ResponseData[20].TransDebit;
this.Lia3TCredit = this._ResponseData[20].TransCredit;
this.Lia3CDebit = this._ResponseData[20].CBDebit;
this.Lia3CCredit = this._ResponseData[20].CBCredit;

this.Lia4ODebit = this._ResponseData[22].OBDebit;
this.Lia4OCredit = this._ResponseData[22].OBCredit;
this.Lia4TDebit = this._ResponseData[22].TransDebit;
this.Lia4TCredit = this._ResponseData[22].TransCredit;
this.Lia4CDebit = this._ResponseData[22].CBDebit;
this.Lia4CCredit = this._ResponseData[22].CBCredit;

this.Lia5ODebit = this._ResponseData[21].OBDebit;
this.Lia5OCredit = this._ResponseData[21].OBCredit;
this.Lia5TDebit = this._ResponseData[21].TransDebit;
this.Lia5TCredit = this._ResponseData[21].TransCredit;
this.Lia5CDebit = this._ResponseData[21].CBDebit;
this.Lia5CCredit = this._ResponseData[21].CBCredit;


this.TotalODebit = "0";
this.TotalOCredit = "0";
this.TotalTDebit = "0";
this.TotalTCredit = "0";
this.TotalCDebit = "0";
this.TotalCCredit = "0";

this.TotalODebit = parseFloat(this.TotalODebit) + parseFloat(this._ResponseData[15].OBDebit);
this.TotalODebit = parseFloat(this.TotalODebit) + parseFloat(this._ResponseData[19].OBDebit);
this.TotalODebit = parseFloat(this.TotalODebit) + parseFloat(this._ResponseData[11].OBDebit);
this.TotalODebit = parseFloat(this.TotalODebit) + parseFloat(this._ResponseData[20].OBDebit);
this.TotalODebit = parseFloat(this.TotalODebit) + parseFloat(this._ResponseData[21].OBDebit);
this.TotalODebit = parseFloat(this.TotalODebit) + parseFloat(this._ResponseData[22].OBDebit);



this.TotalOCredit = parseFloat(this.TotalOCredit) + parseFloat(this._ResponseData[15].OBCredit);
this.TotalOCredit = parseFloat(this.TotalOCredit) + parseFloat(this._ResponseData[19].OBCredit);
this.TotalOCredit = parseFloat(this.TotalOCredit) + parseFloat(this._ResponseData[11].OBCredit);
this.TotalOCredit = parseFloat(this.TotalOCredit) + parseFloat(this._ResponseData[20].OBCredit);
this.TotalOCredit = parseFloat(this.TotalOCredit) + parseFloat(this._ResponseData[21].OBCredit);
this.TotalOCredit = parseFloat(this.TotalOCredit) + parseFloat(this._ResponseData[22].OBCredit);



this.TotalTDebit = parseFloat(this.TotalTDebit) + parseFloat(this._ResponseData[15].TransDebit);
this.TotalTDebit = parseFloat(this.TotalTDebit) + parseFloat(this._ResponseData[19].TransDebit);
this.TotalTDebit = parseFloat(this.TotalTDebit) + parseFloat(this._ResponseData[11].TransDebit);
this.TotalTDebit = parseFloat(this.TotalTDebit) + parseFloat(this._ResponseData[20].TransDebit);
this.TotalTDebit = parseFloat(this.TotalTDebit) + parseFloat(this._ResponseData[21].TransDebit);
this.TotalTDebit = parseFloat(this.TotalTDebit) + parseFloat(this._ResponseData[22].TransDebit);


this.TotalTCredit = parseFloat(this.TotalTCredit) + parseFloat(this._ResponseData[15].TransCredit);
this.TotalTCredit = parseFloat(this.TotalTCredit) + parseFloat(this._ResponseData[19].TransCredit);
this.TotalTCredit = parseFloat(this.TotalTCredit) + parseFloat(this._ResponseData[11].TransCredit);
this.TotalTCredit = parseFloat(this.TotalTCredit) + parseFloat(this._ResponseData[20].TransCredit);
this.TotalTCredit = parseFloat(this.TotalTCredit) + parseFloat(this._ResponseData[21].TransCredit);
this.TotalTCredit = parseFloat(this.TotalTCredit) + parseFloat(this._ResponseData[22].TransCredit);




this.TotalCDebit = parseFloat(this.TotalCDebit) + parseFloat(this._ResponseData[15].CBDebit);
this.TotalCDebit = parseFloat(this.TotalCDebit) + parseFloat(this._ResponseData[19].CBDebit);
this.TotalCDebit = parseFloat(this.TotalCDebit) + parseFloat(this._ResponseData[11].CBDebit);
this.TotalCDebit = parseFloat(this.TotalCDebit) + parseFloat(this._ResponseData[20].CBDebit);
this.TotalCDebit = parseFloat(this.TotalCDebit) + parseFloat(this._ResponseData[21].CBDebit);
this.TotalCDebit = parseFloat(this.TotalCDebit) + parseFloat(this._ResponseData[22].CBDebit);


this.TotalCCredit = parseFloat(this.TotalCCredit) + parseFloat(this._ResponseData[15].CBCredit);
this.TotalCCredit = parseFloat(this.TotalCCredit) + parseFloat(this._ResponseData[19].CBCredit);
this.TotalCCredit = parseFloat(this.TotalCCredit) + parseFloat(this._ResponseData[11].CBCredit);
this.TotalCCredit = parseFloat(this.TotalCCredit) + parseFloat(this._ResponseData[20].CBCredit);
this.TotalCCredit = parseFloat(this.TotalCCredit) + parseFloat(this._ResponseData[21].CBCredit);
this.TotalCCredit = parseFloat(this.TotalCCredit) + parseFloat(this._ResponseData[22].CBCredit);




this.totalODebit = this.TotalODebit;
this.totalOCredit = this.TotalOCredit;
this.totalTDebit = this.TotalTDebit;
this.totalTCredit = this.TotalTCredit;
this.totalCDebit = this.TotalCDebit;
this.totalCCredit = this.TotalCCredit;
} 
if(this.value=="50")
{
  this.isTotal=true;
  this.isUnrealizedGain=true;
  this.isCurrentLiab=true;
  this.isCapital=true;
  this.isLiabilities=true;
  this.isGain=true;
  this.isDividend=true;
  this.isIncome=true;
  this.isExpense=true;
  this.isInvestment=true;
  this.isCurrentAssets=true;
  this.isAssets=true;
this.tdCAOBDebit = this._ResponseData[7].OBDebit;
this.tdCAOBCredit = this._ResponseData[7].OBCredit;
this.tdCATransDebit = this._ResponseData[7].TransDebit;
this.tdCATransCredit = this._ResponseData[7].TransCredit;
this.tdCACBDebit = this._ResponseData[7].CBDebit;
this.tdCACBCredit = this._ResponseData[7].CBCredit;

this.tdCA1OBDebit = this._ResponseData[8].OBDebit;
this.tdCA1OBCredit = this._ResponseData[8].OBCredit;
this.tdCA1TransDebit = this._ResponseData[8].TransDebit;
this.tdCA1TransCredit = this._ResponseData[8].TransCredit;
this.tdCA1CBDebit = this._ResponseData[8].CBDebit;
this.tdCA1CBCredit = this._ResponseData[8].CBCredit;

this.tdCA2OBDebit = this._ResponseData[7].OBDebit;
this.tdCA2OBCredit = this._ResponseData[7].OBCredit;
this.tdCA2TransDebit = this._ResponseData[7].TransDebit;
this.tdCA2TransCredit = this._ResponseData[7].TransCredit;
this.tdCA2CBDebit = this._ResponseData[7].CBDebit;
this.tdCA2CBCredit = this._ResponseData[7].CBCredit;


this.tdCA3OBDebit = this._ResponseData[8].OBDebit;
this.tdCA3OBCredit = this._ResponseData[8].OBCredit;
this.tdCA3TransDebit = this._ResponseData[8].TransDebit;
this.tdCA3TransCredit = this._ResponseData[8].TransCredit;
this.tdCA3CBDebit = this._ResponseData[8].CBDebit;
this.tdCA3CBCredit = this._ResponseData[8].CBCredit;

this.ExpODebit = this._ResponseData[11].OBDebit;
this.ExpOCredit = this._ResponseData[11].OBCredit;
this.ExpTDebit = this._ResponseData[11].TransDebit;
this.ExpTCredit = this._ResponseData[11].TransCredit;
this.ExpCDebitS = this._ResponseData[11].CBDebit;
this.ExpCCredit = this._ResponseData[11].CBCredit;


this.InODebit = this._ResponseData[14].OBDebit;
this.InOCredit = this._ResponseData[14].OBCredit;
this.InTDebit = this._ResponseData[14].TransDebit;
this.InTCredit = this._ResponseData[14].TransCredit;
this.InCDebit = this._ResponseData[14].CBDebit;
this.InCCredit = this._ResponseData[14].CBCredit;


this.Exp1ODebit = this._ResponseData[12].OBDebit;
this.Exp1OCredit = this._ResponseData[12].OBCredit;
this.Exp1TDebit = this._ResponseData[12].TransDebit;
this.Exp1TCredit = this._ResponseData[12].TransCredit;
this.Exp1CDebitS = this._ResponseData[12].CBDebit;
this.Exp1CCredit = this._ResponseData[12].CBCredit;


this.In2ODebit = this._ResponseData[9].OBDebit;
this.In2OCredit = this._ResponseData[9].OBCredit;
this.In2TDebit = this._ResponseData[9].TransDebit;
this.In2TCredit = this._ResponseData[9].TransCredit;
this.In2CDebit = this._ResponseData[9].CBDebit;
this.In2CCredit = this._ResponseData[9].CBCredit;


this.Exp1ODebit = this._ResponseData[12].OBDebit;
this.Exp1OCredit = this._ResponseData[12].OBCredit;
this.Exp1TDebit = this._ResponseData[12].TransDebit;
this.Exp1TCredit = this._ResponseData[12].TransCredit;
this.Exp1CDebitS = this._ResponseData[12].CBDebit;
this.Exp1CCredit = this._ResponseData[12].CBCredit;


this.LiaODebit = this._ResponseData[15].OBDebit;
this.LiaOCredit = this._ResponseData[15].OBCredit;
this.LiaTDebit = this._ResponseData[15].TransDebit;
this.LiaTCredit = this._ResponseData[15].TransCredit;
this.LiaCDebit = this._ResponseData[15].CBDebit;
this.LiaCCredit = this._ResponseData[15].CBCredit;

this.Lia1ODebit = this._ResponseData[19].OBDebit;
this.Lia1OCredit = this._ResponseData[19].OBCredit;
this.Lia1TDebit = this._ResponseData[19].TransDebit;
this.Lia1TCredit = this._ResponseData[19].TransCredit;
this.Lia1CDebit = this._ResponseData[19].CBDebit;
this.Lia1CCredit = this._ResponseData[19].CBCredit;

this.Lia2ODebit = this._ResponseData[11].OBDebit;
this.Lia2OCredit = this._ResponseData[11].OBCredit;
this.Lia2TDebit = this._ResponseData[11].TransDebit;
this.Lia2TCredit = this._ResponseData[11].TransCredit;
this.Lia2TDebit = this._ResponseData[11].CBDebit;
this.Lia2CCredit = this._ResponseData[11].CBCredit;


this.Lia3ODebit = this._ResponseData[20].OBDebit;
this.Lia3OCredit = this._ResponseData[20].OBCredit;
this.Lia3TDebit = this._ResponseData[20].TransDebit;
this.Lia3TCredit = this._ResponseData[20].TransCredit;
this.Lia3CDebit = this._ResponseData[20].CBDebit;
this.Lia3CCredit = this._ResponseData[20].CBCredit;


this.Lia4ODebit = this._ResponseData[22].OBDebit;
this.Lia4OCredit = this._ResponseData[22].OBCredit;
this.Lia4TDebit = this._ResponseData[22].TransDebit;
this.Lia4TCredit = this._ResponseData[22].TransCredit;
this.Lia4CDebit = this._ResponseData[22].CBDebit;
this.Lia4CCredit = this._ResponseData[22].CBCredit;


this.Lia5ODebit = this._ResponseData[21].OBDebit;
this.Lia5OCredit = this._ResponseData[21].OBCredit;
this.Lia5TDebit = this._ResponseData[21].TransDebit;
this.Lia5TCredit = this._ResponseData[21].TransCredit;
this.Lia5CDebit = this._ResponseData[21].CBDebit;
this.Lia5CCredit = this._ResponseData[21].CBCredit;


this.TotalODebit = "0";
this.TotalOCredit = "0";
this.TotalTDebit = "0";
this.TotalTCredit = "0";
this.TotalCDebit = "0";
this.TotalCCredit = "0";

  this.TotalODebit = parseFloat(this.TotalODebit) + parseFloat(this._ResponseData[7].OBDebit);
  this.TotalODebit = parseFloat(this.TotalODebit) + parseFloat(this._ResponseData[8].OBDebit);
  this.TotalOCredit = parseFloat(this.TotalOCredit) + parseFloat(this._ResponseData[7].OBCredit);
  this.TotalOCredit = parseFloat(this.TotalOCredit) + parseFloat(this._ResponseData[8].OBCredit);
  this.TotalTDebit = parseFloat(this.TotalTDebit) + parseFloat(this._ResponseData[7].TransDebit);
  this.TotalTDebit = parseFloat(this.TotalTDebit) + parseFloat(this._ResponseData[8].TransDebit);
  this.TotalTCredit = parseFloat(this.TotalTCredit) + parseFloat(this._ResponseData[7].TransCredit);
  this.TotalTCredit = parseFloat(this.TotalTCredit) + parseFloat(this._ResponseData[8].TransCredit);
  this.TotalCDebit = parseFloat(this.TotalCDebit) + parseFloat(this._ResponseData[7].CBDebit);
  this.TotalCDebit = parseFloat(this.TotalCDebit) + parseFloat(this._ResponseData[8].CBDebit);
  this.TotalCCredit = parseFloat(this.TotalCCredit) + parseFloat(this._ResponseData[7].CBCredit);
  this.TotalCCredit = parseFloat(this.TotalCCredit) + parseFloat(this._ResponseData[8].CBCredit);

  this.TotalODebit = parseFloat(this.TotalODebit) + parseFloat(this._ResponseData[7].OBDebit);
  this.TotalODebit = parseFloat(this.TotalODebit) + parseFloat(this._ResponseData[8].OBDebit);
  this.TotalOCredit = parseFloat(this.TotalOCredit) + parseFloat(this._ResponseData[7].OBCredit);
  this.TotalOCredit = parseFloat(this.TotalOCredit) + parseFloat(this._ResponseData[8].OBCredit);
  this.TotalTDebit = parseFloat(this.TotalTDebit) + parseFloat(this._ResponseData[7].TransDebit);
  this.TotalTDebit = parseFloat(this.TotalTDebit) + parseFloat(this._ResponseData[8].TransDebit);
  this.TotalTCredit = parseFloat(this.TotalTCredit) + parseFloat(this._ResponseData[7].TransCredit);
  this.TotalTCredit = parseFloat(this.TotalTCredit) + parseFloat(this._ResponseData[8].TransCredit);
  this.TotalCDebit = parseFloat(this.TotalCDebit) + parseFloat(this._ResponseData[7].CBDebit);
  this.TotalCDebit = parseFloat(this.TotalCDebit) + parseFloat(this._ResponseData[8].CBDebit);
  this.TotalCCredit = parseFloat(this.TotalCCredit) + parseFloat(this._ResponseData[7].CBCredit);
  this.TotalCCredit = parseFloat(this.TotalCCredit) + parseFloat(this._ResponseData[8].CBCredit);

  this.TotalODebit = parseFloat(this.TotalODebit) + parseFloat(this._ResponseData[11].OBDebit);
  this.TotalODebit = parseFloat(this.TotalODebit) + parseFloat(this._ResponseData[12].OBDebit);
  this.TotalOCredit = parseFloat(this.TotalOCredit) + parseFloat(this._ResponseData[11].OBCredit);
  this.TotalOCredit = parseFloat(this.TotalOCredit) + parseFloat(this._ResponseData[12].OBCredit);
  this.TotalTDebit = parseFloat(this.TotalTDebit) + parseFloat(this._ResponseData[11].TransDebit);
  this.TotalTDebit = parseFloat(this.TotalTDebit) + parseFloat(this._ResponseData[12].TransDebit);
  this.TotalTCredit = parseFloat(this.TotalTCredit) + parseFloat(this._ResponseData[11].TransCredit);
  this.TotalTCredit = parseFloat(this.TotalTCredit) + parseFloat(this._ResponseData[12].TransCredit);
  this.TotalCDebit = parseFloat(this.TotalCDebit) + parseFloat(this._ResponseData[11].CBDebit);
  this.TotalCDebit = parseFloat(this.TotalCDebit) + parseFloat(this._ResponseData[12].CBDebit);
  this.TotalCCredit = parseFloat(this.TotalCCredit) + parseFloat(this._ResponseData[11].CBCredit);
  this.TotalCCredit = parseFloat(this.TotalCCredit) + parseFloat(this._ResponseData[12].CBCredit);


  this.TotalODebit = parseFloat(this.TotalODebit) + parseFloat(this._ResponseData[10].OBDebit);
  this.TotalODebit = parseFloat(this.TotalODebit) + parseFloat(this._ResponseData[9].OBDebit);
  this.TotalODebit = parseFloat(this.TotalODebit) + parseFloat(this._ResponseData[14].OBDebit);
  this.TotalOCredit = parseFloat(this.TotalOCredit) + parseFloat(this._ResponseData[10].OBDebit);
  this.TotalOCredit = parseFloat(this.TotalOCredit) + parseFloat(this._ResponseData[9].OBDebit);
  this.TotalOCredit = parseFloat(this.TotalOCredit) + parseFloat(this._ResponseData[14].OBDebit);
  this.TotalTDebit = parseFloat(this.TotalTDebit) + parseFloat(this._ResponseData[10].TransDebit);
  this.TotalTDebit = parseFloat(this.TotalTDebit) + parseFloat(this._ResponseData[9].TransDebit);
  this.TotalTDebit = parseFloat(this.TotalTDebit) + parseFloat(this._ResponseData[14].TransDebit);
  this.TotalTCredit = parseFloat(this.TotalTCredit) + parseFloat(this._ResponseData[10].TransCredit);
  this.TotalTCredit = parseFloat(this.TotalTCredit) + parseFloat(this._ResponseData[9].TransCredit);
  this.TotalTCredit = parseFloat(this.TotalTCredit) + parseFloat(this._ResponseData[14].TransCredit);
  this.TotalCDebit = parseFloat(this.TotalCDebit) + parseFloat(this._ResponseData[10].CBDebit);
  this.TotalCDebit = parseFloat(this.TotalCDebit) + parseFloat(this._ResponseData[9].CBDebit);
  this.TotalCDebit = parseFloat(this.TotalCDebit) + parseFloat(this._ResponseData[14].CBDebit);
  this.TotalCCredit = parseFloat(this.TotalCCredit) + parseFloat(this._ResponseData[10].CBCredit);
  this.TotalCCredit = parseFloat(this.TotalCCredit) + parseFloat(this._ResponseData[9].CBCredit);
  this.TotalCCredit = parseFloat(this.TotalCCredit) + parseFloat(this._ResponseData[14].CBCredit);


  this.TotalODebit = parseFloat(this.TotalODebit) + parseFloat(this._ResponseData[15].OBDebit);
  this.TotalOCredit = parseFloat(this.TotalOCredit) + parseFloat(this._ResponseData[15].OBCredit);
  this.TotalTDebit = parseFloat(this.TotalTDebit) + parseFloat(this._ResponseData[15].TransDebit);
  this.TotalTCredit = parseFloat(this.TotalTCredit) + parseFloat(this._ResponseData[15].TransCredit);
  this.TotalCDebit = parseFloat(this.TotalCDebit) + parseFloat(this._ResponseData[15].CBDebit);
  this.TotalCDebit = parseFloat(this.TotalCDebit) + parseFloat(this._ResponseData[15].CBDebit);
  this.TotalCCredit = parseFloat(this.TotalCCredit) + parseFloat(this._ResponseData[15].CBCredit);

  this.TotalODebit = parseFloat(this.TotalODebit) + parseFloat(this._ResponseData[19].OBDebit);
  this.TotalODebit = parseFloat(this.TotalODebit) + parseFloat(this._ResponseData[11].OBDebit);
  this.TotalODebit = parseFloat(this.TotalODebit) + parseFloat(this._ResponseData[20].OBDebit);

  this.TotalOCredit = parseFloat(this.TotalOCredit) + parseFloat(this._ResponseData[19].OBCredit);
  this.TotalOCredit = parseFloat(this.TotalOCredit) + parseFloat(this._ResponseData[11].OBCredit);
  this.TotalOCredit = parseFloat(this.TotalOCredit) + parseFloat(this._ResponseData[20].OBCredit);


  this.TotalTDebit = parseFloat(this.TotalTDebit) + parseFloat(this._ResponseData[19].TransDebit);
  this.TotalTDebit = parseFloat(this.TotalTDebit) + parseFloat(this._ResponseData[11].TransDebit);
  this.TotalTDebit = parseFloat(this.TotalTDebit) + parseFloat(this._ResponseData[20].TransDebit);


  this.TotalTCredit = parseFloat(this.TotalTCredit) + parseFloat(this._ResponseData[19].TransCredit);
  this.TotalTCredit = parseFloat(this.TotalTCredit) + parseFloat(this._ResponseData[11].TransCredit);
  this.TotalTCredit = parseFloat(this.TotalTCredit) + parseFloat(this._ResponseData[20].TransCredit);


  this.TotalCDebit = parseFloat(this.TotalCDebit) + parseFloat(this._ResponseData[19].CBDebit);
  this.TotalCDebit = parseFloat(this.TotalCDebit) + parseFloat(this._ResponseData[11].CBDebit);
  this.TotalCDebit = parseFloat(this.TotalCDebit) + parseFloat(this._ResponseData[11].CBDebit);
  this.TotalCDebit = parseFloat(this.TotalCDebit) + parseFloat(this._ResponseData[20].CBDebit);

  this.TotalCCredit = parseFloat(this.TotalCCredit) + parseFloat(this._ResponseData[19].CBCredit);
  this.TotalCCredit = parseFloat(this.TotalCCredit) + parseFloat(this._ResponseData[11].CBCredit);
  this.TotalCCredit = parseFloat(this.TotalCCredit) + parseFloat(this._ResponseData[20].CBCredit);


  this.TotalODebit = parseFloat(this.TotalODebit) + parseFloat(this._ResponseData[22].OBDebit);
  this.TotalODebit = parseFloat(this.TotalODebit) + parseFloat(this._ResponseData[21].OBDebit);
  this.TotalOCredit = parseFloat(this.TotalOCredit) + parseFloat(this._ResponseData[22].OBCredit);
  this.TotalOCredit = parseFloat(this.TotalOCredit) + parseFloat(this._ResponseData[21].OBCredit);
  this.TotalTDebit = parseFloat(this.TotalTDebit) + parseFloat(this._ResponseData[22].TransDebit);
  this.TotalTDebit = parseFloat(this.TotalTDebit) + parseFloat(this._ResponseData[21].TransDebit);
  this.TotalTCredit = parseFloat(this.TotalTCredit) + parseFloat(this._ResponseData[22].TransCredit);
  this.TotalTCredit = parseFloat(this.TotalTCredit) + parseFloat(this._ResponseData[21].TransCredit);
  this.TotalCDebit = parseFloat(this.TotalCDebit) + parseFloat(this._ResponseData[22].CBDebit);
  this.TotalCDebit = parseFloat(this.TotalCDebit) + parseFloat(this._ResponseData[21].CBDebit);
  this.TotalCCredit = parseFloat(this.TotalCCredit) + parseFloat(this._ResponseData[22].CBCredit);
  this.TotalCCredit = parseFloat(this.TotalCCredit) + parseFloat(this._ResponseData[21].CBCredit);




this.totalODebit = this.TotalODebit;
this.totalOCredit = this.TotalOCredit;
this.totalTDebit = this.TotalTDebit;
this.totalTCredit = this.TotalTCredit;
this.totalCDebit = this.TotalCDebit;
this.totalCCredit = this.TotalCCredit;
} 
      });
  
}
}
