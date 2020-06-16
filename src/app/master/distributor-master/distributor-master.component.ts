import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-distributor-master',
  templateUrl: './distributor-master.component.html',
  styleUrls: ['./distributor-master.component.css']
})
export class DistributorMasterComponent implements OnInit {
  columnDefs = [
    {headerName: 'Sr. No.', field: 'srNo', width: 80 },
    {headerName: 'Distributor Name', field: 'distributorname', width: 200 },
    {headerName: 'Address', field: 'address', width: 200},
    {headerName: 'PAN', field: 'pan', width: 130},
    {headerName: 'GST', field: 'gst', width: 130} ,
    {headerName: 'TAN', field: 'tan', width: 130},
    {headerName: 'Relationship Manager', field: 'relationmanager', width: 200}   
];

rowData = [
    { srNo: '1', distributorname: 'Tarun', address: 'Noida', pan: 'IFMPS6789A', gst: '10000653454354', tan: 'IFMPS56990', relationmanager: 'Ankush' },
    { srNo: '1', distributorname: 'Tarun', address: 'Noida', pan: 'IFMPS6789A', gst: '10000653454354', tan: 'IFMPS56990', relationmanager: 'Ankush' },
    { srNo: '1', distributorname: 'Tarun', address: 'Noida', pan: 'IFMPS6789A', gst: '10000653454354', tan: 'IFMPS56990', relationmanager: 'Ankush' },
];




  showModalstatemaster: boolean;

  onClickstatemaster(event) {
    this.showModalstatemaster = true;
    
    }
    
    hidestatemaster() {
    this.showModalstatemaster = false;
    }


  constructor() { }

  ngOnInit(): void {
  }

}