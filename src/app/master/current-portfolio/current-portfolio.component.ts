import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-portfolio',
  templateUrl: './current-portfolio.component.html',
  styleUrls: ['./current-portfolio.component.css']
})
export class CurrentPortfolioComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    this.CurrentPortfolioForm = this.formBuilder.group({  
      Formdate:['',Validators.required],
      Todate:['',Validators.required],
      CustomerAccount:['',Validators.required] 
  });
  this.Showcustdropdown();
  this.BindCustomers();
  }

  get f() {
    return this.CurrentPortfolioForm.controls;
  }
  Showcustdropdown(){
    let item = JSON.parse(sessionStorage.getItem('User'));
    var usertype=this.Dbsecurity.Decrypt(item.UserType);
    var userid=this.Dbsecurity.Decrypt(item.UserId);
    
    if(usertype == 2 ||usertype == 3 || usertype == 4){
      this.CustNameDive=true; 
    }
    else{
      this.CustNameDive=false; 
  
    }
  }


  BindCustomers(){
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    let  Data = new Commonfields();
    Data.UserId = Sessionvalue.UserId;
    this.SRService.BindCustomers(JSON.stringify(Data)).subscribe(
      (data) => {
           this.BindcustomerallfieldsList = data.Table;
      });
  }
  

  BindCurrentPortFolioReport(FromDate,ToDate) {

    // alert(this.CurrentPortfolioForm.controls['CustomerAccount'].value )

    let item = JSON.parse(sessionStorage.getItem('User'));
    var usertype=this.Dbsecurity.Decrypt(item.UserType);
    var userid, CustomerAccountNo;
  
    if(usertype == 2 ||usertype == 3 || usertype == 4){
     
      const IsCustomerAccount = this.CurrentPortfolioForm.get('CustomerAccount');
      IsCustomerAccount.setValidators(Validators.required); IsCustomerAccount.updateValueAndValidity();
       CustomerAccountNo= this.Dbsecurity.Encrypt(this.CurrentPortfolioForm.controls['CustomerAccount'].value);
      
    }
    else{
      const IsCustomerAccount = this.CurrentPortfolioForm.get('CustomerAccount');
      IsCustomerAccount.clearValidators(); IsCustomerAccount.updateValueAndValidity();
      CustomerAccountNo= item.AccountNo
      
      
      
    }

    this.submitted = true;
    if (this.CurrentPortfolioForm.invalid) {
      return;
    }
    else{
    
    this.loading = true;
    var currentContext = this;

    // this.FromDate = this.datepipe.transform(FromDate, 'dd-MM-yyyy');
    // this.ToDate = this.datepipe.transform(ToDate, 'dd-MM-yyyy');
    this.divMainGrid=true;
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    var UserId = Sessionvalue.UserId;
    var JsonData ={
      "UserId" : UserId,
      "FromDate" :   FromDate,   
      "ToDate" :  ToDate   ,
      "CustomerAccountNo"   :   CustomerAccountNo
    }
 
    this._CurrentportfolioService.BindGridAllFields(JsonData).
        subscribe((data) => {
          
          this.CurrentportfolioList = data.Table;
          console.log('cportfolio') 
          console.log(data) 

         this.STSumGL = data.Table1[0].SumGL
         this. STSumIncome = data.Table1[0].SumIncome
         this. STSumMarketValue = data.Table1[0].SumMarketValue
         this. STSumPercentAssets= data.Table1[0].SumPercentAssets
         this. STSumPercentG_L= data.Table1[0].SumPercentG_L
         this. STSumTotalCost = data.Table1[0].SumTotalCost
          
          
        
         this. ETSumGL = data.Table2[0].SumGL
         this. ETSumIncome= data.Table2[0].SumIncome
         this. ETSumMarketValue = data.Table2[0].SumMarketValue
         this. ETSumPercentAssets = data.Table2[0].SumPercentAssets
         this. ETSumPercentG_L = data.Table2[0].SumPercentG_L
         this. ETSumTotalCost = data.Table2[0].SumTotalCost
         

            // currentContext.gridAllFields = data.Table;
            // currentContext.gridAllFields1 = data.Table1;
            // currentContext.gridAllFields2 = data.Table2;
            // currentContext.gridAllFields3 = data.Table3;
            // currentContext.gridAllFields4 = data.Table4;   
            // currentContext.gridAllFields5 = data.Table5;    
              
            // if(data.Table.length>0)      
            // {
            //   this.IsEquity=true;
            // }
            // else
            // {
            //   this.IsEquity=false;
            // }
            // if(data.Table2.length>0)      
            // {
            //   this.IsCashAndEquiv=true;
            // }
            // else
            // {
            //   this.IsCashAndEquiv=false;
            // }
        });
    // console.log(sessionStorage.getItem('ID'));
    this.loading = false;
  }
}

  }


}
