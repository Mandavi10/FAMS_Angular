import { Component, OnInit } from '@angular/core';
import{DbsecurityService}from '../Services/dbsecurity.service';
import{SidebarService}from '../Services/SideBar/sidebar.service';
import{Sidebarlinks,Model_getSideBarLinks}from '../../Models/Sidebar/sidebarlinks';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public Sidebarlinks:Sidebarlinks;
  public Model_getSideBarLinks : Model_getSideBarLinks;
  Model_getSideBarLinksData :Array<Model_getSideBarLinks> = [];

  public shownav = false; liCountryMaster : boolean = true; UserId : any;
  liStateMaster : boolean = true; liCityMaster : boolean = true; liSectorMaster : 

  boolean = true; liDesignMaster : boolean = true; liNoteMaster : boolean =true;

  //boolean = true; liDesignMaster : boolean = true; liPMSProviderMaster : boolean =true;

  isShow = false;
 
  constructor(private Dbsecurity: DbsecurityService,private SideBarService:SidebarService) { }
  
  ngOnInit() {
debugger;
    this.BindSideBarLinks();
    // let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    // this.UserId = this.Dbsecurity.Decrypt(Sessionvalue.UserId);

    // if(this.UserId == "5")
    // //if(this.UserId == "3")

    //                 { 
    //                   this.liCountryMaster = false;      
    //                   this.liStateMaster = false;
    //                   this.liCityMaster = false; 
    //                   this.liSectorMaster = false;
    //                   this.liDesignMaster = false;
    //                   this.liNoteMaster = false;
    //                   //this.liPMSProviderMaster = false;
    //                 }
  }
  togglenav() {
    this.shownav = !this.shownav;
  }
 
  toggleDisplay() {
    this.isShow = !this.isShow;
  }
  BindHeader(value, value1){
    sessionStorage.setItem('HeaderName', value);
    sessionStorage.setItem('HeaderUrl', value1);
    //window.location.href =value1  ;
  }
  BindSideBarLinks()
  {
    //let _Model_getSideBarLinks=new Model_getSideBarLinks();
    let item = JSON.parse(sessionStorage.getItem('User'));
    var UsertType  = this.Dbsecurity.Decrypt(item.UserType);

    var Json ={
      "UserType": UsertType
    }


    this.SideBarService.BindSidebarLinks(Json).subscribe((data) => {
      this.Sidebarlinks=data.Table;
      //this.Model_SideBarChildLinks=data.Table1;
    });

  }
}
