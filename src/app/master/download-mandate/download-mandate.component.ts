import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
@Component({
  selector: 'app-download-mandate',
  templateUrl: './download-mandate.component.html',
  styleUrls: ['./download-mandate.component.css']
})
export class DownloadMandateComponent implements OnInit {
  columnDefs = [
    {headerName: 'Sr. No.', field: 'srNo', sort: 'asc' },
    {headerName: 'Mandate ID', field: 'MandateID', sort: 'asc' },
    {headerName: 'Name', field: 'Name', sort: 'asc'},
    {headerName: 'Date On Mandate', field: 'DateOnMandate', sort: 'asc' },
    {headerName: 'Mandate Printed', field: 'MandatePrinted', sort: 'asc' },
    {headerName: 'Mandate Scan', field: 'MandateScan', sort: 'asc' },
    {headerName: 'Reference', field: 'Reference', sort: 'asc' },
    {headerName: 'Amount', field: 'Amount', sort: 'asc' },
    {headerName: 'Account No.', field: 'AccountNo', sort: 'asc' },
    {headerName: 'IFSC/MICR', field: 'IFSCMICR', sort: 'asc' },
    {headerName: 'Bank Name', field: 'BankName', sort: 'asc' },
    {headerName: 'Frequency', field: 'Frequency', sort: 'asc' },
    {headerName: 'Debit Type', field: 'DebitType', sort: 'asc' },
    {headerName: 'Debit To', field: 'DebitTo', sort: 'asc' },
    {headerName: 'Created on', field: 'Createdon', sort: 'asc' },

];

rowData = [
    { srNo: '1', MandateID: '454545', Name: 'Demo', DateOnMandate: '21-05-2020', MandatePrinted: 'Demo', MandateScan: 'Demo', Reference: '3555', Amount: '5852', AccountNo: '654965498465', IFSCMICR: 'HDFC000001', BankName: 'HDFC', Frequency: 'Demo', DebitType: 'Demo', DebitTo: 'Demo', Createdon: 'Demo'  },
    { srNo: '2', MandateID: '454545', Name: 'Demo', DateOnMandate: '21-05-2020', MandatePrinted: 'Demo', MandateScan: 'Demo', Reference: '3555', Amount: '5852', AccountNo: '654965498465', IFSCMICR: 'HDFC000001', BankName: 'HDFC', Frequency: 'Demo', DebitType: 'Demo', DebitTo: 'Demo', Createdon: 'Demo'  },
    { srNo: '3', MandateID: '454545', Name: 'Demo', DateOnMandate: '21-05-2020', MandatePrinted: 'Demo', MandateScan: 'Demo', Reference: '3555', Amount: '5852', AccountNo: '654965498465', IFSCMICR: 'HDFC000001', BankName: 'HDFC', Frequency: 'Demo', DebitType: 'Demo', DebitTo: 'Demo', Createdon: 'Demo'  }
];
  constructor() { }

  ngOnInit(): void {
  }

}
