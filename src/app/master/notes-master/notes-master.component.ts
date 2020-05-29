import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes-master',
  templateUrl: './notes-master.component.html',
  styleUrls: ['./notes-master.component.css']
})
export class NotesMasterComponent implements OnInit {

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
  constructor() { }

  ngOnInit(): void {
  }

}
