import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statement-dividend',
  templateUrl: './statement-dividend.component.html',
  styleUrls: ['./statement-dividend.component.css']
})
export class StatementDividendComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    this.btnPrev=false;
    this.btnNext==false;
    this.Showcustdropdown(); 
    this.StatementDividendForm=this.formbuilder.group({
      Formdate:['',Validators.required],
      Todate:['',Validators.required] ,
      CustomerAccount:['',Validators.required] 
      //CustomerAccount
    })
    this.BindCustomers();
  }

Showcustdropdown(){ 
  let item = JSON.parse(sessionStorage.getItem('User'));
  var usertype=this.Dbsecurity.Decrypt(item.UserType);
  var userid=this.Dbsecurity.Decrypt(item.UserId);
  
  if(usertype == 2 ||usertype == 3 || usertype == 4){
    this.CustNameDive=true; 
    // this.StatementDividendForm=this.formbuilder.group({
    //   CustomerAccount:['',Validators.required] 
    // })
  }
  else{
    this.CustNameDive=false; 

  }
}
  
  get f() {
    return this.StatementDividendForm.controls;
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

LastOneMonthFun(){
  var date = new Date();
  var currentDate = date.toISOString().slice(0,10);
  this.StatementDividendForm.controls['Todate'].setValue(currentDate);
  date.setDate(date.getDate() - 30);
  var yesterday = date.toISOString().slice(0,10);
  this.StatementDividendForm.controls['Formdate'].setValue(yesterday);
}

PreviousDayFun(){
  var date = new Date();
  var currentDate = date.toISOString().slice(0,10);
  console.log(currentDate);
  this.StatementDividendForm.controls['Todate'].setValue(currentDate);
  date.setDate(date.getDate() - 1);
  var yesterday = date.toISOString().slice(0,10);
  console.log(yesterday);
  this.StatementDividendForm.controls['Formdate'].setValue(yesterday);

  
        
}

LastOneWeekFun(){
  var date = new Date();
  var currentDate = date.toISOString().slice(0,10);
  console.log(currentDate);
  this.StatementDividendForm.controls['Todate'].setValue(currentDate);
  date.setDate(date.getDate() - 7);
  var yesterday = date.toISOString().slice(0,10);
  console.log(yesterday);
  this.StatementDividendForm.controls['Formdate'].setValue(yesterday);
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
   
    const IsCustomerAccount = this.StatementDividendForm.get('CustomerAccount');
    IsCustomerAccount.setValidators(Validators.required); IsCustomerAccount.updateValueAndValidity();
    CustomerAccountNo= this.Dbsecurity.Encrypt(this.StatementDividendForm.controls['CustomerAccount'].value);
  }
  else{
    const IsCustomerAccount = this.StatementDividendForm.get('CustomerAccount');
    IsCustomerAccount.clearValidators(); IsCustomerAccount.updateValueAndValidity();
    CustomerAccountNo= item.AccountNo
    
  }
  this.submitted = true;
  if (this.StatementDividendForm.invalid) {
    
    return;

  }

}
