import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PmsemployeesService } from '../../Services/PMSEmployees/pmsemployees.service';
import { Pmsemployees } from '../../../Models/PMSEmployees/pmsemployees';
import { Saveallfields } from '../../../Models/PMSEmployees/Saveallfields';
import { Allcustodianfields } from '../../../Models/PMSEmployees/Allcustodianfields';
import { Commonfields } from '../../../Models/commonfields';
// import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-pmsemployees',
  templateUrl: './pmsemployees.component.html',
  styleUrls: ['./pmsemployees.component.css']
})
export class PMSEmployeesComponent implements OnInit {
  PmsemployeesList : Pmsemployees; PMSEmployeesForm: FormGroup; CommonfieldsList : Commonfields; AllcustodianfieldsList : Allcustodianfields
  //SaveallfieldsList : Saveallfields;
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
    {headerName: 'Employee Linking Date', field: 'EmployeeLinkingDate', width:'200'},
   
   
    
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
    this.showCustomer = true;
    this.showGrid = false;
  }
  onClickPMSEmploye(event) {
    this.showModalPMSEmploye = true;
    
    }
    
    hidePMSEmploye() {
    this.showModalPMSEmploye = false;
    }

  constructor(private router: Router, private formBuilder: FormBuilder,private PMSEService : PmsemployeesService) { }

  ngOnInit(): void {
    this.PMSEmployeesForm = this.formBuilder.group({  
      EmployeeCode : [''], EmployeeName :[''], Gender : [''], Qualification : [''], About : [''],
      CustomerCode : [''], CustomerName : [''] , Custodian : [''], InceptionDate : [''], EmpLinkingDate : [''],
      Active : ['']
  });
    this.BindGrid();
    this.BindCustodian();
  }

  BindGrid(){
    this.PMSEService.BindGrid().subscribe(
      (data) => {
        this.PmsemployeesList = data.Table;
          
        });
  }

  SaveDataFun(){
    if (this.PMSEmployeesForm.valid) {
      alert("valid");
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    let SaveallfieldsList = new Saveallfields();
    SaveallfieldsList.UserId = "3";
    SaveallfieldsList = this.PMSEmployeesForm.value;
    this.PMSEService.SaveData(JSON.stringify(SaveallfieldsList)).subscribe(
      (data) => {
        this.CommonfieldsList = data.Table;
          
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
    this.PMSEService.BindCustodian().subscribe(
      (data) => {
        this.AllcustodianfieldsList = data.Table;
          
        });
  }
  
  }



