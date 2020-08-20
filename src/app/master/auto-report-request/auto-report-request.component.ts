import { Component, OnInit } from '@angular/core';
import{DbsecurityService}from 'src/app/Services/dbsecurity.service';
import { AutoreportrequestService} from 'src/app/Services/AutoReportRequest/autoreportrequest.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-auto-report-request',
  templateUrl: './auto-report-request.component.html',
  styleUrls: ['./auto-report-request.component.css']
})
export class AutoReportRequestComponent implements OnInit {
  UserId: string = "";
  CustomerAccount: string = "";
  FrequencyData=[];
  message: string = "";
  showModalsavepopup:boolean;
  isShowLoader:boolean;

  PromptshowModalsavepopup:boolean;
  PromptMessage:string;

  constructor(private router: Router,private Dbsecurity: DbsecurityService,private _autoreportrequestService: AutoreportrequestService) { }

  ngOnInit() {
    debugger;
    let item = JSON.parse(sessionStorage.getItem('User'));
  this.UserId = this.Dbsecurity.Decrypt(item.UserId);
  this.CustomerAccount = item.AccountNo;
    this.BindAutoReportRequest(this.CustomerAccount);
  }
  Prompt1() {
    this.PromptMessage="Are you sure you want to have these changes.?";
    this.PromptshowModalsavepopup = true;
  }
  YesClick(event) { 
    this.PromptshowModalsavepopup = false;
   
  var li4_1= document.getElementById('4_1');
  var li4_2 = document.getElementById('4_2');
  var li4_3 = document.getElementById('4_3');
  var li4_4 = document.getElementById('4_4');
  var li4_5 = document.getElementById('4_5');
 var ReportType4=0;
 var FrequencyType4=0;
  if(li4_1.className=="btngreen")
  {
    ReportType4=4;
    FrequencyType4=1;
  }
 else if(li4_2.className=="btngreen")
  {
    ReportType4=4;
    FrequencyType4=2;
  }
  else if(li4_3.className=="btngreen")
  {
    ReportType4=4;
    FrequencyType4=3;
  }
  else if(li4_4.className=="btngreen")
  {
    ReportType4=4;
    FrequencyType4=4;
  }
  else if(li4_5.className=="btngreen")
  {
    ReportType4=4;
    FrequencyType4=5;
  }



  var li3_1= document.getElementById('3_1');
  var li3_2 = document.getElementById('3_2');
  var li3_3 = document.getElementById('3_3');
  var li3_4 = document.getElementById('3_4');
  var li3_5 = document.getElementById('3_5');
 var ReportType3=0;
 var FrequencyType3=0;
  if(li3_1.className=="btngreen")
  {
    ReportType3=3;
    FrequencyType3=1;
  }
 else if(li3_2.className=="btngreen")
  {
    ReportType3=3;
    FrequencyType3=2;
  }
  else if(li3_3.className=="btngreen")
  {
    ReportType3=3;
    FrequencyType3=3;
  }
  else if(li3_4.className=="btngreen")
  {
    ReportType3=3;
    FrequencyType3=4;
  }
  else if(li3_5.className=="btngreen")
  {
    ReportType3=3;
    FrequencyType3=5;
  }


  var li5_1= document.getElementById('5_1');
  var li5_2 = document.getElementById('5_2');
  var li5_3 = document.getElementById('5_3');
  var li5_4 = document.getElementById('5_4');
  var li5_5 = document.getElementById('5_5');
 var ReportType5=0;
 var FrequencyType5=0;
  if(li5_1.className=="btngreen")
  {
    ReportType5=5;
    FrequencyType5=1;
  }
 else if(li5_2.className=="btngreen")
  {
    ReportType5=5;
    FrequencyType5=2;
  }
  else if(li5_3.className=="btngreen")
  {
    ReportType5=5;
    FrequencyType5=3;
  }
  else if(li5_4.className=="btngreen")
  {
    ReportType5=5;
    FrequencyType5=4;
  }
  else if(li5_5.className=="btngreen")
  {
    ReportType5=5;
    FrequencyType5=5;
  }



  var li2_1= document.getElementById('2_1');
  var li2_2 = document.getElementById('2_2');
  var li2_3 = document.getElementById('2_3');
  var li2_4 = document.getElementById('2_4');
  var li2_5 = document.getElementById('2_5');
 var ReportType2=0;
 var FrequencyType2=0;
  if(li2_1.className=="btngreen")
  {
    ReportType2=2;
    FrequencyType2=1;
  }
 else if(li2_2.className=="btngreen")
  {
    ReportType2=2;
    FrequencyType2=2;
  }
  else if(li2_3.className=="btngreen")
  {
    ReportType2=2;
    FrequencyType2=3;
  }
  else if(li2_4.className=="btngreen")
  {
    ReportType2=2;
    FrequencyType2=4;
  }
  else if(li2_5.className=="btngreen")
  {
    ReportType2=2;
    FrequencyType2=5;
  }



  var li7_1= document.getElementById('7_1');
  var li7_2 = document.getElementById('7_2');
  var li7_3 = document.getElementById('7_3');
  var li7_4 = document.getElementById('7_4');
  var li7_5 = document.getElementById('7_5');
 var ReportType7=0;
 var FrequencyType7=0;
  if(li7_1.className=="btngreen")
  {
    ReportType7=7;
    FrequencyType7=1;
  }
 else if(li7_2.className=="btngreen")
  {
    ReportType7=7;
    FrequencyType7=2;
  }
  else if(li7_3.className=="btngreen")
  {
    ReportType7=7;
    FrequencyType7=3;
  }
  else if(li7_4.className=="btngreen")
  {
    ReportType7=7;
    FrequencyType7=4;
  }
  else if(li7_5.className=="btngreen")
  {
    ReportType7=7;
    FrequencyType7=5;
  }




  var li1_1= document.getElementById('1_1');
  var li1_2 = document.getElementById('1_2');
  var li1_3 = document.getElementById('1_3');
  var li1_4 = document.getElementById('1_4');
  var li1_5 = document.getElementById('1_5');
 var ReportType1=0;
 var FrequencyType1=0;
  if(li1_1.className=="btngreen")
  {
    ReportType1=1;
    FrequencyType7=1;
  }
 else if(li1_2.className=="btngreen")
  {
    ReportType1=1;
    FrequencyType1=2;
  }
  else if(li1_3.className=="btngreen")
  {
    ReportType1=1;
    FrequencyType1=3;
  }
  else if(li1_4.className=="btngreen")
  {
    ReportType1=1;
    FrequencyType1=4;
  }
  else if(li1_5.className=="btngreen")
  {
    ReportType1=1;
    FrequencyType1=5;
  }



  var li6_1= document.getElementById('6_1');
  var li6_2 = document.getElementById('6_2');
  var li6_3 = document.getElementById('6_3');
  var li6_4 = document.getElementById('6_4');
  var li6_5 = document.getElementById('6_5');
 var ReportType6=0;
 var FrequencyType6=0;
  if(li6_1.className=="btngreen")
  {
    ReportType6=6;
    FrequencyType6=1;
  }
 else if(li6_2.className=="btngreen")
  {
    ReportType6=6;
    FrequencyType6=2;
  }
  else if(li6_3.className=="btngreen")
  {
    ReportType6=6;
    FrequencyType6=3;
  }
  else if(li6_4.className=="btngreen")
  {
    ReportType6=6;
    FrequencyType6=4;
  }
  else if(li6_5.className=="btngreen")
  {
    ReportType6=6;
    FrequencyType6=5;
  }


  var li8_1= document.getElementById('8_1');
  var li8_2 = document.getElementById('8_2');
  var li8_3 = document.getElementById('8_3');
  var li8_4 = document.getElementById('8_4');
  var li8_5 = document.getElementById('8_5');
 var ReportType8=0;
 var FrequencyType8=0;
  if(li8_1.className=="btngreen")
  {
    ReportType8=8;
    FrequencyType8=1;
  }
 else if(li8_2.className=="btngreen")
  {
    ReportType8=8;
    FrequencyType8=2;
  }
  else if(li8_3.className=="btngreen")
  {
    ReportType8=8;
    FrequencyType8=3;
  }
  else if(li8_4.className=="btngreen")
  {
    ReportType8=8;
    FrequencyType8=4;
  }
  else if(li8_5.className=="btngreen")
  {
    ReportType8=8;
    FrequencyType8=5;
  }


  var li9_1= document.getElementById('9_1');
  var li9_2 = document.getElementById('9_2');
  var li9_3 = document.getElementById('9_3');
  var li9_4 = document.getElementById('9_4');
  var li9_5 = document.getElementById('9_5');
 var ReportType9=0;
 var FrequencyType9=0;
  if(li9_1.className=="btngreen")
  {
    ReportType9=9;
    FrequencyType9=1;
  }
 else if(li9_2.className=="btngreen")
  {
    ReportType9=9;
    FrequencyType9=2;
  }
  else if(li9_3.className=="btngreen")
  {
    ReportType9=9;
    FrequencyType9=3;
  }
  else if(li9_4.className=="btngreen")
  {
    ReportType9=9;
    FrequencyType9=4;
  }
  else if(li9_5.className=="btngreen")
  {
    ReportType9=9;
    FrequencyType9=5;
  }



  debugger;
  if(ReportType4 !=0  && FrequencyType4!=0)
  {
    this.FrequencyData.push({UserId:this.UserId,CustomerAccount:this.CustomerAccount,ReportType:ReportType4,FrequencyType:FrequencyType4})
   // this.FrequencyData.push({UserId:this.UserId},{CustomerAccount:this.CustomerAccount},{ReportType:ReportType4},{FrequencyType:FrequencyType4})
    //this.FrequencyData.push({UserId:this.UserId},{CustomerAccount:this.CustomerAccount},{ReportType:ReportType4},{FrequencyType:FrequencyType4})
     //alert(this.UserId +'---'+this.CustomerAccount+ '---'+ReportType4+'---'+FrequencyType4);
  }
  if(ReportType3 !=0  && FrequencyType3!=0)
  {
     //alert(this.UserId +'---'+this.CustomerAccount+ '---'+ReportType3+'---'+FrequencyType3);
    // this.FrequencyData.push({UserId:this.UserId},{CustomerAccount:this.CustomerAccount},{ReportType:ReportType3},{FrequencyType:FrequencyType3})
    this.FrequencyData.push({UserId:this.UserId,CustomerAccount:this.CustomerAccount,ReportType:ReportType3,FrequencyType:FrequencyType3})
  }
  if(ReportType5 !=0  && FrequencyType5!=0)
  {
    //alert(this.UserId +'---'+this.CustomerAccount+ '---'+ReportType5+'---'+FrequencyType5);
    //this.FrequencyData.push({UserId:this.UserId},{CustomerAccount:this.CustomerAccount},{ReportType:ReportType5},{FrequencyType:FrequencyType5})
    this.FrequencyData.push({UserId:this.UserId,CustomerAccount:this.CustomerAccount,ReportType:ReportType5,FrequencyType:FrequencyType5})
  }
  if(ReportType2 !=0  && FrequencyType2!=0)
  {
    //alert(this.UserId +'---'+this.CustomerAccount+ '---'+ReportType2+'---'+FrequencyType2);
    //this.FrequencyData.push({UserId:this.UserId},{CustomerAccount:this.CustomerAccount},{ReportType:ReportType2},{FrequencyType:FrequencyType2})
    this.FrequencyData.push({UserId:this.UserId,CustomerAccount:this.CustomerAccount,ReportType:ReportType2,FrequencyType:FrequencyType2})
  }
  if(ReportType7 !=0  && FrequencyType7!=0)
  {
    //alert(this.UserId +'---'+this.CustomerAccount+ '---'+ReportType7+'---'+FrequencyType7);
    //this.FrequencyData.push({UserId:this.UserId},{CustomerAccount:this.CustomerAccount},{ReportType:ReportType7},{FrequencyType:FrequencyType7})
    this.FrequencyData.push({UserId:this.UserId,CustomerAccount:this.CustomerAccount,ReportType:ReportType7,FrequencyType:FrequencyType7})
  }
  if(ReportType1 !=0  && FrequencyType1!=0)
  {
    //alert(this.UserId +'---'+this.CustomerAccount+ '---'+ReportType1+'---'+FrequencyType1);
    //this.FrequencyData.push({UserId:this.UserId},{CustomerAccount:this.CustomerAccount},{ReportType:ReportType1},{FrequencyType:FrequencyType1})
    this.FrequencyData.push({UserId:this.UserId,CustomerAccount:this.CustomerAccount,ReportType:ReportType1,FrequencyType:FrequencyType1})
  }
  if(ReportType6 !=0  && FrequencyType6!=0)
  {
    //alert(this.UserId +'---'+this.CustomerAccount+ '---'+ReportType6+'---'+FrequencyType6);
    //this.FrequencyData.push({UserId:this.UserId},{CustomerAccount:this.CustomerAccount},{ReportType:ReportType6},{FrequencyType:FrequencyType6})
    this.FrequencyData.push({UserId:this.UserId,CustomerAccount:this.CustomerAccount,ReportType:ReportType6,FrequencyType:FrequencyType6})
  }

  if(ReportType8 !=0  && FrequencyType8!=0)
  {
    //alert(this.UserId +'---'+this.CustomerAccount+ '---'+ReportType8+'---'+FrequencyType8);
    //this.FrequencyData.push({UserId:this.UserId},{CustomerAccount:this.CustomerAccount},{ReportType:ReportType8},{FrequencyType:FrequencyType8})
    this.FrequencyData.push({UserId:this.UserId,CustomerAccount:this.CustomerAccount,ReportType:ReportType8,FrequencyType:FrequencyType8})
  }

  if(ReportType9 !=0  && FrequencyType9!=0)
  {
    //alert(this.UserId +'---'+this.CustomerAccount+ '---'+ReportType9+'---'+FrequencyType9);
    //this.FrequencyData.push({UserId:this.UserId},{CustomerAccount:this.CustomerAccount},{ReportType:ReportType9},{FrequencyType:FrequencyType9})
    this.FrequencyData.push({UserId:this.UserId,CustomerAccount:this.CustomerAccount,ReportType:ReportType9,FrequencyType:FrequencyType9})
  }

// alert(JSON.stringify(this.FrequencyData))
// console.log(JSON.stringify(this.FrequencyData));
if (this.FrequencyData.length==0)
  {
    this.message="Please select Frequency Type !";
    this.onClicksavepopup();
  }
else{
this.SaveAutoReportRequest(this.FrequencyData);
this.FrequencyData=[];
}
//this._autoreportrequestService.SaveAutoReportRequest()


    }
    
