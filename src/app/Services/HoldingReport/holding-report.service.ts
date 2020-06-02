import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Custodian } from '../../../Models/Custodian/custodian';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { error } from 'util';

@Injectable({
  providedIn: 'root'
})
export class HoldingReportService {
  baseUrl: string = ""; UserId: string = ""; EntityId: string = "";
  constructor(private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {
      //this.baseUrl = myAppUrl;
  this.baseUrl = "http://localhost:55073/";
  }

BindCustomer(): Observable<any> {
  // let item = JSON.parse(sessionStorage.getItem('User'));
  // this.UserId = item.UserId;
  // this.EntityId = item.ReferenceId;
  return this._http.get<any>(this.baseUrl + 'api/HoldingReports/BindCustomer');
}
BindGridAllFields(CustomerAccount,Date): Observable<any> {
  // let item = JSON.parse(sessionStorage.getItem('User'));
  // this.UserId = item.UserId;
  // this.EntityId = item.ReferenceId;
  return this._http.get<any>(this.baseUrl + 'api/HoldingReports/BindGridAllFields/'+CustomerAccount +'/' + Date );
}
  
}
