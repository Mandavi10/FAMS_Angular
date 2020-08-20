import { Injectable , Inject } from '@angular/core';
import {AppSettings} from 'src/app/app-settings';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutoreportrequestService {
  UserId : any;
  baseUrl: string = ""; 
  constructor(private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {   
      this.baseUrl = AppSettings.Login_URL;
  }
//   BindGrid(): Observable<any> {  
//     let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
//     this.UserId = Sessionvalue.UserId;
//    return this._http.get<any>(this.baseUrl + 'api/AllCustomer/BindGrid/'+ this.UserId);
// }


// BindPopUp(): Observable<any> {  
//   let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
//   this.UserId = Sessionvalue.UserId;
//  return this._http.get<any>(this.baseUrl + 'api/AutoReportRequest/BindPopUp');
// }


SendMailAllAutoReportRequest(em:any): Observable<any> {
  const body = em; 
  const headers = new HttpHeaders().set('content-type', 'application/json');
  return this._http.post<any>(this.baseUrl + 'api/AutoReportRequest/SendMailAllAutoReportRequest', body, {
    headers 
});
}

ViewAllAutoReportRequest(em:any): Observable<any> {
  const body = em; 
  const headers = new HttpHeaders().set('content-type', 'application/json');
  return this._http.post<any>(this.baseUrl + 'api/AutoReportRequest/ViewAllAutoReportRequest', body, {
    headers 
});
}

BindAllAutoReportRequest(): Observable<any> {  
  let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
  this.UserId = Sessionvalue.UserId;
 return this._http.get<any>(this.baseUrl + 'api/AutoReportRequest/BindAllAutoReportRequest');
}



BindAutoReportRequest(em:any): Observable<any> {
  const body = em; 
  const headers = new HttpHeaders().set('content-type', 'application/json');
  return this._http.post<any>(this.baseUrl + 'api/AutoReportRequest/BindAutoReportRequest', body, {
    headers 
});
}

SaveAutoReportRequest(MData): Observable<any> {  
  const body = MData;
  const headers = new HttpHeaders().set('content-type', 'application/json');
  return this._http.post<any>(this.baseUrl + 'api/AutoReportRequest/SaveAutoReportRequest', body, {
      headers 

});

}
}