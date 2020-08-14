import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PMS } from '../../../Models/Custodian/custodian';
import { SchemaMaster } from '../../../Models/SchemaMaster/SchemaMaster';
import { SecurityCodeDetails,Custodian,Sector,SecurityDetails } from '../../../Models/SecurityDetails/securityDeails';
import { SchemamasterService } from 'src/app/Services/SchemaMaster/schemamaster.service';
import { UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Customer} from '../../../Models/HoldingReport/holdingReport';


@Component({
  selector: 'app-scheme-master',
  templateUrl: './scheme-master.component.html',
  styleUrls: ['./scheme-master.component.css']
})
export class SchemeMasterComponent implements OnInit {
  customer:Customer ;
  SchemaMasterId:any;
  SuccessText:string;
  showModalupdatepopup:boolean;
  showModalsavepopup:boolean;

  isShowLoader:boolean=false;

  // showModalupdatepopup:boolean;
  // showModalsavepopup:boolean;
  showModalstatemaster: boolean;
  SchemaMasterFormGrp:FormGroup; 
  _schemaMaster:SchemaMaster ;_schemaMaster_Copy:SchemaMaster ;
  _schemaDetails:SchemaMaster ;_schemaDetails_Copy:SchemaMaster ;
  
  
  custodian:[] ;pms:[];country: [];designation:[]; buttonDisabledReset: boolean = false; /*buttonDisabledDelete: boolean = true;*/ submitted = false; sucess = false; Show = true;
  Temp: number = 1; DesignationId: number = 0; loading: boolean = false;
  message: string;
  setClickedRow: Function;
  Isdiv1:boolean;
  Isdiv:boolean;
  selectedRowId:number=0;
  showBackToSchemeMaster:boolean=false;
  showNew:boolean=true;
  showviewSchemeDetails=true;
  PMSId:number;


  columnDefs = [
   
    {headerName: 'Sr.No', field: 'SrNo', width:100 },
    {headerName: 'Scheme No.', field: 'schemeno', width:150 },
    {headerName: 'Scheme Name', field: 'schemename', width:150},
    // {headerName: 'Scheme Number', field: 'SchemaNumber',width:150},
    {headerName: 'Status(Active, Expired)', field: 'Status',width:200},
    {headerName: 'Created On', field: 'Createdon', width:130},
    {headerName: 'Created By', field: 'Createdby' ,width:160},
    {headerName: 'Expired On', field: 'expiredon',width:150 },
    {headerName: 'Expired By', field: 'expiredby', width: 130},
];

rowData = [
    { SrNo: '1', schemeno: '0008765', schemename: 'Custodian', Status: '12155', Createdon: '06/08/2020',Createdby: 'Tarun Sharma' , expiredon: '06/08/2020', expiredby: 'Tarun Sharma' },
    { SrNo: '2', schemeno: '0008765', schemename: 'Custodian', Status: '12155', Createdon: '06/08/2020',Createdby: 'Tarun Sharma' , expiredon: '06/08/2020', expiredby: 'Tarun Sharma' },
    { SrNo: '3', schemeno: '0008765', schemename: 'Custodian', Status: '12155', Createdon: '06/08/2020',Createdby: 'Tarun Sharma' , expiredon: '06/08/2020', expiredby: 'Tarun Sharma' }
];

columnDefs1 = [
  {headerName: 'Sr. No.', field: 'srNo', width:'80'},
  {headerName: 'Customer Account', field: 'AccountNo', width:'150'},
  {headerName: 'User Name', field: 'UserName', width:'150'},
  {headerName: 'User Email', field: 'EmailId', width:'150'},
  
  
];

rowData1 = [
  {  srNo: '1', AccountNo:'Demo ', UserName:'Tarun',  EmailId: 'Demo'},
  {  srNo: '2', AccountNo:'Demo', UserName:'Tarun',  EmailId: 'Demo', },
  {  srNo: '3', AccountNo:'Demo', UserName:'Tarun',  EmailId: 'Demo', }
 
 
];

