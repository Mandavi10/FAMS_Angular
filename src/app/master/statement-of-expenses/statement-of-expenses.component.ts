import { Component, OnInit } from '@angular/core';
import { StatementOfExpenses} from '../../../Models/StatementOfExpense/StatementOfExpenses';
import { StatementexpensesService } from 'src/app/Services/StatementOfExpenses/statementexpenses.service';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import{DbsecurityService}from 'src/app/Services/dbsecurity.service';

import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';  

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-statement-of-expenses',
  templateUrl: './statement-of-expenses.component.html',
  styleUrls: ['./statement-of-expenses.component.css']
})
export class StatementOfExpensesComponent implements OnInit {

  isShowLoader:boolean=false;


  HeaderArray : any =[];
  holdingReport:any=[];
  showModalstatemaster: boolean;
  StatementOfExpenseForm: FormGroup; 
  statementOfExpenses:StatementOfExpenses;
  statementOfExpenses1:StatementOfExpenses;
  statementOfExpenses2:StatementOfExpenses;
   
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
  CustomerAccount:string;
  userType:number;
 accountNumber:string;
  selectedRowId:number;
  pmsDetails:[];
  IsEquity:boolean;
  IsCashAndEquiv:boolean;
  ngOnInit(): void {
    this.StatementOfExpenseForm = this.formbulider.group({
      FromDate: ['', ],
      ToDate: ['',],
  });
    
  }

  

  BindStatementOfExpReport(FromDate,ToDate) {
    debugger;
    this.loading = true;
    var currentContext = this;
    this._statementexpensesService.BindGridAllFields(FromDate,ToDate).
        subscribe((data) => {
            currentContext.statementOfExpenses = data.Table;
            currentContext.statementOfExpenses1 = data.Table1;
            currentContext.statementOfExpenses2 = data.Table2
            
            // currentContext.statementOfExpenses2 = data.Table2;
            
        });
    // console.log(sessionStorage.getItem('ID'));
    this.loading = false;
  }
  onSubmit() {
    //alert('OnSubmi Clicked');
    //this.submitted = true;
    if (this.StatementOfExpenseForm.valid) {
        //this.sucess=true;
        const datat = this.StatementOfExpenseForm.value;
        // var CustomerAccount="Cust_000001";
        // var Date="2020-04-09";
       // var CustomerAccount:
       
        
        var FromDate=datat.FromDate;
        var ToDate=datat.ToDate;
        this.BindStatementOfExpReport(FromDate,ToDate);
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
    var csvData = this.ConvertToCSV(JSON.stringify(this.statementOfExpenses2));
    var a = document.createElement("a");
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    var blob = new Blob([csvData], { type: 'text/csv' });
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = 'StatementOfExpenses.csv';/* your file name*/
  
    a.click();
    return 'success';
}
downloadPDFFile(){
   
  debugger;  
  var doc = new jsPDF();  
 
  doc.setFontSize(11);
  doc.setTextColor(100);


  (doc as any).autoTable({
    head: this.head,
    body: this.statementOfExpenses2,
    theme: 'plain',
    didDrawCell: data => {
      console.log(data.column.index)
    }
  })
      // Open PDF document in new tab
    doc.output('dataurlnewwindow')
  
    // Download PDF document  
    doc.save('StatementOfExpenses.pdf');

}
}
