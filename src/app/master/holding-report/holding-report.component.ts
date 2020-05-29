import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-holding-report',
  templateUrl: './holding-report.component.html',
  styleUrls: ['./holding-report.component.css']
})
export class HoldingReportComponent implements OnInit {

  
  columnDefs = [
    {headerName: 'Sr. No.', field: 'srNo', width:'80'},
    {headerName: 'Customer Account', field: 'CustomerAccount', width:'150'},
    {headerName: 'User Name', field: 'UserName', width:'150'},
    {headerName: 'User Email', field: 'UserEmail', width:'150'},
    {headerName: 'Active', field: 'Active', width:'150'},
   
    
];

rowData = [
    {  srNo: '1', CustomerAccount:'Demo', UserName:'Demo',  UserEmail: 'Demo', Active: 'Demo'},
    {  srNo: '2', CustomerAccount:'Demo', UserName:'Demo',  UserEmail: 'Demo', Active: 'Demo'},
    {  srNo: '3', CustomerAccount:'Demo', UserName:'Demo',  UserEmail: 'Demo', Active: 'Demo'}
   
   
];


  constructor() { }

  ngOnInit(): void {
  }

}

