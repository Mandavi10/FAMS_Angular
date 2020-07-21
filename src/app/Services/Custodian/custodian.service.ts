import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Custodian } from '../../../Models/Custodian/custodian';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
//import { error } from 'util';
import {AppSettings} from 'src/app/app-settings';

@Injectable({
  providedIn: 'root'
})
export class CustodianService {
  baseUrl: string = ""; UserId: string = ""; EntityId: string = "";
  constructor(private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {
      //this.baseUrl = myAppUrl;

  //this.baseUrl = "http://localhost:55073/";
  this.baseUrl = AppSettings.Login_URL;


  }
  FillPMSDetails(PMSCode): Observable<any> {
    return this._http.get<any>(this.baseUrl + 'api/Custodian/FillPMSDetails/'+ PMSCode);
}

BindPMSDetails(CustodianId): Observable<any> {
  // let item = JSON.parse(sessionStorage.getItem('User'));
  // this.UserId = item.UserId;
  // this.EntityId = item.ReferenceId;
  return this._http.get<any>(this.baseUrl + 'api/Custodian/GetAllPMSDetails/'+CustodianId);
}
  loadAllCountry(): Observable<any> {
    // let item = JSON.parse(sessionStorage.getItem('User'));
    // this.UserId = item.UserId;
    // this.EntityId = item.ReferenceId;
    return this._http.get<any>(this.baseUrl + 'api/Custodian/BindCountry');
}
loadAllPMS(): Observable<any> {
    // let item = JSON.parse(sessionStorage.getItem('User'));
    // this.UserId = item.UserId;
    // this.EntityId = item.ReferenceId;
    return this._http.get<any>(this.baseUrl + 'api/Custodian/BindPMS');
}

GetAllCustodians(): Observable<any> {
  // let item = JSON.parse(sessionStorage.getItem('User'));
  // this.UserId = item.UserId;
  // this.EntityId = item.ReferenceId;
  return this._http.get<any>(this.baseUrl + 'api/Custodian/GetAllCustodian');
}
SaveCustodian(em: any): Observable<Custodian> {
  const body = em;
  const headers = new HttpHeaders().set('content-type', 'application/json');
  let item = JSON.parse(sessionStorage.getItem('User'));
  this.UserId = item.UserId;  
  return this._http.post<Custodian>(this.baseUrl + 'api/Custodian/AddCustodian/' + this.UserId, body, {
      headers
  });
}

UpdateCustodian(em: any, CustodianId): Observable<Custodian> {
  const body = em;
  let item = JSON.parse(sessionStorage.getItem('User'));
  this.UserId = item.UserId;  
  const headers = new HttpHeaders().set('content-type', 'application/json');
  return this._http.post<Custodian>(this.baseUrl + 'api/Custodian/UpdateCustodian/' + this.UserId +'/' + CustodianId, body, {
      headers
  });
}


}
