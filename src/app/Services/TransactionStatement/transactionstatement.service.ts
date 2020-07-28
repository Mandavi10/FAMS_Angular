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
export class TransactionstatementService {
  baseUrl: string = ""; 
  constructor(private Dbsecurity: DbsecurityService,private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {   
      this.baseUrl = AppSettings.Login_URL;
  }
  BindGrid(em:any): Observable<any> { 
    const body = em; 
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this._http.post<any>(this.baseUrl + 'api/TransactionStatement/BindGrid', body, {
      headers 
  });
  }
  BindEmployee(UserId){
    // const body = em;
     const headers = new HttpHeaders().set('content-type', 'application/json');
     return this._http.post<any>(this.baseUrl + 'api/StatementOfExpenses/BindEmployees/'+ UserId , {
        headers 
     });
   }
  BindCustomer(EmployeeId): Observable<any> {
    return this._http.get<any>(this.baseUrl + 'api/StatementOfExpenses/BindCustomer/'+ EmployeeId);
  }

  BindDefaultData(GAccountNumber,UserId): Observable<any> {
    return this._http.get<any>(this.baseUrl + 'api/TransactionStatement/BindDefaultData/' +GAccountNumber+ '/' +UserId   );
  }
  NextRecordBind(CustomerAccount,FromDate,ToDate,SeqNo): Observable<any> {
    return this._http.get<any>(this.baseUrl + 'api/TransactionStatement/NextRecordBind/'+CustomerAccount+ '/' +FromDate +'/' + ToDate +'/' + SeqNo );
  }
  GetSummary(AccountNumber): Observable<any> {
    return this._http.get<any>(this.baseUrl + 'api/TransactionStatement/GetSummary/' +AccountNumber );
  }
}
