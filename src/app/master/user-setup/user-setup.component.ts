import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { MultiSelectService } from '../../multi-select.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user-setup',
  templateUrl: './user-setup.component.html',
  styleUrls: ['./user-setup.component.css']
})
export class UserSetupComponent implements OnInit {
  Isdiv1:boolean;
  Isdiv2:boolean;
  IsShowAccessRight : boolean = false; IsShowMaster : boolean = false; 
  IsShowReports : boolean= false;IsAdmin:boolean= false;
  showModalsavepopup: boolean;
  columnDefs = [
    {headerName: 'Sr. No.', field: 'srNo', width: 80},
    {headerName: 'User Name', field: 'UserName', width: 150},
    {headerName: 'Email Address', field: 'EmailAddress', width: 150},
    {headerName: 'Contact Number', field: 'ContactNumber', width: 150},
    {headerName: 'Type', field: 'Type', width: 150},
  

];

rowData = [
    { srNo: '1', UserName: 'Abhishek', EmailAddress: 'H-210', ContactNumber: '9990750722', Type: 'Type'},
    { srNo: '2', UserName: 'Abhishek', EmailAddress: 'H-210', ContactNumber: '9990750722', Type: 'Type'},
    { srNo: '3', UserName: 'Abhishek', EmailAddress: 'H-210', ContactNumber: '9990750722', Type: 'Type'}
];

onClickUser() {
  this.IsShowMaster = true;
  this.IsShowAccessRight = true;
  this.IsShowReports=true;
  
  }
  onClickAdmin() {
    this.IsShowMaster = true;
  this.IsShowAccessRight = true;
  this.IsShowReports=false;
    
    }
    onClickCustomer() {
      this.IsShowMaster = false;
      this.IsShowAccessRight = true;
      this.IsShowReports=true;
      
      }

onClicksavepopup(event) {
  this.showModalsavepopup = true;
  
  }
  
  hidesavepopup() {
  this.showModalsavepopup = false;
  }




public searchValue: string = null;
public citiesArray = [];
public filteredCitiesArray = [];
public selectedCitiesArray = [];
public isDropDownVisible = false;
constructor(private router: Router,private multiSelectService: MultiSelectService) { }

ngOnInit(): void {
  debugger;
    this.Isdiv2=false;
    this.Isdiv1=true;
  

  



this.multiSelectService.getCities().subscribe(cities => {
  this.citiesArray = cities;
  for (let item of this.citiesArray) {
    item['selected'] = false;
  }
  this.filteredCitiesArray = [...this.citiesArray]
})
}

onClickviewpms(){
  this.Isdiv2=true;
  this.Isdiv1=false;
}

filterCities(){
this.filteredCitiesArray  = this.citiesArray.filter(city => {
    return city.name.toLowerCase().includes(this.searchValue.toLowerCase()) >= 1;
})
}

selectCity($event){
if($event.target.nodeName === 'INPUT'){
  if($event.target.checked){
    for(let city of this.citiesArray){
      if(city.value === +$event.target.value){
        city.selected = true;
        this.selectedCitiesArray.push(city);
      }
    }
  }else{

    this.selectedCitiesArray = this.selectedCitiesArray.filter((city) => {
      if(city.value === +$event.target.value){
        city.selected = false;
      }
      return city.value !== +$event.target.value;
    });
  }
}
}

removeCity(value) {
this.selectedCitiesArray = this.selectedCitiesArray.filter((city) => {
  if (city.value === value) {
    city.selected = false;
  }
  return city.value !== value;
});
}

showDropDown($event) {
if ($event.target.nodeName === 'DIV' || $event.target.nodeName === 'UL' || $event.target.nodeName === 'path'){
  this.isDropDownVisible = !this.isDropDownVisible;
}

}

}
