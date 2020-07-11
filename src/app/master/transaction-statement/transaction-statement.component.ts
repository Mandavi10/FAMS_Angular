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
    {headerName: 'Exchange', field: 'Exchange', width: 100},
    {headerName: 'Quantity', field: 'Quantity', width: 100},
    {headerName: 'Unit Price', field: 'UnitPrice', width: 120, cellClass:'price', headerClass:'price' },
    {headerName: 'Brkg', field: 'Brkg', width: 100, cellClass:'price', headerClass:'price'},
    {headerName: 'STT', field: 'STT', width: 100, cellClass:'price', headerClass:'price'},
    {headerName: 'Settlement Amount', field: 'SettlementAmount', width: 150, cellClass:'price', headerClass:'price'},
   
];

rowData = [
    { TransactionDescription: 'Security in', TransactionDate: '01/01/2020', SettlementDate: '01/01/2020', Security: 'AXIS BANK LIMITED', Exchange: '', Quantity: '145.000', UnitPrice: '615.333 ', Brkg: '0.00', STT: '0.00', SettlementAmount: '89,223.29'},
    { TransactionDescription: 'Security in', TransactionDate: '01/01/2020', SettlementDate: '01/01/2020', Security: 'AXIS BANK LIMITED', Exchange: '', Quantity: '145.000', UnitPrice: '615.333 ', Brkg: '0.00', STT: '0.00', SettlementAmount: '89,223.29'},
    { TransactionDescription: 'Security in', TransactionDate: '01/01/2020', SettlementDate: '01/01/2020', Security: 'AXIS BANK LIMITED', Exchange: '', Quantity: '145.000', UnitPrice: '615.333 ', Brkg: '0.00', STT: '0.00', SettlementAmount: '89,223.29'},
    { TransactionDescription: 'Security in', TransactionDate: '01/01/2020', SettlementDate: '01/01/2020', Security: 'AXIS BANK LIMITED', Exchange: '', Quantity: '145.000', UnitPrice: '615.333 ', Brkg: '0.00', STT: '0.00', SettlementAmount: '89,223.29'},
    { TransactionDescription: 'Security in', TransactionDate: '01/01/2020', SettlementDate: '01/01/2020', Security: 'AXIS BANK LIMITED', Exchange: '', Quantity: '145.000', UnitPrice: '615.333 ', Brkg: '0.00', STT: '0.00', SettlementAmount: '89,223.29'},
    { TransactionDescription: 'Security in', TransactionDate: '01/01/2020', SettlementDate: '01/01/2020', Security: 'AXIS BANK LIMITED', Exchange: '', Quantity: '145.000', UnitPrice: '615.333 ', Brkg: '0.00', STT: '0.00', SettlementAmount: '89,223.29'},
    { TransactionDescription: 'Security in', TransactionDate: '01/01/2020', SettlementDate: '01/01/2020', Security: 'AXIS BANK LIMITED', Exchange: '', Quantity: '145.000', UnitPrice: '615.333 ', Brkg: '0.00', STT: '0.00', SettlementAmount: '89,223.29'},
    { TransactionDescription: 'Security in', TransactionDate: '01/01/2020', SettlementDate: '01/01/2020', Security: 'AXIS BANK LIMITED', Exchange: '', Quantity: '145.000', UnitPrice: '615.333 ', Brkg: '0.00', STT: '0.00', SettlementAmount: '89,223.29'},
    { TransactionDescription: 'Security in', TransactionDate: '01/01/2020', SettlementDate: '01/01/2020', Security: 'AXIS BANK LIMITED', Exchange: '', Quantity: '145.000', UnitPrice: '615.333 ', Brkg: '0.00', STT: '0.00', SettlementAmount: '89,223.29'},
    
];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.navigate(['/Home']);
    this.router.navigate(['/TransactionStatement']);
  }

}
