import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Designation } from '../../../Models/Designation/designation';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
//import { error } from 'util';
import {AppSettings} from 'src/app/app-settings';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  baseUrl: string = ""; UserId: string = ""; EntityId: string = "";
  constructor(private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {
      //this.baseUrl = myAppUrl;
  //this.baseUrl = "http://localhost:55073/";
  this.baseUrl = AppSettings.Login_URL;
  }



loadAllDesignation(): Observable<any> {
  // let item = JSON.parse(sessionStorage.getItem('User'));
  // this.UserId = item.UserId;
  // this.EntityId = item.ReferenceId;
  return this._http.get<any>(this.baseUrl + 'api/Designation/BindDesignation');
}
SaveDesignation(em: any): Observable<Designation> {
  const body = em;
  const headers = new HttpHeaders().set('content-type', 'application/json');
  let item = JSON.parse(sessionStorage.getItem('User'));
  this.UserId = item.UserId;  
  return this._http.post<Designation>(this.baseUrl + 'api/Designation/AddDesignation/' + this.UserId, body, {
      headers
  });
}

UpdateDesignation(em: any, DesignationId): Observable<Designation> {
  const body = em;
  let item = JSON.parse(sessionStorage.getItem('User'));
  this.UserId = item.UserId;  
  const headers = new HttpHeaders().set('content-type', 'application/json');
  return this._http.post<Designation>(this.baseUrl + 'api/Designation/UpdateDesignation/' + this.UserId +'/' + DesignationId, body, {
      headers
  });
}

}
