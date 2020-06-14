import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TBStructure,Parent } from '../../../Models/TBStructure/tbStructure';
import { TbstructureService } from 'src/app/Services/TBStructure/tbstructure.service';
import { UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-tbstructure',
  templateUrl: './tbstructure.component.html',
  styleUrls: ['./tbstructure.component.css']
})
export class TBstructureComponent implements OnInit {
  isShowLoader:boolean=false;
 
  showModalsavepopup: boolean;
  showModalstatemaster: boolean;
  showModalupdatepopup:boolean;
  TBStructureFormGrp:FormGroup; _tBStructure: TBStructure;tBStructure:[];custodian:[] ;tBStructureDetails: [];   country: []; parent:[]; buttonDisabledReset: boolean = false; /*buttonDisabledDelete: boolean = true;*/ submitted = false; sucess = false; Show = true;
  Temp: number = 1; TBStructureId: number = 0; loading: boolean = false;
  message: string;
  setClickedRow: Function;
  Isdiv1:boolean;
  Isdiv:boolean;
  SelectionStatusOfMutants:any;
  selectedRowId:number=0;
  showviewSecurities:boolean=true;
  
  //showModalSecurity: boolean;
  showSecurity = false;
  showGrid = true;
  showBackToSecurityList:boolean=false;
  showNew:boolean=true;
      // columnDefs = [
      //   {headerName: 'All', field: '', width: 60, cellRenderer: function() {
      //     return '<input type="checkbox" class="texBox" value="All" style="width:15px" />'} },
      //   {headerName: 'Sr. No.', field: 'SrNo', width:'80'},
      //   {headerName: 'Country', field: 'CountryName', width:'150'},
      //   {headerName: 'Custodian', field: 'CustodianName', width:'150', cellRenderer: (params) => {
      //     return ' <a  (click)="Edit(params.data.SecurityDetailsId )"></a>';}},
      //   {headerName: 'List Code', field: 'ListCode', width:'150'},
      //   {headerName: 'Name', field: 'ListName', width:'150'},
      //   {headerName: 'Active', field: 'Active', width:'150'},
      // ];
      
      columnDefs = [
        {headerName: 'All', field: '', width: 60, cellRenderer: function() {
          return '<input type="checkbox" class="texBox" value="All" style="width:15px" />'} },
        {headerName: 'Sr. No.', field: 'SrNo', width:'80'},
        {headerName: 'Country', field: 'CountryName', width:'150'},
        {headerName: 'Custodian', field: 'CustodianName', width:'150'},
        {headerName: 'List Code', field: 'ListCode', width:'150'},
        {headerName: 'Name', field: 'ListName', width:'150'},
        {headerName: 'Active', field: 'Active', width:'150'},
      ];
     
      rowData = [
        {  srNo: '1', country:'India', custodian:'Custodian 1',  listCode: '01', name: 'List Name 1', Active:'Active'},
        {  srNo: '2', country:'India', custodian:'Custodian 1',  listCode: '01', name: 'List Name 1', Active:'Active'},
        {  srNo: '3', country:'India', custodian:'Custodian 1',  listCode: '01', name: 'List Name 1', Active:'Active'},
      
      ];

      columnDefs1 = [
        {headerName: 'All', field: '', width: 60, cellRenderer: function() {
          return '<input type="checkbox" class="texBox" value="All" style="width:15px" />'} },
        {headerName: 'Sr. No.', field: 'SrNo', width:'80'},
        {headerName: 'TBHead Code', field: 'TBHeadCode', width:'150'},
        {headerName: 'TBHead Name', field: 'TBHeadName', width:'150'},
        {headerName: 'Parent Name', field: 'ParentName', width:'150'}
    ];

