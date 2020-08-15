import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CurrentportfolioService } from 'src/app/Services/CurrentPortFolio/currentportfolio.service';
import{DbsecurityService}from 'src/app/Services/dbsecurity.service';
import { Router, ActivatedRoute } from '@angular/router';
import {Currentportfolio,CurrentportfolioView} from '../../../Models/CurrentPortfolio/currentportfolio';
import {Header} from '../../../Models/CurrentPortfolio/header';
import {Bindemployee} from '../../../Models/BankBook/bindemployee';
import {BindCustomers} from '../../../Models/BankBook/bindcustomers';
import {Bindcustomerallfields} from '../../../Models/SummaryReport/Bindcustomerallfields';
import { Commonfields } from '../../../Models/commonfields';
@Component({
  selector: 'app-current-portfolio-view',
  templateUrl: './current-portfolio-view.component.html',
  styleUrls: ['./current-portfolio-view.component.css']
})
export class CurrentPortfolioViewComponent implements OnInit {


  divMainGrid :boolean=true;userType:any;UserId:any;CustomerAccount:any;PageCount:any;
  EmployeeDiv:boolean=false;CustNameDive:boolean=false; loader1:boolean=false;loader2:boolean=false;
  ReportDate:any; AllEmployeesList:Bindemployee;BindCustomersList:BindCustomers;
  CurrentPortfolioForm : FormGroup;IsShowRecord:boolean; CurrentportfolioList1:Currentportfolio;
  CurrentportfolioList : Currentportfolio;HeaderList:Header;

  currentportfolioView:CurrentportfolioView;

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
  submitted = false;



  columnDefs = [
    // {headerName: 'Sr. No.', field: 'SrNo', width:'80'},
    {headerName: 'Sr. No.', field: 'srNo', width: 80,cellRenderer : function (params) {
      return params.rowIndex + 1;
    }},
    {headerName: 'Report Date', field: 'ReportDate', width:'150'},
   //  {headerName: 'To Date', field: 'ReportDate', width:'150',hide:true},
    {headerName: 'Customer Account', field: 'CustomerAccountNo', width:'150'},
    {headerName: 'Scheme', field: 'scheme', width:'150'},
    {headerName: 'Download', field: 'DownloadLink', width:'100',cellClass:'text-center', cellRenderer: function clickNextRendererFunc(params){
      // return '    <i class="fa fa-file-excel-o" aria-hidden="true" title="Download"></i>';
      // return ' <a target="_blank"  href="../../../assets/Files/Portfolio_Report.pdf"> Download</a> ';
      return ' <a target="_blank"  href="'+ params.data.DownloadLink  + '"> Download</a> ';
    }},
    {headerName: 'Data View Mode', field: 'viewmode', width:'150', cellClass:'text-center',cellRenderer: function clickNextRendererFunc(params){
    //  return '<button type="button" class="btn btn-success">View</button>';
    return '<a href="/CurrentPortfolio?CustomerAccountNo='  + params.data.CustomerAccountNo + '&ReportDate='+ params.data.ReportDate  + '">View</a>';
    }},
  
    
];

rowData = [
    {  SrNo: '1', fromdate:'14/07/2020', todate:'20/07/2020',  customeraccount: '47481000024748', scheme: '', download:'',  viewmode: ''},
    {  SrNo: '2', fromdate:'14/07/2020', todate:'20/07/2020',  customeraccount: '47481000024748', scheme: '', download:'',  viewmode: ''},
    {  SrNo: '3', fromdate:'14/07/2020', todate:'20/07/2020',  customeraccount: '47481000024748', scheme: '', download:'',  viewmode: ''},

   
];




constructor(private route: ActivatedRoute, private formBuilder: FormBuilder,private _CurrentportfolioService: CurrentportfolioService,private Dbsecurity: DbsecurityService) { }

  ngOnInit(): void {

    this.CurrentPortfolioForm = this.formBuilder.group({  
      //   Formdate:[''],
        // Todate:['',Validators.required],
         CustomerAccount:['0',Validators.required] ,ReportDate:['',Validators.required],
         EmployeeId:['0',Validators.required]
     });


         

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

    //  if(this.userType == 2 || this.userType == 3){     
    
    //  }
    //  else
    //  {
      this.BindDefaultData();
    // }

  }




