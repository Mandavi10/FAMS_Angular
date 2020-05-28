import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-country-master',
  templateUrl: './country-master.component.html',
  styleUrls: ['./country-master.component.css']
})
export class CountryMasterComponent implements OnInit {
  columnDefs = [
 
    {headerName: 'Sr. No.', field: 'srNo', width:'80'},
    {headerName: 'Country  Code', field: 'countrycode', width:'150'},
    {headerName: 'Country Name', field: 'countryname', width:'150'},
    {headerName: 'Created By', field: 'createdby', width:'150'},
    {headerName: 'Created On', field: 'createdon', width:'150'},
    {headerName: 'Updated By', field: 'updatedby', width:'150'},
    {headerName: 'Updated On', field: 'updatedon', width:'150'},
    
];

rowData = [
    {  srNo: '1', countrycode:'IND',  countryname: 'India', createdby: 'Tarun', createdon:'28/05/2020',  updatedby: 'Tarun', updatedon:'28/05/2020'},
    {  srNo: '2', countrycode:'AUS',  countryname: 'Australia' , createdby: 'Tarun', createdon:'28/05/2020',  updatedby: 'Tarun', updatedon:'28/05/2020'},
    {  srNo: '3', countrycode:'PAK',  countryname: 'Pakistan' , createdby: 'Tarun', createdon:'28/05/2020',  updatedby: 'Tarun', updatedon:'28/05/2020'}
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
