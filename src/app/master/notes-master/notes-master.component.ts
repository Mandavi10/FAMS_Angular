import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotemasterService } from '../../Services/NoteMsater/notemaster.service';
import {Bindgridfields} from '../../../Models/NoteMaster/bindgridfields';
import { Commonfields } from '../../../Models/commonfields';


@Component({
  selector: 'app-notes-master',
  templateUrl: './notes-master.component.html',
  styleUrls: ['./notes-master.component.css']
})
export class NotesMasterComponent implements OnInit {
  BindgridfieldsList : Bindgridfields;CommonfieldsList : Commonfields;showModalsavepopup: boolean= false;
  HeaderArray : any; liNew : boolean = true; liExporttoex : boolean = true; NoteMasterForm : FormGroup;
  columnDefs = [
    {headerName: 'All', field: 'all', width:'60', cellRenderer: function(){
      return'<input type="checkbox" class="texBox" value="All" style="width:15px"/>'
          }},
    {headerName: 'Sr. No.', field: 'srNo', width:'80'},
    {headerName: 'Subject', field: 'subject', width:'150'},
    {headerName: 'Date of Submission', field: 'dateofsubmission', width:'150'},
    
    
];

rowData = [
    {  srNo: '1', subject:'Trial Report', dateofsubmission:'29/05/2020'},
    {  srNo: '2', subject:'Trial Report', dateofsubmission:'29/05/2020'},
    {  srNo: '3', subject:'Trial Report', dateofsubmission:'29/05/2020'},   
];


onClicksavepopup(event) {
  this.showModalsavepopup = true;
  
  }
  
  hidesavepopup() {
  this.showModalsavepopup = false;
  }

  showModalstatemaster: boolean;
  showGrid = true;
  showForm = false;
  onClickNew() {
    this.NoteMasterForm.reset();
    this.liNew = false;
    this.showGrid = false;
    this.showForm = true;
    this.liExporttoex = false;
    }
  onClickstatemaster(event) {
    this.showModalstatemaster = true;    
    }
    
    hidestatemaster() {
    this.showModalstatemaster = false;
    }
  constructor(private NMService : NotemasterService,private router: Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.NoteMasterForm = this.formBuilder.group({ 
      Subject : ['',Validators.required] , Note : [''] ,File : ['']
    });
    this.BindGrid();
  }
  CancelFun(){
  this.showGrid = true;
  this.showForm = false;
  this.liNew = true;
  this.liExporttoex = true;
  this.NoteMasterForm.reset();
  }

  BindGrid(){
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    var UserId = Sessionvalue.UserId;
    var JsonData ={
      "UserId": UserId
    }
    this.NMService.BindGrid(JSON.stringify(JsonData)).subscribe(
      (data) => {  
        this.BindgridfieldsList = data.Table;   
  });
}
SaveData(Subject,Note,File){
  if (this.NoteMasterForm.valid) {
  let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
  var UserId = Sessionvalue.UserId;
  var JsonData ={
    "UserId": UserId,
    "Subject": Subject,
    "Note" : Note,
    "Attachment": File
  }
  this.NMService.SaveData(JSON.stringify(JsonData)).subscribe(
    (data) => {  
      this.CommonfieldsList = data.Table;   
      if(this.CommonfieldsList[0].Result == "1"){
        this.showGrid = true;
        this.showForm = false;
        this.liNew = true;
        this.liExporttoex = true;
        this.showModalsavepopup = true;
        this. BindGrid();
      }
});
  }
  else{
    this.validateAllFormFields(this.NoteMasterForm);
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
displayFieldCss(field: string) {
  return {
      'validate': this.isFieldValid(field),
  };
}
isFieldValid(field: string) {
  return !this.NoteMasterForm.get(field).valid && this.NoteMasterForm.get(field).touched;
}



ConvertToCSV(objArray) {
  this.HeaderArray = {
    srNo: "Sr.No.",  subject: "Subject", 
    dateofsubmission: "Date of submission " 
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
        if(index != "NMId"){
          if (line != '') line += ','
          line += (<string>array[i][index]);
      }
    }
      str += line + '\r\n';
  }
  return str;
}
downloadCSVFile() {  
  var csvData = this.ConvertToCSV(JSON.stringify(this.BindgridfieldsList));
  var a = document.createElement("a");
  a.setAttribute('style', 'display:none;');
  document.body.appendChild(a);
  var blob = new Blob([csvData], { type: 'text/csv' });
  var url = window.URL.createObjectURL(blob);
  a.href = url;  
  a.download = 'NoteFile.csv';/* your file name*/
  a.click();
  return 'success';
}
}