    NoClick() {
     this.PromptshowModalsavepopup = false;
     this.router.navigate(['/Home']);
    }
  PortfolioAppraisal1(evt: any) {
    debugger;
 
    var element4_1 = document.getElementById("4_1");
    var element4_2 = document.getElementById("4_2");
    var element4_3 = document.getElementById("4_3");
    var element4_4 = document.getElementById("4_4");
    var element4_5 = document.getElementById("4_5");

    element4_1.classList.remove("btngreen");
    element4_2.classList.remove("btngreen");
    element4_3.classList.remove("btngreen");
    element4_4.classList.remove("btngreen");
    element4_5.classList.remove("btngreen");
 
 
    element4_1.classList.add("btnred");
    element4_2.classList.add("btnred");
    element4_3.classList.add("btnred");
    element4_4.classList.add("btnred");
    element4_5.classList.add("btnred");
 
 
 
    var element = document.getElementById(evt.target.id);
    // alert(evt.target.id)
    // alert(element.className)

    debugger;
    element.classList.remove("btnred");
    element.classList.add("btngreen");
    
    // if(element.className=="btngreen")
    // {
    //   element.classList.remove("btngreen");
    //   element.classList.add("btnred");
    // }
    // else if(element.className=="btnred"){
    //   element.classList.remove("btnred");
    //   element.classList.add("btngreen");
    // }
   }
   PortfolioAppraisal2(evt: any) {
     debugger;
     var element4_1 = document.getElementById("4_1");
     var element4_2 = document.getElementById("4_2");
     var element4_3 = document.getElementById("4_3");
     var element4_4 = document.getElementById("4_4");
     var element4_5 = document.getElementById("4_5");
     element4_1.classList.remove("btngreen");
     element4_2.classList.remove("btngreen");
     element4_3.classList.remove("btngreen");
     element4_4.classList.remove("btngreen");
     element4_5.classList.remove("btngreen");
 
    element4_1.classList.add("btnred");
    element4_2.classList.add("btnred");
    element4_3.classList.add("btnred");
    element4_4.classList.add("btnred");
    element4_5.classList.add("btnred");
  
     var element = document.getElementById(evt.target.id);
     element.classList.remove("btnred");
     element.classList.add("btngreen");



    //  alert(evt.target.id)
    // alert(element.className)

    // if(element.className=="btngreen")
    // {
    //   element.classList.remove("btngreen");
    //   element.classList.add("btnred");
    // }
    // else if(element.className=="btnred"){
    //   element.classList.remove("btnred");
    //   element.classList.add("btngreen");
    // }
    
     
   }
   PortfolioAppraisal3(evt: any) {
     debugger;
     var element4_1 = document.getElementById("4_1");
     var element4_2 = document.getElementById("4_2");
     var element4_3 = document.getElementById("4_3");
     var element4_4 = document.getElementById("4_4");
     var element4_5 = document.getElementById("4_5");
     element4_1.classList.remove("btngreen");
     element4_2.classList.remove("btngreen");
     element4_3.classList.remove("btngreen");
     element4_4.classList.remove("btngreen");
     element4_5.classList.remove("btngreen");
 
     element4_1.classList.add("btnred");
    element4_2.classList.add("btnred");
    element4_3.classList.add("btnred");
    element4_4.classList.add("btnred");
    element4_5.classList.add("btnred");
     var element = document.getElementById(evt.target.id);
     element.classList.remove("btnred");
     element.classList.add("btngreen");
   }
 
