import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Sector } from '../../../Models/Sector/sector';
import { SectorService } from 'src/app/Services/Sector/sector.service';
import { UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-sector-master',
  templateUrl: './sector-master.component.html',
  styleUrls: ['./sector-master.component.css']
})
export class SectorMasterComponent implements OnInit {
  showModalupdatepopup:boolean;
  showModalsavepopup:boolean;
  showModalstatemaster: boolean;
  SectorFormGrp:FormGroup; _sector:Sector ;state: []; country: [];sector:[];buttonDisabledReset: boolean = false; /*buttonDisabledDelete: boolean = true;*/ submitted = false; sucess = false; Show = true;
  Temp: number = 1; SectorId: number = 0; loading: boolean = false;
  message: string;
  setClickedRow: Function;
  Isdiv1:boolean;
  Isdiv:boolean;
  selectedRowId:number=0;
  showBackToCustodian:boolean=false;
  showNew:boolean=true;


  columnDefs = [
    {headerName: 'Sr. No.', field: 'SrNo', width: 80 },
    {headerName: 'Country', field: 'CountryName', width: 100},
    {headerName: 'Sector Code', field: 'SectorCode', width: 100},
    {headerName: 'Sector Name', field: 'SectorName', width: 100},
    {headerName: 'Created By', field: 'CreatedBy', width: 100},
    {headerName: 'Created On', field: 'CreatedOn', width: 100},
    {headerName: 'Updated By', field: 'UpdatedBy', width: 100},
    {headerName: 'Updated On', field: 'UpdatedOn', width: 100}
   
];

rowData = [
    { srNo: '1', Country: 'Indian', sectorCode: 'Code-001', sectorName: 'State 1', CreatedBy: 'Abhishek', CreatedOn: 'Demo', UpdatedBy: 'Demo', UpdatedOn:'Demo'},
    { srNo: '2', Country: 'Indian', sectorCode: 'Code-002', sectorName: 'State 2', CreatedBy: 'Abhishek', CreatedOn: 'Demo', UpdatedBy: 'Demo', UpdatedOn:'Demo'},
    { srNo: '3', Country: 'Indian', sectorCode: 'Code-003', sectorName: 'State 3', CreatedBy: 'Abhishek', CreatedOn: 'Demo', UpdatedBy: 'Demo', UpdatedOn:'Demo'}
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
this.ResetSector();
this.showModalstatemaster = true;
}

hidestatemaster() {
 this.showModalstatemaster = false;
}


constructor(private formbulider: FormBuilder, private _sectorService: SectorService) {

  //  this.custodian = new Custodian();
   
}

ngOnInit(): void {
this.Isdiv1=false;
this.Isdiv=true;
this.SectorFormGrp = this.formbulider.group({
  CountryCode: [0, ],
  SectorCode: ['', ],
  SectorName: ['', ],
  
});


// this.setClickedRow = function (index) {
//     this.selectedRow = index;
// }
// this.AllEmployee();
debugger;
this.loadAllCountry();
this.loadAllSector();


}
onRowSelected(event){
debugger;
  if (event.column.colId != "all" ) // only first column clicked
  {
    this.Temp=2;
    this.showModalstatemaster = true;
    this.SectorFormGrp.controls['SectorCode'].setValue(event.data.SectorCode);
    this.SectorFormGrp.controls['SectorName'].setValue(event.data.SectorName);
    this.SectorFormGrp.controls['CountryCode'].setValue(event.data.CountryCode);
   
    this.SectorId=event.data.SectorId;
   // event.preventDefault();
    //event.preventDefault();
    // execute the action as you want here in on click of hyperlink
  }
  else if ((event.column.colId == "all" ) && (event.node.selected) ){
            // this.errormsg='';
            // this.dsubmitbutton=true;
            // this.SelectionStatusOfMutants.push(event.data);
            this.selectedRowId=event.data.SectorId;
  }
}


onSubmit() {
debugger;
//alert('OnSubmi Clicked');
//this.submitted = true;
if (this.SectorFormGrp.valid) {
  //this.sucess=true;
  const datat = this.SectorFormGrp.value;
  
  if (this.Temp == 1) {
      this.SaveSector();
  }
  else {
      this.UpdateSector();
  }
} else {
  this.validateAllFormFields(this.SectorFormGrp);
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
return !this.SectorFormGrp.get(field).valid && this.SectorFormGrp.get(field).touched;
}
displayFieldCss(field: string) {
return {
  'validate': this.isFieldValid(field),
};
}

SaveSector() {
//debugger;
this._sectorService.SaveSector(JSON.stringify(this.SectorFormGrp.value)).subscribe(
  (data) => {
      this._sector = data;
      if (this._sector.Result = 1) {
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
      this.loadAllSector();
      this.ResetSector();
      this.hidestatemaster();
      
  }
)
}
loadAllCountry() {
  debugger;
  this.loading = true;
  var currentContext = this;
  this._sectorService.loadAllCountry().
      subscribe((data) => {
          currentContext.country = data.Table;
      });
  // console.log(sessionStorage.getItem('ID'));
  this.loading = false;
}
UpdateSector() {
this._sectorService.UpdateSector(JSON.stringify(this.SectorFormGrp.value), this.SectorId).subscribe(
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
      this.ResetSector();
      this.hidestatemaster();
      this.loadAllSector();
  }
)
}
ResetSector() {
this.SectorFormGrp.reset();
// this.buttonDisabledReset = false;
//this.buttonDisabledDelete = true
this.submitted = false;
this.sucess = false;
this.Show = true;
this.Temp = 1;
this.SectorId = 0;
this.loading = false;
this.message = null;
// this.BindDesignations();
}
// createNewTask()
// {
//     console.log(this.newTaskForm.value)
// }
loadAllSector() {
debugger;
this.loading = true;
var currentContext = this;
this._sectorService.loadAllSector().
  subscribe((data) => {
      currentContext.sector = data.Table;
  });
// console.log(sessionStorage.getItem('ID'));
this.loading = false;
}



}