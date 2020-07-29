import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css']
})
export class TestPageComponent implements OnInit {
  showModalupdatepopup:boolean;

  columnDefs = [
    {headerName: 'Sr. No.', field: 'srNo', width:70 },
    {headerName: 'Broker Name', field: 'BrokerName', width:150 },
    {headerName: 'Trade Name', field: 'TradeName', width:150},
    {headerName: 'Registration No.', field: 'RegistrationNo',width:150},
    {headerName: 'GST No.', field: 'GSTNo', width:130},
    {headerName: 'Stock Exchange Name', field: 'StockExchangeName' ,width:160},
    {headerName: 'Email', field: 'Email',width:150 },
    {headerName: 'Telephone', field: 'Telephone', width: 130},
];

rowData = [
    { srNo: '1', BrokerName: 'XYZ', TradeName: 'Axis Bank', RegistrationNo: '12155', GSTNo: 'GST-00038373338',StockExchangeName: 'BSE' , Email: 'ankush@yoekisoft.com', Telephone: '+919295678909' },
    { srNo: '1', BrokerName: 'XYZ', TradeName: 'Axis Bank', RegistrationNo: '12166', GSTNo: 'GST-00038373338',StockExchangeName: 'BSE' , Email: 'ankush@yoekisoft.com', Telephone: '+919295678909' },
    { srNo: '1', BrokerName: 'XYZ', TradeName: 'Axis Bank', RegistrationNo: '12177', GSTNo: 'GST-00038373338',StockExchangeName: 'BSE' , Email: 'ankush@yoekisoft.com', Telephone: '+919295678909' }
];

onClickupdatepopup() {
      this.showModalupdatepopup = true;
    }
    hideupdatepopup() {
      this.showModalupdatepopup = false;
    }

  constructor() { }

  ngOnInit() {
  }

}
