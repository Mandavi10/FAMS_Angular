import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Custodian } from '../../../Models/Custodian/custodian';
import {AppSettings} from 'src/app/app-settings';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { error } from 'util';

@Injectable({
  providedIn: 'root'
})
export class SecurityDetailsService {

  baseUrl: string = ""; UserId: string = ""; EntityId: string = "";
  constructor(private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {
      //this.baseUrl = myAppUrl;
  //this.baseUrl = "http://localhost:55073/";
this.baseUrl = AppSettings.Login_URL;
  }
  FillSecurityCodeDetails(securityCode): Observable<any> {
    return this._http.get<any>(this.baseUrl + 'api/SecurityDetails/FillSecurityCodeDetails/'+ securityCode);
}
BindSecurity(SecurityDetailsId): Observable<any> {
  // let item = JSON.parse(sessionStorage.getItem('User'));
  // this.UserId = item.UserId;
  // this.EntityId = item.ReferenceId;
  return this._http.get<any>(this.baseUrl + 'api/SecurityDetails/GetAllSecurity/'+SecurityDetailsId);
}
loadAllCountry(): Observable<any> {
  // let item = JSON.parse(sessionStorage.getItem('User'));
  // this.UserId = item.UserId;
  // this.EntityId = item.ReferenceId;
  return this._http.get<any>(this.baseUrl + 'api/SecurityDetails/BindCountry');
}
loadAllSector(): Observable<any> {
    // let item = JSON.parse(sessionStorage.getItem('User'));
    // this.UserId = item.UserId;
    // this.EntityId = item.ReferenceId;
    return this._http.get<any>(this.baseUrl + 'api/SecurityDetails/GetAllSector');
}

GetAllCustodians(): Observable<any> {
  // let item = JSON.parse(sessionStorage.getItem('User'));
  // this.UserId = item.UserId;
  // this.EntityId = item.ReferenceId;
  return this._http.get<any>(this.baseUrl + 'api/SecurityDetails/GetAllCustodian');
}
GetAllSecurityCodeDetailss(): Observable<any> {
  // let item = JSON.parse(sessionStorage.getItem('User'));
  // this.UserId = item.UserId;
  // this.EntityId = item.ReferenceId;
  return this._http.get<any>(this.baseUrl + 'api/SecurityDetails/GetAllSecurityCodeDetails');
}
GetAllSecurityDetailss(): Observable<any> {
  // let item = JSON.parse(sessionStorage.getItem('User'));
  // this.UserId = item.UserId;
  // this.EntityId = item.ReferenceId;
  return this._http.get<any>(this.baseUrl + 'api/SecurityDetails/BindAllSecurityDetails');
}
SaveSecurity(em: any): Observable<Custodian> {
  const body = em;
  const headers = new HttpHeaders().set('content-type', 'application/json');
  let item = JSON.parse(sessionStorage.getItem('User'));
  this.UserId = item.UserId;  
  return this._http.post<Custodian>(this.baseUrl + 'api/SecurityDetails/AddSecurityDetails/' + this.UserId, body, {
      headers
  });
}

UpdateSecurity(em: any, SecurityDetailsId): Observable<Custodian> {
  const body = em;
  let item = JSON.parse(sessionStorage.getItem('User'));
  this.UserId = item.UserId;  
  const headers = new HttpHeaders().set('content-type', 'application/json');
  return this._http.post<Custodian>(this.baseUrl + 'api/SecurityDetails/UpdateSecurityDetails/' + this.UserId +'/' + SecurityDetailsId, body, {
      headers
  });
}

}