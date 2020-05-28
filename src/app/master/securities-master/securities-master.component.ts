import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-securities-master',
  templateUrl: './securities-master.component.html',
  styleUrls: ['./securities-master.component.css']
})
export class SecuritiesMasterComponent implements OnInit {
  columnDefs = [
    {headerName: 'All', field: '', width: 60, cellRenderer: function() {
      return '<input type="checkbox" class="texBox" value="All" style="width:15px" />'} },
    {headerName: 'Sr. No.', field: 'srNo', width:'80'},
    {headerName: 'Country', field: 'country', width:'150'},
    {headerName: 'Custodian', field: 'custodian', width:'150'},
    {headerName: 'List Code', field: 'listCode', width:'150'},
    {headerName: 'Name', field: 'name', width:'150'},
    {headerName: 'Active', field: 'Active', width:'150'},
   
   
    
  ];
  
  rowData = [
    {  srNo: '1', country:'India', custodian:'Custodian 1',  listCode: '01', name: 'List Name 1', Active:'Active'},
    {  srNo: '2', country:'India', custodian:'Custodian 1',  listCode: '01', name: 'List Name 1', Active:'Active'},
    {  srNo: '3', country:'India', custodian:'Custodian 1',  listCode: '01', name: 'List Name 1', Active:'Active'},
  
  ];



  columnDefs1 = [
    {headerName: 'All', field: '', width: 60, cellRenderer: function() {
      return '<input type="checkbox" class="texBox" value="All" style="width:15px" />'} },
    {headerName: 'Sr. No.', field: 'srNo', width:'80'},
    {headerName: 'Security Code', field: 'securityCode', width:'150'},
    {headerName: 'Security Name', field: 'securityName', width:'150'},
    {headerName: 'Sector', field: 'sector', width:'150'}
];

rowData1 = [
    {  srNo: '1', securityCode:'SC01', securityName:'Security 1',  sector: 'Oil'},
    {  srNo: '2', securityCode:'SC02', securityName:'Security 2',  sector: 'Oil'},
    {  srNo: '3', securityCode:'SC03', securityName:'Security 3',  sector: 'Oil'},
    
];








  showModalSecurity: boolean;
  showSecurity = false;
  showGrid = true;
  viewCustomer(){
    this.showSecurity = true;
    this.showGrid = false;
  }
  onClickPMSEmploye(event) {
    this.showModalSecurity = true;
    
    }
    
    hidePMSEmploye() {
    this.showModalSecurity = false;
    }

  constructor() { }

  ngOnInit(): void {
  }

}
