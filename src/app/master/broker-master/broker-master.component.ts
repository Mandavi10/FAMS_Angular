import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-broker-master',
  templateUrl: './broker-master.component.html',
  styleUrls: ['./broker-master.component.css']
})
export class BrokerMasterComponent implements OnInit {

  columnDefs = [
    {headerName: 'Sr. No.', field: 'srNo', width:70 },
    {headerName: 'Broker Name', field: 'brokername', width:150 },
    {headerName: 'Trade Name', field: 'tradename', width:150},
    {headerName: 'Registration No.', field: 'registrationno',width:150},
    {headerName: 'GST No.', field: 'gstno', width:130},
    {headerName: 'Stock Exchange Name', field: 'stockexchangename' ,width:160},
    {headerName: 'Email', field: 'email',width:150 },
    {headerName: 'Telephone', field: 'telephone', width: 130},
];

rowData = [
    { srNo: '1', brokername: 'Tarun Sharma', tradename: 'Axis Bank', registrationno: '12155', gstno: 'GST-00038373338',stockexchangename: 'BSE' , email: 'ankush@yoekisoft.com', telephone: '+919295678909' },
    { srNo: '1', brokername: 'Tarun Sharma', tradename: 'Axis Bank', registrationno: '12166', gstno: 'GST-00038373338',stockexchangename: 'BSE' , email: 'ankush@yoekisoft.com', telephone: '+919295678909' },
    { srNo: '1', brokername: 'Tarun Sharma', tradename: 'Axis Bank', registrationno: '12177', gstno: 'GST-00038373338',stockexchangename: 'BSE' , email: 'ankush@yoekisoft.com', telephone: '+919295678909' }
];






showModalBrokermaster: boolean;

  onClickBrokermaster(event) {
    this.showModalBrokermaster = true;
    
    }
    
    hideBrokermaster() {
    this.showModalBrokermaster = false;
    }


  constructor() { }

  ngOnInit(): void {
  }

}
