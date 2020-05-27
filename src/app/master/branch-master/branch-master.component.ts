import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { MultiSelectService } from '../../multi-select.service';
import { AgGridAngular } from 'ag-grid-angular';
@Component({
  selector: 'app-branch-master',
  templateUrl: './branch-master.component.html',
  styleUrls: ['./branch-master.component.css']
})
export class BranchMasterComponent implements OnInit {
  columnDefs = [
    {headerName: 'Sr. No.', field: 'srNo', sort: 'asc' },
    {headerName: 'Branch Code', field: 'BranchCode', sort: 'asc' },
    {headerName: 'Branch Name', field: 'BranchName', sort: 'asc'},
    {headerName: 'Region', field: 'Region', sort: 'asc'}
   
];

rowData = [
    { srNo: '1', BranchCode: 'Code-001', BranchName: 'Branch Name', Region: 'Region 1'},
    { srNo: '2', BranchCode: 'Code-002', BranchName: 'Branch Name', Region: 'Region 2'},
    { srNo: '3', BranchCode: 'Code-003', BranchName: 'Branch Name', Region: 'Region 3'}
];




  showModalBranchmaster: boolean;
  public searchValue: string = null;
  public citiesArray = [];
  public filteredCitiesArray = [];
  public selectedCitiesArray = [];
  public isDropDownVisible = false;
  constructor(private multiSelectService: MultiSelectService) { }


  onClickBranchmaster(event) {
    this.showModalBranchmaster = true;
    
    }
    
    hideBranchmaster() {
    this.showModalBranchmaster = false;
    }
  

  ngOnInit(): void {
    this.multiSelectService.getCities().subscribe(cities => {
      this.citiesArray = cities;
      for (let item of this.citiesArray) {
        item['selected'] = false;
      }
      this.filteredCitiesArray = [...this.citiesArray]
    })
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
