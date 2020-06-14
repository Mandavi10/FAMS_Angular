import { Injectable , Inject } from '@angular/core';
import {AppSettings} from 'src/app/app-settings';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import{DbsecurityService}from '../../Services/dbsecurity.service';
//import { error } from 'util';

@Injectable({
  providedIn: 'root'
})
export class PmsemployeesService {
  UserId : any;
  baseUrl: string = ""; 
  constructor(private Dbsecurity: DbsecurityService,private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {   
      this.baseUrl = AppSettings.Login_URL;
  }
  BindGrid(em:any): Observable<any> { 
    const body = em; 
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this._http.post<any>(this.baseUrl + 'api/PMSEmployees/BindGrid', body, {
      headers 
  });
  //return this._http.get<any>(this.baseUrl + 'api/PMSEmployees/BindGrid/'+ this.UserId);
}
SaveData(em:any){
   const body = em;
   const headers = new HttpHeaders().set('content-type', 'application/json');
  return this._http.post<any>(this.baseUrl + 'api/PMSEmployees/SaveData', body, {
      headers 
  });
}
BindCustodian(em:any): Observable<any> {  
 //return this._http.get<any>(this.baseUrl + 'api/PMSEmployees/BindCustodian/'+ this.UserId);
 const body = em;
   const headers = new HttpHeaders().set('content-type', 'application/json');
  return this._http.post<any>(this.baseUrl + 'api/PMSEmployees/BindCustodian', body, {
      headers 
  });
}
Search(em:any): Observable<any> {  
  const body = em;
    const headers = new HttpHeaders().set('content-type', 'application/json');
   return this._http.post<any>(this.baseUrl + 'api/PMSEmployees/Search', body, {
       headers 
   });
 }
BindCustomers(em:any): Observable<any> {  
 //return this._http.get<any>(this.baseUrl + 'api/PMSEmployees/BindCustomers/'+ PMSEmpId);
 const body = em;
    const headers = new HttpHeaders().set('content-type', 'application/json');
   return this._http.post<any>(this.baseUrl + 'api/PMSEmployees/BindCustomers', body, {
       headers 
   });
}
}
