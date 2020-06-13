import { Component, OnInit } from '@angular/core';
import { BrokermasterService } from '../../Services/BrokerMaster/brokermaster.service';
import {Bindallfields} from '../../../Models/BrokerMaster/bindallfields';
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
  JsondataList : Jsondata ; showModalsavepopup : boolean = false; 
  HeaderArray : any;
  columnDefs = [
    {headerName: 'Sr. No.', field: 'srNo', width:70 },
    {headerName: 'Broker Name', field: 'BrokerName', width:150 },
    {headerName: 'Trade Name', field: 'TradeName', width:150},
    {headerName: 'Registration No.', field: 'RegistrationNo',width:150},
    {headerName: 'GST No.', field: 'GSTNo', width:130},
    {headerName: 'Stock Exchange Name', field: 'StockExchangeName' ,width:160},
    {headerName: 'Email', field: 'Email',width:150 },
    {headerName: 'Telephone', field: 'Telephone', width: 130},
];

rowData = [
    { srNo: '1', brokername: 'Tarun Sharma', tradename: 'Axis Bank', registrationno: '12155', gstno: 'GST-00038373338',stockexchangename: 'BSE' , email: 'ankush@yoekisoft.com', telephone: '+919295678909' },
    { srNo: '1', brokername: 'Tarun Sharma', tradename: 'Axis Bank', registrationno: '12166', gstno: 'GST-00038373338',stockexchangename: 'BSE' , email: 'ankush@yoekisoft.com', telephone: '+919295678909' },
    { srNo: '1', brokername: 'Tarun Sharma', tradename: 'Axis Bank', registrationno: '12177', gstno: 'GST-00038373338',stockexchangename: 'BSE' , email: 'ankush@yoekisoft.com', telephone: '+919295678909' }
];






showModalBrokermaster: boolean;

  onClickBrokermaster(event) {
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
       // console.log(this.BindallfieldsList);  
  });
}
SaveData(){
  debugger;
  if (this.BrokerMasterForm.valid) {
  let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
  var UserId = Sessionvalue.UserId;
  this.JsondataList = this.BrokerMasterForm.value;
  this.JsondataList.UserId = UserId;
  this.BMsrvice.SaveData(JSON.stringify(this.JsondataList)).subscribe(
    (data) => {  
      this.CommonfieldsList = data.Table;
      if(this.CommonfieldsList[0].Result == "1"){   
      this.showModalBrokermaster = false;
      this.showModalsavepopup = true;
      this. BindGrid();
      this.BrokerMasterForm.reset();
      }
      else{
        alert("Error");
      }
});
  }
  else{
    this.validateAllFormFields(this.BrokerMasterForm);
  }
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
    var csvData = this.ConvertToCSV(JSON.stringify(this.BindallfieldsList));
    var a = document.createElement("a");
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    var blob = new Blob([csvData], { type: 'text/csv' });
    var url = window.URL.createObjectURL(blob);
    a.href = url;  
    a.download = 'BrokerFile.csv';/* your file name*/
    a.click();
    return 'success';
}
}
