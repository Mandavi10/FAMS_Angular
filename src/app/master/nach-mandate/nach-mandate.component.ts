import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { BankFormService } from '../../Services/BankForm/bank-form.service';
import {BindEntityDetails } from '../../../Models/BankForm/BindEntityDetails'; 
import {BindLogoImageDetails } from '../../../Models/BankForm/BindLogoImageDetails';
import {BindBankNameDetails } from '../../../Models/BankForm/BindBankNameDetails';
 import {BindSponserCode } from '../../../Models/BankForm/BindSponserCode';
import {BindBankUtilityCode } from '../../../Models/BankForm/BindBankUtilityCode'; 
import {BindBankPaymentMode } from '../../../Models/BankForm/BindBankPaymentMode';
import { BindEntityDetailsdata } from '../../../Models/BankForm/BindEntityDetailsdata'; 
import { BindDebitType } from '../../../Models/BankForm/BindDebitType';
import { Bindfrequency } from '../../../Models/BankForm/Bindfrequency'; 
import { BindEntityPeriods } from '../../../Models/BankForm/BindEntityPeriods';
import { BindEntitydebitcredit } from '../../../Models/BankForm/BindEntitydebitcredit'; 
import { BindEntityCategorytype } from '../../../Models/BankForm/BindEntityCategorytype';
import { BindLogincheck } from '../../../Models/BankForm/BindLogincheck';
import { CheckReference } from '../../../Models/BankForm/checkreference';
import { BindIFSC } from '../../../Models/BankForm/BindIFSC';
import { UserEntityDetail } from '../../../Models/BankForm/UserEntityDetail';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { endWith } from 'rxjs/operators';
// import { DISABLED } from '@angular/forms/src/model';
import{DbsecurityService}from '../../Services/dbsecurity.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Directive, HostListener } from '@angular/core';
import { UrlSegment } from '@angular/router';


import  {SaveData, SaveData0, SaveData1, SaveData2, SaveData3, SaveData4, SaveData5, SaveData6, SaveData7, SaveData8, SaveData16} from '../../../Models/BankForm/SaveData'; 
import {PostJsondata} from '../../../Models/BankValidation/bankvalidate-modal';
import {BankvalidateService} from '../../Services/BankValidation/bankvalidate.service';
import {BankNameModal,MICRResultModal,MandateActivityDataModal,EMandateDataModal} from '../../../Models/BankValidation/bankvalidate-modal';
import { AgAbstractLabel } from 'ag-grid-community/dist/lib/widgets/agAbstractLabel';
@Component({
  selector: 'app-nach-mandate',
  templateUrl: './nach-mandate.component.html',
  styleUrls: ['./nach-mandate.component.css']
})
export class NachMandateComponent implements OnInit {
  
  Ifscresult :BankNameModal;MICRResult:MICRResultModal;MandateActivityData:MandateActivityDataModal;EMandateData:EMandateDataModal;
  bankname:string;  IFSCMicr:string;LiveOnNach:string;LiveOnEmandate:string;liveonDebitcard:string;liveonNetbanking:string
  PostJsondata_v:PostJsondata;
  showModal: boolean;NachMandate: FormGroup;
  showModalpop: boolean;
  Table: BindEntityDetails; Table1: BindLogoImageDetails; Table2: BindBankNameDetails; Table3: BindSponserCode; Table4: BindBankUtilityCode; Table5: BindBankPaymentMode; Table6: BindEntityDetailsdata; Table7: BindDebitType; Table8: Bindfrequency; Table9: BindEntityPeriods; Table10: BindEntitydebitcredit; Table11: BindEntityCategorytype; Table12: BindLogincheck;
 
