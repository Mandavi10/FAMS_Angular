import { Component, OnInit } from '@angular/core';
import * as CanvasJS from 'src/assets/js/canvasjs.min';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, from } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import{DbsecurityService}from '../../Services/dbsecurity.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {DataanalysisService} from '../../Services/Graphbind/dataanalysis.service';
import{Employee,Customer,ReportLink} from '../../../Models/GraphBind/graphbind';
@Component({
  selector: 'app-data-analysis',
  templateUrl: './data-analysis.component.html',
  styleUrls: ['./data-analysis.component.css']
})
export class DataAnalysisComponent implements OnInit {
	isGrid : boolean = false;
	isPie = true;
	isGrid1 : boolean = false;
	isPie1 = true;
	isGrid2 : boolean = false;
	isPie2 = true;
	isGrid3 : boolean = false;
	isPie3 = true;
	isChart = false;
	isChart1 = false;
	isChart2 = false;
	isChart3 = false;
	
	showChart() {
		
		this.isGrid = false;
		this.isPie = false;
		this.isChart = true;
	 }
	 showChart1() {
		
		this.isGrid1 = false;
		this.isPie1 = false;
		this.isChart1 = true;
	 }
	 showChart2() {
		
		this.isGrid2 = false;
		this.isPie2 = false;
		this.isChart2 = true;
	 }
	 showChart3() {
		
		this.isGrid3 = false;
		this.isPie3 = false;
		this.isChart3 = true;
	 }
	 showPie() {
		this.isGrid = false;
		this.isChart = false;
		this.isPie = true;
	 	//this.isChart = true;
	 }
	 showPie1() {
		this.isGrid1 = false;
		this.isChart1 = false;
		this.isPie1 = true;
	 	//this.isChart = true;
	 }
	 showPie2() {
		this.isGrid2 = false;
		this.isChart2 = false;
		this.isPie2 = true;
	 	//this.isChart = true;
	 }
	 showPie3() {
		this.isGrid3 = false;
		this.isChart3 = false;
		this.isPie3 = true;
	 	//this.isChart = true;
	 }
	 showGrid() {
		this.isGrid = true;
		this.isChart = false;
		this.isPie = false;
	 }
	 showGrid1() {
		this.isGrid1 = true;
		this.isChart1 = false;
		this.isPie1 = false;
	 }
	 showGrid2() {
		this.isGrid2 = true;
		this.isChart2 = false;
		this.isPie2 = false;
	 }
	 showGrid3() {
		this.isGrid3 = true;
		this.isChart3 = false;
		this.isPie3 = false;
	 }
	columnDefs = [
		{headerName: 'Sr. No.', field: 'srNo', width: 60 },
		{headerName: 'Security', field: 'security', width: 190 },
		{headerName: 'Quantity', field: 'quantity', width: 80},
		{headerName: 'Cost', field: 'cost', width: 80, cellClass:'price', headerClass: 'price'},
		{headerName: 'Mkt Value', field: 'mktValue', width: 110, cellClass:'price', headerClass: 'price'} ,
		{headerName: '%Assets', field: 'assets', width: 80} 
	];
	
	rowData = [
		{ srNo: '1', security: 'SOLAR INDUSTRIES INDIA LTD', quantity: '1,804', cost: '2,678,810', mktValue: '4,793,499', assets: '9.57%'},
		{ srNo: '2', security: 'SOLAR INDUSTRIES INDIA LTD', quantity: '1,804', cost: '2,678,810', mktValue: '4,793,499', assets: '9.57%'},
		{ srNo: '3', security: 'SOLAR INDUSTRIES INDIA LTD', quantity: '1,804', cost: '2,678,810', mktValue: '4,793,499', assets: '9.57%'},
	];
	columnDefs1 = [
		{headerName: 'Sr. No.', field: 'srNo', width: 60 },
		{headerName: 'Security', field: 'security', width: 190 },
		{headerName: 'Quantity', field: 'quantity', width: 80},
		{headerName: 'Cost', field: 'cost', width: 80, cellClass:'price', headerClass: 'price'},
		{headerName: 'Mkt Value', field: 'mktValue', width: 110, cellClass:'price', headerClass: 'price'} ,
		{headerName: '%Assets', field: 'assets', width: 80} 
	];
	
