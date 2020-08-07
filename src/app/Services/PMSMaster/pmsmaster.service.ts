import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PMSMaster } from '../../../Models/PMSMaster/PMSMaster';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
//import { error } from 'util';
import {AppSettings} from 'src/app/app-settings';

@Injectable({
  providedIn: 'root'
})
export class PmsmasterService {

  baseUrl: string = ""; UserId: string = ""; EntityId: string = "";
  constructor(private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {
      //this.baseUrl = myAppUrl;
  //this.baseUrl = "http://localhost:55073/";
  this.baseUrl = AppSettings.Login_URL;
  }



loadAllPMSMaster(): Observable<any> {
  // let item = JSON.parse(sessionStorage.getItem('User'));
  // this.UserId = item.UserId;
  // this.EntityId = item.ReferenceId;
  return this._http.get<any>(this.baseUrl + 'api/PMSMaster/BindPMSMaster');
}
SavePMSMaster(em: any): Observable<PMSMaster> {
  const body = em;
  const headers = new HttpHeaders().set('content-type', 'application/json');
  let item = JSON.parse(sessionStorage.getItem('User'));
  this.UserId = item.UserId;  
  return this._http.post<PMSMaster>(this.baseUrl + 'api/PMSMaster/AddPMSMaster/' + this.UserId, body, {
      headers
  });
}

UpdatePMSMaster(em: any, PMSId): Observable<PMSMaster> {
  const body = em;
  let item = JSON.parse(sessionStorage.getItem('User'));
  this.UserId = item.UserId;  
  const headers = new HttpHeaders().set('content-type', 'application/json');
  return this._http.post<PMSMaster>(this.baseUrl + 'api/PMSMaster/UpdatePMSMaster/' + this.UserId +'/' + PMSId, body, {
      headers
  });
}

}
