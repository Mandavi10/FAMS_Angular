import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SchemaMaster } from '../../../Models/SchemaMaster/SchemaMaster';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
//import { error } from 'util';
import {AppSettings} from 'src/app/app-settings';

@Injectable({
  providedIn: 'root'
})
export class SchemamasterService {
  baseUrl: string = ""; UserId: string = ""; EntityId: string = "";
  constructor(private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {
      //this.baseUrl = myAppUrl;
  //this.baseUrl = "http://localhost:55073/";
  this.baseUrl = AppSettings.Login_URL;
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
    return this._http.get<any>(this.baseUrl + 'api/SecurityDetails/GetAllCustodian');
  }

loadAllSchemaMaster(): Observable<any> {
  // let item = JSON.parse(sessionStorage.getItem('User'));
  // this.UserId = item.UserId;
  // this.EntityId = item.ReferenceId;
  return this._http.get<any>(this.baseUrl + 'api/SchemaMaster/BindSchemaMaster');
}
SaveSchemaMaster(em: any): Observable<SchemaMaster> {
  const body = em;
  const headers = new HttpHeaders().set('content-type', 'application/json');
  let item = JSON.parse(sessionStorage.getItem('User'));
  this.UserId = item.UserId;  
  return this._http.post<SchemaMaster>(this.baseUrl + 'api/SchemaMaster/AddSchemaMaster/' + this.UserId, body, {
      headers
  });
}

UpdateSchemaMaster(em: any, SchemaMasterId): Observable<SchemaMaster> {
  const body = em;
  let item = JSON.parse(sessionStorage.getItem('User'));
  this.UserId = item.UserId;  
  const headers = new HttpHeaders().set('content-type', 'application/json');
  return this._http.post<SchemaMaster>(this.baseUrl + 'api/SchemaMaster/UpdateSchemaMaster/' + this.UserId +'/' + SchemaMasterId, body, {
      headers
  });
}

}