	rowData1 = [
		{ srNo: '1', security: 'SOLAR INDUSTRIES INDIA LTD', quantity: '1,804', cost: '2,678,810', mktValue: '4,793,499', assets: '9.57%'},
		{ srNo: '2', security: 'SOLAR INDUSTRIES INDIA LTD', quantity: '1,804', cost: '2,678,810', mktValue: '4,793,499', assets: '9.57%'},
		{ srNo: '3', security: 'SOLAR INDUSTRIES INDIA LTD', quantity: '1,804', cost: '2,678,810', mktValue: '4,793,499', assets: '9.57%'},
	];
	columnDefs2 = [
		{headerName: 'Sr. No.', field: 'srNo', width: 60 },
		{headerName: 'Security', field: 'security', width: 190 },
		{headerName: 'Quantity', field: 'quantity', width: 80},
		{headerName: 'Cost', field: 'cost', width: 80, cellClass:'price', headerClass: 'price'},
		{headerName: 'Mkt Value', field: 'mktValue', width: 110, cellClass:'price', headerClass: 'price'} ,
		{headerName: '%Assets', field: 'assets', width: 80} 
	];
	
	rowData2 = [
		{ srNo: '1', security: 'SOLAR INDUSTRIES INDIA LTD', quantity: '1,804', cost: '2,678,810', mktValue: '4,793,499', assets: '9.57%'},
		{ srNo: '2', security: 'SOLAR INDUSTRIES INDIA LTD', quantity: '1,804', cost: '2,678,810', mktValue: '4,793,499', assets: '9.57%'},
		{ srNo: '3', security: 'SOLAR INDUSTRIES INDIA LTD', quantity: '1,804', cost: '2,678,810', mktValue: '4,793,499', assets: '9.57%'},
	];
	columnDefs3 = [
		{headerName: 'Sr. No.', field: 'srNo', width: 60 },
		{headerName: 'Security', field: 'security', width: 190 },
		{headerName: 'Quantity', field: 'quantity', width: 80},
		{headerName: 'Cost', field: 'cost', width: 80, cellClass:'price', headerClass: 'price'},
		{headerName: 'Mkt Value', field: 'mktValue', width: 110, cellClass:'price', headerClass: 'price'} ,
		{headerName: '%Assets', field: 'assets', width: 80} 
	];
	
	rowData3 = [
		{ srNo: '1', security: 'SOLAR INDUSTRIES INDIA LTD', quantity: '1,804', cost: '2,678,810', mktValue: '4,793,499', assets: '9.57%'},
		{ srNo: '2', security: 'SOLAR INDUSTRIES INDIA LTD', quantity: '1,804', cost: '2,678,810', mktValue: '4,793,499', assets: '9.57%'},
		{ srNo: '3', security: 'SOLAR INDUSTRIES INDIA LTD', quantity: '1,804', cost: '2,678,810', mktValue: '4,793,499', assets: '9.57%'},
	];

	Datanalysis: FormGroup;EmployeeCodedesabled: boolean = false;CustomerCodedesabled: boolean = false;
	Employeeshowhid=true;Customershowhid=true; Table:Employee;Table1:Customer;Table2:ReportLink;
	Customercodearray=[]; Table1Length:number=0;
  constructor(private route:ActivatedRoute,private router: Router, private formBuilder: FormBuilder, private Dbsecurity: DbsecurityService,private _GraphService:DataanalysisService) { }