    checkreference: CheckReference;IFSCtable:BindIFSC;
    savedata:SaveData;savedata0:SaveData0;savedata1:SaveData1;savedata2:SaveData2;savedata3:SaveData3;savedata4:SaveData4;
    savedata5:SaveData5;savedata6:SaveData6;savedata7:SaveData7;savedata8:SaveData8;savedata16:SaveData16;
    message: string;
    submitted = false;    
    mandateId:any=0;today: Date;
     todayperiodfrom: Date;  todayperiodto: Date;
    btnCancel = false;  public _isimage: string = "";public _isActive = false;IsShow = false;
   
   
 UtilityCodedesabled: boolean = true; CreateCodedesabled: boolean = true; ModifyCodedesabled: boolean = true;
    CancelCodedesabled: boolean = true; EntityNameCodedesabled: boolean = true; rdsbCodedesabled: boolean = true; rdcaCodedesabled: boolean = true; rdccCodedesabled: boolean = true;
    rdnbreCodedesabled: boolean = true; rdsbnrdCodedesabled: boolean = true; rdotherCodedesabled: boolean = true; UMRNCodedesabled: boolean = true; Amountcodedisabled: boolean = true;
    rdmonthlycodedisabled: boolean = true; rdquaterlycodedisabled: boolean = true; rdhalfyrlycodedisabled: boolean = true; rdyearlycodedisabled: boolean = true; Radio1codedisabled: boolean = true;
   
    rdmaxamtcodedisabled: boolean = true; Reference2codedisabled: boolean = true; Periodtocodedisabled: boolean = true; Untillcancelledcodedisabled: boolean = true;
    Customer2disabled: boolean = true; Customer3disabled: boolean = true; Cancelleddisabled: boolean = true; 
    btnSecValdisabled: boolean = true;btnFirstValdisabled: boolean = true;btnSavedisabled: boolean = false;
    btnEditDisabledisabled: boolean = true;btnEemandatedisabled: boolean = true;
    Catagorycodedisabled: boolean = false; UMRNDATEdisabled: boolean = false; Sponsorcodedisabled: boolean = false;
    Bankaccountnodisabled: boolean = false; Withbankdisabled: boolean = false; IFSCdisabled: boolean = false;
    MICRdisabled: boolean = false; Amountrupeesdisabled: boolean = false; Refrence1disabled: boolean = false;
    Phonenodisabled: boolean = false;Emaildisabled: boolean = false;PeriodFromdisabled: boolean = false;
    Customer1disabled: boolean = false; divform: boolean = true;

     btnSave:boolean=true;btnEditDisable:boolean = false;
    @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
      e.preventDefault();
  }
  
  @HostListener('copy', ['$event']) blockCopy(e: KeyboardEvent) {
      e.preventDefault();
  }
  
  @HostListener('cut', ['$event']) blockCut(e: KeyboardEvent) {
      e.preventDefault();
  }
 
  showModalSaved: boolean;
  showModalDelete: boolean;
  showModalSelectMode: boolean;
  showModalAccountvalidation: boolean;
  showModalPhysicalmandate: boolean;



  isShow = false;
  showModalCrop: boolean;
  toggleDisplay() {
      this.isShow = !this.isShow;
  }
  constructor(private router: Router, private formBuilder: FormBuilder, private _bankformService: BankFormService,private Dbsecurity: DbsecurityService,private _BankvalidateService:BankvalidateService) { }

  ngOnInit() {
    this.NachMandate = this.formBuilder.group({
      MandateMode: [''], Catagorycode: ['', Validators.required], Mandatetype: [''], UMRN: [''], UMRNDATE: ['', Validators.required], Sponsorcode: ["", Validators.required],  Utilitycode: [''], Create: [''], Modify: [''],
      Cancel: [''], Authrizename: [''], Todebit: [''], Bankaccountno: ['', Validators.required], Withbank: ['', Validators.required], IFSC: ['', Validators.required], MICR: [''], Amount: [''], Amountrupees: ['', Validators.required],
      Frequency: [''],
      Debittype: [''],
      Refrence1: ['', Validators.required], Phoneno: [''], Refrence2: [''], Email: ['', [ Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]], PeriodFrom: ['', Validators.required], PeriodTo: [''], Untillcancelled: [''],
      Customer1: ['', Validators.required], Customer2: [''], Customer3:['']
    
  });
  let Sessionvalue = JSON.parse(sessionStorage.getItem('User')); 
  this.BinddataOnPageLoad();
  }
  
onClick(event) {
this.showModal = true;

}
onClickImageCrop(event) {
  this.showModalCrop = true;
  
  }
