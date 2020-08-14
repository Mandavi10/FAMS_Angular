import { Component, OnInit } from '@angular/core';
import{DbsecurityService}from 'src/app/Services/dbsecurity.service';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PortfolioAppraisalsService } from 'src/app/Services/PortfolioAppraisals/portfolio-appraisals.service';
import { PortfolioAppraisals,Bindemployee,SumPortfolioappraisalModel,Sumcashportfolio,cashportfolio,PortfolioappraisalModel,HeaderData} from '../../../Models/PortfolioAppraisals/portfolio-appraisals';
import { Customer} from '../../../Models/HoldingReport/holdingReport';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
//import html2canvas from 'html2canvas';  
import { Router, ActivatedRoute  } from '@angular/router';
import { UrlSegment } from '@angular/router';



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
 secoundgrid:PortfolioappraisalModel;
 SumPortfolioappraisalModel:SumPortfolioappraisalModel;
 cashportfolio:cashportfolio;
 Sumcashportfolio:Sumcashportfolio;
 HeaderData:HeaderData
 btnPrev:boolean=true;
 btnNext:boolean=true;
 isShowFutureData:boolean=false;
 pagecount:number=1;
 customerlength:number;
 IsShowNoRecord:boolean;
 IsShowRecord:boolean;
  //BindemployeesList:Bindemployee;


  constructor(private router: Router,private route:ActivatedRoute,private _PortfolioAppraisalsService:PortfolioAppraisalsService,private formbulider: FormBuilder, private Dbsecurity: DbsecurityService) { }

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
    // this.accountNumber=this.Dbsecurity.Decrypt( item.AccountNo);
    this.accountNumber=( item.AccountNo);
        let CustomerAccountNo=this.route.snapshot.queryParamMap.get('CustomerAccountNo');
