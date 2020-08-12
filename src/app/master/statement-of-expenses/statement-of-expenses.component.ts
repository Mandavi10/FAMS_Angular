import { Component, OnInit } from '@angular/core';
import { StatementOfExpenses,StatementOfExpenses1,StatementOfExpenses2,StatementOfExpenses3
  ,StatementOfExpenses4,StatementOfExpenses_Default,StatementOfExpenses5,Bindemployee} from '../../../Models/StatementOfExpense/StatementOfExpenses';
import { Customer} from '../../../Models/HoldingReport/holdingReport';
import { StatementexpensesService } from 'src/app/Services/StatementOfExpenses/statementexpenses.service';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import{DbsecurityService}from 'src/app/Services/dbsecurity.service';

import { timer } from 'rxjs';

import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

//import html2canvas from 'html2canvas'; 
import { Router, ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-statement-of-expenses',
  templateUrl: './statement-of-expenses.component.html',
  styleUrls: ['./statement-of-expenses.component.css']
})
export class StatementOfExpensesComponent implements OnInit {
 
  btnPrev:boolean=true;
  btnNext:boolean=true;
  IsShowRecord:boolean;
  IsShowNoRecord:boolean;

  isShowsEmployee:boolean=false;
  isShowstatementOfExpenses4:boolean=false;
  isShowstatementOfExpenses5:boolean=false;
  EvenOdd:number=1;

  //isShowLoader:boolean=false;
  isShowLoader:boolean;
  HeaderArray : any =[];
  holdingReport:any=[];
  showModalstatemaster: boolean;
  StatementOfExpenseForm: FormGroup; 
  statementOfExpenses:StatementOfExpenses;
  statementOfExpenses1:StatementOfExpenses1;
  statementOfExpenses2:StatementOfExpenses2;
  statementOfExpenses3:StatementOfExpenses3;
  statementOfExpenses4:StatementOfExpenses4;
  statementOfExpenses_Default:StatementOfExpenses_Default;
  statementOfExpenses5:StatementOfExpenses5;
  BindemployeesList:Bindemployee;
   
   gridAllFields5: any []; 
   head = []
   buttonDisabledReset: boolean = false; /*buttonDisabledDelete: boolean = true;*/ submitted = false; sucess = false; Show = true;
  Temp: number = 1; CustodianId: number = 0; loading: boolean = false;
  message: string;
  setClickedRow: Function;
  Isdiv1:boolean;
  Isdiv:boolean;

 
  constructor(private router: Router,private formbulider: FormBuilder, private _statementexpensesService: StatementexpensesService,private Dbsecurity: DbsecurityService) {

    //  this.custodian = new Custodian();
     
  }
  CurrentDate = new Date();
  isShowCustomer:boolean=false;
  customer:Customer ;
  CustomerAccount:string;
  userType:number;
 accountNumber:string;
  selectedRowId:number;
  pmsDetails:[];
  IsEquity:boolean;
  IsCashAndEquiv:boolean;
  GAccountNumber:any;
  GUserId:number;
 
