import { Component, OnInit } from '@angular/core';
import{DbsecurityService}from 'src/app/Services/dbsecurity.service';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PortfolioAppraisalsService } from 'src/app/Services/PortfolioAppraisals/portfolio-appraisals.service';
import { PortfolioAppraisals,Bindemployee,SumPortfolioappraisalModel,Sumcashportfolio,cashportfolio,PortfolioappraisalModel,HeaderData} from '../../../Models/PortfolioAppraisals/portfolio-appraisals';
import { Customer} from '../../../Models/HoldingReport/holdingReport';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
//import html2canvas from 'html2canvas';  
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-portfolio-appraisals',
  templateUrl: './portfolio-appraisals.component.html',
  styleUrls: ['./portfolio-appraisals.component.css']
})
export class PortfolioAppraisalsComponent implements OnInit {
  EvenOdd:number=1;


  bindgrid:PortfolioappraisalModel
  isShowEquity:boolean=false;
  isShowFuture:boolean=false;
  isShowSecurity:boolean=false;
  isShowLoader:boolean=false;
  isShowsEmployee:boolean=false;
  PortfolioAppraisalsForm: FormGroup; 
  customer:Customer ;
  CustomerAccount:string;
  userType:number;
 accountNumber:string;
 GAccountNumber:any;
 GUserId:number;
 isShowCustomer:boolean=false;
 loading: boolean = false;
 BindemployeesList:Bindemployee;
 PortfolioappraisalModel:PortfolioappraisalModel;
 SumPortfolioappraisalModel:SumPortfolioappraisalModel;
 cashportfolio:cashportfolio;
 Sumcashportfolio:Sumcashportfolio;
 HeaderData:HeaderData

  //BindemployeesList:Bindemployee;


  constructor(private router: Router,private _PortfolioAppraisalsService:PortfolioAppraisalsService,private formbulider: FormBuilder, private Dbsecurity: DbsecurityService) { }

  ngOnInit() {
    this.PortfolioAppraisalsForm = this.formbulider.group({
      EmployeeId: [0, ],
      UserId: [0, ],
      FromDate: ['', ],
      ToDate: ['',],
  });

  let item = JSON.parse(sessionStorage.getItem('User'));
  // this.UserId = item.UserId;
  // this.EntityId = item.ReferenceId;
    this.userType=this.Dbsecurity.Decrypt(item.UserType);
    this.accountNumber=this.Dbsecurity.Decrypt( item.AccountNo);
    debugger;
    if(this.userType ==1)
    {
      this.GUserId=item.UserId;
      this.GAccountNumber=this.accountNumber;   
    }

   else if(this.userType ==3)
    {
      this.GUserId=item.UserId;
      this.GAccountNumber="0";
      this.PortfolioAppraisalsForm.controls["UserId"].setValue(0);
      this.isShowCustomer=true;
      this.BindEmployee();
      //this.BindCustomer();
     
    }
    else if(this.userType ==2)
    {
     // this.isShowCustomer=true;
     this.GUserId=item.UserId;
     this.GAccountNumber="1";
      this.BindCustomer();
    }
    else{
      this.GUserId=item.UserId;
      this.GAccountNumber="0";
      this.isShowCustomer=false;
      this.isShowsEmployee=false;
    }
    if (this.PortfolioAppraisalsForm.controls["UserId"].value==0 && this.PortfolioAppraisalsForm.controls["FromDate"].value==""  && this.PortfolioAppraisalsForm.controls["ToDate"].value=="") 
   {
     this.BindDefaultLast(this.GAccountNumber,this.GUserId)
   }
  }
   BindDefaultLast(GAccountNumber,UserId)
   {
     debugger;
     this._PortfolioAppraisalsService.BindDefaultData(GAccountNumber,UserId).
     subscribe((data) => {
       //this.statementOfExpenses_Default=data.Table;
      // this.StatementOfExpenseForm.controls['ToDate'].setValue(currentDate);
      if(this.userType==3)
      {
       if(data.Table[0].CustomerAccount=="6010001" || data.Table[0].CustomerAccount=="6010002"||data.Table[0].CustomerAccount=="6010003" || data.Table[0].CustomerAccount=="6010004"||data.Table[0].CustomerAccount=="6010005")
       {
        this.PortfolioAppraisalsForm.controls["UserId"].setValue(0);
       }
       else{
        this.PortfolioAppraisalsForm.controls["UserId"].setValue(data.Table[0].CustomerAccount);
       }
 
      }
      else
      {
       this.PortfolioAppraisalsForm.controls["UserId"].setValue(data.Table[0].CustomerAccount);
      }
     
      //this.StatementOfExpenseForm.controls["UserId"].setValue(data.Table[0].CustomerAccount);
 
       this.PortfolioAppraisalsForm.controls["FromDate"].setValue(data.Table[0].FromDate);
       this.PortfolioAppraisalsForm.controls["ToDate"].setValue(data.Table[0].ToDate);
     this.BindStatementOfExpReport(data.Table[0].CustomerAccount,data.Table[0].FromDate,data.Table[0].ToDate,this.EvenOdd) ;
     });
     
   }


