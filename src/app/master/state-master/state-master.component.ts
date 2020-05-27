import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
@Component({
  selector: 'app-state-master',
  templateUrl: './state-master.component.html',
  styleUrls: ['./state-master.component.css']
})
export class StateMasterComponent implements OnInit {
  columnDefs = [
    {headerName: 'Sr. No.', field: 'srNo', sort: 'asc' },
    {headerName: 'State Code', field: 'stateCode', sort: 'asc' },
    {headerName: 'State Name', field: 'stateName', sort: 'asc'}
   
];

rowData = [
    { srNo: '1', stateCode: 'Code-001', stateName: 'State 1'},
    { srNo: '2', stateCode: 'Code-002', stateName: 'State 2'},
    { srNo: '3', stateCode: 'Code-003', stateName: 'State 3'}
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
