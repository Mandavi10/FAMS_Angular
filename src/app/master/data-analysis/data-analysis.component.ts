import { Component, OnInit } from '@angular/core';
import * as CanvasJS from 'src/assets/js/canvasjs.min';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, from } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import{DbsecurityService}from '../../Services/dbsecurity.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {DataanalysisService} from '../../Services/Graphbind/dataanalysis.service';
import{Employee,Customer,ReportLink,BindCapitalpie1,BindCapitalpie1column} from '../../../Models/GraphBind/graphbind';
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

	bindpie1Table:BindCapitalpie1;bindpie1Table1:BindCapitalpie1column; 
	
	
	//bindstringpie1:string="";
	showChart() {
		
		this.isGrid = false;
		this.isPie = false;
		this.isChart = false;
		this.Showfirst=3;
	 }
	 showChart1() {
		
		this.isGrid1 = false;
		this.isPie1 = false;
		this.isChart1 = false;
		this.ShowSecond=3;
	 }
	 showChart2() {
		
		this.isGrid2 = false;
		this.isPie2 = false;
		this.isChart2 = false;
		this.Showthird=3;
	 }
	 showChart3() {
		
		this.isGrid3 = false;
		this.isPie3 = false;
		this.isChart3 = false;
		this.Showfour=3;
	 }
	 showPie() {
		this.isGrid = false;
		this.isChart = false;
		this.isPie = false;
		this.Showfirst=1;
		
	 	//this.isChart = true;
	 }
	 showPie1() {
		this.isGrid1 = false;
		this.isChart1 = false;
		this.isPie1 = false;
		this.ShowSecond=1;
	 	//this.isChart = true;
	 }
	 showPie2() {
		this.isGrid2 = false;
		this.isChart2 = false;
		this.isPie2 = false;
		this.Showthird=1;
	 	//this.isChart = true;
	 }
	 showPie3() {
		this.isGrid3 = false;
		this.isChart3 = false;
		this.isPie3 = false;
		this.Showfour=1;
	 	//this.isChart = true;
	 }
	 showGrid() {
		this.isGrid = false;
		this.isChart = false;
		this.isPie = false;
		this.Showfirst=2;
	 }
	 showGrid1() {
		this.isGrid1 = false;
		this.isChart1 = false;
		this.isPie1 = false;
		this.ShowSecond=2;
		
	 }
	 showGrid2() {
		this.isGrid2 = false;
		this.isChart2 = false;
		this.isPie2 = false;
		this.Showthird=2;
	 }
	 showGrid3() {
		this.isGrid3 = false;
		this.isChart3 = false;
		this.isPie3 = false;
		this.Showfour=2;
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
	ReportAccountNo:string='';
  Showfirst:number=1; ShowSecond:number=1; Showthird:number=1; Showfour:number=1;
  Reportfirst1:number=0; ReportSecond:number=0;Reportthird:number=0;Reportfour:number=0;
Pie1array=[];Pie2array=[];Pie3array=[];Pie4array=[];

  Report1R(Data)
  {
	  
	  debugger;
	 // alert(this.Showfirst)
 this.Reportfirst1=Data;
 //this.Showfirst=0;
 
 this.isGrid = false;
 this.isChart = false;
 this.isPie = false;
 
  }
  Report2R(Data)
  {
 this.ReportSecond=Data;
 //this.ShowSecond=0;
 this.isGrid1 = false;
 this.isChart1 = false;
 this.isPie1 = false;
 alert('hii');
  }
  Report3R(Data)
  {
 this.Reportthird=Data;
 //this.Showthird=0;
 this.isGrid2 = false;
 this.isChart2 = false;
 this.isPie2 = false;
  }
  Report4R(Data)
  {
 this.Reportfour=Data;
 //this.Showfour=0;
 this.isGrid3 = false;
 this.isChart3 = false;
 this.isPie3 = false;
  }
  constructor(private route:ActivatedRoute,private router: Router, private formBuilder: FormBuilder, private Dbsecurity: DbsecurityService,private _GraphService:DataanalysisService) { }

  ngOnInit() {

	this.Datanalysis = this.formBuilder.group({
		Employeename: ['', Validators.required], 
		CustomerName:['', Validators.required],
		DateRangePicker:['',Validators.required],
		Report:['',Validators.required],
		DateRangePicker1:['',Validators.required],
		Report1:['',Validators.required],
		DateRangePicker2:['',Validators.required],
		Report2:['',Validators.required],
		DateRangePicker3:['',Validators.required],
		Report3:['',Validators.required]
	});
		  
	this.Validationfield();
	
	
	
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
			this.ReportAccountNo=Sessionvalue.AccountNo;;
		}
		else if(UserType=="2")
		{
			this.Employeeshowhid=false;this.Customershowhid=true;
			Employeename.clearValidators(); Employeename.updateValueAndValidity();
			CustomerName.setValidators(Validators.required); CustomerName.updateValueAndValidity();
			this.Binddata1();
		}
		else 
		if(UserType=="3")
		{
			this.Employeeshowhid=true;this.Customershowhid=true;
			Employeename.setValidators(Validators.required); Employeename.updateValueAndValidity();
			CustomerName.setValidators(Validators.required); CustomerName.updateValueAndValidity();
			this.Binddata();
		} 
		else if(UserType=="4")
		{
			this.Employeeshowhid=true;this.Customershowhid=true;
			Employeename.setValidators(Validators.required); Employeename.updateValueAndValidity();
			CustomerName.setValidators(Validators.required); CustomerName.updateValueAndValidity();
			this.Binddata();
		} 
		
		const DateRangePicker = this.Datanalysis.get('DateRangePicker');
		const Report = this.Datanalysis.get('Report');
		const DateRangePicker1 = this.Datanalysis.get('DateRangePicker1');
		const Report1 = this.Datanalysis.get('Report1');
		const DateRangePicker2 = this.Datanalysis.get('DateRangePicker2');
		const Report2 = this.Datanalysis.get('Report2');
		const DateRangePicker3 = this.Datanalysis.get('DateRangePicker3');
		const Report3 = this.Datanalysis.get('Report2');

    const DateRangePickers = this.Datanalysis.get('DateRangePicker');
	const Reports = this.Datanalysis.get('Report');
	const DateRangePicker1s = this.Datanalysis.get('DateRangePicker1');
	const Report1s = this.Datanalysis.get('Report1');
	const DateRangePicker2s = this.Datanalysis.get('DateRangePicker2');
	const Report2s = this.Datanalysis.get('Report2');
	const DateRangePicker3s = this.Datanalysis.get('DateRangePicker3');
	const Report3s = this.Datanalysis.get('Report3');
	DateRangePickers.clearValidators(); DateRangePickers.updateValueAndValidity();
	Reports.clearValidators(); Reports.updateValueAndValidity();
	DateRangePicker1s.clearValidators(); DateRangePicker1s.updateValueAndValidity();
	Report1s.clearValidators(); Report1s.updateValueAndValidity();
	DateRangePicker2s.clearValidators(); DateRangePicker2s.updateValueAndValidity();
	Report2s.clearValidators(); Report2s.updateValueAndValidity();
	DateRangePicker3s.clearValidators(); DateRangePicker3s.updateValueAndValidity();
	Report3s.clearValidators(); Report3s.updateValueAndValidity();
			
		
	}

	ReportValueAssign(AccountNo)
	{
     this.ReportAccountNo=AccountNo;
	}


	ValueAssign(Employeeid)
	{
		
	var JsonData ={
		"UserId":Employeeid
	  }
	this._GraphService.BinddataCustomer(JsonData).subscribe(
        (data) => {
			
			this.Table1 = data.Table; 

		});
	}
   Binddata()
   {
	this._GraphService.BinddataOnPageLoad().subscribe(
        (data) => {
			this.Table = data.Table; 
			//this.Table1 = data.Table1; 
			
			//this.Customercodearray=[];
			this.Table2 = data.Table2; 

		});
   }

   Binddata1()
   {
	let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    var UserId = Sessionvalue.AccountNo;
	var JsonData ={
		"UserId":UserId
	  }
	this._GraphService.BinddataOnPageLoad1(JsonData).subscribe(
        (data) => {
			this.Table1=data.Table; 
		});
   }
	Generate_click()
	{
		debugger;
		if (this.Datanalysis.valid) 
		{
//==============================================Case 1===========================================
  if(this.Showfirst !=0 && this.Reportfirst1 !=0)
  {
	var Selecteddate = ((document.getElementById("txtDateRangePicker") as HTMLInputElement).value);
	var date= Selecteddate.split('-');
	
	if(this.Showfirst==1)
	{
		//this.Showfirst,this.Reportfirst1,
		//this.ReportAccountNo="6010003";
		this.Bindpie1(date[0],date[1],this.ReportAccountNo,this.Showfirst,this.Reportfirst1);
	
	}
	else if(this.Showfirst==2)
	{
		this.isGrid = true;
		this.isChart = false;
		this.isPie = false;
	}
	else if(this.Showfirst==3)
	{
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
		this.isGrid = false;
		this.isChart = true;
		this.isPie = false;
	}
  }

//===============================================Case2===========================================
if(this.ShowSecond !=0 && this.ReportSecond !=0)
  {
	if(this.ShowSecond==1)
	{
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
		this.isGrid1 = false;
		this.isChart1 = false;
		this.isPie1 = true;

	}
	else if(this.ShowSecond==2)
	{
		this.isGrid1 = true;
		this.isChart1 = false;
		this.isPie1 = false;
	}
	else if(this.ShowSecond==3)
	{
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
		this.isGrid1 = false;
		this.isChart1 = true;
		this.isPie1 = false;
	}
  }

//===============================================Case3===========================================
if(this.Showthird !=0 && this.Reportthird !=0)
  {
	if(this.Showthird==1)
	{
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
		this.isGrid2 = false;
		this.isChart2 = false;
		this.isPie2 = true;
	}
	else if(this.Showthird==2)
	{
		this.isGrid2 = true;
		this.isChart2 = false;
		this.isPie2 = false;
	}
	else if(this.Showthird==3)
	{
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
		this.isGrid2 = false;
		this.isChart2 = true;
		this.isPie2 = false;
	}
  }

//================================================Case4==========================================
if(this.Showfour !=0 && this.Reportfour !=0)
{
	if(this.Showfour==1)
	{
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
		this.isGrid3 = false;
		this.isChart3 = false;
		this.isPie3 = true;
	}
	else if(this.Showfour==2)
	{
		this.isGrid3 = true;
		this.isChart3 = false;
		this.isPie3 = false;
	}
	else if(this.Showfour==3)
	{
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
		this.isGrid3 = false;
		this.isChart3 = true;
		this.isPie3 = false;
	}
}	


//===============================================End=============================================

		}
		else{
			this.validateAllFormFields(this.Datanalysis);
		}
	}

	Bindpie1(Fromdate,Todate,AccountNo,ReportType,Linkid)
	{
		var JsonData ={
			"Fromdate":Fromdate,
			"Todate":Todate,
			"AccountNo":AccountNo,
			"ReportType":ReportType,
			"Linkid":Linkid
		  }
		  var bindcapitalpiearray=[]; var bindstringpie1=''; 
		  
		  type MyArrayType = Array<{y: number, name: string}>;
		this._GraphService.BinddataGraphPie(JsonData).subscribe(
			(data1) => {
			 bindstringpie1 +="[";
				this.bindpie1Table=data1.Table;
				this.bindpie1Table1=data1.Table1;
				const arr: MyArrayType = [];
				for (var i = 0; i < data1.Table1.length; i++) {
					arr.push( {y: Number(this.bindpie1Table[0][this.bindpie1Table1[i].NAME]), name: this.bindpie1Table1[i].NAME});
				}
				
			//	var dataarray= '['+'{'+ arr[0] +'}'+']';
// for (var i = 0; i < data1.Table1.length; i++) {

				// 	bindcapitalpiearray.push({
				// 		y: this.bindpie1Table[0][this.bindpie1Table1[i].NAME], name: this.bindpie1Table1[i].NAME
						 
				// 			   });

			// 	for (var i = 0; i < data1.Table1.length; i++) {
			// 			 if(i !=data1.Table1.length-1)
			// 	 {
			// 		bindstringpie1 += "{";
			// 		bindstringpie1 += "y";
			// 		bindstringpie1 +=":";
			// 		bindstringpie1 +=this.bindpie1Table[0][this.bindpie1Table1[i].NAME];
			// 		bindstringpie1 +=",";
			// 		bindstringpie1 +="name";
			// 		bindstringpie1 +=":";
			// 		bindstringpie1 +='"'+this.bindpie1Table1[i].NAME+'"';
			// 		bindstringpie1 +="}";
			// 		bindstringpie1 +=",";
			// 	 }
			// 	 else
			// 	 {
			// 		bindstringpie1 += "{";
			// 		bindstringpie1 += "y";
			// 		bindstringpie1 +=":";
			// 		bindstringpie1 +=this.bindpie1Table[0][this.bindpie1Table1[i].NAME];
			// 		bindstringpie1 +=",";
			// 		bindstringpie1 +="name";
			// 		bindstringpie1 +=":";
			// 		bindstringpie1 +='"'+ this.bindpie1Table1[i].NAME+'"';
			// 		bindstringpie1 +="}";
					

			// 	 }
					
				
			
			// }
				
			// bindstringpie1 +="]";
			
				
				
			//	if(bindstringpie1 !=""){
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
							 dataPoints: bindstringpie1
						}]
					});
						
					chart1.render();
					this.isGrid = false;
					this.isChart = false;
					this.isPie = true;
					  });
				}
	            
		//	});
//	}
}
