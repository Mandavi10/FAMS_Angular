import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { AllCustomersService } from '../../Services/AllCustomers/all-customers.service';
import { AllCustomers} from '../../../Models/AllCustomers/all-customers';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-all-customers',
  templateUrl: './all-customers.component.html',
  styleUrls: ['./all-customers.component.css']
})
export class AllCustomersComponent implements OnInit {
  AllCustomersList:AllCustomers;AllCustomersForm: FormGroup;
  columnDefs = [
    {headerName: 'Sr. No.', field: 'Sno', width:'80'},
    {headerName: 'Customer Account', field: 'AccountNo', width:'150'},
    {headerName: 'User Name', field: 'UserName', width:'150'},
    {headerName: 'User Email', field: 'EmailId', width:'150'},
    {headerName: 'Active', field: 'Active', width:'150'},
   
    
];

rowData = [
    {  srNo: '1', CustomerAccount:'Demo demo demo', UserName:'Demo',  UserEmail: 'Demo', Active: 'Demo'},
    {  srNo: '2', CustomerAccount:'Demo', UserName:'Demo',  UserEmail: 'Demo', Active: 'Demo'},
    {  srNo: '3', CustomerAccount:'Demo', UserName:'Demo',  UserEmail: 'Demo', Active: 'Demo'}
   
   
];






  constructor(private formBuilder: FormBuilder,private AllCustomerService : AllCustomersService) { }

  ngOnInit(): void {
    this.AllCustomersForm = this.formBuilder.group({  
      CustomerAccount : [''], CustomerUsername :[''], CustomerEmailID : ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
  });
 this.BindGrid();
  }
  
BindGrid(){
  this.AllCustomerService.BindGrid().subscribe(
    (data) => {
      this.AllCustomersList = data.Table;
        
      });
}
}