let AsOnDate=this.route.snapshot.queryParamMap.get('AsOnDate');
    
    if(this.userType ==1)
    {
      this.GUserId=item.UserId;
      this.GAccountNumber=this.accountNumber;   
    }

   else if(this.userType ==3)
    {
      this.GUserId=item.UserId;
      this.GAccountNumber="0";
     // this.PortfolioAppraisalsForm.controls["UserId"].setValue(0);
      this.isShowCustomer=true;
      this.BindEmployee();
      this.PortfolioAppraisalsForm.controls["EmployeeId"].setValue(1);
     // this.BindCustomer();
     this.BindCustomerOnChange(1)
      this.PortfolioAppraisalsForm.controls["UserId"].setValue(CustomerAccountNo);
     
    }
    else if(this.userType ==2)
    {
     // this.isShowCustomer=true;
     this.GUserId=item.UserId;
    //  this.GAccountNumber="1";  CustomerAccountNo
     this.GAccountNumber=CustomerAccountNo; 
      this.BindCustomer();
    }
    else{
      this.GUserId=item.UserId;
      this.GAccountNumber="0";
      this.isShowCustomer=false;
      this.isShowsEmployee=false;
    }
  //   if (this.PortfolioAppraisalsForm.controls["UserId"].value==0 && this.PortfolioAppraisalsForm.controls["FromDate"].value==""  && this.PortfolioAppraisalsForm.controls["ToDate"].value=="") 
  //  {
   //  this.BindDefaultLast(this.GAccountNumber,this.GUserId)
  // this.BindCustomer();
   this.PortfolioAppraisalsForm.controls["UserId"].setValue(CustomerAccountNo);
   this.PortfolioAppraisalsForm.controls["FromDate"].setValue(AsOnDate);
   this.BindStatementOfExpReport(CustomerAccountNo,AsOnDate,AsOnDate,this.EvenOdd) ;
   //}
  }

   BindDefaultLast(GAccountNumber,UserId)
   {

    //router
    // let EmployeeId=this.route.snapshot.queryParamMap.get('CustomerAccount');
    // let UserId1=this.route.snapshot.queryParamMap.get('FromDate');
    // let FromDate=this.route.snapshot.queryParamMap.get('EmployeeId');

    alert(GAccountNumber)
    alert(UserId)
    // alert(FromDate)

    let CustomerAccountNo=this.route.snapshot.queryParamMap.get('CustomerAccountNo');
let AsOnDate=this.route.snapshot.queryParamMap.get('AsOnDate');





    var jason={
      "CustomerAccountno":GAccountNumber,
      "UserID":UserId 
    }
     this._PortfolioAppraisalsService.BindDefaultData(jason).
     subscribe((data) => {
       
      // if(this.userType==3)
      // {
      //  if(data.Table[0].CustomerAccount=="6010001" || data.Table[0].CustomerAccount=="6010002"||data.Table[0].CustomerAccount=="6010003" || data.Table[0].CustomerAccount=="6010004"||data.Table[0].CustomerAccount=="6010005")
      //  {
      //   this.PortfolioAppraisalsForm.controls["UserId"].setValue(0);
      //  }
      //  else{
      //   this.PortfolioAppraisalsForm.controls["UserId"].setValue(data.Table[0].CustomerAccount);
      //  }
 
      // }
      // else
      // {
      //  this.PortfolioAppraisalsForm.controls["UserId"].setValue(data.Table[0].CustomerAccount);
      // }
     
      //this.StatementOfExpenseForm.controls["UserId"].setValue(data.Table[0].CustomerAccount);
 
       this.PortfolioAppraisalsForm.controls["FromDate"].setValue(data.Table[0].AsOnDate);
       this.PortfolioAppraisalsForm.controls["ToDate"].setValue(data.Table[0].ToDate);
       this.PortfolioAppraisalsForm.controls["UserId"].setValue(data.Table[0].CustomerAccountNo);
     this.BindStatementOfExpReport(data.Table[0].CustomerAccountNo,data.Table[0].AsOnDate,data.Table[0].ToDate,this.EvenOdd) ;
     });
     
   }


   BindGrid(){


    
   }
   PreviousClick()
   {
          let item = JSON.parse(sessionStorage.getItem('User'));
     var Usertype=this.Dbsecurity.Decrypt(item.UserType);
     this.EvenOdd-=1;


     
     if(this.EvenOdd == 1){
      
       this.btnPrev=false;
       this.btnNext=true;

     }

       if(this.PortfolioAppraisalsForm.controls['UserId'].value == 0 && Usertype == 2){
      
      
      if(this.EvenOdd == (this.customerlength *2)){ 
        this.btnNext=false;
    
      }
      if(this.EvenOdd <(this.customerlength *2)){ 
        this.btnNext=true;
  
      }
    }
  



         if(this.PortfolioAppraisalsForm.controls['UserId'].value == 0 && Usertype == 3){
        
      // if(this.PageCount ==10){
        if(this.EvenOdd == (this.customerlength *2)){ 
          this.btnNext=false; 
  
        }
  
        if(this.EvenOdd <(this.customerlength *2)){ 
          this.btnNext=true;
    
        }
  
     }

     //this.BindStatementOfExpReport(this.StatementOfExpenseForm.controls["UserId"].value,this.StatementOfExpenseForm.controls["FromDate"].value,this.StatementOfExpenseForm.controls["ToDate"].value,this.EvenOdd);
     if(this.EvenOdd % 2 ==0)
     {
       this.pagecount -=1;
 
       this._PortfolioAppraisalsService.NextRecordBind(this.PortfolioAppraisalsForm.controls["UserId"].value,this.PortfolioAppraisalsForm.controls["FromDate"].value,this.PortfolioAppraisalsForm.controls["ToDate"].value,this.pagecount).
       subscribe((data) => {
       //this.statementOfExpenses_Default=data.Table;
      // this.StatementOfExpenseForm.controls['ToDate'].setValue(currentDate);
         if(data.Table.length!=0)
         {
           
           this.BindStatementOfExpReport(this.PortfolioAppraisalsForm.controls["UserId"].value,data.Table[0].AsOnDate,data.Table[0].AsOnDate,this.pagecount) ;
          // this.BindStatementOfExpReport(this.PortfolioAppraisalsForm.controls["UserId"].value,this.PortfolioAppraisalsForm.controls["FromDate"].value,this.PortfolioAppraisalsForm.controls["ToDate"].value,this.EvenOdd);
         }
         
       });
     }
     else
     {
       
      // if(this.PortfolioAppraisalsForm.controls['UserId'].value != 0){
      //   this.btnNext=false;
      //   this.btnPrev=true;
      //   }
        // else{
        //   this.btnPrev=true;

        // }
        this.isShowFutureData=false; 
        this.isShowSecurity=true;

       //this.BindStatementOfExpReport(this.PortfolioAppraisalsForm.controls["UserId"].value,this.PortfolioAppraisalsForm.controls["FromDate"].value,this.PortfolioAppraisalsForm.controls["ToDate"].value,this.EvenOdd-1);
     }




  
      
   }
   NextClick()
   {
     
    let item = JSON.parse(sessionStorage.getItem('User'));
    var Usertype=this.Dbsecurity.Decrypt(item.UserType);
     
     this.EvenOdd+=1;
     

     if(this.PortfolioAppraisalsForm.controls['UserId'].value == 0 && Usertype == 2){
      
      
      if(this.EvenOdd == (this.customerlength *2)){ 
        this.btnNext=false;
    
      }
      if(this.EvenOdd <(this.customerlength *2)){ 
        
        this.btnNext=true;
  
      }
    }





     if(this.PortfolioAppraisalsForm.controls['UserId'].value == 0 && Usertype == 3){
        
      // if(this.PageCount ==10){
        if(this.EvenOdd == (this.customerlength *2)){ 
          this.btnNext=false; 
  
        }
  
        if(this.EvenOdd <(this.customerlength *2)){ 
          this.btnNext=true;
    
        }
  
     }


     
     if(this.EvenOdd % 2 !=0)
     {
 
      this.pagecount +=1;
       this._PortfolioAppraisalsService.NextRecordBind(this.PortfolioAppraisalsForm.controls["UserId"].value,this.PortfolioAppraisalsForm.controls["FromDate"].value,this.PortfolioAppraisalsForm.controls["ToDate"].value,this.pagecount).
       subscribe((data) => {
       //this.statementOfExpenses_Default=data.Table;
      // this.StatementOfExpenseForm.controls['ToDate'].setValue(currentDate);
         if(data.Table.length!=0)
         {
           
          //  this.BindStatementOfExpReport(this.PortfolioAppraisalsForm.controls["UserId"].value,this.PortfolioAppraisalsForm.controls["FromDate"].value,this.PortfolioAppraisalsForm.controls["ToDate"].value,this.EvenOdd);
          this.BindStatementOfExpReport(this.PortfolioAppraisalsForm.controls["UserId"].value,this.PortfolioAppraisalsForm.controls["FromDate"].value,this.PortfolioAppraisalsForm.controls["ToDate"].value,this.pagecount);
        }
         
       });
     }
     else
     {
      if(this.PortfolioAppraisalsForm.controls['UserId'].value != 0){
        this.btnNext=false;
        this.btnPrev=true;
        }
        else{
          this.btnPrev=true;

        }
       this.isShowFutureData=true;
       this.isShowSecurity=false;
       //this.BindStatementOfExpReport(this.PortfolioAppraisalsForm.controls["UserId"].value,this.PortfolioAppraisalsForm.controls["FromDate"].value,this.PortfolioAppraisalsForm.controls["ToDate"].value,this.EvenOdd-1);
     }


    
  
    
  
     
     
   }
   PreviousDayFun(){
     var date = new Date();
     var currentDate = date.toISOString().slice(0,10);
    // this.PortfolioAppraisalsForm.controls['ToDate'].setValue(currentDate);
     date.setDate(date.getDate() - 1);
     var yesterday = date.toISOString().slice(0,10);
     this.PortfolioAppraisalsForm.controls['FromDate'].setValue(yesterday);
   }
   LastOneWeekFun(){
     var date = new Date();
     var currentDate = date.toISOString().slice(0,10);
    // this.PortfolioAppraisalsForm.controls['ToDate'].setValue(currentDate);
     date.setDate(date.getDate() - 7);
     var yesterday = date.toISOString().slice(0,10);
     this.PortfolioAppraisalsForm.controls['FromDate'].setValue(yesterday);
   }
   LastOneMonthFun(){
     var date = new Date();
     var currentDate = date.toISOString().slice(0,10);
    // this.PortfolioAppraisalsForm.controls['ToDate'].setValue(currentDate);
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
            this.customerlength=data.Table.length;
            
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
            this.customerlength = data.Table.length;

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
          if((data.Table.length !=0) && (data.Table1.length !=0) && (data.Table2.length !=0) )
          {
            
            this.IsShowRecord=true;
            this.IsShowNoRecord=false;
             currentContext.cashportfolio = data.Table2;
             currentContext.SumPortfolioappraisalModel = data.Table1;
            // currentContext.statementOfExpenses2 = data.Table2 secoundgrid
            currentContext.PortfolioappraisalModel = data.Table;
            currentContext.secoundgrid=data.Table3;
            console.log(data)
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
              this.isShowFutureData=true; 
              this.isShowSecurity=false;
            }
            
            // currentContext.statementOfExpenses2 = data.Table2;



      //       if(this.pagecount ==1){
      //         alert(this.pagecount)
      //       this.btnPrev=false;
      //  this.btnNext=true;
      //       }

      if(this.EvenOdd==1)
            {
              this.btnPrev=false;
              // this.btnNext=true;
            }
           
           else if(this.EvenOdd !=1)
            {
              this.btnPrev=true;
              // this.btnNext=true;
            }

        //     if(this.pagecount >1){
        //       this.btnPrev=true;
        //  this.btnNext=true;
        //       }

              let item = JSON.parse(sessionStorage.getItem('User'));
              var Usertype=this.Dbsecurity.Decrypt(item.UserType);
            //   if(this.PortfolioAppraisalsForm.controls['CustomerAccount'].value == 0 && Usertype == 3){
                 
            //    // if(this.PageCount ==10){
            //      if(this.EvenOdd == (this.customerlength *2)){ 
            //        this.btnNext=false; 
           
            //      }
           
            //      if(this.EvenOdd <(this.customerlength *2)){ 
            //        this.btnNext=true;
             
            //      }
           
            //   }
            // alert(this.PortfolioAppraisalsForm.controls['UserId'].value)
            // alert(Usertype)
             
          }
          else{
            this.IsShowRecord=false; 
            this.IsShowNoRecord=true;
            
          }
            
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
  
    // var data = document.getElementById('Statementdiv');  
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
    //     pdf.save('PortfolioAppraisals.pdf'); // Generated PDF   
    //   });    
    
  
  }

  }


