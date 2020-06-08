import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Custodian, PMS,Country } from '../../../Models/Custodian/custodian';
import { CustodianService } from 'src/app/Services/Custodian/custodian.service';
import { UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';


@Component({
  selector: 'app-custodian-master',
  templateUrl: './custodian-master.component.html',
  styleUrls: ['./custodian-master.component.css']
})
export class CustodianMasterComponent implements OnInit {
  showModalupdatepopup:boolean;
  showModalsavepopup:boolean;
  showModalstatemaster: boolean;
  CustodianFormGrp:FormGroup; _custodian:Custodian ;custodian: []; country: [];  pms:[]; buttonDisabledReset: boolean = false; /*buttonDisabledDelete: boolean = true;*/ submitted = false; sucess = false; Show = true;
  Temp: number = 1; CustodianId: number = 0; loading: boolean = false;
  message: string;
  setClickedRow: Function;
  Isdiv1:boolean;
  Isdiv:boolean;
  _pms:PMS;
  selectedRowId:number=0;
  pmsDetails:[];
  showBackToCustodian:boolean=false;
  showNew:boolean=true;
  columnDefs = [
    {headerName: 'All', field: 'all', width:'60', cellRenderer: function(){
return'<input type="checkbox" class="texBox" value="All" style="width:15px"/>'
    }},
    {headerName: 'Sr. No.', field: 'SrNo', width:'80'},
    {headerName: 'Country', field: 'CountryName', width:'150'},
    {headerName: 'Custodian Code', field: 'CustodianCode', width:'150'},
    {headerName: ' Custodian Name', field: 'CustodianName', width:'150'},
];

rowData = [
    {  srNo: '1', country:'India',  custoncode: 'CUS1', custodianname: 'Custodian 1'},
    {  srNo: '2', country:'India',  custoncode: 'CUS1', custodianname: 'Custodian 1'},
    {  srNo: '3', country:'India',  custoncode: 'CUS1', custodianname: 'Custodian 1'},
];

  
columnDefs1 = [
    {headerName: 'All', field: 'all', width:'60', cellRenderer: function(){
return'<input type="checkbox" class="texBox" value="All" style="width:15px"/>'
    }},
 
  {headerName: 'Sr. No.', field: 'SrNo', width:'80'},
  {headerName: 'PMS code', field: 'PMSCode', width:'150'},
  {headerName: 'PMS  Name', field: 'PMSName', width:'150'},
  {headerName: ' PMS Account No.', field: 'PMSAccountNumber', width:'150'}
];

rowData1 = [
  {  srNo: '1', pmscode:'001',  pmsname: 'Tarun', pmsaccount: '001'},
  {  srNo: '2', pmscode:'001',  pmsname: 'Tarun', pmsaccount: '001'},
  {  srNo: '3', pmscode:'001',  pmsname: 'Tarun', pmsaccount: '001'},
];


  
    onClicksavepopup() {
      this.showModalsavepopup = true;
    }
    
    hidesavepopup() {
     this.showModalsavepopup = false;
    }
    onClickupdatepopup() {
      this.showModalupdatepopup = true;
    }
    hideupdatepopup() {
      debugger;
      this.showModalupdatepopup = false;
    }
    onClickstatemaster(event) {
    this.ResetCustodian();
    this.showModalstatemaster = true;
    }
    
    hidestatemaster() {
     this.showModalstatemaster = false;
    }


  constructor(private formbulider: FormBuilder, private _custodianService: CustodianService) {

      //  this.custodian = new Custodian();
       
    }

  ngOnInit(): void {
    this.Isdiv1=false;
    this.Isdiv=true;
    this.CustodianFormGrp = this.formbulider.group({
      CountryCode: [0, ],
      CustodianCode: ['',],
      CustodianName: ['',],
      PMSCode: [0,],
      PMSName: ['',],
      PMSAccountNumber: ['',],
      Active: [false],

  });
  this.CustodianFormGrp.controls['PMSName'].disable();
  this.CustodianFormGrp.controls['PMSAccountNumber'].disable();

  // this.setClickedRow = function (index) {
  //     this.selectedRow = index;
  // }
  // this.AllEmployee();
  
  this.loadAllCountry();
  debugger;
  this.loadAllPMS();
  this.loadAllCustodians();
  }
  onRowSelected(event){
    debugger;
      if (event.column.colId != "all" ) // only first column clicked
      {
        this.Temp=2;
        this.showModalstatemaster = true;
        this.CustodianFormGrp.controls['CountryCode'].setValue(event.data.CountryCode);
        this.CustodianFormGrp.controls['CustodianCode'].setValue(event.data.CustodianCode);
        this.CustodianFormGrp.controls['CustodianName'].setValue(event.data.CustodianName);
        this.CustodianId=event.data.CustodianId;
       // event.preventDefault();
        //event.preventDefault();
        // execute the action as you want here in on click of hyperlink
      }
      else if ((event.column.colId == "all" ) && (event.node.selected) ){
                // this.errormsg='';
                // this.dsubmitbutton=true;
                // this.SelectionStatusOfMutants.push(event.data);
                this.selectedRowId=event.data.CustodianId;
      }
    }
    BackToCustodian(){
      // this.showSecurity = false;
      // this.showGrid = true;
      this.Isdiv1=false;
      this.Isdiv=true;
    }
    BindPMSDetails(CustodianId) {
      debugger;
      this.loading = true;
      var currentContext = this;
      this._custodianService.BindPMSDetails(CustodianId).
          subscribe((data) => {
              currentContext.pmsDetails = data.Table;
          });
      // console.log(sessionStorage.getItem('ID'));
      this.loading = false;
    }
    BackToCustomer(){
      this.showBackToCustodian=false;
      this.Isdiv1=false;
      this.Isdiv=true;
      this.selectedRowId=0;
      this.showNew=true;
    }
onClickviewpms(){
  debugger;
//  this.onClickupdatepopup();
 //this.onClicksavepopup();
 
  if(this.selectedRowId != 0)
  {

    this.showBackToCustodian=true;
    this.Isdiv1=true;
    this.Isdiv=false;
  this.BindPMSDetails(this.selectedRowId);
  this.showNew=true;

    this.Isdiv1=true;
    this.Isdiv=false;
  this.BindPMSDetails(this.selectedRowId);

  }
}
onSubmit() {
  debugger;
  //alert('OnSubmi Clicked');
  //this.submitted = true;
  if (this.CustodianFormGrp.valid) {
      //this.sucess=true;
      const datat = this.CustodianFormGrp.value;
      
      if (this.Temp == 1) {
          this.SaveCustodian();
      }
      else {
          this.UpdateCustodian();
      }
  } else {
      this.validateAllFormFields(this.CustodianFormGrp);
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
  return !this.CustodianFormGrp.get(field).valid && this.CustodianFormGrp.get(field).touched;
}
displayFieldCss(field: string) {
  return {
      'validate': this.isFieldValid(field),
  };
}
FillPMSDetails(pmscode) {
  debugger;
  console.log(pmscode);
  this._custodianService.FillPMSDetails(pmscode).subscribe(
      (data) => {
          //this.StateData = data.Table;
          this.CustodianFormGrp.controls['PMSName'].setValue(data.Table[0].PMSName);
          this.CustodianFormGrp.controls['PMSAccountNumber'].setValue(data.Table[0].PMSAccountNumber);
      
      });
  }
SaveCustodian() {
  //debugger;
  this._custodianService.SaveCustodian(JSON.stringify(this.CustodianFormGrp.value)).subscribe(
      (data) => {
          this._custodian = data;
          if (this._custodian.Result = 1) {
             // sessionStorage.setItem('ID', this._custodian.Result.toString());
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
          this.ResetCustodian();
          this.hidestatemaster();
          this.loadAllCustodians()
      }
  )
}

UpdateCustodian() {
  this._custodianService.UpdateCustodian(JSON.stringify(this.CustodianFormGrp.value), this.CustodianId).subscribe(
      (data) => {
          if (data.Result = 1) {
              //this.message = 'Record updated Successfully';
             // alert(this.message);
              //this.buttonDisabledDelete = true;
             // this.buttonDisabledReset = false;
             // this.onClickupdatepopup();
              this.onClickupdatepopup();
          }
          else {
              this.message = 'Invalid Credential';
              alert(this.message);
          }
        
          //this.EmployeeForm.reset();
          this.ResetCustodian();
          this.hidestatemaster();
          this.loadAllCustodians()
      }
  )
}
ResetCustodian() {
  this.CustodianFormGrp.reset();
   this.CustodianFormGrp.controls['CountryCode'].setValue(0);
   this.CustodianFormGrp.controls['PMSCode'].setValue(0);
  // this.buttonDisabledReset = false;
  //this.buttonDisabledDelete = true
  this.submitted = false;
  this.sucess = false;
  this.Show = true;
  this.Temp = 1;
  this.CustodianId = 0;
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
  this._custodianService.loadAllCountry().
      subscribe((data) => {
          currentContext.country = data.Table;
      });
  // console.log(sessionStorage.getItem('ID'));
  this.loading = false;
}

loadAllPMS() {
  debugger;
  this.loading = true;
  var currentContext = this;
  this._custodianService.loadAllPMS().
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
  this._custodianService.GetAllCustodians().
      subscribe((data) => {
          currentContext.custodian = data.Table;
      });
  // console.log(sessionStorage.getItem('ID'));
  this.loading = false;
}

}
