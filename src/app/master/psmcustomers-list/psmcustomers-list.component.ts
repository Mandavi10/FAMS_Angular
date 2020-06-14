import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Custodian,PortFolio,LinkedPMSEmployee,PMSCustomerListDetails,PMSCustomerListCodeDetails,PMSCustomerList  } from '../../../Models/PMSCustomerList/pmsCustomerList';
import { PmsCustomerListService } from 'src/app/Services/PMSCustomerList/pms-customer-list.service';
import { UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-psmcustomers-list',
  templateUrl: './psmcustomers-list.component.html',
  styleUrls: ['./psmcustomers-list.component.css']
})
export class PSMCustomersListComponent implements OnInit {
  isShowLoader:boolean=false;
  _custodian:Custodian;_portFolio:PortFolio;_linkedPMSEmployee:LinkedPMSEmployee;_pMSCustomerListDetails:PMSCustomerListDetails;_pMSCustomerListCodeDetails;_pMSCustomerList:PMSCustomerList
  Isdiv1:boolean;
  Isdiv:boolean;
  showModalsavepopup: boolean;
  showModalSecurity: boolean;
  showModalupdatepopup:boolean;
  PMSCustomerListFormGrp:FormGroup;
  custodian:Custodian;portFolio:PortFolio;linkedPMSEmployee:LinkedPMSEmployee;pMSCustomerListDetails:PMSCustomerListDetails;pMSCustomerListCodeDetails;pMSCustomerList:PMSCustomerList
  selectedRowId:number=0;
  CustomerListId:number;
  Temp: number = 1;  loading: boolean = false;
  message: string;
  setClickedRow: Function;
  SelectionStatusOfMutants:any;
  showBackToCustomerList:boolean=false;
  showNew:boolean=true;
  showviewSecurities=true;
  columnDefs1 = [
    {headerName: 'All', field: 'all', width:'60', cellRenderer: function(){
return'<input type="checkbox" class="texBox" value="All" style="width:15px"/>'
    }},
 
  {headerName: 'Sr. No.', field: 'SrNo', width:'80'},
  {headerName: 'Custodian', field: 'CustodianCode', width:'150'},
  {headerName: 'List Code', field: 'ListCode', width:'150'},
  {headerName: ' 	Enable', field: 'Enable', width:'150'}
];

columnDefs2 = [
  {headerName: 'All', field: 'all', width:'60', cellRenderer: function(){
return'<input type="checkbox" class="texBox" value="All" style="width:15px"/>'
  }},
  {headerName: 'Sr. No.', field: 'SrNo', width:'80'},
  {headerName: 'Customer Account', field: 'CustomerAccount', width:'150'},
  {headerName: 'Customer Name', field: 'CustomerName', width:'150'},
  {headerName: ' 	Portfolio Type', field: 'PortfolioName', width:'150'},
  {headerName: 'Inception Date', field: 'InceptionDate', width:'150'},
  {headerName: 'Linked PMS Employee', field: 'EmployeeName', width:'200'}
];

rowData2= [
  {  srNo: '1', customeraccount:'474800049887',  customername: 'Tarun', portfoliotype: 'Portfolio 1',inceptiondate:'29/05/2020',  linkedpmsemployee: 'Done'},
  {  srNo: '2', customeraccount:'474800049887',  customername: 'Tarun', portfoliotype: 'Portfolio 1',inceptiondate:'29/05/2020',  linkedpmsemployee: 'Done'},
  {  srNo: '3', customeraccount:'474800049887',  customername: 'Tarun', portfoliotype: 'Portfolio 1',inceptiondate:'29/05/2020',  linkedpmsemployee: 'Done'}
];

showModalstatemaster: boolean;
    BackToCustomer(){
      this.showBackToCustomerList=false;
      this.Isdiv1=false;
      this.Isdiv=true;
      this.selectedRowId=0;
      this.showNew=true;
      this.showviewSecurities=true;
    }
    onClickviewpms(){
     
      if(this.selectedRowId!=0)
      {

        this.showBackToCustomerList=true;
        this.Isdiv1=true;
        this.Isdiv=false;
        this.BindPMSCustomerListCodeDetails(this.selectedRowId);
        this.showNew=false;
        this.showviewSecurities=false;

        this.Isdiv1=true;
        this.Isdiv=false;
        this.BindPMSCustomerListCodeDetails(this.selectedRowId);

      }
     
    }

    constructor(private formbulider: FormBuilder, private _pmsCustomerListService: PmsCustomerListService,private router: Router) {
      //  this.custodian = new Custodian();
    }

    ngOnInit(): void {
      this.Isdiv1=false;
      this.Isdiv=true;
        this.PMSCustomerListFormGrp = this.formbulider.group({         
          CustodianCode: [0,],
          ListCode: ['',],
          CustomerAccount: ['',],
          CustomerName: ['',],
          PortfolioCode: [0,],
          InceptionDate: ['', ],
          EmployeeCode: [0,],
          Enable: [false],
      });     
       debugger;
      this.BindCustodian();
      this.BindPortfolio();
      this.BindLinkedPMSEmployee();
      this.BindPMSCustomerListDetails();
     // this.BindPMSCustomerListCodeDetails();
  }
  onClickPMSEmploye(event) {
  this.showModalSecurity = true;
  }
    
