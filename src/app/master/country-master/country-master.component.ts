import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from '../../../Models/Country/country';
import { CountryService } from 'src/app/Services/Country/country.service';
import { UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-country-master',
  templateUrl: './country-master.component.html',
  styleUrls: ['./country-master.component.css']
})
export class CountryMasterComponent implements OnInit {
  showModalupdatepopup:boolean;
  showModalsavepopup:boolean;
  showModalstatemaster: boolean;
  CountryFormGrp:FormGroup; _country:Country ;country: []; buttonDisabledReset: boolean = false; /*buttonDisabledDelete: boolean = true;*/ submitted = false; sucess = false; Show = true;
  Temp: number = 1; CountryID: number = 0; loading: boolean = false;
  message: string;
  setClickedRow: Function;
  Isdiv1:boolean;
  Isdiv:boolean;
  selectedRowId:number=0;
  showBackToCustodian:boolean=false;
  showNew:boolean=true;

  columnDefs = [
 
    {headerName: 'Sr. No.', field: 'SrNo', width:'80'},
    {headerName: 'Country  Code', field: 'CountryCode', width:'150'},
    {headerName: 'Country Name', field: 'CountryName', width:'150'},
    {headerName: 'Created By', field: 'CreatedBy', width:'150'},
    {headerName: 'Created On', field: 'CreatedOn', width:'150'},
    {headerName: 'Updated By', field: 'UpdatedBy', width:'150'},
    {headerName: 'Updated On', field: 'UpdatedOn', width:'150'},
    
];

rowData = [
    {  srNo: '1', countrycode:'IND',  countryname: 'India', createdby: 'Tarun', createdon:'28/05/2020',  updatedby: 'Tarun', updatedon:'28/05/2020'},
    {  srNo: '2', countrycode:'AUS',  countryname: 'Australia' , createdby: 'Tarun', createdon:'28/05/2020',  updatedby: 'Tarun', updatedon:'28/05/2020'},
    {  srNo: '3', countrycode:'PAK',  countryname: 'Pakistan' , createdby: 'Tarun', createdon:'28/05/2020',  updatedby: 'Tarun', updatedon:'28/05/2020'}
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
this.ResetCountry();
this.showModalstatemaster = true;
}

hidestatemaster() {
 this.showModalstatemaster = false;
}


constructor(private router: Router,private formbulider: FormBuilder, private _countryService: CountryService) {

  //  this.custodian = new Custodian();
   
}

ngOnInit(): void {
this.Isdiv1=false;
this.Isdiv=true;
this.CountryFormGrp = this.formbulider.group({
  CountryCode: ['', ],
  CountryName: ['',],
});


// this.setClickedRow = function (index) {
//     this.selectedRow = index;
// }
// this.AllEmployee();

this.loadAllCountry();
debugger;

}
onRowSelected(event){
debugger;
  if (event.column.colId != "all" ) // only first column clicked
  {
    this.Temp=2;
    this.showModalstatemaster = true;
    this.CountryFormGrp.controls['CountryCode'].setValue(event.data.CountryCode);
    this.CountryFormGrp.controls['CountryName'].setValue(event.data.CountryName);
   
    this.CountryID=event.data.CountryID;
   // event.preventDefault();
    //event.preventDefault();
    // execute the action as you want here in on click of hyperlink
  }
  else if ((event.column.colId == "all" ) && (event.node.selected) ){
            // this.errormsg='';
            // this.dsubmitbutton=true;
            // this.SelectionStatusOfMutants.push(event.data);
            this.selectedRowId=event.data.Country;
  }
}


onSubmit() {
debugger;
//alert('OnSubmi Clicked');
//this.submitted = true;
if (this.CountryFormGrp.valid) {
  //this.sucess=true;
  const datat = this.CountryFormGrp.value;
  
  if (this.Temp == 1) {
      this.SaveCountry();
  }
  else {
      this.UpdateCountry();
  }
} else {
  this.validateAllFormFields(this.CountryFormGrp);
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
return !this.CountryFormGrp.get(field).valid && this.CountryFormGrp.get(field).touched;
}
displayFieldCss(field: string) {
return {
  'validate': this.isFieldValid(field),
};
}

SaveCountry() {
//debugger;
this._countryService.SaveCountry(JSON.stringify(this.CountryFormGrp.value)).subscribe(
  (data) => {
      this._country = data;
      if (this._country.Result = 1) {
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
      this.loadAllCountry();
      this.ResetCountry();
      this.hidestatemaster();
      
  }
)
}

UpdateCountry() {
this._countryService.UpdateCountry(JSON.stringify(this.CountryFormGrp.value), this.CountryID).subscribe(
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
      this.ResetCountry();
      this.hidestatemaster();
      this.loadAllCountry();
  }
)
}
ResetCountry() {
this.CountryFormGrp.reset();
// this.buttonDisabledReset = false;
//this.buttonDisabledDelete = true
this.submitted = false;
this.sucess = false;
this.Show = true;
this.Temp = 1;
this.CountryID = 0;
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
this._countryService.loadAllCountry().
  subscribe((data) => {
      currentContext.country = data.Table;
  });
// console.log(sessionStorage.getItem('ID'));
this.loading = false;
}



}