   PortfolioAppraisal4(evt: any) {
     debugger;
     var element4_1 = document.getElementById("4_1");
     var element4_2 = document.getElementById("4_2");
     var element4_3 = document.getElementById("4_3");
     var element4_4 = document.getElementById("4_4");
     var element4_5 = document.getElementById("4_5");
     element4_1.classList.remove("btngreen");
     element4_2.classList.remove("btngreen");
     element4_3.classList.remove("btngreen");
     element4_4.classList.remove("btngreen");
     element4_5.classList.remove("btngreen");
     element4_1.classList.add("btnred");
     element4_2.classList.add("btnred");
     element4_3.classList.add("btnred");
     element4_4.classList.add("btnred");
     element4_5.classList.add("btnred");
 
     var element = document.getElementById(evt.target.id);
     element.classList.remove("btnred");
     element.classList.add("btngreen");
   }
 
   PortfolioAppraisal5(evt: any) {
     debugger;
     var element4_1 = document.getElementById("4_1");
     var element4_2 = document.getElementById("4_2");
     var element4_3 = document.getElementById("4_3");
     var element4_4 = document.getElementById("4_4");
     var element4_5 = document.getElementById("4_5");
     element4_1.classList.remove("btngreen");
     element4_2.classList.remove("btngreen");
     element4_3.classList.remove("btngreen");
     element4_4.classList.remove("btngreen");
     element4_5.classList.remove("btngreen");
 
     element4_1.classList.add("btnred");
    element4_2.classList.add("btnred");
    element4_3.classList.add("btnred");
    element4_4.classList.add("btnred");
    element4_5.classList.add("btnred");
     var element = document.getElementById(evt.target.id);
     element.classList.remove("btnred");
     element.classList.add("btngreen");
   }
 //Performance Appraisal start

