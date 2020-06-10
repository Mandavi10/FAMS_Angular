import { Component, OnInit } from '@angular/core';
import{DbsecurityService}from '../Services/dbsecurity.service';
import{Sidebarlinks,Model_getSideBarLinks}from '../../Models/Sidebar/sidebarlinks';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public shownav = false; liCountryMaster : boolean = true; UserId : any;
  liStateMaster : boolean = true; liCityMaster : boolean = true; liSectorMaster : 

  boolean = true; liDesignMaster : boolean = true; liNoteMaster : boolean =true;

  //boolean = true; liDesignMaster : boolean = true; liPMSProviderMaster : boolean =true;

  isShow = false;
 
  constructor(private Dbsecurity: DbsecurityService) { }
  
  ngOnInit() {
    //this.BindSideBarLinks();
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    this.UserId = this.Dbsecurity.Decrypt(Sessionvalue.UserId);

    if(this.UserId == "5")
    //if(this.UserId == "3")

                    { 
                      this.liCountryMaster = false;      
                      this.liStateMaster = false;
                      this.liCityMaster = false; 
                      this.liSectorMaster = false;
                      this.liDesignMaster = false;
                      this.liNoteMaster = false;
                      //this.liPMSProviderMaster = false;
                    }
  }
  togglenav() {
    this.shownav = !this.shownav;
  }
 
  toggleDisplay() {
    this.isShow = !this.isShow;
  }
  // BindSideBarLinks()
  // {
  //   let _Model_getSideBarLinks=new Model_getSideBarLinks();
  //   let item = JSON.parse(sessionStorage.getItem('User'));
  //   _Model_getSideBarLinks.UserType=item.UserType;


  //   this.SideBarService.BindSidebarLinks(JSON.stringify(_Model_getSideBarLinks)).subscribe((data) => {
  //     this.Model_SideBarLinks=data.Table;
  //     this.Model_SideBarChildLinks=data.Table1;
  //   });

  // }
}
