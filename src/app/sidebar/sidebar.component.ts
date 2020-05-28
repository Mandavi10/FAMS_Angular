import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public shownav = false;
  isShow = false;
 
  constructor() { }
  
  ngOnInit() {
  }
  togglenav() {
    this.shownav = !this.shownav;
  }
 
  toggleDisplay() {
    this.isShow = !this.isShow;
  }
}
