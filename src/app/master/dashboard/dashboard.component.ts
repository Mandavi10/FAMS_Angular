import { Component, OnInit } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  columnDefs = [
    {headerName: 'Mandate Current Status', field: 'srNo' },
    {headerName: 'Mandate ID', field: 'MandateID'},
    {headerName: 'Refrence 1', field: 'Name'},
    {headerName: 'Refrence 2', field: 'DateOnMandate'},
    {headerName: 'Customer Name', field: 'MandatePrinted' },
    {headerName: 'Phone Number', field: 'MandateScan' },
    {headerName: 'Email ID', field: 'Reference' },
    {headerName: 'UMRN', field: 'Amount' },
    {headerName: 'Accept/Reject Reason', field: 'AccountNo' },
    {headerName: 'NPCI Msg ID', field: 'IFSCMICR' },
    {headerName: 'MSG ID', field: 'BankName' },
    {headerName: 'Accept Refrence No.', field: 'Frequency' },
    {headerName: 'Created on', field: 'DebitType' },
    {headerName: 'Created by', field: 'DebitTo' },
    {headerName: 'Updated on', field: 'Createdon' },
    {headerName: 'Updated by', field: 'updatedby' },
    {headerName: 'Bank Validation on', field: 'bankvalidation' },
    {headerName: 'Account Validated on.', field: 'accountvalidation' },
    {headerName: 'Link generated on', field: 'linkgenerate' },
    {headerName: 'SMS 1 Sent on', field: 'smssent' },
    {headerName: 'SMS 1 delivered on', field: 'smsdelivered' },
    {headerName: 'SMS 1 Status', field: 'smsstatus' },
    {headerName: 'Last SMS sent on', field: 'lastsmssent'},
    {headerName: 'Last SMS delivered on', field: 'lastsmsdelivered' },
    {headerName: 'Last SMS status', field: 'lastsmsstatus' },
    {headerName: 'Email 1 sent on', field: 'emailsent' },
    {headerName: 'Last email sent on', field: 'lastemailsent' },
    {headerName: 'E-Mandate journey started on', field: 'emandatejourney' },
    {headerName: 'Registered/Rejected on', field: 'registered' },
    {headerName: 'Response received on', field: 'responserecived' },
    {headerName: 'Printed on', field: 'printedon' },
    {headerName: 'Mandate uploaded on', field: 'mandateupoloaded' },
    {headerName: 'Image downloaded on', field: 'imagedownload' },
    {headerName: 'Submitted to Bank on', field: 'submittedbank' },
    {headerName: 'Cancelled at panel on', field: 'cancelled' },
];

rowData = [
    { srNo: '1', MandateID: '454545', Name: 'Demo', DateOnMandate: '21-05-2020', MandatePrinted: 'Demo', MandateScan: 'Demo', Reference: '3555', Amount: '5852', AccountNo: '654965498465', IFSCMICR: 'HDFC000001', BankName: 'HDFC', Frequency: 'Demo', DebitType: 'Demo', DebitTo: 'Demo', Createdon: 'tarun' 
    , updatedby:'tarun', bankvalidation:'valid' , accountvalidation:'25/12/2019' , linkgenerate:'23/08/2019', smssent:'sent', smsdelivered:'Delivered', smsstatus:'Running', lastsmssent:'Sent', lastsmsdelivered:'Delivered', lastsmsstatus:'Done', emailsent:'sent', lastemailsent:'Rejected', emandatejourney:'Running', registered:'Done', responserecived :'24/2/2020', printedon:'24/03/2020', mandateupoloaded:'2/04/2020', imagedownload:'2/3/2020', submittedbank:'2/04/2020', cancelled:'20/04/2020'},
    { srNo: '1', MandateID: '454545', Name: 'Demo', DateOnMandate: '21-05-2020', MandatePrinted: 'Demo', MandateScan: 'Demo', Reference: '3555', Amount: '5852', AccountNo: '654965498465', IFSCMICR: 'HDFC000001', BankName: 'HDFC', Frequency: 'Demo', DebitType: 'Demo', DebitTo: 'Demo', Createdon: 'tarun' , updatedby:'tarun', bankvalidation:'valid' , accountvalidation:'25/12/2019' , linkgenerate:'23/08/2019', smssent:'sent', smsdelivered:'Delivered', smsstatus:'Running', lastsmssent:'Sent', lastsmsdelivered:'Delivered', lastsmsstatus:'Done', emailsent:'sent', lastemailsent:'Rejected', emandatejourney:'Running', registered:'Done', responserecived :'24/2/2020', printedon:'24/03/2020', mandateupoloaded:'2/04/2020', imagedownload:'2/3/2020', submittedbank:'2/04/2020', cancelled:'20/04/2020'}
];

  constructor() { }

  ngOnInit(): void {
  }

}