  PerformanceAppraisal1(evt: any) {
   debugger;

   var element3_1 = document.getElementById("3_1");
   var element3_2 = document.getElementById("3_2");
   var element3_3 = document.getElementById("3_3");
   var element3_4 = document.getElementById("3_4");
   var element3_5 = document.getElementById("3_5");
   element3_1.classList.remove("btngreen");
   element3_2.classList.remove("btngreen");
   element3_3.classList.remove("btngreen");
   element3_4.classList.remove("btngreen");
   element3_5.classList.remove("btngreen");


   element3_1.classList.add("btnred");
   element3_2.classList.add("btnred");
   element3_3.classList.add("btnred");
   element3_4.classList.add("btnred");
   element3_5.classList.add("btnred");



   var element = document.getElementById(evt.target.id);
   element.classList.remove("btnred");
   element.classList.add("btngreen");
  }
  PerformanceAppraisal2(evt: any) {
    debugger;

    var element3_1 = document.getElementById("3_1");
    var element3_2 = document.getElementById("3_2");
    var element3_3 = document.getElementById("3_3");
    var element3_4 = document.getElementById("3_4");
    var element3_5 = document.getElementById("3_5");
    element3_1.classList.remove("btngreen");
    element3_2.classList.remove("btngreen");
    element3_3.classList.remove("btngreen");
    element3_4.classList.remove("btngreen");
    element3_5.classList.remove("btngreen");
 
 
    element3_1.classList.add("btnred");
    element3_2.classList.add("btnred");
    element3_3.classList.add("btnred");
    element3_4.classList.add("btnred");
    element3_5.classList.add("btnred");
 
 
 
    var element = document.getElementById(evt.target.id);
    element.classList.remove("btnred");
    element.classList.add("btngreen");
  }
  PerformanceAppraisal3(evt: any) {
    debugger;

   var element3_1 = document.getElementById("3_1");
   var element3_2 = document.getElementById("3_2");
   var element3_3 = document.getElementById("3_3");
   var element3_4 = document.getElementById("3_4");
   var element3_5 = document.getElementById("3_5");
   element3_1.classList.remove("btngreen");
   element3_2.classList.remove("btngreen");
   element3_3.classList.remove("btngreen");
   element3_4.classList.remove("btngreen");
   element3_5.classList.remove("btngreen");


   element3_1.classList.add("btnred");
   element3_2.classList.add("btnred");
   element3_3.classList.add("btnred");
   element3_4.classList.add("btnred");
   element3_5.classList.add("btnred");



   var element = document.getElementById(evt.target.id);
   element.classList.remove("btnred");
   element.classList.add("btngreen");
  }

  PerformanceAppraisal4(evt: any) {
    debugger;

    var element3_1 = document.getElementById("3_1");
    var element3_2 = document.getElementById("3_2");
    var element3_3 = document.getElementById("3_3");
    var element3_4 = document.getElementById("3_4");
    var element3_5 = document.getElementById("3_5");
    element3_1.classList.remove("btngreen");
    element3_2.classList.remove("btngreen");
    element3_3.classList.remove("btngreen");
    element3_4.classList.remove("btngreen");
    element3_5.classList.remove("btngreen");
 
 
    element3_1.classList.add("btnred");
    element3_2.classList.add("btnred");
    element3_3.classList.add("btnred");
    element3_4.classList.add("btnred");
    element3_5.classList.add("btnred");
 
 
 
    var element = document.getElementById(evt.target.id);
    element.classList.remove("btnred");
    element.classList.add("btngreen");
  }

  PerformanceAppraisal5(evt: any) {
    debugger;

   var element3_1 = document.getElementById("3_1");
   var element3_2 = document.getElementById("3_2");
   var element3_3 = document.getElementById("3_3");
   var element3_4 = document.getElementById("3_4");
   var element3_5 = document.getElementById("3_5");
   element3_1.classList.remove("btngreen");
   element3_2.classList.remove("btngreen");
   element3_3.classList.remove("btngreen");
   element3_4.classList.remove("btngreen");
   element3_5.classList.remove("btngreen");


   element3_1.classList.add("btnred");
   element3_2.classList.add("btnred");
   element3_3.classList.add("btnred");
   element3_4.classList.add("btnred");
   element3_5.classList.add("btnred");



   var element = document.getElementById(evt.target.id);
   element.classList.remove("btnred");
   element.classList.add("btngreen");
  }

//Portfolio Fact Sheet start
PortfolioFactSheet1(evt: any) {
    debugger;
 
    var element5_1 = document.getElementById("5_1");
    var element5_2 = document.getElementById("5_2");
    var element5_3 = document.getElementById("5_3");
    var element5_4 = document.getElementById("5_4");
    var element5_5 = document.getElementById("5_5");
    element5_1.classList.remove("btngreen");
    element5_2.classList.remove("btngreen");
    element5_3.classList.remove("btngreen");
    element5_4.classList.remove("btngreen");
    element5_5.classList.remove("btngreen");
 
 
    element5_1.classList.add("btnred");
    element5_2.classList.add("btnred");
    element5_3.classList.add("btnred");
    element5_4.classList.add("btnred");
    element5_5.classList.add("btnred");
 
 
 
    var element = document.getElementById(evt.target.id);
    element.classList.remove("btnred");
    element.classList.add("btngreen");
   }
   PortfolioFactSheet2(evt: any) {
    debugger;
 
    var element5_1 = document.getElementById("5_1");
    var element5_2 = document.getElementById("5_2");
    var element5_3 = document.getElementById("5_3");
    var element5_4 = document.getElementById("5_4");
    var element5_5 = document.getElementById("5_5");
    element5_1.classList.remove("btngreen");
    element5_2.classList.remove("btngreen");
    element5_3.classList.remove("btngreen");
    element5_4.classList.remove("btngreen");
    element5_5.classList.remove("btngreen");
 
 
    element5_1.classList.add("btnred");
    element5_2.classList.add("btnred");
    element5_3.classList.add("btnred");
    element5_4.classList.add("btnred");
    element5_5.classList.add("btnred");
 
 
 
    var element = document.getElementById(evt.target.id);
    element.classList.remove("btnred");
    element.classList.add("btngreen");
   }
   PortfolioFactSheet3(evt: any) {
    debugger;
 
    var element5_1 = document.getElementById("5_1");
    var element5_2 = document.getElementById("5_2");
    var element5_3 = document.getElementById("5_3");
    var element5_4 = document.getElementById("5_4");
    var element5_5 = document.getElementById("5_5");
    element5_1.classList.remove("btngreen");
    element5_2.classList.remove("btngreen");
    element5_3.classList.remove("btngreen");
    element5_4.classList.remove("btngreen");
    element5_5.classList.remove("btngreen");
 
 
    element5_1.classList.add("btnred");
    element5_2.classList.add("btnred");
    element5_3.classList.add("btnred");
    element5_4.classList.add("btnred");
    element5_5.classList.add("btnred");
 
 
 
    var element = document.getElementById(evt.target.id);
    element.classList.remove("btnred");
    element.classList.add("btngreen");
   }

   PortfolioFactSheet4(evt: any) {
    debugger;
 
    var element5_1 = document.getElementById("5_1");
    var element5_2 = document.getElementById("5_2");
    var element5_3 = document.getElementById("5_3");
    var element5_4 = document.getElementById("5_4");
    var element5_5 = document.getElementById("5_5");
    element5_1.classList.remove("btngreen");
    element5_2.classList.remove("btngreen");
    element5_3.classList.remove("btngreen");
    element5_4.classList.remove("btngreen");
    element5_5.classList.remove("btngreen");
 
 
    element5_1.classList.add("btnred");
    element5_2.classList.add("btnred");
    element5_3.classList.add("btnred");
    element5_4.classList.add("btnred");
    element5_5.classList.add("btnred");
 
 
 
    var element = document.getElementById(evt.target.id);
    element.classList.remove("btnred");
    element.classList.add("btngreen");
   }

