import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-capital-statement',
  templateUrl: './capital-statement.component.html',
  styleUrls: ['./capital-statement.component.css']
})
export class CapitalStatementComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.showhead=true;
    this.btnPrev=false;
    this.btnNext==false;
    this.Showcustdropdown();
    this.capitalStatForm=this.formbuilder.group({
      Formdate:['',Validators.required],
      Todate:['',Validators.required],
      CustomerAccount:['',Validators.required] 
    })

    this.DownloadExcel();
    this.BindCustomers();
    
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

  get f() {
    return this.capitalStatForm.controls;
  }

  prevClick(){
    this.PageCount = this.PageCount - 1;
    this.bindGrid();
    if (this.PageCount == 1) {
        this.btnPrev=false;
    }
    else {
      this.btnPrev=true;
    }

}
nextClick(){
  this.PageCount = this.PageCount + 1;
  this.bindGrid();
  if (this.PageCount > 1) {
      this.btnPrev=true;
  }
  else {
    this.btnPrev=false;
  }
}

// PreviousDayFun(){
//   var date = new Date();
//   var currentDate = date.toISOString().slice(0,10);
//   this.capitalStatForm.controls['ToDate'].setValue(currentDate);
//   date.setDate(date.getDate() - 1);
//   var yesterday = date.toISOString().slice(0,10);
//   this.capitalStatForm.controls['FromDate'].setValue(yesterday);
//   console.log(currentDate);
//       console.log(yesterday);
// }

// LastOneWeekFun(){
//   var date = new Date();
//   var currentDate = date.toISOString().slice(0,10);
//   this.capitalStatForm.controls['ToDate'].setValue(currentDate);
//   date.setDate(date.getDate() - 7);
//   var yesterday = date.toISOString().slice(0,10);
//   this.capitalStatForm.controls['FromDate'].setValue(yesterday);
//   console.log(currentDate);
//       console.log(yesterday);
// }
LastTwoWeekFun(){
  var date = new Date();
  var currentDate = date.toISOString().slice(0,10);
  console.log(currentDate);
  this.capitalStatForm.controls['Todate'].setValue(currentDate);
  date.setDate(date.getDate() - 14);
  var yesterday = date.toISOString().slice(0,10);
  console.log(yesterday);
  this.capitalStatForm.controls['Formdate'].setValue(yesterday);
      
}

// LastOneMonthFun(){
//   var date = new Date();
//   var currentDate = date.toISOString().slice(0,10);
//   this.capitalStatForm.controls['ToDate'].setValue(currentDate);
//   date.setDate(date.getDate() - 30);
//   var yesterday = date.toISOString().slice(0,10);
//   this.capitalStatForm.controls['FromDate'].setValue(yesterday);
// }

PreviousDayFun(){
  var date = new Date();
  var currentDate = date.toISOString().slice(0,10);
  console.log(currentDate);
  this.capitalStatForm.controls['Todate'].setValue(currentDate);
  date.setDate(date.getDate() - 1);
  var yesterday = date.toISOString().slice(0,10);
  console.log(yesterday);
  this.capitalStatForm.controls['Formdate'].setValue(yesterday);

  
        
}

LastOneWeekFun(){
  var date = new Date();
  var currentDate = date.toISOString().slice(0,10);
  console.log(currentDate);
  this.capitalStatForm.controls['Todate'].setValue(currentDate);
  date.setDate(date.getDate() - 7);
  var yesterday = date.toISOString().slice(0,10);
  console.log(yesterday);
  this.capitalStatForm.controls['Formdate'].setValue(yesterday);
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


  bindGrid(){

    let item = JSON.parse(sessionStorage.getItem('User'));
    var usertype=this.Dbsecurity.Decrypt(item.UserType);
    var userid, CustomerAccountNo;
  
    if(usertype == 2 ||usertype == 3 || usertype == 4){
     
      const IsCustomerAccount = this.capitalStatForm.get('CustomerAccount');
      IsCustomerAccount.setValidators(Validators.required); IsCustomerAccount.updateValueAndValidity();
      CustomerAccountNo= this.Dbsecurity.Encrypt(this.capitalStatForm.controls['CustomerAccount'].value);
    }
    else{
      const IsCustomerAccount = this.capitalStatForm.get('CustomerAccount');
      IsCustomerAccount.clearValidators(); IsCustomerAccount.updateValueAndValidity();
      CustomerAccountNo= item.AccountNo
      
    }

    this.submitted = true;
    if (this.capitalStatForm.invalid) {
      return;
    }
    else{
      let item = JSON.parse(sessionStorage.getItem('User'));
      var usertype=this.Dbsecurity.Decrypt(item.UserType);
      var userid, CustomerAccountNo;
      
      // if(usertype == 2 ||usertype == 3 || usertype == 4){
  
      //   //userid=this.StatementDividendForm.controls['CustomerAccount'].value accountno
      //   CustomerAccountNo= this.Dbsecurity.Encrypt(this.capitalStatForm.controls['CustomerAccount'].value);
        
      // } 
      // else
      // {
      //   userid= item.UserId
      // }

   var jasondata= {
    "fromdate":this.capitalStatForm.controls['Formdate'].value ,
    "PageCount": this.PageCount,
    "todate":this.capitalStatForm.controls['Todate'].value,
    "UserId": item.UserId,
    "CustomerAccountNo": CustomerAccountNo
   
  }
  this.ShowLoaderp=true;
this._capitalStateService.BindGrid(jasondata).subscribe((res)=>{

  this.bindgrid=res.Table;
  //this.pagination=res.Table1;
  console.log('bindgrid');
  console.log(res);
  console.log(res.Table[0].SaleAmount);
  console.log(this.bindgrid[0].SaleDate);

  for(var i=0;i<res.Table.length;i++){
   
    if(this.bindgrid[i].SaleAmount == null){
      this.bindgrid[i].SaleAmount = ''
      // this.bindgrid1[i].FromDate = ''
      // this.bindgrid1[i].Amount = ''
    }
    if( this.bindgrid[i].PurchaseAmount == null){
      this.bindgrid[i].PurchaseAmount = ''
    }
    if( this.bindgrid[i].IndexedCost == null){
      this.bindgrid[i].IndexedCost = ''
    }
    if( this.bindgrid[i].LT == null){
      this.bindgrid[i].LT = ''
    }
    if( this.bindgrid[i].AfterIndex_LT == null){
      this.bindgrid[i].AfterIndex_LT = ''
    }
    

  }
 
  console.log(this.bindgrid);
  this.SumSaleAmount=res.Table1[0].SumSaleAmount;
  this.SumPurchaseAmount=res.Table1[0].SumPurchaseAmount;
  this.SumIndexedCost=res.Table1[0].SumIndexedCost;
  this.SumST=res.Table1[0].SumST;
  this.SumLT=res.Table1[0].SumLT;
  this.SumAfterIndex_LT=res.Table1[0].SumAfterIndex_LT;
  
  this.ShowLoaderp=false;
  
  })
}


  }

}
