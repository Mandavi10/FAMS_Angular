import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import{DbsecurityService}from 'src/app/Services/dbsecurity.service';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PortfolioAppraisalsService } from 'src/app/Services/PortfolioAppraisals/portfolio-appraisals.service';
import { PortfolioAppraisals,gridView,Bindemployee,SumPortfolioappraisalModel,Sumcashportfolio,cashportfolio,PortfolioappraisalModel,HeaderData} from '../../../Models/PortfolioAppraisals/portfolio-appraisals';
import { Customer} from '../../../Models/HoldingReport/holdingReport';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-portfolio-appraisals-view',
  templateUrl: './portfolio-appraisals-view.component.html',
  styleUrls: ['./portfolio-appraisals-view.component.css']
})
export class PortfolioAppraisalsViewComponent implements OnInit {

  EvenOdd:number=1;

  gridView1:gridView
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
  columnDefs = [
    // {headerName: 'Sr. No.', field: 'SrNo', width:'80'},
    {headerName: 'Sr. No.', field: 'srNo', width: 80,cellRenderer : function (params) {
      return params.rowIndex + 1;
    }},
    {headerName: 'As On Date', field: 'AsOnDate', width:'150'},
    // {headerName: 'To Date', field: 'todate', width:'150'},
    {headerName: 'Customer Account', field: 'CustomerAccountNo', width:'150'},
    {headerName: 'Scheme', field: 'scheme', width:'150'},

    {headerName: 'Download', field: 'DownloadLink', width:'100',cellClass:'text-center', cellRenderer: function clickNextRendererFunc(params){
      // return '    <i class="fa fa-file-excel-o" aria-hidden="true" title="Download"></i>';
      return ' <a target="_blank"  href="'+ params.data.DownloadLink  + '"> Download</a> ';

    }},
    {headerName: 'Data View Mode', field: 'viewmode', width:'150', cellClass:'text-center',cellRenderer: function clickNextRendererFunc(params){
      // return '<button type="button href="/PortfolioAppraisals?EmployeeId='  + this.PortfolioAppraisalsForm.controls["EmployeeId"].value  + '&UserId='+ this.PortfolioAppraisalsForm.controls["UserId"].value   + '&FromDate='+ this.PortfolioAppraisalsForm.controls["FromDate"].value  + '" class="btn btn-success">View</button>';
      // return '<a href="/PortfolioAppraisals?EmployeeId='  + this.PortfolioAppraisalsForm.controls["EmployeeId"].value  + '&UserId='+ this.PortfolioAppraisalsForm.controls["UserId"].value   + '&FromDate='+ this.PortfolioAppraisalsForm.controls["FromDate"].value  + '">' + params.value + '</a>';
      // return '<button type="button" class="btn btn-success">View</button>';
      return '<a href="/PortfolioAppraisals?CustomerAccountNo='  + params.data.CustomerAccountNo + '&AsOnDate='+ params.data.AsOnDate  + '">View</a>';
    }},

  
    
];

rowData = [
    {  SrNo: '1', fromdate:'14/07/2020', todate:'20/07/2020',  customeraccount: '47481000024748', scheme: '', download:'',  viewmode: ''},
    {  SrNo: '2', fromdate:'14/07/2020', todate:'20/07/2020',  customeraccount: '47481000024748', scheme: '', download:'',  viewmode: ''},
    {  SrNo: '3', fromdate:'14/07/2020', todate:'20/07/2020',  customeraccount: '47481000024748', scheme: '', download:'',  viewmode: ''},

   
];
constructor(private router: Router,private _PortfolioAppraisalsService:PortfolioAppraisalsService,private formbulider: FormBuilder, private Dbsecurity: DbsecurityService) { }

  ngOnInit(): void {
    this.PortfolioAppraisalsForm = this.formbulider.group({
      EmployeeId: [0, ],
      UserId: [0, ],
      FromDate: ['', ],
      ToDate: ['',],
  });
//alert(this.PortfolioAppraisalsForm.controls["EmployeeId"].value)

  let item = JSON.parse(sessionStorage.getItem('User'));
  // this.UserId = item.UserId;
  // this.EntityId = item.ReferenceId;
    this.userType=this.Dbsecurity.Decrypt(item.UserType);
    // this.accountNumber=this.Dbsecurity.Decrypt( item.AccountNo);
    this.accountNumber=( item.AccountNo);
    
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
    if ((this.userType ==2 || this.userType ==3)&&this.PortfolioAppraisalsForm.controls["UserId"].value==0 && this.PortfolioAppraisalsForm.controls["FromDate"].value==""  && this.PortfolioAppraisalsForm.controls["ToDate"].value=="") 
   {
    // this.BindDefaultLast(this.GAccountNumber,this.GUserId)
    this.BindStatementOfExpReport(this.PortfolioAppraisalsForm.controls["UserId"].value,this.PortfolioAppraisalsForm.controls["FromDate"].value=="",this.PortfolioAppraisalsForm.controls["FromDate"].value=="",this.EvenOdd) ;
   }
   else
   {
      this.BindDefaultLast(this.GAccountNumber,this.GUserId)
   }
  }

  BindDefaultLast(GAccountNumber,UserId)
  {
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

  onSubmit() {
    this.EvenOdd=1;
    
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

  BindStatementOfExpReport(CustomerAccount,FromDate,ToDate,SeqNo) {
    
    this.loading = true;
    this.isShowLoader=true;
    var currentContext = this;
    

    var jason={
      "CustomerAccountno":CustomerAccount,
      
      "Fromdate":FromDate,
      "pagecount":SeqNo
    }
    this._PortfolioAppraisalsService.BindGridAllFieldsView(jason).
        subscribe((data) => {
        //  if((data.Table.length !=0) && (data.Table1.length !=0) && (data.Table2.length !=0) )
          {
            
            this.IsShowRecord=true;
            this.IsShowNoRecord=false;
            //  currentContext.cashportfolio = data.Table2;
            //  currentContext.SumPortfolioappraisalModel = data.Table1;
            
            currentContext.PortfolioappraisalModel = data.Table;
            this.gridView1=data.Table;
            console.log('view portfolio')
            console.log(this.gridView1)
            // currentContext.secoundgrid=data.Table3;
            // console.log(data)
            // currentContext.HeaderData=data.Table4;
            // this.isShowSecurity=true;
            // if(this.EvenOdd % 2 !=0)
            // {
              
            // }
            // else
            // {
             
            //   this.isShowFutureData=true; 
            //   this.isShowSecurity=false;
            // }
            


      // if(this.EvenOdd==1)
      //       {
      //         this.btnPrev=false;
             
      //       }
           
      //      else if(this.EvenOdd !=1)
      //       {
      //         this.btnPrev=true;
              
      //       }

      
      //         let item = JSON.parse(sessionStorage.getItem('User'));
      //         var Usertype=this.Dbsecurity.Decrypt(item.UserType);
         
             
          }
          // else{
          //   this.IsShowRecord=false; 
          //   this.IsShowNoRecord=true;
            
          // }
            
        });
    

    this.loading = false;
    this.isShowLoader=false;
  }

}
