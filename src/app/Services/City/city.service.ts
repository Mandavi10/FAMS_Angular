import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../../../Models/City/city';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
//import { error } from 'util';
import {AppSettings} from 'src/app/app-settings'; 

@Injectable({
  providedIn: 'root'
})
export class CityService {
  baseUrl: string = ""; UserId: string = ""; EntityId: string = "";
  constructor(private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {
      //this.baseUrl = myAppUrl;
 // this.baseUrl = "http://localhost:55073/";
 this.baseUrl = AppSettings.Login_URL;
  }


  loadAllCountry(): Observable<any> {
    // let item = JSON.parse(sessionStorage.getItem('User'));
    // this.UserId = item.UserId;
    // this.EntityId = item.ReferenceId;
    return this._http.get<any>(this.baseUrl + 'api/SecurityDetails/BindCountry');
  }
  loadAllState(CountryCode): Observable<any> {
    // let item = JSON.parse(sessionStorage.getItem('User'));
    // this.UserId = item.UserId;
    // this.EntityId = item.ReferenceId;
    return this._http.get<any>(this.baseUrl + 'api/City/BindState/' + CountryCode);
  }
loadAllCity(): Observable<any> {
  // let item = JSON.parse(sessionStorage.getItem('User'));
  // this.UserId = item.UserId;
  // this.EntityId = item.ReferenceId;
  return this._http.get<any>(this.baseUrl + 'api/City/BindCity');
}
SaveCity(em: any): Observable<City> {
  const body = em;
  const headers = new HttpHeaders().set('content-type', 'application/json');
  let item = JSON.parse(sessionStorage.getItem('User'));
  this.UserId = item.UserId;  
  return this._http.post<City>(this.baseUrl + 'api/City/AddCity/' + this.UserId, body, {
      headers
  });
}

UpdateCity(em: any, CityId): Observable<City> {
  const body = em;
  let item = JSON.parse(sessionStorage.getItem('User'));
  this.UserId = item.UserId;  
  const headers = new HttpHeaders().set('content-type', 'application/json');
  return this._http.post<City>(this.baseUrl + 'api/City/UpdateCity/' + this.UserId +'/' + CityId, body, {
      headers
  });
}

}