    // onClickupdatepopup() {
    //   this.showModalupdatepopup = true;
    // }
    // hideupdatepopup() {
    //   this.showModalupdatepopup = false;
    // }

    onClicksavepopup() {
      this.showModalsavepopup = true;
    }
    
    hidesavepopup() {
     this.showModalsavepopup = false;
    }
    onClickupdatepopup() {
      this.ResetSchemaMaster();
      this.showModalupdatepopup = true;
    }
    hideupdatepopup() {
      debugger;
      this.showModalupdatepopup = false;
    }
    onClickstatemaster(event) {
    this.ResetSchemaMaster();
    this.showModalupdatepopup = true;
    }
    
    hidestatemaster() {
     this.showModalupdatepopup = false;
    }
    
    
    constructor(private formbulider: FormBuilder, private _schemamasterService: SchemamasterService) {
    
      //  this.custodian = new Custodian();
       
    }
    
    ngOnInit(): void {
    this.Isdiv1=false;
    this.Isdiv=true;
    this.SchemaMasterFormGrp = this.formbulider.group({
      Cust_code: [0, ],
      PMSCode: [0, ],
      CustodianCode: [0,],
      SchemaNumber: ['',],
    });
    
    
    // this.setClickedRow = function (index) {
    //     this.selectedRow = index;
    // }
    // this.AllEmployee();;
    this.BindCustomers();
    this.loadAllPMS();
    this.loadAllCustodians();
    
    this.loadAllSchemaMaster();
    debugger;
    
    }

    BackToCustodian(){
      // this.showSecurity = false;
      // this.showGrid = true;
      this.Isdiv1=false;
      this.Isdiv=true;
      this.selectedRowId=0;
      this.showviewSchemeDetails=true;
        this.showNew=true;
        this.showBackToSchemeMaster=false;
    }
    onRowSelected(event){
    debugger;
      if (event.column.colId != "all" ) // only first column clicked
      {
        this.Temp=2;
        this.showModalupdatepopup = true;
        
        this.SchemaMasterFormGrp.controls['Cust_code'].setValue(event.data.CustomerCode);
        this.SchemaMasterFormGrp.controls['PMSCode'].setValue(event.data.PMSCode);
        this.SchemaMasterFormGrp.controls['CustodianCode'].setValue(event.data.CustodianCode);
        this.SchemaMasterFormGrp.controls['SchemaNumber'].setValue(event.data.SchemaNumber);

        this.SchemaMasterFormGrp.controls['Cust_code'].disable();
        this.SchemaMasterFormGrp.controls['PMSCode'].disable();
        this.SchemaMasterFormGrp.controls['CustodianCode'].disable();
        //this.SchemaMasterFormGrp.controls['SchemaNumber'].disable();
       
        this.SchemaMasterId=event.data.SchemaMasterId;
       // event.preventDefault();
        //event.preventDefault();
        // execute the action as you want here in on click of hyperlink
      }
      else if ((event.column.colId == "all" ) && (event.node.selected) ){
                // this.errormsg='';
                // this.dsubmitbutton=true;
                // this.SelectionStatusOfMutants.push(event.data);
               // this.selectedRowId=event.data.Designation;
               this.selectedRowId=event.data.SchemaMasterId;
      }
    }

