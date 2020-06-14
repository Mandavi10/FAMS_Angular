import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sector } from '../../../Models/Sector/sector';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { error } from 'util';
import {AppSettings} from 'src/app/app-settings';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  baseUrl: string = ""; UserId: string = ""; EntityId: string = "";
  constructor(private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {
      //this.baseUrl = myAppUrl;
  //this.baseUrl = "http://localhost:55073/";
  this.baseUrl = AppSettings.Login_URL;
  }

  loadAllSector(): Observable<any> {
    // let item = JSON.parse(sessionStorage.getItem('User'));
    // this.UserId = item.UserId;
    // this.EntityId = item.ReferenceId;
    return this._http.get<any>(this.baseUrl + 'api/Sector/BindSector');
  }
  loadAllCountry(): Observable<any> {
    // let item = JSON.parse(sessionStorage.getItem('User'));
    // this.UserId = item.UserId;
    // this.EntityId = item.ReferenceId;
    return this._http.get<any>(this.baseUrl + 'api/SecurityDetails/BindCountry');
  }

SaveSector(em: any): Observable<Sector> {
  const body = em;
  const headers = new HttpHeaders().set('content-type', 'application/json');
  let item = JSON.parse(sessionStorage.getItem('User'));
  this.UserId = item.UserId;  
  return this._http.post<Sector>(this.baseUrl + 'api/Sector/AddSector/' + this.UserId, body, {
      headers
  });
}

UpdateSector(em: any, SectorId): Observable<Sector> {
  const body = em;
  let item = JSON.parse(sessionStorage.getItem('User'));
  this.UserId = item.UserId;  
  const headers = new HttpHeaders().set('content-type', 'application/json');
  return this._http.post<Sector>(this.baseUrl + 'api/Sector/UpdateSector/' + this.UserId +'/' + SectorId, body, {
      headers
  });
}

}