   BindGrid(){


    
   }
   PreviousClick()
   {
     this.EvenOdd-=1;
     //this.BindStatementOfExpReport(this.StatementOfExpenseForm.controls["UserId"].value,this.StatementOfExpenseForm.controls["FromDate"].value,this.StatementOfExpenseForm.controls["ToDate"].value,this.EvenOdd);
     if(this.EvenOdd % 2 !=0)
     {
 
       this._PortfolioAppraisalsService.NextRecordBind(this.PortfolioAppraisalsForm.controls["UserId"].value,this.PortfolioAppraisalsForm.controls["FromDate"].value,this.PortfolioAppraisalsForm.controls["ToDate"].value,this.EvenOdd).
       subscribe((data) => {
       //this.statementOfExpenses_Default=data.Table;
      // this.StatementOfExpenseForm.controls['ToDate'].setValue(currentDate);
         if(data.Table.length!=0)
         {
           // this.StatementOfExpenseForm.controls["UserId"].setValue(data.Table[0].CustomerAccount);
           // this.StatementOfExpenseForm.controls["FromDate"].setValue(data.Table[0].FromDate);
           // this.StatementOfExpenseForm.controls["ToDate"].setValue(data.Table[0].ToDate);
           // this.BindStatementOfExpReport(data.Table[0].CustomerAccount,data.Table[0].FromDate,data.Table[0].ToDate,this.EvenOdd) ;
           this.BindStatementOfExpReport(this.PortfolioAppraisalsForm.controls["UserId"].value,this.PortfolioAppraisalsForm.controls["FromDate"].value,this.PortfolioAppraisalsForm.controls["ToDate"].value,this.EvenOdd);
         }
         
       });
     }
     else
     {
       this.BindStatementOfExpReport(this.PortfolioAppraisalsForm.controls["UserId"].value,this.PortfolioAppraisalsForm.controls["FromDate"].value,this.PortfolioAppraisalsForm.controls["ToDate"].value,this.EvenOdd-1);
     }
     
   }
   NextClick()
   {
     debugger;
     this.EvenOdd+=1;
     if(this.EvenOdd % 2 !=0)
     {
 
       this._PortfolioAppraisalsService.NextRecordBind(this.PortfolioAppraisalsForm.controls["UserId"].value,this.PortfolioAppraisalsForm.controls["FromDate"].value,this.PortfolioAppraisalsForm.controls["ToDate"].value,this.EvenOdd).
       subscribe((data) => {
       //this.statementOfExpenses_Default=data.Table;
      // this.StatementOfExpenseForm.controls['ToDate'].setValue(currentDate);
         if(data.Table.length!=0)
         {
           // this.StatementOfExpenseForm.controls["UserId"].setValue(data.Table[0].CustomerAccount);
           // this.StatementOfExpenseForm.controls["FromDate"].setValue(data.Table[0].FromDate);
           // this.StatementOfExpenseForm.controls["ToDate"].setValue(data.Table[0].ToDate);
           // this.BindStatementOfExpReport(data.Table[0].CustomerAccount,data.Table[0].FromDate,data.Table[0].ToDate,this.EvenOdd) ;
           this.BindStatementOfExpReport(this.PortfolioAppraisalsForm.controls["UserId"].value,this.PortfolioAppraisalsForm.controls["FromDate"].value,this.PortfolioAppraisalsForm.controls["ToDate"].value,this.EvenOdd);
         }
         
       });
     }
     else
     {
       //this.BindStatementOfExpReport(this.PortfolioAppraisalsForm.controls["UserId"].value,this.PortfolioAppraisalsForm.controls["FromDate"].value,this.PortfolioAppraisalsForm.controls["ToDate"].value,this.EvenOdd-1);
     }
     
     
   }
   PreviousDayFun(){
     var date = new Date();
     var currentDate = date.toISOString().slice(0,10);
     this.PortfolioAppraisalsForm.controls['ToDate'].setValue(currentDate);
     date.setDate(date.getDate() - 1);
     var yesterday = date.toISOString().slice(0,10);
     this.PortfolioAppraisalsForm.controls['FromDate'].setValue(yesterday);
   }
   LastOneWeekFun(){
     var date = new Date();
     var currentDate = date.toISOString().slice(0,10);
     this.PortfolioAppraisalsForm.controls['ToDate'].setValue(currentDate);
     date.setDate(date.getDate() - 7);
     var yesterday = date.toISOString().slice(0,10);
     this.PortfolioAppraisalsForm.controls['FromDate'].setValue(yesterday);
   }
   LastOneMonthFun(){
     var date = new Date();
     var currentDate = date.toISOString().slice(0,10);
     this.PortfolioAppraisalsForm.controls['ToDate'].setValue(currentDate);
     date.setDate(date.getDate() - 30);
     var yesterday = date.toISOString().slice(0,10);
     this.PortfolioAppraisalsForm.controls['FromDate'].setValue(yesterday);
   }
   BindEmployee(){
    // this.loader1=true;this.loader2=true;
     let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    // let  Data = new Commonfields();
     //Data.UserId = Sessionvalue.UserId;
     this._PortfolioAppraisalsService.BindEmployee(Sessionvalue.UserId).subscribe(
       (data) => {
         debugger;
            this.BindemployeesList = data.Table;
            this.isShowsEmployee=true;
           // this.loader1=false;this.loader2=false;
       });
   }
   BindCustomerOnChange(EmployeeId) {
    this.EvenOdd=1;
    this.loading = true;
    var currentContext = this;
    this._PortfolioAppraisalsService.BindCustomer(EmployeeId).
        subscribe((data) => {
            currentContext.customer = data.Table;
            this.isShowCustomer=true;
        });
    // console.log(sessionStorage.getItem('ID'));
    this.loading = false;
  }
  BindCustomer() {
    this.loading = true;
    var currentContext = this;
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    this._PortfolioAppraisalsService.BindCustomer(this.Dbsecurity.Decrypt(Sessionvalue.UserId)).
        subscribe((data) => {
            currentContext.customer = data.Table;
            this.isShowCustomer=true;
        });
    // console.log(sessionStorage.getItem('ID'));
    this.loading = false;
  }

