import { Injectable, Inject } from '@angular/core';
import {AppSettings} from 'src/app/app-settings';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  baseUrl: string = ""; UserId: string = ""; EntityId: string = "";
  constructor(private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {
      //this.baseUrl = myAppUrl;
  //this.baseUrl = "http://localhost:55073/";
  this.baseUrl = AppSettings.Login_URL;
  }
  UploadCSV(formdata:FormData): Observable<any> {
    // let item = JSON.parse(sessionStorage.getItem('User'));
    // this.UserId = item.UserId;
    // this.EntityId = item.ReferenceId;
    let headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.append('Accept', 'application/json');
  const httpOptions = { headers: headers };
    return this._http.post<any>(this.baseUrl + 'api/FileUpload/ReadCSV',formdata,httpOptions);
  }
}
