import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
@Component({
  selector: 'app-all-auto-request',
  templateUrl: './all-auto-request.component.html',
  styleUrls: ['./all-auto-request.component.css']
})

export class AllAutoRequestComponent implements OnInit {

  columnDefs = [
    {headerName: 'Sr. No.', field: 'SrNo', width:'80'},
    {headerName: 'Customer Name', field: 'customername', width:'150'},
    {headerName: 'Customer Account', field: 'customeraccount', width:'150'},
    {headerName: 'Status', field: 'status', width:'150'},
  
];

rowData = [
    {  SrNo: '1', customername:'Tarun Sharma', customeraccount:'4748001000021151',  status: 'Pending'},
    {  SrNo: '2', customername:'Tarun Sharma', customeraccount:'4748001000021151',  status: 'Pending'},
    {  SrNo: '3', customername:'Tarun Sharma', customeraccount:'4748001000021151',  status: 'Pending'},


   
];
showModalstatemaster: boolean;
showModalsavepopup:boolean;
onClickstatemaster(event) {
 
  this.showModalstatemaster = true;
  }
  
  hidestatemaster() {
   this.showModalstatemaster = false;
  }
  
onClicksavepopup() {
  this.showModalsavepopup = true;
}

hidesavepopup() {
 this.showModalsavepopup = false;
}
  constructor() { }

  ngOnInit(): void {
  }

}
