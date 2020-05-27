import { Component, OnInit } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
@Component({
  selector: 'app-bulk-emandate',
  templateUrl: './bulk-emandate.component.html',
  styleUrls: ['./bulk-emandate.component.css']
})
export class BulkEmandateComponent implements OnInit {

  columnDefs1 = [
    {headerName: 'Date On Mandate', field: 'srNo' },
    {headerName: 'Sponser bank', field: 'activityid'},
    {headerName: 'Utility Code', field: 'Name'},
    {headerName: 'Bank A/C Number', field: 'DateOnMandate'},
    {headerName: 'IFSC', field: 'MandatePrinted' },
    {headerName: 'Amount', field: 'amount'},
    {headerName: 'Frequency', field: 'frequency' },
    {headerName: 'Debit Type', field: 'debittype' },
    {headerName: 'Reference 1', field: 'refrence1'},
    {headerName: 'Phone No.', field: 'phoneno' },
    {headerName: 'Email ID', field: 'emailid' },
    {headerName: 'From Date', field: 'fromdate'},
    {headerName: 'To Date', field: 'todate' },
    {headerName: 'Name As In BankRecords', field: 'nameasinbank' },
    {headerName: 'Created On', field: 'createdon'},

   
];

rowData1 = [
    { srNo: '1', activityid: '454545', Name: 'Demo', DateOnMandate: '21-05-2020', MandatePrinted: 'Demo' , amount: '1', frequency: '454545', debittype: 'Demo', refrence1: '21-05-2020', phoneno: 'Demo', emailid: '454545', fromdate: 'Demo', todate: '21-05-2020', nameasinbank: 'Demo', createdon:'21-05-2020' },
    { srNo: '2', activityid: '454545', Name: 'Demo', DateOnMandate: '21-05-2020', MandatePrinted: 'Demo' , amount: '1', frequency: '454545', debittype: 'Demo', refrence1: '21-05-2020', phoneno: 'Demo', emailid: '454545', fromdate: 'Demo', todate: '21-05-2020', nameasinbank: 'Demo', createdon:'21-05-2020' },
    { srNo: '3', activityid: '454545', Name: 'Demo', DateOnMandate: '21-05-2020', MandatePrinted: 'Demo' , amount: '1', frequency: '454545', debittype: 'Demo', refrence1: '21-05-2020', phoneno: 'Demo', emailid: '454545', fromdate: 'Demo', todate: '21-05-2020', nameasinbank: 'Demo', createdon:'21-05-2020' },
];


columnDefs = [
  {headerName: 'Sr No.', field: 'srNo' },
  {headerName: 'Activity ID', field: 'id'},
  {headerName: 'Activity Name', field: 'Name'},
  {headerName: 'Uploaded on', field: 'DateOnMandate'},
  {headerName: 'Created by', field: 'MandatePrinted' },

 
];

rowData = [
  { srNo: '1', id: '454545', Name: 'Demo', DateOnMandate: '21-05-2020', MandatePrinted: 'Demo'},
  { srNo: '2', id: '454545', Name: 'Demo', DateOnMandate: '21-05-2020', MandatePrinted: 'Demo'},
  { srNo: '3', id: '454545', Name: 'Demo', DateOnMandate: '21-05-2020', MandatePrinted: 'Demo'},
];



columnDefs2 = [
  {headerName: 'Refrence No.', field: 'srNo' },
  {headerName: 'Customer Name', field: 'IFSC'},
  {headerName: 'A/C Number', field: 'Name'},
  {headerName: 'IFSC', field: 'DateOnMandate'},
  {headerName: 'Remark', field: 'MandatePrinted' },

 
];

rowData2 = [
  { srNo: '1', IFSC: '454545', Name: 'Demo', DateOnMandate: '21-05-2020', MandatePrinted: 'Demo'},
  { srNo: '2',  IFSC:  '454545', Name: 'Demo', DateOnMandate: '21-05-2020', MandatePrinted: 'Demo'},
  { srNo: '3',  IFSC:  '454545', Name: 'Demo', DateOnMandate: '21-05-2020', MandatePrinted: 'Demo'},
];


columnDefs3 = [
  {headerName: 'Refrence No.', field: 'srNo' },
  {headerName: 'Customer Name', field: 'IFSC'},
  {headerName: 'A/C Number', field: 'Name'},
  {headerName: 'IFSC', field: 'DateOnMandate'},
  {headerName: 'Remark', field: 'MandatePrinted' },

 
];

rowData3 = [
  { srNo: '1', IFSC: '454545', Name: 'Demo', DateOnMandate: '21-05-2020', MandatePrinted: 'Demo'},
  { srNo: '2', IFSC: '454545', Name: 'Demo', DateOnMandate: '21-05-2020', MandatePrinted: 'Demo'},
  { srNo: '3', IFSC: '454545', Name: 'Demo', DateOnMandate: '21-05-2020', MandatePrinted: 'Demo'},
];


columnDefs4 = [
  {headerName: 'Reference No.', field: 'srNo' },
  {headerName: 'Account No.', field: 'bankname'},
  {headerName: 'Customer Name', field: 'Name'},
  {headerName: 'Description', field: 'DateOnMandate'},
 

 
];

rowData4 = [
  { srNo: '1', bankname: '454545', Name: 'Demo', DateOnMandate: '21-05-2020'},
  { srNo: '2', bankname: '454545', Name: 'Demo', DateOnMandate: '21-05-2020'},
  { srNo: '3', bankname: '454545', Name: 'Demo', DateOnMandate: '21-05-2020'},

  
];

columnDefs5 = [
  {headerName: 'Reference No.', field: 'srNo' },
  {headerName: 'Account No.', field: 'bankname'},
  {headerName: 'Customer Name', field: 'Name'},
  {headerName: 'Description', field: 'DateOnMandate'},

 
];

rowData5 = [
  { srNo: '1', bankname: '454545', Name: 'Demo', DateOnMandate: '21-05-2020'},
  { srNo: '2', bankname: '454545', Name: 'Demo', DateOnMandate: '21-05-2020'},
  { srNo: '3', bankname: '454545', Name: 'Demo', DateOnMandate: '21-05-2020'},
];

columnDefs6 = [
  {headerName: 'status', field: 'srNo' },
  {headerName: 'Reference No.', field: 'bankname'},
  {headerName: 'Customer  Name', field: 'Name'},
  {headerName: 'Account Number', field: 'DateOnMandate'},
  {headerName: 'Created by', field: 'MandatePrinted' },

 
];

rowData6 = [
  { srNo: '1', bankname: '454545', Name: 'Demo', DateOnMandate: '21-05-2020', MandatePrinted: 'Demo'},
  { srNo: '2', bankname: '454545', Name: 'Demo', DateOnMandate: '21-05-2020', MandatePrinted: 'Demo'},
  { srNo: '3', bankname: '454545', Name: 'Demo', DateOnMandate: '21-05-2020', MandatePrinted: 'Demo'},
];
columnDefs7 = [
  {headerName: 'Sr No.', field: 'srNo' },
  {headerName: 'Customer Name', field: 'bankname'},
  {headerName: 'Activity Name', field: 'Name'},
  {headerName: 'Uploaded on', field: 'DateOnMandate'},
  {headerName: 'Created by', field: 'MandatePrinted' },

 
];

rowData7 = [
  { srNo: '1', bankname: '454545', Name: 'Demo', DateOnMandate: '21-05-2020', MandatePrinted: 'Demo'},
  { srNo: '2', bankname: '454545', Name: 'Demo', DateOnMandate: '21-05-2020', MandatePrinted: 'Demo'},
  { srNo: '3', bankname: '454545', Name: 'Demo', DateOnMandate: '21-05-2020', MandatePrinted: 'Demo'},
];



columnDefs8 = [
  {headerName: 'Sr No.', field: 'srNo' },
  {headerName: 'Mandate ID', field: 'mandateid'},
  {headerName: 'Refrence No.', field: 'refrenceno'},
  {headerName: 'Customer Name', field: 'customername'},
  {headerName: 'Account Number', field: 'accountno' },
  {headerName: 'IFSC', field: 'ifsc'},
  {headerName: 'Email ID', field: 'emailid' },
  {headerName: 'Phone Number', field: 'phoneno' },
  {headerName: 'SMS Count', field: 'smscount'},
  {headerName: 'Email Count', field: 'emailcount' },

 
];

rowData8 = [
  { srNo: '1', mandateid: '454545', refrenceno: 'Demo', customername: 'Tarun', accountno: '123456789', ifsc:'Utib000361',emailid: 'yoeki@softtech.com', phoneno:'9876543210', smscount:'1', emailcount:'10'},
  { srNo: '2', mandateid: '454545', refrenceno: 'Demo', customername: 'Tarun', accountno: '123456789', ifsc:'Utib000361',emailid: 'yoeki@softtech.com', phoneno:'9876543210', smscount:'1', emailcount:'10'},
  { srNo: '3', mandateid: '454545', refrenceno: 'Demo', customername: 'Tarun', accountno: '123456789', ifsc:'Utib000361',emailid: 'yoeki@softtech.com', phoneno:'9876543210', smscount:'1', emailcount:'10'}
];
  constructor() { }

  ngOnInit(): void {
  }

}
