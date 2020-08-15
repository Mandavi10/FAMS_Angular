import { Component, OnInit } from '@angular/core';
import{DbsecurityService}from 'src/app/Services/dbsecurity.service';
import { AgGridAngular } from 'ag-grid-angular';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
 import { Customer} from '../../../Models/HoldingReport/holdingReport';
 import { BankbookService } from '../../Services/BankBook/bankbook.service';
 import { Bindgrid } from '../../../Models/BankBook/bindgrid';
 import { Bindgridview } from '../../../Models/BankBook/bindgridview';
 import { Totalsumgrid } from '../../../Models/BankBook/totalsumgrid';
 import { Header } from '../../../Models/BankBook/header';
 import { Bindemployee } from '../../../Models/BankBook/bindemployee'
 import { Allcustomers } from '../../../Models/BankBook/Allcustomers';
 import { Commonfields } from '../../../Models/commonfields';
@Component({
  selector: 'app-bank-book-view',
  templateUrl: './bank-book-view.component.html',
  styleUrls: ['./bank-book-view.component.css']
})
export class BankBookViewComponent implements OnInit {
  columnDefs = [
    {headerName: 'Sr. No.', field: 'Srno', width:'80'},
    {headerName: 'From Date', field: 'ReportDate', width:'150'},
    {headerName: 'To Date', field: 'ToDate', width:'150'},
    {headerName: 'Customer Account', field: 'CustomerAccountNo', width:'150'},
    {headerName: 'Scheme', field: 'scheme', width:'150'},

    {headerName: 'Download', field: 'DownloadLink', width:'100',cellClass:'text-center', cellRenderer: function clickNextRendererFunc(params){
      // return '    <i class="fa fa-file-excel-o" aria-hidden="true" title="Download"></i>';
      return ' <a target="_blank"  href="'+ params.data.DownloadLink  + '"> Download</a> ';

    }},
    {headerName: 'Data View Mode', field: 'viewmode', width:'150', cellClass:'text-center',cellRenderer: (params) => {
      return '<a href="/BankBook?CustomerAccount='  + params.data.CustomerAccountNo + '&FromDate='+ params.data.ReportDate  + '&ToDate='+ params.data.ToDate  + '">View</a>';
    }
    },
  
    
];

// rowData = [
//     {  SrNo: '1', fromdate:'14/07/2020', todate:'20/07/2020',  customeraccount: '47481000024748', scheme: '', download:'',  viewmode: ''},
//     {  SrNo: '2', fromdate:'14/07/2020', todate:'20/07/2020',  customeraccount: '47481000024748', scheme: '', download:'',  viewmode: ''},
//     {  SrNo: '3', fromdate:'14/07/2020', todate:'20/07/2020',  customeraccount: '47481000024748', scheme: '', download:'',  viewmode: ''},

   
// ];

BindgridList:Bindgrid;BankBookViewForm:FormGroup;TotalsumgridData:Totalsumgrid;Buy_SellAmount:any;Income:any;
  Expenses:any;Dep_with:any;Balance:any;griddiv:boolean=false;HeaderArray:any=[];StaticArray:any=[];
  FromDate:any;ToDate:any;Head=[];StaticArray1:any=[];StaticArray2:any=[];BindCustomersList:Allcustomers;
  loader1:boolean=false;loader2:boolean=false; isShowLoader:boolean=false;divCustomer:boolean=false;userType:number;HeaderList:Header;
  divEmployee:boolean=false;BindemployeesList:Bindemployee;CustomerAccount:any;PageCount:any;UserId:any;
  TotalRecord:any;PaginationCount:any;divTotal:boolean=true;Code:any="";NoOfPage:any="";Flag:any;
  NoRecord:boolean=true;btnNext:boolean=true;btnPrev:boolean=true;liExport:boolean=false;
  IsShowRecord:boolean;  IsShowNoRecord:boolean;
 BindGridview1:Bindgridview;

  constructor(private BSService : BankbookService, private Dbsecurity: DbsecurityService,private formbulider: FormBuilder) { }

  ngOnInit(): void {
    this.BankBookViewForm = this.formbulider.group({
      EmployeeId: [0, ],
      UserId: [0, ],
      FromDate: ['', ],
      ToDate: ['',],
  });
  this.BindEmployee();
  this.BindCustomers();
  this.BankBookViewForm.controls["UserId"].setValue('');
  
  let item = JSON.parse(sessionStorage.getItem('User'));  
  this.userType=this.Dbsecurity.Decrypt( item.UserType);
if(this.userType == 3){
  this.UserId = this.Dbsecurity.Decrypt(item.UserId);
  this.CustomerAccount = ""; 
  this.divCustomer=true;
  this.divEmployee=true;
  this.BindEmployee();
  this.BindGridView('','','');
}

  else if(this.userType == 2){
    this.UserId = this.Dbsecurity.Decrypt(item.UserId);
    this.CustomerAccount = "";
    this.divCustomer=true;
    this.divEmployee=false;
    this.BindCustomers();
    this.BindGridView('','','');
  }

  else{
    this.UserId = this.Dbsecurity.Decrypt(item.UserId);
    // this.CustomerAccount = this.Dbsecurity.Decrypt(item.AccountNo);
    this.CustomerAccount = item.AccountNo;
    this.BindDefaultData();
  }
  this.PageCount = 1;
  
  this.loader1 = false; this.loader2 = false;
 // }
  
  }

