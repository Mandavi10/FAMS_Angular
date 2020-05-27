import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent implements OnInit {
  columnDefs = [
    {headerName: 'Sr. No.', field: 'srNo', sort: 'asc' },
    {headerName: 'Request ID', field: 'requestID', sort: 'asc' },
    {headerName: 'Corporate Name', field: 'corpName', sort: 'asc'},
    {headerName: 'Corporate Sector', field: 'corpSector', sort: 'asc'},
    {headerName: 'Status', field: 'status', sort: 'asc'}
];

rowData = [
    { srNo: '1', requestID: 'REQ01', corpName: 'Corporate 1', corpSector: 'Sector 1', status: 'Saved'},
    { srNo: '2', requestID: 'REQ02', corpName: 'Corporate 2', corpSector: 'Sector 2', status: 'In-Process'},
    { srNo: '3', requestID: 'REQ03', corpName: 'Corporate 3', corpSector: 'Sector 3', status: 'Confirmed'},
    { srNo: '4', requestID: 'REQ04', corpName: 'Corporate 4', corpSector: 'Sector 4', status: 'Completed'}
];
isShow = false;
isShow1 = false;
   addRow() {
      this.isShow = true;
  }
  addRow1() {
    this.isShow1 = true;
}
  constructor() { }

  ngOnInit(): void {
  }

}
