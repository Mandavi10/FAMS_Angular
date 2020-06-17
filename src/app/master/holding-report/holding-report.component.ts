import { Component, OnInit } from '@angular/core';
import { Customer,GridAllFields, GridAllFields1,GridAllFields2,GridAllFields3,GridAllFields4} from '../../../Models/HoldingReport/holdingReport';
import { HoldingReportService } from 'src/app/Services/HoldingReport/holding-report.service';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import{DbsecurityService}from 'src/app/Services/dbsecurity.service';

// import * as jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import html2canvas from 'html2canvas';  

import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-holding-report',
  templateUrl: './holding-report.component.html',
  styleUrls: ['./holding-report.component.css']
})
export class HoldingReportComponent implements OnInit {
  isShowLoader:boolean=false;


  HeaderArray : any =[];
  holdingReport:any=[];
  showModalstatemaster: boolean;
  HoldingReportFormGrp: FormGroup; customer:Customer ;
   gridAllFields: GridAllFields; 
   gridAllFields1: GridAllFields1; 
   gridAllFields2: GridAllFields2; 
   gridAllFields3: GridAllFields3; 
   gridAllFields4: GridAllFields4; 
   gridAllFields5: any []; 
   head = []
   buttonDisabledReset: boolean = false; /*buttonDisabledDelete: boolean = true;*/ submitted = false; sucess = false; Show = true;
  Temp: number = 1; CustodianId: number = 0; loading: boolean = false;
  message: string;
  setClickedRow: Function;
  Isdiv1:boolean;
  Isdiv:boolean;
 
  constructor(private router: Router,private formbulider: FormBuilder, private _holdingReportService: HoldingReportService,private Dbsecurity: DbsecurityService) {

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
    this.HoldingReportFormGrp = this.formbulider.group({
      UserId: [0, ],
      Date: ['',],
  });
    let item = JSON.parse(sessionStorage.getItem('User'));
  // this.UserId = item.UserId;
  // this.EntityId = item.ReferenceId;
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
    
  }

  BindCustomer() {
    this.loading = true;
    var currentContext = this;
    this._holdingReportService.BindCustomer().
        subscribe((data) => {
            currentContext.customer = data.Table;
        });
    // console.log(sessionStorage.getItem('ID'));
    this.loading = false;
  }

  BindHoldingReport(CustomerAccount,Date) {
    debugger;
    this.loading = true;
    var currentContext = this;
    this._holdingReportService.BindGridAllFields(CustomerAccount,Date).
        subscribe((data) => {
            currentContext.gridAllFields = data.Table;
            currentContext.gridAllFields1 = data.Table1;
            currentContext.gridAllFields2 = data.Table2;
            currentContext.gridAllFields3 = data.Table3;
            currentContext.gridAllFields4 = data.Table4;   
            currentContext.gridAllFields5 = data.Table5;    
              
            if(data.Table.length>0)      
            {
              this.IsEquity=true;
            }
            else
            {
              this.IsEquity=false;
            }
            if(data.Table2.length>0)      
            {
              this.IsCashAndEquiv=true;
            }
            else
            {
              this.IsCashAndEquiv=false;
            }
        });
    // console.log(sessionStorage.getItem('ID'));
    this.loading = false;
  }
  onSubmit() {
    //alert('OnSubmi Clicked');
    //this.submitted = true;
    if (this.HoldingReportFormGrp.valid) {
        //this.sucess=true;
        const datat = this.HoldingReportFormGrp.value;
        // var CustomerAccount="Cust_000001";
        // var Date="2020-04-09";
       // var CustomerAccount:
        if(datat.UserId=="0")
        {
         this.CustomerAccount=this.accountNumber
        }
        else{
         this.CustomerAccount=datat.UserId;

        }
        
        var Date=datat.Date;
        this.BindHoldingReport(this.CustomerAccount,Date);
    } 
  }
  downloadPDFFile(){
   
    debugger;  
    // var doc = new jsPDF();  
   
    // doc.setFontSize(11);
    // doc.setTextColor(100);
  
  
    // (doc as any).autoTable({
    //   head: this.head,
    //   body: this.gridAllFields5,
    //   theme: 'plain',
    //   didDrawCell: data => {
    //     console.log(data.column.index)
    //   }
    // })
  
    // // Open PDF document in new tab
    // doc.output('dataurlnewwindow')
  
    // // Download PDF document  
    // doc.save('Holding_Report.pdf');

    // var data = document.getElementById('bankmastertable');  
    // html2canvas(data).then(canvas => {  
    //   // Few necessary setting options  
    //   var imgWidth = 208;   
    //   var pageHeight = 295;    
    //   var imgHeight = canvas.height * imgWidth / canvas.width;  
    //   var heightLeft = imgHeight;  
  
    //   const contentDataURL = canvas.toDataURL('image/png')  
    //   let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
    //   var position = 0;  
    //   pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
    //   pdf.save('MYPdf.pdf'); // Generated PDF   
    // });  


    
  
    // var base64 = btoa(
    //   new Uint8Array(this.rowData)
    //     .reduce((data, byte) => data + String.fromCharCode(byte), '')
    // );
    // const linkSource = 'data:application/pdf;base64,' + base64;
    // const downloadLink = document.createElement("a");
    // downloadLink.href = linkSource;
    // downloadLink.download = "a.pdf";
    // downloadLink.click()
  //  var jsPDF: any;
  //   var doc = new jsPDF();
  //   var col = ["Id", "TypeID","Accnt","Amnt","Start","End","Contrapartida"];
  //   var rows = [];
  
  // var rowCountModNew = [
  // ["1721079361", "0001", "2100074911", "200", "22112017", "23112017", "51696"],
  // ["1721079362", "0002", "2100074912", "300", "22112017", "23112017", "51691"],
  // ["1721079363", "0003", "2100074913", "400", "22112017", "23112017", "51692"],
  // ["1721079364", "0004", "2100074914", "500", "22112017", "23112017", "51693"]
  // ]
  
  
  // rowCountModNew.forEach(element => {
  //     rows.push(element);
  
  //   });
  
  
  //   doc.autoTable(col, rows);
  //   doc.save('Test.pdf');
  
    
  }
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
    var csvData = this.ConvertToCSV(JSON.stringify(this.gridAllFields5));
    var a = document.createElement("a");
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    var blob = new Blob([csvData], { type: 'text/csv' });
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = 'Portfolio_Report.csv';/* your file name*/
  
    a.click();
    return 'success';
}

}
