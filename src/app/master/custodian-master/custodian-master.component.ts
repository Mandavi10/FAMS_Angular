import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
@Component({
  selector: 'app-custodian-master',
  templateUrl: './custodian-master.component.html',
  styleUrls: ['./custodian-master.component.css']
})
export class CustodianMasterComponent implements OnInit {

  Isdiv1:boolean;
  Isdiv:boolean;

  columnDefs = [
    {headerName: 'All', field: 'all', width:'60', cellRenderer: function(){
return'<input type="checkbox" class="texBox" value="All" style="width:15px"/>'
    }},
    {headerName: 'Sr. No.', field: 'srNo', width:'80'},
    {headerName: 'Country', field: 'country', width:'150'},
    {headerName: 'Custodian Code', field: 'custoncode', width:'150'},
    {headerName: ' Custodian Name', field: 'custodianname', width:'150'},
   
 
    
];

rowData = [
    {  srNo: '1', country:'India',  custoncode: 'CUS1', custodianname: 'Custodian 1'},
    {  srNo: '2', country:'India',  custoncode: 'CUS1', custodianname: 'Custodian 1'},
    {  srNo: '3', country:'India',  custoncode: 'CUS1', custodianname: 'Custodian 1'},
];

  
columnDefs1 = [
    {headerName: 'All', field: 'all', width:'60', cellRenderer: function(){
return'<input type="checkbox" class="texBox" value="All" style="width:15px"/>'
    }},
 
  {headerName: 'Sr. No.', field: 'srNo', width:'80'},
  {headerName: 'PMS code', field: 'pmscode', width:'150'},
  {headerName: 'PMS  Name', field: 'pmsname', width:'150'},
  {headerName: ' PMS Account No.', field: 'pmsaccount', width:'150'}


  
];

rowData1 = [
  {  srNo: '1', pmscode:'001',  pmsname: 'Tarun', pmsaccount: '001'},
  {  srNo: '2', pmscode:'001',  pmsname: 'Tarun', pmsaccount: '001'},
  {  srNo: '3', pmscode:'001',  pmsname: 'Tarun', pmsaccount: '001'},
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
    this.Isdiv1=false;
    this.Isdiv=true;
  }

onClickviewpms(){
  this.Isdiv1=true;
  this.Isdiv=false;
}


}
