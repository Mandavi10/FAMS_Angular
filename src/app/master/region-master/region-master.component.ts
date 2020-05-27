import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { MultiSelectService } from '../../multi-select.service';
import { AgGridAngular } from 'ag-grid-angular';
@Component({
  selector: 'app-region-master',
  templateUrl: './region-master.component.html',
  styleUrls: ['./region-master.component.css']
})
export class RegionMasterComponent implements OnInit {
  columnDefs = [
    {headerName: 'Sr. No.', field: 'srNo', sort: 'asc' },
    {headerName: 'Region Code', field: 'RegionCode', sort: 'asc' },
    {headerName: 'Region Name', field: 'RegionName', sort: 'asc'},
    {headerName: 'States', field: 'states', sort: 'asc'}
   
];

rowData = [
    { srNo: '1', RegionCode: 'Code-001', RegionName: 'Region Name', states: 'State 1, State 2, State 3'},
    { srNo: '2', RegionCode: 'Code-002', RegionName: 'Region Name', states: 'State 1, State 2, State 3'},
    { srNo: '3', RegionCode: 'Code-003', RegionName: 'Region Name', states: 'State 1, State 2, State 3'}
];




  showModalRegionmaster: boolean;

  onClickRegionmaster(event) {
    this.showModalRegionmaster = true;
    
    }
    
    hideRegionmaster() {
    this.showModalRegionmaster = false;
    }
  
    showModalBranchmaster: boolean;
    public searchValue: string = null;
    public citiesArray = [];
    public filteredCitiesArray = [];
    public selectedCitiesArray = [];
    public isDropDownVisible = false;
    constructor(private multiSelectService: MultiSelectService) { }

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

