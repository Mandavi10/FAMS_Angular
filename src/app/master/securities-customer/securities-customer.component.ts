import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-securities-customer',
  templateUrl: './securities-customer.component.html',
  styleUrls: ['./securities-customer.component.css']
})
export class SecuritiesCustomerComponent implements OnInit {

  columnDefs = [
    {headerName: 'All', field: 'all', width:'60', cellRenderer: function(){
      return'<input type="checkbox" class="texBox" value="All" style="width:15px"/>'
          }},
    {headerName: 'Sr. No.', field: 'srNo', width:'80'},
    {headerName: 'Securities', field: 'securities', width:'150'},
    {headerName: ' Customer', field: 'customer', width:'150'},
    {headerName: 'Unit', field: 'unit', width:'80'},
    {headerName: 'Unit Cost', field: 'unitcost', width:'150', cellClass: 'price', headerClass: 'price' },
    {headerName: ' Amount', field: 'amount', width:'150', cellClass: 'price', headerClass: 'price'},
    
    
    
];

rowData = [
    {  srNo: '1', securities:'Indian Oil', customer: 'Tarun ', unit:'50', unitcost: '500 ' , amount: '2500 '},
    {  srNo: '2', securities:'Indian Oil', customer: 'Tarun ', unit:'50', unitcost: '500 ' , amount: '2500 '},
    {  srNo: '3', securities:'Indian Oil', customer: 'Tarun ', unit:'50', unitcost: '500 ' , amount: '2500 '},

   
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