hide() {
this.showModal = false;
}
hideModalCrop(){
  this.showModalCrop = false;
}
onClickpop(event) {
  this.showModalpop = true; 
  
  }
  
  hidepop() {
  this.showModalpop = false;
  }
  get AllFields() { return this.NachMandate.controls; }
  BinddataOnPageLoad() {
  //  debugger;
    this._bankformService.BinddataOnPageLoad().subscribe(
        (data) => {
          console.log(data);
            this.Table12 = data.Table12; 
            if (this.Table12[0].IsEnableCancel == false) {
                this.Cancelleddisabled = false;    
                this.btnCancel = true;
            }
            else {
                this.Cancelleddisabled = true;
            }
            this.Table7 = data.Table7; this.Table8 = data.Table8; this.Table10 = data.Table10; this.Table9 = data.Table9; if (data.Table9[0].isenable == true) { this.Periodtocodedisabled = false } else { this.Periodtocodedisabled = true } if (data.Table9[1].isenable == true) { this.Untillcancelledcodedisabled = false } else { this.Untillcancelledcodedisabled = true }
            this.Table2 = data.Table2; this.Table11 = data.Table11; this.Table3 = data.Table3;
            this.NachMandate.controls['Utilitycode'].setValue(this.Table3[0].utilityCode);
            this.Table = data.Table; 
            this.NachMandate.controls['Sponsorcode'].setValue(this.Table[0].SponsorBankCode);
            if (this.Table[0].ModeOfPayment == 'Y') {
                this.IsShow = true;               
            } else {
                this.IsShow = false;
            }
           
            let now = new Date();
            this.today=   new Date(now);
            this.todayperiodfrom=new Date(this.Table[0].FromDate);
           
            this.NachMandate.controls['Authrizename'].setValue(this.Table[0].Name);
            this.EntityNameCodedesabled = true;
            this.NachMandate.controls['Debittype'].setValue(this.Table[0].DebitType);
            this.NachMandate.controls['Frequency'].setValue(this.Table[0].FrequencyType);
            this.NachMandate.controls['Todebit'].setValue(this.Table[0].ToDebit);
            if (this.Table[0].PeriodType == 'u') {
                this.NachMandate.controls['Untillcancelled'].setValue(true);
                this._isActive = true;
            } else {
                this.NachMandate.controls['Untillcancelled'].setValue(false);
                this._isActive = false;
            }
            this.Table1 = data.Table1;
            this._isimage = this.Table1[0].ImagePath;
            this.Table5 = data.Table5;
            var  ValidationCountEnable;
            //--------For Table6----------//
            this.Table6=data.Table6;
            if(this.Table6[0].IsValidationCountEnable==false)
            {
                ValidationCountEnable=0;
            }
            else{
                ValidationCountEnable=1;
            }
        });

}

isFieldValid(field: string) {
  return !this.NachMandate.get(field).valid && this.NachMandate.get(field).touched;
}
displayFieldCss(field: string) {
  return {
      'validate': this.isFieldValid(field),
  };
}
validateAllFormFields(formGroup: FormGroup) {
  Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
          control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
          this.validateAllFormFields(control);
      }
  });
}



  onClicksave(event) {
    this.showModalSaved = true;
    
    
    }
    BankValidation_Click()
    {
      this.BankValidation();
      this.showModal = true;
      
    }
    btnsave_click() {       
      this.submitted = true;
      if (this.NachMandate.valid) {            
          const datat = this.NachMandate.value;         
          this.SaveData();         
      }             
      else {
          this.validateAllFormFields(this.NachMandate);
      }        
  }
    hidesave() {
    this.showModalSaved = false;
    }

    onClickdelete(event) {
      this.showModalDelete = true;
      
      
      }
      
      hidedelete() {
      this.showModalDelete = false;
      }
  
      onClickSelectMode(event) {
        this.showModalSelectMode = true;
        
        
        }
        
        hideSelectMode() {
        this.showModalSelectMode = false;
        }

        onClickAccountvalidation(event) {
          this.showModalAccountvalidation = true;
          
          
          }
          
          hideAccountvalidation() {
          this.showModalAccountvalidation = false;
          }

          onClickPhysicalmandate(event) {
            this.showModalPhysicalmandate = true;
            
            
            }
            
            hidePhysicalmandate() {
            this.showModalPhysicalmandate = false;
            }    



      
            Customer1_keyup(){
              if (this.NachMandate.controls['Customer1'].value=="") {            
                  this.Customer2disabled=true;
              } else {
                  this.Customer2disabled=false;
              }
          }

