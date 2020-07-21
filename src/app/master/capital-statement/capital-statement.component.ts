import { Component, OnInit } from '@angular/core';
import{CapitalSatementService} from '../../Services/CapitalStatement/capital-satement.service';
import{CapitalStatementModel,pagination} from '../../../Models/CapitalStatement/capitalStatement';
import {FormBuilder,FormControl,FormGroup,Validator, Validators} from '@angular/forms';
@Component({
  selector: 'app-capital-statement',
  templateUrl: './capital-statement.component.html',
  styleUrls: ['./capital-statement.component.css']
})
export class CapitalStatementComponent implements OnInit {
  
  public bindgrid:CapitalStatementModel;
  public downloadExcelgrid:CapitalStatementModel;
  capitalStatForm:FormGroup;
  submitted = false;
  PageCount:number=1;
  btnPrev: boolean;
  btnNext:boolean;
  public pagination:pagination;
  public data:any;
  HeaderArray={};
  public SumSaleAmount:number;
  public SumPurchaseAmount:number;
  public SumIndexedCost:number;
  public SumST:number;
  public SumLT:number;
  public SumAfterIndex_LT:number;
  StaticArray={};


  constructor(private _capitalStateService:CapitalSatementService,private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    
    this.btnPrev=false;
    this.btnNext==false;
    this.capitalStatForm=this.formbuilder.group({
      Formdate:['',Validators.required],
      Todate:['',Validators.required]
    })

    this.DownloadExcel();
    
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





  bindGrid(){
    this.submitted = true;
    if (this.capitalStatForm.invalid) {
      return;
    }
    else{
  

   var jasondata= {
    "fromdate":this.capitalStatForm.controls['Formdate'].value ,
    "PageCount": this.PageCount,
    "todate":this.capitalStatForm.controls['Todate'].value
   
  }
  var currentContext = this;
this._capitalStateService.BindGrid(jasondata).subscribe((res)=>{

  this.bindgrid=res.Table;
  //this.pagination=res.Table1;
  this.SumSaleAmount=res.Table1[0].SumSaleAmount;
  this.SumPurchaseAmount=res.Table1[0].SumPurchaseAmount;
  this.SumIndexedCost=res.Table1[0].SumIndexedCost;
  this.SumST=res.Table1[0].SumST;
  this.SumLT=res.Table1[0].SumLT;
  this.SumAfterIndex_LT=res.Table1[0].SumAfterIndex_LT;
  console.log(this.SumSaleAmount)
  console.log(this.bindgrid)
  console.log(this.pagination)

  
  })
}

  }

  DownloadExcel(){

    this._capitalStateService.DownloadExcel().subscribe((res)=>{
      this.downloadExcelgrid=res.Table
      console.log(this.downloadExcelgrid)

    })

  }


  ConvertToCSV(objArray) {   //kislay

    this.HeaderArray = {
      Security: "Security", SaleDate: "SaleDate", SaleQty: "SaleQty", SaleRate: "SaleRater",
      SaleAmount: "SaleAmount", PurchaseDate: "PurchaseDate", PurchaseRate: "PurchaseRate", Price: "Price", PurchaseAmount
             : "PurchaseAmount"    , IndexedCost: "IndexedCost", DaysHeld: "DaysHeld", ST: "ST"
             , LT: "LT", AfterIndex_LT: "AfterIndex_LT"
             }
             this.StaticArray = {value:"ADROIT PMS SERVICES PVT LTD",value1:"MUMBAI",value2:"STATEMENT OF CAPITAL GAIN/LOSS",
             value3:"From " + this.capitalStatForm.controls['Formdate'].value +" To " +this.capitalStatForm.controls['Todate'].value ,value4:"Account : 6010001     RUBY DECOSTA   - ADT001",
           value5:"ADROITPMS1"}
    
    
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    var row = "";  
    for (var index in objArray[0]) {
        //Now convert each value to string and comma-separated
        row += index + ',';
    }
    row = row.slice(0, -1);
    //append Label row with line break
    //str += row + '\r\n';
    for (var i = 0; i < array.length; i++) {
        var line = '';

        if (i == 0) {
          for (var index in this.StaticArray) {
              if (line != '') line += ','
  
              line += this.StaticArray[index];
              str += line + '\r\n';
              line = "";
          }
          
      }
      line = '';
  
  
        if (i == 0) {
            for (var index in this.HeaderArray) {
                if (line != '') line += ','
                line += this.HeaderArray[index];
            }
            str += line + '\r\n';
        }
        var line = '';
        for (var index in array[i]) {
          // if(index != "UploadHeaderId"){
          //   if(index != "TLUID" ){
          //     if(index != "Rowno"){
          //       if(index != "legacyUploadedID"){
            if (line != '') line += ','  
            line += array[i][index];
          //     }
          //   }
          // }
          // }
        }
        str += line + '\r\n';
    }
    return str;
  }

  downloadMainGrid() {   //real downlad grid
    
        var csvData = this.ConvertToCSV(JSON.stringify(this.downloadExcelgrid));
         var a = document.createElement("a");
          a.setAttribute('style', 'display:none;');
          document.body.appendChild(a);
          var blob = new Blob([csvData], { type: 'text/csv' });
          var url = window.URL.createObjectURL(blob);
          a.href = url;
          a.download = 'CapitalStatement.csv';/* your file name*/
           a.click();
           return 'success';
   // });
  }


  // downloadpdf() {

  //           let doc = new jsPDF('p', 'pt', 'a4');
  //           doc.setFontSize(5);
  //            doc.setFontStyle('arial');
  //     let columns = [
  //       {title: "SrNo", dataKey: "SrNo"},
  //       {title: "Refrence", dataKey: "Refrence1"},
  //           {title: "Created On", dataKey: "CreatedOn"},
  //           {title: "Updated On", dataKey: "UpdatedOn"},
  //           {title: "created By", dataKey: "createdBy"},
  //           {title: "Updated By", dataKey: "UpdatedBy"},
  //           {title: "FileUpdatedCount", dataKey: "FileUpdatedCount"},
  //           {title: "BankValidation", dataKey: "BankValidation"},
  //           {title: "AcValidation", dataKey: "AcValidation"},
  //           {title: "Saved Count", dataKey: "SavedCount"},
  //           {title: "Edit Count", dataKey: "EditCount"},
  //           {title: "Entity Name", dataKey: "entityName"},
  //       ];
        
       
  //     let rows = [
  //       {"id": 1, "name": "Shaw", "country": "Tanzania"},
  //       {"id": 2, "name": "Nelson", "country": "Kazakhstan"},
  //       {"id": 3, "name": "Garcia", "country": "Madagascar"},
  //     ];
  //              // Error ========================
  //              doc.autoTable(columns, {
  //               theme : 'plain',
  //               styles: {
  //                 fontSize: 12
  //               },
  //               startY: 150,
  //               showHeader: 'never',
  //               createdCell: function(cell, data) {
  //                 var tdElement = cell.raw;
  //                 if (tdElement.classList.contains('hrow')) {
  //                   cell.styles.fontStyle = 'bold';
  //                 }
  //               }
  //             });
  //       doc.autoTable({html:"#tblreport"});
  //       let finalY = doc.previousAutoTable.finalY; //this gives you the value of the end-y-axis-position of the previous autotable.
  //   doc.text("Text to be shown relative to the table", 12, finalY + 10);
  //       doc.save('teste.pdf');
        
    
  //          }
    

}
