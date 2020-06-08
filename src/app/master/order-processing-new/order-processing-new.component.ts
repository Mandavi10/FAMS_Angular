import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-processing-new',
  templateUrl: './order-processing-new.component.html',
  styleUrls: ['./order-processing-new.component.css']
})
export class OrderProcessingNewComponent implements OnInit {
  columnDefs = [
    {headerName: 'Sr. No.', field: 'srNo', width: 80 },
    {headerName: 'Order No.', field: 'OrderNo', width: 100},
    {headerName: 'Total Order Amount', field: 'FileAmount', width: 150, cellClass: 'price', headerClass: 'price'},
    {headerName: 'Customer', field: 'customer', width: 120},
    {headerName: 'Created On', field: 'CreatedOn', width: 120 },
    {headerName: 'Created By', field: 'CreatedBy', width: 120},
    {headerName: 'Updated On', field: 'UpdatedOn', width: 120 },
    {headerName: 'Updated By', field: 'UpdatedBy', width: 120 },
    {headerName: 'Approved On', field: 'ApprovedOn', width: 120 },
    {headerName: 'Approved By', field: 'ApprovedBy', width: 120 },
    {headerName: 'Response On', field: 'ResponseOn', width: 120 },
    {headerName: 'Status', field: 'Status', width: 120 }
   

];

rowData = [
    // tslint:disable-next-line:max-line-length
    { srNo: '1', OrderNo: '001', FileAmount: '1000', customer: '', CreatedOn: '20-05-2020', CreatedBy: 'Demo', UpdatedBy: 'Demo', UpdatedOn: '20-05-2020', ApprovedBy: 'Demo', ApprovedOn: '20-05-2020', ResponseOn: '20-05-2020', branch: 'Branch 1', region: 'Region 1', product: 'Product 1', BankName: 'HDFC', LastStatusOn: 'DEMO', Status: 'Approved'},
    { srNo: '2', OrderNo: '002', FileAmount: '1000', customer: '', CreatedOn: '20-05-2020', CreatedBy: 'Demo', UpdatedBy: 'Demo', UpdatedOn: '20-05-2020', ApprovedBy: 'Demo', ApprovedOn: '20-05-2020', ResponseOn: '20-05-2020', branch: 'Branch 1', region: 'Region 1', product: 'Product 1', BankName: 'HDFC', LastStatusOn: 'DEMO', Status: 'Approved'},
    { srNo: '3', OrderNo: '003', FileAmount: '1000', customer: '', CreatedOn: '20-05-2020', CreatedBy: 'Demo', UpdatedBy: 'Demo', UpdatedOn: '20-05-2020', ApprovedBy: 'Demo', ApprovedOn: '20-05-2020', ResponseOn: '20-05-2020', branch: 'Branch 1', region: 'Region 1', product: 'Product 1', BankName: 'HDFC', LastStatusOn: 'DEMO', Status: 'Approved'},
  
  ];
columnDefs1 = [
  {headerName: 'Sr. No.', field: 'srNo', width: 60  },
  {headerName: 'Securities', field: 'Securities', width: 100, editable: true },
  {headerName: 'Sector', field: 'Sector', width: 100, editable: true},
  {headerName: 'Buy Units', field: 'BuyUnits', width: 90, editable: true, cellClass: 'profit'},
  {headerName: 'Sell Units', field: 'SellUnits', width: 90, editable: true, cellClass: 'loss' },
  {headerName: 'Price', field: 'Price', width: 100, editable: true , cellClass: 'price', headerClass: 'price'},
  {headerName: 'Amount', field: 'Amount', width: 100, editable: true, cellClass: 'price', headerClass: 'price' },
  {headerName: 'Stock Exchange Type', field: 'StockExchange', width: 150 , editable: true },
  {headerName: 'Response', field: 'Response', width: 100, editable: true  },
  {headerName: 'Reason', field: 'Reason', width: 100, editable: true },
    {headerName: '', field: '', width: 60, cellRenderer: function() {
      return '<input type="button" class="btn btn-success" value="Add"/>'}},
      {headerName: '', field: '', width: 40, cellRenderer: function() {
        return '<i class="fa fa-times"></i>'}, cellStyle: {color: '#f72929', 'font-size': '16px'}}
];

rowData1 = [
  
  // tslint:disable-next-line:max-line-length
  { srNo: '1', Securities: '', Sector: '', BuyUnits: '50', SellUnits: '50', Price:'', Amount: '', StockExchange: '', Status: 'Approved', Reason: ''},
// tslint:disable-next-line:max-line-length
{ srNo: '2', Securities: '', Sector: '', BuyUnits: '50', SellUnits: '50', Price:'', Amount: '', StockExchange: '', Status: 'Approved', Reason: ''},
// tslint:disable-next-line:max-line-length
{ srNo: '3', Securities: '', Sector: '', BuyUnits: '50', SellUnits: '50', Price:'', Amount: '', StockExchange: '', Status: 'Approved', Reason: ''},
// tslint:disable-next-line:max-line-length
{ srNo: '4', Securities: '', Sector: '', BuyUnits: '50', SellUnits: '50', Price:'', Amount: '', StockExchange: '', Status: 'Approved', Reason: ''},
// tslint:disable-next-line:max-line-length
{ srNo: '5', Securities: '', Sector: '', BuyUnits: '50', SellUnits: '50', Price:'', Amount: '', StockExchange: '', Status: 'Approved', Reason: ''},
// tslint:disable-next-line:max-line-length
{ srNo: '6', Securities: '', Sector: '', BuyUnits: '50', SellUnits: '50', Price:'', Amount: '', StockExchange: '', Status: 'Approved', Reason: ''},
// tslint:disable-next-line:max-line-length
{ srNo: '7', Securities: '', Sector: '', BuyUnits: '50', SellUnits: '50', Price:'', Amount: '', StockExchange: '', Status: 'Approved', Reason: ''},
 
];

columnDefs2 = [
  {headerName: 'All', field: '', width: 60, headerCheckboxSelection: true, checkboxSelection: true },
  {headerName: 'Sr. No.', field: 'srNo', width: 80 },
  {headerName: 'Customer Name', field: 'Name', width: 200},
  {headerName: 'Phone No.', field: 'PhonNo', width: 150},
  {headerName: 'Email ID', field: 'email', width: 120},
];

rowData2 = [
  { srNo: '1', Name: 'John', PhonNo: '9876543210', email: 'john@gmail.com'},
  { srNo: '2', Name: 'John', PhonNo: '9876543210', email: 'john@gmail.com'},
  { srNo: '3', Name: 'John', PhonNo: '9876543210', email: 'john@gmail.com'},
  { srNo: '4', Name: 'John', PhonNo: '9876543210', email: 'john@gmail.com'},
  { srNo: '5', Name: 'John', PhonNo: '9876543210', email: 'john@gmail.com'},
  { srNo: '6', Name: 'John', PhonNo: '9876543210', email: 'john@gmail.com'},
];
columnDefs3 = [
  {headerName: 'Sr. No.', field: 'srNo', width: 60 },
  {headerName: 'Stock', field: 'stock', width: 100},
  {headerName: 'Sector', field: 'sector', width: 100},
  {headerName: 'Todays Price', field: 'price', width: 110, cellClass: 'price', headerClass: 'price'},
  {headerName: 'Total', field: 'total', width: 100, cellClass: 'price', headerClass: 'price'},
  {headerName: 'Stock Exchange Type', field: 'ste', width: 150},
];

rowData3 = [
  { srNo: '1', stock: 'stock 1', sector: 'sector 1', price: '1000', total: '10000', ste: 'BSE'},
  { srNo: '2', stock: 'stock 1', sector: 'sector 1', price: '1000', total: '10000', ste: 'BSE'},
  { srNo: '3', stock: 'stock 1', sector: 'sector 1', price: '1000', total: '10000', ste: 'BSE'},
  { srNo: '4', stock: 'stock 1', sector: 'sector 1', price: '1000', total: '10000', ste: 'BSE'},
  { srNo: '5', stock: 'stock 1', sector: 'sector 1', price: '1000', total: '10000', ste: 'BSE'},
];
columnDefs4 = [
  {headerName: 'Sr. No.', field: 'srNo', width: 60 },
  {headerName: 'Securities', field: 'securities', width: 100},
  {headerName: 'Stock', field: 'stock', width: 100},
  {headerName: 'Qty in unit(Current)', field: 'qtyCurrent', width: 140},
  {headerName: 'Qty in unit(After Order)', field: 'qtyOrder', width: 160},
  {headerName: 'Price(Current)', field: 'price', width: 120, cellClass: 'price', headerClass: 'price'},
  {headerName: 'Price(After order)', field: 'price1', width: 160, cellClass: 'price', headerClass: 'price'},
  {headerName: 'Stock Exchange Type(Current)', field: 'ste', width: 180},
  {headerName: 'Stock Exchange Type(After order)', field: 'ste1', width: 180},
  {headerName: 'Line Amount', field: 'amount', width: 100, cellClass: 'price', headerClass: 'price'},
 
];

rowData4 = [
  // tslint:disable-next-line:max-line-length
  { srNo: '1', securities: 'security 1', stock: 'stock 1', qtyCurrent: '100', qtyOrder: '80', price: '1000', price1: '1100', ste: 'BSE', ste1: 'BSE', amount: '1000'},
  // tslint:disable-next-line:max-line-length
  { srNo: '2', securities: 'security 1', stock: 'stock 1', qtyCurrent: '100', qtyOrder: '80', price: '1000', price1: '1100', ste: 'BSE', ste1: 'BSE', amount: '1000'},
// tslint:disable-next-line:max-line-length
{ srNo: '3', securities: 'security 1', stock: 'stock 1', qtyCurrent: '100', qtyOrder: '80', price: '1000', price1: '1100', ste: 'BSE', ste1: 'BSE', amount: '1000'},
  // tslint:disable-next-line:max-line-length
  { srNo: '4', securities: 'security 1', stock: 'stock 1', qtyCurrent: '100', qtyOrder: '80', price: '1000', price1: '1100', ste: 'BSE', ste1: 'BSE', amount: '1000'},
  // tslint:disable-next-line:max-line-length
  { srNo: '5', securities: 'security 1', stock: 'stock 1', qtyCurrent: '100', qtyOrder: '80', price: '1000', price1: '1100', ste: 'BSE', ste1: 'BSE', amount: '1000'},
    
];
showNew = false;
showGrid = true;
showCustomer = false;
btnShow = true;
showConfirmationModal = false;
showCustomerModal = false;
onClickConfirm(event) {
  this.showConfirmationModal = true;
  }
  hideModal() {
  this.showConfirmationModal = false;
  
  }
  onClickCustomer(event) {
    this.showCustomerModal = true;
    this.showConfirmationModal = false;
    }
    hideCustomer() {
    this.showCustomerModal = false;
    }
CreateNew(){
  this.showGrid = false;
  this.showNew = true;
  this.showCustomer = false;
  this.btnShow = false;
  this.showConfirmationModal = false;
  this.showCustomerModal = false;
}
viewCustomers(){
  this.showGrid = false;
  this.showNew = false;
  this.showCustomer = true;
  this.showCustomerModal = false;

}
  constructor() { }

  ngOnInit(): void {


}
}
