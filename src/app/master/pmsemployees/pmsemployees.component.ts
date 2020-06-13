import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PmsemployeesService } from '../../Services/PMSEmployees/pmsemployees.service';
import { Pmsemployees,PmsemployeesCSV } from '../../../Models/PMSEmployees/pmsemployees';
import { Saveallfields } from '../../../Models/PMSEmployees/Saveallfields';
import { Allcustodianfields } from '../../../Models/PMSEmployees/Allcustodianfields';
import { Commonfields } from '../../../Models/commonfields';
import { Bindallcustomers } from '../../../Models/PMSEmployees/bindallcustomers';
// import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-pmsemployees',
  templateUrl: './pmsemployees.component.html',
  styleUrls: ['./pmsemployees.component.css']
})
export class PMSEmployeesComponent implements OnInit {
  PmsemployeesList : Pmsemployees; PMSEmployeesForm: FormGroup; CommonfieldsList : Commonfields; AllcustodianfieldsList : Allcustodianfields
  SaveallfieldsList : Saveallfields; BacktoPMSEmployee : boolean = false; PAMSEmpId : any = ""; flag = 0 ; HeaderArray : any =[];
  BindallcustomersList : Bindallcustomers; liNew : boolean = true; liVieCusDetails : boolean = true; showModalsavepopup: boolean;
  PmsemployeesCSVList : Array<PmsemployeesCSV> = [];
  columnDefs = [
    {headerName: 'All', field: '', width: 60, cellRenderer: function() {
      return '<input type="checkbox" class="texBox" value="All" style="width:15px" />'} },
    {headerName: 'Sr. No.', field: 'srNo', width:'80'},
    {headerName: 'Employee Code', field: 'EmployeeCode', width:'150'},
    {headerName: 'Employee Name', field: 'EmployeeName', width:'150'},
    {headerName: 'Gender', field: 'Gender', width:'150'},
    {headerName: 'Qualification', field: 'Qualification', width:'150'},
    {headerName: 'About', field: 'About', width:'150'},
   
   
    
  ];
  
  rowData = [
    {  srNo: '1', EmployeeCode:'Demo', EmployeeName:'Demo',  Gender: 'Demo', Qualification: 'Demo', About:'Demo'},
    {  srNo: '2', EmployeeCode:'Demo', EmployeeName:'Demo',  Gender: 'Demo', Qualification: 'Demo', About:'Demo'},
    {  srNo: '3', EmployeeCode:'Demo', EmployeeName:'Demo',  Gender: 'Demo', Qualification: 'Demo', About:'Demo'}
   
  ];



  columnDefs1 = [
    {headerName: 'All', field: '', width: 60, cellRenderer: function() {
      return '<input type="checkbox" class="texBox" value="All" style="width:15px" />'} },
    {headerName: 'Sr. No.', field: 'srNo', width:'80'},
    {headerName: 'Customer Code', field: 'CustomerCode', width:'150'},
    {headerName: 'Customer Name', field: 'CustomerName', width:'150'},
    {headerName: 'Custodian', field: 'Custodian', width:'150'},
    {headerName: 'Inception Date', field: 'InceptionDate', width:'150'},
    {headerName: 'Employee Linking Date', field: 'EmpLinkingDate', width:'200'},
   
   
    
];

rowData1 = [
    {  srNo: '1', CustomerCode:'Demo', CustomerName:'Demo',  Custodian: 'Demo', InceptionDate: 'Demo', EmployeeLinkingDate:'Demo'},
    {  srNo: '2', CustomerCode:'Demo', CustomerName:'Demo',  Custodian: 'Demo', InceptionDate: 'Demo', EmployeeLinkingDate:'Demo'},
    {  srNo: '3', CustomerCode:'Demo', CustomerName:'Demo',  Custodian: 'Demo', InceptionDate: 'Demo', EmployeeLinkingDate:'Demo'}
  
];

  showModalPMSEmploye: boolean;
  showCustomer = false;
  showGrid = true;
  viewCustomer(){
    if(this.PAMSEmpId != ""){
    this.flag = 1;
    this.liVieCusDetails = false;
    this.liNew = false;
    this.BacktoPMSEmployee = true;
    this.showCustomer = true;
    this.showGrid = false;
    this.BindCustomers();
    }
    else{
      alert("Please select employee");
    }
  }
  onClickPMSEmploye(event) {
    this.PAMSEmpId="";
    this.PMSEmployeesForm.reset();
    this.showModalPMSEmploye = true;
    }
    BacktoPMSEmployeeFun(){
      this.flag = 0;
      this.liVieCusDetails = true;
      this.liNew = true;
      this.BacktoPMSEmployee = false;
      this.showCustomer = false;
      this.showGrid = true;
    }
    
    hidePMSEmploye() {
    this.showModalPMSEmploye = false;
    }
    onClicksavepopup(event) {
      this.showModalsavepopup = true;
      
      }
      
      hidesavepopup() {
      this.showModalsavepopup = false;
      }

  constructor(private router: Router, private formBuilder: FormBuilder,private PMSEService : PmsemployeesService) { }

  ngOnInit(): void {
    this.PMSEmployeesForm = this.formBuilder.group({  
      EmployeeCode : [''], EmployeeName :[''], Gender : [], Qualification : [''], About : [''],
      CustomerCode : [''], CustomerName : [''] , Custodian : [''], InceptionDate : [''], EmpLinkingDate : [''],
      Active : ['']
  });
    this.BindGrid();
    this.BindCustodian();
  }

