import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { State } from '../../../Models/State/state';
import { StateService } from 'src/app/Services/State/state.service';
import { UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-state-master',
  templateUrl: './state-master.component.html',
  styleUrls: ['./state-master.component.css']
})
export class StateMasterComponent implements OnInit {
  showModalupdatepopup:boolean;
  showModalsavepopup:boolean;
  showModalstatemaster: boolean;
  StateFormGrp:FormGroup; _state:State ;state: []; country: [];buttonDisabledReset: boolean = false; /*buttonDisabledDelete: boolean = true;*/ submitted = false; sucess = false; Show = true;
  Temp: number = 1; StateId: number = 0; loading: boolean = false;
  message: string;
  setClickedRow: Function;
  Isdiv1:boolean;
  Isdiv:boolean;
  selectedRowId:number=0;
  showBackToCustodian:boolean=false;
  showNew:boolean=true;

  columnDefs = [
    {headerName: 'Sr. No.', field: 'SrNo', width:'80'},
    {headerName: 'Country', field: 'CountryName', width:'150'},
    {headerName: 'State  Code', field: 'StateCode', width:'150'},
    {headerName: 'State Name', field: 'StateName', width:'150'},
    {headerName: 'Created By', field: 'CreatedBy', width:'150'},
    {headerName: 'Created On', field: 'CreatedOn', width:'150'},
    {headerName: 'Updated By', field: 'UpdatedBy', width:'150'},
    {headerName: 'Updated On', field: 'UpdatedOn', width:'150'},
    
];

rowData = [
    {  srNo: '1', country:'IND', statecode:'0001',  statename: '001', createdby: 'Tarun', createdon:'28/05/2020',  updatedby: 'Tarun', updatedon:'28/05/2020'},
    {  srNo: '2', country:'IND', statecode:'0001',  statename: '001' , createdby: 'Tarun', createdon:'28/05/2020',  updatedby: 'Tarun', updatedon:'28/05/2020'},
    {  srNo: '3', country:'IND', statecode:'0001',  statename: '001' , createdby: 'Tarun', createdon:'28/05/2020',  updatedby: 'Tarun', updatedon:'28/05/2020'}

   
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
this.ResetState();
this.showModalstatemaster = true;
}

hidestatemaster() {
 this.showModalstatemaster = false;
}


constructor(private router: Router,private formbulider: FormBuilder, private _stateService: StateService) {

  //  this.custodian = new Custodian();
   
}

ngOnInit(): void {
this.Isdiv1=false;
this.Isdiv=true;
this.StateFormGrp = this.formbulider.group({
  CountryCode: [0, ],
  StateCode: ['', ],
  StateName: ['', ],
  
});


// this.setClickedRow = function (index) {
//     this.selectedRow = index;
// }
// this.AllEmployee();
debugger;
this.loadAllCountry();
this.loadAllState();


}
onRowSelected(event){
debugger;
  if (event.column.colId != "all" ) // only first column clicked
  {
    this.Temp=2;
    this.showModalstatemaster = true;
    this.StateFormGrp.controls['StateCode'].setValue(event.data.StateCode);
    this.StateFormGrp.controls['StateName'].setValue(event.data.StateName);
    this.StateFormGrp.controls['CountryCode'].setValue(event.data.CountryCode);
   
    this.StateId=event.data.StateId;
   // event.preventDefault();
    //event.preventDefault();
    // execute the action as you want here in on click of hyperlink
  }
  else if ((event.column.colId == "all" ) && (event.node.selected) ){
            // this.errormsg='';
            // this.dsubmitbutton=true;
            // this.SelectionStatusOfMutants.push(event.data);
            this.selectedRowId=event.data.StateId;
  }
}


onSubmit() {
debugger;
//alert('OnSubmi Clicked');
//this.submitted = true;
if (this.StateFormGrp.valid) {
  //this.sucess=true;
  const datat = this.StateFormGrp.value;
  
  if (this.Temp == 1) {
      this.SaveState();
  }
  else {
      this.UpdateState();
  }
} else {
  this.validateAllFormFields(this.StateFormGrp);
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
return !this.StateFormGrp.get(field).valid && this.StateFormGrp.get(field).touched;
}
displayFieldCss(field: string) {
return {
  'validate': this.isFieldValid(field),
};
}

SaveState() {
//debugger;
this._stateService.SaveState(JSON.stringify(this.StateFormGrp.value)).subscribe(
  (data) => {
      this._state = data;
      if (this._state.Result = 1) {
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
      this.loadAllState();
      this.ResetState();
      this.hidestatemaster();
      
  }
)
}
loadAllCountry() {
  debugger;
  this.loading = true;
  var currentContext = this;
  this._stateService.loadAllCountry().
      subscribe((data) => {
          currentContext.country = data.Table;
      });
  // console.log(sessionStorage.getItem('ID'));
  this.loading = false;
}
UpdateState() {
this._stateService.UpdateState(JSON.stringify(this.StateFormGrp.value), this.StateId).subscribe(
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
      this.ResetState();
      this.hidestatemaster();
      this.loadAllState();
  }
)
}
ResetState() {
this.StateFormGrp.reset();
// this.buttonDisabledReset = false;
//this.buttonDisabledDelete = true
this.submitted = false;
this.sucess = false;
this.Show = true;
this.Temp = 1;
this.StateId = 0;
this.loading = false;
this.message = null;
// this.BindDesignations();
}
// createNewTask()
// {
//     console.log(this.newTaskForm.value)
// }
loadAllState() {
debugger;
this.loading = true;
var currentContext = this;
this._stateService.loadAllState().
  subscribe((data) => {
      currentContext.state = data.Table;
  });
// console.log(sessionStorage.getItem('ID'));
this.loading = false;
}



}