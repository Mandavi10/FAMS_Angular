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


@Component({
  selector: 'app-scheme-master',
  templateUrl: './scheme-master.component.html',
  styleUrls: ['./scheme-master.component.css']
})
export class SchemeMasterComponent implements OnInit {
  SchemaMasterId:any;
  SuccessText:string;
  showModalupdatepopup:boolean;
  showModalsavepopup:boolean;

  isShowLoader:boolean=false;

  // showModalupdatepopup:boolean;
  // showModalsavepopup:boolean;
  showModalstatemaster: boolean;
  SchemaMasterFormGrp:FormGroup; _schemaMaster:SchemaMaster ;custodian:[] ;pms:[];country: [];designation:[]; buttonDisabledReset: boolean = false; /*buttonDisabledDelete: boolean = true;*/ submitted = false; sucess = false; Show = true;
  Temp: number = 1; DesignationId: number = 0; loading: boolean = false;
  message: string;
  setClickedRow: Function;
  Isdiv1:boolean;
  Isdiv:boolean;
  selectedRowId:number=0;
  showBackToCustodian:boolean=false;
  showNew:boolean=true;
  PMSId:number;

  columnDefs = [
    {headerName: 'Sr.No', field: 'SrNo', width:100 },
    {headerName: 'PMS Name', field: 'PMSName', width:150 },
    {headerName: 'Custodian Name', field: 'CustodianName', width:150},
    {headerName: 'Scheme Number', field: 'SchemaNumber',width:150},
    {headerName: 'Created By', field: 'CreatedBy', width:130},
    {headerName: 'Created On', field: 'CreatedOn' ,width:160},
    {headerName: 'Updated By', field: 'UpdatedBy',width:150 },
    {headerName: 'Updated On', field: 'UpdatedOn', width: 130},
];

rowData = [
    { srNo: '1', PMSName: 'Vishal', Custodian: 'Custodian', SchemeNumber: '12155', createdby: 'Vishal',createdon: '06/08/2020' , UpdatedBy: 'Vishal', UpdatedOn: '06/08/2020' }
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
      PMSCode: [0, ],
      CustodianCode: [0,],
      SchemaNumber: ['',],
    });
    
    
    // this.setClickedRow = function (index) {
    //     this.selectedRow = index;
    // }
    // this.AllEmployee();
    this.loadAllPMS();
    this.loadAllCustodians();
    
    this.loadAllSchemaMaster();
    debugger;
    
    }
    onRowSelected(event){
    debugger;
      if (event.column.colId != "all" ) // only first column clicked
      {
        this.Temp=2;
        this.showModalupdatepopup = true;
        this.SchemaMasterFormGrp.controls['PMSCode'].setValue(event.data.PMSCode);
        this.SchemaMasterFormGrp.controls['CustodianCode'].setValue(event.data.CustodianCode);
        this.SchemaMasterFormGrp.controls['SchemaNumber'].setValue(event.data.SchemaNumber);
       
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
      });
    // console.log(sessionStorage.getItem('ID'));
    this.loading = false;
    }
    
    private gridApi;
    private gridColumnApi;
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
    downloadCSVFile() {
      debugger;
    //var params = this.getParams();
        // if (params.suppressQuotes || params.columnSeparator) {
        //   alert(
        //     'NOTE: you are downloading a file with non-standard quotes or separators - it may not render correctly in Excel.'
        //   );
        // }
        var params = {
          skipHeader: false,
          skipFooters: true,
          allColumns: true,
          onlySelected: false,
          suppressQuotes: true,
          fileName: 'SchemeMaster.csv',
          columnSeparator: ','
        };
        this.gridApi.exportDataAsCsv(params);
      }
    
    }
    
    