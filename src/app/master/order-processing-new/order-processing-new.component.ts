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
  {headerName: 'Sr. No.', field: 'srNo', width: 80  },
  {headerName: 'Securities', field: 'Securities', width: 120, editable: true },
  {headerName: 'Sector', field: 'Sector', width: 120, editable: true},
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
 
];

columnDefs2 = [
  {headerName: 'All', field: '', width: 60, cellRenderer: function() {
    return '<input type="checkbox" class="texBox" value="All" style="width:15px" />'} },
  {headerName: 'Sr. No.', field: 'srNo', width: 80 },
  {headerName: 'Customer Name', field: 'Name', width: 200},
  {headerName: 'Phone No.', field: 'PhonNo', width: 150},
  {headerName: 'Email ID', field: 'email', width: 120},
];

rowData2 = [
  { srNo: '1', Name: 'John', PhonNo: '9876543210', email: 'john@gmail.com'},
  { srNo: '2', Name: 'John', PhonNo: '9876543210', email: 'john@gmail.com'},
  { srNo: '3', Name: 'John', PhonNo: '9876543210', email: 'john@gmail.com'},
];

showNew = false;
showGrid = true;
showCustomer = false;
btnShow = true;
showConfirmationModal = false;
onClickConfirm(event) {
  this.showConfirmationModal = true;
  }
  hideModal() {
  this.showConfirmationModal = false;
  }
CreateNew(){
  this.showGrid = false;
  this.showNew = true;
  this.showCustomer = false;
  this.btnShow = false;
}
viewCustomers(){
  this.showGrid = false;
  this.showNew = false;
  this.showCustomer = true;

}
  constructor() { }

  ngOnInit(): void {


}
}