  ngOnInit(): void {
    this.StatementOfExpenseForm = this.formbulider.group({
      EmployeeId: [0, ],
      UserId: [0, ],
      FromDate: ['', ],
      ToDate: ['',],
  });
  
 
  
debugger;
  let item = JSON.parse(sessionStorage.getItem('User'));
  // this.UserId = item.UserId;
  // this.EntityId = item.ReferenceId;
  // alert(item.UserId);
  //   console.log(item.UserId);
    this.userType=this.Dbsecurity.Decrypt(item.UserType);

   
   // let ActivityId=this.Dbsecurity.Decrypt(this.router1.snapshot.queryParamMap.get('ActivityId').replace(/ /g, '+'));
    //this.accountNumber=this.Dbsecurity.Decrypt( item.AccountNo);
    this.accountNumber=item.AccountNo;
    // alert(item.UserId.replace('+',/ /g));
    // console.log(item.UserId.replace('+',/ /g));

    //this.accountNumber=this.Dbsecurity.Decrypt( item.AccountNo);

    debugger;
    if(this.userType ==1)
    {
      this.GUserId=item.UserId.replace('+',' ');
      this.GAccountNumber=this.accountNumber;   
    }

   else if(this.userType ==3)
    {
      this.GUserId=item.UserId.replace('+',' ');
      this.GAccountNumber="0";
      this.StatementOfExpenseForm.controls["UserId"].setValue(0);
      this.isShowCustomer=true;
      this.BindEmployee();
      //this.BindCustomer();
     
    }
    else if(this.userType ==2)
    {
     // this.isShowCustomer=true;
     this.GUserId=item.UserId.replace('+',' ');;
     this.GAccountNumber="1";
      this.BindCustomer();
    }
    else{
      this.GUserId=item.UserId.replace('+',' ');;
      this.GAccountNumber="0";
      this.isShowCustomer=false;
      this.isShowsEmployee=false;
    }
    debugger;
     if (this.StatementOfExpenseForm.controls["UserId"].value==0 && this.StatementOfExpenseForm.controls["FromDate"].value==""  && this.StatementOfExpenseForm.controls["ToDate"].value=="") 
    {
      this.BindDefaultLast(this.GAccountNumber,this.GUserId)
    }

    
    
  }
  BindDefaultLast(GAccountNumber,UserId)
  {
    debugger;
    this._statementexpensesService.BindDefaultData(GAccountNumber,UserId).
    subscribe((data) => {
      //this.statementOfExpenses_Default=data.Table;
     // this.StatementOfExpenseForm.controls['ToDate'].setValue(currentDate);
     if(this.userType==3)
     {
      if(data.Table[0].CustomerAccount=="6010001" || data.Table[0].CustomerAccount=="6010002"||data.Table[0].CustomerAccount=="6010003" || data.Table[0].CustomerAccount=="6010004"||data.Table[0].CustomerAccount=="6010005")
      {
       this.StatementOfExpenseForm.controls["UserId"].setValue(0);
      }
      else{
       this.StatementOfExpenseForm.controls["UserId"].setValue(data.Table[0].CustomerAccount);
      }

     }
     else
     {
      this.StatementOfExpenseForm.controls["UserId"].setValue(data.Table[0].CustomerAccount);
     }
    
     //this.StatementOfExpenseForm.controls["UserId"].setValue(data.Table[0].CustomerAccount);

      this.StatementOfExpenseForm.controls["FromDate"].setValue(data.Table[0].FromDate);
      this.StatementOfExpenseForm.controls["ToDate"].setValue(data.Table[0].ToDate);
    this.BindStatementOfExpReport(data.Table[0].CustomerAccount,data.Table[0].FromDate,data.Table[0].ToDate,this.EvenOdd) ;
    });
    
  }
  PreviousClick()
  {
    this.EvenOdd-=1;
    //this.BindStatementOfExpReport(this.StatementOfExpenseForm.controls["UserId"].value,this.StatementOfExpenseForm.controls["FromDate"].value,this.StatementOfExpenseForm.controls["ToDate"].value,this.EvenOdd);
    if(this.EvenOdd % 2 !=0)
    {

      this._statementexpensesService.NextRecordBind(this.StatementOfExpenseForm.controls["UserId"].value,this.StatementOfExpenseForm.controls["FromDate"].value,this.StatementOfExpenseForm.controls["ToDate"].value,this.EvenOdd).
      subscribe((data) => {
      //this.statementOfExpenses_Default=data.Table;
     // this.StatementOfExpenseForm.controls['ToDate'].setValue(currentDate);
        if(data.Table.length!=0)
        {
          // this.StatementOfExpenseForm.controls["UserId"].setValue(data.Table[0].CustomerAccount);
          // this.StatementOfExpenseForm.controls["FromDate"].setValue(data.Table[0].FromDate);
          // this.StatementOfExpenseForm.controls["ToDate"].setValue(data.Table[0].ToDate);
          // this.BindStatementOfExpReport(data.Table[0].CustomerAccount,data.Table[0].FromDate,data.Table[0].ToDate,this.EvenOdd) ;
          this.BindStatementOfExpReport(this.StatementOfExpenseForm.controls["UserId"].value,this.StatementOfExpenseForm.controls["FromDate"].value,this.StatementOfExpenseForm.controls["ToDate"].value,this.EvenOdd);
        }
        
      });
    }
    else
    {
      this.BindStatementOfExpReport(this.StatementOfExpenseForm.controls["UserId"].value,this.StatementOfExpenseForm.controls["FromDate"].value,this.StatementOfExpenseForm.controls["ToDate"].value,this.EvenOdd-1);
    }
    
  }
  NextClick()
  {
    debugger;
    this.EvenOdd+=1;
    if(this.EvenOdd % 2 !=0)
    {
// console.log(this.StatementOfExpenseForm.controls["UserId"].value)
// console.log(this.StatementOfExpenseForm.controls["UserId"].value)
// console.log(this.StatementOfExpenseForm.controls["UserId"].value)
// console.log(this.StatementOfExpenseForm.controls["UserId"].value)
      this._statementexpensesService.NextRecordBind(this.StatementOfExpenseForm.controls["UserId"].value,this.StatementOfExpenseForm.controls["FromDate"].value,this.StatementOfExpenseForm.controls["ToDate"].value,this.EvenOdd).
      subscribe((data) => {
      //this.statementOfExpenses_Default=data.Table;
     // this.StatementOfExpenseForm.controls['ToDate'].setValue(currentDate);
        if(data.Table.length!=0)
        {
          // this.StatementOfExpenseForm.controls["UserId"].setValue(data.Table[0].CustomerAccount);
          // this.StatementOfExpenseForm.controls["FromDate"].setValue(data.Table[0].FromDate);
          // this.StatementOfExpenseForm.controls["ToDate"].setValue(data.Table[0].ToDate);
          // this.BindStatementOfExpReport(data.Table[0].CustomerAccount,data.Table[0].FromDate,data.Table[0].ToDate,this.EvenOdd) ;
          this.BindStatementOfExpReport(this.StatementOfExpenseForm.controls["UserId"].value,this.StatementOfExpenseForm.controls["FromDate"].value,this.StatementOfExpenseForm.controls["ToDate"].value,this.EvenOdd);
        }
        
      });
    }
    else
    {
      this.BindStatementOfExpReport(this.StatementOfExpenseForm.controls["UserId"].value,this.StatementOfExpenseForm.controls["FromDate"].value,this.StatementOfExpenseForm.controls["ToDate"].value,this.EvenOdd-1);
    }
    
    
  }
  PreviousDayFun(){
    var date = new Date();
    var currentDate = date.toISOString().slice(0,10);
    this.StatementOfExpenseForm.controls['ToDate'].setValue(currentDate);
    date.setDate(date.getDate() - 1);
    var yesterday = date.toISOString().slice(0,10);
    this.StatementOfExpenseForm.controls['FromDate'].setValue(yesterday);
  }
  LastOneWeekFun(){
    var date = new Date();
    var currentDate = date.toISOString().slice(0,10);
    this.StatementOfExpenseForm.controls['ToDate'].setValue(currentDate);
    date.setDate(date.getDate() - 7);
    var yesterday = date.toISOString().slice(0,10);
    this.StatementOfExpenseForm.controls['FromDate'].setValue(yesterday);
  }
  LastOneMonthFun(){
    var date = new Date();
    var currentDate = date.toISOString().slice(0,10);
    this.StatementOfExpenseForm.controls['ToDate'].setValue(currentDate);
    date.setDate(date.getDate() - 30);
    var yesterday = date.toISOString().slice(0,10);
    this.StatementOfExpenseForm.controls['FromDate'].setValue(yesterday);
  }
  BindEmployee(){
   // this.loader1=true;this.loader2=true;
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
   // let  Data = new Commonfields();
    //Data.UserId = Sessionvalue.UserId;
    this._statementexpensesService.BindEmployee(Sessionvalue.UserId.replace('+',' ')).subscribe(
      (data) => {
        debugger;
           this.BindemployeesList = data.Table;
           this.isShowsEmployee=true;
          // this.loader1=false;this.loader2=false;
      });
  }
  // BindCustomersOnChange(EmployeeId){
  //   this.loader1=true;this.loader2=true;
  //   let  Data = new Commonfields();
  //   Data.UserId = EmployeeId ;
  //   this.BSService.BindCustomers(JSON.stringify(Data)).subscribe(
  //     (data) => {
  //          this.BindcustomerallfieldsList = data.Table;
  //          this.loader1=false;this.loader2=false;
  //     });