    rowData1 = [
        {  srNo: '1', securityCode:'SC01', securityName:'Security 1',  sector: 'Oil'},
        {  srNo: '2', securityCode:'SC02', securityName:'Security 2',  sector: 'Oil'},
        {  srNo: '3', securityCode:'SC03', securityName:'Security 3',  sector: 'Oil'},
        
    ];
    BackToSecurity(){
       this.showBackToSecurityList=false;
      this.Isdiv1 = false;
      this.Isdiv = true;
      this.selectedRowId=0;
      this.showNew=true;
      this.showviewSecurities=true;
     // this.showBackToSecurityList=true;
    }
Edit(SecurityDetailsId)
{
debugger;
//alert(SecurityDetailsId);
}
    viewSecurities(){
      debugger;
      
      if(this.selectedRowId!=0)
      {
        this.showNew=false;
        this.showBackToSecurityList=true;
        this.Isdiv1 = true;
        this.Isdiv = false;
        this.showviewSecurities=false;
       
        this.BindTBStructureDetails(this.selectedRowId);
      }
      

      //this.onClickupdatepopup();

    }
    BindTBStructureDetails(TBStructureId) {
      debugger;
      this.loading = true;
      var currentContext = this;
      this._tbstructureService.GetAllGetAllTBStructureDetailss(TBStructureId).
          subscribe((data) => {
              currentContext.tBStructureDetails = data.Table;
          });
      // console.log(sessionStorage.getItem('ID'));
      this.loading = false;
    }
    onClickPMSEmploye(event) {
      this.ResetTBStructure();
      this.showModalstatemaster = true;
      
      }
      
      hidePMSEmploye() {
      this.showModalstatemaster = false;
      }

