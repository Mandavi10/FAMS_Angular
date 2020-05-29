import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-summary-report',
  templateUrl: './summary-report.component.html',
  styleUrls: ['./summary-report.component.css']
})
export class SummaryReportComponent implements OnInit {
  columnDefs = [
    {headerName: '', field: 'heading', width:'300'},
    {headerName: '', field: 'value', width:'150'}
];

rowData = [
    {heading: 'Market Value as of 05/29/2020', value: ''},
    
   
];



  constructor() { }

  ngOnInit(): void {
  }

}
