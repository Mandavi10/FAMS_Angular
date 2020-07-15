import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-analysis',
  templateUrl: './data-analysis.component.html',
  styleUrls: ['./data-analysis.component.css']
})
export class DataAnalysisComponent implements OnInit {

  constructor() { }

  ngOnInit() {
		let chart = new CanvasJS.Chart("chartContainer", {
		animationEnabled: true,
		exportEnabled: true,
		title: {
			text: ""
		},
		data: [{
			type: "column",
			dataPoints: [
				{ y: 71, label: "Apple" },
				{ y: 55, label: "Mango" },
				{ y: 50, label: "Orange" },
				{ y: 65, label: "Banana" },
				{ y: 95, label: "Pineapple" },
				{ y: 68, label: "Pears" },
				{ y: 28, label: "Grapes" },
				{ y: 34, label: "Lychee" },
				{ y: 14, label: "Jackfruit" }
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
				{ y: 450, name: "Food" },
				{ y: 120, name: "Insurance" },
				{ y: 300, name: "Traveling" },
				{ y: 800, name: "Housing" },
				{ y: 150, name: "Education" },
				{ y: 150, name: "Shopping"},
				{ y: 250, name: "Others" }
			]
		}]
	});
		
	chart1.render();
    }
  

}
