import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pms-master',
  templateUrl: './pms-master.component.html',
  styleUrls: ['./pms-master.component.css']
})
export class PmsMasterComponent implements OnInit {

  showModalupdatepopup:boolean;

  columnDefs = [
    {headerName: 'Sr. No.', field: 'srNo', width:70 },
    {headerName: 'PMS Code', field: 'PMSCode', width:150 },
    {headerName: 'PMS Name', field: 'PMSName', width:150},
    {headerName: 'Account Number', field: 'AccountNumber',width:150},
   
];

rowData = [
    { srNo: '1', PMSCode: '6566', PMSName: 'Vishal', AccountNumber: '1215516446546'}
   
  
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
