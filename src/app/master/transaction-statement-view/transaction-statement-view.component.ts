import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-transaction-statement-view',
  templateUrl: './transaction-statement-view.component.html',
  styleUrls: ['./transaction-statement-view.component.css']
})
export class TransactionStatementViewComponent implements OnInit {
  columnDefs = [
    {headerName: 'Sr. No.', field: 'SrNo', width:'80'},
    {headerName: 'From Date', field: 'fromdate', width:'150'},
    {headerName: 'To Date', field: 'todate', width:'150'},
    {headerName: 'Customer Account', field: 'customeraccount', width:'150'},
    {headerName: 'Scheme', field: 'scheme', width:'150'},
    {headerName: 'Download', field: '', width:'100',cellClass:'text-center', cellRenderer: function clickNextRendererFunc(){
      return '    <i class="fa fa-file-excel-o" aria-hidden="true" title="Download"></i>';
    }},
    {headerName: 'Data View Mode', field: 'viewmode', width:'150', cellClass:'text-center',cellRenderer: function clickNextRendererFunc(){
      return '<button type="button" class="btn btn-success">View</button>';
    }},
  
    
];

rowData = [
    {  SrNo: '1', fromdate:'14/07/2020', todate:'20/07/2020',  customeraccount: '47481000024748', scheme: '', download:'',  viewmode: ''},
    {  SrNo: '2', fromdate:'14/07/2020', todate:'20/07/2020',  customeraccount: '47481000024748', scheme: '', download:'',  viewmode: ''},
    {  SrNo: '3', fromdate:'14/07/2020', todate:'20/07/2020',  customeraccount: '47481000024748', scheme: '', download:'',  viewmode: ''},

   
];
  constructor() { }

  ngOnInit(): void {
  }

}
