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
  }

  togglenav() {
    this.shownav = !this.shownav;
  }
  logout() {
    this.isShowLoader = true;
    sessionStorage.clear();
    this.router.navigate(['/Login']);
}
Redirect()
{

  this.router.navigate(['/Home']);
}
HomeFun(){
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
                  }
                else{
                    this.router.navigate(['/Dashboard']);
                  }
}

}
