import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  showSideNav = true;
  constructor(router: Router) {
    router.events.subscribe(event => {
      if (router.url === '/Home') {
        this.showSideNav = false;
      }
    });
  }

  ngOnInit() {
  }

}
