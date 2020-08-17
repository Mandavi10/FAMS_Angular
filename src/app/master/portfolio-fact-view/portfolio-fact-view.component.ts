import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {FormBuilder,FormControl,FormGroup,Validator, Validators} from '@angular/forms';
import{DbsecurityService}from '../../Services/dbsecurity.service';
import { Commonfields } from '../../../Models/commonfields';
import { Injectable , Inject } from '@angular/core';
import {AppSettings} from 'src/app/app-settings';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';

import {Bindcustomerallfields} from '../../../Models/SummaryReport/Bindcustomerallfields';

import{CapitalStatementModel,BindEmployees,BindCustomer} from '../../../Models/CapitalStatement/capitalStatement';
import { ReactiveFormsModule } from '@angular/forms'
import{CapitalSatementService} from '../../Services/CapitalStatement/capital-satement.service';
import { PrimaryDetails,BindMainGriddata} from '../../../Models/PortfolioSummaryView/PortfolioSummaryViewGrid';
import { PortfolioSummaryViewServiceService } from '../../Services/PortfolioSummaryView/portfolio-summary-view-service.service';
@Component({
  selector: 'app-portfolio-fact-view',
  templateUrl: './portfolio-fact-view.component.html',
  styleUrls: ['./portfolio-fact-view.component.css']
})
export class PortfolioFactViewComponent implements OnInit {
  PortFolioFactView:FormGroup; BindemployeesList:BindEmployees;
  PageCount=1;  BindcustomerallfieldsList : Bindcustomerallfields;
  btnPrev:boolean; customerlength:number;baseUrl: string = "";
  btnNext:boolean; isShowLoader:boolean=false;bindmaingrid:BindMainGriddata;
  submitted = false;
  CustNameDive:boolean;
  divEmployee:boolean;
  CustomerAccount:string;tempGAccountNumber:any;
  ShowLoaderp:boolean;
  FromDate:string;
  ToDate:string;
  showfromdate:boolean=false;
  IsShowNoRecord:boolean;
  columnDefs = [
    {headerName: 'Sr. No.', field: 'SrNo', width:'80'},
    {headerName: 'As On', field: 'FromDate', width:'150'},
    //{headerName: 'To Date', field: 'ToDate', width:'150'},
    {headerName: 'Customer Account', field: 'CustomerAccount', width:'150'},
    {headerName: 'Scheme', field: 'Scheme', width:'150'},
    {headerName: 'Download', field: '', width:'100',cellClass:'text-center',cellRenderer: (params) => {
      return ' <a target="_blank"  href="'+ this.baseUrl +''  + params.data.DownloadLink + '"> <i class="fa fa-file-pdf-o" aria-hidden="true"></i></a> ';
    }},
    {headerName: 'Data View Mode', field: 'viewmode', width:'150', cellClass:'text-center',cellRenderer: (params) => {
      return '<a href="/PortfolioFact?CustomerAccount='  + params.data.CustomerAccount + '&FromDate='+ params.data.FromDate  + '&ToDate='+ params.data.ToDate  + '"><button type="button" class="btn btn-success" >View </button></a>';
    }
    },
  
    
];

rowData = [
    {  SrNo: '1', fromdate:'14/07/2020', todate:'20/07/2020',  customeraccount: '47481000024748', scheme: '', download:'',  viewmode: ''},
    {  SrNo: '2', fromdate:'14/07/2020', todate:'20/07/2020',  customeraccount: '47481000024748', scheme: '', download:'',  viewmode: ''},
    {  SrNo: '3', fromdate:'14/07/2020', todate:'20/07/2020',  customeraccount: '47481000024748', scheme: '', download:'',  viewmode: ''},

   
];
  constructor(private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string,private formbuilder:FormBuilder,private Dbsecurity: DbsecurityService,private _capitalStateService:CapitalSatementService,private TSService : PortfolioSummaryViewServiceService) { }

