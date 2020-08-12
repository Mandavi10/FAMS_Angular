import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor(public sanitizer: DomSanitizer) { }

    ngOnInit(): void {
      this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    }


name = 'Set iframe source';
  url: string = "https://angular.io/";
  urlSafe: SafeResourceUrl;

}
