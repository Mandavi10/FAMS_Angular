import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Custodian } from '../../../Models/Custodian/custodian';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
//import { error } from 'util';
import {AppSettings} from 'src/app/app-settings';


@Injectable({
  providedIn: 'root'
})
export class StatementexpensesService {

  baseUrl: string = ""; UserId: string = ""; EntityId: string = "";
  constructor(private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {
      //this.baseUrl = myAppUrl;
  //this.baseUrl = "http://localhost:55073/";
  this.baseUrl = AppSettings.Login_URL;
  }
  BindEmployee(UserId){
   // const body = em;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this._http.post<any>(this.baseUrl + 'api/StatementOfExpenses/BindEmployees/'+ UserId , {
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
  BindStatementExpView(em:any): Observable<any> {
    const body = em; 
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this._http.post<any>(this.baseUrl + 'api/StatementOfExpenses/BindStatementExpView', body, {
      headers 
  });

    //return this._http.get<any>(this.baseUrl + 'api/StatementOfExpenses/BindStatementExpView/'+ ReportType);
  }
  BindCustomer(EmployeeId): Observable<any> {
    // let item = JSON.parse(sessionStorage.getItem('User'));
    // this.UserId = item.UserId;
    // this.EntityId = item.ReferenceId;
    return this._http.get<any>(this.baseUrl + 'api/StatementOfExpenses/BindCustomer/'+ EmployeeId);
  }
// BindGridAllFields(CustomerAccount,FromDate,ToDate,SeqNo): Observable<any> {
//   // let item = JSON.parse(sessionStorage.getItem('User'));
//   // this.UserId = item.UserId;
//   // this.EntityId = item.ReferenceId;
//   return this._http.get<any>(this.baseUrl + 'api/StatementOfExpenses/BindGridAllFields/'+CustomerAccount+ '/' +FromDate +'/' + ToDate+'/' + SeqNo );
// }

BindGridAllFields(em:any): Observable<any> { 
  const body = em; 
  const headers = new HttpHeaders().set('content-type', 'application/json');
  return this._http.post<any>(this.baseUrl + 'api/StatementOfExpenses/BindGridAllFields', body, {
    headers 
});
}
  
BindDefaultData(GAccountNumber,UserId): Observable<any> {
  return this._http.get<any>(this.baseUrl + 'api/StatementOfExpenses/BindDefaultData/' +GAccountNumber+ '/' +UserId   );
}
NextRecordBind(CustomerAccount,FromDate,ToDate,SeqNo): Observable<any> {
  return this._http.get<any>(this.baseUrl + 'api/StatementOfExpenses/NextRecordBind/'+CustomerAccount+ '/' +FromDate +'/' + ToDate +'/' + SeqNo );
}
}
