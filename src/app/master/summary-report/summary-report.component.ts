import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SummaryreportService } from '../../Services/SummaryReport/summaryreport.service';

@Component({
  selector: 'app-summary-report',
  templateUrl: './summary-report.component.html',
  styleUrls: ['./summary-report.component.css']
})
export class SummaryReportComponent implements OnInit {
  CustNameDive : boolean = true;
  columnDefs = [
    {headerName: '', field: 'heading', width:'300'},
    {headerName: '', field: 'value', width:'150'}
];

rowData = [
    {heading: 'Market Value as of 05/29/2020', value: ''},
    {heading: 'Opening NAV as of 05/29/2020', value: ''},
    {heading: 'Opening Outstanding Units as of 05/29/2020', value: ''},
    {heading: 'Capital In(+)/Out(-)', value: ''},
    {heading: 'Realized Gain', value: ''},
    {heading: 'Unrealized Gain', value: ''},
    {heading: 'Gain Prior to Take-over', value: ''},
    {heading: 'Income', value: ''},
    {heading: 'Fees', value: ''},
    {heading: 'Expenses', value: ''},
    {heading: 'Accrued Income', value: ''},
    {heading: 'Market Value as of 05/29/2020', value: ''},
    {heading: 'Closing NAV as of 05/29/2020', value: ''},
    {heading: 'Closing Outstanding Units as of 05/29/2020', value: ''},
];

  constructor(private SRService : SummaryreportService) { }

  ngOnInit(): void {
  }
  BindGrid(){
    this.SRService.BindGrid().subscribe(
      (data) => {
        //this.PmsemployeesList = data.Table;
          
        });
  }
}
