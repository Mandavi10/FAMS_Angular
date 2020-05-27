import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { MultiSelectService } from '../../multi-select.service';
import { UserServiceService } from '../../Services/User/user-service.service';
import {sponsorbankcode,categorycode, BindUtilityCode,BindClientCode, Product, Region, Branch } from '../../../Models/User/BindData';

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.css']
})
export class UserCreationComponent implements OnInit {
UserForm:FormGroup;Search_Text: string = "";sponsorbankcode:sponsorbankcode;table2:categorycode;table3:BindUtilityCode;
public selectedBankArray=[]; public filteredBankArray=[]; public BankArray=[]; public formid:boolean=false;MultiDropArray =[];
checkFlag: number = 0;Ischecked: number = 0;CheckedCount: number = 0;table4:BindClientCode; table5:Product; table6:Region; table7: Branch
UncheckedCount: number = 0;MultiDropcategoryArray=[];MultiDroputilityArray=[];MultiDropclientcodeArray=[];MultiDropsecbranchArray=[];


  columnDefs = [
    {headerName: 'Sr. No.', field: 'srNo', sort: 'asc' },
    {headerName: 'User Name', field: 'userName', sort: 'asc' },
    {headerName: 'Email Address', field: 'emailAddress', sort: 'asc'},
    {headerName: 'Contact No.', field: 'contactNo', sort: 'asc'}
];

rowData = [
    { srNo: '1', userName: 'User 1', emailAddress: 'user1@gmail.com', contactNo: 9876543210},
    { srNo: '2', userName: 'User 2', emailAddress: 'user2@gmail.com', contactNo: 9876543210},
    { srNo: '3', userName: 'User 3', emailAddress: 'user3@gmail.com', contactNo: 9876543210}
];
  myModal: boolean;
  public searchValue: string = null;
 
  public isDropDownVisible = false;
  public isDropDownVisible1 = false;
  public isDropDownVisible2 = false;
  public isDropDownVisible3 = false;
  public isDropDownVisible4 = false;
  constructor(private multiSelectService: MultiSelectService,private formBuilder: FormBuilder,private userservice:UserServiceService) { }
  onClick(event) {
    this.formid=true;
    this.myModal = true;
    }
    hide() {
    this.myModal = false;
    }
  ngOnInit(): void {
    //this.multiSelectService.getCities().subscribe(cities => {
    //  this.citiesArray = cities;
    //  for (let item of this.citiesArray) {
     //   item['selected'] = false;
    //  }
    //  this.filteredCitiesArray = [...this.citiesArray]
   // })
  // this.multiSelectService.getBank().subscribe(Bank => {
  //  this.BankArray = Bank;
   // for(let item of this.BankArray){
  //    item['selected'] = false;
  //  }
  //  this.filteredBankArray = [...this.BankArray]
 // })
 

 
    this.UserForm = this.formBuilder.group({
      UserName: ['', Validators.required],
      phoneno: [''],
      EmailId: [''],
      branch:[''],
      region:[''],
      product:['']
    })
    this.bindData();
    this.formid=false;
  }


//filterCities(){
 // this.filteredCitiesArray  = this.citiesArray.filter(city => {
 //     return city.name.toLowerCase().includes(this.searchValue.toLowerCase()) >= 1;
 // })
//}

//selectCity($event){
//  if($event.target.nodeName === 'INPUT'){
//    if($event.target.checked){
 //     for(let city of this.citiesArray){
 //       if(city.value === +$event.target.value){
 //         city.selected = true;
 //         this.selectedCitiesArray.push(city);
 //       }
 //     }
  //  }else{

  //    this.selectedCitiesArray = this.selectedCitiesArray.filter((city) => {
   //     if(city.value === +$event.target.value){
   //       city.selected = false;
   //     }
    //    return city.value !== +$event.target.value;
   //   });
  //  }
 // }
//}

removeBank(value) {
  var index = 0;
  var ids = value.SponsorBankCodeId;
  
  for (var i = 0; i < this.MultiDropArray.length; ++i) {
      if (this.MultiDropArray[i]["SponsorBankCodeId"] == ids) {
          index = i;
      }
  }
  
  this.MultiDropArray.splice(index, 1)
  }
  removeUtilityCode(value) {
    var index = 0;
    var ids = value.UtilityCodeId;
    
    for (var i = 0; i < this.MultiDroputilityArray.length; ++i) {
        if (this.MultiDroputilityArray[i]["UtilityCodeId"] == ids) {
            index = i;
        }
    }
    
    this.MultiDroputilityArray.splice(index, 1)
    }
    removecatcode(value) {
      var index = 0;
      var ids = value.categoryId;
      
      for (var i = 0; i < this.MultiDropcategoryArray.length; ++i) {
          if (this.MultiDropcategoryArray[i]["categoryId"] == ids) {
              index = i;
          }
      }
      
      this.MultiDropcategoryArray.splice(index, 1)
      }
      removeClientCode(value) {
        var index = 0;
        var ids = value.CliendID;
        
        for (var i = 0; i < this.MultiDropclientcodeArray.length; ++i) {
            if (this.MultiDropclientcodeArray[i]["CliendID"] == ids) {
                index = i;
            }
        }
        
        this.MultiDropclientcodeArray.splice(index, 1)
        }

