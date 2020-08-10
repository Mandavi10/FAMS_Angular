import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { City } from '../../../Models/City/city';
import { CityService } from 'src/app/Services/City/city.service';
import { UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-city-master',
  templateUrl: './city-master.component.html',
  styleUrls: ['./city-master.component.css']
})
export class CityMasterComponent implements OnInit {
  isShowLoader:boolean=false;

  showModalupdatepopup:boolean;
  showModalsavepopup:boolean;
  showModalcitymaster: boolean;
  CityFormGrp:FormGroup; _city:City ;_city_Copy:City ;state: []; country: []; city:[];buttonDisabledReset: boolean = false; /*buttonDisabledDelete: boolean = true;*/ submitted = false; sucess = false; Show = true;
  Temp: number = 1; CityId: number = 0; loading: boolean = false;
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
    {headerName: 'State', field: 'StateName', width: 100},
    {headerName: 'City Code', field: 'CityCode', width: 100},
    {headerName: 'City Name', field: 'CityName', width: 100},
    {headerName: 'Created By', field: 'CreatedBy', width: 100},
    {headerName: 'Created On', field: 'CreatedOn', width: 100},
    {headerName: 'Updated By', field: 'UpdatedBy', width: 100},
    {headerName: 'Updated On', field: 'UpdatedOn', width: 100}
];

rowData = [
    { srNo: '1', Country: 'Indian', State: 'state-001', cityCode: 'Code-001', cityName: 'State 1', CreatedBy: 'Abhishek', CreatedOn: 'Demo', UpdatedBy: 'Demo', UpdatedOn:'Demo'},
    { srNo: '2', Country: 'Indian', State: 'state-001', cityCode: 'Code-001', cityName: 'State 1', CreatedBy: 'Abhishek', CreatedOn: 'Demo', UpdatedBy: 'Demo', UpdatedOn:'Demo'},
    { srNo: '3', Country: 'Indian', State: 'state-001', cityCode: 'Code-001', cityName: 'State 1', CreatedBy: 'Abhishek', CreatedOn: 'Demo', UpdatedBy: 'Demo', UpdatedOn:'Demo'}
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
onClickcitymaster(event) {
this.ResetCity();
this.showModalcitymaster = true;
}

hidecitymaster() {
 this.showModalcitymaster = false;
}


constructor(private router: Router,private formbulider: FormBuilder, private _cityService: CityService) {

  //  this.custodian = new Custodian();
   
}

ngOnInit(): void {
this.Isdiv1=false;
this.Isdiv=true;
this.CityFormGrp = this.formbulider.group({
  CountryCode: [0, ],
  StateCode: [0, ],
  CityCode: ['', ],
  CityName: ['', ],
  
});


// this.setClickedRow = function (index) {
//     this.selectedRow = index;
// }
// this.AllEmployee();
debugger;
this.loadAllCountry();
this.loadAllCity();



}
onRowSelected(event){
debugger;
  if (event.column.colId != "all" ) // only first column clicked
  {
    this.Temp=2;
    this.showModalcitymaster = true;
    this.loadAllState(event.data.CountryCode);
    this.CityFormGrp.controls['CityCode'].setValue(event.data.CityCode);
    this.CityFormGrp.controls['CityName'].setValue(event.data.CityName);
    this.CityFormGrp.controls['CountryCode'].setValue(event.data.CountryCode);
   
    this.CityFormGrp.controls['StateCode'].setValue(event.data.StateCode);
   
    this.CityId=event.data.CityId;
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

CityMasterSearch(evt: any) {
  debugger;
  let searchText = evt.target.value.toLocaleLowerCase();    
  if(searchText ===  '' || searchText === undefined || searchText === null)
  {
    this.city  = JSON.parse(JSON.stringify(this._city_Copy));
  }
  else{
    let gridArr = JSON.parse(JSON.stringify(this._city_Copy));
    let finalArr = [];
    gridArr.forEach(row => {
     var CountryName = row.CountryName;
      var StateName = row.StateName;
      var CityCode = row.CityCode;
      var CityName = row.CityName;
      
      var isCountryName = CountryName.toLocaleLowerCase().includes(searchText) ;
      var isStateName = StateName.toLocaleLowerCase().includes(searchText) ;
      var isCityCode = CityCode.toLocaleLowerCase().includes(searchText) ;
      var isCityName = CityName.toLocaleLowerCase().includes(searchText) ;

     if( isCountryName || isStateName || isCityCode || isCityName)
      {
        finalArr.push(row);
      }
    });
    this.city  = JSON.parse(JSON.stringify(finalArr));
  }
}

onSubmit() {
debugger;
//alert('OnSubmi Clicked');
//this.submitted = true;
if (this.CityFormGrp.valid) {
  //this.sucess=true;
  const datat = this.CityFormGrp.value;
  
  if (this.Temp == 1) {
      this.isShowLoader=true;
      this.SaveCity();
      this.isShowLoader=false;
  }
  else {
     this.isShowLoader=true;
      this.UpdateCity();
      this.isShowLoader=false;
  }
} else {
  this.validateAllFormFields(this.CityFormGrp);
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
return !this.CityFormGrp.get(field).valid && this.CityFormGrp.get(field).touched;
}
displayFieldCss(field: string) {
return {
  'validate': this.isFieldValid(field),
};
}

SaveCity() {
//debugger;
this._cityService.SaveCity(JSON.stringify(this.CityFormGrp.value)).subscribe(
  (data) => {
      this._city = data;
      if (this._city.Result = 1) {
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
      
      this.ResetCity();
      this.hidecitymaster();
      this.loadAllCity();
      
  }
)
}

UpdateCity() {
this._cityService.UpdateCity(JSON.stringify(this.CityFormGrp.value), this.CityId).subscribe(
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
     
      this.ResetCity();
      this.hidecitymaster();
      this.loadAllCity();
  }
)
}
ResetCity() {
this.CityFormGrp.reset();
// this.buttonDisabledReset = false;
//this.buttonDisabledDelete = true
this.submitted = false;
this.sucess = false;
this.Show = true;
this.Temp = 1;
this.CityId = 0;
this.loading = false;
this.message = null;
// this.BindDesignations();
}
// createNewTask()
// {
//     console.log(this.newTaskForm.value)
// }
loadAllCity() {
  debugger;
  this.loading = true;
  var currentContext = this;
  this._cityService.loadAllCity().
    subscribe((data) => {
        currentContext.city = data.Table;
        this._city_Copy=data.Table;
    });
  // console.log(sessionStorage.getItem('ID'));
  this.loading = false;
  }

loadAllCountry() {
  debugger;
  this.loading = true;
  var currentContext = this;
  this._cityService.loadAllCountry().
    subscribe((data) => {
        currentContext.country = data.Table;
    });
  // console.log(sessionStorage.getItem('ID'));
  this.loading = false;
  }
loadAllState(CountryCode) {
debugger;
this.loading = true;
var currentContext = this;
this._cityService.loadAllState(CountryCode).
  subscribe((data) => {
      currentContext.state = data.Table;
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
      fileName: 'City.csv',
      columnSeparator: ','
    };
    this.gridApi.exportDataAsCsv(params);
  }

}