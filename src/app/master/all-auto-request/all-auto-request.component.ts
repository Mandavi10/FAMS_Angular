import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { AllAutoRequest} from '../../../Models/AllAutoRequest/AllAutoRequest';
import { AutoreportrequestService} from 'src/app/Services/AutoReportRequest/autoreportrequest.service';


@Component({
  selector: 'app-all-auto-request',
  templateUrl: './all-auto-request.component.html',
  styleUrls: ['./all-auto-request.component.css']
})

export class AllAutoRequestComponent implements OnInit {
  allAutoRequest:AllAutoRequest;
  isShowLoader:boolean;
  columnDefs = [
    {headerName: 'Sr. No.', field: 'SrNo', width:'80'},
    {headerName: 'Customer Name', field: 'CustomerName', width:'150'},
    {headerName: 'Customer Account', field: 'CustomerAccount', width:'150'},
    {headerName: 'Request Received On', field: 'CreatedOn', width:'150'},
    {headerName: 'Action', field: 'Action', width:'150', cellClass:'text-center',cellRenderer: function clickNextRendererFunc(){
        return '<button type="button" class="btn btn-success">Send</button>';
      }},
      {headerName: 'View', field: 'Action', width:'150', cellClass:'text-center',cellRenderer: function clickNextRendererFunc(){
        return '<button type="button" (click)="ViewClick()" class="btn btn-success">View</button>';
      }},
  
];

rowData = [
    {  SrNo: '1', customername:'Tarun Sharma', customeraccount:'4748001000021151',  RequestSubmitOn: '17-08-2020',},
    {  SrNo: '2', customername:'Tarun Sharma', customeraccount:'4748001000021151',  RequestSubmitOn: '17-08-2020'},
    {  SrNo: '3', customername:'Tarun Sharma', customeraccount:'4748001000021151',  RequestSubmitOn: '17-08-2020'},


   
];
showModalstatemaster: boolean;
showModalsavepopup:boolean;

onRowSelected(event){
  debugger;
    // if (event.column.colId != "all" ) // only first column clicked
    // {
     
    // }
     if ((event.column.colId == "View" ) && (event.node.selected) ){
         
    }
  }
  

BindAllAutoReportRequest() {
  var currentContext = this;
   this.isShowLoader=true;
   this._autoreportrequestService.BindAllAutoReportRequest().
       subscribe((data) => {
         this.isShowLoader=false;
         console.log(data);
         var i=0;
         if(data.Table.length >=0)
         {
          this.allAutoRequest = data.Table;
         }
          
       });
 }
onClickstatemaster(event) {
 
  this.showModalstatemaster = true;
  }
  
  hidestatemaster() {
   this.showModalstatemaster = false;
  }
  
onClicksavepopup() {
  this.showModalsavepopup = true;
}

hidesavepopup() {
 this.showModalsavepopup = false;
}
  constructor(private _autoreportrequestService: AutoreportrequestService) { }

  ngOnInit(): void {
    debugger;
    this.BindAllAutoReportRequest();

  }

}
