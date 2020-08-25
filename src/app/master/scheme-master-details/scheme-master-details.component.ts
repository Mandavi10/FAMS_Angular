import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scheme-master-details',
  templateUrl: './scheme-master-details.component.html',
  styleUrls: ['./scheme-master-details.component.css']
})
export class SchemeMasterDetailsComponent implements OnInit {
  columnDefs = [
   
    {headerName: 'Sr.No', field: 'SrNo', width:100},
    {headerName: 'Security', field: 'Security', width:150, editable: true  },
    {headerName: 'Sector', field: 'Sector', width:150, editable: true },
    {headerName: 'From Qty', field: 'FromQty',width:100, editable: true },
    {headerName: 'To Qty', field: 'ToQty', width:80, editable: true },
    {headerName: 'Price', field: 'Price' ,width:130, cellClass: 'price', headerClass: 'price', editable: true },
    {headerName: 'Discount', field: 'Discount',width:150, editable: true  },

];

rowData = [
    { SrNo: '1', Security: 'Security', Sector: 'Sector', FromQty: '545', ToQty: '545', Price: '5465' , Discount: '45'},
   

  ];


  constructor() { }

  ngOnInit() {
  }

}
