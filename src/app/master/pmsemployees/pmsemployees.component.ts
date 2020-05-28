import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';


@Component({
  selector: 'app-pmsemployees',
  templateUrl: './pmsemployees.component.html',
  styleUrls: ['./pmsemployees.component.css']
})
export class PMSEmployeesComponent implements OnInit {
  columnDefs = [
    {headerName: 'All', field: '', width: 60, cellRenderer: function() {
      return '<input type="checkbox" class="texBox" value="All" style="width:15px" />'} },
    {headerName: 'Sr. No.', field: 'srNo', width:'80'},
    {headerName: 'Employee Code', field: 'EmployeeCode', width:'150'},
    {headerName: 'Employee Name', field: 'EmployeeName', width:'150'},
    {headerName: 'Gender', field: 'Gender', width:'150'},
    {headerName: 'Qualification', field: 'Qualification', width:'150'},
    {headerName: 'About', field: 'About', width:'150'},
   
   
    
  ];
  
  rowData = [
    {  srNo: '1', EmployeeCode:'Demo', EmployeeName:'Demo',  Gender: 'Demo', Qualification: 'Demo', About:'Demo'},
    {  srNo: '2', EmployeeCode:'Demo', EmployeeName:'Demo',  Gender: 'Demo', Qualification: 'Demo', About:'Demo'},
    {  srNo: '3', EmployeeCode:'Demo', EmployeeName:'Demo',  Gender: 'Demo', Qualification: 'Demo', About:'Demo'}
   
  ];



  columnDefs1 = [
    {headerName: 'All', field: '', width: 60, cellRenderer: function() {
      return '<input type="checkbox" class="texBox" value="All" style="width:15px" />'} },
    {headerName: 'Sr. No.', field: 'srNo', width:'80'},
    {headerName: 'Customer Code', field: 'CustomerCode', width:'150'},
    {headerName: 'Customer Name', field: 'CustomerName', width:'150'},
    {headerName: 'Custodian', field: 'Custodian', width:'150'},
    {headerName: 'Inception Date', field: 'InceptionDate', width:'150'},
    {headerName: 'Employee Linking Date', field: 'EmployeeLinkingDate', width:'200'},
   
   
    
];

rowData1 = [
    {  srNo: '1', CustomerCode:'Demo', CustomerName:'Demo',  Custodian: 'Demo', InceptionDate: 'Demo', EmployeeLinkingDate:'Demo'},
    {  srNo: '2', CustomerCode:'Demo', CustomerName:'Demo',  Custodian: 'Demo', InceptionDate: 'Demo', EmployeeLinkingDate:'Demo'},
    {  srNo: '3', CustomerCode:'Demo', CustomerName:'Demo',  Custodian: 'Demo', InceptionDate: 'Demo', EmployeeLinkingDate:'Demo'}
  
];








  showModalPMSEmploye: boolean;
  showCustomer = false;
  showGrid = true;
  viewCustomer(){
    this.showCustomer = true;
    this.showGrid = false;
  }
  onClickPMSEmploye(event) {
    this.showModalPMSEmploye = true;
    
    }
    
    hidePMSEmploye() {
    this.showModalPMSEmploye = false;
    }

  constructor() { }

  ngOnInit(): void {
  }

}
