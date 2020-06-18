import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{DbsecurityService}from '../Services/dbsecurity.service';
import {SidebarComponent} from '../sidebar/sidebar.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  UserName : any; UserId : any; SidebarComponent : SidebarComponent; HeaderName : any;HeaderUrl:any
  public shownav = false; isShowLoader : boolean =false;
  isShow = false;
  isShow1 = false;
  showSettings:boolean=false;
  toggleDisplay() {
      this.isShow = !this.isShow;
  }
  toggleCorporate() {
    this.isShow1 = !this.isShow1;
}


showModalChangePassword: boolean;

  onClickChangePassword(event) {
    this.showModalChangePassword = true;
    
    }
    
    hideChangePassword() {
    this.showModalChangePassword = false;
    }



    showModalsetting: boolean;

    onClicksetting(event) {
      this.showModalsetting = true;
      
      }
      
      hidesetting() {
      this.showModalsetting = false;
      }




      showModalupdate: boolean;

      onClickupdate(event) {
        this.showModalupdate = true;
        
        }
        
        hideupdate() {
        this.showModalupdate = false;
        }




  constructor(private router: Router,private Dbsecurity: DbsecurityService) { }

  ngOnInit() {
    debugger;
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    this.UserName = this.Dbsecurity.Decrypt(Sessionvalue.UserName);
   // this.UserName = this.Dbsecurity.Decrypt(Sessionvalue.UserName);
   let HeaderName = sessionStorage.getItem('HeaderName');
   let HeaderUrl = sessionStorage.getItem('HeaderUrl');

  this.HeaderName = HeaderName;
  this.HeaderUrl=HeaderUrl;
  this.isShowLoader = false;
  this.ShowSettings();
  }

  togglenav() {
    this.shownav = !this.shownav;
  }
  logout() {
    this.isShowLoader = true;
    sessionStorage.clear();
    this.router.navigate(['/Login']);
}

ShowSettings(){
  let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
  this.UserId = this.Dbsecurity.Decrypt(Sessionvalue.UserId);
  if(this.UserId  == "2"){
    this.showSettings=true;//Added by Bibhu on 17June2020
  }
  else{
    this.showSettings=false;//Added by Bibhu on 17June2020
  }
}
Redirect()
{

  this.router.navigate(['/Home']);

}
HomeFun(){
  debugger;
  let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
  this.UserId = this.Dbsecurity.Decrypt(Sessionvalue.UserId);
  if(this.UserId == "5")
    {                 
      this.router.navigate(['/Dashboard']);
    }
    else if(this.UserId  == "3"
    || this.UserId  == "1"
    || this.UserId  == "2")
    {
      this.router.navigate(['/Home']);
      this.showSettings=false;//Added by Bibhu on 17June2020
    }
   else{
      this.router.navigate(['/Dashboard']);
    }
   

}

}
