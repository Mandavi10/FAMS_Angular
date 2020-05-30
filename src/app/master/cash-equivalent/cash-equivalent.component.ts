import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
@Component({
  selector: 'app-cash-equivalent',
  templateUrl: './cash-equivalent.component.html',
  styleUrls: ['./cash-equivalent.component.css']
})
export class CashEquivalentComponent implements OnInit {
  columnDefs = [
    {headerName: 'Account', field: 'Account', width: 150},
    {headerName: 'Account Name', field: 'AccountName', width: 150},
    {headerName: 'Bank Balance', field: 'BankBalance', width: 150},
    {headerName: 'Liquid Fund MV', field: 'LiquidFundMV', width: 150},
    {headerName: 'Payable', field: 'Payable', width: 150},
    {headerName: 'Receivable', field: 'Receivable', width: 150},
    {headerName: 'Pending Orders Cash', field: 'PendingOrdersCash', width: 150},
    {headerName: 'Available Cash & Eq.', field: 'AvailableCashEq', width: 150},
    {headerName: 'Market ValueCash & Eq.', field: 'MarketValueCashEq', width: 150},
    {headerName: '% of MV', field: 'ofMV', width: 100},
   
];

rowData = [
    { Account: 'Demo', AccountName: 'Demo', BankBalance: 'Demo', LiquidFundMV: 'Demo', Payable: 'Demo', Receivable: 'Demo', PendingOrdersCash: 'Demo', AvailableCashEq: 'Demo', MarketValueCashEq: 'Demo', ofMV: 'Demo'},
    { Account: 'Demo', AccountName: 'Demo', BankBalance: 'Demo', LiquidFundMV: 'Demo', Payable: 'Demo', Receivable: 'Demo', PendingOrdersCash: 'Demo', AvailableCashEq: 'Demo', MarketValueCashEq: 'Demo', ofMV: 'Demo'},
    { Account: 'Demo', AccountName: 'Demo', BankBalance: 'Demo', LiquidFundMV: 'Demo', Payable: 'Demo', Receivable: 'Demo', PendingOrdersCash: 'Demo', AvailableCashEq: 'Demo', MarketValueCashEq: 'Demo', ofMV: 'Demo'}
  
];


  constructor() { }

  ngOnInit(): void {
  }

}
