import { Component, OnInit } from '@angular/core';
import { Customer,GridAllFields, GridAllFields1,GridAllFields2,GridAllFields3,GridAllFields4} from '../../../Models/HoldingReport/holdingReport';
import { HoldingReportService } from 'src/app/Services/HoldingReport/holding-report.service';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import{DbsecurityService}from 'src/app/Services/dbsecurity.service';
@Component({
  selector: 'app-holding-report',
  templateUrl: './holding-report.component.html',
  styleUrls: ['./holding-report.component.css']
})
export class HoldingReportComponent implements OnInit {
  showModalstatemaster: boolean;
  HoldingReportFormGrp: FormGroup; customer:Customer ;
   gridAllFields: GridAllFields; 
   gridAllFields1: GridAllFields1; 
   gridAllFields2: GridAllFields2; 
   gridAllFields3: GridAllFields3; 
   gridAllFields4: GridAllFields4; 
   buttonDisabledReset: boolean = false; /*buttonDisabledDelete: boolean = true;*/ submitted = false; sucess = false; Show = true;
  Temp: number = 1; CustodianId: number = 0; loading: boolean = false;
  message: string;
  setClickedRow: Function;
  Isdiv1:boolean;
  Isdiv:boolean;
 
  constructor(private formbulider: FormBuilder, private _holdingReportService: HoldingReportService,private Dbsecurity: DbsecurityService) {

    //  this.custodian = new Custodian();
     
  }
  CurrentDate = new Date();
  isShowCustomer:boolean=false;
  CustomerAccount:string;
  userType:number;
 accountNumber:string;
  selectedRowId:number;
  pmsDetails:[];
  IsEquity:boolean;
  IsCashAndEquiv:boolean;
  ngOnInit(): void {
    this.HoldingReportFormGrp = this.formbulider.group({
      UserId: [0, ],
      Date: ['',],
  });
  debugger;
    let item = JSON.parse(sessionStorage.getItem('User'));
  // this.UserId = item.UserId;
  // this.EntityId = item.ReferenceId;
    this.userType=this.Dbsecurity.Decrypt( item.UserType);
    this.accountNumber=this.Dbsecurity.Decrypt( item.AccountNo);
    if(this.userType == 2)
    {
      this.isShowCustomer=true;
      this.BindCustomer();
    }
    else{
      this.isShowCustomer=false;
    }
    
  }

  BindCustomer() {
    debugger;
    this.loading = true;
    var currentContext = this;
    this._holdingReportService.BindCustomer().
        subscribe((data) => {
            currentContext.customer = data.Table;
        });
    // console.log(sessionStorage.getItem('ID'));
    this.loading = false;
  }

  BindHoldingReport(CustomerAccount,Date) {
    debugger;
    this.loading = true;
    var currentContext = this;
    this._holdingReportService.BindGridAllFields(CustomerAccount,Date).
        subscribe((data) => {
            currentContext.gridAllFields = data.Table;
            currentContext.gridAllFields1 = data.Table1;
            currentContext.gridAllFields2 = data.Table2;
            currentContext.gridAllFields3 = data.Table3;
            currentContext.gridAllFields4 = data.Table4;      
            if(data.Table.length>0)      
            {
              this.IsEquity=true;
            }
            else
            {
              this.IsEquity=false;
            }
            if(data.Table2.length>0)      
            {
              this.IsCashAndEquiv=true;
            }
            else
            {
              this.IsCashAndEquiv=false;
            }
        });
    // console.log(sessionStorage.getItem('ID'));
    this.loading = false;
  }
  onSubmit() {
    debugger;
    //alert('OnSubmi Clicked');
    //this.submitted = true;
    if (this.HoldingReportFormGrp.valid) {
        //this.sucess=true;
        const datat = this.HoldingReportFormGrp.value;
        // var CustomerAccount="Cust_000001";
        // var Date="2020-04-09";
       // var CustomerAccount:
        if(datat.UserId=="0")
        {
         this.CustomerAccount=this.accountNumber
        }
        else{
         this.CustomerAccount=datat.UserId;

        }
        
        var Date=datat.Date;
        this.BindHoldingReport(this.CustomerAccount,Date);
    } 
  }

}
