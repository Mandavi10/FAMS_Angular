import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tbreport',
  templateUrl: './tbreport.component.html',
  styleUrls: ['./tbreport.component.css']
})
export class TBReportComponent implements OnInit {

  columnDefs = [
    {headerName: 'All', field: 'all', width:'60', cellRenderer: function(){
      return'<input type="checkbox" class="texBox" value="All" style="width:15px"/>'
          }},
    {headerName: 'Sr. No.', field: 'srNo', width:'80'},
    {headerName: 'Customer Name', field: 'customername', width:'150'},
    {headerName: 'Accounts', field: 'accounts', width:'150'},
    {headerName: 'Account Sub Level', field: 'accountsublevel', width:'150'},
    {headerName: 'From date', field: 'fromdate', width:'150'},
    {headerName: 'To Date', field: 'todate', width:'150'},
    {headerName: 'Account Type', field: 'accounttype', width:'150'},
    
    
];

rowData = [
    {  srNo: '1', customername:'Tarun', accounts: '1222983474602', accountsublevel:'Sub Level 1', fromdate:'29/05/2020',todate:'29/05/2020', accounttype:'Account Type 1'},
    {  srNo: '2', customername:'Tarun', accounts: '1222983474602', accountsublevel:'Sub Level 1', fromdate:'29/05/2020',todate:'29/05/2020' , accounttype:'Account Type 2'},
    {  srNo: '3', customername:'Tarun', accounts: '1222983474602', accountsublevel:'Sub Level 1', fromdate:'29/05/2020',todate:'29/05/2020' , accounttype:'Account Type 3'},

   
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