  hidePMSEmploye() {
  this.showModalSecurity = false;
  }
  onClickupdatepopup() {
    this.showModalupdatepopup = true;
  }
  hideupdatepopup() {
    debugger;
   this.showModalupdatepopup = false;
  }
  onClickstatemaster(event) {
   // this.showModalSecurity = true;
   this.ResetPMSCustomerList();
   this.showModalstatemaster=true;
    //this.Isdiv=true;
  }
  
  hidestatemaster() {
    this.showModalstatemaster=false;
   //this.Isdiv=false;
  }
  onClicksavepopup() {
    this.showModalsavepopup = true;
  }
    
  hidesavepopup() {
    this.showModalsavepopup = false;
  }
  onRowSelected(event){
    debugger;
      if (event.column.colId != "all" ) // only first column clicked
      {
        this.Temp=2;
        this.showModalstatemaster = true;
        // this.PMSCustomerListFormGrp.controls['CustomerAccount'].setValue(event.data.CustomerAccount);
        // this.PMSCustomerListFormGrp.controls['CustomerName'].setValue(event.data.CustomerName);
        this.PMSCustomerListFormGrp.controls['CustodianCode'].setValue(event.data.CustodianCode);
        this.PMSCustomerListFormGrp.controls['ListCode'].setValue(event.data.ListCode);
        this.PMSCustomerListFormGrp.controls['PortfolioCode'].setValue(0);
     
        this.PMSCustomerListFormGrp.controls['Enable'].setValue(event.data.Enable =="Yes"?true:false);
        this.CustomerListId=event.data.CustomerListId;
       // event.preventDefault();
        //event.preventDefault();
        // execute the action as you want here in on click of hyperlink
      }
      else if ((event.column.colId == "all" ) && (event.node.selected) ){
                // this.errormsg='';
                // this.dsubmitbutton=true;
                // this.SelectionStatusOfMutants.push(event.data);
               // this.CustomerListId=event.data.CustomerListId;
                this.selectedRowId=event.data.CustomerListId;
      }
    }
  onSubmit() {
    debugger;
    //alert('OnSubmi Clicked');
    //this.submitted = true;
    if (this.PMSCustomerListFormGrp.valid) {
        //this.sucess=true;
        const datat = this.PMSCustomerListFormGrp.value;
        
        if (this.Temp == 1) {
          this.isShowLoader=true;
            this.AddCustomerListDetails();
            this.isShowLoader=false;
        }
        else {
          this.isShowLoader=true;
            this.UpdateCustomerListDetails();
            this.isShowLoader=false;
        }
    } else {
        this.validateAllFormFields(this.PMSCustomerListFormGrp);
    }
  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
            control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {
            this.validateAllFormFields(control);
        }
    });
  }
  isFieldValid(field: string) {
    return !this.PMSCustomerListFormGrp.get(field).valid && this.PMSCustomerListFormGrp.get(field).touched;
  }
  displayFieldCss(field: string) {
    return {
        'validate': this.isFieldValid(field),
    };
  }

  AddCustomerListDetails() {
    //debugger;
    this._pmsCustomerListService.AddCustomerListDetails(JSON.stringify(this.PMSCustomerListFormGrp.value)).subscribe(
        (data) => {
            //this._securityDetails = data;
            if (data.Result = 1) {
               // sessionStorage.setItem('ID', data.Result.toString());
               // this.message = 'Record saved Successfully';
               // alert(this.message);
               this.onClicksavepopup();
               this.hidestatemaster();
            }
            else {
                this.message = 'Invalid Credential';
                alert(this.message);
            }
            //this.EmployeeForm.reset();
            //this.loadAllDocuments();
            this.ResetPMSCustomerList();
            this.BindPMSCustomerListDetails();
        }
    )
  }
  
  UpdateCustomerListDetails() {
    this._pmsCustomerListService.UpdateCustomerListDetails(JSON.stringify(this.PMSCustomerListFormGrp.value), this.CustomerListId).subscribe(
        (data) => {
            if (data.Result = 1) {
               // this.message = 'Record updated Successfully';
               // alert(this.message);
                //this.buttonDisabledDelete = true;
                //this.buttonDisabledReset = false;
                this.onClickupdatepopup();
                this.hidestatemaster();
            }
            else {
                this.message = 'Invalid Credential';
                alert(this.message);
            }
          
            //this.EmployeeForm.reset();
            this.ResetPMSCustomerList();           
            this.BindPMSCustomerListDetails();
        }
    )
  }
  ResetPMSCustomerList() {
    this.PMSCustomerListFormGrp.reset();   
     this.PMSCustomerListFormGrp.controls['CustodianCode'].setValue(0);
     this.PMSCustomerListFormGrp.controls['PortfolioCode'].setValue(0);
     this.PMSCustomerListFormGrp.controls['EmployeeCode'].setValue(0);
     this.PMSCustomerListFormGrp.controls['ListCode'].setValue('');
     this.PMSCustomerListFormGrp.controls['CustomerAccount'].setValue('');
     this.PMSCustomerListFormGrp.controls['CustomerName'].setValue('');
     this.PMSCustomerListFormGrp.controls['InceptionDate'].setValue('');
     this.PMSCustomerListFormGrp.controls['Enable'].setValue(false);
    this.Temp = 1;
    this.CustomerListId = 0;
    this.loading = false;
    this.message = null;
   // this.BindDesignations();
  }

  // All bind work------------------------------------------------------------------------------------

  BindCustodian() {
    debugger;
    this.loading = true;
    var currentContext = this;
    this._pmsCustomerListService.BindCustodian().
        subscribe((data) => {
            currentContext.custodian = data.Table;
        });
    // console.log(sessionStorage.getItem('ID'));
    this.loading = false;
  }
  
  BindPortfolio() {
    debugger;
    this.loading = true;
    var currentContext = this;
    this._pmsCustomerListService.BindPortfolio().
        subscribe((data) => {
            currentContext.portFolio = data.Table;
        });
    // console.log(sessionStorage.getItem('ID'));
    this.loading = false;
  }
  
  BindLinkedPMSEmployee() {
    debugger;
    this.loading = true;
    var currentContext = this;
    this._pmsCustomerListService.BindLinkedPMSEmployee().
        subscribe((data) => {
            currentContext.linkedPMSEmployee = data.Table;
        });
    // console.log(sessionStorage.getItem('ID'));
    this.loading = false;
  }
  BindPMSCustomerListDetails() {
    debugger;
    this.loading = true;
    var currentContext = this;
    this._pmsCustomerListService.BindPMSCustomerListDetails().
        subscribe((data) => {
            currentContext.pMSCustomerListDetails = data.Table;
        });
    // console.log(sessionStorage.getItem('ID'));
    this.loading = false;
  }

  BindPMSCustomerListCodeDetails(CustomerListId) {
    debugger;
    this.loading = true;
    var currentContext = this;
    this._pmsCustomerListService.BindPMSCustomerListCodeDetails(CustomerListId).
        subscribe((data) => {
            currentContext.pMSCustomerListCodeDetails = data.Table;
        });
    // console.log(sessionStorage.getItem('ID'));
    this.loading = false;
  }

  private gridApi;
