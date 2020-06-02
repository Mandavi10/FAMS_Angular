import { Injectable,Inject } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams,HttpResponse} from '@angular/common/http'; 
import {JsonFieldData} from '../../../Models/TrialBalanceReport/json-field-data';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class TrialbalancereportService {
  baseUrl: string = ""; 
  constructor(private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {
    this.baseUrl = myAppUrl;
   }
   GetTrialData(em:any): Observable<JsonFieldData> {
    const body = em;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this._http.post<JsonFieldData>(this.baseUrl + 'api/TrailBalanceReports/BindGrid', body, {
      headers
  });
  }
  BindCustomer(): Observable<any> {
    return this._http.get<any>(this.baseUrl + 'api/HoldingReports/BindCustomer');
  }
}
