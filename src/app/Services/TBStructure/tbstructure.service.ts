import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TBStructure } from '../../../Models/TBStructure/tbStructure';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { error } from 'util';

@Injectable({
  providedIn: 'root'
})
export class TbstructureService {
  baseUrl: string = ""; UserId: string = ""; EntityId: string = "";
  constructor(private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {
      //this.baseUrl = myAppUrl;
  this.baseUrl = "http://localhost:55073/";
  }


loadAllCountry(): Observable<any> { 
  return this._http.get<any>(this.baseUrl + 'api/TBStructure/BindCountry');
}
loadAllParent(): Observable<any> {  
    return this._http.get<any>(this.baseUrl + 'api/TBStructure/GetAllParent');
}
GetAllCustodians(): Observable<any> {
 return this._http.get<any>(this.baseUrl + 'api/TBStructure/GetAllCustodian');
}
GetAllGetAllTBStructure(): Observable<any> {
 
  return this._http.get<any>(this.baseUrl + 'api/TBStructure/GetAllTBStructure');
}
GetAllGetAllTBStructureDetailss(TBStructureId): Observable<any> {
 
  return this._http.get<any>(this.baseUrl + 'api/TBStructure/GetAllTBStructureDetails/'+TBStructureId);
}
SaveTBStructure(em: any): Observable<TBStructure> {
  const body = em;
  const headers = new HttpHeaders().set('content-type', 'application/json');
  let item = JSON.parse(sessionStorage.getItem('User'));
  this.UserId = item.UserId;  
  return this._http.post<TBStructure>(this.baseUrl + 'api/TBStructure/AddTBStructure/' + this.UserId, body, {
      headers
  });
}

UpdateTBStructure(em: any, TBStructureId): Observable<TBStructure> {
  const body = em;
  let item = JSON.parse(sessionStorage.getItem('User'));
  this.UserId = item.UserId;  
  const headers = new HttpHeaders().set('content-type', 'application/json');
  return this._http.post<TBStructure>(this.baseUrl + 'api/TBStructure/UpdateTBStructure/' + this.UserId +'/' + TBStructureId, body, {
      headers
  });
}

}