        onClickupdatepopup() {
          this.showModalupdatepopup = true;
        }
       hideupdatepopup() {
          debugger;
         this.showModalupdatepopup = false;
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

      constructor(private router: Router,private formbulider: FormBuilder, private _tbstructureService: TbstructureService) {

        //  this.custodian = new Custodian();
        
      }

    ngOnInit(): void {
      this.router.navigate(['/Home']);
      this.router.navigate(['/TBStructure']);
        this.Isdiv1=false;
        this.Isdiv=true;
          this.TBStructureFormGrp = this.formbulider.group({
            CountryCode: [0, ],
            CustodianCode: [0,],
            ListCode: ['',],
            ListName: ['',],
            TBHeadCode: ['',],
            TBHeadName: ['',],
            ParentCode: ['',],
            Active: [false],

        });
        // this.setClickedRow = function (index) {
        //     this.selectedRow = index;
        // }
        // this.AllEmployee();
        
     debugger;

        this.loadAllCountry();
        this.loadAllParent();
        this.loadAllCustodians();
       // this.loadAllSecurityCodeDetails();
        this.loadAllTBStructure();
    }
    onRowSelected(event){
      debugger;
        if (event.column.colId != "0" ) // only first column clicked
        {
          this.Temp=2;
          this.showModalstatemaster = true;
          this.TBStructureFormGrp.controls['CountryCode'].setValue(event.data.CountryCode);
          this.TBStructureFormGrp.controls['CustodianCode'].setValue(event.data.CustodianCode);
          this.TBStructureFormGrp.controls['ListCode'].setValue(event.data.ListCode);
          this.TBStructureFormGrp.controls['ListName'].setValue(event.data.ListName);
          this.TBStructureId=event.data.TBStructureId;
         // event.preventDefault();
          //event.preventDefault();
          // execute the action as you want here in on click of hyperlink
        }
        else if ((event.column.colId == "0" ) && (event.node.selected) ){
                  // this.errormsg='';
                  // this.dsubmitbutton=true;
                  // this.SelectionStatusOfMutants.push(event.data);
                  this.selectedRowId=event.data.TBStructureId;
        }
      }
    onSubmit() {
      debugger;
      //alert('OnSubmi Clicked');
      //this.submitted = true;
      if (this.TBStructureFormGrp.valid) {
          //this.sucess=true;
          const datat = this.TBStructureFormGrp.value;
          
          if (this.Temp == 1) {
            this.isShowLoader=true;
              this.SaveTBStructure();
              this.isShowLoader=false;
          }
          else {
            this.isShowLoader=true;
              this.UpdateTBStructure();
              this.isShowLoader=false;
          }
      } else {
          this.validateAllFormFields(this.TBStructureFormGrp);
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
      return !this.TBStructureFormGrp.get(field).valid && this.TBStructureFormGrp.get(field).touched;
    }
    displayFieldCss(field: string) {
      return {
          'validate': this.isFieldValid(field),
      };
    }
   
      SaveTBStructure() {
      //debugger;
      this._tbstructureService.SaveTBStructure(JSON.stringify(this.TBStructureFormGrp.value)).subscribe(
          (data) => {
              //this._securityDetails = data;
              if (data.Result = 1) {
                 // sessionStorage.setItem('ID', data.Result.toString());
                 // this.message = 'Record saved Successfully';
                 // alert(this.message);
                 this.onClicksavepopup();
              }
              else {
                  this.message = 'Invalid Credential';
                  alert(this.message);
              }
              //this.EmployeeForm.reset();
              //this.loadAllDocuments();
              this.ResetTBStructure();
              this.hidePMSEmploye();
              this.loadAllTBStructure();
          }
      )
    }
    
    UpdateTBStructure() {
      this._tbstructureService.UpdateTBStructure(JSON.stringify(this.TBStructureFormGrp.value), this.TBStructureId).subscribe(
          (data) => {
              if (data.Result = 1) {
                 // this.message = 'Record updated Successfully';
                 // alert(this.message);
                  //this.buttonDisabledDelete = true;
                  this.buttonDisabledReset = false;
                  this.onClickupdatepopup();
              }
              else {
                  this.message = 'Invalid Credential';
                  alert(this.message);
              }
            
              //this.EmployeeForm.reset();
              this.ResetTBStructure();
              this.hidePMSEmploye();
              this.loadAllTBStructure();
          }
      )
    }
    ResetTBStructure() {
      this.TBStructureFormGrp.reset();
       this.TBStructureFormGrp.controls['CountryCode'].setValue(0);
       this.TBStructureFormGrp.controls['CustodianCode'].setValue(0);

      // this.TBStructureFormGrp.controls['SecurityCode'].setValue(0);
       this.TBStructureFormGrp.controls['ParentCode'].setValue(0);
      // this.buttonDisabledReset = false;
      //this.buttonDisabledDelete = true
      this.submitted = false;
      this.sucess = false;
      this.Show = true;
      this.Temp = 1;
      this.TBStructureId = 0;
      this.loading = false;
      this.message = null;
     // this.BindDesignations();
    }
    // createNewTask()
    // {
    //     console.log(this.newTaskForm.value)
    // }
    

    loadAllCountry() {
      debugger;
      this.loading = true;
      var currentContext = this;
      this._tbstructureService.loadAllCountry().
          subscribe((data) => {
              currentContext.country = data.Table;
          });
      // console.log(sessionStorage.getItem('ID'));
      this.loading = false;
    }
    
    loadAllParent() {
      debugger;
      this.loading = true;
      var currentContext = this;
      this._tbstructureService.loadAllParent().
          subscribe((data) => {
              currentContext.parent = data.Table;
          });
      // console.log(sessionStorage.getItem('ID'));
      this.loading = false;
    }
    
    loadAllCustodians() {
      debugger;
      this.loading = true;
      var currentContext = this;
      this._tbstructureService.GetAllCustodians().
          subscribe((data) => {
              currentContext.custodian = data.Table;
          });
      // console.log(sessionStorage.getItem('ID'));
      this.loading = false;
    }


    loadAllTBStructure() {
      debugger;
      this.loading = true;
      var currentContext = this;
      this._tbstructureService.GetAllGetAllTBStructure().
          subscribe((data) => {
              currentContext.tBStructure = data.Table;
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
var params = this.getParams();
    // if (params.suppressQuotes || params.columnSeparator) {
    //   alert(
    //     'NOTE: you are downloading a file with non-standard quotes or separators - it may not render correctly in Excel.'
    //   );
    // }
    if(this.selectedRowId==0)
    {
      this.gridApi.exportDataAsCsv(params);
    }
    else{
      this.gridApi1.exportDataAsCsv(params);
    }
    
  }
    
    }