   PortfolioFactSheet5(evt: any) {
    debugger;
 
    var element5_1 = document.getElementById("5_1");
    var element5_2 = document.getElementById("5_2");
    var element5_3 = document.getElementById("5_3");
    var element5_4 = document.getElementById("5_4");
    var element5_5 = document.getElementById("5_5");
    element5_1.classList.remove("btngreen");
    element5_2.classList.remove("btngreen");
    element5_3.classList.remove("btngreen");
    element5_4.classList.remove("btngreen");
    element5_5.classList.remove("btngreen");
 
 
    element5_1.classList.add("btnred");
    element5_2.classList.add("btnred");
    element5_3.classList.add("btnred");
    element5_4.classList.add("btnred");
    element5_5.classList.add("btnred");
 
 
 
    var element = document.getElementById(evt.target.id);
    element.classList.remove("btnred");
    element.classList.add("btngreen");
   }



//Current Portfolio start
 CurrentPortfolio1(evt: any) {
  debugger;

  var element2_1 = document.getElementById("2_1");
  var element2_2 = document.getElementById("2_2");
  var element2_3 = document.getElementById("2_3");
  var element2_4 = document.getElementById("2_4");
  var element2_5 = document.getElementById("2_5");
  element2_1.classList.remove("btngreen");
  element2_2.classList.remove("btngreen");
  element2_3.classList.remove("btngreen");
  element2_4.classList.remove("btngreen");
  element2_5.classList.remove("btngreen");


  element2_1.classList.add("btnred");
  element2_2.classList.add("btnred");
  element2_3.classList.add("btnred");
  element2_4.classList.add("btnred");
  element2_5.classList.add("btnred");



  var element = document.getElementById(evt.target.id);
  element.classList.remove("btnred");
  element.classList.add("btngreen");
 }

 CurrentPortfolio2(evt: any) {
  debugger;

  var element2_1 = document.getElementById("2_1");
  var element2_2 = document.getElementById("2_2");
  var element2_3 = document.getElementById("2_3");
  var element2_4 = document.getElementById("2_4");
  var element2_5 = document.getElementById("2_5");
  element2_1.classList.remove("btngreen");
  element2_2.classList.remove("btngreen");
  element2_3.classList.remove("btngreen");
  element2_4.classList.remove("btngreen");
  element2_5.classList.remove("btngreen");


  element2_1.classList.add("btnred");
  element2_2.classList.add("btnred");
  element2_3.classList.add("btnred");
  element2_4.classList.add("btnred");
  element2_5.classList.add("btnred");



  var element = document.getElementById(evt.target.id);
  element.classList.remove("btnred");
  element.classList.add("btngreen");
 }

 CurrentPortfolio3(evt: any) {
  debugger;

  var element2_1 = document.getElementById("2_1");
  var element2_2 = document.getElementById("2_2");
  var element2_3 = document.getElementById("2_3");
  var element2_4 = document.getElementById("2_4");
  var element2_5 = document.getElementById("2_5");
  element2_1.classList.remove("btngreen");
  element2_2.classList.remove("btngreen");
  element2_3.classList.remove("btngreen");
  element2_4.classList.remove("btngreen");
  element2_5.classList.remove("btngreen");


  element2_1.classList.add("btnred");
  element2_2.classList.add("btnred");
  element2_3.classList.add("btnred");
  element2_4.classList.add("btnred");
  element2_5.classList.add("btnred");



  var element = document.getElementById(evt.target.id);
  element.classList.remove("btnred");
  element.classList.add("btngreen");
 }

 CurrentPortfolio4(evt: any) {
  debugger;

  var element2_1 = document.getElementById("2_1");
  var element2_2 = document.getElementById("2_2");
  var element2_3 = document.getElementById("2_3");
  var element2_4 = document.getElementById("2_4");
  var element2_5 = document.getElementById("2_5");
  element2_1.classList.remove("btngreen");
  element2_2.classList.remove("btngreen");
  element2_3.classList.remove("btngreen");
  element2_4.classList.remove("btngreen");
  element2_5.classList.remove("btngreen");


  element2_1.classList.add("btnred");
  element2_2.classList.add("btnred");
  element2_3.classList.add("btnred");
  element2_4.classList.add("btnred");
  element2_5.classList.add("btnred");



  var element = document.getElementById(evt.target.id);
  element.classList.remove("btnred");
  element.classList.add("btngreen");
 }


 CurrentPortfolio5(evt: any) {
  debugger;

  var element2_1 = document.getElementById("2_1");
  var element2_2 = document.getElementById("2_2");
  var element2_3 = document.getElementById("2_3");
  var element2_4 = document.getElementById("2_4");
  var element2_5 = document.getElementById("2_5");
  element2_1.classList.remove("btngreen");
  element2_2.classList.remove("btngreen");
  element2_3.classList.remove("btngreen");
  element2_4.classList.remove("btngreen");
  element2_5.classList.remove("btngreen");


  element2_1.classList.add("btnred");
  element2_2.classList.add("btnred");
  element2_3.classList.add("btnred");
  element2_4.classList.add("btnred");
  element2_5.classList.add("btnred");



  var element = document.getElementById(evt.target.id);
  element.classList.remove("btnred");
  element.classList.add("btngreen");
 }


//Statement of Dividend.pdf start
StatementofDividend1(evt: any) {
  debugger;

  var element7_1 = document.getElementById("7_1");
  var element7_2 = document.getElementById("7_2");
  var element7_3 = document.getElementById("7_3");
  var element7_4 = document.getElementById("7_4");
  var element7_5 = document.getElementById("7_5");
  element7_1.classList.remove("btngreen");
  element7_2.classList.remove("btngreen");
  element7_3.classList.remove("btngreen");
  element7_4.classList.remove("btngreen");
  element7_5.classList.remove("btngreen");


  element7_1.classList.add("btnred");
  element7_2.classList.add("btnred");
  element7_3.classList.add("btnred");
  element7_4.classList.add("btnred");
  element7_5.classList.add("btnred");



  var element = document.getElementById(evt.target.id);
  element.classList.remove("btnred");
  element.classList.add("btngreen");
 }

 StatementofDividend2(evt: any) {
  debugger;

  var element7_1 = document.getElementById("7_1");
  var element7_2 = document.getElementById("7_2");
  var element7_3 = document.getElementById("7_3");
  var element7_4 = document.getElementById("7_4");
  var element7_5 = document.getElementById("7_5");
  element7_1.classList.remove("btngreen");
  element7_2.classList.remove("btngreen");
  element7_3.classList.remove("btngreen");
  element7_4.classList.remove("btngreen");
  element7_5.classList.remove("btngreen");


  element7_1.classList.add("btnred");
  element7_2.classList.add("btnred");
  element7_3.classList.add("btnred");
  element7_4.classList.add("btnred");
  element7_5.classList.add("btnred");



  var element = document.getElementById(evt.target.id);
  element.classList.remove("btnred");
  element.classList.add("btngreen");
 }

 StatementofDividend3(evt: any) {
  debugger;

  var element7_1 = document.getElementById("7_1");
  var element7_2 = document.getElementById("7_2");
  var element7_3 = document.getElementById("7_3");
  var element7_4 = document.getElementById("7_4");
  var element7_5 = document.getElementById("7_5");
  element7_1.classList.remove("btngreen");
  element7_2.classList.remove("btngreen");
  element7_3.classList.remove("btngreen");
  element7_4.classList.remove("btngreen");
  element7_5.classList.remove("btngreen");


  element7_1.classList.add("btnred");
  element7_2.classList.add("btnred");
  element7_3.classList.add("btnred");
  element7_4.classList.add("btnred");
  element7_5.classList.add("btnred");



  var element = document.getElementById(evt.target.id);
  element.classList.remove("btnred");
  element.classList.add("btngreen");
 }