  BindStatementOfExpReport(CustomerAccount,FromDate,ToDate,SeqNo) {
    
    this.loading = true;
    this.isShowLoader=true;
    var currentContext = this;

    var jason={
      "CustomerAccountno":CustomerAccount,
      
      "Fromdate":FromDate,
      "pagecount":SeqNo
    }
    this._PortfolioAppraisalsService.BindGridAllFields(jason).
        subscribe((data) => {
          debugger;
             currentContext.cashportfolio = data.Table2;
             currentContext.SumPortfolioappraisalModel = data.Table1;
            // currentContext.statementOfExpenses2 = data.Table2
            currentContext.PortfolioappraisalModel = data.Table;
            currentContext.HeaderData=data.Table4;
            this.isShowSecurity=true;
            if(this.EvenOdd % 2 !=0)
            {
              // this.isShowstatementOfExpenses4=true;
              // this.isShowstatementOfExpenses5=false;
              // currentContext.statementOfExpenses4 = data.Table1;
            }
            else
            {
              // this.isShowstatementOfExpenses4=false;
              // this.isShowstatementOfExpenses5=true;
              // currentContext.statementOfExpenses5 = data.Table2;
            }
            
            // currentContext.statementOfExpenses2 = data.Table2;
            
        });
    // console.log(sessionStorage.getItem('ID'));
    this.loading = false;
    this.isShowLoader=false;
  }
  onSubmit() {
    this.EvenOdd=1;
    debugger;
    //alert('OnSubmi Clicked');
    //this.submitted = true;
    if (this.PortfolioAppraisalsForm.valid) {
        //this.sucess=true;
        const datat = this.PortfolioAppraisalsForm.value;

       
        // var CustomerAccount="Cust_000001";
        // var Date="2020-04-09";
       // var CustomerAccount:
        if(datat.UserId=="0")
        {
         //this.CustomerAccount=this.accountNumber
          this.CustomerAccount=datat.UserId; //change to discuss with vipul
        }
        else{
         this.CustomerAccount=datat.UserId;

        }
        // var CustomerAccount="Cust_000001";
        // var Date="2020-04-09";
       // var CustomerAccount:
       
        
        var FromDate=datat.FromDate;
        var ToDate=datat.ToDate;
        this.BindStatementOfExpReport(this.CustomerAccount,FromDate,ToDate,this.EvenOdd);
    } 
  }

  }