        removeSecBranch(value) {
          var index = 0;
          var ids = value.BranchId;
          
          for (var i = 0; i < this.MultiDropsecbranchArray.length; ++i) {
              if (this.MultiDropsecbranchArray[i]["BranchId"] == ids) {
                  index = i;
              }
          }
          
          this.MultiDropsecbranchArray.splice(index, 1)
          }





filterBank() {
  this.filteredBankArray  = this.BankArray.filter(sponsorbankcode => {
      return sponsorbankcode.name.toLowerCase().includes(this.searchValue.toLowerCase()) >= 1;
  });
}

showDropDown($event) {
  if ($event.target.nodeName === 'DIV' || $event.target.nodeName === 'UL' || $event.target.nodeName === 'path'){
    this.isDropDownVisible = !this.isDropDownVisible;
  }
  
}

showDropDown1($event) {
  if ($event.target.nodeName === 'DIV' || $event.target.nodeName === 'UL' || $event.target.nodeName === 'path'){
    this.isDropDownVisible1 = !this.isDropDownVisible1;
  }
  
}

showDropDown2($event) {
  if ($event.target.nodeName === 'DIV' || $event.target.nodeName === 'UL' || $event.target.nodeName === 'path'){
    this.isDropDownVisible2 = !this.isDropDownVisible2;
  }
  
}

showDropDown3($event) {
  if ($event.target.nodeName === 'DIV' || $event.target.nodeName === 'UL' || $event.target.nodeName === 'path'){
    this.isDropDownVisible3 = !this.isDropDownVisible3;
  }
  
}

showDropDown4($event) {
  if ($event.target.nodeName === 'DIV' || $event.target.nodeName === 'UL' || $event.target.nodeName === 'path'){
    this.isDropDownVisible4 = !this.isDropDownVisible4;
  }
  
}

bindData() {
  
  
  let item = JSON.parse(sessionStorage.getItem('User'));
        this.userservice.getData(item.ReferenceId).subscribe((data) => {
          console.log(data);
           
            this.table3=data.Table;
            this.sponsorbankcode = data.Table1;
            this.table2 = data.Table2;
            this.table4=data.Table3;
            this.table5=data.Table4;
            this.table6=data.Table5;
            this.table7=data.Table6;

            this.BankArray.push(this.sponsorbankcode)
            
            for(let item of this.BankArray){
                  item['selected'] = false;
              }
             this.filteredBankArray = [...this.BankArray]
        });
  }

  


  onChangeSponsorbankcode(event, item) {
    this.checkFlag = 0;
    // this.IsMandateID = item.mandateid;
    if (event.target.checked) {
        this.MultiDropArray.push(item);
        // this.SelectionStatusOfMutants.push(item);
        this.Ischecked = 1;
        this.CheckedCount++;
        console.log(this.MultiDropArray);

    }
    else {
        
        var index = 0;
    var ids = item.SponsorBankCodeId;
    for (var i = 0; i < this.MultiDropArray.length; ++i) {
    if (this.MultiDropArray[i]["SponsorBankCodeId"] == ids) {
        index = i;
    }
  }

    this.MultiDropArray.splice(index, 1)
    }
  }
  onChangeCategorycode(event, item) {
    this.checkFlag = 0;
    
    if (event.target.checked) {
        this.MultiDropcategoryArray.push(item);
        
        this.Ischecked = 1;
        this.CheckedCount++;
        console.log(this.MultiDropcategoryArray);

    }
    else {
        
        var index = 0;
    var ids = item.categoryId;
    for (var i = 0; i < this.MultiDropcategoryArray.length; ++i) {
    if (this.MultiDropcategoryArray[i]["categoryId"] == ids) {
        index = i;
    }
  }

    this.MultiDropcategoryArray.splice(index, 1)
    }
  }

  onChangeUtilitycode(event, item) {
    this.checkFlag = 0;
    // this.IsMandateID = item.mandateid;
    if (event.target.checked) {
        this.MultiDroputilityArray.push(item);
        // this.SelectionStatusOfMutants.push(item);
        this.Ischecked = 1;
        this.CheckedCount++;
        console.log(this.MultiDroputilityArray);

    }
    else {
        
        var index = 0;
    var ids = item.UtilityCodeId;
    for (var i = 0; i < this.MultiDroputilityArray.length; ++i) {
    if (this.MultiDroputilityArray[i]["UtilityCodeId"] == ids) {
        index = i;
    }
  }

    this.MultiDroputilityArray.splice(index, 1)
    }
  }

  onChangeClientcode(event, item) {
    this.checkFlag = 0;
    // this.IsMandateID = item.mandateid;
    if (event.target.checked) {
        this.MultiDropclientcodeArray.push(item);
        // this.SelectionStatusOfMutants.push(item);
        this.Ischecked = 1;
        this.CheckedCount++;
        console.log(this.MultiDropclientcodeArray);

    }
    else {
        
        var index = 0;
    var ids = item.CliendID;
    for (var i = 0; i < this.MultiDropclientcodeArray.length; ++i) {
    if (this.MultiDropclientcodeArray[i]["CliendID"] == ids) {
        index = i;
    }
  }

    this.MultiDropclientcodeArray.splice(index, 1)
    }
  }

  onChangeSecbranch(event, item) {
    this.checkFlag = 0;
    
    if (event.target.checked) {
        this.MultiDropsecbranchArray.push(item);
        
        this.Ischecked = 1;
        this.CheckedCount++;
        console.log(this.MultiDropsecbranchArray);

    }
    else {
        
        var index = 0;
    var ids = item.BranchId;
    for (var i = 0; i < this.MultiDropsecbranchArray.length; ++i) {
    if (this.MultiDropsecbranchArray[i]["BranchId"] == ids) {
        index = i;
    }
  }

    this.MultiDropsecbranchArray.splice(index, 1)
    }
  }

}




