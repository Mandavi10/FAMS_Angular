import { Component, OnInit } from '@angular/core';
import{DbsecurityService}from '../Services/dbsecurity.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public shownav = false; liCountryMaster : boolean = true; UserId : any;
  liStateMaster : boolean = true; liCityMaster : boolean = true; liSectorMaster : 
  boolean = true; liDesignMaster : boolean = true; liNoteMaster : boolean =true;
  isShow = false;
 
  constructor(private Dbsecurity: DbsecurityService) { }
  
  ngOnInit() {
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    this.UserId = this.Dbsecurity.Decrypt(Sessionvalue.UserId);
    if(this.UserId == "5")
                    { 
                      this.liCountryMaster = false;      
                      this.liStateMaster = false;
                      this.liCityMaster = false; 
                      this.liSectorMaster = false;
                      this.liDesignMaster = false;
                      this.liNoteMaster = false;
                    }
  }
  togglenav() {
    this.shownav = !this.shownav;
  }
 
  toggleDisplay() {
    this.isShow = !this.isShow;
  }
}