chkUntil_Change(){
  if(this.NachMandate.controls['Untillcancelled'].value==true){
      this.NachMandate.controls['PeriodTo'].setValue('');
      this.Periodtocodedisabled=true;
  }
  else{
      this.Periodtocodedisabled=false;
  }
}
Amountrupees_keyup(){
  if(this.NachMandate.controls['Amountrupees'].value.length==1){
      if(this.NachMandate.controls['Amountrupees'].value =='0')
      {
          this.NachMandate.controls['Amountrupees'].setValue('');
      }
  }
  var No = this.numtoword(this.NachMandate.controls['Amountrupees'].value);
  this.NachMandate.controls['Amount'].setValue(No);
}
Decimal(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;       
  if (charCode != 8 && (charCode != 0 && charCode < 48 || charCode > 57)) {
      return false;
  }
  return true;
}
CheckAcNolength() {
  let Acno = ((document.getElementById("txtAcNo") as HTMLInputElement).value);
  if ( Acno.length < 9) {         
     this.NachMandate.controls['Bankaccountno'].setValue("");
      document.getElementById("txtAcNo").classList.add('validate');
      document.getElementById("txtAcNo").setAttribute("placeholder", "Invalid Input");
  }
  else {
      document.getElementById("txtAcNo").classList.remove('validate');
  }
}
isChklength() {
      let phnumber = ((document.getElementById("txtPhNumber") as HTMLInputElement).value);
      if (phnumber.length > 0 && phnumber.length < 10) {         
      this.NachMandate.controls['Phoneno'].setValue("");
          document.getElementById("txtPhNumber").classList.add('validate');
          document.getElementById("txtPhNumber").setAttribute("placeholder", "Please enter 10 - digit");
      }
      else {
          document.getElementById("txtPhNumber").classList.remove('validate');
      }
}
chkEmail() {
  let email = ((document.getElementById("txtEmailId") as HTMLInputElement).value);
  let emailemandate = ((document.getElementById("txtEmailId") as HTMLInputElement).value);
  let regex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z0-9.-]{2,4}$/;
  if (regex.test(email) != true) {
      this.NachMandate.controls['Email'].setValue("");
      document.getElementById("txtEmailId").classList.add('validate');
      document.getElementById("txtEmailId").setAttribute("placeholder", "Invalid-Email");
  }
  else {
      document.getElementById("txtEmailId").classList.remove('validate');
  }       
}

txtRefrence1_keyup(){
  if (this.NachMandate.controls['Refrence1'].value=="") {            
      this.Reference2codedisabled=true;
  } else {
      this.Reference2codedisabled=false;
  }
}

