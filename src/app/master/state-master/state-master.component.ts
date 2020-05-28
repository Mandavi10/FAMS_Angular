import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
@Component({
  selector: 'app-state-master',
  templateUrl: './state-master.component.html',
  styleUrls: ['./state-master.component.css']
})
export class StateMasterComponent implements OnInit {
  columnDefs = [
    {headerName: 'Sr. No.', field: 'srNo', width:'80'},
    {headerName: 'Country', field: 'country', width:'150'},
    {headerName: 'State  Code', field: 'statecode', width:'150'},
    {headerName: 'State Name', field: 'statename', width:'150'},
    {headerName: 'Created By', field: 'createdby', width:'150'},
    {headerName: 'Created On', field: 'createdon', width:'150'},
    {headerName: 'Updated By', field: 'updatedby', width:'150'},
    {headerName: 'Updated On', field: 'updatedon', width:'150'},
    
];

rowData = [
    {  srNo: '1', country:'IND', statecode:'0001',  statename: '001', createdby: 'Tarun', createdon:'28/05/2020',  updatedby: 'Tarun', updatedon:'28/05/2020'},
    {  srNo: '2', country:'IND', statecode:'0001',  statename: '001' , createdby: 'Tarun', createdon:'28/05/2020',  updatedby: 'Tarun', updatedon:'28/05/2020'},
    {  srNo: '3', country:'IND', statecode:'0001',  statename: '001' , createdby: 'Tarun', createdon:'28/05/2020',  updatedby: 'Tarun', updatedon:'28/05/2020'}

   
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
