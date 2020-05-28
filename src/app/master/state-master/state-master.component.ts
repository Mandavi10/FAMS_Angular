import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
@Component({
  selector: 'app-state-master',
  templateUrl: './state-master.component.html',
  styleUrls: ['./state-master.component.css']
})
export class StateMasterComponent implements OnInit {
  columnDefs = [
    {headerName: 'Sr. No.', field: 'srNo', width: 80 },
    {headerName: 'Country', field: 'Country', width: 100},
    {headerName: 'State Code', field: 'stateCode', width: 100},
    {headerName: 'State Name', field: 'stateName', width: 100},
    {headerName: 'Created By', field: 'CreatedBy', width: 100},
    {headerName: 'Created On', field: 'CreatedOn', width: 100},
    {headerName: 'Updated By', field: 'UpdatedBy', width: 100},
    {headerName: 'Updated On', field: 'UpdatedOn', width: 100}
   
];

rowData = [
    { srNo: '1', Country: 'Indian', stateCode: 'Code-001', stateName: 'State 1', CreatedBy: 'Abhishek', CreatedOn: 'Demo', UpdatedBy: 'Demo', UpdatedOn:'Demo'},
    { srNo: '2', Country: 'Indian', stateCode: 'Code-002', stateName: 'State 2', CreatedBy: 'Abhishek', CreatedOn: 'Demo', UpdatedBy: 'Demo', UpdatedOn:'Demo'},
    { srNo: '3', Country: 'Indian', stateCode: 'Code-003', stateName: 'State 3', CreatedBy: 'Abhishek', CreatedOn: 'Demo', UpdatedBy: 'Demo', UpdatedOn:'Demo'}
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
