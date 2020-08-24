import { Component, OnInit } from '@angular/core';
import { BrokermasterService } from '../../Services/BrokerMaster/brokermaster.service';
import {Bindallfields} from '../../../Models/BrokerMaster/bindallfields';
import {Bindallfields2} from '../../../Models/BrokerMaster/bindallfields2';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {Jsondata} from '../../../Models/BrokerMaster/jsondata';
import { Commonfields } from '../../../Models/commonfields';

@Component({
  selector: 'app-broker-master',
  templateUrl: './broker-master.component.html',
  styleUrls: ['./broker-master.component.css']
})
export class BrokerMasterComponent implements OnInit {
  BindallfieldsList : Bindallfields; BrokerMasterForm: FormGroup; CommonfieldsList : Commonfields; 
  JsondataList : Jsondata ; showModalsavepopup : boolean = false; isShowLoader : boolean =false;
  HeaderArray : any; BMId : any;
   Bindallfields2List : Bindallfields2;
   Bindallfields2List_Copy : Bindallfields2;
    SuccessText : any;
  columnDefs = [
    {headerName: 'Sr. No.', field: 'srNo', width:70 },
    {headerName: 'Broker Name', field: 'BrokerName', width:150 },
    {headerName: 'Trade Name', field: 'TradeName', width:150},
    {headerName: 'Registration No.', field: 'RegistrationNo',width:150},
    {headerName: 'GST No.', field: 'GSTNo', width:130},
    {headerName: 'Stock Exchange Name', field: 'StockExchangeName' ,width:160},
    {headerName: 'Email', field: 'Email',width:150 },
    {headerName: 'Telephone', field: 'Telephone', width: 130},
    {headerName: 'Upload Template', field: 'Upload', width: 130, cellClass:'txttCenter',cellRenderer: function clickNextRendererFunc(){
       return '<i class="fa fa-upload" aria-hidden="true"></i>';
    }},
];

rowData = [
    { srNo: '1', brokername: 'Tarun Sharma', tradename: 'Axis Bank', registrationno: '12155', gstno: 'GST-00038373338',stockexchangename: 'BSE' , email: 'ankush@yoekisoft.com', telephone: '+919295678909' },
    { srNo: '1', brokername: 'Tarun Sharma', tradename: 'Axis Bank', registrationno: '12166', gstno: 'GST-00038373338',stockexchangename: 'BSE' , email: 'ankush@yoekisoft.com', telephone: '+919295678909' },
    { srNo: '1', brokername: 'Tarun Sharma', tradename: 'Axis Bank', registrationno: '12177', gstno: 'GST-00038373338',stockexchangename: 'BSE' , email: 'ankush@yoekisoft.com', telephone: '+919295678909' }
];






showModalBrokermaster: boolean;

  onClickBrokermaster(event) {
    this.BMId = "";
    this.showModalBrokermaster = true;
    this.BrokerMasterForm.reset();
    }
    
    hideBrokermaster() {
    this.showModalBrokermaster = false;
    }
    onClicksavepopup(event) {
      this.showModalsavepopup = true;
      
      }
      
      hidesavepopup() {
      this.showModalsavepopup = false;
      }


