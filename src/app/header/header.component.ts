import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public shownav = false;
  isShow = false;
  isShow1 = false;
  toggleDisplay() {
      this.isShow = !this.isShow;
  }
  toggleCorporate() {
    this.isShow1 = !this.isShow1;
}
  constructor(private router: Router) { }

  ngOnInit() {
  }
  togglenav() {
    this.shownav = !this.shownav;
  }
  logout() {
    sessionStorage.clear();
    this.router.navigate(['/Login']);
}
}
