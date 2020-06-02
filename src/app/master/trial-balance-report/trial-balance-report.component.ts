import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import{JsonFieldData,Customer} from '../../../Models/TrialBalanceReport/json-field-data';
import{TrialbalancereportService}from '../../Services/TrialBalanceReport/trialbalancereport.service';
import{DbsecurityService}from '../../Services/dbsecurity.service';





@Component({
  selector: 'app-trial-balance-report',
  templateUrl: './trial-balance-report.component.html',
  styleUrls: ['./trial-balance-report.component.css']
})
export class TrialBalanceReportComponent implements OnInit {
   BindSubAccountAssets : any= [];TrialBalanceForm: FormGroup; 
   AccountNo : any;customer:Customer ;

  constructor(private _TrialBalanceService: TrialbalancereportService, private formBuilder: FormBuilder, private Dbsecurity: DbsecurityService) { }
  isShowCustomer:boolean=false;
  accountNumber:string;
  userType:number;
    ngOnInit(): void {
      let item = JSON.parse(sessionStorage.getItem('User'));
     
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
    this.TrialBalanceForm = this.formBuilder.group({  
      CustomerAccount : [''], Account :[''], AccountSubLayer : [''], FromDate : [''], ToDate : ['']
  });
   
  }
BindCustomer(){
  var currentContext = this;
  this._TrialBalanceService.BindCustomer().
      subscribe((data) => {
          currentContext.customer = data.Table;
      });

}

  AccontsFunction(value:any){
    if(value=='1')
    {
      this.BindSubAccountAssets=[{text: 'Select', value: '' },
      {text: 'Current Assets', value: '2' },
      {text: 'Investment', value: '5' },
      {text: 'All', value: '50' },
    ];
    }
    else if(value=='3')
    {
      this.BindSubAccountAssets=[{text: 'Select', value: '' },
      {text: 'Dividend', value: '1' },
      {text: 'Gain/Loss', value: '2' },
      {text: 'All', value: '50' },
    ];
    }
    else if(value=='4')
    {
      this.BindSubAccountAssets=[{text: 'Select', value: '' },
      {text: 'Capital', value: '1' },
      {text: 'Current Liabilities', value: '2' },
      {text: 'Unrealized Gain\Loss', value: '2' },
      {text: 'All', value: '50' },

    ];
    }
    else if(value=='50')
    {
      this.BindSubAccountAssets=[
      {text: 'All', value: '50' },
    ];
  }
    else if(value=='2')
    {
      this.BindSubAccountAssets=[
      {text: 'All', value: '50' },
    ];
  }
    }    
      
  GetData()
  {
    // let _apipostdata = new JsonFieldData();
    // //_apipostdata.APPID=this.AllFields.APPID.value;
    // _apipostdata.CustomerAccount=this.Dbsecurity.Encrypt(this.AllFields.ddlCustomer.value);
    // _apipostdata.Account=this.AllFields.ddlAccount.value;
    // _apipostdata.AccountSubLayer=this.AllFields.ddlSubLayer.value;
    // _apipostdata.FromDate=this.AllFields.FromDate.value;
    // _apipostdata.ToDate=this.AllFields.ToDate.value;
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    
  let Data = new JsonFieldData();
if(this.Dbsecurity.Decrypt(Sessionvalue.UserType)!="2")
{
  Data.CustomerAccount = this.Dbsecurity.Decrypt(Sessionvalue.AccountNo);
  Data.Account = "50";
  Data.AccountSubLayer = "50";
  Data.FromDate = this.TrialBalanceForm.get['FromDate'];
  Data.ToDate = this.TrialBalanceForm.get['ToDate'];
}
else
{
  Data = this.TrialBalanceForm.value;

}
    //this.JsonFieldDataList.Account = this.TrialBalanceForm.get['Account'];
     this._TrialBalanceService.GetTrialData(JSON.stringify(Data)).subscribe(
      (data) => {
      }
  );
}
}
