import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{DbsecurityService}from '../Services/dbsecurity.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  UserName : any; UserId : any;
  public shownav = false;
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
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    this.UserName = this.Dbsecurity.Decrypt(Sessionvalue.UserName);
  }
  togglenav() {
    this.shownav = !this.shownav;
  }
  logout() {
    sessionStorage.clear();
    this.router.navigate(['/Login']);
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
