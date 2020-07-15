import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../assets/js/canvasjs.min';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'Login';
  public href1;
  //public shownav = false;

  constructor() { }
  ngOnInit() {
  }
  
}