  constructor(private router: Router,private BMsrvice : BrokermasterService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.BrokerMasterForm = this.formBuilder.group({   
      BrokerName : ['',Validators.required] ,
       TradeName : ['',Validators.required] , 
       RegistrationNo : ['',Validators.required] , 
       GSTNo : ['',] ,
      StockExchangeName : ['',],
      Email : ['',] , 
      Telephone : ['',] , 
      ContactEmail : ['',] ,
       Phone : ['',] ,
        Extension : ['',] , 
        MobileNo : ['',],
      ContactPerson : ['',]
    });
    this.BindGrid();
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
  displayFieldCss(field: string) {
    return {
        'validate': this.isFieldValid(field),
    };
}
isFieldValid(field: string) {
  return !this.BrokerMasterForm.get(field).valid && this.BrokerMasterForm.get(field).touched;
}
  BindGrid(){
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    var UserId = Sessionvalue.UserId;
    var JsonData ={
      "UserId": UserId
    }
    this.BMsrvice.BindGrid(JSON.stringify(JsonData)).subscribe(
      (data) => {  
        this.BindallfieldsList = data.Table;  
        this.Bindallfields2List = data.Table1;
        this.Bindallfields2List_Copy=data.Table1;
       // console.log(this.BindallfieldsList);  
  });
}

BrokerMasterSearch(evt: any) {
  debugger;
  let searchText = evt.target.value.toLocaleLowerCase();    
  if(searchText ===  '' || searchText === undefined || searchText === null)
  {
    this.Bindallfields2List  = JSON.parse(JSON.stringify(this.Bindallfields2List_Copy));
   
  }
  else{


    let gridArr = JSON.parse(JSON.stringify(this.Bindallfields2List_Copy));
    let finalArr = [];
    gridArr.forEach(row => {

      var BrokerName = row.BrokerName.toLocaleLowerCase();
      var TradeName = row.TradeName.toLocaleLowerCase();
      var RegistrationNo = row.RegistrationNo.toLocaleLowerCase();

      var GSTNo = row.GSTNo.toLocaleLowerCase();
      var StockExchangeName = row.StockExchangeName.toLocaleLowerCase();
      var Email = row.Email.toLocaleLowerCase();

      var Telephone = row.Telephone.toLocaleLowerCase();

     
      var isBrokerName= BrokerName.includes(searchText) ;
      var isTradeName = TradeName.includes(searchText);
      var isRegistrationNo = RegistrationNo.includes(searchText);


      var isGSTNo= GSTNo.includes(searchText) ;
      var isStockExchangeName = StockExchangeName.includes(searchText);
      var isEmail = Email.includes(searchText);
      var isTelephone = Telephone.includes(searchText);
     

     if( isBrokerName || isTradeName || isRegistrationNo || isGSTNo || isStockExchangeName || isEmail || isTelephone )
      {
        finalArr.push(row);
      }
      
    });
    this.Bindallfields2List  = JSON.parse(JSON.stringify(finalArr));
  }
}
SaveData(){
  this.isShowLoader = true;
  if (this.BrokerMasterForm.valid) {
  let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
  var UserId = Sessionvalue.UserId;
  this.JsondataList = this.BrokerMasterForm.value;
  this.JsondataList.UserId = UserId;
  this.JsondataList.BMId = this.BMId;
  this.BMsrvice.SaveData(JSON.stringify(this.JsondataList)).subscribe(
    (data) => {  
      this.CommonfieldsList = data.Table;
      if(this.CommonfieldsList[0].Result == "1"){   
      this.showModalBrokermaster = false;
      this.SuccessText = "Saved Successfully";
      this.showModalsavepopup = true;
      this. BindGrid();
      this.BrokerMasterForm.reset();
      }
      else if(this.CommonfieldsList[0].Result == "2"){
        this.showModalBrokermaster = false;
        this.SuccessText = "Update Successfully";
        this.showModalsavepopup = true;
        this. BindGrid();
        this.BrokerMasterForm.reset();
      }
      else{
        this.SuccessText = "Error";
        this.showModalsavepopup = true;
      }
});
  }
  else{
    this.validateAllFormFields(this.BrokerMasterForm);
  }
  this.isShowLoader = false;
}
  ConvertToCSV(objArray) {
    this.HeaderArray = {
      srNo: "Sr.No.", BrokerName: "Broker Name", TradeName: "Trade Name", RegistrationNo: "Registration No.",
      GSTNo: "GST No.", StockExchangeName: "Stock Exchange Name",Email : "Email Id",Telephone:"Telephone"
  }
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    var row = "";

    //   for (var index in objArray[0]) {
            //Now convert each value to string and comma-separated
       //     row += index + ',';
       // }
       // row = row.slice(0, -1);
        //append Label row with line break
       // str += row + '\r\n';

       for (var i = 0; i < array.length; i++) {
        var line = "";

        if (i == 0) {
            for (var index in this.HeaderArray) {
                if (line != '') line += ','

                line += this.HeaderArray[index];
            }
            str += line + '\r\n';
        }
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','
            line += (<string>array[i][index]);
        }
        str += line + '\r\n';
    }
    return str;
}
downloadCSVFile() { 
  this.isShowLoader = true;
    var csvData = this.ConvertToCSV(JSON.stringify(this.BindallfieldsList));
    var a = document.createElement("a");
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    var blob = new Blob([csvData], { type: 'text/csv' });
    var url = window.URL.createObjectURL(blob);
    a.href = url;  
    a.download = 'BrokerFile.csv';/* your file name*/
    this.isShowLoader = false;
    a.click();
    return 'success';
}
onRowSelected(event){
  debugger;
  this.showModalBrokermaster = true;
  if (event.column.colId != "0" ) // only first column clicked
  {
  this.BMId = "";
  this.BrokerMasterForm.reset();
  this.BrokerMasterForm.controls['BrokerName'].setValue(event.data.BrokerName);
  this.BrokerMasterForm.controls['TradeName'].setValue(event.data.TradeName);
  this.BrokerMasterForm.controls['RegistrationNo'].setValue(event.data.RegistrationNo);
  this.BrokerMasterForm.controls['GSTNo'].setValue(event.data.GSTNo);
  this.BrokerMasterForm.controls['StockExchangeName'].setValue(event.data.StockExchangeName);
  this.BrokerMasterForm.controls['Email'].setValue(event.data.Email);
  this.BrokerMasterForm.controls['Telephone'].setValue(event.data.Telephone);
  this.BrokerMasterForm.controls['ContactEmail'].setValue(event.data.ContactEmail);
  this.BrokerMasterForm.controls['Phone'].setValue(event.data.Phone);
  this.BrokerMasterForm.controls['Extension'].setValue(event.data.Extension);
  this.BrokerMasterForm.controls['MobileNo'].setValue(event.data.MobileNo);
  this.BrokerMasterForm.controls['ContactPerson'].setValue(event.data.ContactPerson);
  }
  //else if ((event.column.colId == "0" ) && (event.node.selected) ){
    this.BMId = event.data.BMId;
 // }
}
}
