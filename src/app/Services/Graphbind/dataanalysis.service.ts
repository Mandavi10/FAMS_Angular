import { Injectable , Inject } from '@angular/core';
import {AppSettings} from 'src/app/app-settings';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataanalysisService {
  UserId : any;
  baseUrl: string = ""; 
  constructor(private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {
    this.baseUrl = AppSettings.Login_URL;
   }
   BinddataOnPageLoad(): Observable<any> {  
   return this._http.get<any>(this.baseUrl + 'api/AllCustomer/BindGraphGrid/');
}
BinddataOnPageLoad1(em:any): Observable<any> {  
  const body = em; 
  const headers = new HttpHeaders().set('content-type', 'application/json');
  return this._http.post<any>(this.baseUrl + 'api/AllCustomer/BindGraphGrid1/', body, {
    headers 
});
}
BinddataOnPageLoad2(em:any): Observable<any> {  
  const body = em; 
  const headers = new HttpHeaders().set('content-type', 'application/json');
  return this._http.post<any>(this.baseUrl + 'api/AllCustomer/BindGraphGrid2/', body, {
    headers 
});
}

BinddataCustomer(em:any): Observable<any> {  
  const body = em; 
  const headers = new HttpHeaders().set('content-type', 'application/json');
  return this._http.post<any>(this.baseUrl + 'api/AllCustomer/BindGraphGrid3/', body, {
    headers 
});
}

BinddataGraphPie(em:any): Observable<any> {  
  const body = em; 
  const headers = new HttpHeaders().set('content-type', 'application/json');
  return this._http.post<any>(this.baseUrl + 'api/AllCustomer/BindGraphGridPie/', body, {
    headers 
});
}

}
