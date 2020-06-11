import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-transaction-statement',
  templateUrl: './transaction-statement.component.html',
  styleUrls: ['./transaction-statement.component.css']
})
export class TransactionStatementComponent implements OnInit {
  columnDefs = [
    {headerName: 'Transaction Description', field: 'TransactionDescription', width: 180},
    {headerName: 'Transaction Date', field: 'TransactionDate', width: 150 },
    {headerName: 'Settlement Date', field: 'SettlementDate', width: 150},
    {headerName: 'Security', field: 'Security', width: 150},
    {headerName: 'Exchange', field: 'Exchange', width: 150},
    {headerName: 'Quantity', field: 'Quantity', width: 150},
    {headerName: 'Unit Price', field: 'UnitPrice', width: 150},
    {headerName: 'Brkg', field: 'Brkg', width: 100},
    {headerName: 'STT', field: 'STT', width: 100},
    {headerName: 'Settlement Amount', field: 'SettlementAmount', width: 150},
   
];

rowData = [
    { TransactionDescription: 'Demo', TransactionDate: 'Demo', SettlementDate: 'Demo', Security: 'Demo', Exchange: 'Demo', Quantity: 'Demo', UnitPrice: 'Demo', Brkg: 'Demo', STT: 'Demo', SettlementAmount: 'Demo'},
    { TransactionDescription: 'Demo', TransactionDate: 'Demo', SettlementDate: 'Demo', Security: 'Demo', Exchange: 'Demo', Quantity: 'Demo', UnitPrice: 'Demo', Brkg: 'Demo', STT: 'Demo', SettlementAmount: 'Demo'},
    { TransactionDescription: 'Demo', TransactionDate: 'Demo', SettlementDate: 'Demo', Security: 'Demo', Exchange: 'Demo', Quantity: 'Demo', UnitPrice: 'Demo', Brkg: 'Demo', STT: 'Demo', SettlementAmount: 'Demo'}
   
];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.navigate(['/Home']);
    this.router.navigate(['/TransactionStatement']);
  }

}