 StatementofDividend4(evt: any) {
  debugger;

  var element7_1 = document.getElementById("7_1");
  var element7_2 = document.getElementById("7_2");
  var element7_3 = document.getElementById("7_3");
  var element7_4 = document.getElementById("7_4");
  var element7_5 = document.getElementById("7_5");
  element7_1.classList.remove("btngreen");
  element7_2.classList.remove("btngreen");
  element7_3.classList.remove("btngreen");
  element7_4.classList.remove("btngreen");
  element7_5.classList.remove("btngreen");


  element7_1.classList.add("btnred");
  element7_2.classList.add("btnred");
  element7_3.classList.add("btnred");
  element7_4.classList.add("btnred");
  element7_5.classList.add("btnred");



  var element = document.getElementById(evt.target.id);
  element.classList.remove("btnred");
  element.classList.add("btngreen");
 }
 StatementofDividend5(evt: any) {
  debugger;

  var element7_1 = document.getElementById("7_1");
  var element7_2 = document.getElementById("7_2");
  var element7_3 = document.getElementById("7_3");
  var element7_4 = document.getElementById("7_4");
  var element7_5 = document.getElementById("7_5");
  element7_1.classList.remove("btngreen");
  element7_2.classList.remove("btngreen");
  element7_3.classList.remove("btngreen");
  element7_4.classList.remove("btngreen");
  element7_5.classList.remove("btngreen");


  element7_1.classList.add("btnred");
  element7_2.classList.add("btnred");
  element7_3.classList.add("btnred");
  element7_4.classList.add("btnred");
  element7_5.classList.add("btnred");



  var element = document.getElementById(evt.target.id);
  element.classList.remove("btnred");
  element.classList.add("btngreen");
 }


 //BANK BOOK start
 BANKBOOK1(evt: any) {
  debugger;

  var element1_1 = document.getElementById("1_1");
  var element1_2 = document.getElementById("1_2");
  var element1_3 = document.getElementById("1_3");
  var element1_4 = document.getElementById("1_4");
  var element1_5 = document.getElementById("1_5");
  element1_1.classList.remove("btngreen");
  element1_2.classList.remove("btngreen");
  element1_3.classList.remove("btngreen");
  element1_4.classList.remove("btngreen");
  element1_5.classList.remove("btngreen");


  element1_1.classList.add("btnred");
  element1_2.classList.add("btnred");
  element1_3.classList.add("btnred");
  element1_4.classList.add("btnred");
  element1_5.classList.add("btnred");



  var element = document.getElementById(evt.target.id);
  element.classList.remove("btnred");
  element.classList.add("btngreen");
 }

 BANKBOOK2(evt: any) {
  debugger;

  var element1_1 = document.getElementById("1_1");
  var element1_2 = document.getElementById("1_2");
  var element1_3 = document.getElementById("1_3");
  var element1_4 = document.getElementById("1_4");
  var element1_5 = document.getElementById("1_5");
  element1_1.classList.remove("btngreen");
  element1_2.classList.remove("btngreen");
  element1_3.classList.remove("btngreen");
  element1_4.classList.remove("btngreen");
  element1_5.classList.remove("btngreen");


  element1_1.classList.add("btnred");
  element1_2.classList.add("btnred");
  element1_3.classList.add("btnred");
  element1_4.classList.add("btnred");
  element1_5.classList.add("btnred");



  var element = document.getElementById(evt.target.id);
  element.classList.remove("btnred");
  element.classList.add("btngreen");
 }
 BANKBOOK3(evt: any) {
  debugger;

  var element1_1 = document.getElementById("1_1");
  var element1_2 = document.getElementById("1_2");
  var element1_3 = document.getElementById("1_3");
  var element1_4 = document.getElementById("1_4");
  var element1_5 = document.getElementById("1_5");
  element1_1.classList.remove("btngreen");
  element1_2.classList.remove("btngreen");
  element1_3.classList.remove("btngreen");
  element1_4.classList.remove("btngreen");
  element1_5.classList.remove("btngreen");


  element1_1.classList.add("btnred");
  element1_2.classList.add("btnred");
  element1_3.classList.add("btnred");
  element1_4.classList.add("btnred");
  element1_5.classList.add("btnred");



  var element = document.getElementById(evt.target.id);
  element.classList.remove("btnred");
  element.classList.add("btngreen");
 }
 BANKBOOK4(evt: any) {
  debugger;

  var element1_1 = document.getElementById("1_1");
  var element1_2 = document.getElementById("1_2");
  var element1_3 = document.getElementById("1_3");
  var element1_4 = document.getElementById("1_4");
  var element1_5 = document.getElementById("1_5");
  element1_1.classList.remove("btngreen");
  element1_2.classList.remove("btngreen");
  element1_3.classList.remove("btngreen");
  element1_4.classList.remove("btngreen");
  element1_5.classList.remove("btngreen");


  element1_1.classList.add("btnred");
  element1_2.classList.add("btnred");
  element1_3.classList.add("btnred");
  element1_4.classList.add("btnred");
  element1_5.classList.add("btnred");



  var element = document.getElementById(evt.target.id);
  element.classList.remove("btnred");
  element.classList.add("btngreen");
 }
 BANKBOOK5(evt: any) {
  debugger;

  var element1_1 = document.getElementById("1_1");
  var element1_2 = document.getElementById("1_2");
  var element1_3 = document.getElementById("1_3");
  var element1_4 = document.getElementById("1_4");
  var element1_5 = document.getElementById("1_5");
  element1_1.classList.remove("btngreen");
  element1_2.classList.remove("btngreen");
  element1_3.classList.remove("btngreen");
  element1_4.classList.remove("btngreen");
  element1_5.classList.remove("btngreen");


  element1_1.classList.add("btnred");
  element1_2.classList.add("btnred");
  element1_3.classList.add("btnred");
  element1_4.classList.add("btnred");
  element1_5.classList.add("btnred");



  var element = document.getElementById(evt.target.id);
  element.classList.remove("btnred");
  element.classList.add("btngreen");
 }


 //Statement of Capital Gain clientwise start
 StatementofCapital1(evt: any) {
  debugger;

  var element6_1 = document.getElementById("6_1");
  var element6_2 = document.getElementById("6_2");
  var element6_3 = document.getElementById("6_3");
  var element6_4 = document.getElementById("6_4");
  var element6_5 = document.getElementById("6_5");
  element6_1.classList.remove("btngreen");
  element6_2.classList.remove("btngreen");
  element6_3.classList.remove("btngreen");
  element6_4.classList.remove("btngreen");
  element6_5.classList.remove("btngreen");


  element6_1.classList.add("btnred");
  element6_2.classList.add("btnred");
  element6_3.classList.add("btnred");
  element6_4.classList.add("btnred");
  element6_5.classList.add("btnred");



  var element = document.getElementById(evt.target.id);
  element.classList.remove("btnred");
  element.classList.add("btngreen");
 }

