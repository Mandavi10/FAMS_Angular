import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SummaryreportService } from '../../Services/SummaryReport/summaryreport.service';
import {Allgridfields} from '../../../Models/SummaryReport/allgridfields';
import {Bindcustomerallfields} from '../../../Models/SummaryReport/Bindcustomerallfields';
import { DatePipe } from '@angular/common';
import{DbsecurityService}from '../../Services/dbsecurity.service';

@Component({
  selector: 'app-summary-report',
  templateUrl: './summary-report.component.html',
  styleUrls: ['./summary-report.component.css']
})
export class SummaryReportComponent implements OnInit {
  CustNameDive : boolean = false; SummaryReportForm : FormGroup; AllgridfieldsList : Allgridfields;
  ClosingMarketValue : any; BindcustomerallfieldsList : Bindcustomerallfields; currentdate : any; AccountNo: any;
  Fromdate : any; Todate : any;
  columnDefs = [
    {headerName: '', field: 'heading', width:'300'},
    {headerName: '', field: 'value', width:'150'}
];

rowData = [
    {heading: 'Market Value as of ', value: this.ClosingMarketValue },
    {heading: 'Opening NAV as of ', value: ''},
    {heading: 'Opening Outstanding Units as of ', value: ''},
    {heading: 'Capital In(+)/Out(-)', value: ''},
    {heading: 'Realized Gain', value: ''},
    {heading: 'Unrealized Gain', value: ''},
    {heading: 'Gain Prior to Take-over', value: ''},
    {heading: 'Income', value: ''},
    {heading: 'Fees', value: ''},
    {heading: 'Expenses', value: ''},
    {heading: 'Accrued Income', value: ''},
    {heading: 'Market Value as of ', value: ''},
    {heading: 'Closing NAV as of ', value: ''},
    {heading: 'Closing Outstanding Units as of ', value: ''},
];

  constructor(private Dbsecurity: DbsecurityService,private SRService : SummaryreportService, private formBuilder: FormBuilder,public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.currentdate = new Date();
    this.SummaryReportForm = this.formBuilder.group({  
      CustomerAccount : [''], Fromdate :[''], Todate : ['']
  });
  let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
  this.AccountNo =  this.Dbsecurity.Decrypt(Sessionvalue.AccountNo);
  if(this.AccountNo == "Cust_000134"){
    this.CustNameDive = true;
  }
  this.BindCustomers();
  }
  BindGrid(Fromdate,Todate){
    const FormData = this.SummaryReportForm.value;
    this.SRService.BindGrid(FormData).subscribe(
      (data) => {
        this.AllgridfieldsList = data.Table; 
        this.Fromdate = Fromdate;
        this.Todate = Todate;
       this.Fromdate = this.datepipe.transform(this.Fromdate, 'dd-MM-yyyy');
       this.Todate = this.datepipe.transform(this.Todate, 'dd-MM-yyyy');
       this.rowData = [
        {heading: 'Market Value as of ' + this.Fromdate, value: data.Table[0].OpeningMarketValue },
        {heading: 'Opening NAV as of '+ this.Fromdate, value: data.Table[0].OpeningNAV},
        {heading: 'Opening Outstanding Units as of ' +this.Fromdate, value: data.Table[0].OpeningOutstandingUnits},
        {heading: 'Capital In(+)/Out(-)', value: data.Table[0].CapitalInOut},
        {heading: 'Realized Gain', value: data.Table[0].RealizedGain},
        {heading: 'Unrealized Gain', value: data.Table[0].UnrealizedGain},
        {heading: 'Gain Prior to Take-over', value: data.Table[0].GainPrior},
        {heading: 'Income', value: data.Table[0].Income},
        {heading: 'Fees', value: data.Table[0].Fees},
        {heading: 'Expenses', value: data.Table[0].Expenses},
        {heading: 'Accrued Income', value: data.Table[0].AccruedIncome},
        {heading: 'Market Value as of '+  this.Todate, value: data.Table[0].ClosingMarketValue},
        {heading: 'Closing NAV as of '+  this.Todate, value: data.Table[0].ClosingNAV},
        {heading: 'Closing Outstanding Units as of '+ this.Todate, value: data.Table[0].ClosingOutstanding},
    ];
        });   
  }     
  BindCustomers(){
    this.SRService.BindCustomers().subscribe(
      (data) => {
           this.BindcustomerallfieldsList = data.Table;
      });
  }
  ConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    var row = "";

    for (var index in objArray[0]) {
        //Now convert each value to string and comma-separated
        row += index + ',';
    }
    row = row.slice(0, -1);
    //append Label row with line break
    str += row + '\r\n';

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
    var csvData = this.ConvertToCSV(JSON.stringify(this.rowData));
    var a = document.createElement("a");
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    var blob = new Blob([csvData], { type: 'text/csv' });
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = 'User_Results.csv';/* your file name*/
    a.click();
    return 'success';
}
PreviousDayFun(){
  var date = new Date();
  var currentDate = date.toISOString().slice(0,10);
  this.SummaryReportForm.controls['Todate'].setValue(currentDate);
  date.setDate(date.getDate() - 1);
  var yesterday = date.toISOString().slice(0,10);
  this.SummaryReportForm.controls['Fromdate'].setValue(yesterday);
}
LastOneWeekFun(){
  var date = new Date();
  var currentDate = date.toISOString().slice(0,10);
  this.SummaryReportForm.controls['Todate'].setValue(currentDate);
  date.setDate(date.getDate() - 7);
  var yesterday = date.toISOString().slice(0,10);
  this.SummaryReportForm.controls['Fromdate'].setValue(yesterday);
}
LastOneMonthFun(){
  var date = new Date();
  var currentDate = date.toISOString().slice(0,10);
  this.SummaryReportForm.controls['Todate'].setValue(currentDate);
  date.setDate(date.getDate() - 30);
  var yesterday = date.toISOString().slice(0,10);
  this.SummaryReportForm.controls['Fromdate'].setValue(yesterday);
}
// downloadMyFile(){
//   let link = document.createElement("a");
//   link.download = "filename.pdf";
//   link.href = '../../../assets/Files/2 NAV Summary Report';
//   link.click();
// }
}
