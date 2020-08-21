import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { AllAutoRequest,ViewAllAutoReportRequest} from '../../../Models/AllAutoRequest/AllAutoRequest';
import { AutoreportrequestService} from 'src/app/Services/AutoReportRequest/autoreportrequest.service';


@Component({
  selector: 'app-all-auto-request',
  templateUrl: './all-auto-request.component.html',
  styleUrls: ['./all-auto-request.component.css']
})

export class AllAutoRequestComponent implements OnInit {
  allAutoRequest:AllAutoRequest;
  allAutoRequest_Copy:AllAutoRequest;
  viewAllAutoReportRequest:ViewAllAutoReportRequest;
  isShowLoader:boolean;
  reportName:string;
  message:string;

  PromptMessage:string;

  columnDefs = [
    {headerName: 'Sr. No.', field: 'SrNo', width:'80'},
    // {headerName: 'Customer Name', field: 'CustomerName', width:'150'},

    {headerName: 'Customer Name', field: 'CustomerName', width: 120, cellRenderer: function(params) {
   // return '<a href="#">' + params.value + '</a>';
      return '<a href="javascript:void(0);" >'+ params.value +'</a>';
          }
    },
    {headerName: 'Customer Account', field: 'CustomerAccount', width:'150'},
    {headerName: 'Request Received On', field: 'CreatedOn', width:'200'},
    {headerName: 'Action', field: 'Action',cellRenderer: function clickNextRendererFunc(){
        return '<button type="button" class="btn btn-success">Send</button>';
      }},
      // {headerName: 'View', field: 'Action', width:'150', cellClass:'text-center',cellRenderer: function clickNextRendererFunc(){
      //   return '<button type="button" (click)="ViewClick()" class="btn btn-success">View</button>';
      // }},
  
];

rowData = [
    {  SrNo: '1', customername:'Tarun Sharma', customeraccount:'4748001000021151',  RequestSubmitOn: '17-08-2020',},
    {  SrNo: '2', customername:'Tarun Sharma', customeraccount:'4748001000021151',  RequestSubmitOn: '17-08-2020'},
    {  SrNo: '3', customername:'Tarun Sharma', customeraccount:'4748001000021151',  RequestSubmitOn: '17-08-2020'},


   
];
showModalstatemaster: boolean;
showModalsavepopup:boolean;
PromptshowModalsavepopup:boolean;

onCellClicked(event){
  debugger;
  //alert(event.data.CustomerAccount + '--' +event.data.CustomerName)
    // if (event.column.colId != "all" ) // only first column clicked
    // {
     
    // }
   
    //alert (event.column.colId);
    //event.data.PMSAccountNumber
     if (event.column.colId == "CustomerName"){
       //alert('CustomerClick');    
      // event.preventDefault();
      this.reportName="Report Request: "+event.data.CustomerName;
      this.ViewAllAutoReportRequest(event.data.CustomerAccount);
      this.showModalstatemaster = true; 
  
    }
    else  if (event.column.colId == "Action" ){  
     // alert('send buttonn click')   
      this.SendMailAllAutoReportRequest(event.data.CustomerAccount);
    }
  }


  AllAutoRequestSearch(evt: any) {
    debugger;
    let searchText = evt.target.value.toLocaleLowerCase();    
    if(searchText ===  '' || searchText === undefined || searchText === null)
    {
      this.allAutoRequest  = JSON.parse(JSON.stringify(this.allAutoRequest_Copy));
    }
    else{
      let gridArr = JSON.parse(JSON.stringify(this.allAutoRequest_Copy));
      let finalArr = [];
      gridArr.forEach(row => {

        var CustomerName = row.CustomerName;
        var CustomerAccount = row.CustomerAccount;
        var CreatedOn = row.CreatedOn;
        
        var isCustomerName = CustomerName.toLocaleLowerCase().includes(searchText) ;
        var isCustomerAccount = CustomerAccount.toLocaleLowerCase().includes(searchText) ;
        var isCreatedOn = CreatedOn.toLocaleLowerCase().includes(searchText) ;
  
       if( isCustomerName || isCustomerAccount || isCreatedOn)
        {
          finalArr.push(row);
        }
        
      });
      this.allAutoRequest  = JSON.parse(JSON.stringify(finalArr));
    }
  }
  
  SendMailAllAutoReportRequest(CustomerAccount) {
    var JsonData ={
      "CustomerAccount" : CustomerAccount
      }
    var currentContext = this;
     this.isShowLoader=true;
     this._autoreportrequestService.SendMailAllAutoReportRequest(JsonData).
         subscribe((data) => {
           if(data.Success=="1")
           {
            this.isShowLoader=false;
            this.message="Mail sent sucessfully.!";
            this.onClicksavepopup();
           }
         });
   }

  ViewAllAutoReportRequest(CustomerAccount) {
    var JsonData ={
      "CustomerAccount" : CustomerAccount
      }
    var currentContext = this;
     this.isShowLoader=true;
     this._autoreportrequestService.ViewAllAutoReportRequest(JsonData).
         subscribe((data) => {
           console.log(data);
         //  var i=0;
           if(data.Table.length >=0)
           {
           currentContext.viewAllAutoReportRequest=data.Table;
           }
           this.isShowLoader=false;
            
         });
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
          this.allAutoRequest_Copy=data.Table;
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