    onClickviewSchemaDetails(){
        if(this.selectedRowId != 0)
        {
          this.showBackToSchemeMaster=true;
          this.Isdiv1=true;
          this.Isdiv=false;
          this.BindSchemeDetails(this.selectedRowId);
          this.showviewSchemeDetails=false;
          this.showNew=false;
        }
        else
        {
          this.SuccessText="Please select scheme !";
          this.onClicksavepopup();
        }
      }
      BindSchemeDetails(SchemeMasterId) {
        debugger;
        this.loading = true;
        var currentContext = this;
        this._schemamasterService.BindSchemeDetails(SchemeMasterId).
            subscribe((data) => {
                currentContext._schemaDetails = data.Table;
                this._schemaDetails_Copy=data.Table;
            });
        // console.log(sessionStorage.getItem('ID'));
        this.loading = false;
      }
    BindCustomers() {
      // this.loading = true;
       var currentContext = this;
       //let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
       this._schemamasterService.BindCustomer().
           subscribe((data) => {
               currentContext.customer = data.Table;
               
           });
       // console.log(sessionStorage.getItem('ID'));
      // this.loading = false;
     }
    SchemeMasterSearch(evt: any) {
      debugger;
      let searchText = evt.target.value.toLocaleLowerCase();    
      if(searchText ===  '' || searchText === undefined || searchText === null)
      {
        this._schemaMaster  = JSON.parse(JSON.stringify(this._schemaMaster_Copy));
       
      }
      else{
        let gridArr = JSON.parse(JSON.stringify(this._schemaMaster_Copy));
        let finalArr = [];
        gridArr.forEach(row => {
          var CustomerName = row.CustomerName.toLocaleLowerCase();
          var PMSName = row.PMSName.toLocaleLowerCase();
          var CustodianName = row.CustodianName.toLocaleLowerCase();

          var isPMSName = PMSName.includes(searchText) ;
          var isCustodianName = CustodianName.includes(searchText);
          var isCustomerName = CustomerName.includes(searchText);

         if( isPMSName || isCustodianName || isCustomerName)
          {
            finalArr.push(row);
          }
        });
        this._schemaMaster  = JSON.parse(JSON.stringify(finalArr));
      }
    }
    


    SchemeDetailsSearch(evt: any) {
      debugger;
      let searchText = evt.target.value.toLocaleLowerCase();    
      if(searchText ===  '' || searchText === undefined || searchText === null)
      {
        this._schemaDetails  = JSON.parse(JSON.stringify(this._schemaDetails_Copy));
       
      }
      else{
        let gridArr = JSON.parse(JSON.stringify(this._schemaDetails_Copy));
        let finalArr = [];
        gridArr.forEach(row => {
          var SchemaNumber = row.SchemaNumber.toLocaleLowerCase();
          var isSchemaNumber = SchemaNumber.includes(searchText);

         if( isSchemaNumber)
          {
            finalArr.push(row);
          }
        });
        this._schemaDetails  = JSON.parse(JSON.stringify(finalArr));
      }
    }
    
