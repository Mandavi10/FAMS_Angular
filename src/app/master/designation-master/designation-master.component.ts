import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Designation } from '../../../Models/Designation/designation';
import { DesignationService } from 'src/app/Services/Designation/designation.service';
import { UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
@Component({
  selector: 'app-designation-master',
  templateUrl: './designation-master.component.html',
  styleUrls: ['./designation-master.component.css']
})
export class DesignationMasterComponent implements OnInit {
  isShowLoader:boolean=false;


  showModalupdatepopup:boolean;
  showModalsavepopup:boolean;
  showModalstatemaster: boolean;
  DesignationFormGrp:FormGroup; _designation:Designation ; _designation_copy:Designation ;country: [];designation:[]; buttonDisabledReset: boolean = false; /*buttonDisabledDelete: boolean = true;*/ submitted = false; sucess = false; Show = true;
  Temp: number = 1; DesignationId: number = 0; loading: boolean = false;
  message: string;
  setClickedRow: Function;
  Isdiv1:boolean;
  Isdiv:boolean;
  selectedRowId:number=0;
  showBackToCustodian:boolean=false;
  showNew:boolean=true;
  columnDefs = [
 
    {headerName: 'Sr. No.', field: 'SrNo', width:'80'},
    {headerName: 'Designation Code', field: 'DesignationCode', width:'150'},
    {headerName: 'Designation Name', field: 'DesignationName', width:'150'},
    {headerName: 'Created By', field: 'CreatedBy', width:'150'},
    {headerName: 'Created On', field: 'CreatedOn', width:'150'},
    {headerName: 'Updated By', field: 'UpdatedBy', width:'150'},
    {headerName: 'Updated On', field: 'UpdatedOn', width:'150'},
 
    
];

rowData = [
    {  srNo: '1', designationcode:'MD',  designationname: 'Managing Director', createdby: 'Tarun', createdon:'28/05/2020',  updatedby: 'Tarun', updatedon:'28/05/2020'},
    {  srNo: '2', designationcode:'MD',  designationname: 'Managing Director', createdby: 'Tarun', createdon:'28/05/2020',  updatedby: 'Tarun', updatedon:'28/05/2020'},
    {  srNo: '3', designationcode:'MD',  designationname: 'Managing Director', createdby: 'Tarun', createdon:'28/05/2020',  updatedby: 'Tarun', updatedon:'28/05/2020'}
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
this.ResetDesignation();
this.showModalstatemaster = true;
}

hidestatemaster() {
 this.showModalstatemaster = false;
}


constructor(private formbulider: FormBuilder, private _designationService: DesignationService) {

  //  this.custodian = new Custodian();
   
}

ngOnInit(): void {
this.Isdiv1=false;
this.Isdiv=true;
this.DesignationFormGrp = this.formbulider.group({
  DesignationCode: ['', ],
  DesignationName: ['',],
});


// this.setClickedRow = function (index) {
//     this.selectedRow = index;
// }
// this.AllEmployee();

this.loadAllDesignation();
debugger;

}
onRowSelected(event){
debugger;
  if (event.column.colId != "all" ) // only first column clicked
  {
    this.Temp=2;
    this.showModalstatemaster = true;
    this.DesignationFormGrp.controls['DesignationCode'].setValue(event.data.DesignationCode);
    this.DesignationFormGrp.controls['DesignationName'].setValue(event.data.DesignationName);
   
    this.DesignationId=event.data.DesignationId;
   // event.preventDefault();
    //event.preventDefault();
    // execute the action as you want here in on click of hyperlink
  }
  else if ((event.column.colId == "all" ) && (event.node.selected) ){
            // this.errormsg='';
            // this.dsubmitbutton=true;
            // this.SelectionStatusOfMutants.push(event.data);
            this.selectedRowId=event.data.Designation;
  }
}


DesignationMasterSearch(evt: any) {
  debugger;
  let searchText = evt.target.value.toLocaleLowerCase();    
  if(searchText ===  '' || searchText === undefined || searchText === null)
  {
    this.designation  = JSON.parse(JSON.stringify(this._designation_copy));
  }
  else{
    let gridArr = JSON.parse(JSON.stringify(this._designation_copy));
    let finalArr = [];
    gridArr.forEach(row => {

      var DesignationCode = row.DesignationCode;
      var DesignationName = row.DesignationName;
      
      
      var isDesignationCode = DesignationCode.toLocaleLowerCase().includes(searchText) ;
      var isDesignationName = DesignationName.toLocaleLowerCase().includes(searchText) ;
     

     if( isDesignationCode || isDesignationName )
      {
        finalArr.push(row);
      }
    });
    this.designation  = JSON.parse(JSON.stringify(finalArr));
  }
}

onSubmit() {
debugger;
//alert('OnSubmi Clicked');
//this.submitted = true;
if (this.DesignationFormGrp.valid) {
  //this.sucess=true;
  const datat = this.DesignationFormGrp.value;
  
  if (this.Temp == 1) {
    this.isShowLoader=true;
      this.SaveDesignation();
      this.isShowLoader=false;
  }
  else {
    this.isShowLoader=true;
      this.UpdateDesignation();
      this.isShowLoader=false;
  }
} else {
  this.validateAllFormFields(this.DesignationFormGrp);
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
return !this.DesignationFormGrp.get(field).valid && this.DesignationFormGrp.get(field).touched;
}
displayFieldCss(field: string) {
return {
  'validate': this.isFieldValid(field),
};
}

SaveDesignation() {
//debugger;
this._designationService.SaveDesignation(JSON.stringify(this.DesignationFormGrp.value)).subscribe(
  (data) => {
      this._designation = data;
      if (this._designation.Result = 1) {
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
      this.loadAllDesignation();
      this.ResetDesignation();
      this.hidestatemaster();
      
  }
)
}

UpdateDesignation() {
this._designationService.UpdateDesignation(JSON.stringify(this.DesignationFormGrp.value), this.DesignationId).subscribe(
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
      this.ResetDesignation();
      this.hidestatemaster();
      this.loadAllDesignation();
  }
)
}
ResetDesignation() {
this.DesignationFormGrp.reset();
// this.buttonDisabledReset = false;
//this.buttonDisabledDelete = true
this.submitted = false;
this.sucess = false;
this.Show = true;
this.Temp = 1;
this.DesignationId = 0;
this.loading = false;
this.message = null;
// this.BindDesignations();
}
// createNewTask()
// {
//     console.log(this.newTaskForm.value)
// }
loadAllDesignation() {
debugger;
this.loading = true;
var currentContext = this;
this._designationService.loadAllDesignation().
  subscribe((data) => {
      currentContext.designation = data.Table;
      this._designation_copy=data.Table;
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
      fileName: 'Designation.csv',
      columnSeparator: ','
    };
    this.gridApi.exportDataAsCsv(params);
  }

}

