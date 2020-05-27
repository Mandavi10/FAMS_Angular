import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
@Component({
  selector: 'app-product-master',
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.css']
})
export class ProductMasterComponent implements OnInit {
 
  columnDefs = [
    {headerName: 'Sr No.', field: 'srNo',  width: 80 },
    {headerName: 'Holiday ', field: 'holiday'},
   {headerName: 'Date of Holiday ', field: 'Dateofholiday'},
   {headerName: 'Created by', field: 'createdby'},
   {headerName: ' Created on', field: 'createdon'},
  
    
  
   
  ];
  
  rowData = [
    { srNo: '1', holiday: 'Holi', Dateofholiday: '26-05-2020', createdby: 'Tarun sharma', createdon: '24-05-2020'},
    { srNo: '2', holiday: 'Dewali', Dateofholiday: '15-11-2020', createdby: 'Tarun sharma', createdon: '24-05-2020'},
    { srNo: '3', holiday: 'Makar Shakranti', Dateofholiday: '15-01-2021', createdby: 'Tarun sharma', createdon: '24-05-2020'},
  
  ];




  showModalholidaymaster: boolean;

  onClickholidaymaster(event) {
    this.showModalholidaymaster = true;
    
    }
    
    hidepholidaymaster() {
    this.showModalholidaymaster = false;
    }
  constructor() { }

  ngOnInit(): void {
  }

}
