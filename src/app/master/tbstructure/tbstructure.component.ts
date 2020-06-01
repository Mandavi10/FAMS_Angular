import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tbstructure',
  templateUrl: './tbstructure.component.html',
  styleUrls: ['./tbstructure.component.css']
})
export class TBstructureComponent implements OnInit {

  Isdiv1:boolean;
  Isdiv:boolean;

  columnDefs2 = [
    {headerName: 'All', field: 'all', width:'60', cellRenderer: function(){
return'<input type="checkbox" class="texBox" value="All" style="width:15px"/>'
    }},
    {headerName: 'Sr. No.', field: 'srNo', width:'80'},
    {headerName: 'TB Head Code', field: 'tbheadcode', width:'150'},
    {headerName: '	TB Head Name', field: 'tbheadname', width:'150'},
    {headerName: ' 	Parent', field: 'Parent', width:'150'},

 
 
    
];

rowData2= [
    {  srNo: '1', tbheadcode:'	TB01',  tbheadname: 'TB Head 1', Parent: 'Parent 1'},
    {  srNo: '2', tbheadcode:'	TB01',  tbheadname: 'TB Head 1', Parent: 'Parent 2'},
    {  srNo: '3', tbheadcode:'	TB01',  tbheadname: 'TB Head 1', Parent: 'Parent 3'},
];

  
columnDefs1 = [
    {headerName: 'All', field: 'all', width:'60', cellRenderer: function(){
return'<input type="checkbox" class="texBox" value="All" style="width:15px"/>'
    }},
 
  {headerName: 'Sr. No.', field: 'srNo', width:'80'},
  {headerName: 'Country', field: 'country', width:'150'},
  {headerName: 'Custodian', field: 'custodian', width:'150'},
  {headerName: 'List Code', field: 'listcode', width:'150'},
  {headerName: 'Name', field: 'name', width:'150'},
  {headerName: 'Active', field: 'active', width:'150'}


  
];

rowData1 = [
  {  srNo: '1', country:'India',custodian:'Custodian 1',  listcode: 'U00001', name: 'Tarun ', active: 'Yes'},
  {  srNo: '2', country:'China',custodian:'Custodian 1',  listcode: 'U00001', name: 'Tarun ', active: 'Yes'},
  {  srNo: '3', country:'Pakistan',custodian:'Custodian 1',  listcode: 'U00001', name: 'Tarun ', active: 'Yes'},
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
