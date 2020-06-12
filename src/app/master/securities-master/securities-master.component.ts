import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SecurityCodeDetails,Country,Custodian,Sector,SecurityDetails } from '../../../Models/SecurityDetails/securityDeails';
import { SecurityDetailsService } from 'src/app/Services/Security/security-details.service';
import { UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-securities-master',
  templateUrl: './securities-master.component.html',
  styleUrls: ['./securities-master.component.css']
})
export class SecuritiesMasterComponent implements OnInit {
  showModalsavepopup: boolean;
  showModalSecurity: boolean;
  showModalupdatepopup:boolean;
  SecurityFormGrp:FormGroup; _securityDetails: SecurityDetails;securityCodeDetails:[];custodian:[] ;securityDetails: []; security:[]; securityCodeDet:[]; country: []; sector:[]; buttonDisabledReset: boolean = false; /*buttonDisabledDelete: boolean = true;*/ submitted = false; sucess = false; Show = true;
  Temp: number = 1; SecurityDetId: number = 0; loading: boolean = false;
  message: string;
  setClickedRow: Function;
  Isdiv1:boolean;
  Isdiv:boolean;
  SelectionStatusOfMutants:any;
  selectedRowId:number=0;
  showBackToSecurityList:boolean=false;
  //showModalSecurity: boolean;
  showSecurity = false;
  showGrid = true;
  showviewSecurities=true;
  // showBackToSecurityList:boolean=false;
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
        {headerName: 'Security Code', field: 'SecurityCode', width:'150'},
        {headerName: 'Security Name', field: 'SecurityName', width:'150'},
        {headerName: 'Sector', field: 'SectorCode', width:'150'}
    ];

    rowData1 = [
        {  srNo: '1', securityCode:'SC01', securityName:'Security 1',  sector: 'Oil'},
        {  srNo: '2', securityCode:'SC02', securityName:'Security 2',  sector: 'Oil'},
        {  srNo: '3', securityCode:'SC03', securityName:'Security 3',  sector: 'Oil'},
        
    ];
    BackToSecurity(){
      this.showBackToSecurityList=false;
      this.showSecurity = false;
      this.showGrid = true;
      this.selectedRowId=0;
      this.showNew=true;
      this.showviewSecurities=true;
    }
