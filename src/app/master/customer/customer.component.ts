import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  Isdiv1:boolean;
  Isdiv2:boolean;

  columnDefs = [
    {headerName: 'All', field: 'all', width:'60', cellRenderer: function(){
      return'<input type="checkbox" class="texBox" value="All" style="width:15px"/>'
          }},
    {headerName: 'Sr. No.', field: 'srNo', width:'80'},
    {headerName: 'Name', field: 'name', width:'150'},
    {headerName: ' Account Number', field: 'accountnumber', width:'150'},
    
    
    
    
];

rowData = [
    {  srNo: '1', name:'Tarun', accountnumber: '4748900987658867'},
    {  srNo: '2', name:'Tarun', accountnumber: '4748900987658867'},
    {  srNo: '3', name:'Tarun', accountnumber: '4748900987658867'},

   
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
    
    this.Isdiv2=false;
    this.Isdiv1=true;
  }

  onClicknew(){
  this.Isdiv2=true;
  this.Isdiv1=false;

  }

}
