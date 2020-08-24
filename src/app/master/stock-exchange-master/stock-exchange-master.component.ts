import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-exchange-master',
  templateUrl: './stock-exchange-master.component.html',
  styleUrls: ['./stock-exchange-master.component.css']
})
export class StockExchangeMasterComponent implements OnInit {
  columnDefs = [
    {headerName: 'Sr No.', field: 'srNo',  width: 80 },
    {headerName: 'Stock Exchange Code', field: 'StockExchangeCode',  width: 150},
   {headerName: 'Stock Exchange', field: 'StockExchange',  width: 150},
   {headerName: ' Created On', field: 'createdon',  width: 100},
   {headerName: 'Created By', field: 'createdby',  width: 150},
   {headerName: 'Updated On', field: 'UpdatedOn',  width: 100},
   {headerName: 'Updated By', field: 'UpdatedBy',  width: 150},
   
  
    
  
   
  ];
  
  rowData = [
    { srNo: '1', StockExchangeCode: '6546', StockExchange: '5558', createdon: '24-08-2020', createdby: 'Vats Abhishek', UpdatedOn:'24-08-2020',UpdatedBy:'Abhishek Vats'},
    { srNo: '2', StockExchangeCode: '6546', StockExchange: '5558', createdon: '24-08-2020', createdby: 'Vats Abhishek', UpdatedOn:'24-08-2020',UpdatedBy:'Abhishek Vats'},
   
  ];




  columnDefs1 = [
    {headerName: 'Securities', field: 'StockExchangeCode', width: 100, headerCheckboxSelection: true, checkboxSelection: true },
    
   {headerName: 'Sector', field: 'StockExchange'},
  ];
  
  rowData1 = [
    {  StockExchangeCode: '6546', StockExchange: 'Sector1 ,Sector2'},
    {  StockExchangeCode: '6546', StockExchange: 'Sector5, Sector8'},
   
  ];









  showModalholidaymaster: boolean;

  onClickholidaymaster(event) {
    this.showModalholidaymaster = true;
    
    }
    
    hidepholidaymaster() {
    this.showModalholidaymaster = false;
    }
  constructor() { }

  ngOnInit() {
  }

}