  ngOnInit() {

	this.Datanalysis = this.formBuilder.group({
		Employeename: ['', Validators.required], 
		CustomerName:['', Validators.required],
		DateRangePicker:['', Validators.required],
		Report:['', Validators.required],
		DateRangePicker1:['', Validators.required],
		Report1:['', Validators.required],
		DateRangePicker2:['', Validators.required],
		Report2:['', Validators.required],
		DateRangePicker3:['', Validators.required],
		Report3:['', Validators.required]
	});
		  
	

		let chart = new CanvasJS.Chart("chartContainer", {
		animationEnabled: true,
		exportEnabled: true,
		dataPointWidth: 30,
		title: {
			text: ""
		},
		data: [{
			type: "column",
			dataPoints: [
				{ y: 71, label: "Banking" },
				{ y: 55, label: "Pharmaceuticals" },
				{ y: 50, label: "Capital Goods" },
				{ y: 65, label: "Industrial Goods" },
				{ y: 95, label: "Diversified" },
				{ y: 68, label: "Consumer Goods" },
				{ y: 28, label: "Pesticides" },
				{ y: 34, label: "Others" }
			]
		}]
	});
		
	

  chart.render();
  
  let chart1 = new CanvasJS.Chart("chartContainer1", {
		theme: "light2",
		animationEnabled: true,
		exportEnabled: true,
		title:{
			text: ""
		},
		data: [{
			type: "pie",
			showInLegend: true,
			toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
			indexLabel: "{name} - #percent%",
			dataPoints: [
				{ y: 350, name: "Banking Services" },
				{ y: 120, name: "Drugs Pharmaceuticals" },
				{ y: 300, name: "Capital Goods" },
				{ y: 250, name: "Other Industrial Goods" },
				{ y: 150, name: "Diversified" },
				{ y: 150, name: "Consumer Goods"},
				{ y: 150, name: "Pesticides"},
				{ y: 350, name: "Others" }
			]
		}]
	});
		
	chart1.render();
 
	let chart3 = new CanvasJS.Chart("chartContainer3", {
		animationEnabled: true,
		exportEnabled: true,
		dataPointWidth: 30,
		title: {
			text: ""
		},
		data: [{
			type: "column",
			dataPoints: [
				{ y: 71, label: "Banking" },
				{ y: 55, label: "Pharmaceuticals" },
				{ y: 50, label: "Capital Goods" },
				{ y: 65, label: "Industrial Goods" },
				{ y: 95, label: "Diversified" },
				{ y: 68, label: "Consumer Goods" },
				{ y: 28, label: "Pesticides" },
				{ y: 34, label: "Others" }
			]
		}]
	});
		
  chart3.render();
  
  let chart2 = new CanvasJS.Chart("chartContainer2", {
		theme: "light2",
		animationEnabled: true,
		exportEnabled: true,
		title:{
			text: ""
		},
		data: [{
			type: "pie",
			showInLegend: true,
			toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
			indexLabel: "{name} - #percent%",
			dataPoints: [
				{ y: 350, name: "Banking Services" },
				{ y: 120, name: "Drugs Pharmaceuticals" },
				{ y: 300, name: "Capital Goods" },
				{ y: 250, name: "Other Industrial Goods" },
				{ y: 150, name: "Diversified" },
				{ y: 150, name: "Consumer Goods"},
				{ y: 150, name: "Pesticides"},
				{ y: 350, name: "Others" }
			]
		}]
	});
		
	chart2.render();

	let chart5 = new CanvasJS.Chart("chartContainer5", {
		animationEnabled: true,
		exportEnabled: true,
		dataPointWidth: 30,
		title: {
			text: ""
		},
		data: [{
			type: "column",
			dataPoints: [
				{ y: 71, label: "Banking" },
				{ y: 55, label: "Pharmaceuticals" },
				{ y: 50, label: "Capital Goods" },
				{ y: 65, label: "Industrial Goods" },
				{ y: 95, label: "Diversified" },
				{ y: 68, label: "Consumer Goods" },
				{ y: 28, label: "Pesticides" },
				{ y: 34, label: "Others" }
			]
		}]
	});
		
  chart5.render();
  
  let chart4 = new CanvasJS.Chart("chartContainer4", {
		theme: "light2",
		animationEnabled: true,
		exportEnabled: true,
		title:{
			text: ""
		},
		data: [{
			type: "pie",
			showInLegend: true,
			toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
			indexLabel: "{name} - #percent%",
			dataPoints: [
				{ y: 350, name: "Banking Services" },
				{ y: 120, name: "Drugs Pharmaceuticals" },
				{ y: 300, name: "Capital Goods" },
				{ y: 250, name: "Other Industrial Goods" },
				{ y: 150, name: "Diversified" },
				{ y: 150, name: "Consumer Goods"},
				{ y: 150, name: "Pesticides"},
				{ y: 350, name: "Others" }
			]
		}]
	});
		
	chart4.render();
	let chart7 = new CanvasJS.Chart("chartContainer7", {
		animationEnabled: true,
		exportEnabled: true,
		dataPointWidth: 30,
		title: {
			text: ""
		},
		data: [{
			type: "column",
			dataPoints: [
				{ y: 71, label: "Banking" },
				{ y: 55, label: "Pharmaceuticals" },
				{ y: 50, label: "Capital Goods" },
				{ y: 65, label: "Industrial Goods" },
				{ y: 95, label: "Diversified" },
				{ y: 68, label: "Consumer Goods" },
				{ y: 28, label: "Pesticides" },
				{ y: 34, label: "Others" }
			]
		}]
	});
		
  chart7.render();
  
  let chart6 = new CanvasJS.Chart("chartContainer6", {
		theme: "light2",
		animationEnabled: true,
		exportEnabled: true,
		title:{
			text: ""
		},
		data: [{
			type: "pie",
			showInLegend: true,
			toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
			indexLabel: "{name} - #percent%",
			dataPoints: [
				{ y: 350, name: "Banking Services" },
				{ y: 120, name: "Drugs Pharmaceuticals" },
				{ y: 300, name: "Capital Goods" },
				{ y: 250, name: "Other Industrial Goods" },
				{ y: 150, name: "Diversified" },
				{ y: 150, name: "Consumer Goods"},
				{ y: 150, name: "Pesticides"},
				{ y: 350, name: "Others" }
			]
		}]
	});
		
	chart6.render();
//	this.Validationfield();
	this.Binddata();
	
}
isFieldValid(field: string) {
	return !this.Datanalysis.get(field).valid && this.Datanalysis.get(field).touched;
	}
	displayFieldCss(field: string) {
	 
			return {
			  'validate': this.isFieldValid(field),
		
	  }
	  
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
	Validationfield()
	{
		let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
		var UserType = this.Dbsecurity.Decrypt(Sessionvalue.UserType);
		const Employeename = this.Datanalysis.get('Employeename');
		const CustomerName = this.Datanalysis.get('CustomerName');
		if(UserType=="1")
		{
			Employeename.clearValidators(); Employeename.updateValueAndValidity();
			CustomerName.clearValidators(); CustomerName.updateValueAndValidity();
			this.Employeeshowhid=false;this.Customershowhid=false;
		}
		else if(UserType=="2")
		{
			this.Employeeshowhid=false;this.Customershowhid=true;
			Employeename.clearValidators(); Employeename.updateValueAndValidity();
			CustomerName.setValidators(Validators.required); CustomerName.updateValueAndValidity();
		}
		else 
		if(UserType=="3")
		{
			this.Employeeshowhid=true;this.Customershowhid=true;
			Employeename.setValidators(Validators.required); Employeename.updateValueAndValidity();
			CustomerName.setValidators(Validators.required); CustomerName.updateValueAndValidity();
		} 
		else if(UserType=="4")
		{
			this.Employeeshowhid=true;this.Customershowhid=true;
			Employeename.setValidators(Validators.required); Employeename.updateValueAndValidity();
			CustomerName.setValidators(Validators.required); CustomerName.updateValueAndValidity();
		} 
		
		const DateRangePicker = this.Datanalysis.get('DateRangePicker');
		const Report = this.Datanalysis.get('Report');
		const DateRangePicker1 = this.Datanalysis.get('DateRangePicker1');
		const Report1 = this.Datanalysis.get('Report1');
		const DateRangePicker2 = this.Datanalysis.get('DateRangePicker2');
		const Report2 = this.Datanalysis.get('Report2');
		const DateRangePicker3 = this.Datanalysis.get('DateRangePicker3');
		const Report3 = this.Datanalysis.get('Report2');
		
	}

	ValueAssign(Employeeid)
	{
		
	this.Customercodearray=[]; let Sponcode='1';
	for(var i=0;i<this.Table1Length;i++){
		
		if(this.Table1[i].PMSEmpId==Employeeid)
		{
			if(this.Customercodearray.length>0)
			{
			 for(var x=0;x<this.Customercodearray.length;x++){
	   
				if(this.Customercodearray[x].CustId ==this.Table[i].CustId && this.Customercodearray[x].CustomerName ==this.Table[i].CustomerName)
				{
				 Sponcode='2';
					break;
				}
			 }
			 if(Sponcode=='1'){
				this.Customercodearray.push(
					{"CustId":  ""+ this.Table1[i].CustId+""},
					{"CustomerName":  ""+ this.Table1[i].CustomerName+""}
			  
					);
				}
		  }
		  else
		  {
			this.Customercodearray.push(
				{"CustId":  ""+ this.Table1[i].CustId+""},
				{"CustomerName":  ""+ this.Table1[i].CustomerName+""}
		  
				);
			}

		  
			
		
		}
	}
	}
   Binddata()
   {
	this._GraphService.BinddataOnPageLoad().subscribe(
        (data) => {
			this.Table = data.Table; 
			this.Table1 = data.Table1; 
			this.Table1Length=data.Table1.length;
			this.Customercodearray=[];
			this.Table2 = data.Table2; 

		});
   }

	Generate_click()
	{
		if (this.Datanalysis.valid) {
alert('hii');
		}
		else{
			this.validateAllFormFields(this.Datanalysis);
		}
	}
}