    onSubmit() {
    debugger;
    //alert('OnSubmi Clicked');
    //this.submitted = true;
    if (this.SchemaMasterFormGrp.valid) {
      //this.sucess=true;
      const datat = this.SchemaMasterFormGrp.value;
      
      if (this.Temp == 1) {
        this.isShowLoader=true;
          this.SaveSchemaMaster();
          // this.isShowLoader=false;
      }
      else {
        this.isShowLoader=true;
          this.UpdateSchemaMaster();
          // this.isShowLoader=false;
      }
    } else {
      this.validateAllFormFields(this.SchemaMasterFormGrp);
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
    return !this.SchemaMasterFormGrp.get(field).valid && this.SchemaMasterFormGrp.get(field).touched;
    }
    displayFieldCss(field: string) {
    return {
      'validate': this.isFieldValid(field),
    };
    }
    
    SaveSchemaMaster() {
    //debugger;
    this._schemamasterService.SaveSchemaMaster(JSON.stringify(this.SchemaMasterFormGrp.value)).subscribe(
      (data) => {
          this._schemaMaster = data;
          if (this._schemaMaster.Result = 1) {
             // sessionStorage.setItem('ID', this._custodian.Result.toString());
             // this.message = 'Record saved Successfully';
             // alert(this.message);
             this.isShowLoader=false;
             this.SuccessText="Record saved Successfully";
              this.onClicksavepopup();
              
          }
          else {
              // this.message = 'Invalid Credential';
              // alert(this.message);
              this.isShowLoader=false;

              this.SuccessText="Invalid Credential";
              this.onClicksavepopup();
          }
          //this.EmployeeForm.reset();
          this.loadAllSchemaMaster();
          this.ResetSchemaMaster();
          this.hidestatemaster();
          
      }
    )
    }
    
    UpdateSchemaMaster() {
    this._schemamasterService.UpdateSchemaMaster(JSON.stringify(this.SchemaMasterFormGrp.value), this.SchemaMasterId).subscribe(
      (data) => {
          if (data.Result = 1) {
              //this.message = 'Record updated Successfully';
             // alert(this.message);
              //this.buttonDisabledDelete = true;
             // this.buttonDisabledReset = false;
             // this.onClickupdatepopup();
             // this.onClickupdatepopup();
             this.isShowLoader=false;
             this.SuccessText="Record updated Successfully";
              this.onClickupdatepopup();
          }
          else {
              // this.message = 'Invalid Credential';
              // alert(this.message);
              this.isShowLoader=false;
              this.SuccessText="Invalid Credential";
              this.onClickupdatepopup();
          }
        
          //this.EmployeeForm.reset();
          this.ResetSchemaMaster();
          this.hidestatemaster();
          this.loadAllSchemaMaster();
      }
    )
    }
    ResetSchemaMaster() {
    this.SchemaMasterFormGrp.reset();
    this.SchemaMasterFormGrp.controls['Cust_code'].enable();
        this.SchemaMasterFormGrp.controls['PMSCode'].enable();
        this.SchemaMasterFormGrp.controls['CustodianCode'].enable();
    this.SchemaMasterFormGrp.controls['Cust_code'].setValue(0);
    this.SchemaMasterFormGrp.controls['PMSCode'].setValue(0);
    this.SchemaMasterFormGrp.controls['CustodianCode'].setValue(0);
    // this.buttonDisabledReset = false;
    //this.buttonDisabledDelete = true
    this.submitted = false;
    this.sucess = false;
    this.Show = true;
    this.Temp = 1;
    this.PMSId = 0;
    this.loading = false;
    this.message = null;
    // this.BindPMSMasters();
    }
    // createNewTask()
    // {
    //     console.log(this.newTaskForm.value)
    // }
    loadAllPMS() {
      debugger;
      this.loading = true;
      var currentContext = this;
      this._schemamasterService.loadAllPMS().
          subscribe((data) => {
              currentContext.pms = data.Table;
          });
      // console.log(sessionStorage.getItem('ID'));
      this.loading = false;
    }
    loadAllCustodians() {
      debugger;
      this.loading = true;
      var currentContext = this;
      this._schemamasterService.GetAllCustodians().
          subscribe((data) => {
              currentContext.custodian = data.Table;
          });
      // console.log(sessionStorage.getItem('ID'));
      this.loading = false;
    }
    loadAllSchemaMaster() {
    debugger;
    this.loading = true;
    var currentContext = this;
    this._schemamasterService.loadAllSchemaMaster().
      subscribe((data) => {
          currentContext._schemaMaster = data.Table;
          this._schemaMaster_Copy=JSON.parse(JSON.stringify(data.Table)) ;
         // this.bindMastergrid_Copy = JSON.parse(JSON.stringify(res.Table)) ;
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
          columnKeys: ['SrNo','PMSName','CustodianName', 'SchemaNumber','CustomerName','CreatedBy','CreatedOn','UpdatedBy','UpdatedOn'],
          skipHeader: false,
          skipFooters: true,
          allColumns: true,
          onlySelected: false,
          suppressQuotes: true,
          fileName: 'SchemeMaster.csv',
          columnSeparator: ','
        };
        var params1 = {
          columnKeys: ['SrNo','PMSName','CustodianName', 'SchemaNumber','CustomerName'],
          skipHeader: false,
          skipFooters: true,
          allColumns: true,
          onlySelected: false,
          suppressQuotes: true,
          fileName: 'SchemeMasterDetails.csv',
          columnSeparator: ','
        };
        //this.gridApi.exportDataAsCsv(params);
        if(this.selectedRowId==0)
    {
      this.gridApi.exportDataAsCsv(params);
    }
    else{
      this.gridApi1.exportDataAsCsv(params1);
    }
      }
    
    }
    
    