Customer2_keyup(){
  if (this.NachMandate.controls['Customer2'].value=="") {            
      this.Customer3disabled=true;
  } else {
      this.Customer3disabled=false;
  } 
}
RemoveClass() {
  document.getElementById("txtPhNumber").classList.remove('validate');
  document.getElementById("txtEmailId").classList.remove('validate');
 
}
numtoword(num): any {       

 var values="" ;
 this.NachMandate.controls['Amount'].setValue("");
var  num =this.NachMandate.controls['Amountrupees'].value.trim();       

  var a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
  var b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  var n;
  if ((num = num.toString()).length > 9) return 'overflow';
  n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return;
  var str = '';
  str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
  str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
  str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
  str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
  str += (n[5] != 0) ? ((str != '') ? '' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
  str += str + 'Only ';       
  return str + 'Only ';
  
}
Validation(){
  var flag=true;
  return flag;
}

SaveData() {

  let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
        

  let _apipostdata = new UserEntityDetail();
  
  
  _apipostdata.EntityId=Sessionvalue.ReferenceId;
  _apipostdata.UserId=Sessionvalue.UserId;
  _apipostdata.AppId=this.Dbsecurity.Decrypt(Sessionvalue.AppId);
  _apipostdata.Catagorycode=this.AllFields.Catagorycode.value;
  _apipostdata.MandateMode=this.AllFields.MandateMode.value;
  _apipostdata.Bankaccountno=this.Dbsecurity.Encrypt(this.AllFields.Bankaccountno.value);
  _apipostdata.Mandatetype=this.AllFields.Mandatetype.value;
  _apipostdata.UMRN=this.AllFields.UMRN.value;
  _apipostdata.UMRNDATE=this.AllFields.UMRNDATE.value;
  _apipostdata.Sponsorcode=this.AllFields.Sponsorcode.value;
  _apipostdata.Utilitycode=this.AllFields.Utilitycode.value;
  _apipostdata.Authrizename=this.AllFields.Authrizename.value;
  _apipostdata.Todebit=this.AllFields.Todebit.value;
  _apipostdata.Withbank=this.AllFields.Withbank.value;
  _apipostdata.Debittype=this.AllFields.Debittype.value;
  _apipostdata.IFSC=this.AllFields.IFSC.value;
  _apipostdata.MICR=this.AllFields.MICR.value;
  _apipostdata.Frequency=this.AllFields.Frequency.value;
  _apipostdata.Amountrupees=this.Dbsecurity.Encrypt(this.AllFields.Amountrupees.value);

  _apipostdata.Amount=this.AllFields.Amount.value;
  _apipostdata.Email=this.AllFields.Email.value;
  _apipostdata.Phoneno=this.AllFields.Phoneno.value;
  _apipostdata.Refrence1=this.AllFields.Refrence1.value;
  _apipostdata.Refrence2=this.AllFields.Refrence2.value;
  _apipostdata.PeriodFrom=this.Dbsecurity.Encrypt(this.AllFields.PeriodFrom.value);
  var PeriodTo;
  if(this.AllFields.PeriodTo.value==undefined)
  {
    PeriodTo="null";
  }
  else{
    PeriodTo=this.AllFields.PeriodTo.value;
  }
  _apipostdata.PeriodTo=this.Dbsecurity.Encrypt(PeriodTo);
  _apipostdata.Untillcancelled=this.AllFields.Untillcancelled.value;
  _apipostdata.Customer1=this.AllFields.Customer1.value;
  _apipostdata.Customer2=this.AllFields.Customer2.value;
  _apipostdata.Customer3=this.AllFields.Customer3.value;

   this.btnSavedisabled=true;
   this.btnEditDisable=true;
   this.btnEditDisabledisabled=false;
  var id=this.mandateId;        
          this._bankformService.SaveData(JSON.stringify(_apipostdata),id).
          subscribe((res) => {
            this.showModalSaved = true;
         this.savedata8=res.Table8;
         this.savedata4=res.Table4;

         
          if (this.savedata8[0].result = 1) {
             
              this.mandateId=this.savedata4[0].MandateFreshId;
                       
             
             
           
             
              this.Refrence1disabled=true;
              this.Reference2codedisabled=true;
              this.Amountrupeesdisabled=true;
              this.Withbankdisabled=true;
              this.Sponsorcodedisabled=true;
              this.Catagorycodedisabled=true;
              this.Customer3disabled=true;
              this.IFSCdisabled=true;
              this.MICRdisabled=true;
              this.Refrence1disabled=true;
              this.Reference2codedisabled=true;
              this.Amountrupeesdisabled=true;
              this.Amountcodedisabled=true;
              this.PeriodFromdisabled=true;
              this.UMRNDATEdisabled=true;
              this.PeriodFromdisabled=true;
              this.Emaildisabled=true;
              this.Phonenodisabled=true;
              this.Withbankdisabled=true;
              this.Catagorycodedisabled=true;
              this.Sponsorcodedisabled=true; 
              this.savedata7=res.Table7;
        //this.CheckLogoOrQR(); 
          }
          this.savedata2=res.Table2;
          if(res.Table2.length >0)
          {
          if(this.savedata2[0].result = -1) {
              this.message = 'Error';
              alert(this.message);
          }  
        }            
      }
  )
}
BindIFSC(){
  let BankName = (<HTMLSelectElement>document.getElementById('Withbank')).value;

  this._bankformService.BindIFSC(BankName).subscribe(
    (data) => {
      console.log(data);
      this.IFSCtable=data.Table;
             
    }
)
}
IFSC_Change(){
  if (this.NachMandate.controls['IFSC'].value=="") {            
    this.MICRdisabled=false;
} else {
    this.NachMandate.controls['MICR'].setValue("");
    this.MICRdisabled=true;
}
}
ValueAssign(deviceValue) {
  
  this.NachMandate.controls['Utilitycode'].setValue(deviceValue);

}
numberOnly(event): boolean {
  
  if (event.which != 8 && event.which != 0 && (event.which < 48 || event.which > 57)) {

      return false;
  }
}

btnEditDisable_click()
    {
        
      this.btnSavedisabled=false;
      this.btnEditDisable=true;
      this.btnEditDisabledisabled=true;
                                 
                    this.EnableAllControl();
            
        
    }
    EnableAllControl()
    {
      
            this.Untillcancelledcodedisabled=true;
          
            
            this.Customer3disabled=true;
            this.IFSCdisabled=false;;
            this.MICRdisabled=false;
            this.Refrence1disabled=false;
            this.Reference2codedisabled=false;
            this.Amountrupeesdisabled=false;
            this.Amountcodedisabled=true;
            this.Customer2disabled=false;
            this.Customer1disabled=false;
            this.PeriodFromdisabled=true;
            this.UMRNDATEdisabled=false;
            this.PeriodFromdisabled=false;
            this.Emaildisabled=false;
            this.Phonenodisabled=false;
            this.Withbankdisabled=true;
            this.Catagorycodedisabled=true;
            this.Sponsorcodedisabled=true;    
            this.Periodtocodedisabled=false; 
            this.Withbankdisabled=false;
            this.Catagorycodedisabled=false;
            this.Sponsorcodedisabled=false;
            this.btnSavedisabled=false;
            this.Customer3disabled=false;
            if(this.NachMandate.controls['Customer2'].value=='')
            {
                this.Customer3disabled=true;
            }
            else{
                this.Customer3disabled=false;
            }
    }
///////bank validation
    

BankValidation() {
  
  let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));     

  let _apipostdata = new   PostJsondata();
  _apipostdata.UserId=Sessionvalue.UserId;
  _apipostdata.AppId=this.Dbsecurity.Decrypt(Sessionvalue.AppId);
  _apipostdata.MandateId="12345620052200006";//this.mandateId;       
          this._BankvalidateService.BankValidation(JSON.stringify(_apipostdata)).
          subscribe((res) => {
            this.Ifscresult=res.IFSCResultModallist;
            this.MICRResult = res.MICRResultModallist;
        this.EMandateData=res.EMandateDataModallist;        
       this.MandateActivityData=res.MandateActivityDataModallist;
   
       this.bankname=this.EMandateData[0].FullBank;
       if(this.Ifscresult[0].IFSCResult == 'IFSC' ||  this.MICRResult[0].MICRResult == 'MICR'){  
        this.IFSCMicr="Valid";///this.Ifscresult[0].IFSCResult"" ;
                        document.getElementById("divbankName").classList.add('accepted');
                        document.getElementById("divifscmicr").classList.add('accepted');
          }
          else{
            this.IFSCMicr="Invalid";
                  document.getElementById("divbankName").classList.add('rejected');
                  document.getElementById("divifscmicr").classList.add('rejected');
          }
          if(this.EMandateData[0].IsNachLive==true)//nach
          {
            document.getElementById("diviLiveOnNach").classList.add('accepted');
                       this.LiveOnNach="Yes";
          }
          else{
            document.getElementById("diviLiveOnNach").classList.add('rejected');
            this.LiveOnNach="NO";
          }
          if(this.EMandateData[0].is_enach_live==true)//emandate
          {
            document.getElementById("divLiveOnEmandate").classList.add('accepted');
            this.LiveOnEmandate="Yes";
            
          }
          else{
            document.getElementById("divLiveOnEmandate").classList.add('rejected');
            this.LiveOnEmandate="No";
        }
          if(this.EMandateData[0].DebitCard=="1")
          {
            document.getElementById("divDebitcard").classList.add('accepted');
             this.liveonDebitcard="Yes";
          }
          else{
            document.getElementById("divDebitcard").classList.add('rejected');
              this.liveonDebitcard="No";
        }
          if(this.EMandateData[0].NetBanking=="1")
          {
            document.getElementById("divNetbanking").classList.add('accepted');
            this.liveonNetbanking="Yes"
          }
          else{
            document.getElementById("divNetbanking").classList.add('rejected');
            this.liveonNetbanking="No"
          }
      }
      
  )

}
  
  
}
