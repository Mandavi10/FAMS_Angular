import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-data-analysis',
  templateUrl: './data-analysis.component.html',
  styleUrls: ['./data-analysis.component.css']
})
export class DataAnalysisComponent implements OnInit {
// 	isGrid : boolean = false;
// 	isPie = true;
// 	isGrid1 : boolean = false;
// 	isPie1 = true;
// 	isGrid2 : boolean = false;
// 	isPie2 = true;
// 	isGrid3 : boolean = false;
// 	isPie3 = true;
// 	showChart() {
		
// 		this.isGrid = false;
// 		this.isPie = false;
// 		//this.isChart = true;
// 	 }
// 	 showChart1() {
		
// 		this.isGrid1 = false;
// 		this.isPie1 = false;
// 		//this.isChart1 = true;
// 	 }
// 	 showChart2() {
		
// 		this.isGrid2 = false;
// 		this.isPie2 = false;
// 		//this.isChart2 = true;
// 	 }
// 	 showChart3() {
		
// 		this.isGrid3 = false;
// 		this.isPie3 = false;
// 		//this.isChart3 = true;
// 	 }
// 	 showPie() {
// 		this.isGrid = false;
// 		//this.isChart = false;
// 		this.isPie = true;
// 	 	//this.isChart = true;
// 	 }
// 	 showPie1() {
// 		this.isGrid1 = false;
// 		//this.isChart1 = false;
// 		this.isPie1 = true;
// 	 	//this.isChart = true;
// 	 }
// 	 showPie2() {
// 		this.isGrid2 = false;
// 		//this.isChart2 = false;
// 		this.isPie2 = true;
// 	 	//this.isChart = true;
// 	 }
// 	 showPie3() {
// 		this.isGrid3 = false;
// 		//this.isChart3 = false;
// 		this.isPie3 = true;
// 	 	//this.isChart = true;
// 	 }
// 	 showGrid() {
// 		this.isGrid = true;
// 		//this.isChart = false;
// 		this.isPie = false;
// 	 }
// 	 showGrid1() {
// 		this.isGrid1 = true;
// 		//this.isChart1 = false;
// 		this.isPie1 = false;
// 	 }
// 	 showGrid2() {
// 		this.isGrid2 = true;
// 		//this.isChart2 = false;
// 		this.isPie2 = false;
// 	 }
// 	 showGrid3() {
// 		this.isGrid3 = true;
// 		//this.isChart3 = false;
// 		this.isPie3 = false;
// 	 }
// 	columnDefs = [
// 		{headerName: 'Sr. No.', field: 'srNo', width: 60 },
// 		{headerName: 'Security', field: 'security', width: 190 },
// 		{headerName: 'Quantity', field: 'quantity', width: 80},
// 		{headerName: 'Cost', field: 'cost', width: 80, cellClass:'price', headerClass: 'price'},
// 		{headerName: 'Mkt Value', field: 'mktValue', width: 110, cellClass:'price', headerClass: 'price'} ,
// 		{headerName: '%Assets', field: 'assets', width: 80} 
// 	];
	
// 	rowData = [
// 		{ srNo: '1', security: 'SOLAR INDUSTRIES INDIA LTD', quantity: '1,804', cost: '2,678,810', mktValue: '4,793,499', assets: '9.57%'},
// 		{ srNo: '2', security: 'SOLAR INDUSTRIES INDIA LTD', quantity: '1,804', cost: '2,678,810', mktValue: '4,793,499', assets: '9.57%'},
// 		{ srNo: '3', security: 'SOLAR INDUSTRIES INDIA LTD', quantity: '1,804', cost: '2,678,810', mktValue: '4,793,499', assets: '9.57%'},
// 	];
// 	columnDefs1 = [
// 		{headerName: 'Sr. No.', field: 'srNo', width: 60 },
// 		{headerName: 'Security', field: 'security', width: 190 },
// 		{headerName: 'Quantity', field: 'quantity', width: 80},
// 		{headerName: 'Cost', field: 'cost', width: 80, cellClass:'price', headerClass: 'price'},
// 		{headerName: 'Mkt Value', field: 'mktValue', width: 110, cellClass:'price', headerClass: 'price'} ,
// 		{headerName: '%Assets', field: 'assets', width: 80} 
// 	];
	
// 	rowData1 = [
// 		{ srNo: '1', security: 'SOLAR INDUSTRIES INDIA LTD', quantity: '1,804', cost: '2,678,810', mktValue: '4,793,499', assets: '9.57%'},
// 		{ srNo: '2', security: 'SOLAR INDUSTRIES INDIA LTD', quantity: '1,804', cost: '2,678,810', mktValue: '4,793,499', assets: '9.57%'},
// 		{ srNo: '3', security: 'SOLAR INDUSTRIES INDIA LTD', quantity: '1,804', cost: '2,678,810', mktValue: '4,793,499', assets: '9.57%'},
// 	];
// 	columnDefs2 = [
// 		{headerName: 'Sr. No.', field: 'srNo', width: 60 },
// 		{headerName: 'Security', field: 'security', width: 190 },
// 		{headerName: 'Quantity', field: 'quantity', width: 80},
// 		{headerName: 'Cost', field: 'cost', width: 80, cellClass:'price', headerClass: 'price'},
// 		{headerName: 'Mkt Value', field: 'mktValue', width: 110, cellClass:'price', headerClass: 'price'} ,
// 		{headerName: '%Assets', field: 'assets', width: 80} 
// 	];
	
// 	rowData2 = [
// 		{ srNo: '1', security: 'SOLAR INDUSTRIES INDIA LTD', quantity: '1,804', cost: '2,678,810', mktValue: '4,793,499', assets: '9.57%'},
// 		{ srNo: '2', security: 'SOLAR INDUSTRIES INDIA LTD', quantity: '1,804', cost: '2,678,810', mktValue: '4,793,499', assets: '9.57%'},
// 		{ srNo: '3', security: 'SOLAR INDUSTRIES INDIA LTD', quantity: '1,804', cost: '2,678,810', mktValue: '4,793,499', assets: '9.57%'},
// 	];
// 	columnDefs3 = [
// 		{headerName: 'Sr. No.', field: 'srNo', width: 60 },
// 		{headerName: 'Security', field: 'security', width: 190 },
// 		{headerName: 'Quantity', field: 'quantity', width: 80},
// 		{headerName: 'Cost', field: 'cost', width: 80, cellClass:'price', headerClass: 'price'},
// 		{headerName: 'Mkt Value', field: 'mktValue', width: 110, cellClass:'price', headerClass: 'price'} ,
// 		{headerName: '%Assets', field: 'assets', width: 80} 
// 	];
	
// 	rowData3 = [
// 		{ srNo: '1', security: 'SOLAR INDUSTRIES INDIA LTD', quantity: '1,804', cost: '2,678,810', mktValue: '4,793,499', assets: '9.57%'},
// 		{ srNo: '2', security: 'SOLAR INDUSTRIES INDIA LTD', quantity: '1,804', cost: '2,678,810', mktValue: '4,793,499', assets: '9.57%'},
// 		{ srNo: '3', security: 'SOLAR INDUSTRIES INDIA LTD', quantity: '1,804', cost: '2,678,810', mktValue: '4,793,499', assets: '9.57%'},
// 	];
//   constructor() { }

//   ngOnInit() {
// 		let chart = new CanvasJS.Chart("chartContainer", {
// 		animationEnabled: true,
// 		exportEnabled: true,
// 		dataPointWidth: 30,
// 		title: {
// 			text: ""
// 		},
// 		data: [{
// 			type: "column",
// 			dataPoints: [
// 				{ y: 71, label: "Banking" },
// 				{ y: 55, label: "Pharmaceuticals" },
// 				{ y: 50, label: "Capital Goods" },
// 				{ y: 65, label: "Industrial Goods" },
// 				{ y: 95, label: "Diversified" },
// 				{ y: 68, label: "Consumer Goods" },
// 				{ y: 28, label: "Pesticides" },
// 				{ y: 34, label: "Others" }
// 			]
// 		}]
// 	});
		
//   chart.render();
  
//   let chart1 = new CanvasJS.Chart("chartContainer1", {
// 		theme: "light2",
// 		animationEnabled: true,
// 		exportEnabled: true,
// 		title:{
// 			text: ""
// 		},
// 		data: [{
// 			type: "pie",
// 			showInLegend: true,
// 			toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
// 			indexLabel: "{name} - #percent%",
// 			dataPoints: [
// 				{ y: 350, name: "Banking Services" },
// 				{ y: 120, name: "Drugs Pharmaceuticals" },
// 				{ y: 300, name: "Capital Goods" },
// 				{ y: 250, name: "Other Industrial Goods" },
// 				{ y: 150, name: "Diversified" },
// 				{ y: 150, name: "Consumer Goods"},
// 				{ y: 150, name: "Pesticides"},
// 				{ y: 350, name: "Others" }
// 			]
// 		}]
// 	});
		
// 	chart1.render();
 
// 	let chart3 = new CanvasJS.Chart("chartContainer3", {
// 		animationEnabled: true,
// 		exportEnabled: true,
// 		dataPointWidth: 30,
// 		title: {
// 			text: ""
// 		},
// 		data: [{
// 			type: "column",
// 			dataPoints: [
// 				{ y: 71, label: "Banking" },
// 				{ y: 55, label: "Pharmaceuticals" },
// 				{ y: 50, label: "Capital Goods" },
// 				{ y: 65, label: "Industrial Goods" },
// 				{ y: 95, label: "Diversified" },
// 				{ y: 68, label: "Consumer Goods" },
// 				{ y: 28, label: "Pesticides" },
// 				{ y: 34, label: "Others" }
// 			]
// 		}]
// 	});
		
//   chart3.render();
  
//   let chart2 = new CanvasJS.Chart("chartContainer2", {
// 		theme: "light2",
// 		animationEnabled: true,
// 		exportEnabled: true,
// 		title:{
// 			text: ""
// 		},
// 		data: [{
// 			type: "pie",
// 			showInLegend: true,
// 			toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
// 			indexLabel: "{name} - #percent%",
// 			dataPoints: [
// 				{ y: 350, name: "Banking Services" },
// 				{ y: 120, name: "Drugs Pharmaceuticals" },
// 				{ y: 300, name: "Capital Goods" },
// 				{ y: 250, name: "Other Industrial Goods" },
// 				{ y: 150, name: "Diversified" },
// 				{ y: 150, name: "Consumer Goods"},
// 				{ y: 150, name: "Pesticides"},
// 				{ y: 350, name: "Others" }
// 			]
// 		}]
// 	});
		
// 	chart2.render();

// 	let chart5 = new CanvasJS.Chart("chartContainer5", {
// 		animationEnabled: true,
// 		exportEnabled: true,
// 		dataPointWidth: 30,
// 		title: {
// 			text: ""
// 		},
// 		data: [{
// 			type: "column",
// 			dataPoints: [
// 				{ y: 71, label: "Banking" },
// 				{ y: 55, label: "Pharmaceuticals" },
// 				{ y: 50, label: "Capital Goods" },
// 				{ y: 65, label: "Industrial Goods" },
// 				{ y: 95, label: "Diversified" },
// 				{ y: 68, label: "Consumer Goods" },
// 				{ y: 28, label: "Pesticides" },
// 				{ y: 34, label: "Others" }
// 			]
// 		}]
// 	});
		
//   chart5.render();
  
//   let chart4 = new CanvasJS.Chart("chartContainer4", {
// 		theme: "light2",
// 		animationEnabled: true,
// 		exportEnabled: true,
// 		title:{
// 			text: ""
// 		},
// 		data: [{
// 			type: "pie",
// 			showInLegend: true,
// 			toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
// 			indexLabel: "{name} - #percent%",
// 			dataPoints: [
// 				{ y: 350, name: "Banking Services" },
// 				{ y: 120, name: "Drugs Pharmaceuticals" },
// 				{ y: 300, name: "Capital Goods" },
// 				{ y: 250, name: "Other Industrial Goods" },
// 				{ y: 150, name: "Diversified" },
// 				{ y: 150, name: "Consumer Goods"},
// 				{ y: 150, name: "Pesticides"},
// 				{ y: 350, name: "Others" }
// 			]
// 		}]
// 	});
		
// 	chart4.render();
// 	let chart7 = new CanvasJS.Chart("chartContainer7", {
// 		animationEnabled: true,
// 		exportEnabled: true,
// 		dataPointWidth: 30,
// 		title: {
// 			text: ""
// 		},
// 		data: [{
// 			type: "column",
// 			dataPoints: [
// 				{ y: 71, label: "Banking" },
// 				{ y: 55, label: "Pharmaceuticals" },
// 				{ y: 50, label: "Capital Goods" },
// 				{ y: 65, label: "Industrial Goods" },
// 				{ y: 95, label: "Diversified" },
// 				{ y: 68, label: "Consumer Goods" },
// 				{ y: 28, label: "Pesticides" },
// 				{ y: 34, label: "Others" }
// 			]
// 		}]
// 	});
		
//   chart7.render();
  
//   let chart6 = new CanvasJS.Chart("chartContainer6", {
// 		theme: "light2",
// 		animationEnabled: true,
// 		exportEnabled: true,
// 		title:{
// 			text: ""
// 		},
// 		data: [{
// 			type: "pie",
// 			showInLegend: true,
// 			toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
// 			indexLabel: "{name} - #percent%",
// 			dataPoints: [
// 				{ y: 350, name: "Banking Services" },
// 				{ y: 120, name: "Drugs Pharmaceuticals" },
// 				{ y: 300, name: "Capital Goods" },
// 				{ y: 250, name: "Other Industrial Goods" },
// 				{ y: 150, name: "Diversified" },
// 				{ y: 150, name: "Consumer Goods"},
// 				{ y: 150, name: "Pesticides"},
// 				{ y: 350, name: "Others" }
// 			]
// 		}]
// 	});
		
// 	chart6.render();
// }
}