 StatementofCapital2(evt: any) {
  debugger;

  var element6_1 = document.getElementById("6_1");
  var element6_2 = document.getElementById("6_2");
  var element6_3 = document.getElementById("6_3");
  var element6_4 = document.getElementById("6_4");
  var element6_5 = document.getElementById("6_5");
  element6_1.classList.remove("btngreen");
  element6_2.classList.remove("btngreen");
  element6_3.classList.remove("btngreen");
  element6_4.classList.remove("btngreen");
  element6_5.classList.remove("btngreen");


  element6_1.classList.add("btnred");
  element6_2.classList.add("btnred");
  element6_3.classList.add("btnred");
  element6_4.classList.add("btnred");
  element6_5.classList.add("btnred");



  var element = document.getElementById(evt.target.id);
  element.classList.remove("btnred");
  element.classList.add("btngreen");
 }


 StatementofCapital3(evt: any) {
  debugger;

  var element6_1 = document.getElementById("6_1");
  var element6_2 = document.getElementById("6_2");
  var element6_3 = document.getElementById("6_3");
  var element6_4 = document.getElementById("6_4");
  var element6_5 = document.getElementById("6_5");
  element6_1.classList.remove("btngreen");
  element6_2.classList.remove("btngreen");
  element6_3.classList.remove("btngreen");
  element6_4.classList.remove("btngreen");
  element6_5.classList.remove("btngreen");


  element6_1.classList.add("btnred");
  element6_2.classList.add("btnred");
  element6_3.classList.add("btnred");
  element6_4.classList.add("btnred");
  element6_5.classList.add("btnred");



  var element = document.getElementById(evt.target.id);
  element.classList.remove("btnred");
  element.classList.add("btngreen");
 }


 StatementofCapital4(evt: any) {
  debugger;

  var element6_1 = document.getElementById("6_1");
  var element6_2 = document.getElementById("6_2");
  var element6_3 = document.getElementById("6_3");
  var element6_4 = document.getElementById("6_4");
  var element6_5 = document.getElementById("6_5");
  element6_1.classList.remove("btngreen");
  element6_2.classList.remove("btngreen");
  element6_3.classList.remove("btngreen");
  element6_4.classList.remove("btngreen");
  element6_5.classList.remove("btngreen");


  element6_1.classList.add("btnred");
  element6_2.classList.add("btnred");
  element6_3.classList.add("btnred");
  element6_4.classList.add("btnred");
  element6_5.classList.add("btnred");



  var element = document.getElementById(evt.target.id);
  element.classList.remove("btnred");
  element.classList.add("btngreen");
 }


 StatementofCapital5(evt: any) {
  debugger;

  var element6_1 = document.getElementById("6_1");
  var element6_2 = document.getElementById("6_2");
  var element6_3 = document.getElementById("6_3");
  var element6_4 = document.getElementById("6_4");
  var element6_5 = document.getElementById("6_5");
  element6_1.classList.remove("btngreen");
  element6_2.classList.remove("btngreen");
  element6_3.classList.remove("btngreen");
  element6_4.classList.remove("btngreen");
  element6_5.classList.remove("btngreen");


  element6_1.classList.add("btnred");
  element6_2.classList.add("btnred");
  element6_3.classList.add("btnred");
  element6_4.classList.add("btnred");
  element6_5.classList.add("btnred");



  var element = document.getElementById(evt.target.id);
  element.classList.remove("btnred");
  element.classList.add("btngreen");
 }



 //Statement of Expenses start
 StatementofExpenses1(evt: any) {
  debugger;

  var element8_1 = document.getElementById("8_1");
  var element8_2 = document.getElementById("8_2");
  var element8_3 = document.getElementById("8_3");
  var element8_4 = document.getElementById("8_4");
  var element8_5 = document.getElementById("8_5");
  element8_1.classList.remove("btngreen");
  element8_2.classList.remove("btngreen");
  element8_3.classList.remove("btngreen");
  element8_4.classList.remove("btngreen");
  element8_5.classList.remove("btngreen");


  element8_1.classList.add("btnred");
  element8_2.classList.add("btnred");
  element8_3.classList.add("btnred");
  element8_4.classList.add("btnred");
  element8_5.classList.add("btnred");



  var element = document.getElementById(evt.target.id);
  element.classList.remove("btnred");
  element.classList.add("btngreen");
 }
 StatementofExpenses2(evt: any) {
  debugger;

  var element8_1 = document.getElementById("8_1");
  var element8_2 = document.getElementById("8_2");
  var element8_3 = document.getElementById("8_3");
  var element8_4 = document.getElementById("8_4");
  var element8_5 = document.getElementById("8_5");
  element8_1.classList.remove("btngreen");
  element8_2.classList.remove("btngreen");
  element8_3.classList.remove("btngreen");
  element8_4.classList.remove("btngreen");
  element8_5.classList.remove("btngreen");


  element8_1.classList.add("btnred");
  element8_2.classList.add("btnred");
  element8_3.classList.add("btnred");
  element8_4.classList.add("btnred");
  element8_5.classList.add("btnred");



  var element = document.getElementById(evt.target.id);
  element.classList.remove("btnred");
  element.classList.add("btngreen");
 }

 StatementofExpenses3(evt: any) {
  debugger;

  var element8_1 = document.getElementById("8_1");
  var element8_2 = document.getElementById("8_2");
  var element8_3 = document.getElementById("8_3");
  var element8_4 = document.getElementById("8_4");
  var element8_5 = document.getElementById("8_5");
  element8_1.classList.remove("btngreen");
  element8_2.classList.remove("btngreen");
  element8_3.classList.remove("btngreen");
  element8_4.classList.remove("btngreen");
  element8_5.classList.remove("btngreen");


  element8_1.classList.add("btnred");
  element8_2.classList.add("btnred");
  element8_3.classList.add("btnred");
  element8_4.classList.add("btnred");
  element8_5.classList.add("btnred");



  var element = document.getElementById(evt.target.id);
  element.classList.remove("btnred");
  element.classList.add("btngreen");
 }

 StatementofExpenses4(evt: any) {
  debugger;

  var element8_1 = document.getElementById("8_1");
  var element8_2 = document.getElementById("8_2");
  var element8_3 = document.getElementById("8_3");
  var element8_4 = document.getElementById("8_4");
  var element8_5 = document.getElementById("8_5");
  element8_1.classList.remove("btngreen");
  element8_2.classList.remove("btngreen");
  element8_3.classList.remove("btngreen");
  element8_4.classList.remove("btngreen");
  element8_5.classList.remove("btngreen");


  element8_1.classList.add("btnred");
  element8_2.classList.add("btnred");
  element8_3.classList.add("btnred");
  element8_4.classList.add("btnred");
  element8_5.classList.add("btnred");



  var element = document.getElementById(evt.target.id);
  element.classList.remove("btnred");
  element.classList.add("btngreen");
 }