  BindGrid(){
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    let  Data = new Commonfields();
    Data.UserId = Sessionvalue.UserId;
    this.PMSEService.BindGrid(JSON.stringify(Data)).subscribe(
      (data) => {
        this.PmsemployeesList = data.Table;
        this.PmsemployeesCSVList.push(this.PmsemployeesList);
        console.log(this.PmsemployeesCSVList);
        });
  }
  onRowSelected(event){
    if (event.column.colId != "0" ) // only first column clicked
    {
    this.PMSEmployeesForm.reset();
    this.showModalPMSEmploye = true;
    this.PMSEmployeesForm.controls['EmployeeCode'].setValue(event.data.EmployeeCode);
    this.PMSEmployeesForm.controls['EmployeeName'].setValue(event.data.EmployeeName);
    var Gender = "";
    if(event.data.Gender.trim() == "Male"){Gender = "M"}
    else if(event.data.Gender.trim() == "Female"){Gender = "F"}
    else{Gender = "O"}
    this.PMSEmployeesForm.controls['Gender'].setValue(Gender);
    this.PMSEmployeesForm.controls['Qualification'].setValue(event.data.Qualification);
    this.PMSEmployeesForm.controls['About'].setValue(event.data.About);
    }
    //else if ((event.column.colId == "0" ) && (event.node.selected) ){
      this.PAMSEmpId = event.data.PMSEmpId;
   // }
  }
  BindCustomers(){
    this.PMSEService.BindCustomers(this.PAMSEmpId).subscribe(
      (data) => {
        this.BindallcustomersList = data.Table;
          
        });
  }

  SaveDataFun(){
    if (this.PMSEmployeesForm.valid) {
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));


    //let  FormData = new Saveallfields();
    //FormData = this.PMSEmployeesForm.value;
    //FormData.PMSEmpId = this.PAMSEmpId;
   /// ..UserId = Sessionvalue.UserId; 
   this.SaveallfieldsList = this.PMSEmployeesForm.value;
   this.SaveallfieldsList.PMSEmpId = this.PAMSEmpId;
   this.SaveallfieldsList.UserId = Sessionvalue.UserId;
    this.PMSEService.SaveData(this.SaveallfieldsList).subscribe(


      (data) => {     
        this.CommonfieldsList = data.Table;
        if(this.CommonfieldsList[0].Result == "1"){
           // alert("save");
            this.showModalsavepopup = true;
            this. BindGrid();
        } 
        else{
          alert("not save");
        }
          
        });
        this.showModalPMSEmploye = false;
      }
      else {
        this.validateAllFormFields(this.PMSEmployeesForm);
     }
     this.BindGrid();
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
  get AllFields() { return this.PMSEmployeesForm.controls; }
  displayFieldCss(field: string) {
    return {
        'validate': this.isFieldValid(field),
    };
}
isFieldValid(field: string) {
    return !this.PMSEmployeesForm.get(field).valid && this.PMSEmployeesForm.get(field).touched;
}

  BindCustodian(){
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    let  Data = new Commonfields();
    Data.UserId = Sessionvalue.UserId;
    this.PMSEService.BindCustodian(JSON.stringify(Data)).subscribe(
      (data) => {
        this.AllcustodianfieldsList = data.Table;         
        });
  }
  Search(value){
   // alert(value);
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    let  Data = new Commonfields();
    Data.UserId = Sessionvalue.UserId;
    Data.Result = value;
    this.PMSEService.Search(JSON.stringify(Data)).subscribe(
      (data) => {
        this.PmsemployeesList = data.Table;         
        });
  }

  ConvertToCSV(objArray) {
    if(this.flag==0){
      this.HeaderArray = {
        srNo: "Sr.No.", EmployeeCode: "Employee Code", EmployeeName: "Employee Name", Gender: "Gender",
        Qualification: "Qualification", About: "About"
    }
  }
  else{
    this.HeaderArray = {
      srNo: "Sr.No.", CustomerName: "Customer Name", CustomerCode: "Customer Code", EmpLinkingDate: "Employee Linking Date",
      InceptionDate: "Inception Date", Custodian: "Custodian"
  }
  }
  var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  var str = '';
  var row = "";

  //   for (var index in objArray[0]) {
          //Now convert each value to string and comma-separated
     //     row += index + ',';
     // }
     // row = row.slice(0, -1);
      //append Label row with line break
     // str += row + '\r\n';

     for (var i = 0; i < array.length; i++) {
      var line = "";

      if (i == 0) {
          for (var index in this.HeaderArray) {
              if (line != '') line += ','

              line += this.HeaderArray[index];
          }
          str += line + '\r\n';
      }
      var line = '';
      for (var index in array[i]) {
        if(index != "PMSEmpId"){
          if(index != "CustId"){
          if (line != '') line += ','
          line += (<string>array[i][index]);
          }
        }
      }
      str += line + '\r\n';
  }
  return str;
}
downloadCSVFile() {
  if(this.flag == 0){
    var csvData = this.ConvertToCSV(JSON.stringify(this.PmsemployeesList));
  }
  else{
    var csvData = this.ConvertToCSV(JSON.stringify(this.BindallcustomersList));
  }
    var a = document.createElement("a");
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    var blob = new Blob([csvData], { type: 'text/csv' });
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    if(this.flag == 0){
      a.download = 'EmployeeFile.csv';/* your file name*/
    }
   else{
    a.download = 'CustomerFile.csv';/* your file name*/
   }
    a.click();
    return 'success';
}
  
  }