  BindDefaultData(){
    
    this.loader1=true;this.loader2=true;
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    var JsonData ={
      "UserId" : this.UserId,
      "CustomerAccount" : this.CustomerAccount ,
      "PageCount" : this.PageCount
    }
    let fromdate,todate;
    this.BSService.BindDefaultData(JsonData).subscribe(
      (data) => {
        this.FromDate = data.Table[0]["FromDate"];
        this.ToDate = data.Table[0]["ToDate"];
        fromdate=data.Table[0].FromDate;
        todate=data.Table[0].ToDate;
        
        this.BankBookViewForm.controls["FromDate"].setValue(data.Table[0].FromDate);
        this.BankBookViewForm.controls["ToDate"].setValue(data.Table[0].ToDate);
        //this.BankBookViewForm.controls["CustomerAccount"].setValue(data.Table[0].CustomerAccount);
        if(this.userType != 1 ){
        this.CustomerAccount = data.Table[0].CustomerAccount;
        }
        if(this.userType != 3 ){
          this.CustomerAccount = data.Table[0].CustomerAccount;
          }
          this.BindGridView(fromdate,todate,this.CustomerAccount);
        this.PageCount = 1;
        this.griddiv=true;  
       
       
      });
  
      // this.BindGridView(fromdate,todate,this.CustomerAccount);
      //this.BindDefaultGrid();   
      this.loader1=false;this.loader2=false;
      
  }

  SearchData(FromDate,ToDate){
    this.FromDate = FromDate;
    this.ToDate = ToDate;
    this.CustomerAccount = this.BankBookViewForm.controls['UserId'].value;
   
    this.PageCount = 1;
    this.BindGridView( this.FromDate, this.ToDate,this.CustomerAccount);
  }
  
  BindGridView(FromDate,ToDate,CustomerAccount){
    this.isShowLoader=true;
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    var JsonData ={
      
      "CustomerAccount":CustomerAccount,
      "FromDate" : FromDate ,
      "ToDate" : ToDate,
      "ReportType":'1',
    }
    this.BSService.BindGridView(JsonData).subscribe(
      (data) => {
        this.BindGridview1=data.Table;
        

      });
      this.isShowLoader=false;
      
  }

  FetchLatestReport() {
   
    // this.loading = true;
    this.isShowLoader=true;
    var currentContext = this;
    // let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    //var ReportName="1";
   this.CustomerAccount = this.BankBookViewForm.controls['UserId'].value;;
    var JsonData ={
    //this.TransactionStatementForm.controls['ToDate']
    "CustomerAccount" : this.CustomerAccount,
    "ReportType":"1"
    }
    
    
    this.BSService.GetFetchLatestReport(JsonData).
    subscribe((data) => {
    // currentContext.transactionStatementView = data.Table;
    // this.transactionStatementView_Copy=data.Table;
    // this.isShowCustomer=true;
    this.isShowLoader=false;
    });
   
    
    }

  BindDefaultGrid(){
   
    this.loader1=true;this.loader2=true;
    var JsonData ={
      "UserId" : this.UserId,
      "FromDate" : this.FromDate,   
      "ToDate" :  this.ToDate,
      "CustomerAccount" : this.CustomerAccount,
      "PageCount" : this.PageCount,
      "ReportType":'1',       
    }

    this.BSService.BindGridView(JsonData).subscribe(
      (data) => {
        if((data.Table.length !=0))
      {
        this.loader1=false;this.loader2=false;
        this.btnNext=true;
        this.IsShowRecord=true;
        this.IsShowNoRecord=false;
        this.BindGridview1=data.Table;
       // this.BindgridList = data.Table; 
        // this.TotalsumgridData = data.Table1;
        // this.HeaderList = data.Table2;
        // this.Buy_SellAmount=this.TotalsumgridData[0].Buy_SellAmount;
        // this.Income=this.TotalsumgridData[0].Income;
        // this.Expenses=this.TotalsumgridData[0].Expenses;
        // this.Dep_with=this.TotalsumgridData[0].Dep_with;
        // this.Balance=this.TotalsumgridData[0].Balance;
        this.NoRecord = false;
      }
      else
      {
        this.loader1=false;this.loader2=false;
        //this.isShowLoader=false;
        this.IsShowRecord=false;
        this.IsShowNoRecord=true;
        this.btnNext=false;
      }
        });
      
      
  }


  BindCustomersOnChange(EmployeeId){
    this.loader1=true;this.loader2=true;
    let  Data = new Commonfields();
    Data.UserId = EmployeeId ;
    this.BSService.BindCustomers(JSON.stringify(Data)).subscribe(
      (data) => {
           this.BindCustomersList = data.Table;
           this.loader1=false;this.loader2=false;
      });

  }
  

  
  BindEmployee(){
    this.loader1=true;this.loader2=true;
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    let  Data = new Commonfields();
    Data.UserId = Sessionvalue.UserId;
    this.BSService.BindEmployee(JSON.stringify(Data)).subscribe(
      (data) => {
           this.BindemployeesList = data.Table;
           this.loader1=false;this.loader2=false;
      });
  }

  BindCustomers(){

    this.loader1=true;this.loader2=true;
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    let  Data = new Commonfields();
    Data.UserId = this.Dbsecurity.Decrypt(Sessionvalue.UserId);
    this.BSService.BindCustomers(JSON.stringify(Data)).subscribe(
      (data) => {
           this.BindCustomersList = data.Table;
           this.loader1=false;this.loader2=false;
      });
  }

  

}