 StatementofExpenses5(evt: any) {
  debugger;

  var element8_1 = document.getElementById("8_1");
  var element8_2 = document.getElementById("8_2");
  var element8_3 = document.getElementById("8_3");
  var element8_4 = document.getElementById("8_4");
  var element8_5 = document.getElementById("8_5");
  element8_1.classList.remove("btngreen");
  element8_2.classList.remove("btngreen");
  element8_3.classList.remove("btngreen");
  element8_4.classList.remove("btngreen");
  element8_5.classList.remove("btngreen");


  element8_1.classList.add("btnred");
  element8_2.classList.add("btnred");
  element8_3.classList.add("btnred");
  element8_4.classList.add("btnred");
  element8_5.classList.add("btnred");



  var element = document.getElementById(evt.target.id);
  element.classList.remove("btnred");
  element.classList.add("btngreen");
 }


 //Transaction Statement start
 TransactionStatement1(evt: any) {
  debugger;

  var element9_1 = document.getElementById("9_1");
  var element9_2 = document.getElementById("9_2");
  var element9_3 = document.getElementById("9_3");
  var element9_4 = document.getElementById("9_4");
  var element9_5 = document.getElementById("9_5");
  element9_1.classList.remove("btngreen");
  element9_2.classList.remove("btngreen");
  element9_3.classList.remove("btngreen");
  element9_4.classList.remove("btngreen");
  element9_5.classList.remove("btngreen");


  element9_1.classList.add("btnred");
  element9_2.classList.add("btnred");
  element9_3.classList.add("btnred");
  element9_4.classList.add("btnred");
  element9_5.classList.add("btnred");



  var element = document.getElementById(evt.target.id);
  element.classList.remove("btnred");
  element.classList.add("btngreen");
 }

 TransactionStatement2(evt: any) {
  debugger;

  var element9_1 = document.getElementById("9_1");
  var element9_2 = document.getElementById("9_2");
  var element9_3 = document.getElementById("9_3");
  var element9_4 = document.getElementById("9_4");
  var element9_5 = document.getElementById("9_5");
  element9_1.classList.remove("btngreen");
  element9_2.classList.remove("btngreen");
  element9_3.classList.remove("btngreen");
  element9_4.classList.remove("btngreen");
  element9_5.classList.remove("btngreen");


  element9_1.classList.add("btnred");
  element9_2.classList.add("btnred");
  element9_3.classList.add("btnred");
  element9_4.classList.add("btnred");
  element9_5.classList.add("btnred");



  var element = document.getElementById(evt.target.id);
  element.classList.remove("btnred");
  element.classList.add("btngreen");
 }

 TransactionStatement3(evt: any) {
  debugger;

  var element9_1 = document.getElementById("9_1");
  var element9_2 = document.getElementById("9_2");
  var element9_3 = document.getElementById("9_3");
  var element9_4 = document.getElementById("9_4");
  var element9_5 = document.getElementById("9_5");
  element9_1.classList.remove("btngreen");
  element9_2.classList.remove("btngreen");
  element9_3.classList.remove("btngreen");
  element9_4.classList.remove("btngreen");
  element9_5.classList.remove("btngreen");


  element9_1.classList.add("btnred");
  element9_2.classList.add("btnred");
  element9_3.classList.add("btnred");
  element9_4.classList.add("btnred");
  element9_5.classList.add("btnred");



  var element = document.getElementById(evt.target.id);
  element.classList.remove("btnred");
  element.classList.add("btngreen");
 }

 TransactionStatement4(evt: any) {
  debugger;

  var element9_1 = document.getElementById("9_1");
  var element9_2 = document.getElementById("9_2");
  var element9_3 = document.getElementById("9_3");
  var element9_4 = document.getElementById("9_4");
  var element9_5 = document.getElementById("9_5");
  element9_1.classList.remove("btngreen");
  element9_2.classList.remove("btngreen");
  element9_3.classList.remove("btngreen");
  element9_4.classList.remove("btngreen");
  element9_5.classList.remove("btngreen");


  element9_1.classList.add("btnred");
  element9_2.classList.add("btnred");
  element9_3.classList.add("btnred");
  element9_4.classList.add("btnred");
  element9_5.classList.add("btnred");



  var element = document.getElementById(evt.target.id);
  element.classList.remove("btnred");
  element.classList.add("btngreen");
 }


 TransactionStatement5(evt: any) {
  debugger;

  var element9_1 = document.getElementById("9_1");
  var element9_2 = document.getElementById("9_2");
  var element9_3 = document.getElementById("9_3");
  var element9_4 = document.getElementById("9_4");
  var element9_5 = document.getElementById("9_5");
  element9_1.classList.remove("btngreen");
  element9_2.classList.remove("btngreen");
  element9_3.classList.remove("btngreen");
  element9_4.classList.remove("btngreen");
  element9_5.classList.remove("btngreen");


  element9_1.classList.add("btnred");
  element9_2.classList.add("btnred");
  element9_3.classList.add("btnred");
  element9_4.classList.add("btnred");
  element9_5.classList.add("btnred");



  var element = document.getElementById(evt.target.id);
  element.classList.remove("btnred");
  element.classList.add("btngreen");
 }
 onClicksavepopup() {
  this.showModalsavepopup = true;
}

hidesavepopup() {
 this.showModalsavepopup = false;
}

 SaveAutoReportRequest(MDate) {
  //debugger;
  this.isShowLoader=true;
  this._autoreportrequestService.SaveAutoReportRequest(JSON.stringify(MDate)).subscribe(
    (data) => {
       // this._country = data;
        if (data.ResultSaveUpdate = '1') {
          this.isShowLoader=false;
           // sessionStorage.setItem('ID', this._custodian.Result.toString());
            this.message = 'Request submitted sucessfully.!';
            //alert(this.message);
            this.onClicksavepopup();
            
        }
        else {
          this.isShowLoader=false;
          this.message = 'Invalid Credential';
          //alert(this.message);
          
          this.onClicksavepopup();
            
            // alert(this.message);
        }
        //this.EmployeeForm.reset();
        // this.loadAllCountry();
        // this.ResetCountry();
        // this.hidestatemaster();
        
    }
  )
  }

  BindAutoReportRequest(CustomerAccount) {
    // this.loading = true;
     var currentContext = this;
     // let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
     
     var JsonData ={
      "CustomerAccount" : CustomerAccount
      }
     this.isShowLoader=true;
     
     this._autoreportrequestService.BindAutoReportRequest(JsonData).
         subscribe((data) => {

           this.isShowLoader=false;
          // alert(data.Table[0].ReportType+'_'+data.Table[0].FrequencyId);
           console.log(data);
           var i=0;
           if(data.Table.length >=0)
           {
            data.Table.forEach(element => {
              //alert(data.Table[i].ReportType+'_'+data.Table[i].FrequencyId);
              var element1 = document.getElementById(data.Table[i].ReportType+'_'+data.Table[i].FrequencyId);
              element1.classList.remove("btnred");
              element1.classList.add("btngreen");
              i++;
             });
              
           }
            // this.isShowCustomer=true;
         });
     // console.log(sessionStorage.getItem('ID'));
    // this.loading = false;
   }
  
 onSubmit() {
  debugger;
  this.Prompt1();
  
  

   
 }
}