  ngOnInit(): void {
    this.baseUrl = AppSettings.Login_URL;
    this.btnNext=false;
    this.btnPrev=false;

    this.PortFolioFactView=this.formbuilder.group({
      CustomerAccount:[0],
      Formdate:[''],
      Todate:[''] ,
      Employee1:[0],
      AsOnDate:['']

    })
   
    const datat = this.PortFolioFactView.value;
    var AsOnDate=datat.AsOnDate;
    var ToDate=datat.Todate;
    this.tempGAccountNumber=GAccountNumber;
    

    this.Showcustdropdown();


    let item = JSON.parse(sessionStorage.getItem('User'));
    var userType=this.Dbsecurity.Decrypt(item.UserType);
    
    var accountNumber=item.AccountNo;
    var GAccountNumber,GUserId;
    if(userType ==1)
    {
      GUserId=item.UserId;
      GAccountNumber=item.AccountNo;;   
      this.BindMainGrid(GAccountNumber,AsOnDate,ToDate);
    }
    else if(userType ==2)
    {
     
    //  GUserId=item.UserId;
     GAccountNumber="1";
     this.BindCustomers();
     this.BindMainGrid("1","","");
      
    }

   else if(userType ==3)
    {
      // this.GUserId=item.UserId;
      GAccountNumber="0";
      this.BindEmployee();
      // this.StatementOfExpenseForm.controls["UserId"].setValue(0);
      this.BindMainGrid("1","","");
    
    }
    
    else{
      // this.GUserId=item.UserId;
      GAccountNumber="0";
      this.BindEmployee();
      this.BindMainGrid("1","","");
     
    }
   
    
    
  }
  Showcustdropdown(){ 
    let item = JSON.parse(sessionStorage.getItem('User'));
    var usertype=this.Dbsecurity.Decrypt(item.UserType);
    var userid1=this.Dbsecurity.Decrypt(item.UserId);
  
    if(usertype == 1)
    {
      this.CustNameDive=false;
      this.divEmployee=false;
    }
    if(usertype == 2){
      this.CustNameDive=true;
      this.divEmployee=false;  
     this.BindCustomers();
    }
    if(usertype == 3 ||usertype == 4){
     
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
  
  
    if(usertype == 2 ){
      UserId=item.UserId
    }
  
    if(usertype == 3 || usertype == 4){
  
     // this.UserId = this.Dbsecurity.Decrypt(item.UserId);
  
     UserId =this.Dbsecurity.Encrypt(this.PortFolioFactView.controls['Employee1'].value);
  
    }
  
    this._capitalStateService.BindCustomers(UserId).subscribe(
      (data) => {
     
        
           this.BindcustomerallfieldsList = data.Table;
           this.customerlength = data.Table.length;
      });
  }
  BindMainGrid(GAccountNumber,AsOnDate,ToDate){
    this.isShowLoader=true;
    let item = JSON.parse(sessionStorage.getItem('User'));   
    let _apipostdata = new PrimaryDetails();
    _apipostdata.userType=item.UserType;
    _apipostdata.ReportName="5";
    
    _apipostdata.accountNumber=GAccountNumber;
    _apipostdata.Fromdate=AsOnDate;
    _apipostdata.Todate=ToDate;
    this.TSService.BindMainGrid(JSON.stringify(_apipostdata)).subscribe(
      (data) => {
        this.isShowLoader=false;
           this.bindmaingrid = data.Table;
          
          
      });
  }
  bindGrid() {
    
    
    
    
    this.submitted = true;
    if (this.validation()) {
        const datat = this.PortFolioFactView.value;
       
         this.CustomerAccount=datat.CustomerAccount;
        
        var AsOnDate=datat.AsOnDate;
        var splitted = AsOnDate.split("-", 3); 
        AsOnDate = (splitted[2] +"/"+ splitted[1] +"/"+ splitted[0]);
        var ToDate=datat.ToDate;
        if(ToDate !=undefined)
      {
        var splitted1 = ToDate.split("-", 3); 
        ToDate = (splitted1[2] +"/"+ splitted1[1] +"/"+ splitted1[0]);
      }
      else{
        ToDate="";
      }
       
        
        this.BindMainGrid(this.CustomerAccount,AsOnDate,ToDate)
    }
   

    
  }
  CustomerOn_Change(){
    let acno=((document.getElementById("ddlcustomerdropdown") as HTMLInputElement).value);
   
   if(acno =="0")
   {
    document.getElementById("ddlcustomerdropdown").classList.add('validate');
   }
   else{
    document.getElementById("ddlcustomerdropdown").classList.remove('validate');

    const datat = this.PortFolioFactView.value;
    console.log(datat)
   
    var customeracount=datat.CustomerAccount;
    var AsOnDate=datat.AsOnDate;
    if(AsOnDate !="")
    {
     var splitted1 = AsOnDate.split("-", 3); 
    AsOnDate = (splitted1[2] +"/"+ splitted1[1] +"/"+ splitted1[0]);
   }
    var ToDate="";
    this.BindMainGrid(customeracount,AsOnDate,ToDate);
   }
  }
  
  validation():boolean{

    var flag=true;
    let item = JSON.parse(sessionStorage.getItem('User'));
    if(this.Dbsecurity.Decrypt(item.UserType)==3 || this.Dbsecurity.Decrypt(item.UserType)==4){
      let emp=((document.getElementById("ddlemployeedropdown") as HTMLInputElement).value);
      if(emp =="0")
      {
       document.getElementById("ddlemployeedropdown").classList.add('validate');
       flag=false;
      }
    }
    if(this.Dbsecurity.Decrypt(item.UserType)==3 ||this.Dbsecurity.Decrypt(item.UserType)==2 || this.Dbsecurity.Decrypt(item.UserType)==4){
    let acno=((document.getElementById("ddlcustomerdropdown") as HTMLInputElement).value);
    if(acno =="0")
    {
     document.getElementById("ddlcustomerdropdown").classList.add('validate');
     flag=false;
    }
  }
  if(this.Dbsecurity.Decrypt(item.UserType)==1){
    let date=((document.getElementById("date") as HTMLInputElement).value);
    if(date =="")
    {
     document.getElementById("date").classList.add('validate');
     flag=false;
    }
  }
    
    return flag;
  }
  RemoveClass(){
    let item = JSON.parse(sessionStorage.getItem('User'));
    if(this.Dbsecurity.Decrypt(item.UserType)==3 ||this.Dbsecurity.Decrypt(item.UserType)==4){
    let emp=((document.getElementById("ddlemployeedropdown") as HTMLInputElement).value);
    if(emp !="0")
    {
     document.getElementById("ddlemployeedropdown").classList.remove('validate');
    }
  }
  if(this.Dbsecurity.Decrypt(item.UserType)==3 ||this.Dbsecurity.Decrypt(item.UserType)==2){
    let acno=((document.getElementById("ddlcustomerdropdown") as HTMLInputElement).value);
    if(acno !="0")
    {
     document.getElementById("ddlcustomerdropdown").classList.remove('validate');
    }
  }
  if(this.Dbsecurity.Decrypt(item.UserType)==1){
    let date=((document.getElementById("date") as HTMLInputElement).value);
    if(date !="")
    {
     document.getElementById("date").classList.remove('validate');
    }
  }

  }
  FetchLatestReport() {
    let item = JSON.parse(sessionStorage.getItem('User'));
    if(this.Dbsecurity.Decrypt(item.UserType)==1){
      this.isShowLoader=true;
    var currentContext = this;
    // let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    var ReportName="5";
    const datat = this.PortFolioFactView.value;
    var CustomerAccount=item.AccountNo;
    var JsonData ={
    //this.TransactionStatementForm.controls['ToDate']
    "CustomerAccount" : CustomerAccount,
    "ReportName":ReportName
    }
    
    
    this.TSService.GetFetchLatestReport(JsonData).
    subscribe((data) => {
    // currentContext.transactionStatementView = data.Table;
    // this.transactionStatementView_Copy=data.Table;
    // this.isShowCustomer=true;
    const datat = this.PortFolioFactView.value;
    var AsOnDate=datat.Formdate;
    var ToDate=datat.Todate;
    this.BindMainGrid(CustomerAccount,AsOnDate,ToDate);
    });
    // console.log(sessionStorage.getItem('ID'));
    //this.loading = false;
    }
    else
        {
      let acno=((document.getElementById("ddlcustomerdropdown") as HTMLInputElement).value);
   
      if(acno =="0")
      {
       document.getElementById("ddlcustomerdropdown").classList.add('validate');
      }
      else{
     
      this.isShowLoader=true;
      var currentContext = this;
      // let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
      var ReportName="5";
      const datat = this.PortFolioFactView.value;
      var CustomerAccount=datat.CustomerAccount;
      var JsonData ={
      //this.TransactionStatementForm.controls['ToDate']
      "CustomerAccount" : CustomerAccount,
      "ReportName":ReportName
      }
      
      
      this.TSService.GetFetchLatestReport(JsonData).
      subscribe((data) => {
      // currentContext.transactionStatementView = data.Table;
      // this.transactionStatementView_Copy=data.Table;
      // this.isShowCustomer=true;
      const datat = this.PortFolioFactView.value;
      var AsOnDate=datat.Formdate;
      var ToDate=datat.Todate;
      this.BindMainGrid(CustomerAccount,AsOnDate,ToDate);
      });
      // console.log(sessionStorage.getItem('ID'));
      //this.loading = false;
    }
    }
  
    
    }
  

}
