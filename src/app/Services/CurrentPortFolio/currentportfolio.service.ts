import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import {AppSettings} from 'src/app/app-settings';


@Injectable({
  providedIn: 'root'
})
export class CurrentportfolioService {
  baseUrl: string = ""; UserId: string = ""; EntityId: string = "";
  constructor(private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {
    this.baseUrl = AppSettings.Login_URL;
   }
   BindGridAllFields(em: any): Observable<any> {
    const body = em;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this._http.post<any>(this.baseUrl + 'api/CurrentPortfolio/BindGrid/', body,{
      headers
    });
  }

  BindDefaultData(em:any): Observable<any> { 
    const body = em; 
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this._http.post<any>(this.baseUrl + 'api/CurrentPortfolio/BindDefaultData', body, {
      headers 
  });
  }

  BindEmployee(em:any){
    const body = em;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this._http.post<any>(this.baseUrl + 'api/BankBook/BindEmployees' , body, {
       headers 
    });
  }

  BindGridAllFieldsView(em: any): Observable<any> {
    const body = em;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this._http.post<any>(this.baseUrl + 'api/CurrentPortfolio/BindGridView', body,{
      headers
    });
  }
  

  BindGridOncustomerChange(em: any): Observable<any> {
    const body = em;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this._http.post<any>(this.baseUrl + 'api/CurrentPortfolio/BindGridOncustomerChange', body,{
      headers
    });
  }

  BindCustomers(em:any){
    const body = em;
    const headers = new HttpHeaders().set('content-type', 'application/json');
   return this._http.post<any>(this.baseUrl + 'api/BankBook/BindCustomers' , body, {
       headers 
   });
  }

  GetFetchLatestReport(em:any): Observable<any> {
    const body = em; 
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this._http.post<any>(this.baseUrl + 'api/FetchLatestReport/GetFetchLatestReport', body, {
      headers 
  });
}
}
