import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Custodian } from '../../../Models/Custodian/custodian';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { error } from 'util';
import {AppSettings} from 'src/app/app-settings';


@Injectable({
  providedIn: 'root'
})
export class PmsCustomerListService {
  baseUrl: string = ""; UserId: string = ""; EntityId: string = "";
  constructor(private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {
      //this.baseUrl = myAppUrl;
  //this.baseUrl = "http://localhost:55073/";
  this.baseUrl = AppSettings.Login_URL;
  }

BindCustodian(): Observable<any> {
  return this._http.get<any>(this.baseUrl + 'api/PMSCustomerList/BindCustodian');
}
BindPortfolio(): Observable<any> {  
  return this._http.get<any>(this.baseUrl + 'api/PMSCustomerList/BindPortfolio');
}
BindLinkedPMSEmployee(): Observable<any> { 
  return this._http.get<any>(this.baseUrl + 'api/PMSCustomerList/BindLinkedPMSEmployee');
}
BindPMSCustomerListDetails(): Observable<any> {  
    return this._http.get<any>(this.baseUrl + 'api/PMSCustomerList/BindPMSCustomerListDetails');
}

BindPMSCustomerListCodeDetails(CustomerListId): Observable<any> {
  return this._http.get<any>(this.baseUrl + 'api/PMSCustomerList/BindPMSCustomerListCodeDetails/'+ CustomerListId);
}


AddCustomerListDetails(em: any): Observable<Custodian> {
  const body = em;
  const headers = new HttpHeaders().set('content-type', 'application/json');
  let item = JSON.parse(sessionStorage.getItem('User'));
  this.UserId = item.UserId;  
  return this._http.post<Custodian>(this.baseUrl + 'api/PMSCustomerList/AddCustomerListDetails/' + this.UserId, body, {
      headers
  });
}

UpdateCustomerListDetails(em: any, SecurityDetailsId): Observable<Custodian> {
  const body = em;
  let item = JSON.parse(sessionStorage.getItem('User'));
  this.UserId = item.UserId;  
  const headers = new HttpHeaders().set('content-type', 'application/json');
  return this._http.post<Custodian>(this.baseUrl + 'api/PMSCustomerList/UpdateCustomerListDetails/' + this.UserId +'/' + SecurityDetailsId, body, {
      headers
  });
}

}