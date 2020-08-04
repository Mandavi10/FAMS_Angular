import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AppSettings} from 'src/app/app-settings';


@Injectable({
  providedIn: 'root'
})
export class PortfolioAppraisalsService {

  
  baseUrl: string = ""; UserId: string = ""; EntityId: string = "";
  constructor(private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {
      //this.baseUrl = myAppUrl;
  //this.baseUrl = "http://localhost:55073/";
  this.baseUrl = AppSettings.Login_URL;
  }



  BindGrid(em): Observable<any> { 
    const body = em; 
   const headers = new HttpHeaders().set('content-type', 'application/json');
   return this._http.post<any>(this.baseUrl + 'api/PortfolioAppraisals/BindCustomer/', body, {
     headers 
 });
}

  BindEmployee(UserId){
    // const body = em;
     const headers = new HttpHeaders().set('content-type', 'application/json');
     return this._http.post<any>(this.baseUrl + 'api/PortfolioAppraisals/BindEmployees/'+ UserId , {
        headers 
     });
   }
   BindCustomer(EmployeeId): Observable<any> {
    // let item = JSON.parse(sessionStorage.getItem('User'));
    // this.UserId = item.UserId;
    // this.EntityId = item.ReferenceId;
    return this._http.get<any>(this.baseUrl + 'api/PortfolioAppraisals/BindCustomer/'+ EmployeeId);
  }
  BindGridAllFields(em): Observable<any> {
    const body = em; 
    alert('bind')
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this._http.post<any>(this.baseUrl + 'api/PortfolioAppraisal/BindGrid/', body, {
      headers 
  });
  }
  BindDefaultData(GAccountNumber,UserId): Observable<any> {
    return this._http.get<any>(this.baseUrl + 'api/PortfolioAppraisals/BindDefaultData/' +GAccountNumber+ '/' +UserId   );
  }
  NextRecordBind(CustomerAccount,FromDate,ToDate,SeqNo): Observable<any> {
    return this._http.get<any>(this.baseUrl + 'api/PortfolioAppraisals/NextRecordBind/'+CustomerAccount+ '/' +FromDate +'/' + ToDate +'/' + SeqNo );
  }
}
