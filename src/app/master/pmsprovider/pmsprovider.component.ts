import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-pmsprovider',
  templateUrl: './pmsprovider.component.html',
  styleUrls: ['./pmsprovider.component.css']
})
export class PMSProviderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.navigate(['/Home']);
    this.router.navigate(['/PMSProvider']);
  }

}
