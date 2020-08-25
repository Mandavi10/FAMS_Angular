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
    { SrNo: '2', Security: 'Security', Sector: 'Sector', FromQty: '545', ToQty: '545', Price: '5465' , Discount: '45'},
    { SrNo: '3', Security: 'Security', Sector: 'Sector', FromQty: '545', ToQty: '545', Price: '5465' , Discount: '45'},
    { SrNo: '4', Security: 'Security', Sector: 'Sector', FromQty: '545', ToQty: '545', Price: '5465' , Discount: '45'},
    { SrNo: '5', Security: 'Security', Sector: 'Sector', FromQty: '545', ToQty: '545', Price: '5465' , Discount: '45'},
    { SrNo: '6', Security: 'Security', Sector: 'Sector', FromQty: '545', ToQty: '545', Price: '5465' , Discount: '45'},
    { SrNo: '7', Security: 'Security', Sector: 'Sector', FromQty: '545', ToQty: '545', Price: '5465' , Discount: '45'},
    { SrNo: '8', Security: 'Security', Sector: 'Sector', FromQty: '545', ToQty: '545', Price: '5465' , Discount: '45'},
    { SrNo: '9', Security: 'Security', Sector: 'Sector', FromQty: '545', ToQty: '545', Price: '5465' , Discount: '45'},
    { SrNo: '10', Security: 'Security', Sector: 'Sector', FromQty: '545', ToQty: '545', Price: '5465' , Discount: '45'},
    { SrNo: '11', Security: 'Security', Sector: 'Sector', FromQty: '545', ToQty: '545', Price: '5465' , Discount: '45'},
    { SrNo: '12', Security: 'Security', Sector: 'Sector', FromQty: '545', ToQty: '545', Price: '5465' , Discount: '45'},
    

  ];


  constructor() { }

  ngOnInit() {
  }

}
