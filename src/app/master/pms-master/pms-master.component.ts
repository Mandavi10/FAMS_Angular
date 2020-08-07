import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PMSMaster } from '../../../Models/PMSMaster/PMSMaster';
import { PmsmasterService } from 'src/app/Services/PMSMaster/pmsmaster.service';
import { UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-pms-master',
  templateUrl: './pms-master.component.html',
  styleUrls: ['./pms-master.component.css']
})
export class PmsMasterComponent implements OnInit {
  SuccessText:string;
  showModalupdatepopup:boolean;
  showModalsavepopup:boolean;

  isShowLoader:boolean=false;

  // showModalupdatepopup:boolean;
  // showModalsavepopup:boolean;
  showModalstatemaster: boolean;
  PMSMasterFormGrp:FormGroup; _pmsMaster:PMSMaster ;country: [];designation:[]; buttonDisabledReset: boolean = false; /*buttonDisabledDelete: boolean = true;*/ submitted = false; sucess = false; Show = true;
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
    {headerName: 'Sr. No.', field: 'SrNo', width:70 },
    {headerName: 'PMS Code', field: 'PMSCode', width:150 },
    {headerName: 'PMS Name', field: 'PMSName', width:150},
    {headerName: 'Account Number', field: 'PMSAccountNumber',width:150},
    {headerName: 'Created By', field: 'CreatedBy', width:130},
    {headerName: 'Created On', field: 'CreatedOn' ,width:160},
    {headerName: 'Updated By', field: 'UpdatedBy',width:150 },
    {headerName: 'Updated On', field: 'UpdatedOn', width: 130}
   
];

rowData = [
    { srNo: '1', PMSCode: '6566', PMSName: 'Vishal', AccountNumber: '1215516446546'}
   
  
];

    // onClickupdatepopup() {
    //   this.showModalupdatepopup = true;
    // }
    // hidesavepopup() {
    //   this.showModalsavepopup = false;
    //  }
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
      this.ResetPMSMaster();
      this.showModalupdatepopup = true;
    }
    hideupdatepopup() {
      debugger;
      this.showModalupdatepopup = false;
    }
    onClickstatemaster(event) {
    this.ResetPMSMaster();
    this.showModalupdatepopup = true;
    }
    
    hidestatemaster() {
     this.showModalupdatepopup = false;
    }
    
    
    constructor(private formbulider: FormBuilder, private _pmsmasterService: PmsmasterService) {
    
      //  this.custodian = new Custodian();
       
    }
    
    ngOnInit(): void {
    this.Isdiv1=false;
    this.Isdiv=true;
    this.PMSMasterFormGrp = this.formbulider.group({
      PMSCode: ['', ],
      PMSName: ['',],
      PMSAccountNumber: ['',],
    });
    
    
    // this.setClickedRow = function (index) {
    //     this.selectedRow = index;
    // }
    // this.AllEmployee();
    
    this.loadAllPMSMaster();
    debugger;
    
    }
    onRowSelected(event){
    debugger;
      if (event.column.colId != "all" ) // only first column clicked
      {
        this.Temp=2;
        this.showModalupdatepopup = true;
        this.PMSMasterFormGrp.controls['PMSCode'].setValue(event.data.PMSCode);
        this.PMSMasterFormGrp.controls['PMSName'].setValue(event.data.PMSName);
        this.PMSMasterFormGrp.controls['PMSAccountNumber'].setValue(event.data.PMSAccountNumber);
       
        this.PMSId=event.data.PMSId;
       // event.preventDefault();
        //event.preventDefault();
        // execute the action as you want here in on click of hyperlink
      }
      else if ((event.column.colId == "all" ) && (event.node.selected) ){
                // this.errormsg='';
                // this.dsubmitbutton=true;
                // this.SelectionStatusOfMutants.push(event.data);
               // this.selectedRowId=event.data.Designation;
               this.selectedRowId=event.data.PMSId;
      }
    }
    
    
    onSubmit() {
    debugger;
    //alert('OnSubmi Clicked');
    //this.submitted = true;
    if (this.PMSMasterFormGrp.valid) {
      //this.sucess=true;
      const datat = this.PMSMasterFormGrp.value;
      
      if (this.Temp == 1) {
        this.isShowLoader=true;
          this.SavePMSMaster();
          // this.isShowLoader=false;
      }
      else {
        this.isShowLoader=true;
          this.UpdatePMSMaster();
          // this.isShowLoader=false;
      }
    } else {
      this.validateAllFormFields(this.PMSMasterFormGrp);
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
    return !this.PMSMasterFormGrp.get(field).valid && this.PMSMasterFormGrp.get(field).touched;
    }
    displayFieldCss(field: string) {
    return {
      'validate': this.isFieldValid(field),
    };
    }
    
    SavePMSMaster() {
    //debugger;
    this._pmsmasterService.SavePMSMaster(JSON.stringify(this.PMSMasterFormGrp.value)).subscribe(
      (data) => {
          this._pmsMaster = data;
          if (this._pmsMaster.Result = 1) {
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
          this.loadAllPMSMaster();
          this.ResetPMSMaster();
          this.hidestatemaster();
          
      }
    )
    }
    
    UpdatePMSMaster() {
    this._pmsmasterService.UpdatePMSMaster(JSON.stringify(this.PMSMasterFormGrp.value), this.PMSId).subscribe(
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
          this.ResetPMSMaster();
          this.hidestatemaster();
          this.loadAllPMSMaster();
      }
    )
    }
    ResetPMSMaster() {
    this.PMSMasterFormGrp.reset();
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
    loadAllPMSMaster() {
    debugger;
    this.loading = true;
    var currentContext = this;
    this._pmsmasterService.loadAllPMSMaster().
      subscribe((data) => {
          currentContext._pmsMaster = data.Table;
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
          fileName: 'PMSMaster.csv',
          columnSeparator: ','
        };
        this.gridApi.exportDataAsCsv(params);
      }
    
    }
    
    