  // }
  BindCustomerOnChange(EmployeeId) {
    this.EvenOdd=1;
    this.loading = true;
    var currentContext = this;
    this._statementexpensesService.BindCustomer(EmployeeId).
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
    this._statementexpensesService.BindCustomer(this.Dbsecurity.Decrypt(Sessionvalue.UserId.replace('+',' '))).
        subscribe((data) => {
            currentContext.customer = data.Table;
            this.isShowCustomer=true;
        });
    // console.log(sessionStorage.getItem('ID'));
    this.loading = false;
  }

  BindStatementOfExpReport(CustomerAccount,FromDate,ToDate,SeqNo) {
    debugger;
   // this.loading = true;
    this.isShowLoader=true;
    var currentContext = this;
    // timer(4000).subscribe(x => {
      this._statementexpensesService.BindGridAllFields(CustomerAccount,FromDate,ToDate,SeqNo).
        subscribe((data) => {

      if((data.Table.length !=0) && (data.Table1.length !=0) && (data.Table2.length !=0) )
      {
        
      

        this.IsShowRecord=true;
        this.IsShowNoRecord=false;
            // currentContext.statementOfExpenses = data.Table2;
            // currentContext.statementOfExpenses1 = data.Table1;
            // currentContext.statementOfExpenses2 = data.Table2
            currentContext.statementOfExpenses3 = data.Table;
            if(this.EvenOdd % 2 !=0)
            {
              this.isShowstatementOfExpenses4=true;
              this.isShowstatementOfExpenses5=false;
              currentContext.statementOfExpenses4 = data.Table1;
            }
            else
            {
              this.isShowstatementOfExpenses4=false;
              this.isShowstatementOfExpenses5=true;
              currentContext.statementOfExpenses5 = data.Table2;
            }
            
            // currentContext.statementOfExpenses2 = data.Table2;
            this.isShowLoader=false;
            debugger;
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
          }
          else{
            this.isShowLoader=false;
          this.IsShowRecord=false;
          this.IsShowNoRecord=true;
          this.btnPrev=true;
          }
        });
        
      // });
    // console.log(sessionStorage.getItem('ID'));
    //this.loading = false;
     
  }
  onSubmit() {
    this.EvenOdd=1;
    debugger;
    //alert('OnSubmi Clicked');
    //this.submitted = true;
    if (this.StatementOfExpenseForm.valid) {
        //this.sucess=true;
        const datat = this.StatementOfExpenseForm.value;

       
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
  
  // downloadPDFFile(){
   
  //   debugger;  
  //   var doc = new jsPDF();  
   
  //   doc.setFontSize(11);
  //   doc.setTextColor(100);
  
  
  //   (doc as any).autoTable({
  //     head: this.head,
  //     body: this.gridAllFields5,
  //     theme: 'plain',
  //     didDrawCell: data => {
  //       console.log(data.column.index)
  //     }
  //   })
  
  //   // Open PDF document in new tab
  //   doc.output('dataurlnewwindow')
  
  //   // Download PDF document  
  //   doc.save('Holding_Report.pdf');

  //   var data = document.getElementById('bankmastertable');  
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
  //     pdf.save('MYPdf.pdf'); // Generated PDF   
  //   });  


    
  
  //   // var base64 = btoa(
  //   //   new Uint8Array(this.rowData)
  //   //     .reduce((data, byte) => data + String.fromCharCode(byte), '')
  //   // );
  //   // const linkSource = 'data:application/pdf;base64,' + base64;
  //   // const downloadLink = document.createElement("a");
  //   // downloadLink.href = linkSource;
  //   // downloadLink.download = "a.pdf";
  //   // downloadLink.click()
  // //  var jsPDF: any;
  // //   var doc = new jsPDF();
  // //   var col = ["Id", "TypeID","Accnt","Amnt","Start","End","Contrapartida"];
  // //   var rows = [];
  
  // // var rowCountModNew = [
  // // ["1721079361", "0001", "2100074911", "200", "22112017", "23112017", "51696"],
  // // ["1721079362", "0002", "2100074912", "300", "22112017", "23112017", "51691"],
  // // ["1721079363", "0003", "2100074913", "400", "22112017", "23112017", "51692"],
  // // ["1721079364", "0004", "2100074914", "500", "22112017", "23112017", "51693"]
  // // ]
  
  
  // // rowCountModNew.forEach(element => {
  // //     rows.push(element);
  
  // //   });
  
  
  // //   doc.autoTable(col, rows);
  // //   doc.save('Test.pdf');
  
    
  // }
  ConvertToCSV(objArray) {
    
      this.HeaderArray = {
        PMSEmpId: "Sr.No.", EmployeeCode: "Employee Code", EmployeeName: "Employee Name", Gender: "Gender",
        Qualification: "Qualification", About: "About"}
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    var row = "";

    for (var index in objArray[0]) {
        //Now convert each value to string and comma-separated
        row += index + ',';
    }
    row = row.slice(0, -1);
    //append Label row with line break
   // str += row + '\r\n';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }
        str += line + '\r\n';
    }
    return str;
}
downloadCSVFile() {
  debugger;
  var csvData;
    if(this.EvenOdd % 2 !=0)
    {
      csvData = this.ConvertToCSV(JSON.stringify(this.statementOfExpenses4));
      a.download = 'StatementOfExpenses.csv';/* your file name*/
    }
    else
    {
      csvData = this.ConvertToCSV(JSON.stringify(this.statementOfExpenses5));
      a.download = 'StatementOfExpenses_Summary.csv';/* your file name*/
    }
    var a = document.createElement("a");
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    var blob = new Blob([csvData], { type: 'text/csv' });
    var url = window.URL.createObjectURL(blob);
    a.href = url;
   
  
    a.click();
    return 'success';
}
downloadPDFFile(){
   
  debugger;  
  // var doc = new jsPDF();  
 
  // doc.setFontSize(11);
  // doc.setTextColor(100);

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


  // var data = document.getElementById('bankmastertable');  
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
  //     pdf.save('StatementOfExpenses.pdf'); // Generated PDF   
  //   });    

  

}
}