private gridColumnApi;

private gridApi1;
private gridColumnApi1;
getValue(inputSelector) {
  // var text = document.querySelector(inputSelector).value;
  var text = 'array';
   switch (text) {
     
     case 'array':
       return [
         // [],
         
         [
           {
             data: {
               value: 'this cell:',
               type: 'String',
             },
             mergeAcross: 1,
           },
           // {
           //   data: {
           //     value: 'is empty because the first cell has mergeAcross=1',
           //     type: 'String',
           //   },
           // },
         ],
         [],
       ];
     case 'none':
       return;
     case 'tab':
       return '\t';
     case 'true':
       return true;
     case 'none':
       return;
     default:
       return text;
   }
 }
 getParams() {
   return {
     // suppressQuotes: this.getValue('#suppressQuotes'),
     // columnSeparator: this.getValue('#columnSeparator'),
     // customHeader: this.getValue('#customHeader'),
     // customFooter: this.getValue('#customFooter'),
   };
 }
onGridReady(params) {
  debugger;
  this.gridApi = params.api;
  this.gridColumnApi = params.columnApi;
}
onGridReady1(params) {
  debugger;
  this.gridApi1 = params.api;
  this.gridColumnApi1 = params.columnApi;
}
downloadCSVFile() {
  debugger;
//var params = this.getParams();
    // if (params.suppressQuotes || params.columnSeparator) {
    //   alert(
    //     'NOTE: you are downloading a file with non-standard quotes or separators - it may not render correctly in Excel.'
    //   );
    // }



    var params = {
      columnKeys: ['SrNo','CustodianCode','ListCode',  'Enable'],
      skipHeader: false,
      skipFooters: true,
      allColumns: true,
      onlySelected: false,
      suppressQuotes: true,
      fileName: 'PMSCustomerList.csv',
      columnSeparator: ','
    };
   
    var params1 = {
      columnKeys: ['SrNo','CustomerAccount','CustomerName', 'PortfolioName','InceptionDate','EmployeeName'],
      skipHeader: false,
      skipFooters: true,
      allColumns: true,
      onlySelected: false,
      suppressQuotes: true,
      fileName: 'Customer.csv',
      columnSeparator: ','
    };
    if(this.selectedRowId==0)
    {
      this.gridApi.exportDataAsCsv(params);
    }
    else{
      this.gridApi1.exportDataAsCsv(params);
    }
    
  }
  
  }

