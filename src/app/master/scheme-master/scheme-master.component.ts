import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scheme-master',
  templateUrl: './scheme-master.component.html',
  styleUrls: ['./scheme-master.component.css']
})
export class SchemeMasterComponent implements OnInit {
  showModalupdatepopup:boolean;

  columnDefs = [
    {headerName: 'Sr. No.', field: 'srNo', width:70 },
    {headerName: 'PMS Name', field: 'PMSName', width:150 },
    {headerName: 'Custodian', field: 'Custodian', width:150},
    {headerName: 'Scheme Number', field: 'SchemeNumber',width:150},
    {headerName: 'Created By', field: 'createdby', width:130},
    {headerName: 'Created On', field: 'createdon' ,width:160},
    {headerName: 'Updated By', field: 'UpdatedBy',width:150 },
    {headerName: 'Updated On', field: 'UpdatedOn', width: 130},
];

rowData = [
    { srNo: '1', PMSName: 'Vishal', Custodian: 'Custodian', SchemeNumber: '12155', createdby: 'Vishal',createdon: '06/08/2020' , UpdatedBy: 'Vishal', UpdatedOn: '06/08/2020' }
   
  
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
