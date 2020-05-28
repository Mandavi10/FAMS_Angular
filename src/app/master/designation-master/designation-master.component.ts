import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
@Component({
  selector: 'app-designation-master',
  templateUrl: './designation-master.component.html',
  styleUrls: ['./designation-master.component.css']
})
export class DesignationMasterComponent implements OnInit {

  columnDefs = [
 
    {headerName: 'Sr. No.', field: 'srNo', width:'80'},
    {headerName: 'Designation Code', field: 'designationcode', width:'150'},
    {headerName: 'Designation Name', field: 'designationname', width:'150'},
    {headerName: 'Created By', field: 'createdby', width:'150'},
    {headerName: 'Created On', field: 'createdon', width:'150'},
    {headerName: 'Updated By', field: 'updatedby', width:'150'},
    {headerName: 'Updated On', field: 'updatedon', width:'150'},
 
    
];

rowData = [
    {  srNo: '1', designationcode:'MD',  designationname: 'Managing Director', createdby: 'Tarun', createdon:'28/05/2020',  updatedby: 'Tarun', updatedon:'28/05/2020'},
    {  srNo: '2', designationcode:'MD',  designationname: 'Managing Director', createdby: 'Tarun', createdon:'28/05/2020',  updatedby: 'Tarun', updatedon:'28/05/2020'},
    {  srNo: '3', designationcode:'MD',  designationname: 'Managing Director', createdby: 'Tarun', createdon:'28/05/2020',  updatedby: 'Tarun', updatedon:'28/05/2020'}
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