  BindDefaultData(){
    
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
        // this.CustomerAccount = data.Table[0]["CustomerAccountNo"];
          // this.CurrentPortfolioForm.controls["ReportDate"].setValue(this.ReportDate);
          // this.CurrentPortfolioForm.controls["CustomerAccount"].setValue(this.CustomerAccount);
        this.PageCount = 1;

        let item = JSON.parse(sessionStorage.getItem('User'));  
        this.userType=this.Dbsecurity.Decrypt( item.UserType);
        if(this.userType == 2 || this.userType == 3){  
          this.CustomerAccount='';   
          this.CurrentPortfolioForm.controls["CustomerAccount"].setValue('');
    
        }
        else{
          this.CustomerAccount = data.Table[0]["CustomerAccountNo"];
          this.CurrentPortfolioForm.controls["ReportDate"].setValue(this.ReportDate);
          this.CurrentPortfolioForm.controls["CustomerAccount"].setValue(this.CustomerAccount);

        }
       
        this.BindDefaultGrid();     
      });
      this.loader1=false;this.loader2=false;     
  }


  BindDefaultGrid(){
    

    var splitted = this.ReportDate.split("-", 3); 
    var ReportDate = (splitted[2] +"/"+ splitted[1] +"/"+ splitted[0]);
    

    let ReportType=2;
    var JsonData ={
      "UserId" : this.UserId,
      "ReportDate" : ReportDate,   
      "CustomerAccountNo" : this.CustomerAccount,
      "PageCount" : this.PageCount,
      "ReportType":  ReportType  
    }
    this.loader1=true;this.loader2=true;
    this.IsShowRecord=false;
    
    this._CurrentportfolioService.BindGridAllFieldsView(JsonData).subscribe(
      (data) => {
      //  if((data.Table.length !=0) && (data.Table1.length !=0) && (data.Table2.length !=0) && (data.Table3.length !=0))
        {
  
          
         // this.IsShowNoRecord=false;
       //   this.btnNext = true;
        this.CurrentportfolioList = data.Table;
        this.currentportfolioView=data.Table
        console.log('default current portfolio');
        console.log(this.currentportfolioView)
        //this.HeaderList = data.Table1;
       // this.CurrentportfolioList1 = data.Table3;

        // this.STSumGL = data.Table2[0].SumGL;
        // this. STSumIncome = data.Table2[0].SumIncome;
        // this. STSumMarketValue = data.Table2[0].SumMarketValue;
        // this. STSumPercentAssets= data.Table2[0].SumPercentAssets;
        // this. STSumPercentG_L= data.Table2[0].SumPercentG_L;
        // this. STSumTotalCost = data.Table2[0].SumTotalCost;

        // this.ETSumTotalCost = data.Table2[0].SumTotalCost;
        // this.ETSumMarketValue =data.Table2[0].SumMarketValue;
        // this.ETSumIncome =  data.Table2[0].SumIncome;
        // this.ETSumGL = data.Table2[0].SumGL;
        // this.ETSumPercentG_L = data.Table2[0].SumPercentG_L;
        // this.ETSumPercentAssets = data.Table2[0].SumPercentAssets;;
       // this.NoRecord = false;
        this.loader1=false;this.loader2=false;
        this.IsShowRecord=true;
        }
        // else
        // {
        //   this.loader1=false;this.loader2=false;
        
        //   this.IsShowRecord=false;
        //   // this.IsShowNoRecord=true;
        //   // this.btnNext=false;
          
        // }
        });       
      
  }


  
  get f() {
    return this.CurrentPortfolioForm.controls;
  }


  BindEmployee(){
    // this.loader1=true;this.loader2=true;
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    let  Data = new Commonfields();
    Data.UserId = Sessionvalue.UserId;
    this._CurrentportfolioService.BindEmployee(JSON.stringify(Data)).subscribe(
      (data) => {
           this.AllEmployeesList = data.Table;
          //  this.loader1=false;this.loader2=false;
      });
  }

  BindCustomers(){
    // this.loader1=true;this.loader2=true;
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    let  Data = new Commonfields();
    Data.UserId = this.Dbsecurity.Decrypt(Sessionvalue.UserId);
    this._CurrentportfolioService.BindCustomers(JSON.stringify(Data)).subscribe(
      (data) => {
           this.BindCustomersList = data.Table;
          //  this.loader1=false;this.loader2=false;
      });
  }


  
  BindCustomersOnChange(EmployeeId){
    // this.loader1=true;this.loader2=true;
    let  Data = new Commonfields();
    Data.UserId = EmployeeId ;
    this._CurrentportfolioService.BindCustomers(JSON.stringify(Data)).subscribe(
      (data) => {
           this.BindCustomersList = data.Table;
          //  this.loader1=false;this.loader2=false;
      });

  }

  Search(ReportDate){

    let item = JSON.parse(sessionStorage.getItem('User'));
    var usertype=this.Dbsecurity.Decrypt(item.UserType);

    if(usertype == 2 ||usertype == 3 || usertype == 4){

      const IsCustomerAccount = this.CurrentPortfolioForm.get('CustomerAccount');
      IsCustomerAccount.setValidators(Validators.required); IsCustomerAccount.updateValueAndValidity();
     if(this.CurrentPortfolioForm.controls['CustomerAccount'].value != 0){
      

     }
   

      // CustomerAccountNo= this.Dbsecurity.Encrypt(this.capitalStatForm.controls['CustomerAccount'].value);
    
    }
    else{
      const IsCustomerAccount = this.CurrentPortfolioForm.get('CustomerAccount');
      IsCustomerAccount.clearValidators(); IsCustomerAccount.updateValueAndValidity();

    //   const IsReportdate = this.CurrentPortfolioForm.get('ReportDate');
    //  IsReportdate.setValidators(Validators.required); IsReportdate.updateValueAndValidity();
  

    }
    if(usertype == 3){

      
      const IsEmployee = this.CurrentPortfolioForm.get('EmployeeId');
      IsEmployee.setValidators(Validators.required); IsEmployee.updateValueAndValidity();
      // CustomerAccountNo= this.Dbsecurity.Encrypt(this.capitalStatForm.controls['Employee1'].value);

    }
    else{
      const IsEmployee = this.CurrentPortfolioForm.get('EmployeeId');
      IsEmployee.clearValidators(); IsEmployee.updateValueAndValidity();
      // CustomerAccountNo= item.AccountNo
      
   

    }
    const IsReportdate = this.CurrentPortfolioForm.get('ReportDate');
    IsReportdate.setValidators(Validators.required); IsReportdate.updateValueAndValidity();
    this.submitted = true;
    if (this.CurrentPortfolioForm.invalid) {
      return; 
    }
    else{
      
    this.ReportDate = ReportDate;
    this.CustomerAccount = this.CurrentPortfolioForm.controls['CustomerAccount'].value;
    this.PageCount = 1;
    this.BindCurrentPortFolioReport(this.ReportDate);
    }
  }

  
  BindCurrentPortFolioReport(ReportDate) {
    
       
        let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
        var UserId = Sessionvalue.UserId;
        let ReportType=2;
        var JsonData ={
          "UserId" : UserId,
          "ReportDate" : ReportDate,   
          "CustomerAccountNo" : this.CustomerAccount,
          "PageCount" : this.PageCount,
          "ReportType":  ReportType  
        }   
        this.loader1 = true;this.loader2 = true;
        this.IsShowRecord=false;
        this._CurrentportfolioService.BindGridAllFieldsView(JsonData).
            subscribe((data) => {     
            //  if((data.Table.length !=0) && (data.Table1.length !=0) && (data.Table2.length !=0) && (data.Table3.length !=0) )
              {

              //  this.IsShowNoRecord=false;   
              //  this.btnNext = true;     
              this.CurrentportfolioList = data.Table;
              this.currentportfolioView = data.Table;

              console.log('grid C portfolio');
        console.log(this.currentportfolioView)
        console.log(data) 
              // this.HeaderList = data.Table1;
              // this.CurrentportfolioList1 = data.Table3;
              // console.log(this.CurrentportfolioList1);
              // this.STSumGL = data.Table2[0].SumGL;
              // this. STSumIncome = data.Table2[0].SumIncome;
              // this. STSumMarketValue = data.Table2[0].SumMarketValue;
              // this. STSumPercentAssets= data.Table2[0].SumPercentAssets;
              // this. STSumPercentG_L= data.Table2[0].SumPercentG_L;
              // this. STSumTotalCost = data.Table2[0].SumTotalCost;

              // this.ETSumTotalCost = data.Table2[0].SumTotalCost;
              // this.ETSumMarketValue =data.Table2[0].SumMarketValue;
              // this.ETSumIncome =  data.Table2[0].SumIncome;
              // this.ETSumGL = data.Table2[0].SumGL;
              // this.ETSumPercentG_L = data.Table2[0].SumPercentG_L;
              // this.ETSumPercentAssets = data.Table2[0].SumPercentAssets;;
              // this.FooterSum2=true;
              // this.FooterSum1=true;
              // this.Eqlbl=true;
              // this.Shlbl=true;
           
              }
      //         else
      // {
      //   this.loader1 = false;this.loader2 = false;
       
      //   this.IsShowRecord=false;
      //   // this.IsShowNoRecord=true;
      //   // this.btnNext=false;
        
      // }
      this.loader1 = false;this.loader2 = false;
      this.IsShowRecord=true;
              
            });
    }

    FetchLatestReport() {
    
      let item = JSON.parse(sessionStorage.getItem('User'));
      var usertype=this.Dbsecurity.Decrypt(item.UserType);
      var CustomerAccount;
      if(usertype == 2 ||usertype == 3 || usertype == 4){
  
        const IsCustomerAccount = this.CurrentPortfolioForm.get('CustomerAccount');
        IsCustomerAccount.setValidators(Validators.required); IsCustomerAccount.updateValueAndValidity();
      
        const IsEmployee = this.CurrentPortfolioForm.get('EmployeeId');
        IsEmployee.clearValidators(); IsEmployee.updateValueAndValidity();
      
        const IsReportdate = this.CurrentPortfolioForm.get('ReportDate');
        IsReportdate.clearValidators(); IsReportdate.updateValueAndValidity();
        CustomerAccount=this.CurrentPortfolioForm.controls['CustomerAccount'].value;

      }
      else{
        const IsCustomerAccount = this.CurrentPortfolioForm.get('CustomerAccount');
        IsCustomerAccount.clearValidators(); IsCustomerAccount.updateValueAndValidity();

        const IsEmployee = this.CurrentPortfolioForm.get('EmployeeId');
        IsEmployee.clearValidators(); IsEmployee.updateValueAndValidity();
      
        const IsReportdate = this.CurrentPortfolioForm.get('ReportDate');
        IsReportdate.clearValidators(); IsReportdate.updateValueAndValidity();
        
        
        CustomerAccount= item.AccountNo
  
      }

      this.submitted = true; 
     // if (this.CurrentPortfolioForm.controls['CustomerAccount'].invalid) {
        if (this.CurrentPortfolioForm.invalid) {
        return; 
      }
      else{
      // this.loading = true;
      //this.isShowLoader=true;
     // this.loader1 = true;this.loader2 = true;
       var currentContext = this;
       // let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
       var ReportName=2;
      // const datat = this.TransactionStatementViewForm.value;
      // var CustomerAccount=datat.UserId;
    //  CustomerAccount=this.CurrentPortfolioForm.controls['CustomerAccount'].value;
       var JsonData ={
             //this.TransactionStatementForm.controls['ToDate']
         "CustomerAccount" : CustomerAccount,
        "ReportName":ReportName
       }
   
       
       this._CurrentportfolioService.GetFetchLatestReport(JsonData).
           subscribe((data) => {
              //  currentContext.transactionStatementView = data.Table;
              //  this.transactionStatementView_Copy=data.Table;
              // this.isShowCustomer=true;
             // this.isShowLoader=false; 
           //  this.loader1 = false;this.loader2 = false;
           });
       // console.log(sessionStorage.getItem('ID'));
       //this.loading = false;
          }
       
     }


}
