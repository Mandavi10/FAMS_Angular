import { Injectable , Inject } from '@angular/core';
import {AppSettings} from 'src/app/app-settings';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import{DbsecurityService}from '../../Services/dbsecurity.service';

@Injectable({
  providedIn: 'root'
})
export class CapitalSatementService {
  baseUrl: string = ""; 
  constructor(private Dbsecurity: DbsecurityService,private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {   
      this.baseUrl = AppSettings.CapitalStatement;
  }

  BindGrid(em): Observable<any> { 
     const body = em; 
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this._http.post<any>(this.baseUrl + 'api/CapitalStatement/BindGrid', body, {
      headers 
  });
}


BindDefaultData(em:any): Observable<any> { 
  const body = em; 
  const headers = new HttpHeaders().set('content-type', 'application/json');
  return this._http.post<any>(this.baseUrl + 'api/CapitalStatement/BindDefaultData', body, {
    headers 
});
}

BindEmployee(em:any){
  const body = em;
  const headers = new HttpHeaders().set('content-type', 'application/json');
  return this._http.post<any>(this.baseUrl + 'api/CapitalStatement/BindEmployees' , body, {
     headers 
  });
}
//BindCustomers

// BindCustomers(em:any){
//   const body = em;
//   const headers = new HttpHeaders().set('content-type', 'application/json');
//   return this._http.post<any>(this.baseUrl + 'api/CapitalStatement/BindCustomers' , body, {
//      headers 
//   });
// }

BindCustomers(UserId){

  return this._http.get<any>(this.baseUrl + 'api/CapitalStatement/BindCustomers/'+UserId );
}


DownloadExcel(): Observable<any> { 
  
  return this._http.get<any>(this.baseUrl + 'api/CapitalStatement/DownloadExcel/');
}

BindNextData(em:any): Observable<any> { 
  const body = em; 
  const headers = new HttpHeaders().set('content-type', 'application/json');
  return this._http.post<any>(this.baseUrl + 'api/CapitalStatement/BindNextData', body, {
    headers 
});
}

BindCustomer(em:any){
  const body = em;
  const headers = new HttpHeaders().set('content-type', 'application/json');
 return this._http.post<any>(this.baseUrl + 'api/BankBook/BindCustomers' , body, {
     headers 
 });
}

BindViewGrid(em:any){
  const body = em;
  const headers = new HttpHeaders().set('content-type', 'application/json');
 return this._http.post<any>(this.baseUrl + 'api/StatementDividend/BindViewGrid' , body, {
     headers 
 });
}

GetFetchLatestReport(em:any): Observable<any> {
  const body = em; 
  const headers = new HttpHeaders().set('content-type', 'application/json');
  return this._http.post<any>(this.baseUrl + 'api/FetchLatestReport/GetFetchLatestReport', body, {
    headers 
});
}
ChangeAccountFun(em:any): Observable<any> {
  const body = em; 
  const headers = new HttpHeaders().set('content-type', 'application/json');
  return this._http.post<any>(this.baseUrl + 'api/StatementDividend/ChangeAccountFun', body, {
    headers 
});
}

}
