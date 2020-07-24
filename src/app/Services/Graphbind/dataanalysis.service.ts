import { Injectable , Inject } from '@angular/core';
import {AppSettings} from 'src/app/app-settings';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataanalysisService {
  UserId : any;
  baseUrl: string = ""; 
  constructor(private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {
    this.baseUrl = AppSettings.Login_URL;
   }
   BinddataOnPageLoad(): Observable<any> {  
   return this._http.get<any>(this.baseUrl + 'api/AllCustomer/BindGraphGrid/');
}
}
