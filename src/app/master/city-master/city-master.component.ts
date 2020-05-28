import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';


@Component({
  selector: 'app-city-master',
  templateUrl: './city-master.component.html',
  styleUrls: ['./city-master.component.css']
})
export class CityMasterComponent implements OnInit {

  columnDefs = [
    {headerName: 'Sr. No.', field: 'srNo', width: 80 },
    {headerName: 'Country', field: 'Country', width: 100},
    {headerName: 'State', field: 'State', width: 100},
    {headerName: 'City Code', field: 'cityCode', width: 100},
    {headerName: 'City Name', field: 'cityName', width: 100},
    {headerName: 'Created By', field: 'CreatedBy', width: 100},
    {headerName: 'Created On', field: 'CreatedOn', width: 100},
    {headerName: 'Updated By', field: 'UpdatedBy', width: 100},
    {headerName: 'Updated On', field: 'UpdatedOn', width: 100}
];

rowData = [
    { srNo: '1', Country: 'Indian', State: 'state-001', cityCode: 'Code-001', cityName: 'State 1', CreatedBy: 'Abhishek', CreatedOn: 'Demo', UpdatedBy: 'Demo', UpdatedOn:'Demo'},
    { srNo: '2', Country: 'Indian', State: 'state-001', cityCode: 'Code-001', cityName: 'State 1', CreatedBy: 'Abhishek', CreatedOn: 'Demo', UpdatedBy: 'Demo', UpdatedOn:'Demo'},
    { srNo: '3', Country: 'Indian', State: 'state-001', cityCode: 'Code-001', cityName: 'State 1', CreatedBy: 'Abhishek', CreatedOn: 'Demo', UpdatedBy: 'Demo', UpdatedOn:'Demo'}
];



  constructor() { }

  ngOnInit(): void {
  }

}
