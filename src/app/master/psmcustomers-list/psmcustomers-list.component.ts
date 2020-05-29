import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-psmcustomers-list',
  templateUrl: './psmcustomers-list.component.html',
  styleUrls: ['./psmcustomers-list.component.css']
})
export class PSMCustomersListComponent implements OnInit {

  Isdiv1:boolean;
  Isdiv:boolean;

  columnDefs2 = [
    {headerName: 'All', field: 'all', width:'60', cellRenderer: function(){
return'<input type="checkbox" class="texBox" value="All" style="width:15px"/>'
    }},
    {headerName: 'Sr. No.', field: 'srNo', width:'80'},
    {headerName: 'Customer Account', field: 'customeraccount', width:'150'},
    {headerName: 'Customer Name', field: 'customername', width:'150'},
    {headerName: ' 	Portfolio Type', field: 'portfoliotype', width:'150'},
    {headerName: 'Inception Date', field: 'inceptiondate', width:'150'},
    {headerName: 'Linked PMS Employee', field: 'linkedpmsemployee', width:'200'}
 
 
    
];

rowData2= [
    {  srNo: '1', customeraccount:'474800049887',  customername: 'Tarun', portfoliotype: 'Portfolio 1',inceptiondate:'29/05/2020',  linkedpmsemployee: 'Done'},
    {  srNo: '2', customeraccount:'474800049887',  customername: 'Tarun', portfoliotype: 'Portfolio 1',inceptiondate:'29/05/2020',  linkedpmsemployee: 'Done'},
    {  srNo: '3', customeraccount:'474800049887',  customername: 'Tarun', portfoliotype: 'Portfolio 1',inceptiondate:'29/05/2020',  linkedpmsemployee: 'Done'}
];

  
columnDefs1 = [
    {headerName: 'All', field: 'all', width:'60', cellRenderer: function(){
return'<input type="checkbox" class="texBox" value="All" style="width:15px"/>'
    }},
 
  {headerName: 'Sr. No.', field: 'srNo', width:'80'},
  {headerName: 'Custodian', field: 'custodian', width:'150'},
  {headerName: 'List Code', field: 'listcode', width:'150'},
  {headerName: ' 	Enable', field: 'enable', width:'150'}


  
];

rowData1 = [
  {  srNo: '1', custodian:'Custodian 1',  listcode: 'U00001', enable: 'Yes'},
  {  srNo: '2', custodian:'Custodian 1',  listcode: 'U00001', enable: 'Yes'},
  {  srNo: '3', custodian:'Custodian 1',  listcode: 'U00001', enable: 'Yes'}
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
