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
    this.showGrid = false;
    this.showForm = true;
    }
  onClickstatemaster(event) {
    this.showModalstatemaster = true;    
    }
    
    hidestatemaster() {
    this.showModalstatemaster = false;
    }
  constructor(private NMService : NotemasterService) { }

  ngOnInit(): void {
    this.BindGrid();
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
        this.showModalsavepopup = true;
        this. BindGrid();
      }
});
}
}
