import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css']
})
export class EntityComponent implements OnInit {

  columnDefs = [
    {headerName: 'All', field: 'all', width:'60', cellRenderer: function(){
      return'<input type="checkbox" class="texBox" value="All" style="width:15px"/>'
          }},
    {headerName: 'Sr. No.', field: 'srNo', width:'80'},
    {headerName: 'Name', field: 'name', width:'150'},
    {headerName: 'Account Number', field: 'accountnumber', width:'150'},
    
    
    
];

rowData = [
    {  srNo: '1', name:'Tarun', accountnumber: '1222983474602'},
    {  srNo: '2', name:'Tarun', accountnumber: '1222983474602'},
    {  srNo: '3', name:'Tarun', accountnumber: '1222983474602'},

   
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
