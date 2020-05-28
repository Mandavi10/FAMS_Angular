import { Component, OnInit } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';

@Component({
  selector: 'app-sector-master',
  templateUrl: './sector-master.component.html',
  styleUrls: ['./sector-master.component.css']
})
export class SectorMasterComponent implements OnInit {
  columnDefs = [
    {headerName: 'Sr. No.', field: 'srNo', width: 80 },
    {headerName: 'Country', field: 'Country', width: 100},
    {headerName: 'Sector Code', field: 'sectorCode', width: 100},
    {headerName: 'Sector Name', field: 'sectorName', width: 100},
    {headerName: 'Created By', field: 'CreatedBy', width: 100},
    {headerName: 'Created On', field: 'CreatedOn', width: 100},
    {headerName: 'Updated By', field: 'UpdatedBy', width: 100},
    {headerName: 'Updated On', field: 'UpdatedOn', width: 100}
   
];

rowData = [
    { srNo: '1', Country: 'Indian', sectorCode: 'Code-001', sectorName: 'State 1', CreatedBy: 'Abhishek', CreatedOn: 'Demo', UpdatedBy: 'Demo', UpdatedOn:'Demo'},
    { srNo: '2', Country: 'Indian', sectorCode: 'Code-002', sectorName: 'State 2', CreatedBy: 'Abhishek', CreatedOn: 'Demo', UpdatedBy: 'Demo', UpdatedOn:'Demo'},
    { srNo: '3', Country: 'Indian', sectorCode: 'Code-003', sectorName: 'State 3', CreatedBy: 'Abhishek', CreatedOn: 'Demo', UpdatedBy: 'Demo', UpdatedOn:'Demo'}
];


showModalstatemaster: boolean;

  onClickstatemaster(event) {
    this.showModalstatemaster = true;
    
    }
    
    hidestatemaster() {
    this.showModalstatemaster = false;
    }
  constructor() { }

  ngOnInit(): void {
  }

}
