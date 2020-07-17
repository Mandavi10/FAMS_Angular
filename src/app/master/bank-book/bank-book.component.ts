import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { BankbookService } from '../../Services/BankBook/bankbook.service';
import { Bindgrid } from '../../../Models/BankBook/bindgrid';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bank-book',
  templateUrl: './bank-book.component.html',
  styleUrls: ['./bank-book.component.css']
})
export class BankBookComponent implements OnInit {
  BindgridList:Bindgrid;BankBookForm:FormGroup;
  constructor(private BSService : BankbookService,private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.BankBookForm = this.formBuilder.group({  
      FromDate :[''], ToDate : ['']
  });
  }

  BindGrid(FromDate,ToDate){
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    var UserId = Sessionvalue.UserId;
    var JsonData ={
      "UserId" : UserId,
      "FromDate" :   FromDate,   
      "ToDate" :  ToDate         
    }
    this.BSService.BindGrid(JsonData).subscribe(
      (data) => {
        this.BindgridList = data.Table; 
        console.log(this.BindgridList);       
        });
  }

  PreviousDayFun(){
    var date = new Date();
    var currentDate = date.toISOString().slice(0,10);
    this.BankBookForm.controls['ToDate'].setValue(currentDate);
    date.setDate(date.getDate() - 1);
    var yesterday = date.toISOString().slice(0,10);
    this.BankBookForm.controls['FromDate'].setValue(yesterday);
  }

  LastOneWeekFun(){
    var date = new Date();
    var currentDate = date.toISOString().slice(0,10);
    this.BankBookForm.controls['ToDate'].setValue(currentDate);
    date.setDate(date.getDate() - 7);
    var yesterday = date.toISOString().slice(0,10);
    this.BankBookForm.controls['FromDate'].setValue(yesterday);
  }
  LastOneMonthFun(){
    var date = new Date();
    var currentDate = date.toISOString().slice(0,10);
    this.BankBookForm.controls['ToDate'].setValue(currentDate);
    date.setDate(date.getDate() - 30);
    var yesterday = date.toISOString().slice(0,10);
    this.BankBookForm.controls['FromDate'].setValue(yesterday);
  }


}