Edit(SecurityDetailsId)
{
debugger;
//alert(SecurityDetailsId);
}
    viewSecurities(){
      
      if(this.selectedRowId!=0)
      {

        this.showNew=false;
        this.showviewSecurities=false;
        this.showBackToSecurityList=true;
        this.showSecurity = true;
        this.showGrid = false;

        this.showSecurity = true;
      this.showGrid = false;

        this.BindSecurity(this.selectedRowId);
      }
      

      //this.onClickupdatepopup();

    }
    BindSecurity(SecurityDetailsId) {
      debugger;
      this.loading = true;
      var currentContext = this;
      this._securityDetailsService.BindSecurity(SecurityDetailsId).
          subscribe((data) => {
              currentContext.security = data.Table;
          });
      // console.log(sessionStorage.getItem('ID'));
      this.loading = false;
    }
    onClickPMSEmploye(event) {
      this.ResetSecurity();
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
          this.showModalSecurity = true;
        }
        
        hidestatemaster() {
          this.showModalSecurity = false;
        }
        onClicksavepopup() {
          this.showModalsavepopup = true;
        }
          
        hidesavepopup() {
          this.showModalsavepopup = false;
        }

      constructor(private formbulider: FormBuilder, private _securityDetailsService: SecurityDetailsService) {

        //  this.custodian = new Custodian();
        
      }

    ngOnInit(): void {
        this.Isdiv1=false;
        this.Isdiv=true;
          this.SecurityFormGrp = this.formbulider.group({
            CountryCode: [0, ],
            CustodianCode: [0,],
            ListCode: ['',],
            ListName: ['',],
            SecurityCode: ['',],
            SectorCode: [0,],
            SecurityName: ['',],
            Active: [false],

        });
        // this.setClickedRow = function (index) {
        //     this.selectedRow = index;
        // }
        // this.AllEmployee();
        
     debugger;

        this.loadAllCountry();
        this.loadAllSector();
        this.loadAllCustodians();
       // this.loadAllSecurityCodeDetails();
        this.loadAllSecurityDetails();
    }
    onRowSelected(event){
      debugger;
        if (event.column.colId != "0" ) // only first column clicked
        {
          this.Temp=2;
          this.showModalSecurity = true;
          this.SecurityFormGrp.controls['CountryCode'].setValue(event.data.CountryCode);
          this.SecurityFormGrp.controls['CustodianCode'].setValue(event.data.CustodianCode);
          this.SecurityFormGrp.controls['ListCode'].setValue(event.data.ListCode);
          this.SecurityFormGrp.controls['ListName'].setValue(event.data.ListName);
          this.SecurityDetId=event.data.SecurityDetailId;
         // event.preventDefault();
          //event.preventDefault();
          // execute the action as you want here in on click of hyperlink
        }
        else if ((event.column.colId == "0" ) && (event.node.selected) ){
                  // this.errormsg='';
                  // this.dsubmitbutton=true;
                  // this.SelectionStatusOfMutants.push(event.data);
                  this.selectedRowId=event.data.SecurityDetailId;
        }
      }
    onSubmit() {
      debugger;
      //alert('OnSubmi Clicked');
      //this.submitted = true;
      if (this.SecurityFormGrp.valid) {
          //this.sucess=true;
          const datat = this.SecurityFormGrp.value;
          
          if (this.Temp == 1) {
              this.SaveSecurity();
          }
          else {
              this.UpdateSecurity();
          }
      } else {
          this.validateAllFormFields(this.SecurityFormGrp);
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
      return !this.SecurityFormGrp.get(field).valid && this.SecurityFormGrp.get(field).touched;
    }
    displayFieldCss(field: string) {
      return {
          'validate': this.isFieldValid(field),
      };
    }
    FillSecurityCodeDetails(securityCode) {
      debugger;
      console.log(securityCode);
      this._securityDetailsService.FillSecurityCodeDetails(securityCode).subscribe(
          (data) => {
              //this.StateData = data.Table;
              this.SecurityFormGrp.controls['SecurityName'].setValue(data.Table[0].SecurityName);
          });
         // this.SecurityFormGrp.controls['SecurityName'].setValue(securityName);
      }
    SaveSecurity() {
      //debugger;
      this._securityDetailsService.SaveSecurity(JSON.stringify(this.SecurityFormGrp.value)).subscribe(
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
              this.ResetSecurity();
              this.hidePMSEmploye();
              this.loadAllSecurityDetails();
          }
      )
    }
    
    UpdateSecurity() {
      this._securityDetailsService.UpdateSecurity(JSON.stringify(this.SecurityFormGrp.value), this.SecurityDetId).subscribe(
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
              this.ResetSecurity();
              this.hidePMSEmploye();
              this.loadAllSecurityDetails();
          }
      )
    }
    ResetSecurity() {
      this.SecurityFormGrp.reset();
       this.SecurityFormGrp.controls['CountryCode'].setValue(0);
       this.SecurityFormGrp.controls['CustodianCode'].setValue(0);

      // this.SecurityFormGrp.controls['SecurityCode'].setValue(0);
       this.SecurityFormGrp.controls['SectorCode'].setValue(0);
      // this.buttonDisabledReset = false;
      //this.buttonDisabledDelete = true
      this.submitted = false;
      this.sucess = false;
      this.Show = true;
      this.Temp = 1;
      this.SecurityDetId = 0;
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
      this._securityDetailsService.loadAllCountry().
          subscribe((data) => {
              currentContext.country = data.Table;
          });
      // console.log(sessionStorage.getItem('ID'));
      this.loading = false;
    }
    
    loadAllSector() {
      debugger;
      this.loading = true;
      var currentContext = this;
      this._securityDetailsService.loadAllSector().
          subscribe((data) => {
              currentContext.sector = data.Table;
          });
      // console.log(sessionStorage.getItem('ID'));
      this.loading = false;
    }
    
    loadAllCustodians() {
      debugger;
      this.loading = true;
      var currentContext = this;
      this._securityDetailsService.GetAllCustodians().
          subscribe((data) => {
              currentContext.custodian = data.Table;
          });
      // console.log(sessionStorage.getItem('ID'));
      this.loading = false;
    }
    loadAllSecurityCodeDetails() {
      debugger;
      this.loading = true;
      var currentContext = this;
      this._securityDetailsService.GetAllSecurityCodeDetailss().
          subscribe((data) => {
              currentContext.securityCodeDetails = data.Table;
          });
      // console.log(sessionStorage.getItem('ID'));
      this.loading = false;
    }

    loadAllSecurityDetails() {
      debugger;
      this.loading = true;
      var currentContext = this;
      this._securityDetailsService.GetAllSecurityDetailss().
          subscribe((data) => {
              currentContext.securityDetails = data.Table;
          });
      // console.log(sessionStorage.getItem('ID'));
      this.loading = false;
    }
    
    }
    
